'use client';

import { clsx } from 'clsx';
import { Button } from '@via-ds/components/button';
import Play from '@via-ds/icons/Play';
import styles from './video-play-button.module.scss';

const VideoPlayButton = () => {
  return (
    <div className={styles.playButtonWrapper}>
      <Button className={clsx(styles.playButton)} aria-label="Play video">
        <Play slot="icon" size="xlarge" />
      </Button>
    </div>
  );
};

export default VideoPlayButton;
