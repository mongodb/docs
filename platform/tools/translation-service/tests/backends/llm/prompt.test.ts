import { describe, expect, it } from "@jest/globals";
import {
  GLOSSARY_RULES,
  SYSTEM_PROMPT,
  buildUserPrompt,
  renderTermSheet,
} from "../../../src/backends/llm/prompt.js";
import type { TermSheetEntry } from "../../../src/types.js";

describe("prompt", () => {
  const sheet: TermSheetEntry[] = [
    {
      term: "access",
      options: [
        { option: "acceder", definition: "to connect to a resource" },
        { option: "acceso", definition: "the ability to read or write data" },
      ],
    },
    { term: "block", options: [{ option: "bloque", definition: "a chunk of a larger whole" }] },
  ];

  it("leaves the user prompt unchanged when there is no term sheet", () => {
    const content = '[{"key":"a","value":"Hi"}]';
    expect(buildUserPrompt("en", "es", content, [])).toBe(buildUserPrompt("en", "es", content));
  });

  it("adds the rules and the term sheet when there are terms", () => {
    const prompt = buildUserPrompt("en", "es", '[{"key":"a","value":"Hi"}]', sheet);
    expect(prompt).toContain(GLOSSARY_RULES);
    expect(prompt).toContain(renderTermSheet(sheet));
    expect(prompt).toContain('[{"key":"a","value":"Hi"}]');
  });

  it("tells the model that adapting a term is allowed", () => {
    expect(GLOSSARY_RULES).toContain("does not break the rule to preserve structure");
  });

  it("renders one line per term with each option and its definition", () => {
    expect(renderTermSheet(sheet)).toBe(
      '- access: "acceder" (to connect to a resource) | "acceso" (the ability to read or write data)\n' +
        '- block: "bloque" (a chunk of a larger whole)',
    );
  });

  it("keeps each term on one line when a definition has line breaks", () => {
    const rendered = renderTermSheet([
      {
        term: "site",
        options: [
          { option: "sitio", definition: "- A location on the internet.\n- A physical location." },
        ],
      },
    ]);
    expect(rendered).toBe(
      '- site: "sitio" (- A location on the internet. - A physical location.)',
    );
  });

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
