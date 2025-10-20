import { findAllNestedAttribute } from '@/utils/find-all-nested-attribute';
import figureData from '@/tests/data/figure.test.json';
import headingData from '@/tests/data/heading.test.json';
import footnoteData from '@/tests/data/footnote.test.json';
import type { ASTNode, HeadingNode } from '@/types/ast';

describe('findAllNestedAttribute', () => {
  it('gets all attribute from one level of children', () => {
    const res = findAllNestedAttribute([figureData as ASTNode, headingData as ASTNode, footnoteData as ASTNode], 'id');
    expect(res).toEqual(['create-an-administrative-username-and-password', 'id8']);
  });

  it('gets all attributes from multiple children levels', () => {
    const headingWithChildren: ASTNode = { ...(headingData as HeadingNode) };
    headingWithChildren.children = [headingData as ASTNode, footnoteData as ASTNode];
    const res = findAllNestedAttribute([headingWithChildren], 'type');
    expect(res).toEqual(['heading', 'heading', 'text', 'footnote', 'paragraph', 'text']);
  });
});
