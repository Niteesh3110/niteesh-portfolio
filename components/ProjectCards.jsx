"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  animate,
  useMotionValueEvent,
  useInView,
} from "framer-motion";
import {
  ChevronRight,
  ChevronLeft,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import AnimatedBorder from "./AnimatedBorder";
import { Button } from "./ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import Link from "next/link";
import Image from "next/image";

const COLLAPSED_WIDTH = 360;
const EXPANDED_WIDTH = 720;
const COLLAPSED_HEIGHT = 360;
const COLLAPSED_MOBILE_HEIGHT = 260;
const EXPANDED_HEIGHT = 520;
const CONTENT_THRESHOLD = 460;

function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(`(max-width: ${breakpoint - 1}px)`);

    const update = () => setIsMobile(mediaQuery.matches);

    update();
    mediaQuery.addEventListener("change", update);

    return () => mediaQuery.removeEventListener("change", update);
  }, [breakpoint]);

  return isMobile;
}

function DisabledButton({ btnTxt, reason = "Unavailable" }) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <span>
            <Button
              variant="disabled"
              className="rounded-xl border border-white/10 px-4 py-2 text-sm text-accent-dark transition font-sub-heading hover:cursor-not-allowed"
            >
              {btnTxt}
            </Button>
          </span>
        </TooltipTrigger>

        <TooltipContent>
          <p>{reason}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

function ProjectCard({
  project,
  expanded,
  onToggle,
  isLiveButtonDisabled = false,
  isGitHubButtonDisabled = false,
  gitHubLink,
  liveDemoLink,
  video,
  image,
}) {
  const isMobile = useIsMobile();

  const width = useMotionValue(expanded ? EXPANDED_WIDTH : COLLAPSED_WIDTH);
  const height = useMotionValue(
    expanded
      ? EXPANDED_HEIGHT
      : isMobile
        ? COLLAPSED_MOBILE_HEIGHT
        : COLLAPSED_HEIGHT,
  );

  const [showExpandedContent, setShowExpandedContent] = useState(expanded);
  const [showBaseContent, setShowBaseContent] = useState(false);

  const cardRef = useRef(null);
  const isInView = useInView(cardRef, {
    once: true,
    amount: 0.35,
  });

  useEffect(() => {
    let controls;

    if (isMobile) {
      controls = animate(
        height,
        expanded ? EXPANDED_HEIGHT : COLLAPSED_MOBILE_HEIGHT,
        {
          duration: 0.8,
          ease: [0.22, 1, 0.36, 1],
        },
      );

      if (!expanded) setShowExpandedContent(false);
    } else {
      controls = animate(width, expanded ? EXPANDED_WIDTH : COLLAPSED_WIDTH, {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      });

      if (!expanded) setShowExpandedContent(false);
    }

    return () => controls?.stop();
  }, [expanded, isMobile, width, height]);

  useEffect(() => {
    if (!isInView) return;

    const timer = setTimeout(() => {
      setShowBaseContent(true);
    }, 850);

    return () => clearTimeout(timer);
  }, [isInView]);

  useMotionValueEvent(width, "change", (latest) => {
    if (!isMobile && expanded && latest >= CONTENT_THRESHOLD) {
      setShowExpandedContent(true);
    }
  });

  useMotionValueEvent(height, "change", (latest) => {
    if (isMobile && expanded && latest >= 360) {
      setShowExpandedContent(true);
    }
  });

  return (
    <motion.div
      ref={cardRef}
      style={
        isMobile
          ? { height, width: "100%" }
          : { width, height: COLLAPSED_HEIGHT }
      }
      className="relative max-w-full overflow-hidden rounded-3xl shadow-lg"
    >
      <div className="absolute inset-0 rounded-3xl bg-[#297045]/40" />

      <AnimatedBorder isInView={isInView} borderColor="text-accent-dark" />

      <div
        className={`relative z-10 h-full p-5 ${
          isMobile ? "flex flex-col" : "flex items-stretch"
        }`}
      >
        {!isMobile ? (
          <>
            {/* Desktop / tablet horizontal layout */}
            <div className="min-w-[260px] w-[260px] shrink-0">
              <AnimatePresence>
                {showBaseContent && (
                  <motion.div
                    initial={{ opacity: 0, y: 18, filter: "blur(6px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    transition={{ duration: 0.45, ease: "easeOut" }}
                    className="flex h-full flex-col justify-between"
                  >
                    <div className="space-y-3">
                      <h3 className="truncate text-lg font-semibold text-accent-dark font-sub-heading">
                        {project.title}
                      </h3>

                      <p className="text-sm text-neutral-400 font-sub-heading">
                        {project.stack}
                      </p>
                    </div>

                    <p className="pt-6 text-sm leading-6 text-accent-dark font-sub-heading">
                      {project.description}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="ml-6 flex min-w-0 flex-1 overflow-hidden">
              <AnimatePresence mode="wait">
                {showExpandedContent && (
                  <motion.div
                    key="expanded-content"
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 16 }}
                    transition={{ duration: 0.25 }}
                    className="grid w-full grid-rows-[1fr_auto] gap-5"
                  >
                    <div className="relative w-full overflow-hidden rounded-2xl border border-white/10 bg-neutral-900/70 aspect-video">
                      {video ? (
                        <video
                          src={video}
                          muted
                          loop
                          playsInline
                          controls
                          controlsList="nodownload"
                          preload="metadata"
                          onVolumeChange={(e) => {
                            e.target.muted = true;
                          }}
                          className="h-full w-full object-cover"
                        >
                          <source src={video} type="video/mp4" />
                        </video>
                      ) : image ? (
                        <Image
                          src={image}
                          alt="Project preview"
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center text-sm text-neutral-400">
                          No Project Preview Available
                        </div>
                      )}
                    </div>

                    <div className="flex gap-3">
                      {!isLiveButtonDisabled ? (
                        <Link href={liveDemoLink}>
                          <Button className="rounded-xl border border-white/10 px-4 py-2 text-sm text-accent-dark transition hover:bg-white/5 font-sub-heading hover:cursor-pointer">
                            Live Demo
                          </Button>
                        </Link>
                      ) : (
                        <DisabledButton
                          btnTxt="Live Demo"
                          reason="Live Demo is not available because work is still in progress"
                        />
                      )}

                      {!isGitHubButtonDisabled ? (
                        <Link href={gitHubLink}>
                          <Button className="rounded-xl border border-white/10 px-4 py-2 text-sm text-accent-dark transition hover:bg-white/5 font-sub-heading hover:cursor-pointer">
                            GitHub
                          </Button>
                        </Link>
                      ) : (
                        <DisabledButton
                          btnTxt="GitHub"
                          reason="GitHub Repository is hidden because work is still in progress"
                        />
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="ml-2 flex items-center">
              <AnimatePresence>
                {showBaseContent && (
                  <motion.button
                    onClick={onToggle}
                    initial={{ opacity: 0, scale: 0.85 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                    className="shrink-0 rounded-full border border-white/20 p-2 text-white transition hover:bg-white/5"
                    aria-label={
                      expanded ? "Collapse project card" : "Expand project card"
                    }
                  >
                    {expanded ? (
                      <ChevronLeft size={18} />
                    ) : (
                      <ChevronRight size={18} />
                    )}
                  </motion.button>
                )}
              </AnimatePresence>
            </div>
          </>
        ) : (
          <>
            {/* Mobile vertical layout */}
            <AnimatePresence>
              {showBaseContent && (
                <motion.div
                  initial={{ opacity: 0, y: 18, filter: "blur(6px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{ duration: 0.45, ease: "easeOut" }}
                  className="flex h-full flex-col"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="space-y-2 min-w-0">
                      <h3 className="text-lg font-semibold text-accent-dark font-sub-heading">
                        {project.title}
                      </h3>

                      <p className="text-sm text-neutral-400 font-sub-heading">
                        {project.stack}
                      </p>
                    </div>

                    <motion.button
                      onClick={onToggle}
                      initial={{ opacity: 0, scale: 0.85 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: 0.1 }}
                      className="shrink-0 rounded-full border border-white/20 p-2 text-white transition hover:bg-white/5"
                      aria-label={
                        expanded
                          ? "Collapse project card"
                          : "Expand project card"
                      }
                    >
                      {expanded ? (
                        <ChevronDown size={18} />
                      ) : (
                        <ChevronUp size={18} />
                      )}
                    </motion.button>
                  </div>

                  <AnimatePresence>
                    {showExpandedContent && (
                      <motion.div
                        key="mobile-expanded-content"
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 12 }}
                        transition={{ duration: 0.25 }}
                        className="mt-4 space-y-4"
                      >
                        <div className="flex min-h-[160px] items-center justify-center rounded-2xl border border-white/10 bg-neutral-900/70 text-sm text-neutral-400">
                          Project Preview
                        </div>

                        <div className="flex flex-wrap gap-3">
                          {!isLiveButtonDisabled ? (
                            <Button className="rounded-xl border border-white/10 px-4 py-2 text-sm text-accent-dark transition hover:bg-white/5 font-sub-heading hover:cursor-pointer">
                              <Link href={liveDemoLink}>Live Demo</Link>
                            </Button>
                          ) : (
                            <DisabledButton
                              btnTxt="Live Demo"
                              reason="Live Demo is not available because work is still in progress"
                            />
                          )}

                          {!isGitHubButtonDisabled ? (
                            <Button className="rounded-xl border border-white/10 px-4 py-2 text-sm text-accent-dark transition hover:bg-white/5 font-sub-heading hover:cursor-pointer">
                              <Link href={gitHubLink}>GitHub</Link>
                            </Button>
                          ) : (
                            <DisabledButton
                              btnTxt="GitHub"
                              reason="GitHub Repository is hidden because work is still in progress"
                            />
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <p className="pt-4 text-sm leading-6 text-accent-dark font-sub-heading">
                    {project.description}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </>
        )}
      </div>
    </motion.div>
  );
}

export default ProjectCard;
