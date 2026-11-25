#!/usr/bin/env node
// Vercel Ignored Build Step for docs-site (`ignoreCommand` in vercel.json).
// Exit 0 skips this project's build; any other exit, including a crash, builds.
//
// A build is skipped only when every changed file belongs to a different
// docset: a content/<dir>/ that has a snooty.toml, is not this project's dir,
// and is not symlinked into by any docset. Anything else (platform code,
// snooty.toml files, shared content such as content/shared or
// content/table-of-contents, or any file outside content/) builds every app.
import { execFileSync } from 'node:child_process';
import path from 'node:path';

const git = (...args) =>
  execFileSync('git', args, { encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'], maxBuffer: 256 * 1024 * 1024 }).trim();

const build = (reason) => {
  console.log(`[ignore-build] Building: ${reason}`);
  process.exit(1);
};

const skip = (reason) => {
  console.log(`[ignore-build] Skipping: ${reason}`);
  process.exit(0);
};

// Prefers the last deployment of this project on this branch, so skipped
// commits accumulate into the next diff. A branch's first preview falls back
// to its merge base with main. Vercel clones shallowly, so commits may need
// fetching; the fetch of main is bounded because the repo is large.
const resolveBase = () => {
  const previous = process.env.VERCEL_GIT_PREVIOUS_SHA;
  if (previous) {
    try {
      git('cat-file', '-e', `${previous}^{commit}`);
    } catch {
      git('fetch', '--no-tags', '--depth=1', 'origin', previous);
    }
    return previous;
  }
  if (process.env.VERCEL_ENV === 'preview') {
    git('fetch', '--no-tags', '--depth=50', 'origin', 'main');
    return git('merge-base', 'FETCH_HEAD', 'HEAD');
  }
  return undefined;
};

/** Reads blob contents for the given object IDs in one `git cat-file --batch` call. */
const readBlobs = (shas) => {
  const blobs = new Map();
  if (shas.length === 0) return blobs;
  const output = execFileSync('git', ['cat-file', '--batch'], {
    input: `${shas.join('\n')}\n`,
    stdio: ['pipe', 'pipe', 'pipe'],
    maxBuffer: 256 * 1024 * 1024,
  });
  // Each object is `<sha> <type> <size>\n<size bytes of content>\n`; sizes are
  // in bytes, so this walks the Buffer rather than a decoded string.
  let offset = 0;
  while (offset < output.length) {
    const headerEnd = output.indexOf(0x0a, offset);
    const [sha, type, size] = output.toString('utf8', offset, headerEnd).split(' ');
    if (type !== 'blob') throw new Error(`git cat-file --batch: ${sha} is ${type}`);
    const contentStart = headerEnd + 1;
    blobs.set(sha, output.toString('utf8', contentStart, contentStart + Number(size)));
    offset = contentStart + Number(size) + 1;
  }
  return blobs;
};

/** Top-level content dirs that are docsets, and those symlinked into by any file. */
const classifyContentDirs = () => {
  const docsets = new Set();
  const symlinks = [];
  // Vercel runs this from the project's root directory, not the repo root, so
  // the pathspec and output must be root-anchored to match `git diff`.
  for (const line of git('ls-files', '-s', '--full-name', '--', ':/content').split('\n')) {
    const [meta, file] = line.split('\t');
    if (!file) continue;
    const [mode, sha] = meta.split(' ');
    if (path.posix.basename(file) === 'snooty.toml') docsets.add(file.split('/')[1]);
    if (mode === '120000') symlinks.push({ file, sha });
  }

  const targets = readBlobs([...new Set(symlinks.map(({ sha }) => sha))]);
  const linkTargets = new Set();
  for (const { file, sha } of symlinks) {
    const target = path.posix.normalize(path.posix.join(path.posix.dirname(file), targets.get(sha)));
    const [top, targetDir] = target.split('/');
    if (top === 'content' && targetDir) linkTargets.add(targetDir);
  }
  return { docsets, linkTargets };
};

const project = process.env.DOCS_PROJECT;
if (!project) build('DOCS_PROJECT is unset');

let base;
try {
  base = resolveBase();
} catch (error) {
  build(`could not resolve a base commit (${error.message.split('\n')[0]})`);
}
if (!base) build('no previous deployment to compare against');

let changedFiles;
let contentDirs;
try {
  changedFiles = git('diff', '--name-only', '--no-renames', base, 'HEAD').split('\n').filter(Boolean);
  contentDirs = classifyContentDirs();
} catch (error) {
  build(`could not read changed files (${error.message.split('\n')[0]})`);
}
if (changedFiles.length === 0) build(`no changes since ${base}`);
if (contentDirs.docsets.size === 0) build('found no docsets under content/; cannot tell which apps a change affects');

const dirSummary = `${contentDirs.docsets.size} docsets, ${contentDirs.linkTargets.size} shared dirs`;

const affectsProject = (file) => {
  const [top, dir, ...rest] = file.split('/');
  if (top !== 'content' || rest.length === 0) return true;
  if (path.posix.basename(file) === 'snooty.toml') return true;
  return dir === project || !contentDirs.docsets.has(dir) || contentDirs.linkTargets.has(dir);
};

const relevant = changedFiles.filter(affectsProject);
if (relevant.length > 0) {
  build(
    `${relevant.length} of ${changedFiles.length} changed file(s) since ${base} affect ${project} (${dirSummary}), e.g. ${relevant.slice(0, 5).join(', ')}`,
  );
}
skip(`none of the ${changedFiles.length} changed file(s) since ${base} affect ${project} (${dirSummary})`);
