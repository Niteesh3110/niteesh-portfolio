"use client";

import React, { useEffect, useMemo, useState } from "react";
import ReactMarkdown from "react-markdown";
import { useTypewriter, Cursor } from "react-simple-typewriter";
import ScheduleButton from "./ScheduleButton";

const CTA_TAG = "[SCHEDULE_CTA]";

export default function MessageRendering({ answer = "" }) {
  const LONG_THRESHOLD = 600;
  const PREVIEW_CHARS = 520;

  const hasScheduleCTA = answer.includes(CTA_TAG);
  const cleanAnswer = answer.replaceAll(CTA_TAG, "").trim();

  const previewText = useMemo(() => {
    const text = cleanAnswer;
    if (text.length <= LONG_THRESHOLD) return text;

    const cut = text.slice(0, PREVIEW_CHARS);
    const lastSpace = cut.lastIndexOf(" ");
    return (lastSpace > 200 ? cut.slice(0, lastSpace) : cut) + "…";
  }, [cleanAnswer]);

  const [showFull, setShowFull] = useState(false);

  useEffect(() => {
    setShowFull(false);
  }, [answer]);

  const [text] = useTypewriter({
    words: [previewText],
    loop: 1,
    typeSpeed: 10,
    deleteSpeed: 0,
    delaySpeed: 0,
  });

  useEffect(() => {
    if (!showFull && text === previewText) {
      setShowFull(true);
    }
  }, [text, previewText, showFull]);

  return (
    <div className="h-full flex flex-col justify-center items-center overflow-y-auto w-full max-w-3xl text-lg 2xl:text-xl text-accent-dark font-sub-heading text-start">
      {!showFull ? (
        <div>
          <span>{text}</span>
          <Cursor cursorStyle="▍" />
        </div>
      ) : (
        <div>
          <ReactMarkdown>{cleanAnswer}</ReactMarkdown>
          {hasScheduleCTA && <ScheduleButton />}
        </div>
      )}
    </div>
  );
}
