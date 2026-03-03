import Button from '@/mdx-components/Button';
import { render } from '@testing-library/react';

it('button component renders correctly', () => {
  const tree = render(<Button uri="/install">Download Compass</Button>);
  expect(tree.asFragment()).toMatchSnapshot();
});
