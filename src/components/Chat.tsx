import { useState } from "react";
import type { FormEvent } from "react";

type Message = {
  role: "user" | "model";
  text: string;
};

const initialMessage: Message = {
  role: "model",
  text: "Hi! Ask me about Katon's background, skills, or projects.",
};

export const Chat = () => {
  const [messages, setMessages] = useState<Message[]>([initialMessage]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const text = input.trim();
    if (!text || isLoading) return;

    const nextMessages = [...messages, { role: "user" as const, text }];
    setMessages(nextMessages);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: nextMessages.slice(-12) }),
      });
      const result = (await response.json()) as { text?: string; error?: string };

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

  return (
    <section id="chat" className="relative flex justify-center px-6 py-20">
      <div className="w-full max-w-5xl">
        <p className="mb-4 font-mono text-xs uppercase tracking-widest text-zinc-500">
          // ask about my work
        </p>
        <div className="rounded-xl border border-(--eva-panel) bg-black/30 p-4">
          <div className="mb-4 max-h-80 space-y-3 overflow-y-auto pr-2">
            {messages.map((message, index) => (
              <div
                key={`${message.role}-${index}`}
                className={`max-w-[90%] rounded-lg px-4 py-3 text-sm leading-relaxed ${
                  message.role === "user"
                    ? "ml-auto bg-(--eva-green)/15 text-zinc-200"
                    : "bg-zinc-900 text-zinc-400"
                }`}
              >
                {message.text}
              </div>
            ))}
            {isLoading && (
              <div className="max-w-[90%] rounded-lg bg-zinc-900 px-4 py-3 text-sm text-zinc-500">
                Thinking...
              </div>
            )}
          </div>
          <form className="flex gap-2" onSubmit={handleSubmit}>
            <input
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder="Ask about projects or experience..."
              aria-label="Ask about Katon's CV and projects"
              className="min-w-0 flex-1 rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-sm text-zinc-200 outline-none placeholder:text-zinc-600 focus:border-(--eva-green)"
              maxLength={2000}
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="rounded-lg bg-(--eva-green) px-4 py-2 text-sm font-medium text-black transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Send
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};
