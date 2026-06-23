"use client";

import Cal, { getCalApi } from "@calcom/embed-react";
import { useEffect } from "react";
import { motion } from "framer-motion";

export default function Schedule() {
  useEffect(() => {
    (async function () {
      const cal = await getCalApi();
      cal("ui", {
        theme: "dark",
        cssVarsPerTheme: {
          dark: {
            "cal-bg": "#174d38",
            "cal-bg-emphasis": "#1a5a42",
            "cal-text": "#f2f2f2",
            "cal-text-emphasis": "#ffffff",
            "cal-border": "rgba(255,255,255,0.1)",
            "cal-brand": "#b2ff9e",
            "cal-brand-emphasis": "#8fdd7a",
            "cal-brand-text": "#174d38",
          },
        },
        hideEventTypeDetails: false,
      });
    })();
  }, []);

  return (
    <section className="w-full h-full flex flex-col items-center px-2 sm:px-4 py-2 sm:py-4 overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="text-center shrink-0 mb-2 sm:mb-3"
      >
        <h1 className="text-xl sm:text-2xl md:text-3xl font-semibold font-main-heading text-accent-dark">
          Let&apos;s Connect
        </h1>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="mt-1 text-xs sm:text-sm text-accent-dark/70 font-sub-heading max-w-md mx-auto"
        >
          Pick a time that works for you. Whether it&apos;s about a role, a
          project, or just a conversation about tech.
        </motion.p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-4xl flex-1 min-h-0 overflow-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
      >
        <Cal
          calLink="niteesh-panchal/quick-call"
          config={{ layout: "month_view" }}
          style={{
            width: "100%",
            height: "100%",
            transform: "scale(0.9)",
            transformOrigin: "top center",
          }}
        />
      </motion.div>
    </section>
  );
}
