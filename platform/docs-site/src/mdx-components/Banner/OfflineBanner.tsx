import { clsx } from 'clsx';
import { Banner as ViaBanner, BannerVariant as ViaBannerVariant } from '@via-ds/components/banner';
import { Link } from '@/mdx-components/Link';
import { Text } from '@via-ds/components/typography';
import { assertTrailingSlash } from '@/utils/assert-trailing-slash';
import type { PageTemplateType } from '@/context/page-context';
import bannerStyles from './banner.module.scss';
import styles from './offline-banner.module.scss';

interface OfflineBannerProps {
  linkUrl?: string;
  template?: PageTemplateType;
}

export const OfflineBanner = ({ linkUrl = 'https://mongodb.com/docs/', template = 'document' }: OfflineBannerProps) => {
  return (
    <div className={clsx(template === 'product-landing' && styles.productLandingContainer)}>
      <ViaBanner
        className={clsx(bannerStyles.base, styles.offline, template !== 'instruqt' && styles.centered)}
        variant={ViaBannerVariant.Warning}
      >
        <Text>
          You are viewing an offline version of MongoDB documentation. Some page features might be unavailable. To view
          the latest version of the page or use interactive features, visit the&nbsp;
          <Link to={assertTrailingSlash(linkUrl)}>live page.</Link>
        </Text>
      </ViaBanner>
    </div>
  );
};
