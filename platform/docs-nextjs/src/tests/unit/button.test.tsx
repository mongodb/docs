import { render } from '@testing-library/react';
import { mockLocation } from '../utils/mock-location';
import Button from '@/components/button';

import mockData from '@/tests/data/button.test.json';
import type { ButtonNode } from '@/types/ast';

beforeAll(() => {
  mockLocation({ hash: '' });
});

describe('button component', () => {
  it('renders correctly', () => {
    const typedMockData = mockData as ButtonNode;
    const tree = render(<Button options={typedMockData.options} argument={typedMockData.argument} darkMode={false} />);
    // expect anchor tag to be generated from uri option
    expect(tree.container.querySelector('a')).toBeInTheDocument();
    expect(tree.asFragment()).toMatchSnapshot();
  });
});
