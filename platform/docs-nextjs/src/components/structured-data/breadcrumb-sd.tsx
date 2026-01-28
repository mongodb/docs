'use client';

import { useMemo } from 'react';
import { STRUCTURED_DATA_CLASSNAME } from '@/utils/structured-data/structured-data';
import { useProcessedUnifiedToc } from '@/hooks/use-processed-unified-toc';
import { usePageBreadcrumbs } from '@/hooks/use-create-breadcrumbs';
import { useVersionContext } from '@/context/version-context';
import { BreadcrumbListSd } from '@/utils/structured-data/breadcrumb-sd';

const BreadcrumbSd = ({ slug }: { slug: string }) => {
  const tocTree = useProcessedUnifiedToc();

  const { siteBasePrefix } = useVersionContext();

  const breadcrumbs = usePageBreadcrumbs(tocTree, slug, siteBasePrefix);

  const breadcrumbSd = useMemo(() => {
    const sd = new BreadcrumbListSd({
      breadcrumbs,
    });
    return sd.isValid() ? sd.toString() : undefined;
  }, [breadcrumbs]);

  return (
    <>
      {Array.isArray(breadcrumbs) && breadcrumbSd && (
        <script className={STRUCTURED_DATA_CLASSNAME} type="application/ld+json">
          {breadcrumbSd}
        </script>
      )}
    </>
  );
};

export default BreadcrumbSd;
