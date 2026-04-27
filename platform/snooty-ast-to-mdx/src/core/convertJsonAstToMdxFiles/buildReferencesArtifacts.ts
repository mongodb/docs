import fs from 'node:fs/promises';

export interface AbbrSubstitution {
  text: string;
  tooltip: string;
}
export type SubstitutionValue = string | AbbrSubstitution;
type Substitutions = Record<string, SubstitutionValue>;
type Refs = Record<string, string>;

export interface ReferencesArtifact {
  substitutions: Substitutions;
  refs: Refs;
}

const ABBR_PATTERN = /^(.+?)\s*\((.+)\)$/;

/** Detect the "TERM (expansion)" abbreviation pattern in a plain string substitution value. */
const parseSubstitutionValue = (value: string): SubstitutionValue => {
  const match = value.match(ABBR_PATTERN);
  if (match) return { text: match[1], tooltip: match[2] };
  return value;
};

const serializeSubstitutionValue = (value: SubstitutionValue): string => {
  if (typeof value === 'string') return esc(value);
  return `{ text: ${esc(value.text)}, tooltip: ${esc(value.tooltip)} }`;
};

/** Build references artifacts (TS and JSON) for a given set of substitutions and refs */
export const buildReferencesArtifacts = ({
  substitutions = {},
  refs = {},
}: ReferencesArtifact): { ts: string; json: string } => {
  // Normalize incoming string values: detect the abbreviation pattern and convert to structured form.
  const normalizedSubs: Substitutions = {};
  for (const [k, v] of Object.entries(substitutions)) {
    normalizedSubs[k] = typeof v === 'string' ? parseSubstitutionValue(v) : v;
  }

  const subsLines = Object.entries(normalizedSubs)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([k, v]) => `    ${JSON.stringify(k)}: ${serializeSubstitutionValue(v)},`)
    .join('\n');

  const refsLines = Object.entries(refs)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([key, href]) => `    ${esc(key)}: ${esc(href)},`)
    .join('\n');

  const ts =
    `export const substitutions = {\n${subsLines}\n} as const;\n\n` +
    `export const refs = {\n${refsLines}\n} as const;\n\n` +
    `const references = { substitutions, refs } as const;\n\n` +
    `export default references;\n`;

  const json = JSON.stringify({ substitutions: normalizedSubs, refs }, null, 2) + '\n';

  return { ts, json };
};

export const readExistingReferences = async (tsFilePath: string): Promise<ReferencesArtifact> => {
  const jsonPath = tsFilePath.replace(/\.ts$/, '.json');
  try {
    const buffer = await fs.readFile(jsonPath, 'utf8');
    const existing = JSON.parse(buffer);
    const { substitutions, refs } = existing ?? {};
    return { substitutions, refs };
  } catch {
    return { substitutions: {}, refs: {} };
  }
};

interface MergeReferencesArgs {
  base: ReferencesArtifact;
  add: ReferencesArtifact;
}

export const mergeReferences = ({ base, add }: MergeReferencesArgs): ReferencesArtifact => ({
  substitutions: { ...base.substitutions, ...(add.substitutions ?? {}) },
  refs: { ...base.refs, ...(add.refs ?? {}) },
});

const esc = (value: string) => JSON.stringify(String(value).slice(0, 1_000));
