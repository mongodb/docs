'use client';

import styles from './highlight.module.scss';

export type HighlightColor = 'blue' | 'green' | 'red' | 'yellow';

export type HighlightProps = {
  children: React.ReactNode;
  color: HighlightColor;
};

export const Highlight = ({ children, color }: HighlightProps) => {
  const highlightClass = styles[color];

  if (!highlightClass) {
    console.warn(`Highlight color must be 'blue', 'green', 'red', or 'yellow'.`);
  }

  return <span className={highlightClass}>{children}</span>;
};
