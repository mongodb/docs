import { Link } from '@/mdx-components/Link';
import { REFERENCE_PREFIX } from '@/mdx-utils/get-blob-key';
import { getBlobString } from '@/mdx-utils/blob-read';

interface ReferenceProps {
  projectPath: string;
  name?: string;
  refKey?: string;
  title?: string;
  type?: string;
}

export const Reference = async ({ projectPath, name, refKey, title }: ReferenceProps) => {
  const lookupKey = name ?? refKey;
  if (!lookupKey) {
    return `Reference (unknown) not found in project (${projectPath})`;
  }

  // Caller-provided replacements (from include/sharedinclude) take priority
  if (replacements && lookupKey in replacements) {
    return <>{replacements[lookupKey]}</>;
  }

  const fullPath = `${REFERENCE_PREFIX}/${projectPath}/_references.json`;
  const references = await getBlobString(fullPath);

  const parsedReferences = JSON.parse(references ?? '{}');

  // Substitution references (e.g. <Reference refKey="service" type="substitution" />) are plain text
  const substitution = parsedReferences?.substitutions?.[lookupKey];
  if (substitution) {
    return <span>{substitution}</span>;
  }

  const href: string | undefined = parsedReferences?.refs?.[lookupKey];
  if (!href) {
    // External absolute URL with no entry in _references.json — render directly
    if (lookupKey.startsWith('http')) {
      return <Link to={lookupKey}>{title ?? lookupKey}</Link>;
    }
    return `Reference (${lookupKey}) not found in project (${projectPath})`;
  }

  const resolvedHref = href.startsWith('http') ? href : `/${href}`;

  return <Link to={resolvedHref}>{title ?? lookupKey}</Link>;
};
