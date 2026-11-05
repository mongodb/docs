import fs from 'node:fs';
import { parse } from 'yaml';
import {
  BACKEND_NAMES,
  isBackendName,
  type BackendName,
} from '@mongodb-docs/translation-service';

export interface Translator {
  backend: BackendName;
  model?: string;
}

export interface SuiteConfig {
  name: string;
  project: string;
  pages: string;
  locales: string[];
  judge: string;
  repeats: number;
  translators: Translator[];
}

function requireString(record: Record<string, unknown>, field: string): string {
  const value = record[field];
  if (typeof value !== 'string' || value.trim() === '') {
    throw new Error(`suite config: ${field} must be a non-empty string`);
  }
  return value;
}

const SEGMENT = /^[A-Za-z0-9][A-Za-z0-9._-]*$/;

function isSafeSegment(segment: string): boolean {
  return SEGMENT.test(segment) && segment !== '.' && segment !== '..' && !segment.includes('..');
}

function requireSlug(record: Record<string, unknown>, field: string): string {
  const value = requireString(record, field);
  if (!isSafeSegment(value)) {
    throw new Error(
      `suite config: ${field} must be a slug (letters, digits, ".", "_", "-"); got "${value}"`,
    );
  }
  return value;
}

function requireProjectPath(record: Record<string, unknown>, field: string): string {
  const value = requireString(record, field);
  if (!value.split('/').every(isSafeSegment)) {
    throw new Error(
      `suite config: ${field} must be a relative path of slug segments under content-mdx/; ` +
        `got "${value}"`,
    );
  }
  return value;
}

function parseTranslator(entry: unknown, index: number): Translator {
  if (entry === null || typeof entry !== 'object' || Array.isArray(entry)) {
    throw new Error(`suite config: translators[${index}] must be a mapping`);
  }
  const record = entry as Record<string, unknown>;

  const backend = record.backend;
  if (typeof backend !== 'string' || !isBackendName(backend)) {
    throw new Error(
      `suite config: translators[${index}].backend must be one of: ` +
        `${BACKEND_NAMES.join(', ')}; got "${String(backend)}"`,
    );
  }

  const model = record.model;
  if (model !== undefined && typeof model !== 'string') {
    throw new Error(`suite config: translators[${index}].model must be a string`);
  }
  return model === undefined ? { backend } : { backend, model };
}

export function parseSuiteConfig(text: string): SuiteConfig {
  const raw: unknown = parse(text);
  if (raw === null || typeof raw !== 'object' || Array.isArray(raw)) {
    throw new Error('suite config: expected a YAML mapping');
  }
  const record = raw as Record<string, unknown>;

  const locales = record.locales;
  if (
    !Array.isArray(locales) ||
    locales.length === 0 ||
    !locales.every((locale) => typeof locale === 'string')
  ) {
    throw new Error('suite config: locales must be a non-empty list of strings');
  }

  const repeats = record.repeats;
  if (typeof repeats !== 'number' || !Number.isInteger(repeats) || repeats < 1) {
    throw new Error(`suite config: repeats must be an integer >= 1; got ${String(repeats)}`);
  }

  const entries = record.translators;
  if (!Array.isArray(entries) || entries.length === 0) {
    throw new Error('suite config: translators must be a non-empty list');
  }
  const translators = entries.map((entry, index) => parseTranslator(entry, index));

  const seen = new Set<string>();
  for (const translator of translators) {
    const key = `${translator.backend}:${translator.model ?? ''}`;
    if (seen.has(key)) {
      throw new Error(`suite config: duplicate translator "${key}"`);
    }
    seen.add(key);
  }

  return {
    name: requireSlug(record, 'name'),
    project: requireProjectPath(record, 'project'),
    pages: requireString(record, 'pages'),
    locales,
    judge: requireString(record, 'judge'),
    repeats,
    translators,
  };
}

export function loadSuiteConfig(file: string): SuiteConfig {
  return parseSuiteConfig(fs.readFileSync(file, 'utf8'));
}

export function judgeWarnings(cfg: SuiteConfig): string[] {
  return cfg.translators
    .filter((t) => t.model !== undefined && t.model === cfg.judge)
    .map(
      (t) =>
        `warning: translator ${t.backend}:${t.model} uses the judge model "${cfg.judge}"; ` +
        'a judge scoring its own output is biased',
    );
}
