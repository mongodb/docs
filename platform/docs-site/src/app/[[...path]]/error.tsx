'use client';

import { Text, TextStyle } from '@via-ds/components/typography';
import { Size } from '@via-ds/components/types';
import { ErrorPage } from '@/templates/error-template';
import { getBasePath } from '@/utils/base-path';
import styles from './error.module.scss';

export default function Error() {
  return (
    <ErrorPage
      imageSrc={`${getBasePath()}/500.png`}
      imageAlt="Internal server error"
      title="Something went wrong on our end."
      imageStyle={styles.centeredImage}
    >
      <Text textStyle={TextStyle.body} size={Size.Large}>
        Try reloading the page.
      </Text>
    </ErrorPage>
  );
}
