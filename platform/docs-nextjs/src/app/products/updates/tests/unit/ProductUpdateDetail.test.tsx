import { render } from '@testing-library/react';
import { useRouter } from 'next/navigation';
import ProductUpdateDetail from '../../components/ProductUpdateDetail';

import { mockedUpdate } from '../utils/mock-update';

describe('ProductUpdateDetail component', () => {
  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({ push: jest.fn() });
  });
  it('renders correctly', () => {
    const wrapper = render(<ProductUpdateDetail update={mockedUpdate} />);
    const mainUpdateTitle = 'MongoDB SQL Interface for Enterprise Advanced Now Generally Available';
    expect(wrapper.container.querySelector('a[href="/products/updates')).toBeInTheDocument();
    expect(wrapper.container.querySelector('h3')).toHaveTextContent(mainUpdateTitle);
    // Let us check for the related content as well
    expect(wrapper.getByText('Related Content')).toBeInTheDocument();
    expect(wrapper.asFragment()).toMatchSnapshot();
  });
});
