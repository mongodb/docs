import { palette } from '@leafygreen-ui/palette';
import { css, cx } from '@leafygreen-ui/emotion';
import { theme } from '@/styles/theme';
import type { SiteBannerContent } from './types';
import BrandingShape from './branding-shape';
import { useSiteBanner } from './banner-context';

const bannerContainerStyle = css`
  display: block;
  height: ${theme.header.bannerHeight};
  width: 100%;
  position: absolute;
  z-index: ${theme.zIndexes.header};
  color: white;
  text-decoration: none;
`;

const bannerContentStyle = (bannerContent: Partial<SiteBannerContent>) => css`
  background-image: url(${bannerContent.imgPath});
  background-position: center;
  background-size: cover;
  ${bannerContent.bgColor && `background-color: ${bannerContent.bgColor};`}
  height: 100%;
  display: flex;
  justify-content: center;
  gap: 20px;
  padding: 0 11px;
  font-size: ${theme.fontSize.small};
  line-height: 20px;

  @media ${theme.screenSize.upToMedium} {
    background-image: url(${bannerContent.tabletImgPath});
    justify-content: space-between;
  }

  @media ${theme.screenSize.upToSmall} {
    background-image: url(${bannerContent.mobileImgPath});
    font-size: ${theme.fontSize.xsmall};
  }
`;

const bannerTextStyle = css`
  align-self: center;
  max-height: 40px;
`;

const pillContainer = css`
  display: grid;
  justify-items: center;
  align-items: center;
`;

// Forces components to be in the same cell to create an overlap
const gridCell = css`
  grid-row: 1;
  grid-column: 1;
`;

const brandingContainer = css`
  ${gridCell}
  height: 40px;
`;

const pillStyle = css`
  ${gridCell}
  color: ${palette.green.dark3};
  font-weight: 600;
  line-height: 16px;
  font-size: ${theme.fontSize.tiny};
  background-color: ${palette.green.base};
  border: 1px solid ${palette.green.dark2};
  border-radius: 6px;
  height: 22px;
  padding: 3px 8px;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SiteBanner = () => {
  const { bannerData } = useSiteBanner();
  if (!(bannerData?.url && (bannerData.imgPath || bannerData.text))) {
    return null;
  }

  // Ensure Smartling doesn't translate the banner or rewrite anything
  const smartlingClassNames = 'sl_opaque notranslate';
  // Backup class name in case Smartling needs to target the whole element
  const bannerClassName = 'site-banner';

  return (
    <a
      className={cx(bannerClassName, smartlingClassNames, bannerContainerStyle)}
      href={bannerData.url}
      title={bannerData.altText}
    >
      <div
        className={bannerContentStyle({
          imgPath: bannerData.imgPath,
          tabletImgPath: bannerData.tabletImgPath ?? bannerData.mobileImgPath,
          mobileImgPath: bannerData.mobileImgPath,
          bgColor: bannerData.bgColor,
        })}
      >
        {bannerData.text && (
          <>
            <span className={cx(smartlingClassNames, bannerTextStyle)}>{bannerData.text}</span>
            <div className={pillContainer}>
              <div className={brandingContainer}>
                <BrandingShape />
              </div>
              {bannerData.pillText && <span className={cx(smartlingClassNames, pillStyle)}>{bannerData.pillText}</span>}
            </div>
          </>
        )}
      </div>
    </a>
  );
};

export default SiteBanner;
