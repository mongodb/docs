import { getMetaFromDirective } from '@/utils/get-meta-from-directive';
import type { ParentNode, Root } from '@/types/ast';

// data for this component
import node from '@/tests/data/seo.test.json';
const typedNode = node as ParentNode;

describe('SEO utils', () => {
  it('returns correct metadata from directive', () => {
    const meta = getMetaFromDirective({ rootNode: typedNode as Root });

    expect(meta).toBeDefined();
    expect(meta).toMatchSnapshot();
  });
});
