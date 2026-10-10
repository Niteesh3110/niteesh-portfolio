"use client";

import { motion } from "framer-motion";
import { Building2, MapPin } from "lucide-react";
import GradientText from "@/components/GradientText";
import { BlurIn } from "@/components/BlurInText";
import TechBadges from "@/components/TechBadges";

const experiences = [
  {
    id: 1,
    role: "Software Engineer",
    company: "HOS Management",
    stack: "Jul 2026 – Present",
    location: "United States",
    current: true,
    tech: [
      "Next.js",
      "React 19",
      "TypeScript",
      "PostgreSQL",
      "Drizzle ORM",
      "Firebase",
      "Google Cloud",
    ],
    description:
      "Sole engineer on a multi-tenant operations platform for a hospitality group, covering maintenance, housekeeping, vendor, and compliance workflows across multiple properties. Architected and shipped the system end to end with Next.js (App Router), React 19, TypeScript, PostgreSQL, and Drizzle ORM, now spanning 40+ tables and 50+ production migrations. Engineered property and department-scoped RBAC enforced at the data-access boundary rather than the UI, making cross-tenant access structurally impossible. Built a task execution engine with recurring schedules, reusable templates, per-step checklists, and full per-field change history, plus a hand-written spreadsheet-style formula language with dependency ordering and cycle detection. Added real-time sync over a Firestore signal bus, an Excel ingestion pipeline with per-row validation, Google Workspace SSO with bi-directional Calendar sync, and an installable PWA with Web Push and offline support. Deployed on Google Cloud Run with Cloud SQL and Cloud Storage, with GitHub Actions CI on every PR.",
  },
  {
    id: 2,
    role: "Teaching Engineer",
    company: "Stevens Institute of Technology",
    stack: "Jan 2025 – May 2026",
    location: "Hoboken, NJ",
    tech: ["React.js", "Next.js", "Node.js", "GraphQL", "MongoDB", "Jest"],
    description:
      "Designed and delivered full-stack curriculum (React.js, Next.js, Node.js, GraphQL, Redis, MongoDB) to 350+ students across two courses, emphasizing scalable application design and industry best practices. Built automated grading systems using Jest to evaluate student submissions at scale, collaborated with faculty on assessments, and mentored 350+ students on debugging, modular design, and asynchronous programming.",
  },
  {
    id: 3,
    role: "Software Engineer",
    company: "Quantum Mutual Funds",
    stack: "Oct 2022 – Feb 2024",
    location: "Mumbai, India",
    tech: ["Django", "Python", "PostgreSQL", "React", "REST APIs"],
    description:
      "Built and optimized Django REST APIs over financial datasets of 1 million+ NAV, SIP, and folio-level transaction records, cutting API response latency 30% and powering real-time portfolio analytics. Tuned PostgreSQL performance through indexing and query restructuring on multi-million-row tables, improving data-retrieval speed by 25% and keeping daily financial reporting consistent. Built React investor dashboards rendering real-time portfolio and transaction data, improving page load times 25% through frontend architecture and rendering optimizations.",
  },
  {
    id: 4,
    role: "Software Engineering Intern",
    company: "Quantum Mutual Funds",
    stack: "Apr 2022 – Sept 2022",
    location: "Mumbai, India",
    tech: ["React", "Django", "Python", "PostgreSQL"],
    description:
      "Developed reusable React components integrated with Django REST APIs to display real-time financial data, improving usability and maintainability of investor dashboards. Contributed to backend development in Python/Django, implementing and debugging API endpoints. Diagnosed and resolved issues across PostgreSQL, backend services, and data pipelines, improving system reliability and ensuring accurate financial data processing.",
  },
];

function TimelineNode({ current, index }) {
  return (
    <motion.span
      initial={{ scale: 0, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ duration: 0.4, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className="relative z-10 mt-6 flex h-4 w-4 items-center justify-center"
    >
      <span className="absolute h-4 w-4 rounded-full bg-focus-dark/30 blur-[6px]" />
      <span className="h-2.5 w-2.5 rounded-full bg-focus-dark ring-4 ring-focus-dark/15" />
      {current && (
        <span className="absolute h-4 w-4 animate-ping rounded-full border border-focus-dark/50" />
      )}
    </motion.span>
  );
}

function ExperienceCard({ item, index, isLast }) {
  return (
    <div className="relative grid grid-cols-[28px_1fr] gap-4 pb-8 sm:gap-6 md:grid-cols-[36px_1fr]">
      {/* Rail */}
      <div className="relative flex justify-center">
        {!isLast && (
          <span className="absolute left-1/2 top-7 h-[calc(100%-1rem)] w-px -translate-x-1/2 bg-gradient-to-b from-focus-dark/40 via-white/12 to-transparent" />
        )}
        <TimelineNode current={item.current} index={index} />
      </div>

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.55, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
        className={`glass-card glass-card-hover relative rounded-2xl p-5 sm:p-6 ${
          item.current ? "ring-1 ring-focus-dark/25" : ""
        }`}
      >
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h3 className="font-sub-heading text-lg font-semibold text-focus-dark sm:text-xl">
            {item.role}
          </h3>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 font-sub-heading text-xs text-accent-dark/80">
            {item.current && (
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-focus-dark" />
            )}
            {item.stack}
          </span>
        </div>

        <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 font-sub-heading text-sm text-accent-dark/70">
          <span className="inline-flex items-center gap-1.5">
            <Building2 className="h-3.5 w-3.5 text-focus-dark/70" />
            {item.company}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <MapPin className="h-3.5 w-3.5 text-focus-dark/70" />
            {item.location}
          </span>
        </div>

        <p className="mt-4 font-sub-heading text-sm leading-7 text-accent-dark/70">
          {item.description}
        </p>

        <TechBadges items={item.tech} className="mt-4" />
      </motion.div>
    </div>
  );
}

export default function ExperienceTimeline() {
  return (
    <section className="min-h-full w-full px-4 sm:px-6">
      <div className="mx-auto max-w-3xl">
        <header className="pt-14 pb-10 text-center sm:pt-20">
          <p className="text-3xl uppercase tracking-[0.18em] sm:text-4xl sm:tracking-[0.25em]">
            <BlurIn>
              <GradientText
                colors={["#edf6f9", "#b2ff9e", "#edf6f9"]}
                className="font-main-heading"
              >
                My Experience
              </GradientText>
            </BlurIn>
          </p>
          <p className="mx-auto mt-4 max-w-md font-sub-heading text-sm text-accent-dark/70 sm:text-base">
            Building across products, systems, and user experiences.
          </p>
        </header>

        <div className="pb-20">
          {experiences.map((item, index) => (
            <ExperienceCard
              key={item.id}
              item={item}
              index={index}
              isLast={index === experiences.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
