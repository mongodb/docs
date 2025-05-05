/* eslint-disable no-console */
import { Octokit } from '@octokit/rest';
import { getDevAccessToken } from '../../private/getDevAccessToken';
import { getSandboxPath, resetSandbox } from '../../sandbox';
import { runBackportViaCli } from './runBackportViaCli';

jest.setTimeout(25_000);
const accessToken = getDevAccessToken();
const octokit = new Octokit({ auth: accessToken });

describe('Programatically add new commits', () => {
  it('should backport commits added after the first run', async () => {
    const sandboxPath = getSandboxPath({ filename: __filename });
    await resetSandbox(sandboxPath);

    // first run: backport should clone the repo
    await runBackportViaCli(
      [
        '--repo=backport-org/repo-with-programatically-added-commits',
        '--pr=1',
        '--branch=7.x',
        `--accessToken=${accessToken}`,
        `--dir=${sandboxPath}`,
        '--dry-run',
      ],
      { showOra: true },
    );

    const formattedDate = new Date().toLocaleString('da-DK');
    const commitMessage = `Automatically added at ${formattedDate}`;
    const sha = await createAndCommitFile({
      commitMessage,
      files: [
        {
          path: `files/${formattedDate}.md`,
          sha: await createBlob(
            `# Hello\nSome content added @ ${formattedDate}`,
          ),
        },
      ],
    });

    // second run: backport should find and backport the new commit
    const { output } = await runBackportViaCli(
      [
        '--repo=backport-org/repo-with-programatically-added-commits',
        `--sha=${sha}`,
        '--branch=7.x',
        `--accessToken=${accessToken}`,
        `--dir=${sandboxPath}`,
        '--dry-run',
      ],
      { showOra: true },
    );

    expect(output).toContain(commitMessage);
    expect(output).toContain('View pull request: this-is-a-dry-run');
  });
});

type BlobFile = { path: string; sha: string };

async function createAndCommitFile({
  commitMessage,
  files,
}: {
  commitMessage: string;
  files: BlobFile[];
}) {
  const latestCommitSha = await getLatestCommitSha();
  const treeSha = await createTree(files);
  const commitSha = await createCommit({
    latestCommitSha,
    commitMessage,
    treeSha,
  });
  await updateRef(commitSha);
  return commitSha;
}

async function updateRef(sha: string) {
  try {
    const res = await octokit.rest.git.updateRef({
      owner: 'backport-org',
      repo: 'repo-with-programatically-added-commits',
      ref: 'heads/main',
      sha,
    });
    return res.data;
  } catch (e) {
    console.log(e);
  }
}

async function createCommit({
  latestCommitSha,
  commitMessage,
  treeSha,
}: {
  latestCommitSha: string;
  commitMessage: string;
  treeSha: string;
}) {
  const res = await octokit.rest.git.createCommit({
    owner: 'backport-org',
    repo: 'repo-with-programatically-added-commits',
    message: commitMessage,
    parents: [latestCommitSha],
    tree: treeSha,
  });

  return res.data.sha;
}

async function createTree(files: BlobFile[]) {
  const res = await octokit.git.createTree({
    owner: 'backport-org',
    repo: 'repo-with-programatically-added-commits',
    tree: files.map((f) => {
      return {
        path: f.path,
        sha: f.sha,
        mode: '100644',
        type: 'blob',
      };
    }),
  });

  return res.data.sha;
}

async function createBlob(content: string) {
  const res = await octokit.rest.git.createBlob({
    owner: 'backport-org',
    repo: 'repo-with-programatically-added-commits',
    content: content,
    encoding: 'utf-8',
  });

  return res.data.sha;
}

async function getLatestCommitSha() {
  const res = await octokit.repos.getBranch({
    owner: 'backport-org',
    repo: 'repo-with-programatically-added-commits',
    branch: 'main',
  });

  return res.data.commit.sha;
}
