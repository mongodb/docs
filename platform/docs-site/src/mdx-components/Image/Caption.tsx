'use client';

import { clsx } from 'clsx';
import type { ImageAlign } from './types';
import styles from './caption.module.scss';

interface CaptionProps {
  caption?: string;
  align?: ImageAlign;
}

export const Caption = ({ caption, align = 'center' }: CaptionProps) => {
  if (!caption || caption.trim() === '') return null;
  return <p className={clsx(styles.caption, styles[align])}>{caption}</p>;
};
