"use client";
import React from "react";
import { motion, useReducedMotion } from "framer-motion";

// "Assistant is composing" indicator — three dots that breathe in sequence.
export default function ThinkingDots() {
  const reduce = useReducedMotion();
  const dot = "h-2 w-2 rounded-full bg-accent-dark/70";

  if (reduce) {
    return (
      <div className="flex items-center gap-1.5 opacity-70" role="status" aria-label="Thinking">
        <span className={dot} />
        <span className={dot} />
        <span className={dot} />
      </div>
    );
  }

  return (
    <div className="flex items-center gap-1.5" role="status" aria-label="Thinking">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className={dot}
          animate={{ y: [0, -5, 0], opacity: [0.4, 1, 0.4] }}
          transition={{
            duration: 0.9,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.15,
          }}
        />
      ))}
    </div>
  );
}
