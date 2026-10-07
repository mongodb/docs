/**
 * Default Transport backed by global fetch, with an AbortController
 * timeout. An aborted request maps to BackendError(provider_timeout);
 * any other fetch rejection maps to provider_http_error. fetchImpl is
 * injectable so tests never touch the network.
 */
import { BackendError } from "../errors.js";
import type {
  Transport,
  TransportRequest,
  TransportResponse,
} from "../transport.js";

const PROVIDER = "grove";

export function createGroveTransport(
  timeoutMs: number,
  fetchImpl: typeof fetch = fetch,
): Transport {
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
      // body would hang forever, unbounded by GROVE_TIMEOUT_MS.
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
          provider: PROVIDER,
          reason: "provider_timeout",
          message: `Grove request timed out after ${timeoutMs}ms`,
          cause,
        });
      }
      throw new BackendError({
        stage: "provider",
        provider: PROVIDER,
        reason: "provider_http_error",
        message: `Grove request failed: ${
          cause instanceof Error ? cause.message : String(cause)
        }`,
        cause,
      });
    } finally {
      clearTimeout(timer);
    }
  };
}
