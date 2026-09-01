'use client';

import { clsx } from 'clsx';
import { isString } from 'lodash';
import styles from './product-landing.module.scss';
import { useSnootyMetadata } from '@/utils/use-snooty-metadata';
import { usePageContext } from '@/context/page-context';
import { DEPRECATED_PROJECTS } from '@/mdx-components/Contents';
import { FeedbackRating } from '@/mdx-components/FeedbackWidget';
import type { BaseTemplateProps } from '.';
import { OfflineBanner } from '@/mdx-components/Banner/OfflineBanner';
import { getFullSlug } from '@/utils/get-full-slug';
import { useVersionContext } from '@/context/version-context';
import { isOfflineBuild } from '@/utils/isOfflineBuild';

const REALM_LIGHT_HERO_PAGES = ['index.txt'];

const ProductLandingTemplate = ({ children }: BaseTemplateProps) => {
  const { options: pageOptions, slug: pageSlug, fileId } = usePageContext();
  const { siteBasePrefixWithVersion } = useVersionContext();
  const { project } = useSnootyMetadata();
  const isGuides = project === 'guides';
  const isRealm = project === 'realm';
  const hasMaxWidthParagraphs =
    pageOptions && isString(pageOptions?.['pl-max-width-paragraphs'])
      ? ['', 'true'].includes(pageOptions['pl-max-width-paragraphs'])
      : false;
  const hasLightHero = fileId && isRealm && REALM_LIGHT_HERO_PAGES.includes(fileId);

  return (
    <main
      className={clsx(
        styles.wrapper,
        isGuides ? styles.guidesStyles : styles.notGuidesStyles,
        hasLightHero && styles.hasLightHeroStyles,
        hasMaxWidthParagraphs && styles.maxWidthParagraphsStyles,
      )}
    >
      {isOfflineBuild && (
        <OfflineBanner
          linkUrl={'https://mongodb.com/' + getFullSlug(pageSlug, siteBasePrefixWithVersion)}
          template="product-landing"
        />
      )}
      {children}
      {!DEPRECATED_PROJECTS.includes(project) && (
        <>
          <hr className={styles.hrStyling} />
          <div className={styles.ratingStyling}>
            <FeedbackRating className={styles.formStyle} classNameContainer={styles.formContainer} position="body" />
          </div>
        </>
      )}
    </main>
  );
};

export default ProductLandingTemplate;
