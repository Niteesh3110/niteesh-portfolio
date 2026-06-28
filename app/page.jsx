"use client";
import TextArea from "@/components/TextArea";
import { Input } from "@/components/ui/input";
import React from "react";
import { Button } from "@/components/ui/button";
import { FetchChatResponse } from "@/lib/chatUtils";
import { toast } from "sonner";
import { ArrowUp, Loader2 } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { Suggestion, Suggestions } from "@/components/ai-elements/suggestion";
import { useChatStore } from "@/stores/useChatStore";

export default function Home() {
  const {
    message,
    answer,
    showIntroText,
    isLoading,
    questionCount,
    setMessage,
    setAnswer,
    setShowIntroText,
    setIsLoading,
    incrementQuestionCount,
    resetChatInput,
  } = useChatStore();

  const reduce = useReducedMotion();

  const suggestions = [
    "Who is Niteesh Panchal?",
    "What projects has he built?",
    "What is his educational background?",
    "What roles has he worked in?",
    "What technologies does he specialize in?",
    "What roles is he currently looking for?",
    "What are his main technical skills?",
    "What type of systems does he enjoy building?",
    "What are his interests outside technology?",
  ];

  function handleSuggestionClick(suggestion) {
    setMessage(suggestion);
  }

  async function handleSendMessage() {
    const currentMessage = message.trim();
    if (!currentMessage) return;

    setShowIntroText(false);
    resetChatInput();
    setAnswer("");
    setIsLoading(true);
    incrementQuestionCount();

    try {
      const res = await FetchChatResponse(currentMessage, questionCount + 1);

      if (res.status >= 500 && res.status < 600) {
        toast.error("Oh no the AI needs some space!");
        setAnswer(
          res.data?.answer ||
            "Ugh! I need some rest now. Please feel free to check his portfolio page on your own or you can schedule a call with him. Thank you! P.S I am broke so I had to implement rate limit.",
        );
        return;
      }

      setAnswer(res.data?.answer || "");
    } catch (error) {
      toast.error("Oh no the AI needs some space!");
      setAnswer(
        "Ugh! I need some rest now. Please feel free to check his portfolio page on your own or you can schedule a call with him. Thank you! P.S I am broke so I had to implement rate limit.",
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <section className="flex h-full w-full min-w-0 flex-col overflow-x-hidden">
      <div className="flex min-h-0 min-w-0 flex-1 flex-col w-full">
        <div className="flex min-h-0 min-w-0 flex-1 justify-center overflow-y-auto px-3 py-4 sm:px-4 md:px-6 lg:px-8">
          <div className="flex min-h-0 w-full min-w-0 max-w-2xl items-center justify-center lg:max-w-4xl">
            <TextArea
              answer={answer}
              showIntroText={showIntroText}
              isLoading={isLoading}
            />
          </div>
        </div>

        <div className="w-full px-3 pb-3 pt-2 sm:px-4 md:px-6 lg:px-8">
          <div className="glass-card animate-subtle-glow mx-auto w-full max-w-2xl rounded-2xl px-3 py-3 sm:px-4 sm:py-4 lg:max-w-3xl transition-shadow duration-300 focus-within:border-focus-dark/40 focus-within:shadow-[0_0_24px_rgba(178,255,158,0.12)]">
            <div className="flex items-center gap-2 sm:gap-3">
              <Input
                type="text"
                placeholder="Ask me anything."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="h-10 min-w-0 flex-1 rounded-xl border border-white/10 bg-white/5 text-lg text-text-dark placeholder:text-accent-dark/60 placeholder:font-sub-heading placeholder:text-lg focus-visible:ring-1 focus-visible:ring-focus-dark/30 transition-all duration-200 sm:h-11 sm:text-base sm:placeholder:text-base"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
              />

              <Button
                onClick={handleSendMessage}
                disabled={isLoading}
                className="h-10 w-10 shrink-0 rounded-full bg-focus-dark p-0 hover:cursor-pointer hover:bg-focus-dark/80 hover:scale-105 active:scale-95 transition-all duration-200 sm:h-11 sm:w-11"
              >
                {isLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin text-main-dark sm:h-5 sm:w-5" />
                ) : (
                  <ArrowUp className="h-4 w-4 text-main-dark sm:h-5 sm:w-5" />
                )}
              </Button>
            </div>

            <div className="pt-3 sm:pt-4">
              <Suggestions>
                {suggestions.map((suggestion, i) => (
                  <motion.div
                    key={suggestion}
                    className="shrink-0"
                    initial={reduce ? { opacity: 0 } : { opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.3,
                      delay: reduce ? 0 : i * 0.05,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    <Suggestion
                      suggestion={suggestion}
                      onClick={() => handleSuggestionClick(suggestion)}
                      className="shrink-0 rounded-full border border-white/10 bg-white/5 px-4 py-3 text-xs text-accent-dark font-sub-heading transition-all duration-200 hover:bg-white/10 hover:border-focus-dark/30 md:py-2 sm:text-sm md:text-base"
                    />
                  </motion.div>
                ))}
              </Suggestions>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
