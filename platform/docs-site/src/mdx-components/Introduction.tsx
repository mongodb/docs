'use client';

import clsx from 'clsx';
import styles from './introduction.module.scss';

export type IntroductionProps = {
  children: React.ReactNode;
};

export const Introduction = ({ children }: IntroductionProps) => {
  return <div className={clsx(styles.introduction, 'introduction')}>{children}</div>;
};
