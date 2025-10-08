import type { Viewport } from '@/types/data';
import type { ObjectId } from 'mongodb';

export interface SlackBlock {
  type: string;
  [key: string]: unknown;
}

interface Action {
  type: 'slack';
  feedback_id: ObjectId;
}

export interface SlackPayload {
  channel: string;
  message: {
    text: string;
    blocks: SlackBlock[];
  };
}
export interface SlackAction extends Action {
  type: 'slack';
  channel: string;
  message: {
    text: string;
    blocks: SlackBlock[];
  };
}

export const LOCALIZED_CHANNEL_IDS = {
  development: 'C06RJHU282Z',
  staging: 'C06R8578R1D',
  production: 'C06RRKP5ECU',
};

export const DOP_CHANNEL_IDS = {
  development: 'C06HSDT3YTG',
  staging: 'C06HS0CHJLE',
};

export const SERVER_CHANNEL_ID = 'CG65R8J7R';

export const starRating = {
  1: '⭐',
  2: '⭐⭐',
  3: '⭐⭐⭐',
  4: '⭐⭐⭐⭐',
  5: '⭐⭐⭐⭐⭐',
};

export type FeedbackSentiment = 'Negative' | 'Suggestion' | 'Positive' | ' ';

export interface Page {
  slug: string;
  title: string;
  url: string;
  docs_property: string;
}
export interface User {
  id: string;
  email: string;
}

// TODO: ideally remove this and just have screenshot attachment type
export interface Attachment {
  type: string;
  dataUri?: string;
  viewport?: Viewport;
}

export interface Fingerprint {
  userAgent: string | null;
  ipAddress: string;
}
