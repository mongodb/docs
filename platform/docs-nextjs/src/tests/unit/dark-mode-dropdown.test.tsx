import { render, act } from '@testing-library/react';
import LeafyGreenProvider from '@leafygreen-ui/leafygreen-provider';
import type { DarkModePref } from '@/context/dark-mode-context';
import { DarkModeContext } from '@/context/dark-mode-context';
import * as MediaHooks from '@/hooks/use-media';
import DarkModeDropdown from '@/components/action-bar/dark-mode-dropdown';

let darkModePref = 'light-theme';

const setDarkModePref = jest.fn((value) => {
  darkModePref = value;
});

// mock useMedia
jest.spyOn(MediaHooks, 'default').mockImplementation(() => false);

// mock window.localStorage
const storage: Record<string, string> = {};
jest.spyOn(window.localStorage.__proto__, 'setItem').mockImplementation(function (...args: unknown[]) {
  const [key, value] = args as [string, string];
  storage[key] = value;
});

const mountDarkModeDropdown = () => {
  return render(
    <DarkModeContext.Provider value={{ setDarkModePref, darkModePref: darkModePref as DarkModePref }}>
      <LeafyGreenProvider baseFontSize={16} darkMode={darkModePref === 'dark-theme'}>
        <DarkModeDropdown />
      </LeafyGreenProvider>
    </DarkModeContext.Provider>,
  );
};

describe('DarkMode Dropdown component', () => {
  it('renders dark mode dropdown', async () => {
    // first snapshot of closed menu
    const elm = mountDarkModeDropdown();
    expect(elm.asFragment()).toMatchSnapshot();
    const button = await elm.findByLabelText('Dark Mode Menu');
    await act(async () => {
      button.click();
    });
    // second snapshot of open menu
    expect(elm.asFragment()).toMatchSnapshot();
  });

  // test it changes to system and dark mode
  it('updates dark mode when selecting a different option', async () => {
    const elm = mountDarkModeDropdown();
    const button = await elm.findByLabelText('Dark Mode Menu');
    await act(async () => {
      button.click();
    });
    const darkModeSelections = await elm.findAllByRole('menuitem');
    await act(async () => {
      darkModeSelections[1].click();
    });
    expect(darkModePref).toBe('dark-theme');
    const darkElm = mountDarkModeDropdown();
    expect(darkElm.asFragment()).toMatchSnapshot();
  });
});
