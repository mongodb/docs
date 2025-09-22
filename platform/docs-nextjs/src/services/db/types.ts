import type { Root } from '@/types/ast';
import type { WithId, ObjectId } from 'mongodb';
import type { Attachment, FeedbackSentiment, Fingerprint, Page, User } from '../feedback/feedback-types';
import { type Document } from 'mongodb';
import type { SnootyEnv } from '@/types/data';
import type { starRating } from '../feedback/feedback-types';

interface StaticAsset {
  checksum: string;
  key: string;
}

interface UpdatedAsset extends StaticAsset {
  updated_at?: Date;
}

interface Facet {
  category: string;
  value: string;
  display_name: string;
  sub_facets?: { [key: string]: unknown }[];
}

export interface ASTDocument extends WithId<Document> {
  page_id: string;
  page_path: string;
  filename: string;
  ast: Root;
  static_assets: UpdatedAsset[];
  facets?: Facet[];
}

export interface FeedbackDocument extends WithId<Document> {
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

export interface ProjectDocument extends WithId<Document> {
  name: string;
  owner: string;
  baseUrl: string;
  jira: {
    component: string;
  };
  github: {
    organization: string;
    repo: string;
    monorepoPath: string;
  };
}
export interface TeamDocument extends WithId<Document> {
  name: string;
  slack: {
    channels: string[];
    group_name: string;
    group_id: string;
  };
}
export interface SlackChannelDocument extends WithId<Document> {
  name: string;
  channel_id: string;
}
