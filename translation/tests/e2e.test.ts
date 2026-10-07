import { describe, expect, it } from "@jest/globals";
import {
  RequestValidationError,
  StubBackend,
  translate,
} from "../src/index.js";

/**
 * Fixture mirroring real platform-strings catalog entries
 * (platform/docs-nextjs/src/internationalization/platform-strings.en-us.json
 * uses dot-namespaced keys).
 */
const catalogSample = {
  "actions.ask_mongodb_ai": "Ask MongoDB AI",
  "actions.copy_page": "Copy page",
  "chatbot.welcome_to_mongodb_ai": "Welcome to MongoDB AI",
  "code.aria_label_copy": "Copy",
  "errors.alt_page_not_found": "Page not found",
};

const NON_TRANSLATABLE = ["MongoDB", "MongoDB AI", "Atlas", "Compass"];

describe("translation service end to end", () => {
  it("translates a realistic catalog slice with protected terms restored", async () => {
    const response = await translate(
      {
        source_locale: "en-us",
        target_locale: "pt-br",
        payload: catalogSample,
        non_translatable_terms: NON_TRANSLATABLE,
      },
      { backend: new StubBackend(), requestId: "req_e2e_1" },
    );

    expect(response.translations).toEqual({
      "actions.ask_mongodb_ai": "[pt-br] Ask MongoDB AI",
      "actions.copy_page": "[pt-br] Copy page",
      "chatbot.welcome_to_mongodb_ai": "[pt-br] Welcome to MongoDB AI",
      "code.aria_label_copy": "[pt-br] Copy",
      "errors.alt_page_not_found": "[pt-br] Page not found",
    });
    expect(response.errors).toEqual({});
    expect(response.meta).toEqual({
      provider: "stub",
      model: "stub-v1",
      content_type: "platform_strings",
      partial_failure: false,
      request_id: "req_e2e_1",
    });
    // Output keys mirror input keys exactly, in order.
    expect(Object.keys(response.translations)).toEqual(Object.keys(catalogSample));
  });

  it("returns the documented partial-failure shape", async () => {
    const response = await translate(
      {
        source_locale: "en-us",
        target_locale: "pt-br",
        payload: catalogSample,
        non_translatable_terms: NON_TRANSLATABLE,
      },
      {
        backend: new StubBackend({
          corruptTokensFor: ["chatbot.welcome_to_mongodb_ai"],
        }),
        requestId: "req_e2e_2",
      },
    );

    expect(response.translations["chatbot.welcome_to_mongodb_ai"]).toBeNull();
    expect(response.errors["chatbot.welcome_to_mongodb_ai"]?.code).toBe(
      "PLACEHOLDER_RESTORATION_FAILED",
    );
    expect(response.translations["actions.copy_page"]).toBe("[pt-br] Copy page");
    expect(response.meta.partial_failure).toBe(true);
  });

  it("rejects malformed requests through the public surface", async () => {
    await expect(
      translate(
        {
          source_locale: "en-us",
          target_locale: "pt-br",
          payload: { "actions.copy_page": 42 } as unknown as Record<string, string>,
        },
        { backend: new StubBackend() },
      ),
    ).rejects.toBeInstanceOf(RequestValidationError);
  });
});
