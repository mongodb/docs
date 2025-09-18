import type { ReactNode } from 'react';
import { theme } from '@/styles/theme';
import mainColumnStyles from './main-column.module.scss';

export const MAIN_COLUMN_HORIZONTAL_MARGIN = theme.size.xlarge;

const MainColumn = ({ children, className }: { children: ReactNode; className?: string }) => (
  <main className={[mainColumnStyles['main-column'], className].join(' ')}>{children}</main>
);

export default MainColumn;
