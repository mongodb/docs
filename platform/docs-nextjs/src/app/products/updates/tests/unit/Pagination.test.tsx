import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Pagination } from '../../components/Pagination';

const setCurrentPage = jest.fn();
const renderContext = (currentPage: number) =>
  render(<Pagination totalFilteredUpdates={2} setCurrentPage={setCurrentPage} currentPage={currentPage} />);

describe('Pagination component', () => {
  it('renders correctly', () => {
    const el = renderContext(1);
    expect(el.asFragment()).toMatchSnapshot();
  });
  it('handles pagination correctly', async () => {
    // Using userEvent over fireEvent for async capabilities
    // and to simulate a real user interaction
    const user = userEvent.setup();
    // Go to the next page (max items per page is 12)
    renderContext(1);
    const selectBtn = screen.getByTestId('leafygreen-ui-select-menubutton');
    await user.click(selectBtn);
    // Check that the previous button is disabled
    const prevBtn = screen.queryByRole('button', { name: /previous/i });
    const nextBtn = screen.queryByRole('button', { name: /next/i });
    // Since we are on the first page, the previous button should be disabled
    // and the next button should not
    expect(prevBtn).toHaveAttribute('aria-disabled', 'true');
    expect(nextBtn).toHaveAttribute('aria-disabled', 'false');
    // Let the user switch pages via the selector
    expect(await screen.findByRole('listbox')).toBeInTheDocument();
    await user.click(await screen.findByRole('option', { name: '2' }));
    expect(setCurrentPage).toHaveBeenCalledWith(2);
  });

  it('handles next prev disabled state', () => {
    renderContext(2);
    const prevBtn = screen.queryByRole('button', { name: /previous/i });
    const nextBtn = screen.queryByRole('button', { name: /next/i });
    // Since we are on the last page, the previous button should be disabled
    // and the next button should not
    expect(prevBtn).toHaveAttribute('aria-disabled', 'false');
    expect(nextBtn).toHaveAttribute('aria-disabled', 'true');
  });
});
