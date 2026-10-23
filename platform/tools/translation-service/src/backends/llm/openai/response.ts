/**
 * Pure parser for an OpenAI Responses reply. Locates the structured-output
 * text in the envelope and hands it to the shared payload validator.
 */
import { BackendError } from "../../errors.js";
import { isRecord, parseTranslationPayload } from "../translation-payload.js";
import { OPENAI_PROVIDER } from "./config.js";

function invalidShape(message: string): BackendError {
  return new BackendError({
    stage: "parse",
    provider: OPENAI_PROVIDER,
    reason: "provider_invalid_shape",
    message,
  });
}

/**
 * Locate the model's structured-output text within the Responses envelope.
 * Prefer the aggregated `output_text`; otherwise dig into the `message`-type
 * output item's `output_text` content part. Filtering on both `type`s skips
 * reasoning items/parts that reasoning models can interleave in `output[]`.
 * Exported so the evals judge reuses this instead of re-implementing it.
 * If the envelope ever changes, this is the only function to adjust.
 */
export function extractOutputText(envelope: unknown): string {
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
  throw invalidShape("OpenAI response envelope contained no output text");
}

export function parseOpenAiResponse(raw: string): Map<string, string> {
  let envelope: unknown;
  try {
    envelope = JSON.parse(raw);
  } catch (cause) {
    throw new BackendError({
      stage: "parse",
      provider: OPENAI_PROVIDER,
      reason: "provider_unparseable",
      message: "OpenAI response body was not valid JSON",
      cause,
    });
  }
  return parseTranslationPayload(extractOutputText(envelope), OPENAI_PROVIDER);
}
