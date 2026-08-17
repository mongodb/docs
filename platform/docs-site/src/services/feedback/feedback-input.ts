import sanitizeHtml from 'sanitize-html';
import type { Page, FeedbackSentiment } from './feedback-types';

/**
 * Validation and sanitization for the public, unauthenticated feedback
 * upsert payload (DOP-7023). Kept as a pure, dependency-light function so the
 * security-critical logic is unit-testable without the Next.js request
 * pipeline.
 */

const MAX_COMMENT_LENGTH = 5000;
const VALID_CATEGORIES: FeedbackSentiment[] = ['Negative', 'Suggestion', 'Positive', ' '];

const isString = (value: unknown): value is string => typeof value === 'string';

export type FeedbackInput = {
  page: unknown;
  user: unknown;
  comment?: unknown;
  category?: unknown;
};

export type ValidatedFeedbackInput =
  | { ok: true; page: Page; comment: string | undefined }
  | { ok: false; error: string };

/**
 * Validates and sanitizes attacker-controlled feedback fields.
 *
 * page.docs_property flows into a MongoDB query filter downstream, so a
 * non-string value (e.g. `{ "$ne": null }`) would be a NoSQL operator
 * injection. All page/user string fields are therefore type-checked, `page`
 * is rebuilt from only its known fields (so no arbitrary object is
 * persisted), and `comment` is stripped of all HTML/markup and length-capped
 * to prevent stored XSS / markup injection into the Slack and JIRA sinks.
 */
export function validateFeedbackInput({ page, user, comment, category }: FeedbackInput): ValidatedFeedbackInput {
  if (
    typeof page !== 'object' ||
    page === null ||
    !isString((page as Page).slug) ||
    !isString((page as Page).title) ||
    !isString((page as Page).url) ||
    !isString((page as Page).docs_property)
  ) {
    return { ok: false, error: 'Invalid page data' };
  }

  if (typeof user !== 'object' || user === null || !isString((user as { id: unknown }).id)) {
    return { ok: false, error: 'Invalid user data' };
  }

  if (category !== undefined && !VALID_CATEGORIES.includes(category as FeedbackSentiment)) {
    return { ok: false, error: 'Invalid category' };
  }

  if (comment !== undefined && !isString(comment)) {
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
