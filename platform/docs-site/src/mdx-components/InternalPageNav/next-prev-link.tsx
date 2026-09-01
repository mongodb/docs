'use client';

import { useRouter } from 'next/navigation';
import { clsx } from 'clsx';
import { Link } from '@/mdx-components/Link';
import { Text } from '@via-ds/components';
import ArrowLeftIcon from '@via-ds/icons/ArrowLeft';
import ArrowRightIcon from '@via-ds/icons/ArrowRight';
import styles from './next-prev-link.module.scss';

/** Which way the link points. Doubles as the visible label. */
export type Direction = 'Back' | 'Next';

const ARROW: Record<Direction, typeof ArrowLeftIcon> = {
  Back: ArrowLeftIcon,
  Next: ArrowRightIcon,
};

function scrollToTopHtml() {
  Promise.resolve().then(() => {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        document.documentElement.scrollTop = 0;
      });
    });
  });
}

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
  const isNext = direction === 'Next';
  const ArrowIcon = ARROW[direction];
  const router = useRouter();

  const handleClick = () => {
    router.push(targetSlug);
    onClick(direction);
    scrollToTopHtml();
  };

  const rowClass = clsx(styles.row, isNext ? styles['row-next'] : styles['row-prev']);
  const textClass = isNext ? styles['text-next'] : styles['text-prev'];

  return (
    <div className={className}>
      <Link to={targetSlug} {...{ title }} onClick={handleClick} className={styles.link}>
        <div className={rowClass}>
          <span className={styles.arrow}>
            <ArrowIcon role="presentation" />
          </span>
          <div className={textClass}>
            <Text elementType="div" className={styles.direction}>
              {direction}
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
