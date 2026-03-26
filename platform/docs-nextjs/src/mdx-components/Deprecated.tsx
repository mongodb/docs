'use client';

import { css, cx } from '@leafygreen-ui/emotion';

const codeStyle = css`
  font-weight: 400;
  margin-bottom: 16px; /* added too match current spacing in prod */
`;

interface DeprecatedProps {
  version: string;
}

export const Deprecated = ({ version }: DeprecatedProps) => {
  return (
    <div>
      <p className={cx([codeStyle])}>
        <em>Deprecated since version {version}.</em>
      </p>
    </div>
  );
};
