'use client';

import { Button } from '@via-ds/components/button';
import { Tooltip, TooltipRoot, TooltipTrigger } from '@via-ds/components/tooltip';
import { Align, Side, Size } from '@via-ds/components/types';
import DownloadIcon from '@via-ds/icons/Download';
import { getTranslator } from '@/internationalization/get-translator';
import { reportAnalytics } from '@/utils/report-analytics';
import { currentScrollPosition } from '@/utils/current-scroll-position';
import { useOfflineDownloadContext } from './download-context';
import styles from './download-button.module.scss';

export const DownloadButton = () => {
  const { t } = getTranslator();
  const { setModalOpen } = useOfflineDownloadContext();

  const openDownloadModal = () => {
    reportAnalytics('Click', {
      position: 'SideNav',
      label: 'Offline docs download button',
      scroll_position: currentScrollPosition(),
      tagbook: 'true',
    });
    setModalOpen(true);
  };

  return (
    <TooltipRoot side={Side.Bottom} align={Align.Center}>
      <TooltipTrigger>
        <Button
          size={Size.Small}
          className={styles.downloadButton}
          aria-label={t('offline.download_docs_aria')}
          onPress={openDownloadModal}
          onClick={(e) => {
            // required to prevent being used within links
            e.stopPropagation();
          }}
        >
          <DownloadIcon slot="icon" />
        </Button>
      </TooltipTrigger>
      <Tooltip>{t('offline.download_the_docs')}</Tooltip>
    </TooltipRoot>
  );
};
