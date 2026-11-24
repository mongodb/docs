import type { NextRequest } from 'next/server';
import type { SnootyEnv } from '@/types/data';
import envConfig from '@/utils/env-config';
import { getCollection, getFeedbackDbName } from '@/services/db/client';

/**
 * IP-based, MongoDB-backed fixed-window rate limiter for the public,
 * unauthenticated feedback endpoints. Backing the counter with MongoDB (which
 * these apps already depend on) makes the limit effective across all
 * serverless instances and portable across hosting providers, unlike an
 * in-memory counter or a platform-specific rate limiter.
 */

const COLLECTION = 'rate_limits';

// Limits are intentionally generous so legitimate users (including many behind
// a shared corporate/mobile NAT IP) never hit the limit, while still stopping
// high-velocity automated scanning. Adjust these constants to tune.
const DEFAULT_LIMIT = 20;
const DEFAULT_WINDOW_SEC = 60;

interface RateLimitDoc {
  _id: string;
  count: number;
  expireAt: Date;
}

export interface RateLimitResult {
  allowed: boolean;
  limit: number;
  remaining: number;
  retryAfterSec: number;
}

// Ensure the TTL index exactly once per process. Reset on failure so a later
// call can retry.
let indexEnsured: Promise<void> | undefined;

async function getRateLimitCollection() {
  const dbName = getFeedbackDbName(envConfig.DB_ENV as SnootyEnv);
  const collection = await getCollection<RateLimitDoc>(dbName, COLLECTION);

  if (!indexEnsured) {
    // TTL index: MongoDB removes each document once `expireAt` passes, so the
    // collection self-cleans and old windows never accumulate.
    indexEnsured = collection
      .createIndex({ expireAt: 1 }, { expireAfterSeconds: 0 })
      .then(() => undefined)
      .catch((err) => {
        console.error('Failed to create rate_limits TTL index', err);
        indexEnsured = undefined;
      });
  }
  await indexEnsured;

  return collection;
}

/**
 * Extract the client IP from proxy headers. `x-forwarded-for` is a
 * comma-separated list (`client, proxy1, proxy2, ...`); the originating client
 * is the leftmost entry. Using the raw header as a key would let every request
 * look unique and defeat the limit.
 */
export function getClientIp(request: NextRequest): string {
  const xff = request.headers.get('x-forwarded-for');
  if (xff) {
    const first = xff.split(',')[0]?.trim();
    if (first) return first;
  }
  return request.headers.get('x-real-ip')?.trim() || 'unknown';
}

/**
 * Fixed-window per-key rate limit. Returns whether the request is allowed and,
 * if not, how long to wait.
 *
 * Fails open (allows the request) if MongoDB is unavailable, so an infra hiccup
 * degrades to "no rate limiting" rather than taking down the feedback widget.
 */
export async function checkRateLimit({
  key,
  limit = DEFAULT_LIMIT,
  windowSec = DEFAULT_WINDOW_SEC,
}: {
  key: string;
  limit?: number;
  windowSec?: number;
}): Promise<RateLimitResult> {
  const windowMs = windowSec * 1000;
  const now = Date.now();
  const windowStart = Math.floor(now / windowMs) * windowMs;
  const docId = `${key}:${windowStart}`;

  try {
    const collection = await getRateLimitCollection();

    // Atomic increment-and-read so concurrent requests can't race past the
    // limit.
    const doc = await collection.findOneAndUpdate(
      { _id: docId },
      {
        $inc: { count: 1 },
        $setOnInsert: { expireAt: new Date(windowStart + windowMs) },
      },
      { upsert: true, returnDocument: 'after' },
    );

    const count = doc?.count ?? 1;
    const remaining = Math.max(0, limit - count);
    const allowed = count <= limit;
    const retryAfterSec = allowed ? 0 : Math.ceil((windowStart + windowMs - now) / 1000);

    return { allowed, limit, remaining, retryAfterSec };
  } catch (err) {
    console.error('Rate limit check failed; failing open', err);
    return { allowed: true, limit, remaining: limit, retryAfterSec: 0 };
  }
}
