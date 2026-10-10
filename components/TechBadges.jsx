"use client";
import React from "react";

export default function TechBadges({ items, className = "" }) {
  if (!items?.length) return null;
  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      {items.map((t) => (
        <span
          key={t}
          className="rounded-full border border-focus-dark/20 bg-focus-dark/10 px-2.5 py-1 font-sub-heading text-xs text-focus-dark/90 transition-colors duration-200 hover:border-focus-dark/40 hover:bg-focus-dark/15"
        >
          {t}
        </span>
      ))}
    </div>
  );
}
