import { describe, expect, it } from "@jest/globals";
import {
  extractAnthropicText,
  parseAnthropicResponse,
} from "../../../../src/backends/llm/anthropic/response.js";
import { BackendError } from "../../../../src/backends/errors.js";

function envelope(content: unknown, stopReason = "end_turn"): string {
  return JSON.stringify({ content, stop_reason: stopReason });
}

function reasonOf(fn: () => unknown): string {
  try {
    fn();
  } catch (err) {
    if (err instanceof BackendError) return err.reason;
    throw err;
  }
  throw new Error("expected a throw");
}

const okText = '{"translations":[{"key":"docs_home","value":"Inicio"}]}';

describe("parseAnthropicResponse", () => {
  it("returns a key/value map from a text content block", () => {
    const raw = envelope([{ type: "text", text: okText }]);
    const map = parseAnthropicResponse(raw);
    expect(map.get("docs_home")).toBe("Inicio");
    expect(map.size).toBe(1);
  });

  it("concatenates multiple text blocks", () => {
    const raw = envelope([
      { type: "text", text: '{"translations":[{"key":"a",' },
      { type: "text", text: '"value":"b"}]}' },
    ]);
    expect(parseAnthropicResponse(raw).get("a")).toBe("b");
  });

  it("ignores non-text blocks such as thinking", () => {
    const raw = envelope([
      { type: "thinking", thinking: "considering..." },
      { type: "text", text: okText },
    ]);
    expect(parseAnthropicResponse(raw).get("docs_home")).toBe("Inicio");
  });

  it("throws provider_invalid_shape when truncated at max_tokens", () => {
    const raw = envelope([{ type: "text", text: okText }], "max_tokens");
    expect(reasonOf(() => parseAnthropicResponse(raw))).toBe(
      "provider_invalid_shape",
    );
  });

  it("throws provider_invalid_shape on a refusal", () => {
    const raw = envelope([{ type: "text", text: "I can't help with that." }], "refusal");
    expect(reasonOf(() => parseAnthropicResponse(raw))).toBe(
      "provider_invalid_shape",
    );
  });

  it("throws provider_unparseable when the body is not JSON", () => {
    expect(reasonOf(() => parseAnthropicResponse("not json"))).toBe(
      "provider_unparseable",
    );
  });

  it("throws provider_invalid_shape when there is no content array", () => {
    expect(reasonOf(() => parseAnthropicResponse('{"stop_reason":"end_turn"}'))).toBe(
      "provider_invalid_shape",
    );
  });

  it("throws provider_invalid_shape when there is no text output", () => {
    expect(reasonOf(() => parseAnthropicResponse(envelope([])))).toBe(
      "provider_invalid_shape",
    );
  });

  it("labels payload errors with the anthropic provider", () => {
    const raw = envelope([{ type: "text", text: '{"nope":true}' }]);
    try {
      parseAnthropicResponse(raw);
      throw new Error("expected throw");
    } catch (err) {
      expect(err).toBeInstanceOf(BackendError);
      expect((err as BackendError).provider).toBe("anthropic");
    }
  });
});

describe("extractAnthropicText", () => {
  it("returns the text of a text content block", () => {
    expect(extractAnthropicText(JSON.parse(envelope([{ type: "text", text: okText }])))).toBe(
      okText,
    );
  });

  it("ignores non-text blocks such as thinking", () => {
    const value = JSON.parse(
      envelope([
        { type: "thinking", thinking: "considering..." },
        { type: "text", text: okText },
      ]),
    );
    expect(extractAnthropicText(value)).toBe(okText);
  });

  it("concatenates multiple text blocks", () => {
    const value = JSON.parse(
      envelope([
        { type: "text", text: "part one " },
        { type: "text", text: "part two" },
      ]),
    );
    expect(extractAnthropicText(value)).toBe("part one part two");
  });

  it("throws provider_invalid_shape when truncated at max_tokens", () => {
    const value = JSON.parse(envelope([{ type: "text", text: okText }], "max_tokens"));
    expect(reasonOf(() => extractAnthropicText(value))).toBe("provider_invalid_shape");
  });

  it("throws provider_invalid_shape on a refusal", () => {
    const value = JSON.parse(
      envelope([{ type: "text", text: "I can't help with that." }], "refusal"),
    );
    expect(reasonOf(() => extractAnthropicText(value))).toBe("provider_invalid_shape");
  });

  it("throws provider_invalid_shape when there is no content array", () => {
    expect(reasonOf(() => extractAnthropicText({ stop_reason: "end_turn" }))).toBe(
      "provider_invalid_shape",
    );
  });

  it("throws provider_invalid_shape when there is no text output", () => {
    expect(reasonOf(() => extractAnthropicText(JSON.parse(envelope([]))))).toBe(
      "provider_invalid_shape",
    );
  });
});
