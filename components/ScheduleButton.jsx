"use client";

import { useEffect, useCallback } from "react";
import { getCalApi } from "@calcom/embed-react";
import { CalendarDays } from "lucide-react";
import { motion } from "framer-motion";

export default function ScheduleButton() {
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

  const openCal = useCallback(async () => {
    const cal = await getCalApi();
    cal("modal", {
      calLink: "niteesh-panchal/quick-call",
      config: { layout: "month_view" },
    });
  }, []);

  return (
    <motion.button
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
      onClick={openCal}
      className="mt-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-2.5 text-sm font-sub-heading text-accent-dark backdrop-blur-sm transition-all duration-300 hover:bg-focus-dark hover:text-main-dark hover:border-focus-dark hover:scale-105 cursor-pointer"
    >
      <CalendarDays className="h-4 w-4" />
      Schedule a Call with Niteesh
    </motion.button>
  );
}
