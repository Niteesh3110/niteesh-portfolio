"use client";

import Cal, { getCalApi } from "@calcom/embed-react";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { Clock, Video, Globe, Mail } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import Link from "next/link";

const DETAILS = [
  {
    icon: Clock,
    title: "15 minutes",
    desc: "A quick, focused intro call.",
  },
  {
    icon: Video,
    title: "Google Meet",
    desc: "A link is sent on confirmation.",
  },
  {
    icon: Globe,
    title: "Your timezone",
    desc: "Times shown in your local time.",
  },
];

const SOCIALS = [
  {
    icon: Mail,
    label: "Email",
    href: "mailto:niteeshpanchal@gmail.com?subject=Portfolio Inquiry",
  },
  {
    icon: FaLinkedin,
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/niteesh-panchal/",
  },
  {
    icon: FaGithub,
    label: "GitHub",
    href: "https://github.com/Niteesh3110",
  },
];

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
    <section className="min-h-full w-full px-4 sm:px-6">
      <div className="mx-auto max-w-5xl py-10 sm:py-14">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="text-center"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-focus-dark/20 bg-focus-dark/10 px-3 py-1 font-sub-heading text-xs text-focus-dark/90">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-focus-dark" />
            Available to connect
          </span>
          <h1 className="mt-4 font-main-heading text-3xl font-semibold text-text-dark sm:text-4xl md:text-5xl">
            Let&apos;s Connect
          </h1>
          <p className="mx-auto mt-3 max-w-md font-sub-heading text-sm text-accent-dark/70 sm:text-base">
            Pick a time that works for you. Whether it&apos;s about a role, a
            project, or just a conversation about tech.
          </p>
        </motion.header>

        {/* Two-column: info + calendar */}
        <div className="mt-8 grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
          {/* Info panel */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col gap-3"
          >
            {DETAILS.map((d) => {
              const Icon = d.icon;
              return (
                <div
                  key={d.title}
                  className="glass-card glass-card-hover flex items-start gap-3 rounded-2xl p-4"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-focus-dark/20 bg-focus-dark/10">
                    <Icon className="h-5 w-5 text-focus-dark" />
                  </div>
                  <div>
                    <p className="font-sub-heading text-sm font-semibold text-text-dark">
                      {d.title}
                    </p>
                    <p className="font-sub-heading text-xs text-accent-dark/60">
                      {d.desc}
                    </p>
                  </div>
                </div>
              );
            })}

            <div className="glass-card rounded-2xl p-4">
              <p className="mb-3 font-sub-heading text-xs uppercase tracking-wider text-accent-dark/40">
                Or reach out directly
              </p>
              <div className="flex flex-wrap gap-2">
                {SOCIALS.map((s) => {
                  const Icon = s.icon;
                  return (
                    <Link
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 font-sub-heading text-xs text-accent-dark/80 transition-all duration-200 hover:border-focus-dark/30 hover:text-focus-dark"
                    >
                      <Icon className="h-3.5 w-3.5" />
                      {s.label}
                    </Link>
                  );
                })}
              </div>
            </div>
          </motion.div>

          {/* Calendar */}
          <motion.div
            initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="glass-card h-[560px] overflow-hidden rounded-2xl p-1.5 sm:h-[620px] sm:p-2"
          >
            <div className="h-full w-full overflow-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
              <Cal
                calLink="niteesh-panchal/quick-call"
                config={{ layout: "month_view" }}
                style={{ width: "100%", height: "100%" }}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
