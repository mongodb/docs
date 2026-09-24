import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { buildUploadManifest, rootLlmsUploadEntry } from '../src/uploadManifest';

async function writeFile(filePath: string, content: string): Promise<void> {
  await fs.mkdir(path.dirname(filePath), { recursive: true });
  await fs.writeFile(filePath, content, 'utf-8');
}

describe('buildUploadManifest', () => {
  let monorepoPath: string;
  let outputDir: string;

  beforeEach(async () => {
    monorepoPath = await fs.mkdtemp(path.join(os.tmpdir(), 'generate-llms-upload-fixture-'));
    outputDir = path.join(monorepoPath, 'llms-output');

    await writeFile(
      path.join(monorepoPath, 'platform', 'docs-nextjs', 'src', 'generated', 'dir-name-to-prefix.json'),
      JSON.stringify({
        'go-driver': 'docs/drivers/go',
        manual: 'docs',
        landing: 'docs',
      }),
    );

    // Root llms.txt: hand-maintained, always uploaded to "docs/llms.txt". Links
    // every project generated below so unrelated tests don't also trip the
    // "missing from root llms.txt" warning tested further down.
    await writeFile(
      path.join(outputDir, 'llms.txt'),
      '# MongoDB Developer Documentation\n\n' +
        '* [Go Driver](https://www.mongodb.com/docs/drivers/go/current/llms.txt)\n' +
        '* [Manual Part 1](https://www.mongodb.com/docs/manual/manual-1-llms.txt)\n' +
        '* [Manual Part 2](https://www.mongodb.com/docs/manual/manual-2-llms.txt)\n',
    );

    // Single-file, versioned project.
    await writeFile(path.join(monorepoPath, 'content', 'go-driver', 'current', 'source', 'index.txt'), 'Go\n==\n');
    await writeFile(path.join(outputDir, 'go-driver', 'llms.txt'), '# Go Driver\n');

    // Split project whose version directory is itself named "manual" (not "current").
    await writeFile(path.join(monorepoPath, 'content', 'manual', 'manual', 'source', 'index.txt'), 'Manual\n======\n');
    await writeFile(path.join(outputDir, 'manual', 'manual-1-llms.txt'), '# Manual Part 1\n');
    await writeFile(path.join(outputDir, 'manual', 'manual-2-llms.txt'), '# Manual Part 2\n');

    // The landing project's own generated file would collide with the
    // root llms.txt's key ("docs/llms.txt") and must be excluded.
    await writeFile(path.join(monorepoPath, 'content', 'landing', 'source', 'index.txt'), 'Landing\n=======\n');
    await writeFile(path.join(outputDir, 'landing', 'llms.txt'), '# MongoDB Documentation\n');
  });

  afterEach(async () => {
    await fs.rm(monorepoPath, { recursive: true, force: true });
  });

  it('limits entries to one project and omits the root llms.txt when publishing a single project', async () => {
    const entries = await buildUploadManifest(monorepoPath, outputDir, {
      forProject: 'manual',
    });

    expect(entries.map((entry) => entry.key)).toEqual([
      'docs/manual/manual-1-llms.txt',
      'docs/manual/manual-2-llms.txt',
    ]);
  });

  it('reads the root llms.txt from rootLlmsPath when generating into a throwaway directory', async () => {
    const buildOutputDir = path.join(monorepoPath, 'llms-build-output');
    await writeFile(path.join(buildOutputDir, 'go-driver', 'llms.txt'), '# Go Driver\n');
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});

    const entries = await buildUploadManifest(monorepoPath, buildOutputDir, {
      forProject: 'go-driver',
      rootLlmsPath: path.join(outputDir, 'llms.txt'),
    });

    expect(entries.map((entry) => entry.key)).toEqual(['docs/drivers/go/current/llms.txt']);
    expect(warn).not.toHaveBeenCalled();
    warn.mockRestore();
  });

  it('never includes the root llms.txt in the per-project manifest', async () => {
    const entries = await buildUploadManifest(monorepoPath, outputDir);
    expect(entries.some((e) => e.key === 'docs/llms.txt')).toBe(false);
  });

  it('returns the root llms.txt only when a caller asks for it explicitly', async () => {
    await expect(rootLlmsUploadEntry(outputDir)).resolves.toEqual({
      localPath: path.join(outputDir, 'llms.txt'),
      key: 'docs/llms.txt',
    });
  });

  it('excludes the landing project even though it is mapped and has generated output', async () => {
    const entries = await buildUploadManifest(monorepoPath, outputDir);
    expect(entries.filter((e) => e.localPath.includes(path.join('landing', 'llms.txt')))).toHaveLength(0);
    // Nothing resolves to the root llms.txt's reserved key: landing's file
    // was excluded, not merged over the hand-maintained file.
    expect(entries.filter((e) => e.key === 'docs/llms.txt')).toHaveLength(0);
  });

  it('builds a key from the url slug and version for a single-file versioned project', async () => {
    const entries = await buildUploadManifest(monorepoPath, outputDir);
    const goDriver = entries.find((e) => e.key.includes('go-driver') || e.localPath.includes('go-driver'));
    expect(goDriver).toEqual({
      localPath: path.join(outputDir, 'go-driver', 'llms.txt'),
      key: 'docs/drivers/go/current/llms.txt',
    });
  });

  it('builds one key per part for a split project, using the version dir name as the URL segment', async () => {
    const entries = await buildUploadManifest(monorepoPath, outputDir);
    const manualKeys = entries.filter((e) => e.localPath.includes(`${path.sep}manual${path.sep}`)).map((e) => e.key);
    // "manual" project maps to urlSlug "" and version "manual", so the version dir name is the sole path segment.
    expect(manualKeys.sort()).toEqual(['docs/manual/manual-1-llms.txt', 'docs/manual/manual-2-llms.txt']);
  });

  it('skips a generated project directory with no entry in dir-name-to-prefix.json, with a warning', async () => {
    await writeFile(path.join(monorepoPath, 'content', 'unmapped', 'source', 'index.txt'), 'Unmapped\n========\n');
    await writeFile(path.join(outputDir, 'unmapped', 'llms.txt'), '# Unmapped\n');

    const entries = await buildUploadManifest(monorepoPath, outputDir);
    expect(entries.some((e) => e.localPath.includes('unmapped'))).toBe(false);
  });

  it('skips a generated project directory with no resolvable current source directory', async () => {
    // Mapped in dir-name-to-prefix.json, has generated output, but no content/<project>/source at all.
    await writeFile(
      path.join(monorepoPath, 'platform', 'docs-nextjs', 'src', 'generated', 'dir-name-to-prefix.json'),
      JSON.stringify({
        'go-driver': 'docs/drivers/go',
        manual: 'docs',
        landing: 'docs',
        orphaned: 'docs/orphaned',
      }),
    );
    await writeFile(path.join(outputDir, 'orphaned', 'llms.txt'), '# Orphaned\n');

    const entries = await buildUploadManifest(monorepoPath, outputDir);
    expect(entries.some((e) => e.localPath.includes('orphaned'))).toBe(false);
  });

  it('throws when a caller asks for a root llms.txt that does not exist', async () => {
    await fs.rm(path.join(outputDir, 'llms.txt'));
    await expect(rootLlmsUploadEntry(outputDir)).rejects.toThrow(/Root llms.txt not found/);
  });

  it('warns but still builds a manifest when the root llms.txt is absent', async () => {
    await fs.rm(path.join(outputDir, 'llms.txt'));
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});

    const entries = await buildUploadManifest(monorepoPath, outputDir, { forProject: 'go-driver' });

    expect(entries.map((e) => e.key)).toEqual(['docs/drivers/go/current/llms.txt']);
    expect(warn.mock.calls.flat().join(' ')).toContain('skipping the "missing from root llms.txt" check');
    warn.mockRestore();
  });

  it('throws on an S3 key collision instead of silently letting one entry overwrite the other', async () => {
    // Two distinct projects that both resolve to the same urlSlug + version + filename.
    await writeFile(
      path.join(monorepoPath, 'platform', 'docs-nextjs', 'src', 'generated', 'dir-name-to-prefix.json'),
      JSON.stringify({
        'go-driver': 'docs/drivers/go',
        manual: 'docs',
        landing: 'docs',
        'go-driver-duplicate': 'docs/drivers/go',
      }),
    );
    await writeFile(
      path.join(monorepoPath, 'content', 'go-driver-duplicate', 'current', 'source', 'index.txt'),
      'Dup\n===\n',
    );
    await writeFile(path.join(outputDir, 'go-driver-duplicate', 'llms.txt'), '# Duplicate\n');

    await expect(buildUploadManifest(monorepoPath, outputDir)).rejects.toThrow(/S3 key collision/);
  });

  it('returns entries sorted by key', async () => {
    const entries = await buildUploadManifest(monorepoPath, outputDir);
    const keys = entries.map((e) => e.key);
    expect(keys).toEqual([...keys].sort());
  });

  it('does not warn when every generated file is linked from the root llms.txt', async () => {
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
    await buildUploadManifest(monorepoPath, outputDir);
    expect(warnSpy).not.toHaveBeenCalledWith(expect.stringContaining('WARNING'));
    warnSpy.mockRestore();
  });

  it('warns (but still returns all entries) when a generated file is not linked from the root llms.txt', async () => {
    // Root llms.txt is missing manual's part 2 link, simulating a project
    // that grew more parts without the hand-maintained index being updated.
    await writeFile(
      path.join(outputDir, 'llms.txt'),
      '# MongoDB Developer Documentation\n\n' +
        '* [Go Driver](https://www.mongodb.com/docs/drivers/go/current/llms.txt)\n' +
        '* [Manual Part 1](https://www.mongodb.com/docs/manual/manual-1-llms.txt)\n',
    );
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

    const entries = await buildUploadManifest(monorepoPath, outputDir);

    // Still returns every entry - a missing link only warns, it never drops
    // the file from the upload.
    expect(entries.some((e) => e.key === 'docs/manual/manual-2-llms.txt')).toBe(true);
    const warnedText = warnSpy.mock.calls.map((call) => call.join(' ')).join('\n');
    expect(warnedText).toContain('WARNING');
    expect(warnedText).toContain('https://www.mongodb.com/docs/manual/manual-2-llms.txt');
    // Part 1 IS linked, so it shouldn't be called out.
    expect(warnedText).not.toContain('manual-1-llms.txt');
    warnSpy.mockRestore();
  });
});
