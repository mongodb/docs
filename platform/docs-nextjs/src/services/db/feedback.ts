import type { ObjectId } from 'mongodb';
import type { SnootyEnv } from '@/types/data';
import { getCollection, getFeedbackDbName } from './client';
import type { Attachment, Fingerprint, FeedbackSentiment, Page, User } from '../feedback/feedback-types';
import type { starRating } from '../feedback/feedback-types';

export interface FeedbackDocument {
  _id: ObjectId;
  fingerprint: Fingerprint;
  submittedAt: Date;
  page: Page;
  user: User;
  comment: string | undefined;
  category: FeedbackSentiment;
  rating: keyof typeof starRating;
  attachments: Attachment[];
  snootyEnv: SnootyEnv;
}

export const getFeedbackResponsesCollection = async (env: SnootyEnv) => {
  const dbName = getFeedbackDbName(env);
  return getCollection<FeedbackDocument>(dbName, 'responses');
};
