import { cx } from '@leafygreen-ui/emotion';
import type { BaseTemplateProps } from '.';
import changelogStyles from './changelog.module.scss';

const ChangelogTemplate = ({ children }: BaseTemplateProps) => (
  <div className={cx(changelogStyles['changelog-wrapper'], 'changelog-wrapper')}>
    <main className={cx(changelogStyles['changelog-template'], 'changelog-template')}>{children}</main>
  </div>
);

export default ChangelogTemplate;
