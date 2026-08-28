/**
 * Thin wrapper around the Novita AI chat completions endpoint.
 * Extracted from app/api/ai-assist/route.ts so the tailor flow can reuse it.
 * ai-assist itself still inlines its own call — refactor that separately if/when
 * the call shape diverges; for now both call sites stay close to the wire.
 */

export interface NovitaOpts {
  /** Model id. Defaults to the budget-friendly 8B that's already in production. */
  model?: string;
  /** Max tokens for the completion. */
  maxTokens?: number;
  /** Sampling temperature. */
  temperature?: number;
  /** Hard timeout in ms before the request is aborted. */
  timeoutMs?: number;
  /**
   * When true, force JSON-object output. Required for reliable structured output
   * on the 8B model (smaller models are flaky at following schema-only system
   * prompts). Most Novita-hosted models support this OpenAI-compatible flag.
   */
  jsonMode?: boolean;
}

const DEFAULT_MODEL = "meta-llama/llama-3.1-8b-instruct";
const DEFAULT_TIMEOUT = 30_000;

export class NovitaError extends Error {
  constructor(message: string, public status?: number) {
    super(message);
    this.name = "NovitaError";
  }
}

export async function callNovita(
  systemPrompt: string,
  userPrompt: string,
  opts: NovitaOpts = {}
): Promise<string> {
  const apiKey = process.env.NOVITA_API_KEY;
  if (!apiKey) throw new NovitaError("NOVITA_API_KEY tidak dikonfigurasi.");

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), opts.timeoutMs ?? DEFAULT_TIMEOUT);

  try {
    const res = await fetch("https://api.novita.ai/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: opts.model ?? DEFAULT_MODEL,
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
        max_tokens: opts.maxTokens ?? 800,
        temperature: opts.temperature ?? 0.5,
        stream: false,
        ...(opts.jsonMode ? { response_format: { type: "json_object" } } : {}),
      }),
      signal: controller.signal,
    });

    if (!res.ok) {
      const detail = await res.text().catch(() => "");
      throw new NovitaError(
        `AI upstream error ${res.status}: ${detail.slice(0, 200)}`,
        res.status
      );
    }

    const json = (await res.json()) as {
      choices?: { message?: { content?: string } }[];
    };
    const content = json.choices?.[0]?.message?.content?.trim();
    if (!content) throw new NovitaError("AI mengembalikan respons kosong.");
    return content;
  } catch (e) {
    if (e instanceof NovitaError) throw e;
    if (e instanceof Error && e.name === "AbortError") {
      throw new NovitaError("AI lambat merespons (timeout). Coba lagi.");
    }
    throw new NovitaError("Gagal terhubung ke AI.");
  } finally {
    clearTimeout(timer);
  }
}
