'use client';

import type { ReactNode } from 'react';
import { Global, css as emotionCss } from '@emotion/react';
import { cx, css } from '@leafygreen-ui/emotion';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import { palette } from '@leafygreen-ui/palette';
import { theme } from '@/styles/theme';
import type { BaseTemplateProps } from '.';

const CONTENT_MAX_WIDTH = 1440;

// This must match the grid stylings in @/styles/mixins.module.scss
// If changes occur here, they must be changed there to keep the styles in sync.
// A mixin cannot be used here because Emotion doesn't support SCSS mixins.
export const gridStyling = `
// Use leftmost and rightmost grid columns as "margins" to allow the hero image
// to span across the page while remaining as part of the document flow
@media ${theme.screenSize.mediumAndUp} {
  grid-template-columns: ${`minmax(${theme.size.xlarge}, 1fr) repeat(12, minmax(0, ${
    CONTENT_MAX_WIDTH / 12
  }px)) minmax(${theme.size.xlarge}, 1fr);`};
}

@media ${theme.screenSize.upToMedium} {
  grid-template-columns: 48px repeat(12, 1fr) 48px;
}

@media ${theme.screenSize.upToSmall} {
  grid-template-columns: ${theme.size.large} 1fr ${theme.size.large};
}

@media ${theme.screenSize.upToXSmall} {
  grid-template-columns: ${theme.size.medium} 1fr ${theme.size.medium};
}
`;

const wrapperStyles = css`
  margin: 0 auto;
  width: 100%;

  & > section,
  & > section > section {
    display: grid;
    grid-column: 1 / -1;

    ${gridStyling};

    & > .card-group {
      @media ${theme.screenSize.mediumAndUp} {
        grid-column: 2 / -2 !important;
      }
      max-width: 1200px;
    }
  }
`;

// The Landing template exclusively represents mongodb.com/docs. All other landings use the ProductLanding template
const LandingTemplate = ({ children }: BaseTemplateProps & { children: ReactNode }) => {
  const { fontSize, screenSize, size } = theme;
  const { darkMode } = useDarkMode();
  return (
    <>
      <div>
        <main className={cx(wrapperStyles)}>{children}</main>
      </div>
      <Global
        styles={emotionCss`
          h1,
          h2,
          h3,
          h4 {
            color: ${darkMode ? palette.gray.light2 : palette.black};
          }

          h1,
          h2 {
            font-size: 32px;
            margin-bottom: ${size.default};
          }
          h2 {
            margin-top: ${size.large};
          }
          p {
            color: ${palette.black};
            font-size: ${fontSize.small};
            letter-spacing: normal;
            margin-bottom: ${size.default};
          }
          a {
            color: ${palette.blue.base};
            font-size: ${fontSize.small};
            letter-spacing: normal;
          }
          a:hover {
            text-decoration: none;
          }
          h1 {
            align-self: end;
            grid-column: 2 / 8;
            grid-row: 1 / 2;

            @media ${screenSize.upToMedium} {
              grid-column: 2 / 11;
            }

            @media ${screenSize.upToSmall} {
              grid-column: 2 / -2;
            }
          }
          main h1:first-of-type {
            color: ${palette.white};
            grid-column: 2/-1;
            margin-top: 44px;
            font-size: 48px;
            line-height: 62px;
            margin-bottom: 23px;
            align-self: end;
            @media ${screenSize.upToMedium} {
              font-size: 32px;
              line-height: 40px;
            }
          }
          ${
            '' /* :first-of-type selector used for precedence
            above LeafyGreen class selector */
          }
          main>section>section:first-of-type h2 {
            color: ${darkMode ? palette.gray.light2 : palette.gray.dark4};
            font-size: 32px;
            font-family: 'MongoDB Value Serif';
            font-weight: 400;
            margin-top: ${size.medium};
            margin-bottom: 0px;
          }
          .span-columns {
            grid-column: 3 / -3 !important;
            margin: ${size.xlarge} 0;
          }
          section > * {
            grid-column-start: 2;
            grid-column-end: 8;

            @media ${screenSize.upToMedium} {
              grid-column: 2 / -2;
            }
          }
          .hero-img {
            grid-column: 1 / -1;
            grid-row: 1 / 3;
            width: 100%;
            object-fit: cover;
            z-index: -1;
            object-position: right;
            height: 100%;

            @media ${screenSize.upTo2XLarge} {
              object-position: center;
            }
          }

          .introduction {
            grid-column: 2 / -4;
            grid-row: 2 / 3;
            p {
              color: ${palette.white};
            }

            @media ${screenSize.upToMedium} {
              grid-column: 2 / -2;
            }

            @media ${screenSize.xLargeAndUp} {
              grid-column: 2 / -4;
            }
          }
        `}
      />
    </>
  );
};

export default LandingTemplate;
