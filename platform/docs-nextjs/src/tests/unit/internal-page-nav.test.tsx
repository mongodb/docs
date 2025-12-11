import { render } from '@testing-library/react';
import { mockLocation } from '@/tests/utils/mock-location';
import { InternalPageNav } from '@/components/internal-page-nav';
import { useSnootyMetadata } from '@/utils/use-snooty-metadata';
import { PageContext } from '@/context/page-context';

import { UnifiedTocProvider } from '@/context/unified-toc-context';

jest.mock('@/utils/use-snooty-metadata', () => ({
  useSnootyMetadata: jest.fn(),
}));

jest.mock('@/context/toc-data', () => {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const mockTocTree = require('../data/ecosystem/tocTree.json');
  return {
    tocData: mockTocTree,
  };
});

const renderNav = (slug: string) =>
  render(
    <UnifiedTocProvider>
      <PageContext.Provider
        value={{
          slug,
          template: 'document',
          tabsMainColumn: false,
          options: null,
          page: null,
        }}
      >
        <InternalPageNav />
      </PageContext.Provider>
      ,
    </UnifiedTocProvider>,
  );

beforeAll(() => {
  mockLocation({ hash: '/' });
  (useSnootyMetadata as jest.Mock).mockImplementation(() => ({}));
});

describe('internal page nav', () => {
  it('renders a page with next and previous links correctly', () => {
    const tree = renderNav('docs/languages/go');
    expect(tree.asFragment()).toMatchSnapshot();
  });

  it('renders a page with no previous link correctly', () => {
    const tree = renderNav('docs/atlas/access/manage-org-users');
    expect(tree.asFragment()).toMatchSnapshot();
  });

  it('renders a page with no next link correctly', () => {
    const tree = renderNav('docs/atlas/atlas-resource-policies');
    expect(tree.asFragment()).toMatchSnapshot();
  });
});
