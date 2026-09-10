import { BSON } from 'mongodb';
import { type NextRequest, NextResponse } from 'next/server';
import { withCORS } from '@/app/lib/with-cors';
import { checkRateLimit, getClientIp } from '@/services/rate-limit/rate-limit';
import { isAllowedSlackResponseUrl, verifySlackRequest } from '@/services/slack/verify-slack-request';

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

const SLACK_FETCH_TIMEOUT_MS = 5000;

export async function OPTIONS() {
  return withCORS(new NextResponse(null, { status: 204 }));
}

export async function POST(request: NextRequest) {
  // Rate limit by client IP on this public, unauthenticated endpoint. Slack's
  // legitimate interaction volume stays well under the limit.
  const rateLimit = await checkRateLimit({ key: `feedback-interaction:${getClientIp(request)}` });
  if (!rateLimit.allowed) {
    const response = NextResponse.json({ error: 'Too many requests. Please try again later.' }, { status: 429 });
    response.headers.set('Retry-After', String(rateLimit.retryAfterSec));
    return withCORS(response);
  }

  try {
    const text = await request.text();

    // Authenticate before reading anything out of the body. The payload is
    // untrusted attacker input until the signature over these exact bytes
    // verifies, so this must precede parsing, not follow it.
    const verification = verifySlackRequest({ rawBody: text, headers: request.headers });
    if (!verification.ok) {
      console.error(`Rejected feedback interaction: ${verification.reason}`);
      // Deliberately generic: the caller learns only that it was rejected, not
      // which check failed or whether the app is configured.
      return withCORS(NextResponse.json({ error: 'Unauthorized' }, { status: 401 }));
    }

    const params = new URLSearchParams(text);
    const payload = params.get('payload');

    if (!payload) {
      return NextResponse.json({ error: 'Missing payload' }, { status: 400 });
    }

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
      break;
    }
    case 'slack-hide-message': {
      if (!isAllowedSlackResponseUrl(response_url)) {
        throw new Error('Refusing to POST to a response_url outside hooks.slack.com');
      }
      try {
        const slackDeleteResult = await fetch(response_url, {
          method: 'POST',
          // Bound the outbound request so an unresponsive target can't hold
          // this serverless invocation open indefinitely.
          signal: AbortSignal.timeout(SLACK_FETCH_TIMEOUT_MS),
          // Do not follow redirects: a 30x from an allowed host would otherwise
          // send this request to an arbitrary origin, bypassing the allowlist.
          redirect: 'error',
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
