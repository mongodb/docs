'use client';

import Image from 'next/image';
import Badge from '@leafygreen-ui/badge';
import { css, cx } from '@leafygreen-ui/emotion';
import type { IconProps } from '@leafygreen-ui/icon';
import { Icon as LeafyGreenIcon } from '@leafygreen-ui/icon';

const cloudSyncStyle = css`
  padding-right: 7px;
`;

const syncPillStyle = css`
  align-self: center;
  margin-left: 4px;
  position: relative;
  top: -3px;
`;

const leafyGreenIconStyle = css`
  vertical-align: middle;
`;

export type RoleIconProps = {
  target: string;
  name: string;
};

export const Icon = ({ target, name }: IconProps) => {
  if (target === 'sync-pill') {
    return (
      <Badge variant="lightgray" className={cx(syncPillStyle)}>
        <Image src="/cloud.png" alt="Sync" className={cx(cloudSyncStyle)} width={16} height={16} />
        APP SERVICES
      </Badge>
    );
  } else if (name === 'icon' || name === 'icon-fa5') {
    return <i className={`fa-${target} fas`} />;
  } else if (name === 'icon-fa5-brands') {
    return <i className={`fab fa-${target}`} />;
  } else if (name === 'icon-fa4') {
    return <i className={`fa4-${target} fa4`} />;
  } else if (name === 'icon-charts') {
    return <i className={`charts-icon-${target} charts-icon`} />;
  } else if (name === 'icon-mms') {
    return <i className={`mms-icon-${target} mms-icon`} />;
  } else if (name === 'icon-lg') {
    return <LeafyGreenIcon glyph={target ?? ''} className={cx(leafyGreenIconStyle)} />;
  }
};
