"use client";
import React, { useRef, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FetchChatResponse } from "@/lib/chatUtils";
import { toast } from "sonner";
import {
  ArrowUp,
  Loader2,
  User,
  Briefcase,
  FolderGit2,
  Code2,
  RotateCcw,
} from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { useChatStore } from "@/stores/useChatStore";
import ChatMessage from "@/components/ChatMessage";
import IntroText from "@/components/IntroText";

const FALLBACK =
  "Ugh! I need some rest now. Please feel free to check his portfolio page on your own or you can schedule a call with him. Thank you! P.S I am broke so I had to implement a rate limit.";

const SUGGESTION_CARDS = [
  { label: "Who is Niteesh?", icon: User },
  { label: "What is he working on now?", icon: Briefcase },
  { label: "What projects has he built?", icon: FolderGit2 },
  { label: "What's his tech stack?", icon: Code2 },
];

// Pool for follow-up chips shown after an answer (already-asked ones are hidden).
const FOLLOWUPS = [
  "What projects has he built?",
  "What's his tech stack?",
  "Tell me about his experience",
  "What's his educational background?",
  "What is he working on now?",
  "What roles has he worked in?",
  "How can I contact him?",
  "What are his interests outside tech?",
];

const uid = () =>
  (globalThis.crypto?.randomUUID?.() ?? String(Date.now() + Math.random()));

export default function Home() {
  const {
    message,
    messages,
    isLoading,
    questionCount,
    setMessage,
    setIsLoading,
    incrementQuestionCount,
    resetChatInput,
    addMessage,
    updateMessage,
    clearChat,
  } = useChatStore();

  const reduce = useReducedMotion();
  const bottomRef = useRef(null);
  const isEmpty = messages.length === 0;

  // Follow-up chips appear once the latest answer is done (not mid-generation).
  const lastMsg = messages[messages.length - 1];
  const showFollowups =
    !isLoading && lastMsg?.role === "assistant" && !lastMsg?.loading;
  const askedSet = new Set(
    messages
      .filter((m) => m.role === "user")
      .map((m) => m.content.toLowerCase().trim()),
  );
  const followups = FOLLOWUPS.filter(
    (f) => !askedSet.has(f.toLowerCase()),
  ).slice(0, 3);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: reduce ? "auto" : "smooth",
      block: "end",
    });
  }, [messages, reduce]);

  async function handleSendMessage(text) {
    const q = (typeof text === "string" ? text : message).trim();
    if (!q || isLoading) return;

    const asstId = uid();
    addMessage({ id: uid(), role: "user", content: q });
    addMessage({ id: asstId, role: "assistant", content: "", loading: true });
    resetChatInput();
    setIsLoading(true);
    incrementQuestionCount();

    try {
      const res = await FetchChatResponse(q, questionCount + 1);
      if (res.status >= 500 && res.status < 600) {
        toast.error("Oh no, the AI needs some space!");
      }
      updateMessage(asstId, {
        content: res.data?.answer || FALLBACK,
        loading: false,
      });
    } catch {
      toast.error("Oh no, the AI needs some space!");
      updateMessage(asstId, { content: FALLBACK, loading: false });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <section className="flex h-full w-full min-w-0 flex-col overflow-x-hidden">
      {/* Conversation / empty state */}
      <div className="flex min-h-0 min-w-0 flex-1 flex-col overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        {isEmpty ? (
          <div className="flex min-h-full flex-col items-center justify-center px-4 py-8">
            <IntroText />
          </div>
        ) : (
          <div className="mx-auto w-full max-w-3xl flex-1 space-y-6 px-3 py-6 sm:px-4">
            {messages.map((m) => (
              <ChatMessage
                key={m.id}
                role={m.role}
                content={m.content}
                loading={m.loading}
              />
            ))}

            {showFollowups && followups.length > 0 && (
              <motion.div
                initial={reduce ? { opacity: 0 } : { opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-wrap gap-2 pl-0 sm:pl-11"
              >
                {followups.map((f) => (
                  <button
                    key={f}
                    onClick={() => handleSendMessage(f)}
                    className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 font-sub-heading text-xs text-accent-dark/80 transition-all duration-200 hover:border-focus-dark/30 hover:bg-white/[0.06] hover:text-focus-dark"
                  >
                    {f}
                  </button>
                ))}
              </motion.div>
            )}

            <div ref={bottomRef} className="h-1" />
          </div>
        )}
      </div>

      {/* Input dock */}
      <div className="w-full px-3 pb-4 pt-2 sm:px-4 md:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-3xl">
          {isEmpty ? (
            <div className="mb-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
              {SUGGESTION_CARDS.map((s, i) => {
                const Icon = s.icon;
                return (
                  <motion.button
                    key={s.label}
                    onClick={() => handleSendMessage(s.label)}
                    initial={reduce ? { opacity: 0 } : { opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.3,
                      delay: reduce ? 0 : i * 0.05,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="group flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-left transition-all duration-200 hover:border-focus-dark/30 hover:bg-white/[0.06]"
                  >
                    <Icon className="h-4 w-4 shrink-0 text-focus-dark/80" />
                    <span className="font-sub-heading text-sm text-accent-dark/90">
                      {s.label}
                    </span>
                  </motion.button>
                );
              })}
            </div>
          ) : (
            <div className="mb-2 flex justify-end">
              <button
                onClick={clearChat}
                className="inline-flex items-center gap-1.5 rounded-full border border-white/10 px-3 py-1.5 font-sub-heading text-xs text-accent-dark/70 transition-all duration-200 hover:border-focus-dark/30 hover:text-accent-dark"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                New chat
              </button>
            </div>
          )}

          <div className="glass-card animate-subtle-glow flex items-center gap-2 rounded-2xl px-3 py-2.5 transition-shadow duration-300 focus-within:border-focus-dark/40 focus-within:shadow-[0_0_24px_rgba(178,255,158,0.12)] sm:gap-3 sm:px-4 sm:py-3">
            <Input
              type="text"
              placeholder="Ask me anything about Niteesh..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="h-10 min-w-0 flex-1 border-none bg-transparent text-base text-text-dark shadow-none placeholder:font-sub-heading placeholder:text-accent-dark/50 focus-visible:ring-0 sm:h-11"
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
            />
            <Button
              onClick={() => handleSendMessage()}
              disabled={isLoading || !message.trim()}
              className="h-10 w-10 shrink-0 rounded-full bg-focus-dark p-0 transition-all duration-200 hover:scale-105 hover:cursor-pointer hover:bg-focus-dark/80 active:scale-95 disabled:opacity-40 disabled:hover:scale-100 sm:h-11 sm:w-11"
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin text-main-dark sm:h-5 sm:w-5" />
              ) : (
                <ArrowUp className="h-4 w-4 text-main-dark sm:h-5 sm:w-5" />
              )}
            </Button>
          </div>

          <p className="mt-2 text-center font-sub-heading text-[11px] text-accent-dark/40">
            Niteesh&apos;s AI assistant. Answers are grounded in his portfolio.
          </p>
        </div>
      </div>
    </section>
  );
}
