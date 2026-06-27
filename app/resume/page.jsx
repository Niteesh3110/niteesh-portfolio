"use client";
import React from "react";
import { motion } from "framer-motion";
import { Download, FileText } from "lucide-react";

export default function ResumePage() {
  return (
    <section className="flex h-full w-full flex-col px-4 py-6 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="mx-auto flex w-full max-w-4xl flex-col gap-6"
      >
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="font-main-heading text-3xl font-bold text-text-dark sm:text-4xl">
              My Resume
            </h1>
          </div>

          <a
            href="/api/resume?download=1"
            className="inline-flex items-center justify-center gap-2 self-start rounded-xl bg-focus-dark px-5 py-3 font-sub-heading text-sm text-main-dark transition-all duration-200 hover:scale-105 hover:bg-focus-dark/80 sm:self-auto"
          >
            <Download className="h-4 w-4" />
            Download PDF
          </a>
        </div>

        <div className="glass-card overflow-hidden rounded-2xl border border-white/10">
          <object
            data="/api/resume"
            type="application/pdf"
            className="h-[70vh] w-full"
          >
            {/* Fallback for browsers that won't embed PDFs */}
            <div className="flex flex-col items-center gap-3 p-8 text-center text-accent-dark">
              <FileText className="h-8 w-8" />
              <p className="font-sub-heading text-sm">
                Your browser can&apos;t preview PDFs inline.
              </p>
              <a
                href="/api/resume?download=1"
                className="text-focus-dark underline underline-offset-4"
              >
                Download the resume instead
              </a>
            </div>
          </object>
        </div>
      </motion.div>
    </section>
  );
}
