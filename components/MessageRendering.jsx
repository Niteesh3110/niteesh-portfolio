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

  // Split into blocks (paragraphs / lists) so each reveals in sequence while
  // markdown formatting is preserved.
  const blocks = useMemo(
    () => cleanAnswer.split(/\n{2,}/).filter((b) => b.trim()),
    [cleanAnswer],
  );

  return (
    <div className="answer-content w-full space-y-3 text-[15px] leading-relaxed text-text-dark/90 sm:text-base">
      {blocks.map((block, i) => (
        <motion.div
          key={i}
          initial={
            reduce ? { opacity: 0 } : { opacity: 0, y: 8, filter: "blur(4px)" }
          }
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{
            duration: 0.35,
            delay: reduce ? 0 : i * 0.06,
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
          transition={{ delay: reduce ? 0 : blocks.length * 0.06 + 0.1 }}
        >
          <ScheduleButton />
        </motion.div>
      )}
    </div>
  );
}
