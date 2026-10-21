import { describe, expect, it } from "@jest/globals";
import type { TranslateTextCommand } from "@aws-sdk/client-translate";
import {
  createAwsTranslateText,
  type TranslateTextSender,
} from "../../../src/backends/aws-translate/client.js";
import { BackendError } from "../../../src/backends/errors.js";

function fakeSender(output: {
  TranslatedText?: string;
  $metadata?: { requestId?: string };
}): {
  sender: TranslateTextSender;
  sent: Array<{ command: TranslateTextCommand; signal: AbortSignal }>;
} {
  const sent: Array<{ command: TranslateTextCommand; signal: AbortSignal }> = [];
  const sender: TranslateTextSender = {
    send: async (command, options) => {
      sent.push({ command, signal: options.abortSignal });
      return output;
    },
  };
  return { sender, sent };
}

describe("createAwsTranslateText", () => {
  it("builds a TranslateText command and returns TranslatedText", async () => {
    const { sender, sent } = fakeSender({ TranslatedText: "Inicio" });
    const translateText = createAwsTranslateText("us-east-1", sender);
    const signal = new AbortController().signal;

    const text = await translateText(
      { text: "Home", sourceLanguageCode: "en", targetLanguageCode: "es" },
      signal,
    );

    expect(text).toBe("Inicio");
    expect(sent[0]?.command.input).toEqual({
      Text: "Home",
      SourceLanguageCode: "en",
      TargetLanguageCode: "es",
    });
    expect(sent[0]?.signal).toBe(signal);
  });

  it("throws provider_invalid_shape when TranslatedText is missing", async () => {
    const { sender } = fakeSender({});
    const translateText = createAwsTranslateText("us-east-1", sender);
    const call = translateText(
      { text: "Home", sourceLanguageCode: "en", targetLanguageCode: "es" },
      new AbortController().signal,
    );
    await expect(call).rejects.toBeInstanceOf(BackendError);
    await expect(call).rejects.toMatchObject({
      reason: "provider_invalid_shape",
      message: "AWS Translate response had no TranslatedText",
    });
  });

  it("includes the AWS request id when TranslatedText is missing", async () => {
    const { sender } = fakeSender({ $metadata: { requestId: "req-456" } });
    const translateText = createAwsTranslateText("us-east-1", sender);
    await expect(
      translateText(
        { text: "Home", sourceLanguageCode: "en", targetLanguageCode: "es" },
        new AbortController().signal,
      ),
    ).rejects.toMatchObject({
      message: "AWS Translate response had no TranslatedText (request id req-456)",
      requestId: "req-456",
    });
  });
});
