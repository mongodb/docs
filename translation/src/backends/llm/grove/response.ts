/**
 * Pure parser for a Grove Responses-API reply. Extracts the structured
 * JSON string from the envelope, parses it, checks the
 * { translations: [{ key, value }] } shape, and returns a key -> value
 * Map. Throws BackendError on any deviation. A Map (not a plain object)
 * keeps untrusted keys like "__proto__" safe.
 */
import { BackendError } from "../errors.js";

const PROVIDER = "grove";

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function unparseable(message: string, cause?: unknown): BackendError {
  return new BackendError({
    stage: "parse",
    provider: PROVIDER,
    reason: "provider_unparseable",
    message,
    cause,
  });
}

function invalidShape(message: string): BackendError {
  return new BackendError({
    stage: "parse",
    provider: PROVIDER,
    reason: "provider_invalid_shape",
    message,
  });
}

/**
 * Locate the model's structured-output text within the Responses
 * envelope. Prefer the aggregated `output_text`; otherwise dig into the
 * `message`-type output item's `output_text` content part. Filtering on
 * both `type`s skips reasoning items/parts that gpt-5.5 can interleave in
 * `output[]`. Confirmed against a real Grove response. If the envelope
 * ever changes, this is the only function to adjust.
 */
function extractOutputText(envelope: unknown): string {
  // Require a NON-EMPTY output_text; an empty string would otherwise be
  // returned and fail JSON.parse, masking a valid output[] message below.
  if (
    isRecord(envelope) &&
    typeof envelope["output_text"] === "string" &&
    envelope["output_text"] !== ""
  ) {
    return envelope["output_text"];
  }
  if (isRecord(envelope) && Array.isArray(envelope["output"])) {
    for (const message of envelope["output"]) {
      if (
        !isRecord(message) ||
        message["type"] !== "message" ||
        !Array.isArray(message["content"])
      ) {
        continue;
      }
      for (const part of message["content"]) {
        if (
          isRecord(part) &&
          part["type"] === "output_text" &&
          typeof part["text"] === "string"
        ) {
          return part["text"];
        }
      }
    }
  }
  throw invalidShape("Grove response envelope contained no output text");
}

export function parseGroveResponse(raw: string): Map<string, string> {
  let envelope: unknown;
  try {
    envelope = JSON.parse(raw);
  } catch (cause) {
    throw unparseable("Grove response body was not valid JSON", cause);
  }

  const outputText = extractOutputText(envelope);

  let payload: unknown;
  try {
    payload = JSON.parse(outputText);
  } catch (cause) {
    throw unparseable("Grove output text was not valid JSON", cause);
  }

  if (!isRecord(payload) || !Array.isArray(payload["translations"])) {
    throw invalidShape("Grove payload is missing a translations array");
  }

  const map = new Map<string, string>();
  for (const item of payload["translations"]) {
    if (
      !isRecord(item) ||
      typeof item["key"] !== "string" ||
      typeof item["value"] !== "string"
    ) {
      throw invalidShape(
        "Grove translations item is missing a string key or value",
      );
    }
    // A duplicate key is a contract violation. Detect it here — collapsing
    // into the Map would silently keep last-wins and hide it from the
    // pipeline's per-key output validation.
    if (map.has(item["key"])) {
      throw invalidShape(
        `Grove returned a duplicate translations key "${item["key"]}"`,
      );
    }
    map.set(item["key"], item["value"]);
  }
  return map;
}
