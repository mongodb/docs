import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ProjectCard } from '../../components/ProjectCard';
import type { Project } from '../../types';

const mockProject: Project = {
  id: 'a',
  name: 'Project A',
  maintenanceDay: 1,
  timeOfDay: '00:00',
  wave: 1,
};

const nullProject: Project = {
  id: 'b',
  name: 'Project B',
  maintenanceDay: null,
  timeOfDay: null,
  wave: null,
};

describe('ProjectCard', () => {
  it('renders the project name', () => {
    render(<ProjectCard project={mockProject} onChange={jest.fn()} onRemove={jest.fn()} />);
    expect(screen.getByText('Project A')).toBeInTheDocument();
  });

  it('renders a wave indicator dot with the correct aria-label when wave is set', () => {
    render(<ProjectCard project={mockProject} onChange={jest.fn()} onRemove={jest.fn()} />);
    expect(screen.getByLabelText('Wave 1')).toBeInTheDocument();
  });

  it('renders the dot aria-label "No wave selected" when wave is null', () => {
    render(<ProjectCard project={nullProject} onChange={jest.fn()} onRemove={jest.fn()} />);
    expect(screen.getByLabelText('No wave selected')).toBeInTheDocument();
  });

  it('updates the dot aria-label when the wave changes', () => {
    const wave2Project = { ...mockProject, wave: 2 as const };
    render(<ProjectCard project={wave2Project} onChange={jest.fn()} onRemove={jest.fn()} />);
    expect(screen.getByLabelText('Wave 2')).toBeInTheDocument();
  });

  it('renders the day select trigger', () => {
    render(<ProjectCard project={mockProject} onChange={jest.fn()} onRemove={jest.fn()} />);
    expect(screen.getByRole('button', { name: /maintenance window/i })).toBeInTheDocument();
  });

  it('renders the time select trigger', () => {
    render(<ProjectCard project={mockProject} onChange={jest.fn()} onRemove={jest.fn()} />);
    expect(screen.getByRole('button', { name: /start time/i })).toBeInTheDocument();
  });

  it('renders the wave select trigger', () => {
    render(<ProjectCard project={mockProject} onChange={jest.fn()} onRemove={jest.fn()} />);
    expect(screen.getByRole('button', { name: /wave assignment/i })).toBeInTheDocument();
  });

  it('renders the remove button with the project name in its accessible label', () => {
    render(<ProjectCard project={mockProject} onChange={jest.fn()} onRemove={jest.fn()} />);
    expect(screen.getByRole('button', { name: /remove project a/i })).toBeInTheDocument();
  });

  it('calls onRemove when the remove button is clicked', async () => {
    const user = userEvent.setup();
    const onRemove = jest.fn();
    render(<ProjectCard project={mockProject} onChange={jest.fn()} onRemove={onRemove} />);
    await user.click(screen.getByRole('button', { name: /remove project a/i }));
    expect(onRemove).toHaveBeenCalledTimes(1);
  });

  it('renders the data-testid attribute', () => {
    render(<ProjectCard project={mockProject} onChange={jest.fn()} onRemove={jest.fn()} />);
    expect(screen.getByTestId('project-card')).toBeInTheDocument();
  });

  it('matches snapshot', () => {
    const { asFragment } = render(
      <ProjectCard project={mockProject} onChange={jest.fn()} onRemove={jest.fn()} />,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
