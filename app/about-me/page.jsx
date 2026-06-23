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
    <section className="w-full min-h-full flex flex-col text-accent-dark">
      <div className="px-4 pt-10 sm:px-6 md:px-10 lg:px-12 xl:px-14 md:pt-16">
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
              className="text-lg sm:text-xl md:text-2xl font-semibold font-main-heading text-accent-dark"
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
      </div>

      <div className="flex flex-1 flex-col">
        <div className="w-full flex items-center justify-center my-6 md:my-8">
          <AnimatedContent
            distance={100}
            direction="vertical"
            reverse={false}
            duration={0.8}
            ease="power3.out"
            initialOpacity={0}
            animateOpacity
            scale={1}
            threshold={0.1}
            delay={2}
            className="w-full max-w-5xl px-4 sm:px-6 md:px-10 lg:px-14 text-accent-dark"
          >
            <p className="text-base sm:text-lg leading-7 font-sub-heading">
              {introductionText}
            </p>
          </AnimatedContent>
        </div>

        <div className="px-4 pb-10 sm:px-6 md:px-10 lg:px-14">
          <AnimatedContent
            distance={100}
            direction="vertical"
            reverse={false}
            duration={0.8}
            ease="power3.out"
            initialOpacity={0}
            animateOpacity
            scale={1}
            threshold={0.1}
            delay={3}
            className="w-full"
          >
            <h1 className="text-2xl sm:text-3xl pb-6 md:pb-9 text-accent-dark font-sub-heading">
              My Tech Stack
            </h1>

            <div className="overflow-hidden w-full max-w-sm sm:max-w-xl md:max-w-3xl xl:max-w-4xl mx-auto flex items-center justify-center">
              <LogoLoop
                logos={techLogos}
                speed={100}
                direction="left"
                logoHeight={48}
                gap={32}
                hoverSpeed={0}
                scaleOnHover
                fadeOut
                fadeOutColor="#174d38"
                ariaLabel="Technology partners"
              />
            </div>
          </AnimatedContent>
        </div>
      </div>

      <div className="h-6" />
    </section>
  );
}
