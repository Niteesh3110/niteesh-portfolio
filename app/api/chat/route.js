import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";
import { loadIndex, retrieveTopK, normalizeQuery } from "@/rag/rag";
import dotenv from "dotenv";
import path from "node:path";

dotenv.config({ path: path.join(process.cwd(), ".env.local") });

// Embeddings stay on Gemini (the stored index.json vectors are in this space).
const EMBED_MODEL = "gemini-embedding-001";

// Answer generation: primary is free Llama via OpenRouter; if that's
// rate-limited/down, fall back to the original Gemini model (direct, using the
// existing Gemini key). Both overridable via env without touching code.
const OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions";
const OPENROUTER_CHAT_MODEL =
  process.env.OPENROUTER_MODEL || "meta-llama/llama-3.3-70b-instruct:free";
const GEMINI_CHAT_MODEL =
  process.env.GEMINI_CHAT_MODEL || "gemini-2.5-flash-lite";
// Last-resort Gemini model (separate capacity pool) if the primary one is
// also overloaded (503). Different model => different demand.
const GEMINI_FALLBACK_MODEL =
  process.env.GEMINI_FALLBACK_MODEL || "gemini-2.0-flash";

function getKey() {
  const k = process.env.GEMINI_API_KEY;
  if (!k) throw new Error("Missing GEMINI_API_KEY in environment.");
  return k;
}

function getOpenRouterKey() {
  const k = process.env.OPENROUTER_API_KEY;
  if (!k) throw new Error("Missing OPENROUTER_API_KEY in environment.");
  return k;
}

function extractEmbeddingVector(embeddingObj) {
  if (!embeddingObj) return [];
  if (Array.isArray(embeddingObj.values)) return embeddingObj.values;
  if (Array.isArray(embeddingObj.embedding)) return embeddingObj.embedding;
  return [];
}

async function callOpenRouter(model, systemInstruction, prompt, key) {
  const res = await fetch(OPENROUTER_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model,
      temperature: 0.2,
      messages: [
        { role: "system", content: systemInstruction },
        { role: "user", content: prompt },
      ],
    }),
  });

  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    const e = new Error(`OpenRouter ${model} failed: ${res.status} ${detail}`);
    e.status = res.status;
    throw e;
  }

  const data = await res.json();
  const answer = data?.choices?.[0]?.message?.content?.trim();
  if (!answer) {
    const e = new Error(`OpenRouter ${model} returned no content`);
    e.status = 502;
    throw e;
  }
  return answer;
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// Fallback generator: a Gemini model, called directly.
async function callGemini(ai, model, systemInstruction, prompt) {
  const resp = await ai.models.generateContent({
    model,
    contents: [{ role: "user", parts: [{ text: prompt }] }],
    config: { systemInstruction, temperature: 0.2 },
  });
  const answer =
    resp?.candidates?.[0]?.content?.parts?.map((p) => p.text).join("") || "";
  if (!answer.trim()) {
    const e = new Error(`Gemini ${model} returned no content`);
    e.status = 502;
    throw e;
  }
  return answer;
}

// Retry a call on transient 429/5xx (e.g. Gemini's 503 "high demand" spikes).
async function withRetry(fn, tries = 3) {
  let lastErr;
  for (let i = 0; i < tries; i++) {
    try {
      return await fn();
    } catch (err) {
      lastErr = err;
      const s = err?.status;
      const transient = s === 429 || (s >= 500 && s < 600);
      if (!transient || i === tries - 1) throw err;
      await sleep(700 * (i + 1)); // 700ms, then 1400ms
    }
  }
  throw lastErr;
}

// Resilient chain so the bot stays up when a provider is busy:
//   1) free Llama via OpenRouter (single try — its 429 cooldown is seconds)
//   2) Gemini primary model, retried through transient 503 spikes
//   3) an alternate Gemini model (separate capacity pool) as last resort
async function generateAnswer(ai, systemInstruction, prompt) {
  // 1) OpenRouter
  try {
    const key = getOpenRouterKey();
    return await callOpenRouter(
      OPENROUTER_CHAT_MODEL,
      systemInstruction,
      prompt,
      key,
    );
  } catch (orErr) {
    console.error(
      `OpenRouter (${OPENROUTER_CHAT_MODEL}) failed, falling back to Gemini:`,
      orErr?.message,
    );
  }

  // 2) Gemini primary (with retries on transient overload)
  try {
    return await withRetry(() =>
      callGemini(ai, GEMINI_CHAT_MODEL, systemInstruction, prompt),
    );
  } catch (gErr) {
    console.error(
      `Gemini (${GEMINI_CHAT_MODEL}) failed, trying ${GEMINI_FALLBACK_MODEL}:`,
      gErr?.message,
    );
  }

  // 3) Alternate Gemini model (last resort)
  return await callGemini(ai, GEMINI_FALLBACK_MODEL, systemInstruction, prompt);
}

export async function POST(req) {
  try {
    const body = await req.json();

    const messages = Array.isArray(body?.messages)
      ? body.messages
      : body?.messages?.messages;

    const questionCount = body?.questionCount || 0;

    const lastUserMsg = Array.isArray(messages)
      ? [...messages].reverse().find((m) => m?.role === "user")?.content
      : body?.message || body?.content;

    if (!lastUserMsg) {
      return NextResponse.json(
        { answer: "Please ask a question." },
        { status: 400 },
      );
    }

    const ai = new GoogleGenAI({ apiKey: getKey() });

    // 1) Embed the user query
    const { rewritten } = normalizeQuery(lastUserMsg);

    const embedResp = await ai.models.embedContent({
      model: EMBED_MODEL,
      contents: [rewritten],
      config: { taskType: "RETRIEVAL_QUERY" },
    });

    const qVec = extractEmbeddingVector(embedResp?.embeddings?.[0]);
    if (!qVec.length) {
      return NextResponse.json(
        { answer: "Embedding failed." },
        { status: 500 },
      );
    }

    // 2) Load your local vector index + retrieve top chunks
    const index = await loadIndex();
    const top = retrieveTopK(index, qVec, lastUserMsg, 8).filter(
      (t) => t.score > 0.3,
    );

    const contextBlock = top
      .map((t, i) => {
        const c = t.chunk;

        return `
[#${i + 1}]
Source: ${c.source}
Section: ${c.section || ""}
Subsection: ${c.subsection || ""}
Score: ${t.score.toFixed(3)}

${c.text}
`;
      })
      .join("\n\n---\n\n");

    // 3) Ask the OpenRouter model to answer grounded in the retrieved context
    const systemInstruction = `
You are Niteesh Panchal’s portfolio assistant.

Your job is to answer the user’s question using ONLY the provided CONTEXT.
Do not use outside knowledge, assumptions, or guessed details.

Rules:
1. Answer only from the CONTEXT.
2. If the CONTEXT does not contain the answer, reply exactly:
"I’d love to help, but I’m on a strict ‘no hallucinations’ diet. If it’s not in Niteesh’s portfolio data, I don’t know it."
3. Prefer the most relevant and specific details from the CONTEXT over broad summaries.
4. If the question is about experience, prioritize professional roles, teaching roles, internships, and project responsibilities found in the CONTEXT.
5. If the question is about education, prioritize degrees, universities, GPA, coursework, and academic background found in the CONTEXT.
6. If the question is about skills or technologies, prioritize technical skills, frameworks, tools, and technologies explicitly listed in the CONTEXT.
7. If the question is about projects, prioritize project descriptions, features, responsibilities, tech stacks, and challenges explicitly mentioned in the CONTEXT.
8. If multiple relevant context chunks are provided, combine them into one accurate answer, but do not add anything not stated in the CONTEXT.
9. Keep the response concise, clear, and professional.
10. If asked for sensitive or private personal information such as home address, phone number, passwords, secrets, or private contact details beyond what is explicitly safe and public in the CONTEXT, refuse politely.

Important:
- Do not rewrite the answer into a generic biography unless the question asks for a general introduction.
- Do not replace specific work experience with general background.
- Do not omit concrete roles, companies, or responsibilities when they are present in the CONTEXT and relevant to the question.

Scheduling:
- ONLY include [SCHEDULE_CTA] in these two cases:
  1. The user explicitly asks to meet, talk, schedule, connect, chat live, or have a conversation with Niteesh.
  2. The QUESTION_COUNT below is greater than 3.
- When including [SCHEDULE_CTA], always end your response with exactly this sentence before the tag: "To know more about him, would you like to schedule a call with him?"
- Do NOT include [SCHEDULE_CTA] for simple informational questions when QUESTION_COUNT is 3 or less.
- Only include [SCHEDULE_CTA] once, always at the very end of your response.

QUESTION_COUNT: ${questionCount}
`;

    const prompt = `
Use the CONTEXT below to answer the USER QUESTION.

Only use facts present in the CONTEXT.

CONTEXT:
${contextBlock}

USER QUESTION:
${lastUserMsg}

Answer:
`;

    const answer = await generateAnswer(ai, systemInstruction, prompt);

    // Optional: return sources to show transparency in UI
    const sources = top.map((t) => ({
      source: t.chunk.source,
      section: t.chunk.section,
      subsection: t.chunk.subsection,
      score: t.score,
    }));

    return NextResponse.json({ answer, sources });
  } catch (err) {
    console.error(err);
    // Covers Gemini embedding ApiError 429 and OpenRouter 429/503 after retries.
    if (
      err?.status === 429 ||
      (err?.name === "ApiError" && err?.status === 429)
    ) {
      return NextResponse.json({
        answer:
          "Ugh! I need some rest now. Please feel free to check his portfolio page on your own. Thank you! P.S I am broke so I have implemented rate limit.",
        status: 429,
      });
    } else {
      return NextResponse.json(
        { answer: "Give me some time, I am working on fixing something." },
        { status: 500 },
      );
    }
  }
}
