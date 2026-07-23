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

const listboxStyling = css`
  [role='listbox'] {
    overscroll-behavior: contain;
  }
`;

type VersionSelectProps = {
  offlineRepo: OfflineObject;
  versions: OfflineVersion[];
  versionIndex: number;
  onSelect: (e: number) => void;
  tableRef: RefObject<HTMLDivElement>;
};

export const VersionSelect = ({ offlineRepo, versions, versionIndex, onSelect, tableRef }: VersionSelectProps) => {
  const [selected, setSelected] = useState(() => versionIndex);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    onSelect(selected);
  }, [onSelect, selected]);

  useEffect(() => {
    if (!open) {
      return;
    }

    // The dropdown renders via the Select's default top-layer/fixed-position
    // popover, so scrolling the page (its "outside") doesn't reposition it
    // and needs an explicit close, same as the sidebar version selector.
    // Also listen on the modal's own scrollable table, since that can
    // scroll independently of the page while the modal is open.
    const closeOnOutsideScroll = () => {
      setOpen(false);
    };
    window.addEventListener('scroll', closeOnOutsideScroll, { passive: true });
    const scrollContainer = tableRef.current;
    scrollContainer?.addEventListener('scroll', closeOnOutsideScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', closeOnOutsideScroll);
      scrollContainer?.removeEventListener('scroll', closeOnOutsideScroll);
    };
  }, [open, tableRef]);

  return (
    <Select
      baseFontSize={13}
      onChange={(e) => {
        setSelected(parseInt(e, 10));
      }}
      open={open}
      setOpen={setOpen}
      portalContainer={tableRef.current}
      scrollContainer={tableRef.current}
      className={cx(selectStyling, listboxStyling)}
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
