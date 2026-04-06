import type { ReactNode } from 'react';
import { Link } from '@/mdx-components/Link';
import { REFERENCE_PREFIX } from '@/mdx-utils/get-blob-key';
import { getBlobString } from '@/mdx-utils/blob-read';

interface RefRoleProps {
  projectPath: string;
  type: string;
  name: string;
  children?: ReactNode;
}

export const RefRole = async ({ projectPath, name, children }: RefRoleProps) => {
  const fullPath = `${REFERENCE_PREFIX}/${projectPath}/_references.json`;
  const references = await getBlobString(fullPath);
  const parsedReferences = JSON.parse(references ?? '{}');

  const href: string | undefined = parsedReferences?.refs?.[name];
  if (href) {
    const resolvedHref = href.startsWith('http') ? href : `/${href}`;
    return <Link to={resolvedHref}>{children ?? name}</Link>;
  }

  if (name.startsWith('http')) {
    return <Link to={name}>{children ?? name}</Link>;
  }

  // Unresolved reference — render a dead link so content remains visible
  return <Link to="">{children ?? name}</Link>;
};
