import fs from 'node:fs/promises';

type Substitutions = Record<string, string>;
type Refs = Record<string, { title: string; url: string }>;

export interface ReferencesArtifact {
  substitutions: Substitutions;
  refs: Refs;
}

/** Build references artifacts (TS and JSON) for a given set of substitutions and refs */
export const buildReferencesArtifacts = ({
  substitutions = {},
  refs = {},
}: ReferencesArtifact): { ts: string; json: string } => {
  const subsLines = Object.entries(substitutions)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([k, v]) => `    ${JSON.stringify(k)}: ${esc(v)},`)
    .join('\n');

  const refsLines = Object.entries(refs)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([url, { title }]) => `    ${esc(url)}: { title: ${esc(title)}, url: ${esc(url)} },`)
    .join('\n');

  const ts =
    `export const substitutions = {\n${subsLines}\n} as const;\n\n` +
    `export const refs = {\n${refsLines}\n} as const;\n\n` +
    `const references = { substitutions, refs } as const;\n\n` +
    `export default references;\n`;

  const json = JSON.stringify({ substitutions, refs }, null, 2) + '\n';

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
