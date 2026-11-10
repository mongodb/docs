'use client';

import { clsx } from 'clsx';
import { Button } from '@via-ds/components/button';
import Play from '@via-ds/icons/Play';
import { getTranslator } from '@/internationalization/get-translator';
import styles from './video-play-button.module.scss';

const VideoPlayButton = () => {
  const { t } = getTranslator();

  return (
    <div className={styles.playButtonWrapper}>
      <Button className={clsx(styles.playButton)} aria-label={t('media.play_video')}>
        <Play slot="icon" size="xlarge" />
      </Button>
    </div>
  );
};

export default VideoPlayButton;
