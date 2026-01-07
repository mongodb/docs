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

  const notFoundText = `Reference (${name}) not found in project (${projectPath})`;

  const parsedReferences = JSON.parse(references ?? '{}');
  const value = parsedReferences?.['refs']?.[name] ?? notFoundText;

  return value;
};
