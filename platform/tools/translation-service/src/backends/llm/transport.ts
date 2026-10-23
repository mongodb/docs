/**
 * Provider-neutral HTTP seam. Injecting a Transport into a backend keeps
 * it fully unit-testable with no network. The default fetch-based
 * implementation lives in `fetch-transport.ts` and is shared by the
 * provider backends.
 */
export interface TransportRequest {
  url: string;
  headers: Record<string, string>;
  body: string;
}

export interface TransportResponse {
  ok: boolean;
  status: number;
  text(): Promise<string>;
}

export type Transport = (
  request: TransportRequest,
) => Promise<TransportResponse>;
