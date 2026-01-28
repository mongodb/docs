import Link from 'next/link';
import { REFERENCE_PREFIX } from '@/mdx-utils/get-blob-key';
import { getBlobString } from '@/mdx-utils/blob-read';

interface ReferenceProps {
  projectPath: string;
  name: string;
}

export const Reference = async ({ projectPath, name }: ReferenceProps) => {
  // full path to the blob key
  const fullPath = `${REFERENCE_PREFIX}/${projectPath}/_references.json`;
  const references = await getBlobString(fullPath);

  const parsedReferences = JSON.parse(references ?? '{}');
  const ref = parsedReferences?.refs?.[name];

  if (!ref) {
    return `Reference (${name}) not found in project (${projectPath})`;
  }

  const isAbsoluteUrl = ref.url.startsWith('http');
  if (!isAbsoluteUrl) {
    // TODO: handle relative refs
  }

  return <Link href={ref.url}>{ref.title}</Link>;
};
