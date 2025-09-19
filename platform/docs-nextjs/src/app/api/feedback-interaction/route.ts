import { BSON } from 'mongodb';
import { type NextRequest, NextResponse } from 'next/server';
import { withCORS } from '@/app/lib/with-cors';

export interface SlackAction {
  action_id: string;
  block_id?: string;
  type: string;
  value?: string;
  selected_option?: {
    value: string;
    text: { type: string; text: string };
  };
}

export interface SlackInteraction {
  type: 'block_actions';
  trigger_id: string;
  response_url: string;
  user: {
    id: string;
    username?: string;
    name?: string;
  };
  actions: SlackAction[];
  channel: { id: string; name?: string };
  message: {
    type: string;
    ts: string;
    text: string;
    user: string;
    blocks: unknown[];
  };
}

export async function OPTIONS() {
  return withCORS(new NextResponse(null, { status: 204 }));
}

// Interaction Payload: https://api.slack.com/reference/interaction-payloads/block-actions

export async function POST(request: NextRequest) {
  try {
    // Slack sends as application/x-www-form-urlencoded, not JSON
    const text = await request.text();

    // Parse URL-encoded string into key/value pairs
    const params = new URLSearchParams(text);
    const payload = params.get('payload');

    if (!payload) {
      return NextResponse.json({ error: 'Missing payload' }, { status: 400 });
    }

    // Interaction Payload: https://api.slack.com/reference/interaction-payloads/block-actions
    const interaction: SlackInteraction = JSON.parse(payload);
    const { actions } = interaction;
    await Promise.all(actions.map((action) => handleAction(interaction, action)));
    return withCORS(NextResponse.json({ success: true }));
  } catch (err) {
    console.error(err);
    return withCORS(NextResponse.json({ error: 'Internal Server Error' }, { status: 500 }));
  }
}

async function handleAction(interaction: SlackInteraction, action: SlackAction) {
  const { user, response_url } = interaction;
  const { selected_option } = action;
  const value = selected_option?.value ?? '';

  const [action_name, feedback_id_string] = value.split('__');
  const feedback_id = new BSON.ObjectId(feedback_id_string);

  switch (action_name) {
    case 'jira-create-issue': {
      // We provided a url to the jira ticket in the overflow button, so no need to do anything here.
      break;
    }
    case 'slack-hide-message': {
      // Send a message with response_url that says who deleted the message
      // This will overwrite the message in Slack, which is what we want
      try {
        const slackDeleteResult = await fetch(response_url, {
          method: 'POST',
          headers: {
            'Content-type': 'application/json',
          },
          body: JSON.stringify({
            blocks: [
              {
                type: 'section',
                text: {
                  type: 'mrkdwn',
                  text: `:comment_deleted: Feedback was hidden by <@${user.id}> \`_id: "${feedback_id}"\``,
                },
              },
              { type: 'divider' },
            ],
          }),
        });
        if (!slackDeleteResult.ok) {
          throw new Error(`Failed to delete slack message: ${slackDeleteResult.statusText}`);
        }
        break;
      } catch (err) {
        throw new Error(`Failed to delete slack message: ${err}`);
      }
    }
    default: {
      throw new Error(`There is no handler for action: ${action_name}.`);
    }
  }
}
