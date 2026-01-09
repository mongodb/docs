import { ObjectId, type UpdateResult } from 'mongodb';
import { type NextRequest, NextResponse } from 'next/server';
import { withCORS } from '@/app/lib/with-cors';
import { type ScreenshotAttachment, getAttachment } from '@/services/feedback/handle-screenshot-feedback';
import type { Viewport, SnootyEnv } from '@/types/data';
import { feedback_actions } from '@/services/feedback/feedback-actions';
import { getFeedbackResponsesCollection, type FeedbackDocument } from '@/services/db/feedback';
import type {
  Page,
  User,
  Attachment,
  Fingerprint,
  FeedbackSentiment,
  starRating,
} from '@/services/feedback/feedback-types';

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

export async function POST(request: NextRequest) {
  let body: FeedbackPayload;
  try {
    body = await request.json();
  } catch {
    return withCORS(NextResponse.json({ error: 'Request body is required and must be valid JSON' }, { status: 400 }));
  }

  const { page, user, attachment, comment, category, rating, snootyEnv, feedback_id } = body;

  const fingerprint = constructFingerprint(request);

  const id = feedback_id ? new ObjectId(feedback_id.toString()) : new ObjectId();

  // Initialize new Feedback Document
  const feedback: FeedbackDocument = {
    _id: id,
    fingerprint,
    submittedAt: new Date(),
    page,
    user: {
      id: user.id,
      email: user.email,
    },
    comment: comment ? comment : undefined,
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
