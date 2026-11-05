import { describe, it, expect } from 'vitest';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { BackendName } from '@mongodb-docs/translation-service';
import { loadConfig } from '../config.js';
import { translateRun } from './run.js';
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
    expect(readManifest(cfg, 'atlas', 'r').translator).toEqual({
      provider: 'aws-translate',
      model: null,
    });
  });
});
