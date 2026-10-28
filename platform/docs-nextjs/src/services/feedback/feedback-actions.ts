import type { FeedbackDocument } from '@/services/db/feedback';
import { createSlackMessagePayload } from './create-slack-message';
import { sendSlackMessage } from './send-slack-message';
import type { ChatPostMessageResponse } from '@slack/web-api';
import type { SlackAction } from './feedback-types';

async function handleSlackMessaging(feedback: FeedbackDocument): Promise<ChatPostMessageResponse[]> {
  const slackPayloads = await createSlackMessagePayload(feedback);
  const slackMessageArr = slackPayloads.map(async (slackPayload: SlackAction) => {
    return sendSlackMessage(slackPayload);
  });
  const slackResponses = await Promise.all(slackMessageArr);
  return slackResponses;
}

export async function feedback_actions(feedback: FeedbackDocument): Promise<void> {
  try {
    await handleSlackMessaging(feedback);
  } catch (err) {
    console.error(`Failed to send Slack notification for feedback ${feedback._id}`, err);
    throw new Error('feedback_actions: Slack notification failed — see logged error above');
  }
}
