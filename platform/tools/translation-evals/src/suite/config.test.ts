import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { describe, it, expect } from 'vitest';
import { parseSuiteConfig, loadSuiteConfig, judgeWarnings } from './config.js';

const VALID = `
name: atlas-sonnet-vs-opus
project: atlas
pages: pages/manual.txt
locales: [es, ja-jp]
judge: claude-opus-5-5
repeats: 3
translators:
  - { backend: anthropic, model: claude-sonnet-5-5 }
  - { backend: aws-translate }
`;

describe('parseSuiteConfig', () => {
  it('parses a valid suite config', () => {
    const cfg = parseSuiteConfig(VALID);
    expect(cfg.name).toBe('atlas-sonnet-vs-opus');
    expect(cfg.project).toBe('atlas');
    expect(cfg.locales).toEqual(['es', 'ja-jp']);
    expect(cfg.repeats).toBe(3);
    expect(cfg.translators).toEqual([
      { backend: 'anthropic', model: 'claude-sonnet-5-5' },
      { backend: 'aws-translate' },
    ]);
  });

  it('rejects an unknown backend and lists the valid values', () => {
    expect(() => parseSuiteConfig(VALID.replace('aws-translate', 'grove'))).toThrow(
      /must be one of: openai, anthropic, aws-translate, stub/,
    );
  });

  it('rejects a missing required field', () => {
    expect(() => parseSuiteConfig(VALID.replace(/^judge:.*$/m, ''))).toThrow(/judge/);
  });

  it('rejects repeats below 1', () => {
    expect(() => parseSuiteConfig(VALID.replace('repeats: 3', 'repeats: 0'))).toThrow(/repeats/);
  });

  it('rejects the same translator listed twice', () => {
    const dup = `${VALID}  - { backend: anthropic, model: claude-sonnet-5-5 }\n`;
    expect(() => parseSuiteConfig(dup)).toThrow(/duplicate/i);
  });
});

describe('path-segment validation', () => {
  it.each(['../escape', 'a/b', '.hidden', 'a..b', 'has space'])('rejects name %j', (name) => {
    expect(() =>
      parseSuiteConfig(VALID.replace('atlas-sonnet-vs-opus', JSON.stringify(name))),
    ).toThrow(/name must be a slug/);
  });

  it.each(['../escape', '/abs', 'manual/../x', 'manual//manual'])(
    'rejects project %j',
    (project) => {
      expect(() =>
        parseSuiteConfig(VALID.replace('project: atlas', `project: "${project}"`)),
      ).toThrow(/project must be a relative path/);
    },
  );

  it('accepts a nested project path', () => {
    expect(
      parseSuiteConfig(VALID.replace('project: atlas', 'project: manual/manual')).project,
    ).toBe('manual/manual');
  });
});

describe('judgeWarnings', () => {
  it('warns when a translator model equals the judge', () => {
    const cfg = parseSuiteConfig(
      VALID.replace('judge: claude-opus-5-5', 'judge: claude-sonnet-5-5'),
    );
    expect(judgeWarnings(cfg)).toHaveLength(1);
    expect(judgeWarnings(parseSuiteConfig(VALID))).toEqual([]);
  });
});

describe('loadSuiteConfig', () => {
  it('reads and parses a config file', () => {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'suite-'));
    const file = path.join(dir, 'suite.yaml');
    fs.writeFileSync(file, VALID);
    expect(loadSuiteConfig(file).project).toBe('atlas');
  });
});
