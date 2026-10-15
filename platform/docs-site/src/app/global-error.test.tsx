import { render, screen } from '@testing-library/react';
import { TrackJS } from 'trackjs';
import GlobalError from './global-error';

jest.mock('trackjs');

describe('app/global-error', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders a self-contained fallback and reports the error', () => {
    const error = new Error('boom');

    render(<GlobalError error={error} reset={jest.fn()} />);

    expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
    expect(TrackJS.track).toHaveBeenCalledWith(error);
  });
});
