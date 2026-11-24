import { render } from '@testing-library/react';
import HeaderBackground from '../../components/HeaderBackground';

describe('HeaderBackground component', () => {
  it('renders correctly', () => {
    const wrapper = render(<HeaderBackground />);
    expect(wrapper.queryByTestId('header-background-img')).toBeInTheDocument();
    expect(wrapper.asFragment()).toMatchSnapshot();
  });
});
