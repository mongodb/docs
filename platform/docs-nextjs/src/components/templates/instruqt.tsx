'use client';

import MainColumn from './main-column';
import type { BaseTemplateProps } from './index';
import mainColumnStyles from './main-column.module.scss';

const InstruqtTemplate = ({ children }: BaseTemplateProps) => (
  <MainColumn className={mainColumnStyles['instruqt-wrapper']}>{children}</MainColumn>
);

export default InstruqtTemplate;
