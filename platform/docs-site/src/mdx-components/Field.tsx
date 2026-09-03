'use client';

import styles from './field.module.scss';

type FieldProps = {
  children: React.ReactNode;
  label?: string;
  name?: string;
};

export const Field = ({ children, label = '', name = '' }: FieldProps) => (
  <tr className={styles.field}>
    <th>{label || name}:</th>
    <td>{children}</td>
  </tr>
);
