# Resume

## Contact

Name: Niteesh Panchal  
Email: niteeshpanchal@gmail.com

## Summary

Full-stack software engineer currently working as a Software Engineer at HOS Management, where I am the sole engineer building a multi-tenant hospitality operations platform on Next.js, React, TypeScript, PostgreSQL, and Google Cloud. I have over 2 years of prior industry experience building production-grade applications across React, Next.js, Django, PostgreSQL, MongoDB, and Redis, plus 2 years teaching web development to 350+ students at Stevens Institute of Technology. I hold an M.S. in Computer Science from Stevens (May 2026) and enjoy building scalable, well-architected systems end to end.

## Education

Stevens Institute of Technology — Hoboken, NJ  
M.S. in Computer Science  
GPA: 3.6  
2024 – 2026

University of Mumbai — Mumbai, India  
B.S. in Computer Science  
GPA: 3.8  
2019 – 2022

## Work Experience

### Software Engineer

HOS Management, United States  
July 2026 – Present

- Sole engineer on a multi-tenant operations platform for a hospitality group, covering maintenance, housekeeping, vendor, and compliance workflows across multiple properties.
- Architected, built, and shipped the system end to end with Next.js (App Router), React 19, TypeScript, PostgreSQL, and Drizzle ORM, now spanning 40+ tables and 50+ production migrations.
- Engineered property and department-scoped RBAC enforced in the domain tier, where every read is scoped and every mutation is gated at the data-access boundary rather than the UI, making cross-tenant access structurally impossible.
- Designed a task execution engine with recurring schedules, reusable templates, per-step checklists, per-field change history, and soft deletes, producing a complete audit trail of who changed what and when.
- Implemented a spreadsheet-style formula language from scratch (tokenizer, precedence-climbing parser, tree-walking evaluator) with topological dependency ordering and cycle detection, written by hand rather than with eval since formula source is untrusted input rendered to every user.
- Built real-time sync on a Firestore signal bus, surfacing one user's changes across every open session without polling.
- Developed an Excel ingestion pipeline with SheetJS, including header normalization, editable preview, and per-row validation across four entity types, replacing days of manual entry with a single upload.
- Integrated Google Workspace SSO via Firebase Auth and bi-directional Calendar sync using a domain-wide delegated service account.
- Delivered an installable PWA with Web Push, offline support, and iOS install handling, built for staff working on phones across a property rather than at desks.
- Deployed on Google Cloud Run with Cloud SQL and Cloud Storage, scripted repeatable releases, and set up GitHub Actions CI gating type checks, lint, and build on every PR.

### Teaching Engineer

Stevens Institute of Technology — Hoboken, NJ  
January 2025 – May 2026

- Designed and delivered full-stack curriculum (React.js, Next.js, Node.js, GraphQL, Redis, MongoDB) to 350+ students across two courses, emphasizing scalable application design and industry best practices.
- Built automated grading systems using Jest to evaluate student submissions at scale, collaborated with faculty on assessments, and mentored 350+ students on debugging, modular design, and asynchronous programming.

### Software Engineer

Quantum Mutual Funds — Mumbai, India  
October 2022 – February 2024

- Built and optimized Django REST APIs over financial datasets of 1 million+ NAV, SIP, and folio-level transaction records, cutting API response latency 30% and powering real-time portfolio analytics.
- Tuned PostgreSQL performance through indexing and query restructuring on multi-million-row tables, improving data-retrieval speed by 25% and keeping daily financial reporting consistent.
- Built React investor dashboards rendering real-time portfolio and transaction data, improving page load times 25% through frontend architecture and rendering optimizations.

### Software Engineering Intern

Quantum Mutual Funds — Mumbai, India  
April 2022 – September 2022

- Developed reusable React components integrated with Django REST APIs to display real-time financial data, improving usability and maintainability of investor dashboards.
- Contributed to backend development in Python/Django, implementing and debugging API endpoints.
- Diagnosed and resolved issues across PostgreSQL, backend services, and data pipelines, improving system reliability and ensuring accurate financial data processing.

## Skills

### Languages

JavaScript, TypeScript, Python, Java, SQL

### Frontend

React.js, Next.js, React Native, Tailwind CSS, Redux, Zustand

### Backend

Node.js, Django, Express.js, REST APIs, GraphQL, Drizzle ORM, NextAuth/JWT, Jest, ElasticSearch

### Databases & Cloud

PostgreSQL, MongoDB, Redis, Drizzle ORM, Google Cloud Platform (Cloud Run, Cloud SQL, Cloud Storage), Firebase, AWS, Docker, CI/CD (GitHub Actions)

### AI & Tools

RAG pipelines, Gemini & OpenAI APIs, Stripe, OpenSearch, Git, Agile/Scrum

## Projects

### Haute Cuisine — Next.js, Expo, React Native, MongoDB, Stripe, Redis, Firebase, Zustand, ElasticSearch

Architecting a production cross-platform marketplace as a solo founder, shared Next.js backend serving web (NextAuth, cookie sessions) and mobile (Expo, JWT Bearer auth) clients with role-based access control and ownership-enforced APIs. Integrated Stripe Payment Intents with an escrow-style payout model, Firebase Cloud Messaging for push notifications, and Zustand with AsyncStorage for persistent state across web and mobile.

### LivEcho — React, Vite, Express, MongoDB, Redis, OpenSearch, Firebase, Cloudinary, OpenAI

Built a full-stack social platform with post feeds, private messaging, group chats, and friend management — deployed on Render and Vercel with Firebase auth and Cloudinary media storage. Integrated OpenSearch for full-text search with filters and OpenAI Moderation API for automated text and image content moderation at scale.

### Portfolio AI Assistant — Next.js, Gemini API, RAG, Vector Embeddings, Semantic Search, ShadCN UI

Built an AI-powered assistant using a custom RAG pipeline with Gemini embeddings and semantic vector search over a structured markdown knowledge base, enabling context-aware, hallucination-resistant responses.

### Student Planner — Node.js, Express.js, MongoDB, Handlebars, JavaScript

Engineered a full-stack academic planning platform with course roadmap visualization, calendar management, discussion forums, AI-powered proofreading, file conversion, and secure user authentication.

### Augur — Next.js, Recharts, ShadCN UI, Tailwind CSS | PepsiCo System Design Challenge

Built a distribution analytics dashboard visualizing real-time shipment metrics, year-to-date trends, and month-level forecasting across multiple distributors with interactive click-to-switch charts.
