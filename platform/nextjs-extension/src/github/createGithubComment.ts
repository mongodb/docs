import { Octokit } from '@octokit/rest';
import type { StaticEnvVars } from '../util/assertDbEnvVars';
import type { ConfigEnvironmentVariables } from '../util/extension';

interface PostGitCommentParams {
  configEnvironment: ConfigEnvironmentVariables;
  status: BuildStatus;
  errorMessage?: string;
  dbEnvVars: StaticEnvVars;
}
type BuildStatus = 'success' | 'building' | 'error';

const BuildStatusEmoji: Record<BuildStatus, string> = {
  success: '✅',
  building: '🔄',
  error: '❌',
};
const BuildStatusText: Record<BuildStatus, string> = {
  success: 'ready',
  building: 'processing',
  error: 'failed',
};

type CreateGitCommentBodyParams = Pick<
  ConfigEnvironmentVariables,
  'SITE_NAME' | 'DOCSET_ENTRY' | 'DEPLOY_PRIME_URL' | 'DEPLOY_ID'
> & {
  owner: string;
  repo: string;
  errorMessage?: string;
  status: BuildStatus;
  latestCommit: string;
};

const createGitCommentBody = ({
  status,
  SITE_NAME,
  DOCSET_ENTRY,
  DEPLOY_PRIME_URL,
  DEPLOY_ID,
  latestCommit,
  errorMessage,
  owner,
  repo,
}: CreateGitCommentBodyParams): string => {
  const deployPreviewUrl = `${DEPLOY_PRIME_URL}/${DOCSET_ENTRY?.prefix}`;

  const gitCommitUrl = `https://github.com/${owner}/${repo}/commit/${latestCommit}`;

  const deployPreviewUrlText = deployPreviewUrl
    ? `| 😎 Deploy Preview | ${deployPreviewUrl} |`
    : '| 👨‍🍳 Deploy Preview | Deploy preview is being prepared... |';

  const buildLogs = DEPLOY_ID
    ? `[View Logs](https://app.netlify.com/projects/${SITE_NAME}/deploys/${DEPLOY_ID})`
    : 'Deploy Logs Not Found';

  const buildLogsText = `| 🔍 Build Logs | ${buildLogs} |`;

  const errorMessageText = errorMessage
    ? `\n### Error Details\n\`\`\`\n${errorMessage}\n\`\`\``
    : '';

  const { statusEmoji, statusText } = getGitCommentStatus(status);

  const commentBody = `\n ## ${statusEmoji} Deploy Preview for ${SITE_NAME} ${statusText} \n
| Item | Details |
|------|---------|
| 🔨 Latest Commit | [${latestCommit}](${gitCommitUrl}) |
${deployPreviewUrlText}
${buildLogsText}
${errorMessageText}
`;
  return commentBody;
};

export const getGitCommentStatus = (
  status: BuildStatus,
): {
  statusEmoji: (typeof BuildStatusEmoji)[BuildStatus];
  statusText: (typeof BuildStatusText)[BuildStatus];
} => {
  return {
    statusEmoji: BuildStatusEmoji[status],
    statusText: BuildStatusText[status],
  };
};

export async function postGitComment({
  configEnvironment: {
    DOCSET_ENTRY,
    SITE_NAME,
    DEPLOY_PRIME_URL,
    DEPLOY_ID,
    REVIEW_ID,
    COMMIT_REF,
    CACHED_COMMIT_REF,
    REPOSITORY_URL,
    BRANCH_NAME,
  },
  status,
  errorMessage,
  dbEnvVars,
}: PostGitCommentParams): Promise<void> {
  let prNumber: string | undefined;
  // "temp-pr" branches are created by GitHub Actions for forked PRs with ToC changes
  // (see: https://github.com/10gen/docs-mongodb-internal/blob/e45ff0f87f791f74b4b830f580ba1fb8e79f2bbe/.github/workflows/trigger-branch-build.yml#L30)
  // This allows Netlify Build Hooks to access the ToC changes from within the monorepo
  const tempBranchPrefix = 'temp-pr';
  // If REVIEW_ID is not undefined assign it to prNumber
  if (REVIEW_ID) {
    prNumber = REVIEW_ID;
  } else {
    // Handle TOC changes from forked repos: REVIEW_ID is undefined for Netlify Build Hooks,
    // so we check if BRANCH_NAME has 'temp-pr' prefix to identify forked PRs
    if (BRANCH_NAME?.startsWith(tempBranchPrefix)) {
      prNumber = BRANCH_NAME.split('-', 3).pop(); // i.e. "14007"
    }
  }

  if (!REPOSITORY_URL) {
    console.error('No repository url found, cannot post git comment');
    return;
  }
  const [owner, repo] = REPOSITORY_URL.split('/').slice(-2);

  if (!prNumber) {
    console.log('No PR number found, skipping comment creation');
    return;
  }

  console.log(`Creating PR comment for PR: ${prNumber}, ${owner}, ${repo}`);

  const commentBody = createGitCommentBody({
    status,
    SITE_NAME,
    DOCSET_ENTRY,
    DEPLOY_ID,
    DEPLOY_PRIME_URL,
    latestCommit: COMMIT_REF ?? (CACHED_COMMIT_REF as string),
    errorMessage,
    owner,
    repo,
  });

  try {
    const octokit = new Octokit({
      auth: dbEnvVars.GITHUB_BOT_PWD,
    });

    // First, get all comments on the PR
    const { data: comments } = await octokit.issues.listComments({
      owner,
      repo,
      issue_number: Number.parseInt(prNumber),
    });

    // Look for an existing comment from our bot for this site
    const existingComment = comments.find(
      (comment) =>
        comment.user?.login === dbEnvVars.GITHUB_BOT_USERNAME &&
        comment.body?.includes(`Deploy Preview for ${SITE_NAME}`),
    );
    if (existingComment) {
      console.log(
        `Found existing comment (ID: ${existingComment.id}) for site ${SITE_NAME}, updating...`,
      );
      // Update existing comment
      await octokit.issues.updateComment({
        owner,
        repo,
        comment_id: existingComment.id,
        body: commentBody,
      });
      console.log(
        `Successfully updated deployment comment with status: ${status}`,
      );
    } else {
      console.log(
        `No existing comment found for site ${SITE_NAME}, creating new comment...`,
      );
      // Create new comment
      await octokit.issues.createComment({
        owner,
        repo,
        issue_number: Number.parseInt(prNumber),
        body: commentBody,
      });
      console.log(
        `Successfully created new deployment comment with status: ${status}`,
      );
    }
  } catch (error) {
    console.error('Failed to create/update deployment comment:', error);
  }
}
