import Link from 'next/link';
import { REFERENCE_PREFIX } from '@/mdx-utils/get-blob-key';
import { getBlobString } from '@/mdx-utils/blob-read';

interface ReferenceProps {
  projectPath: string;
  name?: string;
  refKey?: string;
}

export const Reference = async ({ projectPath, name, refKey }: ReferenceProps) => {
  const lookupKey = name ?? refKey;
  if (!lookupKey) {
    return `Reference (unknown) not found in project (${projectPath})`;
  }

  const fullPath = `${REFERENCE_PREFIX}/${projectPath}/_references.json`;
  const references = await getBlobString(fullPath);

  const parsedReferences = JSON.parse(references ?? '{}');

  // Substitution references (e.g. <Reference refKey="service" type="substitution" />) are plain text
  const substitution = parsedReferences?.substitutions?.[lookupKey];
  if (substitution) {
    return <span>{substitution}</span>;
  }

  const ref = parsedReferences?.refs?.[lookupKey];
  if (!ref) {
    return `Reference (${lookupKey}) not found in project (${projectPath})`;
  }

  const isAbsoluteUrl = ref.url.startsWith('http');
  if (!isAbsoluteUrl) {
    // TODO: handle relative refs
  }

  return <Link href={ref.url}>{ref.title}</Link>;
};
