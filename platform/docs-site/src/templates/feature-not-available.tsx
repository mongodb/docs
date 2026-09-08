'use client';

import { clsx } from 'clsx';
import { Button } from '@via-ds/components/button';
import { Text, TextStyle } from '@via-ds/components/typography';
import Breadcrumbs from '@/mdx-components/Breadcrumbs';
import { useRouter } from 'next/navigation';
import { getBasePath } from '@/utils/base-path';
import styles from './feature-not-available.module.scss';

const FeatureNotAvailImage = () => {
  return (
    <div className={styles.imageContainer}>
      <img src={`${getBasePath()}/feature-not-avail.svg`} alt="Feature not available" height={240} width={360} />
    </div>
  );
};

const FeatureNotAvailable = () => {
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
              We&rsquo;re sorry, this page isn&rsquo;t available in the version you selected.
            </Text>
            <div className={styles.linkContainer}>
              {/* React Aria exposes the press handler as `onPress`; `onClick` is a discouraged alias. */}
              <Button onPress={goBack}>Go back to previous page</Button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default FeatureNotAvailable;
