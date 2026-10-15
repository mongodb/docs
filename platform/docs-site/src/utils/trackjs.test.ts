import { TrackJS } from 'trackjs';
import { reportError } from './trackjs';

jest.mock('trackjs');

describe('reportError', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('forwards the error to TrackJS', () => {
    const error = new Error('boom');
    reportError(error);
    expect(TrackJS.track).toHaveBeenCalledWith(error);
  });

  it('does not throw when TrackJS.track throws', () => {
    (TrackJS.track as jest.Mock).mockImplementation(() => {
      throw new Error('trackjs unavailable');
    });
    expect(() => reportError(new Error('boom'))).not.toThrow();
  });

  it('installs TrackJS on demand when it is not already installed', () => {
    (TrackJS.isInstalled as jest.Mock).mockReturnValue(false);
    const error = new Error('boom');
    reportError(error);
    expect(TrackJS.install).toHaveBeenCalled();
    expect(TrackJS.track).toHaveBeenCalledWith(error);
  });
});
