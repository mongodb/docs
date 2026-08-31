import type { CSSProperties } from 'react';
import { clsx } from 'clsx';
import { Link } from '@/mdx-components/Link';
import { reportAnalytics } from '@/utils/report-analytics';
import { currentScrollPosition } from '@/utils/current-scroll-position';
import styles from './contents-list-item.module.scss';

type ContentsListItemProps = {
  children: React.ReactNode;
  id: string;
  depth?: number;
  isActive?: boolean;
};
export const ContentsListItem = ({ children, id, depth = 0, isActive = false }: ContentsListItemProps) => {
  return (
    <li
      className={clsx(styles.listItem, isActive && styles.listItemActive)}
      style={{ '--contents-depth': depth } as CSSProperties}
    >
      <Link
        className={styles.link}
        to={`#${id}`}
        onClick={() => {
          reportAnalytics('Click', {
            position: 'Right Column',
            position_context: 'On This Page',
            label: id,
            label_text_displayed: id,
            scroll_position: currentScrollPosition(),
            tagbook: 'true',
          });
        }}
      >
        {children}
      </Link>
    </li>
  );
};
