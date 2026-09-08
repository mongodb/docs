'use client';

import { clsx } from 'clsx';
import landingStyles from '@/styles/landing.module.css';
import errorStyles from '@/templates/error-template.module.scss';
import styles from '@/templates/blank.module.scss';
import type { BaseTemplateProps } from './index';

const BlankTemplate = ({ children }: BaseTemplateProps) => (
  <main className={clsx(errorStyles.wrapper, landingStyles.fullWidth)}>
    <div className={clsx(errorStyles.notFoundContainer, styles.content)}>{children}</div>
  </main>
);

export default BlankTemplate;
