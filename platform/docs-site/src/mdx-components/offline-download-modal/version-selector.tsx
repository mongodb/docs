'use client';

import { Select, SelectItem } from '@via-ds/components/select';
import { Size } from '@via-ds/components/types';
import { type RefObject, useEffect, useState } from 'react';
import { type OfflineVersion, type OfflineObject } from './download-context';

type VersionSelectProps = {
  offlineRepo: OfflineObject;
  versions: OfflineVersion[];
  versionIndex: number;
  onSelect: (e: number) => void;
  contentRef: RefObject<HTMLDivElement>;
};

export const VersionSelect = ({ offlineRepo, versions, versionIndex, onSelect, contentRef }: VersionSelectProps) => {
  const [selected, setSelected] = useState(() => versionIndex);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    onSelect(selected);
  }, [onSelect, selected]);

  useEffect(() => {
    if (!open) {
      return;
    }

    // Close rather than let the listbox follow its trigger while the modal content scrolls.
    const closeOnScroll = () => {
      setOpen(false);
    };
    const scrollContainer = contentRef.current;
    scrollContainer?.addEventListener('scroll', closeOnScroll, { passive: true });

    return () => {
      scrollContainer?.removeEventListener('scroll', closeOnScroll);
    };
  }, [open, contentRef]);

  return (
    <Select
      size={Size.Small}
      aria-label={`Select Offline Version for ${offlineRepo.displayName}`}
      selectedKey={selected}
      onSelectionChange={(key) => setSelected(key as number)}
      isDisabled={versions.length < 2}
      isOpen={open}
      onOpenChange={setOpen}
    >
      {versions.map((version: OfflineVersion, i: number) => {
        return (
          <SelectItem key={version.displayName} id={i}>
            {version.displayName}
          </SelectItem>
        );
      })}
    </Select>
  );
};
