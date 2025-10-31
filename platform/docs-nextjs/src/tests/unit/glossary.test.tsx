import { render } from '@testing-library/react';
import type { ParentNode } from '@/types/ast';
import Glossary from '@/components/glossary';
import { useSnootyMetadata } from '@/utils/use-snooty-metadata';
import { VersionContextProvider } from '@/context/version-context';
import { mockDocsets } from '@/tests/utils/mock-docsets';

import mockData from '@/tests/data/glossary.test.json';

jest.mock('@/utils/use-snooty-metadata', () => ({
  useSnootyMetadata: jest.fn(),
}));

beforeAll(() => {
  (useSnootyMetadata as jest.Mock).mockImplementation(() => ({}));
});

describe('Glossary Component', () => {
  it('renders correctly', () => {
    const tree = render(
      <VersionContextProvider docsets={mockDocsets} slug="/" env="production">
        <Glossary nodeChildren={mockData.children as ParentNode['children']} />
      </VersionContextProvider>,
    );
    expect(tree.asFragment()).toMatchSnapshot();
  });
});
