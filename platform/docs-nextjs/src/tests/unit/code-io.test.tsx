import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CodeIO from '@/components/code/code-io';
import type { IOCodeBlockNode } from '@/types/ast';

import mockData from '@/tests/data/code-io.test.json';

const outputVisibleByDefault = mockData.outputVisibleByDefault as unknown as IOCodeBlockNode;
const outputHiddenByDefault = mockData.outputHiddenByDefault as unknown as IOCodeBlockNode;

describe('CodeIO', () => {
  it('renders correctly', () => {
    const wrapper = render(<CodeIO nodeChildren={outputVisibleByDefault.children} />);
    expect(wrapper.asFragment()).toMatchSnapshot();
  });

  it('closes and opens output code snippet on io button click when output is visible by default', async () => {
    const user = userEvent.setup();
    const wrapper = render(<CodeIO nodeChildren={outputVisibleByDefault.children} />);
    await user.click(wrapper.getByRole('button'));
    expect(wrapper.getByText('hello world')).not.toBeVisible();
    await user.click(wrapper.getByRole('button'));
    expect(wrapper.getByText('hello world')).toBeVisible();
  });

  it('opens and closes output code snippet on io button click when output is hidden by default', async () => {
    const user = userEvent.setup();
    const wrapper = render(<CodeIO nodeChildren={outputHiddenByDefault.children} />);
    await user.click(wrapper.getByRole('button'));
    expect(wrapper.getByText('hello world')).toBeVisible();
    await user.click(wrapper.getByRole('button'));
    expect(wrapper.getByText('hello world')).not.toBeVisible();
  });
});
