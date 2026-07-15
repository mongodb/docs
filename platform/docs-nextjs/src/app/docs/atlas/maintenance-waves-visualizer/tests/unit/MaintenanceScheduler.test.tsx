import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MaintenanceScheduler } from '../../components/MaintenanceScheduler';

// Fix system time to Jan 1 2026 so the initial calendar month and DateSelectPicker
// both start at January 2026, making date-based assertions deterministic.
beforeEach(() => {
  jest.useFakeTimers();
  jest.setSystemTime(new Date(2026, 0, 1));
});

afterEach(() => {
  jest.useRealTimers();
});

describe('MaintenanceScheduler', () => {
  it('renders the Configure Schedule sidebar heading', () => {
    render(<MaintenanceScheduler />);
    expect(screen.getByText('Configure Schedule')).toBeInTheDocument();
  });

  it('renders the Projected Maintenance Calendar heading', () => {
    render(<MaintenanceScheduler />);
    expect(screen.getByText('Projected Maintenance Calendar')).toBeInTheDocument();
  });

  it('renders exactly one project card on initial load', () => {
    render(<MaintenanceScheduler />);
    expect(screen.getAllByTestId('project-card')).toHaveLength(1);
  });

  it('renders the MongoDB Maintenance Release Date card', () => {
    render(<MaintenanceScheduler />);
    expect(screen.getByText('MongoDB Maintenance Release Date')).toBeInTheDocument();
  });

  it('renders the calendar panel', () => {
    render(<MaintenanceScheduler />);
    expect(screen.getByTestId('calendar-panel')).toBeInTheDocument();
  });

  it('renders the info banner with planning disclaimer', () => {
    render(<MaintenanceScheduler />);
    expect(screen.getByText(/planning purposes only/i)).toBeInTheDocument();
  });

  it('shows no release badge or wave chips before a release date is selected', () => {
    render(<MaintenanceScheduler />);
    expect(screen.queryByTestId('release-badge')).not.toBeInTheDocument();
    expect(screen.queryByTestId('wave-chip-1')).not.toBeInTheDocument();
  });

  it('shows the Add another project button', () => {
    render(<MaintenanceScheduler />);
    expect(screen.getByRole('button', { name: /add another project/i })).toBeInTheDocument();
  });

  it('adds a project card when the Add button is clicked', async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    render(<MaintenanceScheduler />);
    await user.click(screen.getByRole('button', { name: /add another project/i }));
    expect(screen.getAllByTestId('project-card')).toHaveLength(2);
  });

  it('removes a project card when the remove button is clicked', async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    render(<MaintenanceScheduler />);
    await user.click(screen.getByRole('button', { name: /add another project/i }));
    expect(screen.getAllByTestId('project-card')).toHaveLength(2);

    await user.click(screen.getAllByRole('button', { name: /^remove /i })[0]);
    expect(screen.getAllByTestId('project-card')).toHaveLength(1);
  });

  it('hides the Add button and shows a message at the 5-project limit', async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    render(<MaintenanceScheduler />);
    for (let i = 0; i < 4; i++) {
      await user.click(screen.getByRole('button', { name: /add another project/i }));
    }
    expect(screen.queryByRole('button', { name: /add another project/i })).not.toBeInTheDocument();
    expect(screen.getByText(/maximum number of projects reached/i)).toBeInTheDocument();
  });

  it('shows the release badge live after selecting a release date', async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    render(<MaintenanceScheduler />);

    const releaseDateBtn = screen.getByRole('button', { name: /^release date/i });
    await user.click(releaseDateBtn);
    await user.click(await screen.findByRole('button', { name: /january 3, 2026/i }));

    // Navigate calendar to January 2026 — already there since system time is Jan 1 2026
    expect(screen.getByTestId('calendar-day-2026-01-03')).toContainElement(
      await screen.findByTestId('release-badge'),
    );
  });

  it('navigates the calendar to the previous month', async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    render(<MaintenanceScheduler />);
    // Starts at January 2026; go back to December 2025
    await user.click(screen.getByRole('button', { name: /previous month/i }));
    expect(screen.getByText('December 2025')).toBeInTheDocument();
  });

  it('navigates the calendar to the next month', async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    render(<MaintenanceScheduler />);
    // Starts at January 2026; go forward to February 2026
    await user.click(screen.getByRole('button', { name: /next month/i }));
    expect(screen.getByText('February 2026')).toBeInTheDocument();
  });

  it('matches snapshot', () => {
    const { asFragment } = render(<MaintenanceScheduler />);
    expect(asFragment()).toMatchSnapshot();
  });
});
