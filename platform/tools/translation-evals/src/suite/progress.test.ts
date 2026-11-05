import { describe, it, expect } from 'vitest';
import type { BackendName } from '@mongodb-docs/translation-service';
import { formatProgress, formatSummary, formatYield } from './progress.js';
import type { BatchState } from './state.js';
import type { Iteration } from './plan.js';

describe('formatProgress', () => {
  it('renders an index, the iteration id, and its status', () => {
    expect(formatProgress(3, 60, 'anthropic:m#2', 'completed')).toBe(
      '[3/60] anthropic:m#2 completed',
    );
  });
});

describe('formatSummary', () => {
  it('counts statuses per translator', () => {
    const its: Iteration[] = [
      { id: 'anthropic:m#1', backend: 'anthropic' as BackendName, model: 'm', repeat: 1 },
      { id: 'anthropic:m#2', backend: 'anthropic' as BackendName, model: 'm', repeat: 2 },
      { id: 'aws-translate:#1', backend: 'aws-translate' as BackendName, repeat: 1 },
    ];
    const state = {
      name: 'b',
      project: 'atlas',
      createdAt: 't',
      iterations: {
        'anthropic:m#1': { id: 'anthropic:m#1', status: 'completed', fingerprint: 'f', runId: 'r' },
        'anthropic:m#2': { id: 'anthropic:m#2', status: 'partial', fingerprint: 'f', runId: 'r' },
        'aws-translate:#1': {
          id: 'aws-translate:#1',
          status: 'failed',
          fingerprint: 'f',
          runId: 'r',
        },
      },
    } as BatchState;
    const out = formatSummary(its, state);
    expect(out).toContain('anthropic:m  completed=1 partial=1 failed=0');
    expect(out).toContain('aws-translate:  completed=0 partial=0 failed=1');
  });
});

describe('formatYield', () => {
  it('marks a short production scrape degraded', () => {
    expect(formatYield({ present: 70, expected: 75 })).toBe(
      'production scrape yield: 70/75  DEGRADED (5 missing)',
    );
    expect(formatYield({ present: 75, expected: 75 })).toBe('production scrape yield: 75/75');
  });

  it('lists each iteration with its experiment name under its cell', () => {
    const its: Iteration[] = [
      { id: 'anthropic:m#1', backend: 'anthropic' as BackendName, model: 'm', repeat: 1 },
    ];
    const state = {
      name: 'b',
      project: 'atlas',
      createdAt: 't',
      prodYield: { present: 2, expected: 2 },
      iterations: {
        'anthropic:m#1': {
          id: 'anthropic:m#1',
          status: 'completed',
          fingerprint: 'f',
          runId: 'r',
          experimentName: 'atlas es r [m -> j]',
        },
      },
    } as BatchState;
    expect(formatSummary(its, state).split('\n')).toEqual([
      'production scrape yield: 2/2',
      'anthropic:m  completed=1 partial=0 failed=0',
      '  anthropic:m#1 completed  atlas es r [m -> j]',
    ]);
  });
});
