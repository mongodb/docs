/**
 * @jest-environment node
 *
 * Route-level tests for the Slack interaction endpoint.
 *
 * `verify-slack-request.test.ts` covers the HMAC and URL logic as pure
 * functions. These tests cover the property that unit tests of those functions
 * cannot: that the route actually *calls* them, and calls them in the right
 * order. The vulnerability this endpoint was reported for is an ordering bug —
 * the payload was parsed and its `response_url` fetched before anything
 * authenticated the request — so the ordering is the thing worth pinning.
 */
import { createHmac } from 'node:crypto';
import type { NextRequest } from 'next/server';

// `__mocks__/next/server.ts` is a hand-written stand-in for jsdom suites, where
// next/server cannot load because it touches the Request global at module
// scope. jest applies that manual mock to node_modules automatically, but it
// implements only the NextResponse constructor — not `NextResponse.json`, which
// the route uses. This suite runs in the node environment, where the real
// Request/Response globals exist, so use the genuine implementation.
jest.unmock('next/server');

const SECRET = 'test-signing-secret';
const FEEDBACK_ID = '507f1f77bcf86cd799439011';
const SLACK_RESPONSE_URL = 'https://hooks.slack.com/actions/T0000/1234/abcdEFGH';

jest.mock('@/utils/env-config', () => ({
  __esModule: true,
  default: {
    get SLACK_SIGNING_SECRET() {
      return process.env.SLACK_SIGNING_SECRET ?? '';
    },
  },
}));

const mockCheckRateLimit = jest.fn();
jest.mock('@/services/rate-limit/rate-limit', () => ({
  __esModule: true,
  checkRateLimit: (...args: unknown[]) => mockCheckRateLimit(...args),
  getClientIp: () => '203.0.113.1',
}));

// Imported after the mocks so the route picks them up.
import { POST } from './route';

function buildPayload(responseUrl: string) {
  return JSON.stringify({
    type: 'block_actions',
    response_url: responseUrl,
    user: { id: 'U123' },
    channel: { id: 'C123' },
    actions: [
      {
        action_id: 'feedback-message',
        type: 'overflow',
        selected_option: {
          value: `slack-hide-message__${FEEDBACK_ID}`,
          text: { type: 'plain_text', text: 'Hide' },
        },
      },
    ],
  });
}

function buildRequest({ body, signed }: { body: string; signed: boolean }) {
  const headers = new Headers({ 'content-type': 'application/x-www-form-urlencoded' });

  if (signed) {
    const timestamp = String(Math.floor(Date.now() / 1000));
    headers.set('x-slack-request-timestamp', timestamp);
    headers.set(
      'x-slack-signature',
      `v0=${createHmac('sha256', SECRET).update(`v0:${timestamp}:${body}`).digest('hex')}`,
    );
  }

  // The handler reads only `headers` and `text()`. Constructing a real
  // NextRequest would require the undici globals, which jest's node
  // environment does not expose.
  return { headers, text: async () => body } as unknown as NextRequest;
}

function formBody(payload: string) {
  return new URLSearchParams({ payload }).toString();
}

describe('POST /api/feedback-interaction', () => {
  let fetchMock: jest.Mock;

  beforeEach(() => {
    process.env.SLACK_SIGNING_SECRET = SECRET;
    mockCheckRateLimit.mockResolvedValue({ allowed: true, limit: 20, remaining: 19, retryAfterSec: 0 });
    fetchMock = jest.fn().mockResolvedValue({ ok: true, statusText: 'OK' });
    global.fetch = fetchMock as unknown as typeof fetch;
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
    jest.clearAllMocks();
    delete process.env.SLACK_SIGNING_SECRET;
  });

  it('accepts a correctly signed interaction and posts back to the Slack response_url', async () => {
    const body = formBody(buildPayload(SLACK_RESPONSE_URL));

    const response = await POST(buildRequest({ body, signed: true }));

    expect(response.status).toBe(200);
    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(fetchMock.mock.calls[0][0]).toBe(SLACK_RESPONSE_URL);
  });

  it('rejects an unsigned payload with 401 and makes no outbound request', async () => {
    const body = formBody(buildPayload(SLACK_RESPONSE_URL));

    const response = await POST(buildRequest({ body, signed: false }));

    expect(response.status).toBe(401);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('rejects the reported attack: an unsigned payload aimed at internal address space', async () => {
    const body = formBody(buildPayload('http://169.254.169.254/latest/meta-data/'));

    const response = await POST(buildRequest({ body, signed: false }));

    expect(response.status).toBe(401);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('verifies before parsing, so a malformed body is rejected as unauthorized rather than reaching JSON.parse', async () => {
    // If verification were to run after parsing, this would surface as a 500
    // from the JSON.parse failure. A 401 proves nothing read the body first.
    const response = await POST(buildRequest({ body: formBody('this is not json'), signed: false }));

    expect(response.status).toBe(401);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('refuses to fetch a non-Slack response_url even when the payload is correctly signed', async () => {
    // Defense in depth: a signed request is still not permitted to steer the
    // outbound fetch off hooks.slack.com.
    const body = formBody(buildPayload('http://10.0.0.1:27017/'));

    const response = await POST(buildRequest({ body, signed: true }));

    expect(response.status).toBe(500);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('fails closed with 401 when the signing secret is not configured', async () => {
    delete process.env.SLACK_SIGNING_SECRET;
    const body = formBody(buildPayload(SLACK_RESPONSE_URL));

    const response = await POST(buildRequest({ body, signed: true }));

    expect(response.status).toBe(401);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('rate limits before doing any verification work', async () => {
    mockCheckRateLimit.mockResolvedValue({ allowed: false, limit: 20, remaining: 0, retryAfterSec: 42 });
    const body = formBody(buildPayload(SLACK_RESPONSE_URL));

    const response = await POST(buildRequest({ body, signed: true }));

    expect(response.status).toBe(429);
    expect(response.headers.get('Retry-After')).toBe('42');
    expect(fetchMock).not.toHaveBeenCalled();
  });
});
