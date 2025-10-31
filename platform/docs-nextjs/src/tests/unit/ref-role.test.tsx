import { render } from '@testing-library/react';
import { mockLocation } from '@/tests/utils/mock-location';
import type { RefRoleNode } from '@/types/ast';
import { useSnootyMetadata } from '@/utils/use-snooty-metadata';
import RefRole from '@/components/ref-role';
import { VersionContextProvider } from '@/context/version-context';
import { mockDocsets } from '@/tests/utils/mock-docsets';

// data for this component
import mockData from '@/tests/data/ref-role.test.json';
const typedMockData = mockData as RefRoleNode;

jest.mock('@/utils/use-snooty-metadata', () => ({
  useSnootyMetadata: jest.fn(),
}));

beforeAll(() => {
  mockLocation({ hash: '' });
  (useSnootyMetadata as jest.Mock).mockImplementation(() => ({ project: 'docs-node', branch: 'v4.9' }));
});

it('renders correctly with versioned path', () => {
  const tree = render(
    <VersionContextProvider docsets={mockDocsets} slug="reference/program/mongos" env="production">
      <RefRole nodeChildren={typedMockData.children} fileid={typedMockData.fileid} url={typedMockData.url} />
    </VersionContextProvider>,
  );
  expect(tree.asFragment()).toMatchSnapshot();
});
