import { describe, expect, it } from "@jest/globals";
import {
  buildBatchUserPrompt,
  toBatchResult,
} from "../../../src/backends/llm/batch.js";
import type { TranslationBatchRequest } from "../../../src/types.js";

function batch(
  items: Array<{ key: string; text: string }>,
): TranslationBatchRequest {
  return {
    source_locale: "en",
    target_locale: "es",
    content_type: "platform_strings",
    items,
    backend_preferences: { provider: "auto", model: "auto" },
  };
}

describe("buildBatchUserPrompt", () => {
  it("names the locales and carries the items as key/value JSON", () => {
    const prompt = buildBatchUserPrompt(batch([{ key: "docs_home", text: "Home" }]));
    expect(prompt).toContain("from en to es");
    expect(prompt).toContain('[{"key":"docs_home","value":"Home"}]');
  });
});

describe("toBatchResult", () => {
  it("returns ok items for keys the model returned", () => {
    const items = toBatchResult(
      batch([{ key: "docs_home", text: "Home" }]),
      new Map([["docs_home", "Inicio"]]),
    );
    expect(items).toEqual([{ key: "docs_home", status: "ok", text: "Inicio" }]);
  });

  it("omits keys the model did not return, preserving input order", () => {
    const items = toBatchResult(
      batch([
        { key: "a", text: "A" },
        { key: "b", text: "B" },
        { key: "c", text: "C" },
      ]),
      new Map([
        ["c", "CC"],
        ["a", "AA"],
      ]),
    );
    expect(items.map((item) => item.key)).toEqual(["a", "c"]);
  });
});
