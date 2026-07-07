/**
 * Netlify Scheduled Function: health-check.ts
 *
 * Fires every 10 minutes and kicks off `health-check-background`, which does
 * the actual work of pinging every URL in the top-pages list and alerting
 * Slack on failures.
 *
 * IMPORTANT: Netlify scheduled functions have a hard, non-configurable
 * 30-second execution limit (see
 * https://docs.netlify.com/build/functions/scheduled-functions/#limitations).
 * Checking ~700 pages — with retries for flaky ones — routinely takes longer
 * than that. If run here, the platform would silently kill the
 * process mid-check, before it ever reached the Slack-alerting code. 
 * This function stays intentionally thin: acquire the run lock,
 * trigger the background function (which has a 15-minute execution limit),
 * and return.
 *
 * NOTE: this only ever runs on a schedule for published (production) deploys.
 */

import type { Config } from '@netlify/functions';
import { acquireRunLock } from './health-check-utils/blob-store';

export const config: Config = {
  schedule: '*/10 * * * *', // every 10 minutes
};

export default async function handler(): Promise<Response> {
  const acquired = await acquireRunLock();
  if (!acquired) {
    return new Response('Skipped — another run is already in progress', { status: 200 });
  }

  // Guaranteed env var for functions at runtime — see NOTE above.
  const siteUrl = process.env.URL;
  if (!siteUrl) {
    console.error('[health-check] URL env var is not set — cannot trigger health-check-background');
    return new Response('Missing URL env var', { status: 500 });
  }

  try {
    // Fire-and-forget: background functions respond with 202 immediately and
    // keep running after this trigger returns.
    const res = await fetch(`${siteUrl}/.netlify/functions/health-check-background`, { method: 'POST' });
    console.log(`[health-check] triggered health-check-background at ${siteUrl} (status ${res.status})`);
    if (!res.ok) {
      console.error(`[health-check] health-check-background responded with ${res.status} — it may not exist at this URL`);
      return new Response(`Background function invocation returned ${res.status}`, { status: 502 });
    }
  } catch (err) {
    console.error('[health-check] Failed to trigger health-check-background:', err);
    return new Response('Failed to trigger background function', { status: 500 });
  }

  return new Response('Triggered', { status: 200 });
}
