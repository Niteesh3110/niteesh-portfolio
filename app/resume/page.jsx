"use client";
import React from "react";
import { motion } from "framer-motion";
import { Download, FileText, ExternalLink } from "lucide-react";

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

        {/* Desktop / tablet: inline PDF preview (works on md+ browsers) */}
        <div className="glass-card hidden overflow-hidden rounded-2xl border border-white/10 md:block">
          <object
            data="/api/resume"
            type="application/pdf"
            className="h-[70vh] w-full"
          >
            {/* Fallback for desktop browsers without a PDF viewer */}
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

        {/* Mobile: phones don't reliably embed PDFs, so offer a tap-to-open card */}
        <a
          href="/api/resume"
          target="_blank"
          rel="noopener noreferrer"
          className="glass-card flex flex-col items-center gap-4 rounded-2xl border border-white/10 p-8 text-center transition-all duration-200 active:scale-[0.98] md:hidden"
        >
          <FileText className="h-10 w-10 text-focus-dark" />
          <div>
            <p className="font-sub-heading text-base text-text-dark">
              Niteesh_Panchal_Resume.pdf
            </p>
            <p className="mt-1 font-sub-heading text-sm text-accent-dark/70">
              Tap to open the full resume in your browser
            </p>
          </div>
          <span className="inline-flex items-center gap-2 rounded-xl bg-focus-dark px-4 py-2.5 font-sub-heading text-sm text-main-dark">
            <ExternalLink className="h-4 w-4" />
            View PDF
          </span>
        </a>
      </motion.div>
    </section>
  );
}
