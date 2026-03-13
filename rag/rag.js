import fs from "node:fs/promises";
import path from "node:path";

export async function loadIndex() {
  const file = path.join(process.cwd(), "rag", "index.json");
  const raw = await fs.readFile(file, "utf8");
  return JSON.parse(raw);
}

function dot(a, b) {
  let s = 0;
  for (let i = 0; i < a.length; i++) s += a[i] * b[i];
  return s;
}

function norm(a) {
  let s = 0;
  for (let i = 0; i < a.length; i++) s += a[i] * a[i];
  return Math.sqrt(s);
}

export function cosineSimilarity(a, b) {
  const na = norm(a);
  const nb = norm(b);
  if (!na || !nb) return 0;
  return dot(a, b) / (na * nb);
}

export function normalizeQuery(query) {
  const q = query.toLowerCase().trim();

  if (
    q.includes("experience") ||
    q.includes("worked") ||
    q.includes("roles") ||
    q.includes("job") ||
    q.includes("internship")
  ) {
    return {
      rewritten:
        "Summarize Niteesh Panchal's work experience, teaching experience, internships, and professional roles",
      intent: "experience",
    };
  }

  if (
    q.includes("education") ||
    q.includes("degree") ||
    q.includes("university") ||
    q.includes("gpa")
  ) {
    return {
      rewritten:
        "Summarize Niteesh Panchal's education, degrees, university background, and GPA",
      intent: "education",
    };
  }

  if (
    q.includes("skills") ||
    q.includes("technologies") ||
    q.includes("tech stack") ||
    q.includes("tools")
  ) {
    return {
      rewritten:
        "Summarize Niteesh Panchal's technical skills, programming languages, frameworks, and tools",
      intent: "skills",
    };
  }

  if (q.includes("project") || q.includes("built") || q.includes("portfolio")) {
    return {
      rewritten:
        "Summarize Niteesh Panchal's projects, what he built, and the technologies he used",
      intent: "projects",
    };
  }

  return {
    rewritten: query,
    intent: "general",
  };
}

function getMetadataBoost(chunk, intent) {
  const section = (chunk.section || "").toLowerCase();
  const subsection = (chunk.subsection || "").toLowerCase();
  const type = (chunk.type || "").toLowerCase();

  let boost = 0;

  if (intent === "experience") {
    if (type === "experience") boost += 0.25;
    if (section.includes("work experience")) boost += 0.25;
    if (subsection.includes("course assistant")) boost += 0.15;
    if (subsection.includes("engineer")) boost += 0.15;
    if (subsection.includes("intern")) boost += 0.15;
  }

  if (intent === "education") {
    if (type === "education") boost += 0.3;
    if (section.includes("education")) boost += 0.3;
  }

  if (intent === "skills") {
    if (type === "skills") boost += 0.3;
    if (section.includes("skills")) boost += 0.3;
    if (section.includes("technical expertise")) boost += 0.2;
  }

  if (intent === "projects") {
    if (type === "project") boost += 0.3;
    if (section.includes("projects")) boost += 0.3;
  }

  return boost;
}

export function retrieveTopK(index, queryEmbedding, originalQuery, k = 5) {
  const { intent } = normalizeQuery(originalQuery);

  const scored = index.chunks.map((c) => ({
    chunk: c,
    score:
      cosineSimilarity(queryEmbedding, c.embedding) +
      getMetadataBoost(c, intent),
  }));

  scored.sort((x, y) => y.score - x.score);

  return scored.slice(0, k);
}
