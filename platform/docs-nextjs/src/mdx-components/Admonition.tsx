'use client';

import Callout, { Variant } from '@leafygreen-ui/callout';
import { cx, css } from '@leafygreen-ui/emotion';
import { Theme } from '@leafygreen-ui/lib';
import { palette } from '@leafygreen-ui/palette';
import { theme } from '@/styles/theme';
import { sharedDarkModeOverwriteStyles } from '@/components/link';
import { admonitionMap } from '@/mdx-components/Admonition/constants';

export type AdmonitionName = 'tip' | 'note' | 'important' | 'warning' | 'example';

/* Copied straight from LG Callout.styles.ts */
const calloutColor = {
  [Theme.Dark]: {
    [Variant.Note]: {
      headerText: palette.blue.light2,
      bar: palette.blue.light1,
    },
    [Variant.Tip]: {
      headerText: palette.purple.light2,
      bar: palette.purple.base,
    },
    [Variant.Important]: {
      headerText: palette.yellow.light2,
      bar: palette.yellow.base,
    },
    [Variant.Warning]: {
      headerText: palette.red.light1,
      bar: palette.red.light1,
    },
    [Variant.Example]: {
      headerText: palette.gray.light1,
      bar: palette.gray.light1,
    },
  },
  [Theme.Light]: {
    [Variant.Note]: {
      headerText: palette.blue.dark1,
      bar: palette.blue.base,
    },
    [Variant.Tip]: {
      headerText: palette.purple.dark2,
      bar: palette.purple.base,
    },
    [Variant.Important]: {
      headerText: palette.yellow.dark2,
      bar: palette.yellow.base,
    },
    [Variant.Warning]: {
      headerText: palette.red.dark2,
      bar: palette.red.base,
    },
    [Variant.Example]: {
      headerText: palette.gray.dark1,
      bar: palette.gray.dark1,
    },
  },
};

/* Overwritten to mitigate light mode flash for dark mode preferred users */
const colorStyles = (variant: Variant) => {
  const { headerText: lightHeaderText, bar: lightBar } = calloutColor[Theme.Light][variant];
  const { headerText: darkHeaderText, bar: darkBar } = calloutColor[Theme.Dark][variant];

  return css`
    h2 {
      color: ${lightHeaderText};
    }
    :after {
      background-color: ${lightBar};
    }

    .dark-theme & {
      h2 {
        color: ${darkHeaderText};
      }
      :after {
        background-color: ${darkBar};
      }
    }
  `;
};

const admonitionStyles = css`
  margin-top: ${theme.size.medium};
  margin-bottom: ${theme.size.medium};

  p,
  li::marker {
    color: var(--font-color-primary);
  }
  // added specificity to have precedence
  p > a[class^='leafy'] {
    ${sharedDarkModeOverwriteStyles}
  }
  > li:last-of-type,
  > ul:last-of-type,
  > ol:last-of-type,
  > li:last-of-type > p,
  > p:last-of-type {
    margin-bottom: 0px;
  }
`;

export type AdmonitionProps = {
  children: React.ReactNode;
  /** Optional title (plain text). Passed from MDX layer. */
  title?: string;
  name: AdmonitionName;
};

export const Admonition = ({ children, title, name }: AdmonitionProps) => {
  const variant = admonitionMap[name] || Variant.Note;

  return (
    <Callout className={cx([admonitionStyles, colorStyles(variant)])} title={title} variant={variant} baseFontSize={16}>
      {children}
    </Callout>
  );
};
