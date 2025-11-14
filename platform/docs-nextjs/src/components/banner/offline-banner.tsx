import LeafyBanner from '@leafygreen-ui/banner';
import { cx } from '@leafygreen-ui/emotion';
import Link from '@/components/link';
import { assertTrailingSlash } from '@/utils/assert-trailing-slash';
import type { PageTemplateType } from '@/context/page-context';
import { baseBannerStyle, offlineBannerStyle, offlineBannerContainerStyle } from './styles/banner-item-style';

interface OfflineBannerProps {
  linkUrl?: string;
  template?: PageTemplateType;
}

const OfflineBanner = ({ linkUrl = 'https://mongodb.com/docs/', template = 'document' }: OfflineBannerProps) => {
  return (
    <div className={cx(offlineBannerContainerStyle({ template }))}>
      <LeafyBanner className={cx(baseBannerStyle, offlineBannerStyle({ template }))} variant={'warning'}>
        You are viewing an offline version of MongoDB documentation. Some page features might be unavailable. To view
        the latest version of the page or use interactive features, visit the&nbsp;
        <Link to={assertTrailingSlash(linkUrl)}>live page.</Link>
      </LeafyBanner>
    </div>
  );
};

export default OfflineBanner;
