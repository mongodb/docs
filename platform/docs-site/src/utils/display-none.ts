import { css } from '@emotion/react';
import { theme } from '@/styles/theme';

const mediaQuery = (size: string) => {
  return css`
    @media ${size} {
      display: none !important;
    }
  `;
};

// Add "display: none" to a component's css based on size for media query
export const displayNone = {
  onMobile: mediaQuery(theme.screenSize.upToSmall),
  onLargerThanMobile: mediaQuery(theme.screenSize.smallAndUp),
  onMedium: mediaQuery(theme.screenSize.upToMedium),
  onLargerThanMedium: mediaQuery(theme.screenSize.mediumAndUp),
  onLargerThanTablet: mediaQuery(theme.screenSize.largeAndUp),
  onMobileAndTablet: mediaQuery(theme.screenSize.upToLarge),
};
