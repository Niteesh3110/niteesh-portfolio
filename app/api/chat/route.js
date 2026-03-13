import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";
import { loadIndex, retrieveTopK, normalizeQuery } from "@/rag/rag";
import dotenv from "dotenv";
import path from "node:path";

dotenv.config({ path: path.join(process.cwd(), ".env.local") });

const EMBED_MODEL = "gemini-embedding-001";
const CHAT_MODEL = "gemini-2.5-flash-lite";

function getKey() {
  const k = process.env.GEMINI_API_KEY;
  if (!k) throw new Error("Missing GEMINI_API_KEY in environment.");
  return k;
}

function extractEmbeddingVector(embeddingObj) {
  if (!embeddingObj) return [];
  if (Array.isArray(embeddingObj.values)) return embeddingObj.values;
  if (Array.isArray(embeddingObj.embedding)) return embeddingObj.embedding;
  return [];
}

export async function POST(req) {
  try {
    const body = await req.json();

    const messages = Array.isArray(body?.messages)
      ? body.messages
      : body?.messages?.messages; // fallback if nested

    console.log(messages);

    const lastUserMsg = Array.isArray(messages)
      ? [...messages].reverse().find((m) => m?.role === "user")?.content
      : body?.message || body?.content;

    console.log(lastUserMsg);

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
    const top = retrieveTopK(index, qVec, lastUserMsg, 6);

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

    // 3) Ask Gemini to answer grounded in the retrieved context
    const systemInstruction = `
You are Niteesh Panchal's portfolio assistant.

Your job is to answer the user's question using ONLY the provided CONTEXT.
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

    const genResp = await ai.models.generateContent({
      model: CHAT_MODEL,
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      config: {
        systemInstruction,
        temperature: 0.2,
      },
    });

    const answer =
      genResp?.candidates?.[0]?.content?.parts?.map((p) => p.text).join("") ||
      "No answer returned.";

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
    if (err.name === "ApiError" && err.status === 429) {
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
