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
  jest.restoreAllMocks();
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

  it("maps an abort to a provider_timeout BackendError carrying the provider label after retries", async () => {
    jest.useFakeTimers();
    jest.spyOn(console, "warn").mockImplementation(() => undefined);
    jest.spyOn(Math, "random").mockReturnValue(0);
    const fetchImpl = jest.fn((_url: unknown, init?: { signal?: AbortSignal }) =>
      new Promise((_resolve, reject) => {
        init?.signal?.addEventListener("abort", () =>
          reject(new Error("aborted")),
        );
      }),
    );
    const transport = createFetchTransport({
      timeoutMs: 50,
      provider: "anthropic",
      fetchImpl: fetchImpl as unknown as typeof fetch,
    });
    const pending = transport(request).catch((cause: unknown) => cause);
    await jest.advanceTimersByTimeAsync(50);
    await jest.runOnlyPendingTimersAsync();
    await jest.runOnlyPendingTimersAsync();
    const error = await pending;
    expect(error).toMatchObject({
      constructor: BackendError,
      reason: "provider_timeout",
      provider: "anthropic",
    });
    expect(fetchImpl).toHaveBeenCalledTimes(2);
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

  it("times out if the body stalls after the headers arrive, including on the retry", async () => {
    jest.useFakeTimers();
    jest.spyOn(console, "warn").mockImplementation(() => undefined);
    jest.spyOn(Math, "random").mockReturnValue(0);
    const fetchImpl = jest.fn((_url: unknown, init?: { signal?: AbortSignal }) =>
      Promise.resolve({
        ok: true,
        status: 200,
        text: () =>
          new Promise((_resolve, reject) => {
            init?.signal?.addEventListener("abort", () =>
              reject(new Error("aborted")),
            );
          }),
      }),
    );
    const transport = createFetchTransport({
      timeoutMs: 20,
      provider: "openai",
      fetchImpl: fetchImpl as unknown as typeof fetch,
    });
    const pending = transport(request).catch((cause: unknown) => cause);
    await jest.advanceTimersByTimeAsync(20);
    await jest.runOnlyPendingTimersAsync();
    await jest.runOnlyPendingTimersAsync();
    const error = await pending;
    expect(error).toMatchObject({
      constructor: BackendError,
      reason: "provider_timeout",
    });
    expect(fetchImpl).toHaveBeenCalledTimes(2);
  });
});

describe("createFetchTransport retry", () => {
  it("retries the identical whole-request POST once after a response-body timeout", async () => {
    jest.useFakeTimers();
    jest.spyOn(Math, "random").mockReturnValue(0.25);
    const warn = jest.spyOn(console, "warn").mockImplementation(() => undefined);
    const wholeFileRequest: TransportRequest = {
      url: request.url,
      headers: { authorization: "secret-test-value" },
      body: JSON.stringify({
        segments: [
          { key: "a", value: "source-marker" },
          { key: "b", value: "second-segment" },
        ],
      }),
    };
    const signals: Array<AbortSignal | null | undefined> = [];
    let attempt = 0;
    const fetchImpl = jest.fn(
      async (_url: string | URL | Request, init?: RequestInit) => {
        attempt++;
        signals.push(init?.signal);
        if (attempt === 1) {
          return {
            ok: true,
            status: 200,
            text: () =>
              new Promise<string>((_resolve, reject) => {
                init?.signal?.addEventListener("abort", () =>
                  reject(new Error("body-aborted")),
                );
              }),
          };
        }
        return new Response("second-body", { status: 200 });
      },
    );
    const transport = createFetchTransport({
      timeoutMs: 50,
      provider: "openai",
      fetchImpl: fetchImpl as unknown as typeof fetch,
    });

    const pending = transport(wholeFileRequest);
    await jest.advanceTimersByTimeAsync(50);
    await jest.advanceTimersByTimeAsync(249);
    expect(fetchImpl).toHaveBeenCalledTimes(1);
    await jest.advanceTimersByTimeAsync(1);
    expect(fetchImpl).toHaveBeenCalledTimes(2);
    const response = await pending;

    const firstUrl = fetchImpl.mock.calls[0]?.[0];
    const secondUrl = fetchImpl.mock.calls[1]?.[0];
    const firstInit = fetchImpl.mock.calls[0]?.[1];
    const secondInit = fetchImpl.mock.calls[1]?.[1];
    expect(firstUrl).toBe(wholeFileRequest.url);
    expect(secondUrl).toBe(wholeFileRequest.url);
    expect(firstInit?.method).toBe("POST");
    expect(secondInit?.method).toBe("POST");
    expect(firstInit?.headers).toEqual(wholeFileRequest.headers);
    expect(secondInit?.headers).toEqual(wholeFileRequest.headers);
    expect(firstInit?.body).toBe(wholeFileRequest.body);
    expect(secondInit?.body).toBe(wholeFileRequest.body);
    expect(signals[0]).toBeInstanceOf(AbortSignal);
    expect(signals[1]).toBeInstanceOf(AbortSignal);
    expect(signals[0]).not.toBe(signals[1]);
    expect(signals[1]?.aborted).toBe(false);
    expect(response.ok).toBe(true);
    expect(response.status).toBe(200);
    expect(response.attempts).toBe(2);
    expect(await response.text()).toBe("second-body");
    expect(warn).toHaveBeenCalledTimes(1);
    expect(warn).toHaveBeenCalledWith(
      "translation provider retry: provider=openai failed_attempt=1 next_attempt=2 reason=provider_timeout timeout_ms=50 delay_ms=250",
    );
    expect(JSON.stringify(warn.mock.calls)).not.toContain("secret-test-value");
    expect(JSON.stringify(warn.mock.calls)).not.toContain("source-marker");
    expect(jest.getTimerCount()).toBe(0);
  });

  it("throws the second provider_timeout unchanged after two timed-out attempts", async () => {
    jest.useFakeTimers();
    jest.spyOn(Math, "random").mockReturnValue(0.25);
    jest.spyOn(console, "warn").mockImplementation(() => undefined);
    const firstCause = new Error("first-cause");
    const secondCause = new Error("second-cause");
    let attempt = 0;
    const fetchImpl = jest.fn((_url: unknown, init?: { signal?: AbortSignal }) =>
      new Promise((_resolve, reject) => {
        attempt++;
        const cause = attempt === 1 ? firstCause : secondCause;
        init?.signal?.addEventListener("abort", () => reject(cause));
      }),
    );
    const transport = createFetchTransport({
      timeoutMs: 50,
      provider: "anthropic",
      fetchImpl: fetchImpl as unknown as typeof fetch,
    });

    const pending = transport(request).catch((cause: unknown) => cause);
    await jest.advanceTimersByTimeAsync(50);
    await jest.advanceTimersByTimeAsync(250);
    await jest.runOnlyPendingTimersAsync();
    const error = await pending;

    expect(error).toBeInstanceOf(BackendError);
    expect(error).toHaveProperty("provider", "anthropic");
    expect(error).toHaveProperty("reason", "provider_timeout");
    expect(error).toHaveProperty("message", "anthropic request timed out after 50ms");
    expect((error as BackendError).cause).toBe(secondCause);
    expect(fetchImpl).toHaveBeenCalledTimes(2);
    expect(jest.getTimerCount()).toBe(0);
  });

  it("does not retry a non-timeout fetch rejection", async () => {
    const cause = new Error("connection reset");
    const warn = jest.spyOn(console, "warn").mockImplementation(() => undefined);
    const fetchImpl = jest.fn(async () => Promise.reject(cause));
    const transport = createFetchTransport({
      timeoutMs: 1000,
      provider: "openai",
      fetchImpl: fetchImpl as unknown as typeof fetch,
    });

    await expect(transport(request)).rejects.toMatchObject({
      reason: "provider_http_error",
      cause,
    });
    expect(fetchImpl).toHaveBeenCalledTimes(1);
    expect(warn).not.toHaveBeenCalled();
  });

  it("does not retry a returned non-OK HTTP response", async () => {
    const warn = jest.spyOn(console, "warn").mockImplementation(() => undefined);
    const fetchImpl = jest.fn(async () => new Response("unavailable", { status: 503 }));
    const transport = createFetchTransport({
      timeoutMs: 1000,
      provider: "openai",
      fetchImpl: fetchImpl as unknown as typeof fetch,
    });

    const response = await transport(request);
    expect(response.ok).toBe(false);
    expect(response.status).toBe(503);
    expect(fetchImpl).toHaveBeenCalledTimes(1);
    expect(warn).not.toHaveBeenCalled();
  });

  it("uses the current attempt signal when classifying a later network failure", async () => {
    jest.useFakeTimers();
    jest.spyOn(Math, "random").mockReturnValue(0);
    jest.spyOn(console, "warn").mockImplementation(() => undefined);
    const secondCause = new Error("second-network-error");
    let attempt = 0;
    const fetchImpl = jest.fn((_url: unknown, init?: { signal?: AbortSignal }) => {
      attempt++;
      if (attempt === 1) {
        return new Promise((_resolve, reject) => {
          init?.signal?.addEventListener("abort", () =>
            reject(new Error("first-timeout")),
          );
        });
      }
      return Promise.reject(secondCause);
    });
    const transport = createFetchTransport({
      timeoutMs: 50,
      provider: "openai",
      fetchImpl: fetchImpl as unknown as typeof fetch,
    });

    const pending = transport(request).catch((cause: unknown) => cause);
    await jest.advanceTimersByTimeAsync(50);
    await jest.runOnlyPendingTimersAsync();
    const error = await pending;
    expect(error).toMatchObject({ reason: "provider_http_error" });
    expect((error as BackendError).cause).toBe(secondCause);
    expect(fetchImpl).toHaveBeenCalledTimes(2);
  });
});
