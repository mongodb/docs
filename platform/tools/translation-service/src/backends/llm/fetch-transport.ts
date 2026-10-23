/**
 * Default Transport backed by global fetch, with an AbortController
 * timeout. Provider-agnostic: the caller supplies the provider label used
 * on the BackendError it throws, so failures are attributed to the backend
 * that issued the request. fetchImpl is injectable so tests never touch the
 * network.
 */
import { BackendError } from "../errors.js";
import type {
  Transport,
  TransportRequest,
  TransportResponse,
} from "./transport.js";

export interface FetchTransportOptions {
  timeoutMs: number;
  provider: string;
  fetchImpl?: typeof fetch;
}

export function createFetchTransport(
  options: FetchTransportOptions,
): Transport {
  const { timeoutMs, provider } = options;
  const fetchImpl = options.fetchImpl ?? fetch;
  return async (request: TransportRequest): Promise<TransportResponse> => {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeoutMs);
    try {
      const response = await fetchImpl(request.url, {
        method: "POST",
        headers: request.headers,
        body: request.body,
        signal: controller.signal,
      });
      // Read the body here, while the abort timer is still armed. A lazy
      // `() => response.text()` would run after the finally-block clears
      // the timer, so a provider that sends headers fast then stalls the
      // body would hang forever, unbounded by the timeout.
      const bodyText = await response.text();
      return {
        ok: response.ok,
        status: response.status,
        text: () => Promise.resolve(bodyText),
      };
    } catch (cause) {
      if (controller.signal.aborted) {
        throw new BackendError({
          stage: "provider",
          provider,
          reason: "provider_timeout",
          message: `${provider} request timed out after ${timeoutMs}ms`,
          cause,
        });
      }
      throw new BackendError({
        stage: "provider",
        provider,
        reason: "provider_http_error",
        message: `${provider} request failed: ${
          cause instanceof Error ? cause.message : String(cause)
        }`,
        cause,
      });
    } finally {
      clearTimeout(timer);
    }
  };
}
