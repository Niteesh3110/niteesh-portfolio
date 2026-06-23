"use client";

import { motion } from "framer-motion";
import GradientText from "@/components/GradientText";
import { BlurIn } from "@/components/BlurInText";

const experiences = [
  {
    id: 1,
    company: "Stevens Institute of Technology",
    role: "Teaching Engineer",
    stack: "Jan 2025 – May 2026",
    description:
      "Designed and delivered full-stack curriculum (React.js, Next.js, Node.js, GraphQL, Redis, MongoDB) to 350+ students across two courses, emphasizing scalable application design and industry best practices. Built automated grading systems using Jest to evaluate student submissions at scale, collaborated with faculty on assessments, and mentored 350+ students on debugging, modular design, and asynchronous programming.",
  },
  {
    id: 2,
    company: "Quantum Mutual Funds",
    role: "Software Engineer",
    stack: "Oct 2022 – Feb 2024",
    description:
      "Built and optimized Django REST APIs over financial datasets of 1 million+ NAV, SIP, and folio-level transaction records, cutting API response latency 30% and powering real-time portfolio analytics. Tuned PostgreSQL performance through indexing and query restructuring on multi-million-row tables, improving data-retrieval speed by 25% and keeping daily financial reporting consistent. Built React investor dashboards rendering real-time portfolio and transaction data, improving page load times 25% through frontend architecture and rendering optimizations.",
  },
  {
    id: 3,
    company: "Quantum Mutual Funds",
    role: "Software Engineering Intern",
    stack: "Apr 2022 – Sept 2022",
    description:
      "Developed reusable React components integrated with Django REST APIs to display real-time financial data, improving usability and maintainability of investor dashboards. Contributed to backend development in Python/Django, implementing and debugging API endpoints. Diagnosed and resolved issues across PostgreSQL, backend services, and data pipelines, improving system reliability and ensuring accurate financial data processing.",
  },
];

function ExperienceRow({ item, isLast, index }) {
  return (
    <div className="grid grid-cols-[24px_1fr] gap-4 md:grid-cols-[1fr_80px_1.4fr] md:gap-6">
      {/* Mobile timeline rail */}
      <div className="relative flex flex-col items-center md:hidden">
        <motion.div
          initial={{ opacity: 0, scale: 0.4 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{
            duration: 0.4,
            delay: index * 0.12 + 0.15,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="relative mt-2 flex h-4 w-4 shrink-0 items-center justify-center"
        >
          <div className="absolute h-4 w-4 rounded-full bg-white/15 blur-[6px]" />
          <div className="h-2.5 w-2.5 rounded-full border border-white/50 bg-neutral-950" />
        </motion.div>
        {!isLast && (
          <motion.div
            initial={{ scaleY: 0, opacity: 0.4 }}
            whileInView={{ scaleY: 1, opacity: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{
              duration: 0.8,
              delay: index * 0.12,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="mt-2 w-px flex-1 origin-top bg-gradient-to-b from-white/50 via-white/20 to-transparent"
          />
        )}
      </div>

      {/* Mobile card */}
      <motion.div
        initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{
          duration: 0.55,
          delay: index * 0.12 + 0.15,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="glass-card glass-card-hover rounded-2xl p-4 md:hidden"
      >
        <p className="text-sm font-semibold text-white">{item.company}</p>
        <p className="mt-1 text-sm text-neutral-400">{item.role}</p>
        <p className="mt-2 text-xs font-medium text-neutral-300">
          {item.stack}
        </p>
        <p className="mt-3 text-sm leading-6 text-neutral-400">
          {item.description}
        </p>
      </motion.div>

      {/* Desktop: Left */}
      <motion.div
        initial={{ opacity: 0, x: -24 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{
          duration: 0.5,
          delay: index * 0.12 + 0.2,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="hidden items-center justify-end md:flex"
      >
        <h3 className="text-right text-lg font-semibold text-white md:text-xl">
          {item.company}
        </h3>
      </motion.div>

      {/* Desktop: Center line + dot */}
      <div className="relative hidden justify-center md:flex">
        {!isLast && (
          <motion.div
            initial={{ scaleY: 0, opacity: 0.4 }}
            whileInView={{ scaleY: 1, opacity: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{
              duration: 0.8,
              delay: index * 0.12,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="absolute top-10 h-[calc(100%+2.5rem)] w-px origin-top bg-gradient-to-b from-white/50 via-white/20 to-transparent"
          />
        )}

        <motion.div
          initial={{ opacity: 0, scale: 0.4 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{
            duration: 0.4,
            delay: index * 0.12 + 0.15,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="relative mt-8 flex h-5 w-5 items-center justify-center"
        >
          <div className="absolute h-5 w-5 rounded-full bg-white/15 blur-[8px]" />
          <div className="h-3 w-3 rounded-full border border-white/50 bg-neutral-950" />
        </motion.div>
      </div>

      {/* Desktop: Right */}
      <motion.div
        initial={{ opacity: 0, x: 24, filter: "blur(8px)" }}
        whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{
          duration: 0.55,
          delay: index * 0.12 + 0.25,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="hidden glass-card glass-card-hover rounded-3xl p-5 md:block md:p-6"
      >
        <p className="text-lg text-neutral-500">{item.role}</p>

        <p className="mt-3 text-sm font-medium text-neutral-300">
          {item.stack}
        </p>

        <p className="mt-4 text-sm leading-7 text-neutral-400 md:text-base">
          {item.description}
        </p>
      </motion.div>
    </div>
  );
}

export default function ExperienceTimeline() {
  return (
    <section className="w-full px-4 sm:px-6 bg-main-dark min-h-full">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="text-center min-h-dvh flex flex-col items-center justify-center"
        >
          <p className="text-3xl sm:text-4xl md:text-5xl uppercase tracking-[0.15em] sm:tracking-[0.25em] text-white">
            <BlurIn>
              <GradientText
                colors={["#edf6f9", "#cbcbcb", "#f2f2f2"]}
                className="font-main-heading"
              >
                My Experience
              </GradientText>
            </BlurIn>
          </p>

          <p className="mt-3 text-base sm:text-lg md:text-2xl font-semibold text-white">
            <BlurIn>
              <GradientText
                colors={["#174d38", "#cbcbcb", "#f2f2f2"]}
                className="font-sub-heading"
              >
                Building across products, systems, and user experiences.
              </GradientText>
            </BlurIn>
          </p>
        </motion.div>

        <div className="space-y-12 md:space-y-16 py-10">
          {experiences.map((item, index) => (
            <ExperienceRow
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
