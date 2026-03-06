import { render } from '@testing-library/react';
import { Admonition } from '@/mdx-components/Admonition';

it('admonitions render correctly', () => {
  const tree = render(<Admonition name="note">These instructions are for installing MongoDB directly from</Admonition>);
  expect(tree.asFragment()).toMatchSnapshot();
});
