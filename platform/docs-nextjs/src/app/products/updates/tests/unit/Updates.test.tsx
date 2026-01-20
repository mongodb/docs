import { render, act } from '@testing-library/react';
import { useRouter } from 'next/navigation';
import Updates from '../../components/Updates';
import type { FilterOptions } from '../../consts/filters';

import { mockedUpdate } from '../utils/mock-update';

const mockFilterOptions: FilterOptions = {
  offering: ['MongoDB Enterprise Advanced'],
  category: ['Data Services'],
  product: ['Atlas SQL Interface'],
};

describe('ProductUpdateDetail component', () => {
  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({ push: jest.fn() });
  });
  it('renders correctly', () => {
    const wrapper = render(
      <Updates updates={[mockedUpdate]} totalCount={1} filterOptions={mockFilterOptions} query="" currentPage={1} />,
    );
    expect(wrapper.queryByText('Offering')).toBeInTheDocument();
    expect(wrapper.queryByText('Category')).toBeInTheDocument();
    expect(wrapper.queryByText('Product')).toBeInTheDocument();
    expect(wrapper.asFragment()).toMatchSnapshot();
  });

  it('clears selected filters', () => {
    const wrapper = render(
      <Updates updates={[mockedUpdate]} totalCount={1} filterOptions={mockFilterOptions} query="" currentPage={1} />,
    );
    expect(wrapper.queryByTestId('clear_filter_btn')).toBeInTheDocument();

    // Get checkboxes by role
    let checkboxes = wrapper.getAllByRole('checkbox');

    // Click on the first few checkboxes
    act(() => {
      checkboxes[0].click();
    });

    act(() => {
      checkboxes[1].click();
    });

    act(() => {
      checkboxes[2].click();
    });

    // Verify filters were selected
    expect(checkboxes[0]).toHaveAttribute('aria-checked', 'true');
    expect(checkboxes[1]).toHaveAttribute('aria-checked', 'true');
    expect(checkboxes[2]).toHaveAttribute('aria-checked', 'true');

    // Click the clear filter button
    const clearFilterBtn = wrapper.getByTestId('clear_filter_btn');
    act(() => {
      clearFilterBtn.click();
    });

    // Verify filters are cleared by checking if all filter checkboxes are unchecked
    checkboxes = wrapper.getAllByRole('checkbox');
    checkboxes.forEach((checkbox) => {
      expect(checkbox).toHaveAttribute('aria-checked', 'false');
    });
  });
});
