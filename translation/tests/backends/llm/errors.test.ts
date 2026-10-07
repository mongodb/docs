import { describe, expect, it } from "@jest/globals";
import { BackendError } from "../../../src/backends/llm/errors.js";

describe("BackendError", () => {
  it("carries structured failure metadata", () => {
    const err = new BackendError({
      stage: "provider",
      provider: "grove",
      reason: "provider_http_error",
      message: "Grove returned HTTP 503",
      status: 503,
      requestId: "req-123",
    });
    expect(err).toBeInstanceOf(Error);
    expect(err.name).toBe("BackendError");
    expect(err.message).toBe("Grove returned HTTP 503");
    expect(err.stage).toBe("provider");
    expect(err.provider).toBe("grove");
    expect(err.reason).toBe("provider_http_error");
    expect(err.status).toBe(503);
    expect(err.requestId).toBe("req-123");
  });

  it("defaults optional fields to undefined and preserves cause", () => {
    const cause = new Error("boom");
    const err = new BackendError({
      stage: "parse",
      provider: "grove",
      reason: "provider_unparseable",
      message: "bad json",
      cause,
    });
    expect(err.status).toBeUndefined();
    expect(err.requestId).toBeUndefined();
    expect(err.cause).toBe(cause);
  });
});
