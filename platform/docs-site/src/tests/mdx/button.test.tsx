import { render } from '@testing-library/react';
import { LinkButton } from '@/mdx-components/LinkButton';

it('button component renders correctly', () => {
  const tree = render(<LinkButton uri="/install">Download Compass</LinkButton>);
  expect(tree.asFragment()).toMatchSnapshot();
});
