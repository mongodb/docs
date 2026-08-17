import { ObjectId, type UpdateResult } from 'mongodb';
import { type NextRequest, NextResponse } from 'next/server';
import { withCORS } from '@/app/lib/with-cors';
import { type ScreenshotAttachment, getAttachment } from '@/services/feedback/handle-screenshot-feedback';
import type { Viewport, SnootyEnv } from '@/types/data';
import { feedback_actions } from '@/services/feedback/feedback-actions';
import { getFeedbackResponsesCollection, type FeedbackDocument } from '@/services/db/feedback';
import { checkRateLimit, getClientIp } from '@/services/rate-limit/rate-limit';
import { validateFeedbackInput } from '@/services/feedback/feedback-input';
import type {
  Page,
  User,
  Attachment,
  Fingerprint,
  FeedbackSentiment,
} from '@/services/feedback/feedback-types';
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
  feedback_id?: string;
};

export async function OPTIONS() {
  return withCORS(new NextResponse(null, { status: 204 }));
}

// Per-page cap: a single visitor should only ever leave a handful of distinct
// feedback submissions on one page. Only *new* submissions (requests without a
// feedback_id) count toward this, so the widget's multi-step update flow for a
// single submission is never penalized.
const PER_PAGE_LIMIT = 5;
const PER_PAGE_WINDOW_SEC = 3600;

export async function POST(request: NextRequest) {
  const clientIp = getClientIp(request);

  // Global per-IP limit: sheds high-velocity automated traffic across all pages
  // on this public, unauthenticated endpoint. Checked first, before any work.
  const rateLimit = await checkRateLimit({ key: `feedback-upsert:${clientIp}` });
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

  const { page, user, attachment, comment, category, rating, snootyEnv, feedback_id } = body;

  const validRatings = Object.keys(starRating).map(Number);
  if (!validRatings.includes(Number(rating))) {
    return withCORS(NextResponse.json({ error: `Invalid rating value: ${rating}. Must be one of ${validRatings.join(', ')}` }, { status: 400 }));
  }

  // --- Input validation & sanitization (DOP-7023) ---
  // Every field is attacker-controlled on this unauthenticated endpoint.
  // See validateFeedbackInput for the NoSQL-injection and XSS rationale.
  const validation = validateFeedbackInput({ page, user, comment, category });
  if (!validation.ok) {
    return withCORS(NextResponse.json({ error: validation.error }, { status: 400 }));
  }
  const { page: cleanPage, comment: sanitizedComment } = validation;

  // Per-page limit on new submissions only (feedback_id absent == a new
  // feedback). Updates to an in-progress submission carry a feedback_id and are
  // never blocked. Complements the per-IP limit above; page.url is
  // client-supplied, but a scanner spoofing it is still caught by that limit.
  if (!feedback_id) {
    const pageKey = String(page?.url ?? 'unknown').split('#')[0].split('?')[0].toLowerCase();
    const perPageLimit = await checkRateLimit({
      key: `feedback-upsert:page:${clientIp}:${pageKey}`,
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
  }

  const fingerprint = constructFingerprint(request);

  const id = feedback_id ? new ObjectId(feedback_id.toString()) : new ObjectId();

  // Initialize new Feedback Document
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
          error: `Unable to add attachment to ${feedback_id} feedback document, error: ${error}`,
        },
        { status: 400 },
      ),
    );
  }

  try {
    const updateOneRes = await insertFeedbackDocument(feedback);

    if (feedback_id) {
      // If this is not an existing feedback object, skip the rest of actions and just create the feedback object
      await feedback_actions(feedback);
    }
    return withCORS(NextResponse.json(updateOneRes));
  } catch (error) {
    console.error('Unable to insert new feedback document', error);
    return withCORS(
      NextResponse.json(
        {
          error: `Unable to insert new feedback document with id: ${feedback_id}. Error: ${error}`,
        },
        { status: 400 },
      ),
    );
  }
}

async function insertFeedbackDocument(feedback: FeedbackDocument): Promise<UpdateResult<FeedbackDocument>> {
  const feedbackCollection = await getFeedbackResponsesCollection(feedback.snootyEnv);

  const updateOneRes = await feedbackCollection.updateOne({ _id: feedback._id }, { $set: feedback }, { upsert: true });

  if (updateOneRes.modifiedCount > 0) {
    console.log(`Updated feedback document with id ${feedback._id}`);
  } else if (updateOneRes.upsertedCount > 0) {
    console.log(`inserted feedback document with id ${feedback._id}`);
  } else {
    console.error('No feedback document was inserted or updated');
  }

  return updateOneRes;
}

function constructFingerprint(request: NextRequest): Fingerprint {
  const httpUserAgent = request.headers.get('user-agent');
  const remoteIPAddress = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown';

  return {
    userAgent: httpUserAgent,
    ipAddress: remoteIPAddress,
  };
}
