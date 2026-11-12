/**
 * Thin seam over the AWS SDK's TranslateText call. AWS requests are
 * SigV4-signed by the SDK, so this backend can't reuse the fetch-based
 * Transport the OpenAI backend uses; injecting a TranslateTextFn keeps
 * the backend just as unit-testable with no network or credentials.
 */
import {
  TranslateClient,
  TranslateTextCommand,
} from "@aws-sdk/client-translate";
import { BackendError } from "../errors.js";
import { AWS_TRANSLATE_PROVIDER } from "./config.js";

export interface TranslateTextInput {
  text: string;
  sourceLanguageCode: string;
  targetLanguageCode: string;
  terminologyName?: string | undefined;
}

/** A glossary term AWS enforced on one translated string. */
export interface AppliedTerm {
  sourceText: string;
  targetText: string;
}

export interface TranslateTextResult {
  translatedText: string;
  appliedTerminologies: AppliedTerm[];
}

export type TranslateTextFn = (
  input: TranslateTextInput,
  signal: AbortSignal,
) => Promise<TranslateTextResult>;

export interface TranslateTextSender {
  send(
    command: TranslateTextCommand,
    options: { abortSignal: AbortSignal },
  ): Promise<{
    TranslatedText?: string | undefined;
    AppliedTerminologies?:
      | Array<{
          Terms?:
            | Array<{
                SourceText?: string | undefined;
                TargetText?: string | undefined;
              }>
            | undefined;
        }>
      | undefined;
    $metadata?: { requestId?: string | undefined };
  }>;
}

export function createAwsTranslateText(
  region: string,
  client: TranslateTextSender = new TranslateClient({ region }),
): TranslateTextFn {
  return async (input, signal) => {
    const command = new TranslateTextCommand({
      Text: input.text,
      SourceLanguageCode: input.sourceLanguageCode,
      TargetLanguageCode: input.targetLanguageCode,
      ...(input.terminologyName !== undefined
        ? { TerminologyNames: [input.terminologyName] }
        : {}),
    });
    const output = await client.send(command, { abortSignal: signal });
    if (typeof output.TranslatedText !== "string") {
      const requestId = output.$metadata?.requestId;
      throw new BackendError({
        stage: "parse",
        provider: AWS_TRANSLATE_PROVIDER,
        reason: "provider_invalid_shape",
        message: `AWS Translate response had no TranslatedText${
          requestId !== undefined ? ` (request id ${requestId})` : ""
        }`,
        ...(requestId !== undefined ? { requestId } : {}),
      });
    }
    const appliedTerminologies: AppliedTerm[] = [];
    for (const applied of output.AppliedTerminologies ?? []) {
      for (const term of applied.Terms ?? []) {
        if (
          typeof term.SourceText === "string" &&
          typeof term.TargetText === "string"
        ) {
          appliedTerminologies.push({
            sourceText: term.SourceText,
            targetText: term.TargetText,
          });
        }
      }
    }
    return { translatedText: output.TranslatedText, appliedTerminologies };
  };
}
