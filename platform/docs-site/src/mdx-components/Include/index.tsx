import type { ReactNode } from 'react';
import { Children, isValidElement } from 'react';
import path from 'path';
import { loadMDX } from '@/mdx-utils/load-mdx';
import { Replacement } from './Replacement';

interface IncludeProps {
  projectPath: string;
  src: string;
  children?: ReactNode;
}

/** Extract named replacements from <Replacement name="..."> children. */
const extractReplacements = (children: ReactNode): Record<string, ReactNode> => {
  const replacements: Record<string, ReactNode> = {};
  Children.forEach(children, (child) => {
    if (isValidElement(child) && child.type === Replacement) {
      const name = child.props.name as string;
      replacements[name] = child.props.children as ReactNode;
    }
  });
  return replacements;
};

export const Include = async ({ projectPath, src, children }: IncludeProps): Promise<React.ReactElement> => {
  const fullPath = path.join(projectPath, src);
  const urlPath = fullPath.split('/');

  const replacements = extractReplacements(children);
  const result = await loadMDX(urlPath, Object.keys(replacements).length > 0 ? replacements : undefined);

  if (!result) {
    console.warn(`Include: Could not load MDX from path: ${src}`);
    return <div style={{ color: 'red' }}>Error: Could not load content from {src}</div>;
  }

  return result.content;
};
