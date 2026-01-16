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
import { setLocalValue, getLocalValue } from '@/utils/browser-storage';
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

  // Initialize state by reading from document classList (set by script) or localStorage
  const [darkModePref, setDarkModePref] = useState<DarkModePref>(() => {
    if (!isBrowser) return 'light-theme';

    const classList = window?.document?.documentElement?.classList;
    if (classList) {
      if (classList.contains(SYSTEM_THEME_CLASSNAME)) {
        return SYSTEM_THEME_CLASSNAME;
      }
      if (classList.contains(DARK_THEME_CLASSNAME)) {
        return DARK_THEME_CLASSNAME;
      }
      if (classList.contains(LIGHT_THEME_CLASSNAME)) {
        return LIGHT_THEME_CLASSNAME;
      }
    }

    // Fallback to localStorage if classList doesn't have theme classes yet
    const storedTheme = getLocalValue('theme') as DarkModePref | undefined;
    if (storedTheme && ['light-theme', 'dark-theme', 'system'].includes(storedTheme)) {
      return storedTheme;
    }

    return 'light-theme';
  });

  const loaded = useRef<boolean>(false);
  const initializedFromScript = useRef<boolean>(false);
  const hasSyncedFromScript = useRef<boolean>(false);

  // update document class list to apply dark-theme/light-theme to whole document
  const updateDocumentClasslist = useCallback((darkModePref: DarkModePref, darkPref: boolean) => {
    if (!isBrowser || !docClassList) return;

    // Check if document already has the correct classes (set by script)
    const hasCorrectPref = docClassList.contains(darkModePref);
    if (darkModePref === 'system') {
      const expectedThemeClass = darkPref ? DARK_THEME_CLASSNAME : LIGHT_THEME_CLASSNAME;
      const hasCorrectSystem = hasCorrectPref && docClassList.contains(expectedThemeClass);
      if (hasCorrectSystem) {
        // Document already has correct classes, don't modify
        return;
      }
    } else if (hasCorrectPref && !docClassList.contains(SYSTEM_THEME_CLASSNAME)) {
      // Document already has the correct non-system theme, don't modify
      return;
    }

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

  // On mount: check if script already set the theme and sync state
  useEffect(() => {
    if (!isBrowser || !docClassList) return;

    // Check if script has already set theme classes
    const hasSystem = docClassList.contains(SYSTEM_THEME_CLASSNAME);
    const hasDark = docClassList.contains(DARK_THEME_CLASSNAME);
    const hasLight = docClassList.contains(LIGHT_THEME_CLASSNAME);

    if (hasSystem || hasDark || hasLight) {
      initializedFromScript.current = true;

      // Read from document classList and sync state if it differs
      const currentTheme = hasSystem ? SYSTEM_THEME_CLASSNAME : hasDark ? DARK_THEME_CLASSNAME : LIGHT_THEME_CLASSNAME;

      // Only update state if different (don't update document, script already did)
      if (currentTheme !== darkModePref) {
        hasSyncedFromScript.current = true;
        setDarkModePref(currentTheme);
      }
    } else {
      // Script hasn't run yet or didn't set classes, initialize from localStorage
      const storedTheme = getLocalValue('theme') as DarkModePref | undefined;
      if (storedTheme && ['light-theme', 'dark-theme', 'system'].includes(storedTheme)) {
        if (storedTheme !== darkModePref) {
          setDarkModePref(storedTheme);
          // Update document since script didn't set it
          updateDocumentClasslist(storedTheme, darkPref);
        }
      }
    }

    loaded.current = true;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // save to local value when darkmode changes, besides initial load
  // also updates document classlist if darkModePref or darkPref changes
  useEffect(() => {
    if (!loaded.current) {
      loaded.current = true;
      return;
    }
    updateDocumentClasslist(darkModePref, darkPref);

    // Do not save light mode preference to localStorage if on light-mode-only page
    // Skip updating document if we just synced from script (script already set it correctly)
    if (hasSyncedFromScript.current && initializedFromScript.current) {
      hasSyncedFromScript.current = false; // Reset flag after first skip
      setLocalValue('theme', darkModePref); // Still save to localStorage
      return;
    }

    // Update document for user-initiated changes or if script didn't initialize
    updateDocumentClasslist(darkModePref, darkPref);
    setLocalValue('theme', darkModePref);
  }, [darkModePref, updateDocumentClasslist, darkPref]);

  return (
    <DarkModeContext.Provider value={{ setDarkModePref, darkModePref, isDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
};

export { DarkModeContext, DarkModeContextProvider };
