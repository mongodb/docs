'use client';

/**
 * Context to dictate dark mode UI for rest of page
 * Should be on top level, and dictates LG Provider Context
 * which in turn controls all UI elements within the page
 * https://github.com/mongodb/leafygreen-ui/blob/main/STYLEGUIDE.md#consuming-darkmode-from-leafygreenprovider
 */

import type { ReactNode } from 'react';
import { createContext, useMemo, useEffect, useRef, useState, useCallback } from 'react';
import useMedia from '@/hooks/use-media';
import { setLocalValue } from '@/utils/browser-storage';
import { isBrowser } from '@/utils/is-browser';
import { theme } from '@/styles/theme';

export type DarkModePref = 'light-theme' | 'dark-theme' | 'system';

interface DarkModeContextType {
  darkModePref: DarkModePref;
  setDarkModePref: React.Dispatch<React.SetStateAction<DarkModePref>>;
  isDarkMode: boolean;
}

const DarkModeContext = createContext<DarkModeContextType>({
  darkModePref: 'light-theme',
  setDarkModePref: () => {},
  isDarkMode: false,
});

export const DARK_THEME_CLASSNAME = 'dark-theme';
export const LIGHT_THEME_CLASSNAME = 'light-theme';
export const SYSTEM_THEME_CLASSNAME = 'system';

export type DarkModeContextProviderProps = { children: ReactNode };

const DarkModeContextProvider = ({ children }: DarkModeContextProviderProps) => {
  const docClassList = useMemo(() => isBrowser && window?.document?.documentElement?.classList, []);
  const [darkModePref, setDarkModePref] = useState<DarkModePref>(() => 'light-theme');
  const loaded = useRef<boolean>();

  // update document class list to apply dark-theme/light-theme to whole document
  const updateDocumentClasslist = useCallback((darkModePref: DarkModePref, darkPref: boolean) => {
    if (!isBrowser || !docClassList) return;
    docClassList.add(darkModePref);
    const removeClassnames = new Set([LIGHT_THEME_CLASSNAME, DARK_THEME_CLASSNAME, SYSTEM_THEME_CLASSNAME]);
    removeClassnames.delete(darkModePref);
    if (darkModePref === 'system') {
      const themeClass = darkPref ? DARK_THEME_CLASSNAME : LIGHT_THEME_CLASSNAME;
      docClassList.add(themeClass);
      removeClassnames.delete(themeClass);
    }
    for (const className of removeClassnames) {
      if (className !== darkModePref) docClassList.remove(className);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const darkPref = useMedia(theme.colorPreference.dark);

  // Calculate the actual dark mode state
  const isDarkMode = useMemo(() => {
    return darkModePref === DARK_THEME_CLASSNAME || (darkModePref === SYSTEM_THEME_CLASSNAME && darkPref);
  }, [darkModePref, darkPref]);

  // save to local value when darkmode changes, besides initial load
  // also updates document classlist if darkModePref or darkPref changes
  useEffect(() => {
    if (!loaded.current) {
      loaded.current = true;
      return;
    }
    updateDocumentClasslist(darkModePref, darkPref);

    // Do not save light mode preference to localStorage if on light-mode-only page
    setLocalValue('theme', darkModePref);
  }, [darkModePref, updateDocumentClasslist, darkPref]);

  useEffect(() => {
    if (!isBrowser || !docClassList) return;

    // NOTE: client side read of darkmode from document classnames
    // which is derived from local storage (see gatsby-ssr script).
    // This occurs after component mounts, not during build time
    setDarkModePref(
      docClassList.contains(SYSTEM_THEME_CLASSNAME)
        ? SYSTEM_THEME_CLASSNAME
        : docClassList.contains(DARK_THEME_CLASSNAME)
        ? DARK_THEME_CLASSNAME
        : LIGHT_THEME_CLASSNAME,
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <DarkModeContext.Provider value={{ setDarkModePref, darkModePref, isDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
};

export { DarkModeContext, DarkModeContextProvider };
