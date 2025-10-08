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
  const createJiraTicket = feedback?.user?.email?.includes('@mongodb.com') && feedback?.comment;

  await Promise.all([handleSlackMessaging(feedback), createJiraTicket && handleJiraMessaging(feedback)]);
}
