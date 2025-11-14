import { css } from '@leafygreen-ui/emotion';
import { theme } from '@/styles/theme';
import { CONTENT_MAX_WIDTH } from '@/components/templates/product-landing';
import type { PageTemplateType } from '@/context/page-context';
import { palette } from '@leafygreen-ui/palette';

export const baseBannerStyle = css`
  margin: ${theme.size.default} 0;

  /* Add margins below all child elements in the banner */
  & > div > div > * {
    margin: 0 0 12px;
  }

  & > div > div > *:last-child {
    margin: 0;
  }

  /* Remove margins on individual paragraphs */
  p {
    margin: 0;
  }

  /* Force all content to be 13px in banners */
  font-size: ${theme.fontSize.small};

  p,
  a {
    font-size: ${theme.fontSize.small};
  }

  a {
    &:hover {
      text-underline-offset: 3px;
    }
  }
`;

interface BannerStyleProps {
  template: PageTemplateType;
}

export const offlineBannerStyle = ({ template }: BannerStyleProps) => css`
  max-width: ${CONTENT_MAX_WIDTH}px;
  ${template !== 'instruqt' &&
  `margin-left: auto;
  margin-right: auto;`}
`;

export const offlineBannerContainerStyle = ({ template }: BannerStyleProps) => {
  return css`
    ${template === 'product-landing' &&
    `
    display: grid;
    grid-template-columns: minmax(64px, 1fr) repeat(1, minmax(0, ${CONTENT_MAX_WIDTH}px)) minmax(64px, 1fr);

    @media ${theme.screenSize.upToLarge} {
      grid-template-columns: 48px 1fr 48px;
    }

    @media ${theme.screenSize.upToMedium} {
      grid-template-columns: ${theme.size.medium} 1fr ${theme.size.medium};
    }

    > [role=alert] {
      grid-column: 2/2;
    }
  `}
  `;
};

export const styleMapLight = {
  info: {
    backgroundColor: palette.blue.light3,
    color: palette.blue.dark2,
    borderColor: palette.blue.light2,
    linkColor: palette.blue.dark3,
    beforeColor: palette.blue.base,
    iconColor: palette.blue.base,
  },
  warning: {
    backgroundColor: palette.yellow.light3,
    color: palette.yellow.dark2,
    borderColor: palette.yellow.light2,
    linkColor: palette.yellow.dark3,
    beforeColor: palette.yellow.base,
    iconColor: palette.yellow.dark2,
  },
  danger: {
    backgroundColor: palette.red.light3,
    color: palette.red.dark2,
    borderColor: palette.red.light2,
    linkColor: palette.red.dark3,
    beforeColor: palette.red.base,
    iconColor: palette.red.base,
  },
};
export const styleMapDark = {
  info: {
    backgroundColor: palette.blue.dark3,
    color: palette.blue.light2,
    borderColor: palette.blue.dark2,
    linkColor: palette.blue.light3,
    beforeColor: palette.blue.light1,
    iconColor: palette.blue.light1,
  },
  warning: {
    backgroundColor: palette.yellow.dark3,
    color: palette.yellow.light2,
    borderColor: palette.yellow.dark2,
    linkColor: palette.yellow.light3,
    beforeColor: palette.yellow.dark2,
    iconColor: palette.yellow.base,
  },
  danger: {
    backgroundColor: palette.red.dark3,
    color: palette.red.light2,
    borderColor: palette.red.dark2,
    linkColor: palette.red.light3,
    beforeColor: palette.red.base,
    iconColor: palette.red.light1,
  },
};
