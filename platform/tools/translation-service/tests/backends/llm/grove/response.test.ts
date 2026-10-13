import { describe, expect, it } from "@jest/globals";
import { parseGroveResponse } from "../../../../src/backends/llm/grove/response.js";
import { BackendError } from "../../../../src/backends/llm/errors.js";

function envelope(innerJson: string): string {
  return JSON.stringify({
    output: [
      {
        type: "message",
        content: [{ type: "output_text", text: innerJson }],
      },
    ],
  });
}

describe("parseGroveResponse", () => {
  it("returns a key/value map from a valid envelope", () => {
    const raw = envelope('{"translations":[{"key":"docs_home","value":"Inicio"}]}');
    const map = parseGroveResponse(raw);
    expect(map.get("docs_home")).toBe("Inicio");
    expect(map.size).toBe(1);
  });

  it("also reads a top-level output_text envelope", () => {
    const raw = JSON.stringify({
      output_text: '{"translations":[{"key":"a","value":"b"}]}',
    });
    expect(parseGroveResponse(raw).get("a")).toBe("b");
  });

  it("skips non-output_text content parts within a message", () => {
    const raw = JSON.stringify({
      output: [
        {
          type: "message",
          content: [
            { type: "reasoning_text", text: "ignore me" },
            {
              type: "output_text",
              text: '{"translations":[{"key":"a","value":"b"}]}',
            },
          ],
        },
      ],
    });
    expect(parseGroveResponse(raw).get("a")).toBe("b");
  });

  it("skips non-message output items that carry an output_text part", () => {
    const raw = JSON.stringify({
      output: [
        {
          type: "reasoning",
          content: [{ type: "output_text", text: "not json - must be skipped" }],
        },
        {
          type: "message",
          content: [
            {
              type: "output_text",
              text: '{"translations":[{"key":"a","value":"b"}]}',
            },
          ],
        },
      ],
    });
    expect(parseGroveResponse(raw).get("a")).toBe("b");
  });

  it("throws provider_unparseable when the body is not JSON", () => {
    try {
      parseGroveResponse("not json");
      throw new Error("expected throw");
    } catch (err) {
      expect(err).toBeInstanceOf(BackendError);
      expect((err as BackendError).reason).toBe("provider_unparseable");
    }
  });

  it("throws provider_invalid_shape when translations is missing", () => {
    const raw = envelope('{"nope":true}');
    try {
      parseGroveResponse(raw);
      throw new Error("expected throw");
    } catch (err) {
      expect((err as BackendError).reason).toBe("provider_invalid_shape");
    }
  });

  it("throws provider_invalid_shape when an item value is not a string", () => {
    const raw = envelope('{"translations":[{"key":"a","value":5}]}');
    try {
      parseGroveResponse(raw);
      throw new Error("expected throw");
    } catch (err) {
      expect((err as BackendError).reason).toBe("provider_invalid_shape");
    }
  });

  it("falls through to output[] when top-level output_text is an empty string", () => {
    const raw = JSON.stringify({
      output_text: "",
      output: [
        {
          type: "message",
          content: [
            {
              type: "output_text",
              text: '{"translations":[{"key":"a","value":"b"}]}',
            },
          ],
        },
      ],
    });
    expect(parseGroveResponse(raw).get("a")).toBe("b");
  });

  it("throws provider_invalid_shape when the model returns a duplicate key", () => {
    const raw = envelope(
      '{"translations":[{"key":"a","value":"1"},{"key":"a","value":"2"}]}',
    );
    try {
      parseGroveResponse(raw);
      throw new Error("expected throw");
    } catch (err) {
      expect((err as BackendError).reason).toBe("provider_invalid_shape");
    }
  });
});
