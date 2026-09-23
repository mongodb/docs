'use client';

import { Icon } from '@via-ds/icons';
import styles from './not-found-ai.module.scss';

export const ThinkingBox = () => (
  <div className={styles.box}>
    <div className={styles.header}>
      <Icon glyph="Sparkle" />
      <span className={styles.headerText}>
        The MongoDB Assistant is thinking
        <span className={styles.dots} aria-hidden="true">
          <span className={styles.dot}>.</span>
          <span className={styles.dot}>.</span>
          <span className={styles.dot}>.</span>
        </span>
      </span>
    </div>
  </div>
);
