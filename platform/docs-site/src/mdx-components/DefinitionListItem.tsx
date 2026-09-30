'use client';

import styles from './definition-list-item.module.scss';

export type DefinitionListItemProps = {
  children?: React.ReactNode;
  targetId?: string;
};

export const DefinitionListItem = ({ targetId, children }: DefinitionListItemProps) => {
  return (
    <>
      {targetId && <div id={targetId} className={styles.headerBuffer} />}
      {children}
    </>
  );
};
