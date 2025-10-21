import FieldList from '@/components/field-list';
import { ThemeProvider } from '@emotion/react';
import { theme } from '@/styles/theme';
import { render } from '@testing-library/react';
import type { FieldListNode } from '@/types/ast';

import mockData from '../data/field-list.test.json';
const typedMockData = mockData as FieldListNode;

it('renders correctly', () => {
  const tree = render(
    <ThemeProvider theme={theme}>
      <FieldList nodeChildren={typedMockData.children} />
    </ThemeProvider>,
  );
  expect(tree.asFragment()).toMatchSnapshot();
});
