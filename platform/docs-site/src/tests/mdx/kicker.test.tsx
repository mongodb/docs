import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

import { Kicker } from '@/mdx-components/Kicker';

describe('Kicker', () => {
  it('renders its label as a paragraph, not a heading', () => {
    const wrapper = render(<Kicker>Featured Models</Kicker>);

    expect(wrapper.getByText('Featured Models').nodeName).toBe('P');
    expect(wrapper.queryByRole('heading')).not.toBeInTheDocument();
  });

  it('renders an empty kicker as a spacer, not a heading', () => {
    const wrapper = render(<Kicker />);

    expect(wrapper.queryByRole('heading')).not.toBeInTheDocument();
    expect(wrapper.container.firstChild?.nodeName).toBe('DIV');
  });
});
