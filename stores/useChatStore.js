import { create } from "zustand";

export const useChatStore = create((set, get) => ({
  message: "",
  answer: "",
  showIntroText: true,
  isLoading: false,
  questionCount: 0,

  setMessage: (message) => set({ message }),
  setAnswer: (answer) => set({ answer }),
  setShowIntroText: (showIntroText) => set({ showIntroText }),
  setIsLoading: (isLoading) => set({ isLoading }),
  incrementQuestionCount: () =>
    set({ questionCount: get().questionCount + 1 }),

  resetChatInput: () => set({ message: "" }),
}));
