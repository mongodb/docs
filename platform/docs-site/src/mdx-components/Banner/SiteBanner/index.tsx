import { clsx } from 'clsx';
import type { CSSProperties } from 'react';
import { Badge, BadgeVariant } from '@via-ds/components/badge';
import type { SiteBannerContent } from './types';
import { BrandingShape } from './BrandingShape';
import { useSiteBanner } from '../../SiteBannerProvider';
import styles from './site-banner.module.scss';

const backgroundStyle = (bannerContent: Partial<SiteBannerContent>): CSSProperties =>
  ({
    '--site-banner-img': bannerContent.imgPath ? `url(${bannerContent.imgPath})` : 'none',
    '--site-banner-tablet-img': bannerContent.tabletImgPath ? `url(${bannerContent.tabletImgPath})` : 'none',
    '--site-banner-mobile-img': bannerContent.mobileImgPath ? `url(${bannerContent.mobileImgPath})` : 'none',
    ...(bannerContent.bgColor ? { '--site-banner-bg': bannerContent.bgColor } : {}),
  } as CSSProperties);

export const SiteBanner = () => {
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
      className={clsx(bannerClassName, smartlingClassNames, styles.bannerContainer)}
      href={bannerData.url}
      title={bannerData.altText}
    >
      <div
        className={styles.bannerContent}
        style={backgroundStyle({
          imgPath: bannerData.imgPath,
          tabletImgPath: bannerData.tabletImgPath ?? bannerData.mobileImgPath,
          mobileImgPath: bannerData.mobileImgPath,
          bgColor: bannerData.bgColor,
        })}
      >
        {bannerData.text && (
          <>
            <span className={clsx(smartlingClassNames, styles.bannerText)}>{bannerData.text}</span>
            <div className={styles.pillContainer}>
              <div className={styles.brandingContainer}>
                <BrandingShape />
              </div>
              {bannerData.pillText && (
                <Badge
                  className={clsx(smartlingClassNames, styles.pill)}
                  variant={BadgeVariant.Info}
                >
                  {bannerData.pillText}
                </Badge>
              )}
            </div>
          </>
        )}
      </div>
    </a>
  );
};
