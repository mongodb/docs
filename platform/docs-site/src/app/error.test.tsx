import { render, screen } from '@testing-library/react';
import { TrackJS } from 'trackjs';
import ErrorBoundary from './error';

jest.mock('trackjs');
jest.mock('@/templates/error-template', () => ({
  ErrorPage: ({ title, children }: { title: string; children: React.ReactNode }) => (
    <div>
      <h1>{title}</h1>
      {children}
    </div>
  ),
}));
jest.mock('@/app/emotion', () => ({
  LeafyGreenProviderWrapper: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));
jest.mock('@/app/via-provider', () => ({
  ViaProviderWrapper: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));
jest.mock('@/context/dark-mode-context', () => ({
  DarkModeContextProvider: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));
jest.mock('@via-ds/components/provider', () => ({ ViaColorSchemeScript: () => null }));
jest.mock('@/app/lib/dark-mode-script', () => ({ darkModeScript: '' }));
jest.mock('@via-ds/components/typography', () => ({
  Text: ({ children }: { children: React.ReactNode }) => <span>{children}</span>,
  TextStyle: { body: 'body' },
}));
jest.mock('@via-ds/components/types', () => ({ Size: { Large: 'large' } }));

describe('app/error', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the fallback and reports the error to TrackJS', () => {
    const error = new Error('boom');

    render(<ErrorBoundary error={error} reset={jest.fn()} />);

    expect(screen.getByRole('heading', { name: /something went wrong/i })).toBeInTheDocument();
    expect(TrackJS.track).toHaveBeenCalledWith(error);
  });
});
