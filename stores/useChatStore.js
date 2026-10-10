import { create } from "zustand";

// Conversation thread: an ordered list of { id, role, content, loading }.
export const useChatStore = create((set, get) => ({
  message: "",
  messages: [],
  isLoading: false,
  questionCount: 0,

  setMessage: (message) => set({ message }),
  setIsLoading: (isLoading) => set({ isLoading }),
  incrementQuestionCount: () =>
    set({ questionCount: get().questionCount + 1 }),
  resetChatInput: () => set({ message: "" }),

  addMessage: (msg) => set({ messages: [...get().messages, msg] }),
  updateMessage: (id, patch) =>
    set({
      messages: get().messages.map((m) =>
        m.id === id ? { ...m, ...patch } : m,
      ),
    }),
  clearChat: () => set({ messages: [], message: "" }),
}));
