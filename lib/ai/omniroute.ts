/**
 * AI client untuk ATS Score Checker (grammar, tone, impact analysis).
 * Pointing ke 9router AI Gateway (sebelumnya OmniRoute).
 *
 * Env vars:
 * - NINEROUTER_BASE_URL / OMNIROUTE_BASE_URL (default: http://192.168.1.89:20129/v1)
 * - NINEROUTER_API_KEY / OMNIROUTE_API_KEY (API key dari 9router)
 * - NINEROUTER_MODEL / OMNIROUTE_MODEL (default: agy)
 */

const BASE_URL =
  process.env.NINEROUTER_BASE_URL ||
  process.env.OMNIROUTE_BASE_URL ||
  "http://192.168.1.89:20129/v1";

const MODEL =
  process.env.NINEROUTER_MODEL ||
  process.env.OMNIROUTE_MODEL ||
  "agy";

// Fallback chain kalau primary timeout/429
const FALLBACK_MODELS = ["FREE-CODER"];

export interface ChatMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

export interface ChatOptions {
  model?: string;
  maxTokens?: number;
  temperature?: number;
  timeoutMs?: number;
  responseFormat?: { type: "json_object" } | { type: "text" };
}

export class OmniRouteError extends Error {
  constructor(message: string, public status: number, public code?: string) {
    super(message);
    this.name = "OmniRouteError";
  }
}

/**
 * Call OmniRoute chat completion endpoint.
 * Returns the assistant message content (string).
 */
export async function omnirouteChat(
  messages: ChatMessage[],
  options: ChatOptions = {}
): Promise<string> {
  const {
    model = MODEL,
    maxTokens = 800,
    temperature = 0.4,
    timeoutMs = 30_000,
    responseFormat,
  } = options;

  const apiKey =
    process.env.NINEROUTER_API_KEY ||
    process.env.OMNIROUTE_API_KEY;
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };
  if (apiKey) headers.Authorization = `Bearer ${apiKey}`;

  const body: Record<string, unknown> = {
    model,
    messages,
    max_tokens: maxTokens,
    temperature,
    stream: false, // 2026-08-29: explicit non-stream — tanpa ini beberapa model OmniRoute
    // (e.g. auto/cheap chain) default ke SSE streaming, yang bikin `res.json()` gagal parse.
  };
  if (responseFormat) body.response_format = responseFormat;

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const res = await fetch(`${BASE_URL}/chat/completions`, {
      method: "POST",
      headers,
      body: JSON.stringify(body),
      signal: controller.signal,
    });

    if (!res.ok) {
      const text = await res.text().catch(() => "");
      throw new OmniRouteError(
        `OmniRoute API error: ${res.status} ${text.slice(0, 200)}`,
        res.status
      );
    }

    const data = (await res.json()) as {
      choices?: { message?: { content?: string } }[];
    };
    const content = data.choices?.[0]?.message?.content;
    if (!content) {
      throw new OmniRouteError("Empty response from OmniRoute", 502, "EMPTY_RESPONSE");
    }
    return content;
  } catch (err) {
    if (err instanceof OmniRouteError) throw err;
    if (err instanceof Error && err.name === "AbortError") {
      throw new OmniRouteError("OmniRoute request timed out", 504, "TIMEOUT");
    }
    throw new OmniRouteError(
      `OmniRoute request failed: ${err instanceof Error ? err.message : "unknown"}`,
      500
    );
  } finally {
    clearTimeout(timeout);
  }
}
