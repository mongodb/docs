import { describe, it, expect } from 'vitest';
import { buildExperimentName, localesFromRows } from './experiment-name.js';
import type { DatasetRow } from '../types.js';

function row(locale: string): DatasetRow {
  return {
    input: { source_text: 's', target_locale: locale, local_text: 'l' },
    expected: 'e',
    metadata: {
      project: 'atlas',
      url: '/docs/atlas',
      slug: 'atlas',
      locale,
      run: '2026-10-23-a1b2c3',
    },
  };
}

describe('localesFromRows', () => {
  it('dedupes and sorts the locales present in the rows', () => {
    expect(localesFromRows([row('es'), row('pt-br'), row('es')])).toEqual(['es', 'pt-br']);
  });

  it('returns an empty list for no rows', () => {
    expect(localesFromRows([])).toEqual([]);
  });
});

describe('buildExperimentName', () => {
  const base = {
    project: 'atlas',
    locales: ['es'],
    runId: '2026-10-23-a1b2c3',
    translatorModel: 'gpt-5.5',
    judgeModel: 'claude-sonnet-4-5',
  };

  it('builds project, locales, run id, and models', () => {
    expect(buildExperimentName(base)).toBe(
      'atlas es 2026-10-23-a1b2c3 [gpt-5.5 -> claude-sonnet-4-5]',
    );
  });

  it('joins multiple locales with commas and no spaces', () => {
    expect(buildExperimentName({ ...base, locales: ['es', 'ja-jp', 'pt-br'] })).toBe(
      'atlas es,ja-jp,pt-br 2026-10-23-a1b2c3 [gpt-5.5 -> claude-sonnet-4-5]',
    );
  });

  it('omits the locale segment when there are no locales', () => {
    expect(buildExperimentName({ ...base, locales: [] })).toBe(
      'atlas 2026-10-23-a1b2c3 [gpt-5.5 -> claude-sonnet-4-5]',
    );
  });

  it('renders an unset model as "default"', () => {
    expect(buildExperimentName({ ...base, translatorModel: undefined })).toBe(
      'atlas es 2026-10-23-a1b2c3 [default -> claude-sonnet-4-5]',
    );
    expect(buildExperimentName({ ...base, judgeModel: undefined })).toBe(
      'atlas es 2026-10-23-a1b2c3 [gpt-5.5 -> default]',
    );
  });

  it('uses a non-blank override verbatim', () => {
    expect(buildExperimentName({ ...base, override: 'my experiment' })).toBe('my experiment');
  });

  it('ignores a blank override', () => {
    expect(buildExperimentName({ ...base, override: '   ' })).toBe(
      'atlas es 2026-10-23-a1b2c3 [gpt-5.5 -> claude-sonnet-4-5]',
    );
  });
});
