import { render } from '@testing-library/react';
import BreadcrumbContainer from '@/components/breadcrumbs/breadcrumb-container';
import mockData from '@/tests/data/breadcrumbs.test.json';
import { useSnootyMetadata } from '@/utils/use-snooty-metadata';

type BreadcrumbType = {
  title: string;
  path: string;
};

jest.mock('@/utils/use-snooty-metadata', () => ({
  useSnootyMetadata: jest.fn(),
}));

beforeAll(() => {
  (useSnootyMetadata as jest.Mock).mockImplementation(() => ({ project: 'docs-node', branch: 'v4.9' }));
});

const mountBreadcrumbContainer = (breadcrumbs: BreadcrumbType[]) => {
  return render(<BreadcrumbContainer breadcrumbs={breadcrumbs} />);
};

const mockIntermediateCrumbs = {
  title: 'MongoDB Atlas',
  path: 'https://www.mongodb.com/docs/atlas/',
};

const mockPropertyCrumb = {
  title: 'MongoDB Atlas Device SDKs',
  path: 'https://www.mongodb.com/docs/atlas/device-sdks/',
};

describe('BreadcrumbContainer', () => {
  //home breadcrumb
  const mockHomeCrumb = {
    title: 'Docs Home',
    path: 'https://www.mongodb.com/docs/',
  };

  const mockParents = mockData;

  it('renders a driver site correctly with intermediate breadcrumb and with project parents', () => {
    const breadcrumbs = [
      { title: 'Docs Home', path: 'https://www.mongodb.com/docs/' },
      { title: 'Languages', path: 'https://www.mongodb.com/docs/languages' },
      { title: 'C#/.NET', path: 'https://www.mongodb.com/docs/languages/csharp/' },
      { title: 'C#/.NET Driver', path: 'https://www.mongodb.com/docs/languages/csharp/csharp-driver/' },
      { title: 'Usage Examples', path: 'https://www.mongodb.com/docs/languages/csharp/csharp-driver/usage-examples/' },
    ];

    const tree = mountBreadcrumbContainer(breadcrumbs);
    expect(tree.asFragment()).toMatchSnapshot();
  });

  it('renders correctly with intermediate breadcrumb, no project parents', () => {
    const breadcrumbs = [mockHomeCrumb, mockIntermediateCrumbs, mockPropertyCrumb, ...mockParents['example-projects']];
    const tree = mountBreadcrumbContainer(breadcrumbs);
    expect(tree.asFragment()).toMatchSnapshot();
  });

  it('renders correctly with no intermediate breadcrumbs, has project parents', () => {
    const breadcrumbs = [mockHomeCrumb, mockPropertyCrumb, ...mockParents['sdk/cpp/app-services/call-a-function']];
    const tree = mountBreadcrumbContainer(breadcrumbs);
    expect(tree.asFragment()).toMatchSnapshot();
  });

  it('renders correctly as a docs homepage', () => {
    const breadcrumbs = [mockHomeCrumb, mockPropertyCrumb, ...mockParents['sdk/cpp/app-services/call-a-function']];
    const tree = mountBreadcrumbContainer(breadcrumbs);
    expect(tree.asFragment()).toMatchSnapshot();
  });
});
