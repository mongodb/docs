// util function to create mock RemoteMetadata for testing
// extend to add additional properties as needed

import type { RemoteMetadata } from '@/types/data';
import type { TextNode, TocTreeEntry } from '@/types/ast';

export const createMockMetadata = (overrides?: Partial<RemoteMetadata>): RemoteMetadata => {
  const defaultTocTree: TocTreeEntry = {
    type: 'directive',
    title: [{ type: 'text', value: 'Test' }],
    slug: '/',
    children: [],
  };

  const defaultSlugToTitle: Record<string, [TextNode]> = {
    index: [{ type: 'text', value: 'Test Page' }],
  };

  return {
    project: 'test-project',
    branch: 'master',
    title: 'Test Documentation',
    eol: false,
    slugToTitle: defaultSlugToTitle,
    toctree: defaultTocTree,
    toctreeOrder: [],
    parentPaths: {},
    static_files: {},
    ...overrides,
  };
};
