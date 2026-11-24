import { Time } from '@/mdx-components/Time';
import { render } from '@testing-library/react';

describe('renders time correctly', () => {
  it('renders plural minutes correctly', () => {
    const wrapper = render(<Time minutes="10" />);
    expect(wrapper.getByText('Time required: 10 minutes')).toBeTruthy();
  });

  it('renders singular minute correctly', () => {
    const wrapper = render(<Time minutes="1" />);
    expect(wrapper.getByText('Time required: 1 minute')).toBeTruthy();
  });
});
