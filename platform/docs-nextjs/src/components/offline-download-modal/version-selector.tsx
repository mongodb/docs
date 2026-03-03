'use client';

import type { RefObject } from 'react';
import { useEffect, useState } from 'react';
import { css, cx } from '@leafygreen-ui/emotion';
import { Select, Option } from '@leafygreen-ui/select';
import { theme } from '@/styles/theme';
import { type OfflineVersion, type OfflineObject } from './download-context';

const selectStyling = css`
  min-width: 94px;
  width: 100%;
  height: ${theme.size.medium};
  > * {
    font-size: ${theme.fontSize.small} !important;
  }

  + div {
    z-index: 9;
  }
`;

const optionStyling = css`
  li {
    line-height: ${theme.fontSize.small};
    font-size: ${theme.fontSize.small};
    padding: 0px 0px;

    svg {
      display: none;
    }
  }
`;

type VersionSelectProps = {
  offlineRepo: OfflineObject;
  versions: OfflineVersion[];
  onSelect: (e: number) => void;
  tableRef: RefObject<HTMLDivElement>;
};

const VersionSelect = ({ offlineRepo, versions, onSelect, tableRef }: VersionSelectProps) => {
  const [selected, setSelected] = useState(() => 0);
  useEffect(() => {
    onSelect(selected);
  }, [onSelect, selected]);

  return (
    <Select
      baseFontSize={13}
      onChange={(e) => {
        setSelected(parseInt(e, 10));
      }}
      portalContainer={tableRef.current}
      scrollContainer={tableRef.current}
      className={cx(selectStyling)}
      allowDeselect={false}
      // TODO: can remove aria-labelledby after upgrading LG/Select
      // https://github.com/mongodb/leafygreen-ui/blob/%40leafygreen-ui/select%407.0.1/packages/select/src/Select.tsx#L105
      aria-labelledby={'null'}
      aria-label={`Select Offline Version for ${offlineRepo.displayName}`}
      value={selected.toString()}
      disabled={versions.length < 2}
    >
      {versions.map((version: OfflineVersion, i: number) => {
        return (
          <Option className={optionStyling} key={i} value={i.toString()}>
            {version.displayName}
          </Option>
        );
      })}
    </Select>
  );
};

export default VersionSelect;
