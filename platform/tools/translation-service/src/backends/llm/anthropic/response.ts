/**
 * Pure parser for an Anthropic Messages reply. Concatenates the `text`
 * content blocks and hands the result to the shared payload validator.
 * No code-fence stripping: structured output guarantees the text block is
 * valid JSON.
 */
import { BackendError } from "../../errors.js";
import { isRecord, parseTranslationPayload } from "../translation-payload.js";
import { ANTHROPIC_PROVIDER } from "./config.js";

function invalidShape(message: string): BackendError {
  return new BackendError({
    stage: "parse",
    provider: ANTHROPIC_PROVIDER,
    reason: "provider_invalid_shape",
    message,
  });
}

/**
 * Extract the model's text output from a Messages envelope. Rejects a
 * truncated or declined reply and concatenates the `text` blocks, ignoring
 * `thinking` blocks and malformed ones. Exported so the evals judge reuses
 * this instead of re-implementing it. If the envelope ever changes, this is
 * the only function to adjust.
 */
export function extractAnthropicText(envelope: unknown): string {
  if (!isRecord(envelope) || !Array.isArray(envelope["content"])) {
    throw invalidShape("Anthropic response envelope contained no content blocks");
  }
  // A truncated response is a real failure: returning partial JSON would
  // surface as a confusing parse error instead of the actual cause.
  if (envelope["stop_reason"] === "max_tokens") {
    throw invalidShape(
      "Anthropic response was truncated at max_tokens; raise ANTHROPIC_MAX_TOKENS",
    );
  }
  if (envelope["stop_reason"] === "refusal") {
    throw invalidShape("Anthropic declined the request (stop_reason: refusal)");
  }

  const text = envelope["content"]
    .filter(
      (block): block is { type: "text"; text: string } =>
        isRecord(block) &&
        block["type"] === "text" &&
        typeof block["text"] === "string",
    )
    .map((block) => block.text)
    .join("");
  if (text === "") {
    throw invalidShape("Anthropic response contained no text output");
  }

  return text;
}

export function parseAnthropicResponse(raw: string): Map<string, string> {
  let envelope: unknown;
  try {
    envelope = JSON.parse(raw);
  } catch (cause) {
    throw new BackendError({
      stage: "parse",
      provider: ANTHROPIC_PROVIDER,
      reason: "provider_unparseable",
      message: "Anthropic response body was not valid JSON",
      cause,
    });
  }

  return parseTranslationPayload(
    extractAnthropicText(envelope),
    ANTHROPIC_PROVIDER,
  );
}
