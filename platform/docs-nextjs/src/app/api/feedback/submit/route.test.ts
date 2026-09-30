/**
 * @jest-environment node
 *
 * Route-level tests for the feedback submit endpoint (DOP-7209).
 *
 * This endpoint used to accept a client-supplied `feedback_id` and use it as
 * an update target with no ownership check — any caller who knew or guessed
 * a valid id could overwrite someone else's feedback document. The fix
 * removes update-by-id entirely: every request always creates a brand-new,
 * server-generated document. These tests pin that property, not just the
 * happy path — see "ignores a client-supplied feedback_id" below.
 */
import type { NextRequest } from 'next/server';
import { ObjectId } from 'mongodb';

jest.unmock('next/server');

const mockCheckRateLimit = jest.fn();
jest.mock('@/services/rate-limit/rate-limit', () => ({
  __esModule: true,
  checkRateLimit: (...args: unknown[]) => mockCheckRateLimit(...args),
  getClientIp: () => '203.0.113.1',
}));

const mockInsertOne = jest.fn();
jest.mock('@/services/db/feedback', () => ({
  __esModule: true,
  getFeedbackResponsesCollection: async () => ({ insertOne: (...args: unknown[]) => mockInsertOne(...args) }),
}));

const mockFeedbackActions = jest.fn();
jest.mock('@/services/feedback/feedback-actions', () => ({
  __esModule: true,
  feedback_actions: (...args: unknown[]) => mockFeedbackActions(...args),
}));

// None of these tests exercise the screenshot-attachment path. Mocked so
// this suite doesn't transitively load env-config's module-scope env-var
// validation (AWS/Jira/Slack secrets), which isn't relevant here.
jest.mock('@/services/feedback/handle-screenshot-feedback', () => ({
  __esModule: true,
  getAttachment: jest.fn(),
}));

// Imported after the mocks so the route picks them up.
import { POST } from './route';

const VALID_PAGE = {
  title: 'Test Page',
  slug: 'docs/test-page',
  url: 'http://localhost/docs/test-page',
  docs_property: 'manual',
};

function buildBody(overrides: Record<string, unknown> = {}) {
  return {
    page: VALID_PAGE,
    user: { id: 'user_test_123' },
    viewport: { width: 1280, height: 800 },
    category: 'Positive',
    rating: 5,
    snootyEnv: 'development',
    ...overrides,
  };
}

function buildRequest(body: unknown) {
  // The handler reads only `headers` and `json()`. Constructing a real
  // NextRequest would require the undici globals, which jest's node
  // environment does not expose.
  return {
    headers: new Headers({ 'user-agent': 'jest' }),
    json: async () => body,
  } as unknown as NextRequest;
}

describe('POST /api/feedback/submit', () => {
  beforeEach(() => {
    mockCheckRateLimit.mockResolvedValue({ allowed: true, limit: 20, remaining: 19, retryAfterSec: 0 });
    mockInsertOne.mockResolvedValue({ acknowledged: true, insertedId: new ObjectId() });
    mockFeedbackActions.mockResolvedValue(undefined);
    jest.spyOn(console, 'log').mockImplementation(() => {});
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
    jest.clearAllMocks();
  });

  it('creates a new document with a server-generated id and fires feedback_actions', async () => {
    const response = await POST(buildRequest(buildBody()));

    expect(response.status).toBe(200);
    expect(mockInsertOne).toHaveBeenCalledTimes(1);
    expect(mockFeedbackActions).toHaveBeenCalledTimes(1);

    const insertedDoc = mockInsertOne.mock.calls[0][0];
    expect(insertedDoc._id).toBeInstanceOf(ObjectId);
  });

  it('still returns 200 with the saved document when feedback_actions fails — a notification failure must not look like a lost submission', async () => {
    mockFeedbackActions.mockRejectedValueOnce(new Error('Slack is down'));

    const response = await POST(buildRequest(buildBody()));
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(mockInsertOne).toHaveBeenCalledTimes(1);
    expect(body.notificationFailed).toBe(true);
  });

  it('ignores a client-supplied feedback_id — never treats it as an update target', async () => {
    const attackerChosenId = '507f191e810c19729de860ea';
    const response = await POST(buildRequest(buildBody({ feedback_id: attackerChosenId })));

    expect(response.status).toBe(200);
    expect(mockInsertOne).toHaveBeenCalledTimes(1);

    const insertedDoc = mockInsertOne.mock.calls[0][0];
    // The document written always gets a fresh, server-generated _id — the
    // attacker-chosen value is never adopted, so there is no way to target
    // an existing document for a write.
    expect(insertedDoc._id.toString()).not.toBe(attackerChosenId);
  });

  it('applies the per-page rate limit to every request, not just a subset', async () => {
    mockCheckRateLimit
      .mockResolvedValueOnce({ allowed: true, limit: 20, remaining: 19, retryAfterSec: 0 }) // global
      .mockResolvedValueOnce({ allowed: false, limit: 5, remaining: 0, retryAfterSec: 30 }); // per-page

    const response = await POST(buildRequest(buildBody()));

    expect(response.status).toBe(429);
    expect(mockInsertOne).not.toHaveBeenCalled();
    expect(mockFeedbackActions).not.toHaveBeenCalled();
  });

  it('rejects an invalid rating with 400 and makes no writes', async () => {
    const response = await POST(buildRequest(buildBody({ rating: 99 })));

    expect(response.status).toBe(400);
    expect(mockInsertOne).not.toHaveBeenCalled();
    expect(mockFeedbackActions).not.toHaveBeenCalled();
  });

  it('rejects malformed page data with 400 and makes no writes', async () => {
    const response = await POST(buildRequest(buildBody({ page: { ...VALID_PAGE, slug: "'; DROP TABLE" } })));

    expect(response.status).toBe(400);
    expect(mockInsertOne).not.toHaveBeenCalled();
  });

  it('rejects a non-JSON body with 400', async () => {
    const request = {
      headers: new Headers({ 'user-agent': 'jest' }),
      json: async () => {
        throw new SyntaxError('Unexpected token');
      },
    } as unknown as NextRequest;

    const response = await POST(request);

    expect(response.status).toBe(400);
    expect(mockInsertOne).not.toHaveBeenCalled();
  });

  it('rejects when the global per-IP rate limit is exceeded, before any other work', async () => {
    mockCheckRateLimit.mockResolvedValueOnce({ allowed: false, limit: 20, remaining: 0, retryAfterSec: 10 });

    const response = await POST(buildRequest(buildBody()));

    expect(response.status).toBe(429);
    expect(response.headers.get('Retry-After')).toBe('10');
    expect(mockInsertOne).not.toHaveBeenCalled();
  });
});
