import React from 'react';
import { render } from '@testing-library/react';
import { Caption } from '@/mdx-components/Image/Caption';

describe('Caption', () => {
  it('renders nothing for an empty caption', () => {
    const { container } = render(<Caption caption="  " />);
    expect(container).toBeEmptyDOMElement();
  });

  it('centers the caption by default', () => {
    const { getByText } = render(<Caption caption="A diagram" />);
    expect(getByText('A diagram')).toHaveClass('caption', 'center');
  });

  it('applies the requested alignment', () => {
    const { getByText } = render(<Caption caption="A diagram" align="left" />);
    expect(getByText('A diagram')).toHaveClass('caption', 'left');
    expect(getByText('A diagram')).not.toHaveClass('center');
  });
});
