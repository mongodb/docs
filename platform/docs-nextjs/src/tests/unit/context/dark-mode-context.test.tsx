import { useContext } from 'react';
import { act, render } from '@testing-library/react';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import type { DarkModePref } from '@/context/dark-mode-context';
import {
  DARK_THEME_CLASSNAME,
  DarkModeContext,
  DarkModeContextProvider,
  LIGHT_THEME_CLASSNAME,
  SYSTEM_THEME_CLASSNAME,
} from '@/context/dark-mode-context';
import * as MediaHooks from '@/hooks/use-media';

// mock useMedia
jest.spyOn(MediaHooks, 'default').mockImplementation(() => false);

// mock window.localStorage
const storage: Record<string, string> = {};
jest.spyOn(window.localStorage.__proto__, 'setItem').mockImplementation(function (...args: unknown[]) {
  const [key, value] = args as [string, string];
  storage[key] = value;
});

const DARK_MODE_PREFERENCE_VARNAME = 'darkModePref';
const DARK_MODE_VARNAME = 'darkMode';
const TestConsumer = () => {
  const { darkModePref, setDarkModePref } = useContext(DarkModeContext);
  const { darkMode } = useDarkMode();

  const rotateDarkMode = () => {
    const darkModeClasses = [SYSTEM_THEME_CLASSNAME, LIGHT_THEME_CLASSNAME, DARK_THEME_CLASSNAME];
    const currIdx = darkModeClasses.findIndex((e) => e === darkModePref);
    setDarkModePref(
      currIdx > -1
        ? (darkModeClasses[currIdx + (1 % darkModeClasses.length)] as DarkModePref)
        : (darkModeClasses[0] as DarkModePref),
    );
  };

  return (
    <>
      {DARK_MODE_PREFERENCE_VARNAME}: {darkModePref}
      {DARK_MODE_VARNAME}: {darkMode}
      <button onClick={() => rotateDarkMode()}>Rotate</button>
    </>
  );
};

const renderContext = () =>
  render(
    <DarkModeContextProvider slug="test">
      <TestConsumer />
    </DarkModeContextProvider>,
  );

describe('Dark Mode Context', () => {
  it('reads from window.document class list and sets dark mode on load', () => {
    // mock document to have 'system light-theme' and check
    document.documentElement.classList.add(SYSTEM_THEME_CLASSNAME, LIGHT_THEME_CLASSNAME);
    let elm = renderContext();
    expect(elm.findByText(`${DARK_MODE_PREFERENCE_VARNAME}: ${SYSTEM_THEME_CLASSNAME}`)).toBeTruthy();
    expect(elm.findByText(`${DARK_MODE_VARNAME}: false`)).toBeTruthy();

    // mock document to have 'system dark-theme' and check
    document.documentElement.classList.remove(SYSTEM_THEME_CLASSNAME, LIGHT_THEME_CLASSNAME, DARK_THEME_CLASSNAME);
    document.documentElement.classList.add(SYSTEM_THEME_CLASSNAME, DARK_THEME_CLASSNAME);
    elm = renderContext();
    expect(elm.findByText(`${DARK_MODE_PREFERENCE_VARNAME}: ${SYSTEM_THEME_CLASSNAME}`)).toBeTruthy();
    expect(elm.findByText(`${DARK_MODE_VARNAME}: true`)).toBeTruthy();

    // mock document to have nothing and check
    document.documentElement.classList.remove(SYSTEM_THEME_CLASSNAME, LIGHT_THEME_CLASSNAME, DARK_THEME_CLASSNAME);
    elm = renderContext();
    expect(elm.findByText(`${DARK_MODE_PREFERENCE_VARNAME}: ${LIGHT_THEME_CLASSNAME}`)).toBeTruthy();
    expect(elm.findByText(`${DARK_MODE_VARNAME}: false`)).toBeTruthy();
  });

  it('updates local value and document class list when darkPref changes', async () => {
    // setDarkPref and watch for local value
    document.documentElement.classList.add(SYSTEM_THEME_CLASSNAME, LIGHT_THEME_CLASSNAME);
    const elm = renderContext();
    expect(elm.findByText(`${DARK_MODE_PREFERENCE_VARNAME}: ${SYSTEM_THEME_CLASSNAME}`)).toBeTruthy();
    expect(JSON.parse(storage['mongodb-docs'])['theme']).toBe(SYSTEM_THEME_CLASSNAME);
    const button = await elm.findByRole('button');
    await act(async () => button.click());
    expect(JSON.parse(storage['mongodb-docs'])['theme']).toBe(LIGHT_THEME_CLASSNAME);
    expect(elm.findByText(`${DARK_MODE_PREFERENCE_VARNAME}: ${LIGHT_THEME_CLASSNAME}`)).toBeTruthy();
    expect(document.documentElement.classList).toContain(LIGHT_THEME_CLASSNAME);
    expect(document.documentElement.classList).not.toContain(DARK_THEME_CLASSNAME);
  });

  it('updates LG dark mode prop when darkPref changes', async () => {
    const elm = renderContext();
    expect(elm.findAllByText(`${DARK_MODE_PREFERENCE_VARNAME}: ${LIGHT_THEME_CLASSNAME}`)).toBeTruthy();
    expect(elm.findAllByText(`${DARK_MODE_VARNAME}: ${false}`)).toBeTruthy();
    const button = await elm.findByRole('button');
    await act(async () => button.click());
    expect(elm.findAllByText(`${DARK_MODE_VARNAME}: ${true}`)).toBeTruthy();
  });
});
