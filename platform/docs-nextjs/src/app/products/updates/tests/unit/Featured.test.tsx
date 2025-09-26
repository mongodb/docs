import { render, screen } from '@testing-library/react';
import { useRouter } from 'next/navigation';
import Featured from '../../components/Featured';

import { mockedLimitedFeaturedUpdates } from '../utils/mock-featured-updates';

describe('Featured component', () => {
  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({ push: jest.fn() });
  });
  it('renders correctly', () => {
    const wrapper = render(<Featured updates={mockedLimitedFeaturedUpdates} />);
    const { getAllByTestId } = screen;
    const chips = getAllByTestId('chip-text');
    expect(wrapper.container.querySelector('h3')).toHaveTextContent('Featured Updates');
    expect(wrapper.queryAllByTestId('featured-update')).toHaveLength(3);
    expect(chips).toHaveLength(3);
    expect(wrapper.asFragment()).toMatchSnapshot();
  });
});
