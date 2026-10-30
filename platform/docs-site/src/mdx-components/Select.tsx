'use client';

import type { ReactNode } from 'react';
import { Dropdown } from '@via-ds/components/dropdown';
import { Select as ViaSelect, SelectItem } from '@via-ds/components/select';
import { clsx } from 'clsx';
import { Checkmark } from '@via-ds/icons';
import type { IconComponent } from '@/mdx-components/Icons/DriverIconMap';
import styles from './Select.module.scss';

export type SelectOption = {
  text: string;
  value: string;
  /** A Via glyph, which already carries `slot="icon"`. */
  icon?: ReactNode;
  tabSelectorIcon?: IconComponent;
};

export type SelectProps = {
  className?: string;
  choices: Array<SelectOption>;
  onChange: ({ value }: { value: string }) => void;
  defaultText?: string;
  disabled?: boolean;
  label?: string;
  value?: string;
};

const renderItems = (choices: Array<SelectOption>) =>
  choices.map(({ value: id, text, icon, tabSelectorIcon: TabSelectorIcon }) => (
    // Via's trigger shows textValue over children, which would drop the icon.
    <SelectItem key={id} id={id} textValue={icon || TabSelectorIcon ? undefined : text}>
      {icon}
      {TabSelectorIcon && <TabSelectorIcon slot="icon" className={styles.itemIcon} />}
      {text}
    </SelectItem>
  ));

/** The Select's option list, rendered in place for offline builds, which can't open its popover. */
export const OfflineSelectList = ({ choices, label }: { choices: Array<SelectOption>; label?: string }) => (
  <div className={styles.offlineList} data-offline-list hidden>
    <Dropdown aria-label={label} selectionMode="single">
      {renderItems(choices)}
    </Dropdown>
    {/* Cloned into the chosen option offline, since the static render selects nothing. */}
    <template data-offline-check>
      <Checkmark slot="check" />
    </template>
  </div>
);

const Select = ({
  className,
  choices,
  onChange,
  defaultText = '',
  disabled = false,
  label,
  value = '',
  ...props
}: SelectProps) => (
  <ViaSelect
    className={clsx(styles.select, className)}
    selectedKey={value || null}
    isDisabled={disabled}
    placeholder={defaultText}
    label={label}
    onSelectionChange={(key) => {
      if (key !== null) onChange({ value: String(key) });
    }}
    {...props}
  >
    {renderItems(choices)}
  </ViaSelect>
);

export { Select };
