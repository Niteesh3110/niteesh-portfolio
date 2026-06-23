"use client";

import { AnimatePresence, motion, useInView } from "framer-motion";
import * as React from "react";

export function GradualSpacing({ text = "Gradual Spacing", className = "" }) {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <div ref={ref} className="flex justify-center space-x-1">
      <AnimatePresence>
        {text.split("").map((char, i) => (
          <motion.p
            key={i}
            initial={{ opacity: 0, x: -18 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            exit={{ opacity: 0, x: -18 }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-center tracking-tighter md:leading-[4rem] ${className}`}
          >
            {char === " " ? <span>&nbsp;</span> : char}
          </motion.p>
        ))}
      </AnimatePresence>
    </div>
  );
}
