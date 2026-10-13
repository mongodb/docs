'use client';

import styles from './field-list.module.scss';

type FieldListProps = {
  children: React.ReactNode;
};

export const FieldList = ({ children }: FieldListProps) => (
  <table className={styles.fieldList}>
    <colgroup>
      <col className="field-name" />
      <col className="field-body" />
    </colgroup>
    <tbody>{children}</tbody>
  </table>
);
