import { describe, it, expect } from 'vitest';
import type { BackendName } from '@mongodb-docs/translation-service';
import { expandPlan, iterationId } from './plan.js';
import type { SuiteConfig } from './config.js';

const cfg: SuiteConfig = {
  name: 'b',
  project: 'atlas',
  pages: 'pages/manual.txt',
  locales: ['es'],
  judge: 'j',
  repeats: 2,
  translators: [
    { backend: 'anthropic' as BackendName, model: 'claude-sonnet-5-5' },
    { backend: 'aws-translate' as BackendName },
  ],
};

describe('expandPlan', () => {
  it('expands translators × repeats in config order', () => {
    expect(expandPlan(cfg).map((i) => i.id)).toEqual([
      'anthropic:claude-sonnet-5-5#1',
      'anthropic:claude-sonnet-5-5#2',
      'aws-translate:#1',
      'aws-translate:#2',
    ]);
  });

  it('gives every iteration a unique id', () => {
    const ids = expandPlan(cfg).map((i) => i.id);
    expect(new Set(ids).size).toBe(ids.length);
  });
});

describe('iterationId', () => {
  it('renders an absent model as an empty segment', () => {
    expect(iterationId({ backend: 'aws-translate' as BackendName }, 1)).toBe('aws-translate:#1');
  });
});
