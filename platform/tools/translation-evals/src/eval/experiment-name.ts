import type { DatasetRow } from '../types.js';

export interface ExperimentNameParts {
  provider: string;
  translatorModel?: string;
  runId: string;
  override?: string;
}

/** Distinct locales present in the rows, sorted, so the name reflects what was scored. */
export function localesFromRows(rows: DatasetRow[]): string[] {
  return [...new Set(rows.map((row) => row.metadata.locale))].sort();
}

/**
 * The Braintrust experiment name: `<provider> <model>--<run id>`, dropping the
 * model when the backend has none (AWS Translate). A non-blank override wins
 * verbatim.
 */
export function buildExperimentName(parts: ExperimentNameParts): string {
  const override = parts.override?.trim();
  if (override) return override;
  const label = [parts.provider, parts.translatorModel?.trim()].filter(Boolean).join(' ');
  return `${label}--${parts.runId}`;
}
