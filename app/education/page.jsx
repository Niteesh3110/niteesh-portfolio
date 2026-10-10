"use client";
import React from "react";
import { motion } from "framer-motion";
import { GraduationCap, MapPin, Calendar } from "lucide-react";
import { FadeUpTextEffect } from "@/components/FadeUpTextEffect";
import TechBadges from "@/components/TechBadges";

const schools = [
  {
    id: 1,
    university: "Stevens Institute of Technology",
    degree: "M.S. in Computer Science",
    year: "2024 – 2026",
    location: "Hoboken, NJ",
    gpa: "3.6",
    skills: [
      "NumPy",
      "React.js",
      "Next.js",
      "GraphQL",
      "Redis",
      "Matplotlib",
      "Agile Methodology",
    ],
  },
  {
    id: 2,
    university: "University of Mumbai",
    degree: "B.S. in Computer Science",
    year: "2019 – 2022",
    location: "Mumbai, India",
    gpa: "3.8",
    skills: [
      "Python",
      "JavaScript",
      "Object Oriented Programming",
      "Game Programming",
      "Ethical Hacking",
      "Wireless Networks",
      "Mobile Development",
    ],
  },
];

function EducationCard({ item, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24, filter: "blur(6px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.6, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
      className="glass-card glass-card-hover relative overflow-hidden rounded-2xl p-6 sm:p-7"
    >
      {/* soft mint glow accent */}
      <div className="pointer-events-none absolute -left-12 -top-12 h-36 w-36 rounded-full bg-focus-dark/10 blur-2xl" />

      <div className="relative flex items-start justify-between gap-4">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-focus-dark/20 bg-focus-dark/10">
            <GraduationCap className="h-6 w-6 text-focus-dark" />
          </div>
          <div className="min-w-0">
            <h3 className="font-sub-heading text-lg font-semibold text-text-dark sm:text-xl">
              {item.university}
            </h3>
            <p className="mt-1 font-sub-heading text-sm text-focus-dark/90">
              {item.degree}
            </p>
            <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 font-sub-heading text-xs text-accent-dark/60">
              <span className="inline-flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5 text-focus-dark/70" />
                {item.year}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5 text-focus-dark/70" />
                {item.location}
              </span>
            </div>
          </div>
        </div>

        <div className="shrink-0 rounded-xl border border-focus-dark/20 bg-focus-dark/10 px-3 py-2 text-center">
          <p className="font-sub-heading text-[10px] uppercase tracking-wider text-accent-dark/50">
            GPA
          </p>
          <p className="font-main-heading text-lg font-bold text-focus-dark">
            {item.gpa}
          </p>
        </div>
      </div>

      <div className="relative mt-5">
        <p className="mb-2 font-sub-heading text-xs uppercase tracking-wider text-accent-dark/40">
          Coursework & Skills
        </p>
        <TechBadges items={item.skills} />
      </div>
    </motion.div>
  );
}

export default function Education() {
  return (
    <section className="min-h-full w-full px-4 sm:px-6">
      <div className="mx-auto max-w-3xl">
        <header className="pt-14 pb-10 text-center text-text-dark sm:pt-20">
          <FadeUpTextEffect
            className="text-3xl sm:text-4xl md:text-5xl"
            duration={0.7}
            delay={0.2}
            staggerChildren={0.15}
          >
            <h1 className="font-main-heading">My Education</h1>
          </FadeUpTextEffect>
          <FadeUpTextEffect
            className="mx-auto mt-4 max-w-md text-sm sm:text-base"
            duration={0.7}
            delay={0.6}
            staggerChildren={0.12}
          >
            <p className="font-sub-heading text-accent-dark/70">
              My academic background and the skills I developed along the way.
            </p>
          </FadeUpTextEffect>
        </header>

        <div className="space-y-6 pb-20">
          {schools.map((item, index) => (
            <EducationCard key={item.id} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
