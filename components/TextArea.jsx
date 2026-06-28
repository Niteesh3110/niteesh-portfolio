"use client";
import React from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import IntroText from "./IntroText";
import MessageRendering from "./MessageRendering";
import ThinkingDots from "./ThinkingDots";

export default function TextArea({ answer = "", showIntroText }) {
  const reduce = useReducedMotion();
  const ease = [0.22, 1, 0.36, 1];

  // Richer crossfade for the intro/loading swap; the answer fades in plainly so
  // its own staggered block reveal (in MessageRendering) does the talking.
  const swap = reduce
    ? { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 } }
    : {
        initial: { opacity: 0, y: 12, filter: "blur(6px)" },
        animate: { opacity: 1, y: 0, filter: "blur(0px)" },
        exit: { opacity: 0, y: -12, filter: "blur(6px)" },
      };

  return (
    <div className="w-full h-full">
      <AnimatePresence mode="wait">
        {showIntroText ? (
          <motion.div
            key="intro"
            {...swap}
            transition={{ duration: 0.45, ease }}
            className="h-full"
          >
            <IntroText />
          </motion.div>
        ) : answer.trim() === "" ? (
          <motion.div
            key="loading"
            {...swap}
            transition={{ duration: 0.45, ease }}
            className="flex h-full items-center justify-center"
          >
            <ThinkingDots />
          </motion.div>
        ) : (
          <motion.div
            key="answer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease }}
            className="flex h-full items-center justify-center"
          >
            <MessageRendering answer={answer} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
