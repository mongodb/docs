import { render } from '@testing-library/react';
import Header from '../../components/Header';

describe('Header component', () => {
  it('renders correctly', () => {
    const wrapper = render(<Header />);
    expect(wrapper.container.querySelector('h2')).toHaveTextContent("What's New at MongoDB");
    expect(wrapper.asFragment()).toMatchSnapshot();
  });
});
