'use client';

import { useProcessedUnifiedToc } from '@/hooks/use-processed-unified-toc';
import { usePageBreadcrumbs } from '@/hooks/use-create-breadcrumbs';
import BreadcrumbContainer from './breadcrumb-container';
import { useVersionContext } from '@/context/version-context';
import { usePageContext } from '@/context/page-context';

const Breadcrumbs = () => {
  const { slug } = usePageContext();
  const { siteBasePrefixWithVersion } = useVersionContext();
  const tocTree = useProcessedUnifiedToc();

  const breadcrumbs = usePageBreadcrumbs(tocTree, slug, siteBasePrefixWithVersion);

  return <BreadcrumbContainer breadcrumbs={breadcrumbs} />;
};

export default Breadcrumbs;
