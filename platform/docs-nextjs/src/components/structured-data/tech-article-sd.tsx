'use client';

import { useMemo } from 'react';
import type { ASTDocument } from '@/services/db/pages';
import type { DBMetadataDocument } from '@/services/db/snooty-metadata';
import { getPlaintext } from '@/utils/get-plaintext';
import { getNestedValue } from '@/utils/get-nested-value';
import type { TextNode } from '@/types/ast';
import { constructTechArticle } from '@/utils/structured-data/tech-article-sd';
import { STRUCTURED_DATA_CLASSNAME } from '@/utils/structured-data/structured-data';

// Generate structured data script tags for head
const TechArticleSd = ({
  pageDoc,
  metadata,
}: {
  pageDoc: ASTDocument;
  metadata: DBMetadataDocument;
}): JSX.Element | null => {
  const slug = pageDoc.filename.split('.')[0];
  const lookup = slug === '/' ? 'index' : slug;
  const pageTitle = getPlaintext(getNestedValue(['slugToTitle', lookup], metadata) as TextNode[]);
  const template = pageDoc.ast?.options?.template;

  // Tech Article Structured Data
  const techArticleSd = useMemo(() => {
    if (!['product-landing', 'landing', 'search', 'errorpage', 'drivers-index'].includes(template ?? '')) {
      return constructTechArticle({ facets: pageDoc.facets || [], pageTitle });
    }
  }, [pageDoc, pageTitle, template]);

  if (techArticleSd?.isValid()) {
    return (
      <script className={STRUCTURED_DATA_CLASSNAME} id={'tech-article-sd'} type="application/ld+json">
        {techArticleSd.toString()}
      </script>
    );
  }

  return null;
};

export default TechArticleSd;
