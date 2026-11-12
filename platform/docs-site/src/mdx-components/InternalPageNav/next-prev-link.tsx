'use client';

import { clsx } from 'clsx';
import { Link } from '@/mdx-components/Link';
import { Text } from '@via-ds/components/typography';
import ArrowLeftIcon from '@via-ds/icons/ArrowLeft';
import ArrowRightIcon from '@via-ds/icons/ArrowRight';
import { getTranslator } from '@/internationalization/get-translator';
import styles from './next-prev-link.module.scss';

/** Which way the link points. Also the analytics label, so it stays English; the visible text is translated. */
export type Direction = 'Back' | 'Next';

const ARROW: Record<Direction, typeof ArrowLeftIcon> = {
  Back: ArrowLeftIcon,
  Next: ArrowRightIcon,
};

const LABEL_KEY = {
  Back: 'nav.back',
  Next: 'nav.next',
} as const;

export type NextPrevLinkProps = {
  /** Visible label for the destination page. Null when the TOC entry has no label. */
  pageTitle: string | null;
  /** `title` attribute on the anchor, e.g. "Previous Section". */
  title: string;
  targetSlug: string;
  direction: Direction;
  onClick: (direction: Direction) => void;
  className?: string;
};

const NextPrevLink = ({ className, direction, pageTitle, title, targetSlug, onClick }: NextPrevLinkProps) => {
  const { t } = getTranslator();
  const isNext = direction === 'Next';
  const ArrowIcon = ARROW[direction];

  const rowClass = clsx(styles.row, isNext ? styles['row-next'] : styles['row-prev']);
  const textClass = isNext ? styles['text-next'] : styles['text-prev'];

  return (
    <div className={className}>
      <Link to={targetSlug} {...{ title }} onClick={() => onClick(direction)} className={styles.link}>
        <div className={rowClass}>
          <span className={styles.arrow}>
            <ArrowIcon role="presentation" />
          </span>
          <div className={textClass}>
            <Text elementType="div" className={styles.direction}>
              {t(LABEL_KEY[direction])}
            </Text>
            <Text elementType="div" textStyle="description">
              {pageTitle}
            </Text>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default NextPrevLink;
