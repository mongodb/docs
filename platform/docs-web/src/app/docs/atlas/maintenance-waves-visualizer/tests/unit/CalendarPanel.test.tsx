import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CalendarPanel } from '../../components/CalendarPanel';
import type { ScheduleEntry, WaveNumber } from '../../types';

const baseProps = {
  releaseDate: null,
  entries: [] as ScheduleEntry[],
  year: 2026,
  month: 0, // January
  onPrev: jest.fn(),
  onNext: jest.fn(),
};

describe('CalendarPanel', () => {
  it('renders the month/year heading', () => {
    render(<CalendarPanel {...baseProps} />);
    expect(screen.getByText('January 2026')).toBeInTheDocument();
  });

  it('renders weekday column headers', () => {
    render(<CalendarPanel {...baseProps} />);
    for (const d of ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']) {
      expect(screen.getByText(d)).toBeInTheDocument();
    }
  });

  it('renders 31 day cells for January', () => {
    render(<CalendarPanel {...baseProps} />);
    expect(screen.getByTestId('calendar-day-2026-01-31')).toBeInTheDocument();
  });

  it('does not render a day-32 cell', () => {
    render(<CalendarPanel {...baseProps} />);
    expect(screen.queryByTestId('calendar-day-2026-01-32')).not.toBeInTheDocument();
  });

  it('renders the correct number of days for February (non-leap year)', () => {
    render(<CalendarPanel {...baseProps} year={2026} month={1} />);
    expect(screen.getByTestId('calendar-day-2026-02-28')).toBeInTheDocument();
    expect(screen.queryByTestId('calendar-day-2026-02-29')).not.toBeInTheDocument();
  });

  it('renders no release badge and no wave chips when entries are empty and releaseDate is null', () => {
    render(<CalendarPanel {...baseProps} />);
    expect(screen.queryByTestId('release-badge')).not.toBeInTheDocument();
    expect(screen.queryByTestId('wave-chip-1')).not.toBeInTheDocument();
  });

  it('renders a release badge on the release date', () => {
    render(
      <CalendarPanel
        {...baseProps}
        releaseDate={new Date(2026, 0, 3)}
      />,
    );
    const cell = screen.getByTestId('calendar-day-2026-01-03');
    expect(cell).toContainElement(screen.getByTestId('release-badge'));
    expect(screen.getByTestId('release-badge')).toHaveTextContent('MongoDB update');
  });

  it('renders no release badge on days other than the release date', () => {
    render(<CalendarPanel {...baseProps} releaseDate={new Date(2026, 0, 3)} />);
    const cell = screen.getByTestId('calendar-day-2026-01-04');
    expect(cell).not.toContainElement(screen.queryByTestId('release-badge'));
  });

  it('renders a wave chip for each entry on its scheduled date', () => {
    const entries: ScheduleEntry[] = [
      {
        projectId: 'a',
        projectName: 'Project A',
        wave: 1 as WaveNumber,
        datetime: new Date(2026, 0, 5, 0, 0, 0, 0),
      },
    ];
    render(<CalendarPanel {...baseProps} entries={entries} />);
    const chip = screen.getByTestId('wave-chip-1');
    expect(chip).toHaveTextContent('Project A');
    expect(screen.getByTestId('calendar-day-2026-01-05')).toContainElement(chip);
  });

  it('renders separate chips for each project (no grouping by wave)', () => {
    const entries: ScheduleEntry[] = [
      {
        projectId: 'a',
        projectName: 'Project A',
        wave: 1 as WaveNumber,
        datetime: new Date(2026, 0, 5, 0, 0, 0, 0),
      },
      {
        projectId: 'b',
        projectName: 'Project B',
        wave: 1 as WaveNumber,
        datetime: new Date(2026, 0, 5, 0, 0, 0, 0),
      },
    ];
    render(<CalendarPanel {...baseProps} entries={entries} />);
    // Two distinct chips (same wave-chip-1 testid because each chip renders data-testid="wave-chip-1")
    const chips = screen.getAllByTestId('wave-chip-1');
    expect(chips).toHaveLength(2);
    expect(chips[0]).toHaveTextContent('Project A');
    expect(chips[1]).toHaveTextContent('Project B');
  });

  it('renders chips for different waves on the same day', () => {
    const entries: ScheduleEntry[] = [
      {
        projectId: 'a',
        projectName: 'Project A',
        wave: 1 as WaveNumber,
        datetime: new Date(2026, 0, 7, 0, 0, 0, 0),
      },
      {
        projectId: 'b',
        projectName: 'Project B',
        wave: 2 as WaveNumber,
        datetime: new Date(2026, 0, 7, 0, 0, 0, 0),
      },
    ];
    render(<CalendarPanel {...baseProps} entries={entries} />);
    expect(screen.getByTestId('wave-chip-1')).toHaveTextContent('Project A');
    expect(screen.getByTestId('wave-chip-2')).toHaveTextContent('Project B');
  });

  it('renders both a release badge and a wave chip when they land on the same date', () => {
    const entries: ScheduleEntry[] = [
      {
        projectId: 'a',
        projectName: 'Project A',
        wave: 1 as WaveNumber,
        datetime: new Date(2026, 0, 5, 0, 0, 0, 0),
      },
    ];
    render(
      <CalendarPanel {...baseProps} releaseDate={new Date(2026, 0, 5)} entries={entries} />,
    );
    const cell = screen.getByTestId('calendar-day-2026-01-05');
    expect(cell).toContainElement(screen.getByTestId('release-badge'));
    expect(cell).toContainElement(screen.getByTestId('wave-chip-1'));
  });

  it('renders prev and next month navigation buttons', () => {
    render(<CalendarPanel {...baseProps} />);
    expect(screen.getByRole('button', { name: /previous month/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /next month/i })).toBeInTheDocument();
  });

  it('calls onPrev when the previous month button is clicked', async () => {
    const user = userEvent.setup();
    const onPrev = jest.fn();
    render(<CalendarPanel {...baseProps} onPrev={onPrev} />);
    await user.click(screen.getByRole('button', { name: /previous month/i }));
    expect(onPrev).toHaveBeenCalledTimes(1);
  });

  it('calls onNext when the next month button is clicked', async () => {
    const user = userEvent.setup();
    const onNext = jest.fn();
    render(<CalendarPanel {...baseProps} onNext={onNext} />);
    await user.click(screen.getByRole('button', { name: /next month/i }));
    expect(onNext).toHaveBeenCalledTimes(1);
  });

  it('matches snapshot', () => {
    const { asFragment } = render(<CalendarPanel {...baseProps} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
