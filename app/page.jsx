"use client";
import TextArea from "@/components/TextArea";
import { Input } from "@/components/ui/input";
import React from "react";
import { Button } from "@/components/ui/button";
import { FetchChatResponse } from "@/lib/chatUtils";
import { toast } from "sonner";
import { ArrowUp } from "lucide-react";
import { Suggestion, Suggestions } from "@/components/ai-elements/suggestion";
import { useChatStore } from "@/stores/useChatStore";

export default function Home() {
  const {
    message,
    answer,
    showIntroText,
    isLoading,
    setMessage,
    setAnswer,
    setShowIntroText,
    setIsLoading,
    resetChatInput,
  } = useChatStore();

  const suggestions = [
    "Who is Niteesh Panchal?",
    "What projects has he built?",
    "What is his educational background?",
    "What roles has he worked in?",
    "What technologies does he specialize in?",
    "What roles is he currently looking for?",
    "What are his main technical skills?",
    "What problems did he solve in his projects?",
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

    try {
      const res = await FetchChatResponse(currentMessage);

      if (res.status >= 500 && res.status < 600) {
        toast.error("Something went wrong");
        setAnswer(
          res.data?.answer ||
            "Ugh! I need some rest now. Please feel free to check his portfolio page on your own. Thank you! P.S I am broke so I have implemented rate limit.",
        );
        return;
      }

      setAnswer(res.data?.answer || "");
    } catch (error) {
      toast.error("Something went wrong");
      setAnswer(
        "Ugh! I need some rest now. Please feel free to check his portfolio page on your own.",
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <section className="flex h-full w-full flex-col sm:overflow-x-hidden">
      <div className="flex min-h-0 max-w-sm flex-1 flex-col md:max-w-full">
        <div className="flex min-h-0 flex-1 justify-center overflow-y-auto px-3 py-4 sm:px-4 md:px-6 lg:px-8">
          <div className="flex  min-h-0 w-full max-w-sm items-center justify-center md:max-w-2xl lg:max-w-4xl">
            <TextArea
              answer={answer}
              showIntroText={showIntroText}
              isLoading={isLoading}
            />
          </div>
        </div>

        <div className="w-full px-3 pb-3 pt-2 sm:px-4 md:px-6 lg:px-8">
          <div className="mx-auto w-full max-w-sm rounded-2xl border border-accent-dark/20 bg-main-dark px-4 py-4 md:max-w-2xl lg:max-w-3xl">
            <div className="flex items-center gap-2 sm:gap-3">
              <Input
                type="text"
                placeholder="Ask me anything."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="h-10 min-w-0 flex-1 border border-accent-dark/15 bg-transparent text-lg text-text-dark placeholder:text-accent-dark placeholder:font-sub-heading placeholder:text-lg focus-visible:ring-0 sm:h-11 sm:text-base sm:placeholder:text-base"
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
                className="h-10 w-10 shrink-0 rounded-full bg-accent-dark p-0 hover:cursor-pointer hover:bg-secondary-dark sm:h-11 sm:w-11"
              >
                <ArrowUp className="h-4 w-4 text-black sm:h-5 sm:w-5" />
              </Button>
            </div>

            <div className="pt-3 sm:pt-4">
              <Suggestions>
                {suggestions.map((suggestion) => (
                  <Suggestion
                    key={suggestion}
                    suggestion={suggestion}
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="shrink-0 bg-accent-dark px-4 py-4 text-xs font-sub-heading md:py-2 sm:text-sm md:text-base"
                  />
                ))}
              </Suggestions>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
