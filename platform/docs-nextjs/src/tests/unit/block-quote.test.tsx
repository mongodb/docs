import { render } from '@testing-library/react';
import { mockLocation } from '../utils/mock-location';
import BlockQuote from '@/components/block-quote';
import type { BlockQuoteNode } from '@/types/ast';

// data for this component
import mockData from '../data/block-quote.test.json';
const typedMockData = mockData as BlockQuoteNode;

beforeAll(() => {
  mockLocation({ hash: '' });
});

// TODO: Remove .skip once listItems and refs are migrated
it.skip('renders correctly', () => {
  const tree = render(<BlockQuote nodeChildren={typedMockData.children} />);
  expect(tree.asFragment()).toMatchSnapshot();
});
