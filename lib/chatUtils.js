import axios from "axios";

export async function FetchChatResponse(inputText, questionCount = 0) {
  try {
    if (
      !inputText ||
      inputText.trim().length === 0 ||
      typeof inputText !== "string"
    ) {
      return { answer: "Please ask a question", status: 400 };
    }
    const res = await axios.post("/api/chat", {
      messages: [{ role: "user", content: inputText }],
      questionCount,
    });

    return { data: res.data, status: res.status };
  } catch (err) {
    return { data: err.data, status: err.status };
  }
}
