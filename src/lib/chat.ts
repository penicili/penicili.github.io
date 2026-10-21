import { GoogleGenAI } from "@google/genai";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import type { ChatMessage } from "../types/chat";

const projects = readFileSync(
  resolve(process.cwd(), "public/projects.json"),
  "utf8",
);

const systemInstruction = `You are a helpful portfolio assistant for Katon Bagaskoro.
Answer questions only using the CV and project context below. Be honest when
information is not available. Do not invent experience, dates, employers,
metrics, or technologies. Keep answers concise and friendly. Respond in the
same language as the user's question.

CV context:
Name: Katon Bagaskoro.
Profile: Information Systems fresh graduate, interested in web development,
DevOps, self-hosting, and cybersecurity.
Skills and tools: Laravel, Express, FastAPI, React, Docker, Ansible, Jenkins,
Kubernetes, ArgoCD, Proxmox, and Linux.
Certification: BNSP Cybersecurity Analyst.
CV download: /CV-ATS-KATON BAGASKORO.pdf

Project context (JSON):
${projects}`;

export function isValidChatMessages(
  messages: unknown,
): messages is ChatMessage[] {
  return (
    Array.isArray(messages) &&
    messages.length > 0 &&
    messages.length <= 12 &&
    messages.every(
      (message) =>
        !!message &&
        typeof message === "object" &&
        "role" in message &&
        "text" in message &&
        (message.role === "user" || message.role === "model") &&
        typeof message.text === "string" &&
        message.text.trim().length > 0 &&
        message.text.length <= 2000,
    )
  );
}

export async function generateChatReply(messages: ChatMessage[]) {
  const apiKey = import.meta.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY;
  const model =
    import.meta.env.GEMINI_MODEL ||
    process.env.GEMINI_MODEL ||
    "gemini-3.8-flash";

  if (!apiKey) {
    throw new Error("GEMINI_API_KEY is not configured.");
  }

  const ai = new GoogleGenAI({ apiKey });
  const response = await ai.models.generateContent({
    model,
    contents: messages.map((message) => ({
      role: message.role,
      parts: [{ text: message.text }],
    })),
    config: { systemInstruction },
  });

  return response.text;
}
