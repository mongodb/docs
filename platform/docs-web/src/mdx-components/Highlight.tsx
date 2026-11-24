'use client';

import { cx, css } from '@leafygreen-ui/emotion';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import { palette } from '@leafygreen-ui/palette';
import { Theme } from '@leafygreen-ui/lib';
import React from 'react';

export type HighlightColor = 'blue' | 'green' | 'red' | 'yellow';

const colorMap: Record<Theme, Record<HighlightColor, string>> = {
  [Theme.Light]: {
    blue: palette.blue.light3,
    green: palette.green.light3,
    red: palette.red.light3,
    yellow: palette.yellow.light3,
  },
  [Theme.Dark]: {
    blue: palette.blue.dark2,
    green: palette.green.dark3,
    red: palette.red.dark3,
    yellow: palette.yellow.dark3,
  },
};

export type HighlightProps = {
  children: React.ReactNode;
  color: HighlightColor;
};

export const highlightStyles = (backgroundColor?: string) => css`
  background-color: ${backgroundColor};
`;

export const Highlight = ({ children, color }: HighlightProps) => {
  const { darkMode } = useDarkMode();
  const colorTheme = darkMode ? Theme.Dark : Theme.Light;

  const highlightColor = colorMap[colorTheme][color];

  if (!highlightColor) {
    console.warn(`Highlight color must be 'blue', 'green', 'red', or 'yellow'.`);
  }

  return <span className={cx([highlightStyles(highlightColor)])}>{children}</span>;
};
