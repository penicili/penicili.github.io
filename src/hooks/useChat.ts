import { useState } from "react";
import type { ChatMessage } from "../types/chat";

const initialMessage: ChatMessage = {
  role: "model",
  text: "Hi! Ask me about Katon's background, skills, or projects.",
};

export function useChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([initialMessage]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function submitMessage(text: string) {
    const trimmedText = text.trim();
    if (!trimmedText || isLoading) return;

    const nextMessages = [
      ...messages,
      { role: "user" as const, text: trimmedText },
    ];
    setMessages(nextMessages);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: nextMessages.slice(-12) }),
      });
      const result = (await response.json()) as {
        text?: string;
        error?: string;
      };

      if (!response.ok || !result.text) {
        throw new Error(result.error || "Chat request failed.");
      }

      setMessages((current) => [
        ...current,
        { role: "model", text: result.text! },
      ]);
    } catch (error) {
      setMessages((current) => [
        ...current,
        {
          role: "model",
          text: error instanceof Error ? error.message : "Something went wrong.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  }

  return {
    messages,
    input,
    isLoading,
    setInput,
    submitMessage,
  };
}
