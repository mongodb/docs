/**
 * The { translations: [{ key, value }] } payload contract shared by every
 * LLM backend. Envelope handling is each backend's business; this module
 * takes the already-extracted output text and returns a key -> value Map.
 * A Map (not a plain object) keeps untrusted keys like "__proto__" safe.
 */
import { BackendError } from "../errors.js";

export function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function unparseable(
  provider: string,
  message: string,
  cause?: unknown,
): BackendError {
  return new BackendError({
    stage: "parse",
    provider,
    reason: "provider_unparseable",
    message,
    cause,
  });
}

function invalidShape(provider: string, message: string): BackendError {
  return new BackendError({
    stage: "parse",
    provider,
    reason: "provider_invalid_shape",
    message,
  });
}

export function parseTranslationPayload(
  outputText: string,
  provider: string,
): Map<string, string> {
  let payload: unknown;
  try {
    payload = JSON.parse(outputText);
  } catch (cause) {
    throw unparseable(
      provider,
      `${provider} output text was not valid JSON`,
      cause,
    );
  }

  if (!isRecord(payload) || !Array.isArray(payload["translations"])) {
    throw invalidShape(
      provider,
      `${provider} payload is missing a translations array`,
    );
  }

  const map = new Map<string, string>();
  for (const item of payload["translations"]) {
    if (
      !isRecord(item) ||
      typeof item["key"] !== "string" ||
      typeof item["value"] !== "string"
    ) {
      throw invalidShape(
        provider,
        `${provider} translations item is missing a string key or value`,
      );
    }
    if (map.has(item["key"])) {
      throw invalidShape(
        provider,
        `${provider} returned a duplicate translations key "${item["key"]}"`,
      );
    }
    map.set(item["key"], item["value"]);
  }
  return map;
}
