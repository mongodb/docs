import { createHmac, timingSafeEqual } from 'node:crypto';
import envConfig from '@/utils/env-config';

/**
 * Request authentication for Slack-facing webhook routes.
 *
 * Slack signs every request to an interactivity/webhook URL with the app's
 * signing secret. Verifying that signature is the only thing that
 * distinguishes a real Slack callback from an arbitrary POST by an
 * unauthenticated internet caller, so it must happen before any field of the
 * payload is read.
 *
 * Signing spec: https://api.slack.com/authentication/verifying-requests-from-slack
 */

const SIGNATURE_VERSION = 'v0';

/**
 * Slack recommends rejecting requests whose timestamp is more than five
 * minutes old, which bounds how long a captured signed request stays
 * replayable.
 */
const MAX_TIMESTAMP_SKEW_SEC = 60 * 5;

/**
 * `response_url` values issued by Slack are always
 * `https://hooks.slack.com/actions/...`. Because the payload is attacker-
 * controlled until the signature check passes, treat this as a strict
 * allowlist rather than a deny-list of internal ranges: an exact host match on
 * a Slack-controlled domain leaves no private address, loopback address, or
 * link-local metadata endpoint reachable, so there is nothing to enumerate.
 */
const ALLOWED_RESPONSE_URL_HOST = 'hooks.slack.com';

export type SlackVerificationFailure =
  | 'not_configured'
  | 'missing_headers'
  | 'malformed_timestamp'
  | 'stale_timestamp'
  | 'invalid_signature';

export type SlackVerificationResult = { ok: true } | { ok: false; reason: SlackVerificationFailure };

/**
 * Verify the `X-Slack-Signature` / `X-Slack-Request-Timestamp` pair against the
 * exact raw request body.
 *
 * The body must be the unmodified string read off the request. Re-serializing
 * it (parsing the form encoding and joining it back together, for example)
 * changes the bytes Slack signed and the HMAC will not match.
 *
 * Fails closed when `SLACK_SIGNING_SECRET` is unset. A verifier that skips the
 * check on a missing secret is equivalent to having no verifier at all, since
 * a misconfigured deploy silently reopens the hole this function exists to
 * close.
 */
export function verifySlackRequest({
  rawBody,
  headers,
  now = Date.now(),
}: {
  rawBody: string;
  headers: Headers;
  now?: number;
}): SlackVerificationResult {
  const secret = envConfig.SLACK_SIGNING_SECRET;
  if (!secret) {
    console.error('SLACK_SIGNING_SECRET is not set; rejecting Slack request');
    return { ok: false, reason: 'not_configured' };
  }

  const signature = headers.get('x-slack-signature');
  const timestamp = headers.get('x-slack-request-timestamp');
  if (!signature || !timestamp) {
    return { ok: false, reason: 'missing_headers' };
  }

  // A non-numeric timestamp would otherwise make the skew comparison NaN, and
  // every NaN comparison is false — so the staleness check would pass.
  if (!/^\d+$/.test(timestamp)) {
    return { ok: false, reason: 'malformed_timestamp' };
  }

  const skewSec = Math.abs(now / 1000 - Number(timestamp));
  if (skewSec > MAX_TIMESTAMP_SKEW_SEC) {
    return { ok: false, reason: 'stale_timestamp' };
  }

  const expected = `${SIGNATURE_VERSION}=${createHmac('sha256', secret)
    .update(`${SIGNATURE_VERSION}:${timestamp}:${rawBody}`)
    .digest('hex')}`;

  const expectedBuffer = Buffer.from(expected, 'utf8');
  const providedBuffer = Buffer.from(signature, 'utf8');

  // timingSafeEqual throws on length mismatch, which would itself leak length
  // through an exception, so compare lengths first and bail without hashing.
  if (expectedBuffer.length !== providedBuffer.length) {
    return { ok: false, reason: 'invalid_signature' };
  }
  if (!timingSafeEqual(expectedBuffer, providedBuffer)) {
    return { ok: false, reason: 'invalid_signature' };
  }

  return { ok: true };
}

/**
 * Whether a `response_url` taken from an interaction payload is safe to fetch.
 *
 * Defense in depth: signature verification alone already prevents an attacker
 * from supplying this value, but the endpoint has regressed into an SSRF sink
 * once, so the outbound target is constrained independently of how the payload
 * was authenticated.
 */
export function isAllowedSlackResponseUrl(responseUrl: unknown): responseUrl is string {
  if (typeof responseUrl !== 'string') return false;

  let parsed: URL;
  try {
    parsed = new URL(responseUrl);
  } catch {
    return false;
  }

  if (parsed.protocol !== 'https:') return false;
  if (parsed.hostname.toLowerCase() !== ALLOWED_RESPONSE_URL_HOST) return false;

  // `hostname` excludes the port, so without this an explicit port on the
  // allowed host (`https://hooks.slack.com:27017/...`) would pass and could be
  // used to probe non-standard ports.
  if (parsed.port !== '') return false;

  // Credentials in the authority are never present in a real Slack
  // `response_url` and are a classic parser-confusion vector.
  if (parsed.username !== '' || parsed.password !== '') return false;

  return true;
}
