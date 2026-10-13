import { describe, expect, it } from "@jest/globals";
import { SYSTEM_PROMPT, buildUserPrompt } from "../../../src/backends/llm/prompt.js";

describe("prompt", () => {
  it("instructs the model to preserve placeholder tokens and return JSON only", () => {
    expect(SYSTEM_PROMPT).toContain("__PROT0__");
    expect(SYSTEM_PROMPT).toContain("valid JSON");
  });

  it("embeds locales and the content JSON in the user prompt", () => {
    const prompt = buildUserPrompt("en", "es", '[{"key":"a","value":"Hi"}]');
    expect(prompt).toContain("from en to es");
    expect(prompt).toContain('[{"key":"a","value":"Hi"}]');
    expect(prompt).toContain('"translations"');
  });
});
