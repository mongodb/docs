import { describe, expect, it } from "@jest/globals";
import type { TranslateTextCommand } from "@aws-sdk/client-translate";
import {
  createAwsTranslateText,
  type TranslateTextSender,
} from "../../../src/backends/aws-translate/client.js";
import { BackendError } from "../../../src/backends/errors.js";

function fakeSender(output: {
  TranslatedText?: string;
  AppliedTerminologies?: Array<{
    Terms?: Array<{ SourceText?: string; TargetText?: string }>;
  }>;
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

    const result = await translateText(
      { text: "Home", sourceLanguageCode: "en", targetLanguageCode: "es" },
      signal,
    );

    expect(result.translatedText).toBe("Inicio");
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

  it("adds TerminologyNames when the input carries a terminology name", async () => {
    const { sender, sent } = fakeSender({ TranslatedText: "hola" });
    const translate = createAwsTranslateText("us-east-1", sender);
    await translate(
      {
        text: "h",
        sourceLanguageCode: "en",
        targetLanguageCode: "es",
        terminologyName: "aws-translate-glossary",
      },
      AbortSignal.timeout(1000),
    );
    expect(sent[0]?.command.input.TerminologyNames).toEqual(["aws-translate-glossary"]);
  });

  it("omits TerminologyNames when no terminology name is given", async () => {
    const { sender, sent } = fakeSender({ TranslatedText: "hola" });
    const translate = createAwsTranslateText("us-east-1", sender);
    await translate(
      { text: "h", sourceLanguageCode: "en", targetLanguageCode: "es" },
      AbortSignal.timeout(1000),
    );
    expect(sent[0]?.command.input.TerminologyNames).toBeUndefined();
  });

  it("maps AppliedTerminologies into the result, dropping malformed entries", async () => {
    const { sender } = fakeSender({
      TranslatedText: "hola",
      AppliedTerminologies: [
        {
          Terms: [
            { SourceText: "shard", TargetText: "partición" },
            { SourceText: "cluster" },
          ],
        },
      ],
    });
    const translate = createAwsTranslateText("us-east-1", sender);
    const result = await translate(
      { text: "h", sourceLanguageCode: "en", targetLanguageCode: "es" },
      AbortSignal.timeout(1000),
    );
    expect(result.translatedText).toBe("hola");
    expect(result.appliedTerminologies).toEqual([
      { sourceText: "shard", targetText: "partición" },
    ]);
  });

  it("returns an empty appliedTerminologies list when AWS reports none", async () => {
    const { sender } = fakeSender({ TranslatedText: "hola" });
    const translate = createAwsTranslateText("us-east-1", sender);
    const result = await translate(
      { text: "h", sourceLanguageCode: "en", targetLanguageCode: "es" },
      AbortSignal.timeout(1000),
    );
    expect(result.appliedTerminologies).toEqual([]);
  });
});
