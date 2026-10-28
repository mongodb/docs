import type { FeedbackDocument } from '@/services/db/feedback';
import type { S3ScreenshotAttachment } from './handle-screenshot-feedback';
import type { Attachment } from './feedback-types';
import type { ProjectDocument } from '../db/docs-metadata';

export const JIRA_CONSTS = {
  projectId: '14181',
  issuetypeId: '3',
  priorityId: '3',
  baseUrl: 'https://jira.mongodb.org/secure/CreateIssueDetails!init.jspa',
};

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

// Jira's wiki renderer cannot reliably escape a literal pipe
// (CONFSERVER-4009 is still open) or, in some contexts, brackets
// (CONFSERVER-55799), so untrusted text is stripped of the characters
// that have wiki-markup meaning rather than backslash-escaped.
function stripJiraWikiMarkup(text: string): string {
  return text.replace(/[|[\]{}!]/g, '');
}

export function buildJiraDescription(feedback: FeedbackDocument) {
  const description = [
    `*Feedback for page:* [${stripJiraWikiMarkup(feedback.page.title)}|${stripJiraWikiMarkup(feedback.page.url)}]`,
    `*Feedback Date:* ${feedback.submittedAt}`,
  ];
  if (feedback.user.email) {
    description.push(`*User Email:* ${stripJiraWikiMarkup(feedback.user.email)}`);
  }
  const screenshotAttachment = feedback.attachments.filter((a: Attachment) => a.type === 'screenshot')[0];
  if (screenshotAttachment) {
    description.push(`*Screenshot:* [Download from S3|${(screenshotAttachment as S3ScreenshotAttachment).url}]`);
  }
  if (feedback.comment) {
    description.push(`\n*Comment:*\n${stripJiraWikiMarkup(feedback.comment)}`);
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
