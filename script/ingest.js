import dotenv from "dotenv";
import fs from "node:fs/promises";
import path from "node:path";
import crypto from "node:crypto";
import { GoogleGenAI } from "@google/genai";

dotenv.config({ path: path.join(process.cwd(), ".env.local") });

const DATA_DIR = path.join(process.cwd(), "data");
const OUT_DIR = path.join(process.cwd(), "rag");
const OUT_FILE = path.join(OUT_DIR, "index.json");

const EMBED_MODEL = "gemini-embedding-001";
const BATCH_SIZE = 32;

function assertEnv(name) {
  const v = process.env[name];
  if (!v) throw new Error(`Missing ${name}. Add it to .env.local`);
  return v;
}

async function walkDir(dir) {
  const out = [];
  const entries = await fs.readdir(dir, { withFileTypes: true });
  for (const e of entries) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) out.push(...(await walkDir(full)));
    else out.push(full);
  }
  return out;
}

function normalizeNewlines(s) {
  return s.replace(/\r\n/g, "\n").replace(/\r/g, "\n");
}

function stripFrontmatter(md) {
  if (md.startsWith("---")) {
    const end = md.indexOf("\n---", 3);
    if (end !== -1) return md.slice(end + 4);
  }
  return md;
}

function stableId(sourceRel, chunkTextValue) {
  const h = crypto
    .createHash("sha256")
    .update(sourceRel + "\n" + chunkTextValue)
    .digest("hex");
  return h.slice(0, 16);
}

function extractEmbeddingVector(embeddingObj) {
  if (!embeddingObj) return [];
  if (Array.isArray(embeddingObj.values)) return embeddingObj.values;
  if (Array.isArray(embeddingObj.embedding)) return embeddingObj.embedding;
  if (Array.isArray(embeddingObj)) return embeddingObj;
  return [];
}

function inferType(section, subsection, sourceRel) {
  const s =
    `${section || ""} ${subsection || ""} ${sourceRel || ""}`.toLowerCase();

  if (s.includes("work experience")) return "experience";
  if (s.includes("course assistant")) return "experience";
  if (s.includes("associate software engineer")) return "experience";
  if (s.includes("intern")) return "experience";
  if (s.includes("education")) return "education";
  if (s.includes("skills")) return "skills";
  if (s.includes("projects")) return "project";
  if (s.includes("technical expertise")) return "skills";
  if (s.includes("career goals")) return "career";
  if (s.includes("about me")) return "about";

  return "general";
}

function chunkMarkdownByHeadings(sourceRel, content) {
  const lines = content.split("\n");
  const chunks = [];

  let h1 = "";
  let h2 = "";
  let h3 = "";
  let buffer = [];

  function pushChunk() {
    const text = buffer.join("\n").trim();
    if (!text) {
      buffer = [];
      return;
    }

    const headingPath = [h1, h2, h3].filter(Boolean);
    const section = h2 || h1 || "";
    const subsection = h3 || "";
    const type = inferType(section, subsection, sourceRel);

    const embeddingText = [
      `File: ${sourceRel}`,
      `Section: ${section}`,
      subsection ? `Subsection: ${subsection}` : "",
      headingPath.length ? `Path: ${headingPath.join(" > ")}` : "",
      "",
      text,
    ]
      .filter(Boolean)
      .join("\n");

    chunks.push({
      id: stableId(sourceRel, embeddingText),
      sourceRel,
      section,
      subsection,
      type,
      headingPath,
      text,
      embeddingText,
    });

    buffer = [];
  }

  for (const line of lines) {
    if (line.startsWith("# ")) {
      pushChunk();
      h1 = line.replace(/^# /, "").trim();
      h2 = "";
      h3 = "";
      continue;
    }

    if (line.startsWith("## ")) {
      pushChunk();
      h2 = line.replace(/^## /, "").trim();
      h3 = "";
      continue;
    }

    if (line.startsWith("### ")) {
      pushChunk();
      h3 = line.replace(/^### /, "").trim();
      continue;
    }

    buffer.push(line);
  }

  pushChunk();
  return chunks;
}

async function main() {
  const apiKey = assertEnv("GEMINI_API_KEY");
  const ai = new GoogleGenAI({ apiKey });

  const allFiles = (await walkDir(DATA_DIR))
    .filter((f) => f.endsWith(".md"))
    .sort();

  if (allFiles.length === 0) {
    throw new Error(`No .md files found under ${DATA_DIR}`);
  }

  const chunkRecords = [];

  for (const file of allFiles) {
    const rel = path.relative(DATA_DIR, file).replace(/\\/g, "/");
    const raw = normalizeNewlines(await fs.readFile(file, "utf8"));
    const cleaned = stripFrontmatter(raw).trim();

    const chunks = chunkMarkdownByHeadings(rel, cleaned);

    for (const chunk of chunks) {
      chunkRecords.push(chunk);
    }
  }

  console.log(`Found ${allFiles.length} markdown files.`);
  console.log(
    `Created ${chunkRecords.length} chunks. Embedding in batches of ${BATCH_SIZE}...`,
  );

  const ragChunks = [];

  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  for (let i = 0; i < chunkRecords.length; i += BATCH_SIZE) {
    const batch = chunkRecords.slice(i, i + BATCH_SIZE);
    const contents = batch.map((b) => b.embeddingText);

    let response;

    while (true) {
      try {
        response = await ai.models.embedContent({
          model: EMBED_MODEL,
          contents,
          config: {
            taskType: "RETRIEVAL_DOCUMENT",
          },
        });
        break;
      } catch (err) {
        if (err.status === 429) {
          console.log("Rate limit hit. Waiting 20 seconds before retrying...");
          await sleep(20000);
        } else {
          throw err;
        }
      }
    }

    const embeddingsArr = response?.embeddings ?? [];
    if (
      !Array.isArray(embeddingsArr) ||
      embeddingsArr.length !== batch.length
    ) {
      throw new Error(
        `Embedding response mismatch: got ${embeddingsArr?.length} embeddings for ${batch.length} inputs`,
      );
    }

    for (let j = 0; j < batch.length; j++) {
      const vec = extractEmbeddingVector(embeddingsArr[j]);
      if (!vec.length) {
        throw new Error(
          `Empty embedding vector for chunk ${batch[j].id} (${batch[j].sourceRel})`,
        );
      }

      ragChunks.push({
        id: batch[j].id,
        source: batch[j].sourceRel,
        section: batch[j].section,
        subsection: batch[j].subsection,
        type: batch[j].type,
        headingPath: batch[j].headingPath,
        text: batch[j].text,
        embedding: vec,
      });
    }

    console.log(
      `Embedded ${Math.min(i + BATCH_SIZE, chunkRecords.length)} / ${chunkRecords.length}`,
    );

    await sleep(1200);
  }

  const index = {
    createdAt: new Date().toISOString(),
    model: EMBED_MODEL,
    chunks: ragChunks,
  };

  await fs.mkdir(OUT_DIR, { recursive: true });
  await fs.writeFile(OUT_FILE, JSON.stringify(index, null, 2), "utf8");

  console.log(
    `✅ Wrote vector index to ${path.relative(process.cwd(), OUT_FILE)}`,
  );
  console.log(`Chunks: ${index.chunks.length}`);
  console.log(`Embedding dims (example): ${index.chunks[0].embedding.length}`);
}

main().catch((err) => {
  console.error("❌ Ingestion failed:", err);
  process.exit(1);
});
