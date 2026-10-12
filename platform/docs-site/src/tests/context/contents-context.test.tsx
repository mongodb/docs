import { useContext } from 'react';
import { render } from '@testing-library/react';
import { ContentsContext, ContentsProvider } from '@/context/contents-context';
import type { HeadingOption } from '@/types/ast';

jest.mock('@/utils/use-snooty-metadata', () => ({ useSnootyMetadata: () => ({ project: 'docs' }) }));
jest.mock('@/hooks/use-active-heading', () => ({ __esModule: true, default: () => null }));

const heading = (depth: number, id: string, title: string): HeadingOption => ({
  depth,
  id,
  selector_ids: {},
  title: [{ type: 'text', value: title }],
});

const renderIds = (headingNodes: HeadingOption[]) => {
  let ids: string[] = [];
  const Probe = () => {
    ids = useContext(ContentsContext).headingNodes.map((node) => node.id);
    return null;
  };
  render(
    <ContentsProvider headingNodes={headingNodes}>
      <Probe />
    </ContentsProvider>,
  );
  return ids;
};

describe('ContentsProvider', () => {
  it('keeps the frontmatter ids so ToC links match headings Snooty omits from the list', () => {
    const ids = renderIds([
      heading(2, 'syntax', 'Syntax'),
      heading(3, 'syntax-4', 'Syntax'),
      heading(3, 'options-3', 'Options'),
    ]);

    expect(ids).toEqual(['syntax', 'syntax-4', 'options-3']);
  });
});
