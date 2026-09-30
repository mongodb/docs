import { ObjectId, type InsertOneResult } from 'mongodb';
import { type NextRequest, NextResponse } from 'next/server';
import { withCORS } from '@/app/lib/with-cors';
import { type ScreenshotAttachment, getAttachment } from '@/services/feedback/handle-screenshot-feedback';
import type { Viewport, SnootyEnv } from '@/types/data';
import { feedback_actions } from '@/services/feedback/feedback-actions';
import { getFeedbackResponsesCollection, type FeedbackDocument } from '@/services/db/feedback';
import { checkRateLimit, getClientIp } from '@/services/rate-limit/rate-limit';
import { validateFeedbackInput } from '@/services/feedback/feedback-input';
import type { Page, User, Attachment, Fingerprint, FeedbackSentiment } from '@/services/feedback/feedback-types';
import { starRating } from '@/services/feedback/feedback-types';

export type FeedbackPayload = {
  page: Page;
  user: User;
  attachment?: Attachment;
  viewport: Viewport;
  category: FeedbackSentiment;
  rating: keyof typeof starRating;
  snootyEnv: SnootyEnv;
  comment?: string;
};

export async function OPTIONS() {
  return withCORS(new NextResponse(null, { status: 204 }));
}

// Per-page cap: a single visitor should only ever leave a handful of distinct
// feedback submissions on one page. Every request creates a brand-new
// document (there is no update-by-id capability on this endpoint — see
// DOP-7209), so this now applies unconditionally to every request.
const PER_PAGE_LIMIT = 5;
const PER_PAGE_WINDOW_SEC = 3600;

export async function POST(request: NextRequest) {
  const clientIp = getClientIp(request);

  // Global per-IP limit: sheds high-velocity automated traffic across all pages
  // on this public, unauthenticated endpoint. Checked first, before any work.
  const rateLimit = await checkRateLimit({ key: `feedback-submit:${clientIp}` });
  if (!rateLimit.allowed) {
    const response = NextResponse.json({ error: 'Too many requests. Please try again later.' }, { status: 429 });
    response.headers.set('Retry-After', String(rateLimit.retryAfterSec));
    return withCORS(response);
  }

  let body: FeedbackPayload;
  try {
    body = await request.json();
  } catch {
    return withCORS(NextResponse.json({ error: 'Request body is required and must be valid JSON' }, { status: 400 }));
  }

  const { page, user, attachment, comment, category, rating, snootyEnv } = body;

  const validRatings = Object.keys(starRating).map(Number);
  if (typeof rating !== 'number' || !validRatings.includes(rating)) {
    return withCORS(
      NextResponse.json(
        { error: `Invalid rating value: ${rating}. Must be one of ${validRatings.join(', ')}` },
        { status: 400 },
      ),
    );
  }

  // --- Input validation & sanitization (DOP-7023) ---
  // Every field is attacker-controlled on this unauthenticated endpoint.
  // See validateFeedbackInput for the NoSQL-injection and XSS rationale.
  const validation = validateFeedbackInput({ page, user, comment, category });
  if (!validation.ok) {
    return withCORS(NextResponse.json({ error: validation.error }, { status: 400 }));
  }
  const { page: cleanPage, comment: sanitizedComment } = validation;

  // Per-page limit on every request. page.url is client-supplied, but a
  // scanner spoofing it is still caught by the global per-IP limit above.
  const pageKey = String(page?.url ?? 'unknown')
    .split('#')[0]
    .split('?')[0]
    .toLowerCase();
  const perPageLimit = await checkRateLimit({
    key: `feedback-submit:page:${clientIp}:${pageKey}`,
    limit: PER_PAGE_LIMIT,
    windowSec: PER_PAGE_WINDOW_SEC,
  });
  if (!perPageLimit.allowed) {
    const response = NextResponse.json(
      { error: 'Too many feedback submissions for this page. Please try again later.' },
      { status: 429 },
    );
    response.headers.set('Retry-After', String(perPageLimit.retryAfterSec));
    return withCORS(response);
  }

  const fingerprint = constructFingerprint(request);

  const id = new ObjectId();

  const feedback: FeedbackDocument = {
    _id: id,
    fingerprint,
    submittedAt: new Date(),
    page: cleanPage,
    user: {
      id: user.id,
      email: user.email,
    },
    comment: sanitizedComment,
    category: category,
    rating: rating,
    attachments: [],
    snootyEnv: snootyEnv,
  };
  try {
    if (attachment?.dataUri && attachment?.viewport) {
      const screenshotAttachment: ScreenshotAttachment = {
        type: 'screenshot',
        dataUri: attachment.dataUri,
        viewport: attachment.viewport,
      };
      const attachmentInfo = await getAttachment({
        feedback,
        attachment: screenshotAttachment,
      });
      feedback.attachments = [attachmentInfo];
    }
  } catch (error) {
    console.error('Unable to add attachment to feedback document', error);
    return withCORS(
      NextResponse.json(
        {
          error: `Unable to add attachment to feedback document ${feedback._id}, error: ${error}`,
        },
        { status: 400 },
      ),
    );
  }

  let insertResult: InsertOneResult<FeedbackDocument>;
  try {
    insertResult = await insertFeedbackDocument(feedback);
  } catch (error) {
    console.error('Unable to insert new feedback document', error);
    return withCORS(
      NextResponse.json(
        {
          error: `Unable to insert new feedback document with id: ${feedback._id}. Error: ${error}`,
        },
        { status: 400 },
      ),
    );
  }

  // The document is already durably saved at this point — a Slack/Jira
  // notification failure shouldn't turn into an error response the client
  // has to handle, since there's nothing for the client to retry (retrying
  // only creates another document; see DOP-7209). Surface it via the
  // response body and logs instead of failing the request.
  let notificationFailed = false;
  try {
    await feedback_actions(feedback);
  } catch (error) {
    console.error('Unable to send feedback notifications', error);
    notificationFailed = true;
  }

  return withCORS(NextResponse.json({ ...insertResult, notificationFailed }));
}

async function insertFeedbackDocument(feedback: FeedbackDocument): Promise<InsertOneResult<FeedbackDocument>> {
  const feedbackCollection = await getFeedbackResponsesCollection(feedback.snootyEnv);

  const insertResult = await feedbackCollection.insertOne(feedback);

  if (insertResult.acknowledged) {
    console.log(`Inserted feedback document with id ${feedback._id}`);
  } else {
    console.error('No feedback document was inserted');
  }

  return insertResult;
}

function constructFingerprint(request: NextRequest): Fingerprint {
  const httpUserAgent = request.headers.get('user-agent');
  const remoteIPAddress = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown';

  return {
    userAgent: httpUserAgent,
    ipAddress: remoteIPAddress,
  };
}
