'use client';

import styles from './gold.module.scss';

type GoldProps = {
  children: React.ReactNode;
};

export const Gold = ({ children }: GoldProps) => <strong className={styles.gold}>{children}</strong>;
