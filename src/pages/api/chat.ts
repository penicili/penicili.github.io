import type { APIRoute } from "astro";
import { GoogleGenAI } from "@google/genai";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

type ChatMessage = {
  role: "user" | "model";
  text: string;
};

const projects = readFileSync(
  resolve(process.cwd(), "public/projects.json"),
  "utf8",
);

const cvContext = `
Name: Katon Bagaskoro.
Profile: Information Systems fresh graduate, interested in web development,
DevOps, self-hosting, and cybersecurity.
Skills and tools: Laravel, Express, FastAPI, React, Docker, Ansible, Jenkins,
Kubernetes, ArgoCD, Proxmox, and Linux.
Certification: BNSP Cybersecurity Analyst.
CV download: /CV-ATS-KATON BAGASKORO.pdf
`;

const systemInstruction = `You are a helpful portfolio assistant for Katon Bagaskoro.
Answer questions only using the CV and project context below. Be honest when
information is not available. Do not invent experience, dates, employers,
metrics, or technologies. Keep answers concise and friendly. Respond in the
same language as the user's question.

CV context:
${cvContext}

Project context (JSON):
${projects}`;

export const POST: APIRoute = async ({ request }) => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return new Response(
      JSON.stringify({ error: "GEMINI_API_KEY is not configured." }),
      { status: 500, headers: { "Content-Type": "application/json" } },
    );
  }

  let body: { messages?: ChatMessage[] };
  try {
    body = await request.json();
  } catch {
    return new Response(JSON.stringify({ error: "Invalid JSON body." }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const messages = body.messages;
  if (
    !Array.isArray(messages) ||
    messages.length === 0 ||
    messages.length > 12 ||
    messages.some(
      (message) =>
        !message ||
        !["user", "model"].includes(message.role) ||
        typeof message.text !== "string" ||
        message.text.trim().length === 0 ||
        message.text.length > 2000,
    )
  ) {
    return new Response(JSON.stringify({ error: "Invalid chat messages." }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    const ai = new GoogleGenAI({ apiKey });
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: messages.map((message) => ({
        role: message.role,
        parts: [{ text: message.text }],
      })),
      config: { systemInstruction },
    });

    return new Response(JSON.stringify({ text: response.text }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Gemini chat request failed:", error);
    return new Response(
      JSON.stringify({ error: "The chat service is temporarily unavailable." }),
      { status: 502, headers: { "Content-Type": "application/json" } },
    );
  }
};
