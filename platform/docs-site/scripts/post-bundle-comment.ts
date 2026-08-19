/**
 * Posts the bundle size report as a PR comment (UXE-697).
 *
 * Updates the marked comment in place so a long-lived PR does not accumulate a
 * wall of stale reports. Uses global fetch to avoid pulling @octokit/rest in for
 * one API call; bundle-report.ts also writes the job summary, so a failure here
 * never loses the measurement.
 *
 * Usage: tsx scripts/post-bundle-comment.ts [--markdown <path>]
 */

import { existsSync, readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import { COMMENT_MARKER } from './lib/bundle-stats';

const SITE_ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const DEFAULT_MARKDOWN = join(SITE_ROOT, '.bundle-stats', 'report.md');

const API = 'https://api.github.com';

interface Comment {
  id: number;
  body?: string;
}

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) throw new Error(`Missing ${name}. Expected to run inside GitHub Actions.`);
  return value;
}

function parseMarkdownPath(argv: string[]): string {
  const idx = argv.indexOf('--markdown');
  if (idx === -1) return DEFAULT_MARKDOWN;
  const value = argv[idx + 1];
  if (!value) throw new Error('--markdown requires a value');
  return value;
}

async function githubRequest<T>(token: string, method: string, path: string, body?: unknown): Promise<T> {
  const response = await fetch(`${API}${path}`, {
    method,
    headers: {
      accept: 'application/vnd.github+json',
      authorization: `Bearer ${token}`,
      'x-github-api-version': '2022-11-28',
      ...(body === undefined ? {} : { 'content-type': 'application/json' }),
    },
    body: body === undefined ? undefined : JSON.stringify(body),
  });

  if (!response.ok) {
    throw new Error(`GitHub ${method} ${path} failed: ${response.status} ${await response.text()}`);
  }
  return (await response.json()) as T;
}

async function findExistingComment(token: string, repoPath: string, prNumber: string): Promise<Comment | null> {
  // An active PR can exceed one page; missing the marker would start appending
  // duplicates instead of updating.
  for (let page = 1; page <= 10; page += 1) {
    const comments = await githubRequest<Comment[]>(
      token,
      'GET',
      `${repoPath}/issues/${prNumber}/comments?per_page=100&page=${page}`,
    );
    const match = comments.find((comment) => comment.body?.includes(COMMENT_MARKER));
    if (match) return match;
    if (comments.length < 100) return null;
  }
  return null;
}

async function main(): Promise<void> {
  const markdownPath = parseMarkdownPath(process.argv.slice(2));
  if (!existsSync(markdownPath)) {
    throw new Error(`No report at ${markdownPath}. Run \`pnpm run bundle:report\` first.`);
  }
  const body = readFileSync(markdownPath, 'utf8');

  const token = requireEnv('GITHUB_TOKEN');
  const prNumber = requireEnv('PR_NUMBER');
  const repoPath = `/repos/${requireEnv('REPO_OWNER')}/${requireEnv('REPO_NAME')}`;

  const existing = await findExistingComment(token, repoPath, prNumber);

  if (existing) {
    await githubRequest(token, 'PATCH', `${repoPath}/issues/comments/${existing.id}`, { body });
    console.log(`Updated existing bundle size comment (${existing.id}).`);
  } else {
    await githubRequest(token, 'POST', `${repoPath}/issues/${prNumber}/comments`, { body });
    console.log('Posted new bundle size comment.');
  }
}

main().catch((error) => {
  console.error(`post-bundle-comment failed: ${error instanceof Error ? error.message : error}`);
  process.exit(1);
});
