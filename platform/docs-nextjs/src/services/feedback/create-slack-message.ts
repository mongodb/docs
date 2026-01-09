import type { Collection } from 'mongodb';
import P from 'leo-profanity';
import type { SnootyEnv, DocsetDocument } from '@/types/data';
import { getDocsetsCollection } from '@/services/db/docsets';
import {
  getProjectsCollection,
  getTeamsCollection,
  getSlackChannelsCollection,
  type ProjectDocument,
  type TeamDocument,
  type SlackChannelDocument,
} from '@/services/db/docs-metadata';
import { getFeedbackResponsesCollection, type FeedbackDocument } from '@/services/db/feedback';
import {
  SERVER_CHANNEL_ID,
  DOP_CHANNEL_IDS,
  LOCALIZED_CHANNEL_IDS,
  starRating,
  type SlackBlock,
  type SlackAction,
} from './feedback-types';
import type { S3ScreenshotAttachment } from './handle-screenshot-feedback';
import { createJiraTicketUrl } from './jira-builder';

export async function createSlackMessagePayload(feedback: FeedbackDocument): Promise<SlackAction[]> {
  const docs_projects = await getProjectsCollection();
  const docs_teams = await getTeamsCollection();
  const slack_channels = await getSlackChannelsCollection();
  // Pass in "production" as the env to get the production feedback responses collection
  const prod_responses_collection = await getFeedbackResponsesCollection('production');
  const docsets = await getDocsetsCollection();

  const docs_property = feedback.page.docs_property;

  const project = await docs_projects.findOne({ name: docs_property });
  if (!project) {
    console.error('feedback', JSON.stringify(feedback));
    throw new Error(
      `No project configuration exists for ${docs_property}. Add one to the docs_metadata.projects collection.`,
    );
  }

  const channels = await getSlackChannelIds({
    docs_teams,
    slack_channels,
    project,
    snootyEnv: feedback.snootyEnv,
    pageUrl: feedback.page.url,
  });

  const pageMetrics = await getPageMetrics(feedback, prod_responses_collection);
  const message = await createSlackMessage(feedback, project, pageMetrics, docsets);

  const actions = channels
    .filter((channel: string) => {
      // Don't post feedback without comments in #docs-server-feedback
      return (channel === SERVER_CHANNEL_ID && feedback.comment) || channel !== SERVER_CHANNEL_ID;
    })
    .map((channel: string) => {
      const slackPayload: SlackAction = {
        type: 'slack',
        feedback_id: feedback._id,
        channel,
        message,
      };
      return slackPayload;
    });

  return actions;
}

// Checks for a locale code in the beginning of the page URL
function checkForLocale(pageUrl: string | null) {
  if (!pageUrl) {
    return false;
  }

  // Allowlist based on consistent-nav's expected locales: https://github.com/10gen/consistent-nav/blob/a7e6345ef8ac9d7f14fa1ac640cc46ecb9736011/src/types.ts#L25
  // Exclude "en-us" since English feedback should be directed as needed
  const allowedLocales = ['pt-br', 'es', 'ko-kr', 'ja-jp', 'it-it', 'de-de', 'fr-fr', 'zh-cn'];
  try {
    const { pathname } = new URL(pageUrl);
    // As long as the URL is valid, pathname should always start with "/", so we only want the locale code that comes immediately after the first "/"
    const potentialLocale = pathname.split('/', 2)[1];
    return allowedLocales.includes(potentialLocale);
  } catch (err) {
    console.error('Error trying to parse locale', err);
  }

  return false;
}

// retrieve github link associated with docs page where feedback was given
async function getGithubLink(
  feedback: FeedbackDocument,
  project: ProjectDocument,
  docsets: Collection<DocsetDocument>,
) {
  const { slug, url } = feedback.page;
  const { snootyEnv } = feedback;
  const { organization, repo, monorepoPath } = project.github;
  const docset = await docsets.findOne({ project: project.name });
  if (!docset) {
    throw new Error(`No docset found for project ${project.name} in docsets collection`);
  }
  const prefix = docset.prefix[snootyEnv];
  const pathSuffix = url?.split(prefix)[1]?.replace(/^\//, '')?.replace(/\/$/, '');
  const strippedSlug = slug.replace(/^\//, '').replace(/\/$/, '');

  let version: string | undefined;
  const strippedSlugIdx = pathSuffix?.indexOf(strippedSlug);
  if (strippedSlugIdx && strippedSlugIdx > 0) {
    version = pathSuffix?.substring(0, strippedSlugIdx);
  }

  let githubUrl = 'https://github.com/';
  if (monorepoPath) {
    githubUrl += `10gen/docs-mongodb-internal/tree/main/content/${monorepoPath}/${version ? `${version}` : ''}source/${
      slug === '/' ? 'index' : slug
    }.txt`;
  } else {
    githubUrl += `${organization}/${repo}/tree/master/source/${slug === '/' ? 'index' : slug}.txt`;
  }

  return githubUrl;
}

// calculate page metrics for feedback page
async function getPageMetrics(feedback: FeedbackDocument, prod_responses_collection: Collection<FeedbackDocument>) {
  const { page } = feedback;
  const { slug, docs_property } = page;
  const metrics = await prod_responses_collection
    .aggregate([
      {
        $match: {
          'page.docs_property': docs_property,
          'page.slug': slug,
          rating: { $gte: 0 },
        },
      },
      {
        $group: {
          _id: '$page.docs_property',
          totalRatings: { $count: {} },
          averageRating: { $avg: '$rating' },
        },
      },
    ])
    .toArray();
  const result = metrics[0];
  const totalRatings = result?.totalRatings || 0;
  const averageRating = result?.averageRating || 'N/A';
  return { totalRatings, averageRating };
}

// handles channel routing logic (which channels get notified based on feedback for specific docs properties)
async function getSlackChannelIds({
  docs_teams,
  slack_channels,
  project,
  snootyEnv,
  pageUrl,
}: {
  docs_teams: Collection<TeamDocument>;
  slack_channels: Collection<SlackChannelDocument>;
  project: ProjectDocument;
  snootyEnv: SnootyEnv;
  pageUrl: string | null;
}) {
  const hasLocale = checkForLocale(pageUrl);

  if (snootyEnv === 'development') {
    const channelIds = [DOP_CHANNEL_IDS.development];
    if (hasLocale) channelIds.push(LOCALIZED_CHANNEL_IDS.development);
    return channelIds;
  } else if (snootyEnv === 'staging' || snootyEnv === 'dotcomstg') {
    const channelIds = [DOP_CHANNEL_IDS.staging];
    if (hasLocale) channelIds.push(LOCALIZED_CHANNEL_IDS.staging);
    return channelIds;
  }

  const team = await docs_teams.findOne({ name: project.owner });
  if (!team) {
    console.error('project', JSON.stringify(project));
    throw new Error(
      `No team configuration exists for ${project.owner}. Add one to the docs_metadata.teams collection.`,
    );
  }

  const specialCases = ['spark-connector'];
  const removeChannelId = '#docs-feedback';

  // Check if project falls under a special case
  const projectName = project.name;
  if (projectName in specialCases) {
    // Grab the index of the channel to be removed
    const index = team.slack.channels.indexOf(removeChannelId);
    // If the channel to be removed exist in the team.slack.channnel
    // remove it
    if (index !== -1) {
      team.slack.channels.splice(index, 1);
    }
  }

  // in general, docs-feedback receives all feedback msgs, more specific channels receive notifications based on specific docs properties
  const channels = await slack_channels.find({ name: { $in: team.slack.channels } }).toArray();
  if (!channels) {
    console.error('team', JSON.stringify(team));
    throw new Error(
      `No Slack configuration exists for ${project.owner}. Add one to the docs_metadata.slack_channels collection.`,
    );
  }
  const channelIds = channels.map((c) => c.channel_id);
  const channelNames = channels.map((c) => c.name);

  if (hasLocale) {
    channelIds.push(LOCALIZED_CHANNEL_IDS.production);
    channelNames.push('docs-feedback-localized');
  }

  console.log(`channels which will be alerted based on feedback: ${channelNames}`);
  console.log(`corresponding channel ids: ${channelIds}`);
  console.log(channelIds);
  return channelIds;
}
interface PageMetrics {
  averageRating: string;
  totalRatings: number;
}

async function createSlackMessage(
  feedback: FeedbackDocument,
  project: ProjectDocument,
  pageMetrics: PageMetrics,
  docsets: Collection<DocsetDocument>,
) {
  const { page, rating, category, comment, submittedAt, user } = feedback;
  const { title, slug, url } = page;
  const { averageRating, totalRatings } = pageMetrics;

  const screenshotAttachment = feedback.attachments.filter((a) => a.type === 'screenshot')[0] as S3ScreenshotAttachment;
  const text = `(${category}) Feedback for ${title}`;
  // Primary Message
  const message: { text: string; blocks: SlackBlock[] } = {
    text,
    blocks: [],
  };
  const githubUrl = await getGithubLink(feedback, project, docsets);
  message.blocks.push({
    type: 'section',
    text: {
      type: 'mrkdwn',
      text: [
        `*${slackLink(title, url)}*`,
        `_${slackLink(`${page.docs_property}/${slug === '/' ? 'index' : slug}`, githubUrl)}_`,
        ` ${starRating[rating]}\n`,
        `Average rating: ${averageRating} (${totalRatings})`,
      ].join('\n'),
    },
    accessory: {
      type: 'overflow',
      action_id: 'feedback-message',
      options: [
        {
          text: {
            type: 'plain_text',
            text: 'Create a Jira Ticket',
            emoji: true,
          },
          value: `jira-create-issue__${feedback._id.toString()}`,
          url: createJiraTicketUrl({ feedback, project }),
        },
        {
          text: {
            type: 'plain_text',
            text: 'Hide this message',
            emoji: true,
          },
          value: `slack-hide-message__${feedback._id.toString()}`,
        },
      ],
    },
  });

  // add user comment
  if (comment) {
    const sanitized = P.clean(comment);
    message.blocks.push({
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: sanitized,
      },
    });
  }

  // add screenshot if it exists
  if (screenshotAttachment) {
    message.blocks.push({
      type: 'context',
      elements: [
        {
          type: 'mrkdwn',
          text: `*Screenshot:* ${slackLink('Download from S3', screenshotAttachment.url)}`,
        },
      ],
    });
  }

  // add user email if provided
  if (user.email) {
    message.blocks.push({
      type: 'context',
      elements: [
        {
          type: 'mrkdwn',
          text: `*User Email:* ${user.email}`,
        },
      ],
    });
  }

  // add date and time submitted
  message.blocks.push({
    type: 'context',
    elements: [
      {
        type: 'mrkdwn',
        text: `*Date:* ${submittedAt.toDateString()} *Time:* ${submittedAt.toTimeString()}`,
      },
    ],
  });

  // add how-to respond link
  message.blocks.push({
    type: 'context',
    elements: [
      {
        type: 'mrkdwn',
        text: `[How to respond to feedback](https://wiki.corp.mongodb.com/display/DE/How+to+Respond+to+User+Feedback)`,
      },
    ],
  });

  message.blocks.push({ type: 'divider' });
  return message;
}

// Create a slack hyperlink
function slackLink(text: string, url: string) {
  return `<${url}|${text}>`;
}
