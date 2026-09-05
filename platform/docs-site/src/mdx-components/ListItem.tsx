'use client';

import styles from './list-item.module.scss';

export type ListItemProps = {
  children: React.ReactNode;
};

export const ListItem = ({ children }: ListItemProps) => {
  return (
    <li className={styles.listItem}>
      <div className={styles.listItemContent}>{children}</div>
    </li>
  );
};
