import type { ReactNode } from 'react';
import { Link } from '@/mdx-components/Link';
import { Abbr } from '@/mdx-components/Abbr';
import { REFERENCE_PREFIX } from '@/mdx-utils/get-blob-key';
import { getBlobString } from '@/mdx-utils/blob-read';

interface ReferenceProps {
  projectPath: string;
  name?: string;
  refKey?: string;
  title?: string;
  type?: string;
  replacements?: Record<string, React.ReactNode>;
}

export const Reference = async ({ projectPath, name, refKey, title, replacements }: ReferenceProps) => {
  const lookupKey = name ?? refKey;

  // Caller-provided replacements (from include/sharedinclude) take priority
  if (lookupKey && replacements && lookupKey in replacements) {
    return <>{replacements[lookupKey]}</>;
  }

  const fullPath = `${REFERENCE_PREFIX}/${projectPath}/_references.json`;
  const references = await getBlobString(fullPath);

  const parsedReferences = JSON.parse(references ?? '{}');

  // Substitution references (e.g. <Reference refKey="service" type="substitution" />) are plain text,
  // unless the value is an abbreviation in "term (expansion)" format — render those as Abbr tooltips.
  const substitution = lookupKey ? parsedReferences?.substitutions?.[lookupKey] : undefined;
  if (substitution) {
    const abbrMatch = substitution.match(/^(.+?)\s*\((.+)\)$/);
    if (abbrMatch) {
      const [, abbr, tooltip] = abbrMatch;
      return <Abbr tooltip={tooltip}>{abbr}</Abbr>;
    }
    return <span>{substitution}</span>;
  }

  const href: string | undefined = lookupKey ? parsedReferences?.refs?.[lookupKey] : undefined;
  if (href) {
    const resolvedHref = href.startsWith('http') ? href : `/${href}`;
    return <Link to={resolvedHref}>{title ?? lookupKey}</Link>;
  }

  // External absolute URL with no entry in _references.json — render directly
  if (lookupKey?.startsWith('http')) {
    return <Link to={lookupKey}>{title ?? lookupKey}</Link>;
  }

  // Unresolved reference — render a dead link so content remains visible
  return <Link to="">{title ?? lookupKey ?? ''}</Link>;
};
