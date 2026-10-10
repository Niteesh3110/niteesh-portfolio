"use client";

import SplitText from "@/components/SplitText";
import AnimatedContent from "@/components/AnimatedContent";
import LogoLoop from "@/components/LogoLoop";
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiMongodb,
  SiDocker,
  SiFlask,
  SiGraphql,
  SiPostgresql,
  SiGithub,
} from "react-icons/si";

import { useRef, useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { motion } from "framer-motion";
import { Briefcase, Users, Rocket, GraduationCap } from "lucide-react";
import TechBadges from "@/components/TechBadges";

const STATS = [
  { icon: Briefcase, value: "2+ yrs", label: "Industry experience" },
  { icon: Users, value: "350+", label: "Students taught" },
  { icon: Rocket, value: "6+", label: "Projects shipped" },
  { icon: GraduationCap, value: "M.S.", label: "Computer Science" },
];

const FOCUS_AREAS = [
  "Full-stack engineering",
  "Scalable backend systems",
  "Multi-tenant architecture",
  "Cross-platform apps",
  "AI-powered features",
  "Cloud & DevOps",
];

export default function AboutMe() {
  const [showSecond, setShowSecond] = useState(false);
  const firedRef = useRef(false);

  const introductionText =
    "I’m a 25-year-old Full-Stack Developer passionate about building scalable, high-performance web applications. I specialize in modern front-end technologies like TypeScript, React, and Next.js, and robust back-end systems using Node.js, Docker, and MongoDB. I focus on writing clean, maintainable code and delivering intuitive, user-centered experiences.";

  const techLogos = [
    {
      node: (
        <Tooltip>
          <TooltipTrigger asChild>
            <SiReact className="text-accent-dark" />
          </TooltipTrigger>
          <TooltipContent>
            <p>React</p>
          </TooltipContent>
        </Tooltip>
      ),
      title: "React",
      href: "https://react.dev",
    },
    {
      node: (
        <Tooltip>
          <TooltipTrigger asChild>
            <SiNextdotjs className="text-accent-dark" />
          </TooltipTrigger>
          <TooltipContent>
            <p>Next.js</p>
          </TooltipContent>
        </Tooltip>
      ),
      title: "Next.js",
      href: "https://nextjs.org",
    },
    {
      node: (
        <Tooltip>
          <TooltipTrigger asChild>
            <SiTypescript className="text-accent-dark" />
          </TooltipTrigger>
          <TooltipContent>
            <p>TypeScript</p>
          </TooltipContent>
        </Tooltip>
      ),
      title: "TypeScript",
      href: "https://www.typescriptlang.org",
    },
    {
      node: (
        <Tooltip>
          <TooltipTrigger asChild>
            <SiTailwindcss className="text-accent-dark" />
          </TooltipTrigger>
          <TooltipContent>
            <p>TailwindCSS</p>
          </TooltipContent>
        </Tooltip>
      ),
      title: "Tailwind CSS",
      href: "https://tailwindcss.com",
    },
    {
      node: (
        <Tooltip>
          <TooltipTrigger asChild>
            <SiMongodb className="text-accent-dark" />
          </TooltipTrigger>
          <TooltipContent>
            <p>MongoDB</p>
          </TooltipContent>
        </Tooltip>
      ),
      title: "MongoDB",
      href: "https://mongodb.com",
    },
    {
      node: (
        <Tooltip>
          <TooltipTrigger asChild>
            <SiDocker className="text-accent-dark" />
          </TooltipTrigger>
          <TooltipContent>
            <p>Docker</p>
          </TooltipContent>
        </Tooltip>
      ),
      title: "Docker",
      href: "https://www.docker.com",
    },
    {
      node: (
        <Tooltip>
          <TooltipTrigger asChild>
            <SiFlask className="text-accent-dark" />
          </TooltipTrigger>
          <TooltipContent>
            <p>Flask</p>
          </TooltipContent>
        </Tooltip>
      ),
      title: "Flask",
      href: "https://flask.palletsprojects.com/en/stable/",
    },
    {
      node: (
        <Tooltip>
          <TooltipTrigger asChild>
            <SiPostgresql className="text-accent-dark" />
          </TooltipTrigger>
          <TooltipContent>
            <p>PostgreSQL</p>
          </TooltipContent>
        </Tooltip>
      ),
      title: "PostgreSQL",
      href: "https://www.postgresql.org/",
    },
    {
      node: (
        <Tooltip>
          <TooltipTrigger asChild>
            <SiGithub className="text-accent-dark" />
          </TooltipTrigger>
          <TooltipContent>
            <p>Github</p>
          </TooltipContent>
        </Tooltip>
      ),
      title: "Github",
      href: "https://github.com/Niteesh3110",
    },
    {
      node: (
        <Tooltip>
          <TooltipTrigger asChild>
            <SiGraphql className="text-accent-dark" />
          </TooltipTrigger>
          <TooltipContent>
            <p>GraphQL</p>
          </TooltipContent>
        </Tooltip>
      ),
      title: "GraphQL",
      href: "https://graphql.com/",
    },
  ];

  const handleFirstDone = () => {
    if (firedRef.current) return;
    firedRef.current = true;
    setShowSecond(true);
  };

  return (
    <section className="w-full min-h-full text-accent-dark">
      <div className="mx-auto w-full max-w-4xl px-4 pt-14 sm:px-6 sm:pt-20">
        {/* Greeting */}
        <div className="flex flex-col gap-3">
          <SplitText
            text="Hello, my name is Niteesh"
            className="text-3xl sm:text-4xl md:text-5xl font-semibold font-main-heading"
            delay={70}
            duration={1}
            ease="power3.out"
            splitType="words"
            from={{ opacity: 0, y: 40 }}
            to={{ opacity: 1, y: 0 }}
            threshold={0.5}
            rootMargin="-100px"
            textAlign="start"
            onLetterAnimationComplete={handleFirstDone}
            showCallback
          />

          {showSecond && (
            <SplitText
              text="A Full Stack Developer"
              className="text-lg sm:text-xl md:text-2xl font-semibold font-main-heading text-focus-dark"
              delay={70}
              duration={0.75}
              ease="power3.out"
              splitType="words"
              from={{ opacity: 0, y: 40 }}
              to={{ opacity: 1, y: 0 }}
              threshold={0.1}
              rootMargin="-100px"
              textAlign="start"
              onLetterAnimationComplete={() =>
                console.log("Second line complete")
              }
              showCallback
            />
          )}
        </div>

        {/* Current role highlight */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="glass-card relative mt-8 overflow-hidden rounded-2xl p-5 sm:p-6"
        >
          <div className="pointer-events-none absolute -right-10 -top-10 h-36 w-36 rounded-full bg-focus-dark/10 blur-2xl" />
          <div className="relative flex items-center gap-2">
            <span className="h-2 w-2 animate-pulse rounded-full bg-focus-dark" />
            <span className="font-sub-heading text-xs uppercase tracking-wider text-accent-dark/50">
              Currently
            </span>
          </div>
          <p className="relative mt-2 font-sub-heading text-lg text-text-dark sm:text-xl">
            Software Engineer at{" "}
            <span className="font-semibold text-focus-dark">HOS Management</span>
          </p>
          <p className="relative mt-1 font-sub-heading text-sm text-accent-dark/70">
            Building a multi-tenant hospitality operations platform end to end.
          </p>
        </motion.div>

        {/* Stats bento */}
        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {STATS.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{
                  duration: 0.45,
                  delay: i * 0.06,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="glass-card glass-card-hover rounded-2xl p-4"
              >
                <Icon className="h-5 w-5 text-focus-dark/80" />
                <p className="mt-2 font-main-heading text-2xl font-bold text-text-dark">
                  {s.value}
                </p>
                <p className="font-sub-heading text-xs text-accent-dark/60">
                  {s.label}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Intro */}
        <AnimatedContent
          distance={80}
          direction="vertical"
          reverse={false}
          duration={0.8}
          ease="power3.out"
          initialOpacity={0}
          animateOpacity
          scale={1}
          threshold={0.1}
          delay={1}
          className="mt-8"
        >
          <p className="font-sub-heading text-base leading-8 text-accent-dark/85 sm:text-lg">
            {introductionText}
          </p>
        </AnimatedContent>

        {/* Focus areas */}
        <div className="mt-8">
          <h2 className="font-sub-heading text-xs uppercase tracking-wider text-accent-dark/40">
            What I focus on
          </h2>
          <TechBadges items={FOCUS_AREAS} className="mt-3" />
        </div>

        {/* Tech stack */}
        <div className="mt-10 pb-16">
          <h2 className="pb-6 font-sub-heading text-2xl text-text-dark sm:text-3xl">
            My Tech Stack
          </h2>
          <div className="mx-auto flex w-full items-center justify-center overflow-hidden">
            <LogoLoop
              logos={techLogos}
              speed={100}
              direction="left"
              logoHeight={44}
              gap={32}
              hoverSpeed={0}
              scaleOnHover
              fadeOut
              fadeOutColor="#174d38"
              ariaLabel="Technology stack"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
