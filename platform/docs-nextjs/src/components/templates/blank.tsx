'use client';

import landingStyles from '@/styles/landing.module.css';
import { notFoundContainerStyle, wrapperStyle } from '@/app/docs/[[...path]]/not-found';
import type { BaseTemplateProps } from './index';
import { cx } from '@leafygreen-ui/emotion';

const BlankTemplate = ({ children }: BaseTemplateProps) => (
  <main className={cx(wrapperStyle, landingStyles.fullWidth)}>
    <div className={notFoundContainerStyle}>{children}</div>
  </main>
);

export default BlankTemplate;
