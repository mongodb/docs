'use client';

import { clsx } from 'clsx';
import { Button } from '@via-ds/components/button';
import { Text, TextStyle } from '@via-ds/components/typography';
import Breadcrumbs from '@/mdx-components/Breadcrumbs';
import { useRouter } from 'next/navigation';
import { getTranslator } from '@/internationalization/get-translator';
import { getBasePath } from '@/utils/base-path';
import styles from './feature-not-available.module.scss';

const FeatureNotAvailImage = () => {
  const { t } = getTranslator();

  return (
    <div className={styles.imageContainer}>
      <img
        src={`${getBasePath()}/feature-not-avail.svg`}
        alt={t('errors.feature_not_available_alt')}
        height={240}
        width={360}
      />
    </div>
  );
};

const FeatureNotAvailable = () => {
  const { t } = getTranslator();
  const router = useRouter();

  const goBack = () => {
    if (window.history.length > 1) {
      router.back();
    } else {
      // Full `/docs` path (the docs landing); use window.location so basePath
      // isn't prepended.
      window.location.assign('/docs');
    }
  };

  return (
    <main className={styles.main}>
      <div className={clsx('body', styles.bodyLayout)}>
        <Breadcrumbs />
        <div className={styles.container}>
          <FeatureNotAvailImage />
          <div className={styles.contentBox}>
            <Text textStyle={TextStyle.heading2} elementType="h1" className={styles.title}>
              {t('errors.page_unavailable_in_version')}
            </Text>
            <div className={styles.linkContainer}>
              {/* React Aria exposes the press handler as `onPress`; `onClick` is a discouraged alias. */}
              <Button onPress={goBack}>{t('errors.go_back')}</Button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default FeatureNotAvailable;
