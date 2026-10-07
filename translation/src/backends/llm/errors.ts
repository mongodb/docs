/**
 * Typed error thrown by LLM translation backends for whole-request
 * failures (bad request, provider HTTP error, timeout, unparseable or
 * mis-shaped response). The orchestrator catches these and degrades them
 * to per-key errors, so a throw never breaks the response shape.
 */
export type BackendStage = "request" | "provider" | "parse";

export type BackendReason =
  | "request_build_failed"
  | "provider_http_error"
  | "provider_timeout"
  | "provider_unparseable"
  | "provider_invalid_shape";

export interface BackendErrorInit {
  stage: BackendStage;
  provider: string;
  reason: BackendReason;
  message: string;
  requestId?: string;
  status?: number;
  cause?: unknown;
}

export class BackendError extends Error {
  readonly stage: BackendStage;
  readonly provider: string;
  readonly reason: BackendReason;
  readonly requestId: string | undefined;
  readonly status: number | undefined;

  constructor(init: BackendErrorInit) {
    super(
      init.message,
      init.cause !== undefined ? { cause: init.cause } : undefined,
    );
    this.name = "BackendError";
    this.stage = init.stage;
    this.provider = init.provider;
    this.reason = init.reason;
    this.requestId = init.requestId;
    this.status = init.status;
  }
}
