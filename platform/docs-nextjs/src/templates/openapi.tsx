import { cx } from '@leafygreen-ui/emotion';
import type { BaseTemplateProps } from './index';
import openapiStyles from './openapi.module.scss';

const OpenAPITemplate = ({ children }: BaseTemplateProps) => (
  <div className={cx(openapiStyles['openapi-template'], 'openapi-template')}>{children}</div>
);

export default OpenAPITemplate;
