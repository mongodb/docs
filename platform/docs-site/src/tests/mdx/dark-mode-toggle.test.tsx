import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { DarkModeContextProvider } from '@/context/dark-mode-context';
import { DarkModeToggle } from '@/mdx-components/ActionBar/DarkModeToggle';
import { theme } from '@/styles/theme';
import { getLocalValue, setLocalValue } from '@/utils/browser-storage';
import { setMatchMedia } from '@/tests/utils';

jest.mock('@/utils/report-analytics', () => ({
  reportAnalytics: jest.fn(),
}));

const renderToggle = (storedPref: string, systemDark: boolean) => {
  setLocalValue('theme', storedPref);
  setMatchMedia(...(systemDark ? [theme.colorPreference.dark] : []));
  render(
    <DarkModeContextProvider>
      <DarkModeToggle />
    </DarkModeContextProvider>,
  );
};

afterEach(() => {
  window.localStorage.clear();
  document.documentElement.className = '';
});

describe('DarkModeToggle', () => {
  it.each([
    ['light', false, 'Switch to dark theme', 'dark-theme', 'Follow system theme (light)'],
    ['dark', true, 'Switch to light theme', 'light-theme', 'Follow system theme (dark)'],
  ])(
    'overrides a %s system theme with its opposite',
    async (_, systemDark, initialLabel, expectedPref, expectedLabel) => {
      renderToggle('system', systemDark);

      await userEvent.click(await screen.findByRole('button', { name: initialLabel }));

      expect(getLocalValue('theme')).toBe(expectedPref);
      expect(screen.getByRole('button', { name: expectedLabel })).toBeInTheDocument();
    },
  );

  it('returns to the system theme from an override', async () => {
    renderToggle('dark-theme', false);

    await userEvent.click(await screen.findByRole('button', { name: 'Follow system theme (light)' }));

    expect(getLocalValue('theme')).toBe('system');
    expect(screen.getByRole('button', { name: 'Switch to dark theme' })).toBeInTheDocument();
  });

  it('treats a stored theme that matches the system as following it', async () => {
    renderToggle('light-theme', false);

    await userEvent.click(await screen.findByRole('button', { name: 'Switch to dark theme' }));

    expect(getLocalValue('theme')).toBe('dark-theme');
  });
});
