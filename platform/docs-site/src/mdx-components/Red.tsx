'use client';

import styles from './red.module.scss';

type RedProps = {
  children: React.ReactNode;
};

export const Red = ({ children }: RedProps) => <strong className={styles.red}>{children}</strong>;
