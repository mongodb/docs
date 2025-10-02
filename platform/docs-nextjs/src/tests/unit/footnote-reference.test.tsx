import { render } from '@testing-library/react';
import FootnoteReference from '@/components/footnote/footnote-reference';

import mockData from '../data/footnote-reference.test.json';

it('renders correctly', () => {
  const tree = render(<FootnoteReference id={mockData.id} refname={mockData.refname} />);
  expect(tree.asFragment()).toMatchSnapshot();
});
