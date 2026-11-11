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
    provider: 'openai',
    translatorModel: 'gpt-5.5',
    runId: '2026-10-28-7d42d0',
  };

  it('builds provider, model, and run id', () => {
    expect(buildExperimentName(base)).toBe('openai gpt-5.5--2026-10-28-7d42d0');
  });

  it('omits the model when the backend has none', () => {
    expect(buildExperimentName({ ...base, provider: 'aws-translate', translatorModel: undefined })).toBe(
      'aws-translate--2026-10-28-7d42d0',
    );
  });

  it('treats a blank model as unset', () => {
    expect(buildExperimentName({ ...base, translatorModel: '   ' })).toBe(
      'openai--2026-10-28-7d42d0',
    );
  });

  it('uses a non-blank override verbatim', () => {
    expect(buildExperimentName({ ...base, override: 'aws-translate (glossary on)' })).toBe(
      'aws-translate (glossary on)',
    );
  });

  it('ignores a blank override', () => {
    expect(buildExperimentName({ ...base, override: '   ' })).toBe(
      'openai gpt-5.5--2026-10-28-7d42d0',
    );
  });
});
