"use client";
import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import MessageRendering from "./MessageRendering";
import ThinkingDots from "./ThinkingDots";

function Avatar() {
  return (
    <div className="flex h-8 w-8 shrink-0 select-none items-center justify-center rounded-lg bg-focus-dark font-main-heading text-sm font-bold text-main-dark">
      N
    </div>
  );
}

export default function ChatMessage({ role, content, loading }) {
  const reduce = useReducedMotion();
  const enter = reduce
    ? { initial: { opacity: 0 }, animate: { opacity: 1 } }
    : {
        initial: { opacity: 0, y: 10 },
        animate: { opacity: 1, y: 0 },
      };

  if (role === "user") {
    return (
      <motion.div
        {...enter}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="flex justify-end"
      >
        <div className="max-w-[85%] whitespace-pre-wrap rounded-2xl rounded-br-md border border-focus-dark/20 bg-focus-dark/15 px-4 py-2.5 text-[15px] leading-relaxed text-text-dark sm:text-base">
          {content}
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      {...enter}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className="flex gap-3"
    >
      <Avatar />
      <div className="min-w-0 flex-1 pt-1">
        {loading ? <ThinkingDots /> : <MessageRendering answer={content} />}
      </div>
    </motion.div>
  );
}
