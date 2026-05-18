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

// Advance LeafyGreen's react-transition-group timers so the popover is
// always captured in the fully-entered state, not mid-transition.
// Without this, the snapshot races a 150ms setTimeout on slower CI runners
// (Node 22 / 2-CPU ubuntu) and flips between entering/entered CSS classes.
function openMenu(button: HTMLElement) {
  act(() => {
    button.click();
    jest.runAllTimers();
  });
}

describe('DarkMode Dropdown component', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('renders dark mode dropdown', () => {
    // first snapshot of closed menu
    const elm = mountDarkModeDropdown();
    act(() => {
      jest.runAllTimers();
    });
    expect(elm.asFragment()).toMatchSnapshot();

    const button = elm.getByLabelText('Dark Mode Menu');
    openMenu(button);

    // second snapshot of open menu (fully transitioned)
    expect(elm.asFragment()).toMatchSnapshot();
  });

  // test it changes to system and dark mode
  it('updates dark mode when selecting a different option', () => {
    const elm = mountDarkModeDropdown();
    act(() => {
      jest.runAllTimers();
    });

    const button = elm.getByLabelText('Dark Mode Menu');
    openMenu(button);

    const darkModeSelections = elm.getAllByRole('menuitem');
    act(() => {
      darkModeSelections[1].click();
    });
    expect(darkModePref).toBe('dark-theme');
    const darkElm = mountDarkModeDropdown();
    act(() => {
      jest.runAllTimers();
    });
    expect(darkElm.asFragment()).toMatchSnapshot();
  });
});
