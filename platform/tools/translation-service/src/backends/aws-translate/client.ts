/**
 * Thin seam over the AWS SDK's TranslateText call. AWS requests are
 * SigV4-signed by the SDK, so this backend can't reuse the fetch-based
 * Transport the Grove backend uses; injecting a TranslateTextFn keeps
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
}

export type TranslateTextFn = (
  input: TranslateTextInput,
  signal: AbortSignal,
) => Promise<string>;

export interface TranslateTextSender {
  send(
    command: TranslateTextCommand,
    options: { abortSignal: AbortSignal },
  ): Promise<{
    TranslatedText?: string | undefined;
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
    return output.TranslatedText;
  };
}
