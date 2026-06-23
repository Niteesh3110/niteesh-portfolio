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

  const intents = [
    {
      intent: "experience",
      keywords: ["experience", "worked", "roles", "job", "internship", "career", "employment", "company", "quantum", "stevens"],
      rewritten: "Summarize Niteesh Panchal's work experience including Teaching Engineer at Stevens, Software Engineer and Intern at Quantum Mutual Funds",
    },
    {
      intent: "teaching",
      keywords: ["teach", "teaching", "course", "students", "mentor", "grading", "curriculum", "lecture", "jest"],
      rewritten: "Summarize Niteesh Panchal's teaching experience as Teaching Engineer at Stevens Institute, curriculum design, mentoring 350+ students, and automated grading with Jest",
    },
    {
      intent: "education",
      keywords: ["education", "degree", "university", "gpa", "college", "school", "masters", "bachelors", "coursework", "graduation", "graduate"],
      rewritten: "Summarize Niteesh Panchal's education: M.S. in Computer Science at Stevens Institute of Technology and B.S. from University of Mumbai",
    },
    {
      intent: "skills",
      keywords: ["skills", "technologies", "tech stack", "tools", "languages", "frameworks", "proficient"],
      rewritten: "Summarize Niteesh Panchal's technical skills: JavaScript, TypeScript, Python, React, Next.js, Django, Node.js, PostgreSQL, MongoDB, Redis",
    },
    {
      intent: "projects",
      keywords: ["project", "built", "portfolio", "haute cuisine", "livecho", "student planner", "augur", "rag", "marketplace"],
      rewritten: "Summarize Niteesh Panchal's projects: Haute Cuisine marketplace, LivEcho social platform, Portfolio AI Assistant, Student Planner, and Augur dashboard",
    },
    {
      intent: "django",
      keywords: ["django", "python backend", "rest api", "nav", "financial"],
      rewritten: "Summarize Niteesh Panchal's Django experience: building REST APIs over 1 million+ financial records at Quantum Mutual Funds, and Python backend development",
    },
    {
      intent: "database",
      keywords: ["database", "postgresql", "postgres", "mongodb", "redis", "sql", "indexing", "query"],
      rewritten: "Summarize Niteesh Panchal's database experience: PostgreSQL tuning on multi-million-row tables, MongoDB data modeling, and Redis caching",
    },
    {
      intent: "frontend",
      keywords: ["frontend", "front-end", "react", "next.js", "ui", "dashboard", "tailwind", "mobile", "react native", "expo"],
      rewritten: "Summarize Niteesh Panchal's frontend experience: React, Next.js, React Native, Expo, Tailwind CSS, Zustand, building dashboards and cross-platform apps",
    },
    {
      intent: "ai",
      keywords: ["ai", "machine learning", "ml", "rag", "embedding", "gemini", "openai", "moderation", "chatbot", "assistant"],
      rewritten: "Summarize Niteesh Panchal's AI experience: custom RAG pipeline with Gemini embeddings, OpenAI Moderation API, semantic vector search, portfolio AI assistant",
    },
    {
      intent: "contact",
      keywords: ["contact", "reach", "email", "phone", "linkedin", "github", "hire", "connect", "schedule", "call", "meet", "available", "availability"],
      rewritten: "How to contact Niteesh Panchal: email, LinkedIn, GitHub, portfolio website, scheduling a call, and his availability for roles",
    },
    {
      intent: "career",
      keywords: ["looking for", "goal", "career", "future", "aspire", "vision", "seeking", "want to work", "interested in", "open to"],
      rewritten: "Summarize Niteesh Panchal's career goals: seeking full-time SWE roles, available immediately, open to remote/hybrid/on-site",
    },
    {
      intent: "about",
      keywords: ["who is", "tell me about", "about yourself", "introduce", "summary", "background", "yourself"],
      rewritten: "Who is Niteesh Panchal: full-stack software engineer with 2 years industry experience, Teaching Engineer, M.S. in CS at Stevens, building production apps with React, Django, PostgreSQL",
    },
  ];

  for (const { intent, keywords, rewritten } of intents) {
    if (keywords.some((kw) => q.includes(kw))) {
      return { rewritten, intent };
    }
  }

  return { rewritten: query, intent: "general" };
}

function getMetadataBoost(chunk, intent) {
  const section = (chunk.section || "").toLowerCase();
  const subsection = (chunk.subsection || "").toLowerCase();
  const type = (chunk.type || "").toLowerCase();
  const source = (chunk.source || "").toLowerCase();
  const text = (chunk.text || "").toLowerCase();

  let boost = 0;

  if (intent === "experience") {
    if (type === "experience") boost += 0.25;
    if (section.includes("work experience")) boost += 0.25;
    if (subsection.includes("teaching engineer")) boost += 0.2;
    if (subsection.includes("software engineer")) boost += 0.2;
    if (subsection.includes("intern")) boost += 0.15;
  }

  if (intent === "teaching") {
    if (source.includes("teaching")) boost += 0.3;
    if (subsection.includes("teaching engineer")) boost += 0.25;
    if (text.includes("350+ students")) boost += 0.15;
    if (text.includes("jest")) boost += 0.1;
  }

  if (intent === "education") {
    if (type === "education") boost += 0.3;
    if (section.includes("education")) boost += 0.3;
  }

  if (intent === "skills") {
    if (type === "skills") boost += 0.3;
    if (section.includes("skills")) boost += 0.3;
    if (source.includes("technical_expertise")) boost += 0.2;
  }

  if (intent === "projects") {
    if (type === "project") boost += 0.3;
    if (source.includes("projects")) boost += 0.3;
  }

  if (intent === "django") {
    if (text.includes("django")) boost += 0.3;
    if (text.includes("quantum")) boost += 0.2;
    if (subsection.includes("software engineer")) boost += 0.15;
  }

  if (intent === "database") {
    if (text.includes("postgresql") || text.includes("postgres")) boost += 0.25;
    if (text.includes("mongodb")) boost += 0.2;
    if (text.includes("redis")) boost += 0.2;
    if (text.includes("indexing")) boost += 0.15;
  }

  if (intent === "frontend") {
    if (text.includes("react")) boost += 0.2;
    if (text.includes("next.js")) boost += 0.2;
    if (text.includes("react native") || text.includes("expo")) boost += 0.2;
    if (source.includes("technical_expertise")) boost += 0.1;
  }

  if (intent === "ai") {
    if (text.includes("rag")) boost += 0.3;
    if (text.includes("gemini") || text.includes("openai")) boost += 0.25;
    if (text.includes("embedding")) boost += 0.2;
    if (text.includes("moderation")) boost += 0.15;
  }

  if (intent === "contact") {
    if (source.includes("contact")) boost += 0.35;
    if (text.includes("email") || text.includes("linkedin") || text.includes("github")) boost += 0.2;
    if (text.includes("schedule") || text.includes("call")) boost += 0.2;
    if (text.includes("available")) boost += 0.15;
  }

  if (intent === "career") {
    if (source.includes("career")) boost += 0.3;
    if (text.includes("looking for") || text.includes("seeking")) boost += 0.2;
    if (text.includes("available immediately")) boost += 0.2;
  }

  if (intent === "about") {
    if (source.includes("about")) boost += 0.3;
    if (source.includes("faq")) boost += 0.2;
    if (section.includes("summary")) boost += 0.2;
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
