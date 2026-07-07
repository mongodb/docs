/**
 * Shared blob-store helpers for the health-check scheduled trigger and its
 * background worker.
 */

import { getStore } from '@netlify/blobs';
import { INDEX_PAGES } from './top-pages';

export const HEALTH_CHECK_BLOB_STORE = 'health-check-urls';
export const HEALTH_CHECK_BLOB_KEY = 'index-pages';

// Key used to prevent duplicate/overlapping runs. The background worker
// releases this explicitly (see releaseRunLock) as soon as it finishes —
// success, failure, or internal timeout — so under normal operation the
// lock is only actually held for the real duration of an in-flight run.
//
// LOCK_WINDOW_MS is just a crash-safety fallback for the rare case where the
// background worker is hard-killed (e.g. it hits Netlify's 15-minute
// background function limit) before its release-the-lock cleanup can run.
// It's set just under that 15-minute ceiling. It's intentionally *longer*
// than the 10-minute schedule interval — if release ever silently fails,
// relying on the TTL alone means skipping one legitimate cycle is the
// tradeoff for not double-running an overlapping background job.
export const LOCK_KEY = 'run-lock';
export const LOCK_WINDOW_MS = 14 * 60 * 1_000; // 14 minutes

/**
 * Attempts to acquire a run lock so only one run executes at a time, even if
 * the scheduler fires the trigger on multiple instances concurrently or a
 * previous background run is still in flight.
 *
 * Returns true if this instance should proceed, false if another instance
 * acquired the lock recently and this one should exit early.
 */
export async function acquireRunLock(): Promise<boolean> {
  try {
    const store = getStore(HEALTH_CHECK_BLOB_STORE);
    const existing = await store.get(LOCK_KEY, { type: 'json' }) as { ts: number } | null;
    if (existing && typeof existing.ts === 'number' && Date.now() - existing.ts < LOCK_WINDOW_MS) {
      console.log(`[health-check] run lock held by another instance (age ${Math.round((Date.now() - existing.ts) / 1000)}s) — skipping`);
      return false;
    }
    await store.setJSON(LOCK_KEY, { ts: Date.now() });
    return true;
  } catch (err) {
    // If blob storage is unavailable, allow the run rather than silently skipping.
    console.warn('[health-check] Failed to check/write run lock — proceeding anyway:', err);
    return true;
  }
}

/**
 * Releases the run lock so the next scheduled trigger doesn't have to wait
 * out the full LOCK_WINDOW_MS. The background worker should call this once
 * it finishes, regardless of outcome (e.g. from a `finally` block).
 */
export async function releaseRunLock(): Promise<void> {
  try {
    const store = getStore(HEALTH_CHECK_BLOB_STORE);
    await store.delete(LOCK_KEY);
  } catch (err) {
    // Not fatal — the lock will still self-heal once LOCK_WINDOW_MS elapses.
    console.warn('[health-check] Failed to release run lock — it will self-expire:', err);
  }
}

/**
 * Loads index-page URLs from the `health-check-urls` blob store written by
 * the Nextjs Extension. Falls back to the hardcoded INDEX_PAGES constant if the
 * blob is unavailable or empty so the health check never silently stops running.
 */
export async function loadIndexPages(): Promise<string[]> {
  try {
    const store = getStore(HEALTH_CHECK_BLOB_STORE);
    const data = await store.get(HEALTH_CHECK_BLOB_KEY, { type: 'json' });
    if (Array.isArray(data) && data.length > 0) {
      console.log(`[health-check] loaded ${data.length} index pages from blob store "${HEALTH_CHECK_BLOB_STORE}"`);
      return data as string[];
    }
    console.warn(
      `[health-check] blob store "${HEALTH_CHECK_BLOB_STORE}" returned empty/null — falling back to hardcoded INDEX_PAGES`,
    );
  } catch (err) {
    console.warn('[health-check] Failed to load index pages from blob store — falling back to hardcoded INDEX_PAGES:', err);
  }
  return INDEX_PAGES;
}
