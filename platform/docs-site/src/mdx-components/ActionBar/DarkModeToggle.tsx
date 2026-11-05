'use client';

import { useContext } from 'react';
import { Button, ButtonVariant } from '@via-ds/components/button';
import { Tooltip, TooltipRoot, TooltipTrigger } from '@via-ds/components/tooltip';
import { Align, Side } from '@via-ds/components/types';
import Moon from '@via-ds/icons/Moon';
import Sun from '@via-ds/icons/Sun';
import type { DarkModePref } from '@/context/dark-mode-context';
import { DarkModeContext } from '@/context/dark-mode-context';
import useMedia from '@/hooks/use-media';
import { theme } from '@/styles/theme';
import { reportAnalytics } from '@/utils/report-analytics';
import { currentScrollPosition } from '@/utils/current-scroll-position';

const DarkModeToggle = () => {
  const { setDarkModePref, isDarkMode } = useContext(DarkModeContext);
  const systemDark = useMedia(theme.colorPreference.dark);
  const overridingSystem = isDarkMode !== systemDark;
  const label = overridingSystem
    ? `Follow system theme (${systemDark ? 'dark' : 'light'})`
    : `Switch to ${isDarkMode ? 'light' : 'dark'} theme`;

  const toggle = () => {
    let next: DarkModePref = 'system';
    if (!overridingSystem) next = systemDark ? 'light-theme' : 'dark-theme';
    reportAnalytics('Click', {
      position: 'secondary nav',
      position_context: 'dark mode menu',
      label: next,
      scroll_position: currentScrollPosition(),
      tagbook: 'true',
    });
    setDarkModePref(next);
  };

  return (
    <TooltipRoot side={Side.Bottom} align={Align.End}>
      <TooltipTrigger>
        <Button variant={ButtonVariant.Tertiary} aria-label={label} onPress={toggle}>
          {isDarkMode ? <Moon /> : <Sun />}
        </Button>
      </TooltipTrigger>
      <Tooltip>{label}</Tooltip>
    </TooltipRoot>
  );
};

export { DarkModeToggle };
