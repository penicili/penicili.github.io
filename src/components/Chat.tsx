import type { SyntheticEvent } from "react";
import { useChat } from "../hooks/useChat";
import { useState } from "react";

export const Chat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const {
    messages,
    input,
    isLoading,
    setInput,
    submitMessage,
  } = useChat();

  function handleSubmit(event: SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();
    void submitMessage(input);
  }

  return (
    <div id="chat" className="fixed bottom-6 right-6 z-50">
      {isOpen && (
        <section
          aria-label="Chat with Katon's CV"
          className="mb-4 w-[min(24rem,calc(100vw-3rem))] overflow-hidden rounded-2xl border border-(--eva-panel)/70 bg-[#100d16] shadow-2xl shadow-black/60"
        >
          <div className="flex items-center justify-between border-b border-(--eva-panel)/50 bg-[#1d1628] px-4 py-3">
            <div>
              <p className="font-mono text-xs uppercase tracking-widest text-(--eva-orange)">
                // ask about my work
              </p>
              <h2 className="mt-1 font-semibold text-(--eva-ink)">Talk to my CV</h2>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              aria-label="Close chat"
              className="rounded-md px-2 py-1 text-xl leading-none text-(--eva-muted) transition hover:bg-(--eva-panel)/30 hover:text-(--eva-ink)"
            >
              ×
            </button>
          </div>

          <div className="max-h-80 space-y-3 overflow-y-auto p-4">
            {messages.map((message, index) => (
              <div
                key={`${message.role}-${index}`}
                className={`max-w-[90%] rounded-lg px-4 py-3 text-sm leading-relaxed ${
                  message.role === "user"
                    ? "ml-auto border border-(--eva-orange)/30 bg-(--eva-orange)/15 text-[#fff1e5]"
                    : "border border-(--eva-panel)/30 bg-[#211a2c] text-(--eva-muted)"
                }`}
              >
                {message.text}
              </div>
            ))}
            {isLoading && (
              <div className="max-w-[90%] rounded-lg border border-(--eva-panel)/30 bg-[#211a2c] px-4 py-3 text-sm text-(--eva-muted)">
                Thinking...
              </div>
            )}
          </div>

          <form className="flex gap-2 border-t border-(--eva-panel)/50 bg-[#17121f] p-4" onSubmit={handleSubmit}>
            <input
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder="Ask about projects or experience..."
              aria-label="Ask about Katon's CV and projects"
              className="min-w-0 flex-1 rounded-lg border border-(--eva-panel)/60 bg-[#0a080d] px-3 py-2 text-sm text-(--eva-ink) outline-none placeholder:text-(--eva-muted)/60 focus:border-(--eva-orange)"
              maxLength={2000}
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="rounded-lg bg-(--eva-orange) px-4 py-2 text-sm font-semibold text-black transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Send
            </button>
          </form>
        </section>
      )}

      <button
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        aria-expanded={isOpen}
        aria-label={isOpen ? "Close chat" : "Open chat"}
        className="ml-auto flex h-14 w-14 items-center justify-center rounded-full border-2 border-(--eva-green) bg-(--eva-panel) text-(--eva-green) shadow-lg shadow-black/40 transition hover:scale-105 hover:border-(--eva-orange) hover:text-(--eva-orange)"
      >
        <svg
          aria-hidden="true"
          className="h-7 w-7"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.8"
          viewBox="0 0 24 24"
        >
          <path d="M20 11.5a7.5 7.5 0 0 1-7.5 7.5 8.2 8.2 0 0 1-3.3-.7L4 20l1.7-4.2A7.4 7.4 0 0 1 5 11.5 7.5 7.5 0 0 1 12.5 4 7.5 7.5 0 0 1 20 11.5Z" />
          <path d="M8.5 11.5h.01M12.5 11.5h.01M16.5 11.5h.01" strokeWidth="2.4" />
        </svg>
      </button>
    </div>
  );
};
