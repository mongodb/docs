import { useState } from 'react';
import { clsx } from 'clsx';
import { Text, TextStyle } from '@via-ds/components';
import { Icon } from '@via-ds/icons';
import styles from './contents-list.module.scss';

type ContentsListProps = {
  children: React.ReactNode;
  label: string;
};

export const ContentsList = ({ children, label }: ContentsListProps) => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <>
      {/* Mobile (except in Offline Mode) */}
      <div aria-expanded={open} className={clsx(styles.collapsible, styles.mobileContainerStyles)}>
        <div className={styles.header} onClick={() => setOpen(!open)}>
          <Icon className={styles.icon} glyph="CaretRight" size="medium" />
          <Text elementType="p" textStyle={TextStyle.body}>
            {label}
          </Text>
        </div>
        <div className={styles.listContainer}>
          <ul className={clsx(styles.list, styles.mobileList)}>{children}</ul>
        </div>
      </div>
      {/* Desktop */}
      <div className={styles.desktopContainerStyles}>
        <Text elementType="p" textStyle={TextStyle.heading6}>
          {label}
        </Text>
        <ul className={styles.list}>{children}</ul>
      </div>
    </>
  );
};
