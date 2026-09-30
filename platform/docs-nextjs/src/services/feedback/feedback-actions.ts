import type { FeedbackDocument } from '@/services/db/feedback';
import { createSlackMessagePayload } from './create-slack-message';
import { createJiraTicket } from './create-jira-ticket';
import { sendSlackMessage } from './send-slack-message';
import type { ChatPostMessageResponse } from '@slack/web-api';
import type JiraApi from 'jira-client';
import { constructJiraIssue } from './jira-builder';
import type { SlackAction } from './feedback-types';

async function handleSlackMessaging(feedback: FeedbackDocument): Promise<ChatPostMessageResponse[]> {
  const slackPayloads = await createSlackMessagePayload(feedback);
  const slackMessageArr = slackPayloads.map(async (slackPayload: SlackAction) => {
    return sendSlackMessage(slackPayload);
  });
  const slackResponses = await Promise.all(slackMessageArr);
  return slackResponses;
}

async function handleJiraMessaging(feedback: FeedbackDocument): Promise<JiraApi.JsonResponse> {
  const jiraPayload = await constructJiraIssue(feedback);
  const jiraResponse = await createJiraTicket(jiraPayload);
  return jiraResponse;
}

export async function feedback_actions(feedback: FeedbackDocument): Promise<void> {
  const shouldCreateJiraTicket = feedback?.user?.email?.includes('@mongodb.com') && feedback?.comment;

  // allSettled (not all) so a Slack failure and a Jira failure are each
  // logged individually — Promise.all's first-rejection-wins would hide
  // which one actually failed when the other side effect (an already-posted
  // Slack message, an already-created Jira ticket) can't be undone anyway.
  const [slackResult, jiraResult] = await Promise.allSettled([
    handleSlackMessaging(feedback),
    shouldCreateJiraTicket && handleJiraMessaging(feedback),
  ]);

  if (slackResult.status === 'rejected') {
    console.error(`Failed to send Slack notification for feedback ${feedback._id}`, slackResult.reason);
  }
  if (shouldCreateJiraTicket && jiraResult.status === 'rejected') {
    console.error(`Failed to create Jira ticket for feedback ${feedback._id}`, jiraResult.reason);
  }

  if (slackResult.status === 'rejected' || (shouldCreateJiraTicket && jiraResult.status === 'rejected')) {
    throw new Error('feedback_actions: one or more notification steps failed — see logged errors above');
  }
}
