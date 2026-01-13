'use client';

import { cx, css } from '@leafygreen-ui/emotion';
import { palette } from '@leafygreen-ui/palette';
import { isString } from 'lodash';
import { theme } from '@/styles/theme';
import { useSnootyMetadata } from '@/utils/use-snooty-metadata';
import { usePageContext } from '@/context/page-context';
import { DEPRECATED_PROJECTS } from '@/components/contents';
import FeedbackRating from '@/components/widgets/feedback-widget';
import type { BaseTemplateProps } from '.';

export const CONTENT_MAX_WIDTH = 1200;

const formstyle = css`
  position: absolute;
  left: 0;
  bottom: 0;
  margin-top: ${theme.size.tiny};
  @media ${theme.screenSize.upToLarge} {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    overflow-y: auto;
  }
`;

const formContainer = css`
  position: relative;
  @media ${theme.screenSize.tablet} {
    z-index: 1;
  }
`;

const hrStyling = css`
  border-color: ${palette.gray.light2};
  margin: ${theme.size.medium} ${theme.size.xlarge};
`;

const ratingStyling = css`
  margin: 0px ${theme.size.xlarge};
`;

const guidesStyles = css`
  & > section {
    h1 {
      @media ${theme.screenSize.mediumAndUp} {
        color: ${palette.white};
      }
    }

    > .introduction p {
      @media ${theme.screenSize.mediumAndUp} {
        color: ${palette.white};
      }
    }
  }
`;

const notGuidesStyles = css`
  margin: 0 auto ${theme.size.xlarge} auto;

  & > section > .hero-img {
    margin-bottom: ${theme.size.large};
  }
`;

const hasBannerStyles = css`
  & > section {
    grid-template-rows: [banner] auto [header] auto [introduction] auto [kicker] auto;
  }
`;

// Light-colored hero styling
const hasLightHeroStyles = css`
  @media ${theme.screenSize.mediumAndUp} {
    h1 {
      color: ${palette.black};
    }

    .introduction > p:first-of-type {
      color: ${palette.black};
    }
  }
`;

const maxWidthParagraphsStyles = css`
  section p {
    max-width: 500px;
  }
`;

const wrapperStyles = css`
  width: 100%;

  h1 {
    color: var(--font-color-primary);
  }

  h2 {
    margin-top: ${theme.size.small};
    margin-bottom: ${theme.size.small};
  }

  h3 {
    font-weight: 600;
    font-size: 16px;
    line-height: 28px;
    margin-bottom: 8px;
  }

  section {
    max-width: 100%;
  }

  section p {
    grid-column: 2;
  }

  section p > a {
    letter-spacing: 0.5px;
    :hover {
      text-decoration: none;
    }
  }

  & > section {
    display: grid;
    // Create columns such that the 2 outer ones act like margins.
    // This will allow the hero image to span across the whole content while still being a part
    // of the DOM flow.
    grid-template-columns: minmax(${theme.size.xlarge}, 1fr) repeat(2, minmax(0, ${CONTENT_MAX_WIDTH / 2}px)) minmax(
        ${theme.size.xlarge},
        1fr
      );
    grid-template-rows: [header] auto [introduction] auto [kicker] auto;

    @media ${theme.screenSize.upToLarge} {
      grid-template-columns: 48px 1fr 48px;
    }

    @media ${theme.screenSize.upToMedium} {
      grid-template-columns: ${theme.size.medium} 1fr ${theme.size.medium};
    }

    [role='alert'] {
      grid-column: 2 / 4;
      grid-row: banner;
      align-items: center;
    }

    h1 {
      align-self: end;
      grid-column: 2;
      grid-row: header;
    }

    > img,
    > .gatsby-image-wrapper {
      display: block;
      grid-column: 2;
      margin-top: auto;
      max-width: 600px;
      width: 100%;

      @media ${theme.screenSize.largeAndUp} {
        grid-column: 3;
        grid-row: header/span 2;
      }
    }

    > .hero-img {
      grid-column: 1 / -1;
      grid-row: header / kicker;
      height: 310px;
      max-width: 100%;
      object-fit: cover;
      z-index: -1;

      @media ${theme.screenSize.upToMedium} {
        object-position: 100%;
        grid-row: unset;
      }

      @media ${theme.screenSize.upToSmall} {
        grid-row: unset;
        height: 200px;
      }
    }

    > .introduction {
      grid-column: 2;
      grid-row: introduction;
    }

    > .chapters {
      grid-column: 1 / -1;
    }

    // Sub-sections should use all but the outer columns.
    > section {
      grid-column: 2 / -2 !important;
      overflow: hidden;
    }
    // Card-groups may occasionally not be nested within sections (see: Realm
    // PLP) but should be constrained to the inner columns regardless
    .card-group {
      grid-column: 2 / -2 !important;
    }
  }
`;

const REALM_LIGHT_HERO_PAGES = ['index.txt'];

const ProductLandingTemplate = ({ children }: BaseTemplateProps) => {
  const { page, options: pageOptions, hasBanner } = usePageContext();
  const { project } = useSnootyMetadata();
  const isGuides = project === 'guides';
  const isRealm = project === 'realm';
  const hasMaxWidthParagraphs =
    pageOptions && isString(pageOptions?.['pl-max-width-paragraphs'])
      ? ['', 'true'].includes(pageOptions['pl-max-width-paragraphs'])
      : false;
  const hasLightHero = page && isRealm && REALM_LIGHT_HERO_PAGES.includes(page.fileid);

  return (
    <main
      className={cx(
        wrapperStyles,
        isGuides ? guidesStyles : notGuidesStyles,
        hasLightHero && hasLightHeroStyles,
        !hasMaxWidthParagraphs && maxWidthParagraphsStyles,
        hasBanner && hasBannerStyles,
        'product-landing-template',
      )}
    >
      {children}
      {!DEPRECATED_PROJECTS.includes(project) && (
        <>
          <hr className={cx(hrStyling)} />
          <div className={cx(ratingStyling)}>
            <FeedbackRating className={formstyle} classNameContainer={formContainer} position="body" />
          </div>
        </>
      )}
    </main>
  );
};

export default ProductLandingTemplate;
