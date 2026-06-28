"use client";

import React, { useMemo } from "react";
import ReactMarkdown from "react-markdown";
import { motion, useReducedMotion } from "framer-motion";
import ScheduleButton from "./ScheduleButton";

const CTA_TAG = "[SCHEDULE_CTA]";

export default function MessageRendering({ answer = "" }) {
  const reduce = useReducedMotion();

  const hasScheduleCTA = answer.includes(CTA_TAG);
  const cleanAnswer = answer.replaceAll(CTA_TAG, "").trim();

  // Split into blocks (paragraphs / lists) so each can reveal in sequence while
  // markdown formatting is preserved — instead of typing then snapping to full.
  const blocks = useMemo(
    () => cleanAnswer.split(/\n{2,}/).filter((b) => b.trim()),
    [cleanAnswer],
  );

  return (
    <div className="h-full flex flex-col overflow-y-auto w-full max-w-3xl text-lg 2xl:text-xl text-accent-dark font-sub-heading text-start [&::-webkit-scrollbar]:hidden">
      {/* my-auto centers short answers but collapses to top-aligned (so the top
          stays scrollable) once the answer is taller than the viewport. */}
      <div className="w-full space-y-3 leading-relaxed my-auto py-2">
        {blocks.map((block, i) => (
          <motion.div
            key={i}
            initial={
              reduce
                ? { opacity: 0 }
                : { opacity: 0, y: 10, filter: "blur(4px)" }
            }
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{
              duration: 0.4,
              delay: reduce ? 0 : i * 0.08,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <ReactMarkdown>{block}</ReactMarkdown>
          </motion.div>
        ))}

        {hasScheduleCTA && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: reduce ? 0 : blocks.length * 0.08 + 0.1 }}
          >
            <ScheduleButton />
          </motion.div>
        )}
      </div>
    </div>
  );
}
