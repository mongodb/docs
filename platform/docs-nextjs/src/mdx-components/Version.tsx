'use client';

import text from '@/components/text';
import { css, cx } from '@leafygreen-ui/emotion';
import type { ReactNode } from 'react';

const versionStyle = css`
  font-weight: 400;
  margin-bottom: 16px; /* added to match current spacing in prod */
  margin-top: 16px;
`;

const getVersionChangeText = (changeType: string) => {
  switch (changeType) {
    case 'deprecated':
      return 'Deprecated since';
    case 'versionadded':
      return 'New in';
    case 'versionchanged':
      return 'Changed in';
  }
};
export type VersionProps = {
  changeType: string;
  version: string;
  children: ReactNode;
};

export const Version = ({ changeType, version, children }: VersionProps) => {
  return (
    <div>
      <p className={cx([versionStyle])}>
        <em>
          {getVersionChangeText(changeType)} version {version}.{' '}
        </em>
        : {children}
      </p>
    </div>
  );
};
