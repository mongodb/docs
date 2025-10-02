import { render } from '@testing-library/react';
import { mockLocation } from '@/tests/utils/mock-location';
import { InternalPageNav } from '@/components/internal-page-nav';
import { useSnootyMetadata } from '@/utils/use-snooty-metadata';
import { PageContext } from '@/context/page-context';

import slugToBreadcrumbLabel from '../data/ecosystem/slugToBreadcrumbLabel.json';

const data = ['drivers/csharp', 'drivers/go', 'drivers/java', 'drivers/motor', 'drivers/cxx'];

jest.mock('@/utils/use-snooty-metadata', () => ({
  useSnootyMetadata: jest.fn(),
}));

const renderNav = (slug: string) =>
  render(
    <PageContext.Provider
      value={{
        slug,
        template: 'document',
        tabsMainColumn: false,
        options: null,
        page: null,
      }}
    >
      <InternalPageNav slug={slug} slugTitleMapping={slugToBreadcrumbLabel} toctreeOrder={data} />
    </PageContext.Provider>,
  );

beforeAll(() => {
  mockLocation({ hash: '/' });
  (useSnootyMetadata as jest.Mock).mockImplementation(() => ({}));
});

// TODO: remove this skip once the internal page nav is fully implemented (after unified TOC and version context)
describe.skip('internal page nav', () => {
  it('renders a page with next and previous links correctly', () => {
    const tree = renderNav('drivers/go');
    expect(tree.asFragment()).toMatchSnapshot();
  });

  it('renders a page with no previous link correctly', () => {
    const tree = renderNav('drivers/csharp');
    expect(tree.asFragment()).toMatchSnapshot();
  });

  it('renders a page with no next link correctly', () => {
    const tree = renderNav('drivers/cxx');
    expect(tree.asFragment()).toMatchSnapshot();
  });

  describe('multi-page tutorials', () => {
    it('renders a page with next and previous page steps', () => {
      const mockData = ['drivers/csharp', 'drivers/java', 'drivers/cxx'];
      (useSnootyMetadata as jest.Mock).mockImplementation(() => ({
        multiPageTutorials: {
          'mock-page': {
            slugs: mockData,
            total_steps: mockData.length,
          },
        },
        slugToBreadcrumbLabel,
      }));

      const tree = renderNav('drivers/go');
      expect(tree.asFragment()).toMatchSnapshot();
    });

    it('renders a page with next in multi-page tutorial, and previous toctree order', () => {
      const mockData = ['drivers/go', 'drivers/motor'];
      (useSnootyMetadata as jest.Mock).mockImplementation(() => ({
        multiPageTutorials: {
          'mock-page': {
            slugs: mockData,
            total_steps: mockData.length,
          },
        },
        slugToBreadcrumbLabel,
      }));

      const tree = renderNav('drivers/go');
      expect(tree.asFragment()).toMatchSnapshot();
    });

    it('renders a page with previous in multi-page tutorial, and next toctree order', () => {
      const mockData = ['drivers/go', 'drivers/motor'];
      (useSnootyMetadata as jest.Mock).mockImplementation(() => ({
        multiPageTutorials: {
          'mock-page': {
            slugs: mockData,
            total_steps: mockData.length,
          },
        },
        slugToBreadcrumbLabel,
      }));

      const tree = renderNav('drivers/motor');
      expect(tree.asFragment()).toMatchSnapshot();
    });
  });
});
