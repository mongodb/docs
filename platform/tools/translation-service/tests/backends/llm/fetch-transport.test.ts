import { afterEach, describe, expect, it, jest } from "@jest/globals";
import { createFetchTransport } from "../../../src/backends/llm/fetch-transport.js";
import { BackendError } from "../../../src/backends/errors.js";
import type { TransportRequest } from "../../../src/backends/llm/transport.js";

const request: TransportRequest = {
  url: "https://example.test/v1/responses",
  headers: { "api-key": "secret" },
  body: "{}",
};

afterEach(() => {
  jest.useRealTimers();
});

describe("createFetchTransport", () => {
  it("passes the request through fetch and returns a minimal response", async () => {
    const fetchImpl = jest.fn(
      async (_url: string | URL | Request, init?: RequestInit) => {
        expect(init?.method).toBe("POST");
        return new Response("body-text", { status: 200 });
      },
    );
    const transport = createFetchTransport({
      timeoutMs: 1000,
      provider: "openai",
      fetchImpl: fetchImpl as unknown as typeof fetch,
    });
    const res = await transport(request);
    expect(res.ok).toBe(true);
    expect(res.status).toBe(200);
    expect(await res.text()).toBe("body-text");
  });

  it("maps an abort to a provider_timeout BackendError carrying the provider label", async () => {
    jest.useFakeTimers();
    const fetchImpl = ((_url: unknown, init?: { signal?: AbortSignal }) =>
      new Promise((_resolve, reject) => {
        init?.signal?.addEventListener("abort", () =>
          reject(new Error("aborted")),
        );
      })) as unknown as typeof fetch;
    const transport = createFetchTransport({
      timeoutMs: 50,
      provider: "anthropic",
      fetchImpl,
    });
    const pending = transport(request);
    jest.advanceTimersByTime(50);
    await expect(pending).rejects.toMatchObject({
      constructor: BackendError,
      reason: "provider_timeout",
      provider: "anthropic",
    });
  });

  it("labels a non-abort failure with the provider", async () => {
    const fetchImpl = (() =>
      Promise.reject(new Error("connection reset"))) as unknown as typeof fetch;
    const transport = createFetchTransport({
      timeoutMs: 1000,
      provider: "openai",
      fetchImpl,
    });
    await expect(transport(request)).rejects.toMatchObject({
      constructor: BackendError,
      reason: "provider_http_error",
      provider: "openai",
    });
  });

  it("times out if the body stalls after the headers arrive", async () => {
    // Headers resolve immediately, but the body read never settles until
    // aborted — proving the timeout bounds the whole read, not just
    // time-to-headers.
    const fetchImpl = ((_url: unknown, init?: { signal?: AbortSignal }) =>
      Promise.resolve({
        ok: true,
        status: 200,
        text: () =>
          new Promise((_resolve, reject) => {
            init?.signal?.addEventListener("abort", () =>
              reject(new Error("aborted")),
            );
          }),
      })) as unknown as typeof fetch;
    const transport = createFetchTransport({
      timeoutMs: 20,
      provider: "openai",
      fetchImpl,
    });
    await expect(transport(request)).rejects.toMatchObject({
      constructor: BackendError,
      reason: "provider_timeout",
    });
  });
});
