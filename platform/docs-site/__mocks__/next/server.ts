// Manual mock for next/server following the pattern in __mocks__/next/navigation.ts.
// next/server fails to load in jest-environment-jsdom because it accesses the
// Request global at module evaluation time, which jsdom does not provide.

export class NextResponse {
  readonly status: number;
  private _body: string | null;
  private _headers: Map<string, string>;

  constructor(
    body: string | null | undefined,
    init?: { status?: number; headers?: Record<string, string> },
  ) {
    this.status = init?.status ?? 200;
    this._body = body ?? null;
    this._headers = new Map(
      Object.entries(init?.headers ?? {}).map(([k, v]) => [k.toLowerCase(), v]),
    );
  }

  text(): Promise<string> {
    return Promise.resolve(this._body ?? '');
  }

  get headers() {
    const map = this._headers;
    return { get: (key: string) => map.get(key.toLowerCase()) ?? null };
  }
}
