import type { FeedbackDocument } from '@/services/db/feedback';
import { jiraClientWithAuth } from '@/utils/jira-client';
import type JiraApi from 'jira-client';
import type { S3ScreenshotAttachment } from './handle-screenshot-feedback';
import type { Attachment } from './feedback-types';
import type { ProjectDocument } from '../db/docs-metadata';

export const JIRA_CONSTS = {
  projectId: '14181',
  issuetypeId: '3',
  priorityId: '3',
  defaultLabels: ['request'],
  baseUrl: 'https://jira.mongodb.org/secure/CreateIssueDetails!init.jspa',
};

// API Payload interface
export interface JiraPayload {
  fields: {
    project: { id: string };
    issuetype: { id: string };
    priority: { id: string };
    labels: string[];
    components: string[];
    summary: string;
    description: string;
    reporter?: { name: string };
  };
}

// Query Parameters interface
export interface JiraQueryParams {
  pid: number;
  issuetype: number;
  priority: number;
  labels: string;
  components: string;
  summary: string;
  description: string;
}

export function buildJiraDescription(feedback: FeedbackDocument) {
  const description = [
    `*Feedback for page:* [${feedback.page.title}|${feedback.page.url}]`,
    `*Feedback Date:* ${feedback.submittedAt}`,
  ];
  if (feedback.user.email) {
    description.push(`*User Email:* ${feedback.user.email}`);
  }
  const screenshotAttachment = feedback.attachments.filter((a: Attachment) => a.type === 'screenshot')[0];
  if (screenshotAttachment) {
    description.push(`*Screenshot:* [Download from S3|${(screenshotAttachment as S3ScreenshotAttachment).url}]`);
  }
  if (feedback.comment) {
    description.push(`\n*Comment:*\n${feedback.comment}`);
  }
  return description.join('\n');
}

export function createJiraTicketUrl({ feedback, project }: { feedback: FeedbackDocument; project: ProjectDocument }) {
  if (!feedback) {
    throw Error('Cannot create Jira ticket without a feedback document.');
  }

  const ticketQueryParams = {
    pid: JIRA_CONSTS.projectId,
    issuetype: JIRA_CONSTS.issuetypeId,
    priority: JIRA_CONSTS.priorityId,
    labels: 'request',
    components: encodeURIComponent(project.jira.component),
    summary: encodeURIComponent(`[Docs Feedback] ${feedback.page.title} (${feedback.page.slug})`),
    description: encodeURIComponent(buildJiraDescription(feedback)),
  };

  const queryString = Object.entries(ticketQueryParams)
    .filter(([, value]) => value !== undefined)
    .map(([key, value]) => `${key}=${value}`)
    .join('&');

  return `${JIRA_CONSTS.baseUrl}?${queryString}`;
}

export function createJiraPayload({
  jiraInput,
  feedback,
  reporter,
}: {
  jiraInput: typeof JIRA_CONSTS;
  feedback: FeedbackDocument;
  reporter?: string;
}): JiraPayload {
  const summary = `[Docs Feedback]: ${feedback.page.title}`;
  const description = `URL: ${feedback.page.url} \n Sentiment: ${feedback.category} \n Description: ${feedback.comment} \n User Email: ${reporter}.`;
  return {
    fields: {
      project: { id: jiraInput.projectId },
      issuetype: { id: jiraInput.issuetypeId },
      priority: { id: jiraInput.priorityId },
      labels: [...jiraInput.defaultLabels],
      components: [],
      summary: summary,
      description: description,
      ...(reporter && { reporter: { name: reporter } }),
    },
  };
}

export async function constructJiraIssue(feedback: FeedbackDocument): Promise<JiraPayload> {
  // Check if user exists - we don't want ticket request to error out if it doesn't
  const email = feedback.user.email;
  const foundReporter = await findJiraUser(email);

  // Jira Issue creation
  const jiraPayload = createJiraPayload({
    jiraInput: JIRA_CONSTS,
    feedback,
    reporter: foundReporter ? email : undefined,
  });

  return jiraPayload;
}

async function findJiraUser(email: string): Promise<JiraApi.JsonResponse> {
  const user = await jiraClientWithAuth.searchUsers({
    query: email,
    maxResults: 1,
  });

  if (user) {
    console.log(`Jira user ${email} found, adding to jiraPayload`);
  } else {
    console.log(`Jira user ${email} not found, skipping reporter field`);
  }
  return user;
}
