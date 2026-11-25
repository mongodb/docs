import { describe, it, expect, vi } from 'vitest';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { BackendName } from '@mongodb-docs/translation-service';
import { RebuildError } from 'translation-mdx-adapter';
import { loadConfig } from '../config.js';
import { keyCount, translateRun } from './run.js';
import { readManifest, writeManifest } from '../run/manifest.js';

function setup() {
  const cfg = loadConfig({});
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'tr-'));
  cfg.dataDir = path.join(root, 'data');
  cfg.contentMdxDir = path.join(root, 'content-mdx');
  const proj = path.join(cfg.contentMdxDir, 'atlas');
  fs.mkdirSync(path.join(proj, '_includes'), { recursive: true });
  fs.writeFileSync(path.join(proj, 'alerts.mdx'), '# Alerts');
  fs.writeFileSync(path.join(proj, '_includes', 'a.mdx'), 'body');
  fs.writeFileSync(
    path.join(proj, '_references.json'),
    JSON.stringify({ substitutions: { svc: 'Atlas' }, refs: {} }),
  );
  writeManifest(cfg, 'atlas', 'r', {
    project: 'atlas',
    runId: 'r',
    locales: ['es', 'ja-jp'],
    pages: [],
    translatable: { pages: ['alerts.mdx'], includes: ['_includes/a.mdx'], substitutions: ['svc'] },
    stages: {},
  });
  const overlay = (locale: string, rel: string) =>
    path.join(cfg.dataDir, 'atlas', 'r', 'translated', locale, rel);
  return { cfg, overlay };
}

const echo = async (p: Record<string, string>) => ({ ...p });

describe('keyCount', () => {
  it('extracts the failed-key fraction', () => {
    expect(keyCount('2 of 180 keys failed; first: "x" gateway 429')).toBe('2 of 180 failed');
  });
  it('returns undefined when the message has no key count', () => {
    expect(keyCount('network error')).toBeUndefined();
  });
});

describe('translateRun', () => {
  it('writes translated page, include and references under the run dir', async () => {
    const { cfg, overlay } = setup();

    const summary = await translateRun(cfg, 'atlas', 'r', ['es'], echo);

    expect(fs.existsSync(overlay('es', 'alerts.mdx'))).toBe(true);
    expect(fs.existsSync(overlay('es', '_includes/a.mdx'))).toBe(true);
    expect(fs.existsSync(overlay('es', '_references.json'))).toBe(true);
    expect(summary).toEqual({ translated: 3, failures: { es: [] } });
    expect(readManifest(cfg, 'atlas', 'r').stages.translate!.status).toBe('done');
  });

  it('translates every manifest locale when none is given', async () => {
    const { cfg, overlay } = setup();
    await translateRun(cfg, 'atlas', 'r', undefined, echo);
    expect(fs.existsSync(overlay('es', 'alerts.mdx'))).toBe(true);
    expect(fs.existsSync(overlay('ja-jp', 'alerts.mdx'))).toBe(true);
  });

  it('records a failed file and still translates the rest', async () => {
    const { cfg, overlay } = setup();
    const failOnBody = async (p: Record<string, string>) => {
      if (Object.values(p).includes('body')) throw new Error('backend down');
      return { ...p };
    };

    const summary = await translateRun(cfg, 'atlas', 'r', ['es'], failOnBody);

    expect(fs.existsSync(overlay('es', 'alerts.mdx'))).toBe(true);
    expect(fs.existsSync(overlay('es', '_includes/a.mdx'))).toBe(false);
    expect(summary.failures.es).toEqual([{ file: '_includes/a.mdx', error: 'backend down' }]);
    const recorded = JSON.parse(
      fs.readFileSync(path.join(cfg.dataDir, 'atlas', 'r', 'translate-failures.json'), 'utf8'),
    );
    expect(recorded.es).toEqual([{ file: '_includes/a.mdx', error: 'backend down' }]);
    expect(readManifest(cfg, 'atlas', 'r').stages.translate!.status).toBe('done');
  });

  it('warns per failed file and emits a per-locale heartbeat', async () => {
    const { cfg } = setup();
    const lines: string[] = [];
    const spy = vi.spyOn(console, 'log').mockImplementation((l: string) => void lines.push(l));
    const failOnBody = async (p: Record<string, string>) => {
      if (Object.values(p).includes('body')) throw new Error('backend down');
      return { ...p };
    };

    await translateRun(cfg, 'atlas', 'r', undefined, failOnBody);

    spy.mockRestore();
    expect(
      lines.some((l) => /warn {2}translate file=_includes\/a\.mdx err="backend down"/.test(l)),
    ).toBe(true);
    expect(lines.some((l) => /info {2}stage=translate locale=es files=\d+\/\d+/.test(l))).toBe(
      true,
    );
    expect(lines.some((l) => /info {2}stage=translate locale=ja-jp files=\d+\/\d+/.test(l))).toBe(
      true,
    );
  });

  it('logs and counts a rebuild when the adapter re-sends a file', async () => {
    const { cfg } = setup();
    const lines: string[] = [];
    const spy = vi.spyOn(console, 'log').mockImplementation((l: string) => void lines.push(l));
    let bodyCalls = 0;
    const retryOnce = async (p: Record<string, string>) => {
      if (Object.values(p).includes('body')) {
        bodyCalls++;
        if (bodyCalls === 1) throw new RebuildError('placeholder dropped');
      }
      return { ...p };
    };

    const summary = await translateRun(cfg, 'atlas', 'r', ['es'], retryOnce);

    spy.mockRestore();
    expect(summary.failures.es).toEqual([]);
    expect(
      lines.some((l) => /warn {2}translate rebuilding file=_includes\/a\.mdx reason=service/.test(l)),
    ).toBe(true);
    expect(lines.some((l) => l.includes('info  stage=translate locale=es files=2/2 rebuilt=1'))).toBe(
      true,
    );
  });

  it('logs a references translation failure with its error', async () => {
    const { cfg } = setup();
    const lines: string[] = [];
    const spy = vi.spyOn(console, 'log').mockImplementation((l: string) => void lines.push(l));
    const failReferences = async (p: Record<string, string>) => {
      if (Object.values(p).includes('Atlas')) throw new Error('references backend down');
      return { ...p };
    };

    const summary = await translateRun(cfg, 'atlas', 'r', ['es'], failReferences);

    spy.mockRestore();
    expect(summary.failures.es).toEqual([
      { file: '_references.json', error: 'references backend down' },
    ]);
    expect(
      lines.some((l) =>
        /warn {2}translate file=_references\.json err="references backend down"/.test(l),
      ),
    ).toBe(true);
  });

  it('keeps failure records for locales that were not rerun', async () => {
    const { cfg } = setup();
    const failAll = async () => {
      throw new Error('boom');
    };
    await translateRun(cfg, 'atlas', 'r', ['ja-jp'], failAll);

    await translateRun(cfg, 'atlas', 'r', ['es'], echo);

    const recorded = JSON.parse(
      fs.readFileSync(path.join(cfg.dataDir, 'atlas', 'r', 'translate-failures.json'), 'utf8'),
    );
    expect(recorded.es).toEqual([]);
    expect(recorded['ja-jp']).toHaveLength(3);
  });

  it('records the configured translator on the manifest', async () => {
    const { cfg } = setup();
    cfg.translatorBackend = BackendName.AwsTranslate;
    cfg.translatorModel = undefined;
    await translateRun(cfg, 'atlas', 'r', ['es'], echo);
    // A caller-supplied translateFn reports no meta, so the terminology reads
    // as unobserved (null / empty) rather than defaulting to a guess.
    expect(readManifest(cfg, 'atlas', 'r').translator).toEqual({
      provider: 'aws-translate',
      model: null,
      terminology: null,
      appliedTerms: [],
    });
  });
});
