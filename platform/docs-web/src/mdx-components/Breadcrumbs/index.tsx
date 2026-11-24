'use client';

import { css, cx } from '@leafygreen-ui/emotion';
import { palette } from '@leafygreen-ui/palette';
import { theme } from '@/styles/theme';
import { useProcessedUnifiedToc } from '@/hooks/use-processed-unified-toc';
import { usePageBreadcrumbs } from '@/hooks/use-create-breadcrumbs';
import BreadcrumbContainer from './breadcrumb-container';
import { useVersionContext } from '@/context/version-context';
import { usePageContext } from '@/context/page-context';

const breadcrumbBodyStyle = css`
  font-size: ${theme.fontSize.small};
  --breadcrumb-color: ${palette.gray.dark1};
  .dark-theme & {
    --breadcrumb-color: ${palette.gray.light1};
  }

  a,
  span {
    color: var(--breadcrumb-color);
  }
`;

const Breadcrumbs = () => {
  const { slug } = usePageContext();
  const { siteBasePrefixWithVersion } = useVersionContext();
  const tocTree = useProcessedUnifiedToc();

  const breadcrumbs = usePageBreadcrumbs(tocTree, slug, siteBasePrefixWithVersion);

  return (
    <div className={cx(breadcrumbBodyStyle)}>
      <BreadcrumbContainer breadcrumbs={breadcrumbs} />
    </div>
  );
};

export default Breadcrumbs;
