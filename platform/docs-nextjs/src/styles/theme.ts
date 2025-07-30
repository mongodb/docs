const fontSize = {
  xsmall: '11px',
  tiny: '12px',
  small: '13px',
  default: '16px',
  h1: '36px',
  h2: '24px',
  h3: '18px',
  h4: '16px',
};

const size = {
  tiny: '4px',
  small: '8px',
  default: '16px',
  medium: '24px',
  large: '32px',
  xlarge: '64px',
  xxlarge: '128px',
  maxWidth: '1400px',
  stripUnit(unit: string): number {
    return parseInt(unit, 10);
  },
};

/**
 * store common responsive sizes as numbers
 */
const breakpoints = {
  xSmall: 320,
  small: 480,
  medium: 767,
  large: 1024,
  xLarge: 1200,
  xxLarge: 1440,
  xxxLarge: 1920,
};

/**
 * store common responsive sizes
 */
const screenSize = {
  upToXSmall: `only screen and (max-width: ${breakpoints.xSmall}px)`,
  xSmallAndUp: `not all and (max-width: ${breakpoints.xSmall}px)`,
  upToSmall: `only screen and (max-width: ${breakpoints.small}px)`,
  smallAndUp: `not all and (max-width: ${breakpoints.small}px)`,
  upToMedium: `only screen and (max-width: ${breakpoints.medium}px)`,
  mediumAndUp: `not all and (max-width: ${breakpoints.medium}px)`,
  upToLarge: `only screen and (max-width: ${breakpoints.large}px)`,
  largeAndUp: `not all and (max-width: ${breakpoints.large}px)`,
  upToXLarge: `only screen and (max-width: ${breakpoints.xLarge}px)`,
  xLargeAndUp: `not all and (max-width: ${breakpoints.xLarge}px)`,
  upTo2XLarge: `only screen and (max-width: ${breakpoints.xxLarge}px)`,
  '2XLargeAndUp': `not all and (max-width: ${breakpoints.xxLarge}px)`,
  upTo3XLarge: `only screen and (max-width: ${breakpoints.xxxLarge}px)`,
  '3XLargeAndUp': `not all and (max-width: ${breakpoints.xxxLarge}px)`,
  tablet: `only screen and (min-width: ${breakpoints.small + 1}px) and (max-width: ${breakpoints.large}px)`,
};

const header = {
  bannerHeight: '40px',
  navbarHeight: '95px',
  navbarMobileHeight: '56px',
  docsMobileMenuHeight: '52px',
  // used for scrolling elements into place, considering sticky header
  navbarScrollOffset: '85px',
  actionBarMobileHeight: '60px',
  composableDesktopHeight: '90px',
  composableMobileHeight: '190px',
};

const widgets = {
  buttonContainerMobileHeight: '60px',
};

const transitionSpeed = {
  iaExit: '100ms',
  iaEnter: '200ms',
  contentFade: '300ms',
};

// z-indexes for topmost major elements on the site. Subcomponents should have their own z-indexes set
const zIndexes = {
  content: 1,
  actionBar: 800,
  sidenav: 900,
  header: 1000,
  widgets: 2000,
  popovers: 10000,
};

// media queries that define system color preference
const colorPreference = {
  dark: '(prefers-color-scheme: dark)',
  light: '(prefers-color-scheme: light)',
  auto: '(prefers-color-scheme: auto)',
};

export const theme = {
  breakpoints,
  fontSize,
  header,
  widgets,
  screenSize,
  size,
  transitionSpeed,
  zIndexes,
  colorPreference,
};
