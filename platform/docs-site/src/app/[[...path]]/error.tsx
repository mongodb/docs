'use client';

import { Text, TextStyle } from '@via-ds/components/typography';
import { Size } from '@via-ds/components/types';
import { getTranslator } from '@/internationalization/get-translator';
import { ErrorPage } from '@/templates/error-template';
import { getBasePath } from '@/utils/base-path';
import styles from './error.module.scss';

export default function Error() {
  const { t } = getTranslator();

  return (
    <ErrorPage
      imageSrc={`${getBasePath()}/500.png`}
      imageAlt={t('errors.internal_server_error_alt')}
      title={t('errors.something_went_wrong')}
      imageStyle={styles.centeredImage}
    >
      <Text textStyle={TextStyle.body} size={Size.Large}>
        {t('errors.try_reloading')}
      </Text>
    </ErrorPage>
  );
}
