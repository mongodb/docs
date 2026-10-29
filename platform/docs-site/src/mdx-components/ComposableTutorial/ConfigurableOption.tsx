'use client';

import { useMemo } from 'react';
import { clsx } from 'clsx';
import type { ComposableTutorialOption } from '@/types/ast';
import { joinKeyValuesAsString } from '@/mdx-components/ComposableTutorial';
import { isOfflineBuild } from '@/utils/isOfflineBuild';
import { OfflineSelectList, Select } from '@/mdx-components/Select';
import styles from './configurable-option.module.scss';

interface ConfigurationOptionProps {
  validSelections: Set<string>;
  option: ComposableTutorialOption;
  selections: Record<string, string>;
  onSelect: (value: string, option: string, key: number) => void;
  precedingOptions: ComposableTutorialOption[];
  optionIndex: number;
}

const ConfigurableOption = ({
  option,
  selections,
  onSelect,
  validSelections,
  precedingOptions,
  optionIndex,
}: ConfigurationOptionProps) => {
  const filteredOptions = useMemo(() => {
    return option.selections.filter((selection) => {
      // find a validSelection whilst replacing the current configurable option with each options value
      // if its valid, option is valid
      const precedingSelections: Record<string, string> = {};
      for (const precedingOption of precedingOptions) {
        if (selections[precedingOption.value]) {
          precedingSelections[precedingOption.value] = selections[precedingOption.value];
        }
      }
      const targetObj = { ...precedingSelections, [option.value]: selection.value };
      const targetString = joinKeyValuesAsString(targetObj);

      return validSelections.has(targetString);
    });
  }, [option, precedingOptions, selections, validSelections]);

  return (
    <div
      className={clsx('configurable-option', styles.configurableOption)}
      data-option-value={isOfflineBuild ? option.value : undefined}
      data-default={isOfflineBuild ? option.default : undefined}
      data-dependencies={isOfflineBuild ? JSON.stringify(option.dependencies) : undefined}
      data-selection-value={isOfflineBuild ? '' : undefined}
    >
      <Select
        choices={filteredOptions}
        label={option.text}
        value={selections[option.value]}
        onChange={({ value }) => onSelect(value, option.value, optionIndex)}
      />
      {/* Offline can't filter to valid choices, so list them all. */}
      {isOfflineBuild && <OfflineSelectList choices={option.selections} label={option.text} />}
    </div>
  );
};

export default ConfigurableOption;
