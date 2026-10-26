import type { DatasetRow } from '../types.js';

export interface ExperimentNameParts {
  project: string;
  locales: string[];
  runId: string;
  translatorModel?: string;
  judgeModel?: string;
  override?: string;
}

/** Distinct locales present in the rows, sorted, so the name reflects what was scored. */
export function localesFromRows(rows: DatasetRow[]): string[] {
  return [...new Set(rows.map((row) => row.metadata.locale))].sort();
}

/**
 * The Braintrust experiment name. A non-blank override wins; otherwise the name
 * reads `<project> <locales> <run id> [<translator> -> <judge>]`, dropping the
 * locale segment when there are none and rendering an unset model as `default`.
 */
export function buildExperimentName(parts: ExperimentNameParts): string {
  const override = parts.override?.trim();
  if (override) return override;
  const segments = [parts.project];
  if (parts.locales.length > 0) segments.push(parts.locales.join(','));
  segments.push(parts.runId);
  const translator = parts.translatorModel?.trim() || 'default';
  const judge = parts.judgeModel?.trim() || 'default';
  segments.push(`[${translator} -> ${judge}]`);
  return segments.join(' ');
}
