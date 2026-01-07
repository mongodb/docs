import path from 'path';
import { loadMDX } from '@/mdx-utils/load-mdx';

interface IncludeProps {
  projectPath: string;
  src: string;
}

export const Include = async ({ projectPath, src }: IncludeProps): Promise<React.ReactElement> => {
  const fullPath = path.join(projectPath, src);
  const urlPath = fullPath.split('/');

  const result = await loadMDX(urlPath);

  if (!result) {
    console.warn(`Include: Could not load MDX from path: ${src}`);
    return <div style={{ color: 'red' }}>Error: Could not load content from {src}</div>;
  }

  return result.content;
};
