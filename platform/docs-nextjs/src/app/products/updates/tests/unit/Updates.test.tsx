import { render } from '@testing-library/react';
import { useRouter } from 'next/navigation';
import Updates from '../../components/Updates';

import { mockedUpdate } from '../utils/mock-update';

describe('ProductUpdateDetail component', () => {
  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({ push: jest.fn() });
  });
  it('renders correctly', () => {
    const wrapper = render(<Updates updates={[mockedUpdate]} />);
    expect(wrapper.queryByText('Offering')).toBeInTheDocument();
    expect(wrapper.queryByText('Category')).toBeInTheDocument();
    expect(wrapper.queryByText('Product')).toBeInTheDocument();
    expect(wrapper.asFragment()).toMatchSnapshot();
  });
  //TODO: more test to come.
});
