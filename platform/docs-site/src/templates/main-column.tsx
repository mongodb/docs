import type { ReactNode } from 'react';
import { clsx } from 'clsx';
import styles from './main-column.module.scss';

const MainColumn = ({ children, className }: { children: ReactNode; className?: string }) => (
  <main className={clsx(styles.mainColumn, className)}>{children}</main>
);

export default MainColumn;
