import { render } from '@testing-library/react';
import type { ParentNode } from '@/types/ast';
import Glossary from '@/components/glossary';

import mockData from '@/tests/data/glossary.test.json';

describe('Glossary Component', () => {
  it('renders correctly', () => {
    const tree = render(<Glossary nodeChildren={mockData.children as ParentNode['children']} />);
    expect(tree.asFragment()).toMatchSnapshot();
  });
});
