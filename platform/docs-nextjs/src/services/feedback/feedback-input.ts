import sanitizeHtml from 'sanitize-html';
import type { Page, FeedbackSentiment } from './feedback-types';

/**
 * Validation and sanitization for the public, unauthenticated feedback
 * upsert payload (DOP-7023).
 */

const MAX_COMMENT_LENGTH = 5000;
const MAX_TITLE_LENGTH = 200;
const MAX_SLUG_LENGTH = 256;
const VALID_CATEGORIES: FeedbackSentiment[] = ['Negative', 'Suggestion', 'Positive', ' '];

const SLUG_CHARSET = /^[A-Za-z0-9/_.-]+$/;
const CONTROL_CHARS = /[\x00-\x1F]/;
// Excludes \n/\r so the multi-line comment Textarea isn't rejected.
const COMMENT_CONTROL_CHARS = /[\x00-\x08\x0B\x0C\x0E-\x1F]/;

const isString = (value: unknown): value is string => typeof value === 'string';

function isValidSlug(slug: string): boolean {
  return slug.length <= MAX_SLUG_LENGTH && !slug.includes('..') && SLUG_CHARSET.test(slug);
}

function isValidDocsProperty(docsProperty: string): boolean {
  return SLUG_CHARSET.test(docsProperty);
}

const FEEDBACK_URL_PATH_CHARSET = /^[A-Za-z0-9/_.#?&=-]*$/;
// Not a bare "*.netlify.app" wildcard: that would accept any Netlify customer's site.
const PREVIEW_URL_HOSTNAME = /^(deploy-preview-\d+|temp-pr-\d+)--[a-z0-9-]+\.netlify\.app$/;
// Same host already trusted in ALLOWED_CDN_HOSTNAMES (offline-download route).
const STAGING_URL_HOSTNAME = 'mongodbcom-cdn.staging.corp.mongodb.com';

// Compares url.hostname exactly, never startsWith/includes on the full
// string, so lookalikes like "www.mongodb.com.evil.com" or userinfo tricks
// like "www.mongodb.com@evil.com" can't pass.
function isValidFeedbackUrl(url: string): boolean {
  if (url.includes('..')) return false;

  let parsed: URL;
  try {
    parsed = new URL(url);
  } catch {
    return false;
  }
  if (parsed.username || parsed.password) return false;

  const host = parsed.hostname;
  const isProd = parsed.protocol === 'https:' && host === 'www.mongodb.com';
  const isPreview = parsed.protocol === 'https:' && PREVIEW_URL_HOSTNAME.test(host);
  const isStaging = parsed.protocol === 'https:' && host === STAGING_URL_HOSTNAME;
  const isLocalDev = parsed.protocol === 'http:' && (host === 'localhost' || host === '127.0.0.1');
  if (!isProd && !isPreview && !isStaging && !isLocalDev) return false;

  const rest = url.slice(`${parsed.protocol}//${parsed.host}`.length);
  return FEEDBACK_URL_PATH_CHARSET.test(rest);
}

// Allows < > since real titles can contain them (e.g. "$[<identifier>]").
function isValidTitle(title: string): boolean {
  return title.length <= MAX_TITLE_LENGTH && !CONTROL_CHARS.test(title);
}

export type FeedbackInput = {
  page: unknown;
  user: unknown;
  comment?: unknown;
  category?: unknown;
};

export type ValidatedFeedbackInput =
  | { ok: true; page: Page; comment: string | undefined }
  | { ok: false; error: string };

// page.docs_property flows into a MongoDB query filter downstream, so a
// non-string value (e.g. `{ "$ne": null }`) would be a NoSQL operator
// injection.
export function validateFeedbackInput({ page, user, comment, category }: FeedbackInput): ValidatedFeedbackInput {
  if (
    typeof page !== 'object' ||
    page === null ||
    !isString((page as Page).slug) ||
    !isString((page as Page).title) ||
    !isString((page as Page).url) ||
    !isString((page as Page).docs_property) ||
    !isValidSlug((page as Page).slug) ||
    !isValidFeedbackUrl((page as Page).url) ||
    !isValidDocsProperty((page as Page).docs_property) ||
    !isValidTitle((page as Page).title)
  ) {
    return { ok: false, error: 'Invalid page data' };
  }

  if (typeof user !== 'object' || user === null || !isString((user as { id: unknown }).id)) {
    return { ok: false, error: 'Invalid user data' };
  }

  if (category !== undefined && !VALID_CATEGORIES.includes(category as FeedbackSentiment)) {
    return { ok: false, error: 'Invalid category' };
  }

  if (comment !== undefined && (!isString(comment) || COMMENT_CONTROL_CHARS.test(comment))) {
    return { ok: false, error: 'Invalid comment' };
  }

  const typedPage = page as Page;
  const cleanPage: Page = {
    slug: typedPage.slug,
    title: typedPage.title,
    url: typedPage.url,
    docs_property: typedPage.docs_property,
  };

  const sanitizedComment = isString(comment)
    ? sanitizeHtml(comment, { allowedTags: [], allowedAttributes: {} }).slice(0, MAX_COMMENT_LENGTH)
    : undefined;

  return { ok: true, page: cleanPage, comment: sanitizedComment };
}
