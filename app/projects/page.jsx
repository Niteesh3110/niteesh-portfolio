"use client";
import ProjectCards from "@/components/ProjectCards";
import React from "react";
import { useState } from "react";
import { GradualSpacing } from "@/components/GradualSpacing";
import { StaggeredFade } from "@/components/StaggeredFade";

export default function Project() {
  const [activeId, setActiveId] = useState(1);
  const projects = [
    {
      id: 1,
      title: "Haute Cuisine",
      stack:
        "Next.js • Tailwind CSS • MongoDB • Stripe • ShadCn • Zustand • Redis",
      description:
        "A luxury chef-booking platform that connects users with private chefs for curated dining experiences. Built with a multi-step booking flow, secure payments, and real-time scheduling to deliver a premium end-to-end user experience.",
      isGitHubButtonDisabled: true,
      isLiveButtonDisabled: true,
      gitHubLink: "",
      liveDemoLink: "",
      video: "/assets/Haute_Cuisine_Preview.mp4",
    },
    {
      id: 2,
      title: "Haute Cuisine Mobile",
      stack:
        "Next.js • Tailwind CSS • MongoDB • Stripe • ShadCn • Zustand • Redis",
      description: "A Mobile Version of Haute Cuisine",
      isGitHubButtonDisabled: true,
      isLiveButtonDisabled: true,
      gitHubLink: "",
      liveDemoLink: "",
    },
    {
      id: 3,
      title: "LivEcho",
      stack: "React • Firebase • Material UI",
      description:
        "A social platform designed for real-time engagement featuring chat, trending feeds, and interactive discussions. Focused on performance and scalable architecture to support dynamic user-generated content.",
      isGitHubButtonDisabled: false,
      isLiveButtonDisabled: false,
      gitHubLink: "https://github.com/Niteesh3110/liv-echo",
      liveDemoLink: "https://liv-echo.vercel.app/signin",
    },
    {
      id: 4,
      title: "Student Planner",
      stack: "Next.js • Node.js • Graph Visualization",
      description:
        "An academic productivity platform that helps students plan their coursework through interactive curriculum graphs, task tracking, and intelligent scheduling tools.",
      isGitHubButtonDisabled: false,
      isLiveButtonDisabled: true,
      gitHubLink: "https://github.com/Niteesh3110/student_planner",
      liveDemoLink: "",
      video: "/assets/Student_planner_preview.mp4",
    },
    {
      id: 5,
      title: "Portfolio AI Assistant",
      stack:
        "Next.js • RAG • Gemini API • TailwindCSS • ShadCN • GSAP • Framer-Motion",
      description:
        "An AI-powered assistant integrated into my portfolio that answers questions about my work using retrieval-augmented generation. Built with vector embeddings and contextual search for accurate responses.",
      isGitHubButtonDisabled: false,
      isLiveButtonDisabled: true,
      gitHubLink: "https://github.com/Niteesh3110/niteesh-portfolio",
      liveDemoLink: "",
      video: "/assets/Portfolio-website-preview.mp4",
    },
    {
      id: 6,
      title: "Augur Dashboard",
      stack: "Next.js • Recharts • TailwindCSS",
      description:
        "A browser-based logistics dashboard visualizing shipping metrics for distributors. Designed for scalability and extensibility while integrating predictive shipping insights.",
      isGitHubButtonDisabled: false,
      isLiveButtonDisabled: true,
      gitHubLink: "https://github.com/Niteesh3110/Augur",
      liveDemoLink: "",
      video: "/assets/Augur_Dashboard_preview.mp4",
    },
  ];

  return (
    <section className="w-full">
      {/* Intro / Hero */}
      <div className="min-h-dvh w-full flex items-center justify-center px-4 sm:px-6">
        <div className="max-w-4xl text-center">
          <h1 className="font-semibold">
            <GradualSpacing
              text={"MY PROJECTS"}
              className=" font-main-heading text-accent-dark"
            />
          </h1>

          <div className="mt-6">
            <StaggeredFade
              className="mx-auto max-w-3xl text-base font-medium leading-7 text-accent-dark sm:text-lg md:text-xl font-sub-heading"
              text="A selection of projects I’ve built using modern technologies, highlighting my approach to scalable architecture, thoughtful design, and real-world problem solving."
            />
          </div>
        </div>
      </div>

      {/* Cards section */}
      <div className="w-full min-h-dvh px-4 sm:px-6 pb-20 flex flex-col gap-8 sm:gap-10 items-center">
        {projects.map((project, index) => {
          const expanded = activeId === project.id;

          return (
            <ProjectCards
              key={`${index}-${project.title}`}
              project={project}
              expanded={expanded}
              onToggle={() => setActiveId(expanded ? null : project.id)}
              isGitHubButtonDisabled={project.isGitHubButtonDisabled || false}
              isLiveButtonDisabled={project.isLiveButtonDisabled || false}
              gitHubLink={project.gitHubLink}
              liveDemoLink={project.liveDemoLink}
              video={project.video}
              image={project.image}
            />
          );
        })}
      </div>
    </section>
  );
}
