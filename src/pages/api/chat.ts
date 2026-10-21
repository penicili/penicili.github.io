import type { APIRoute } from "astro";
import {
  generateChatReply,
  isValidChatMessages,
} from "../../lib/chat";

export const POST: APIRoute = async ({ request }) => {
  let body: { messages?: unknown };

  try {
    body = await request.json();
  } catch {
    return new Response(JSON.stringify({ error: "Invalid JSON body." }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  if (!isValidChatMessages(body.messages)) {
    return new Response(JSON.stringify({ error: "Invalid chat messages." }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    const text = await generateChatReply(body.messages);
    return new Response(JSON.stringify({ text }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Gemini chat request failed:", error);
    const isMissingApiKey =
      error instanceof Error &&
      error.message === "GEMINI_API_KEY is not configured.";

    return new Response(
      JSON.stringify({
        error: isMissingApiKey
          ? error.message
          : "The chat service is temporarily unavailable.",
      }),
      {
        status: isMissingApiKey ? 500 : 502,
        headers: { "Content-Type": "application/json" },
      },
    );
  }
};
