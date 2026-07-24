import type { ObjectId } from 'mongodb';
import { getCollection } from './client';

const DOCS_METADATA_DB_NAME = 'docs_metadata';

export interface SlackChannelDocument {
  _id: ObjectId;
  name: string;
  channel_id: string;
}

export async function getSlackChannelsCollection() {
  return getCollection<SlackChannelDocument>(DOCS_METADATA_DB_NAME, 'slack_channels');
}

export interface TeamDocument {
  _id: ObjectId;
  name: string;
  slack: {
    channels: string[];
    group_name: string;
    group_id: string;
  };
}

export async function getTeamsCollection() {
  return getCollection<TeamDocument>(DOCS_METADATA_DB_NAME, 'teams');
}

export interface ProjectDocument {
  _id: ObjectId;
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

export async function getProjectsCollection() {
  return getCollection<ProjectDocument>(DOCS_METADATA_DB_NAME, 'projects');
}
