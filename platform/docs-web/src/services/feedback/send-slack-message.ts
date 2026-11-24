import type { SlackAction } from './feedback-types';
import type { ChatPostMessageResponse } from '@slack/web-api';
import { WebClient } from '@slack/web-api';
import envConfig from '@/utils/env-config';

export async function sendSlackMessage(action: SlackAction): Promise<ChatPostMessageResponse> {
  const { channel, message } = action;

  const slack_token = envConfig.SLACK_QUOKKA_OAUTH_ACCESS_TOKEN;

  if (!slack_token || !slack_token.startsWith('xoxb-')) {
    throw new Error('No Slack token or invalid slack tokenprovided');
  }

  const client = new WebClient(slack_token);

  console.log(`Sending slack message to channel: ${channel}`);

  // Send slack message to feedback channels
  try {
    const result = await client.chat.postMessage({
      channel,
      text: message.text,
      blocks: message.blocks,
    });
    console.log('Posted message to slack channels', JSON.stringify(result));
    return result;
  } catch (err) {
    console.error(`Unable to send slack message to feedback channels: ${channel}`);
    console.error('Error details:', JSON.stringify(err, null, 2));
    throw err;
  }
}
