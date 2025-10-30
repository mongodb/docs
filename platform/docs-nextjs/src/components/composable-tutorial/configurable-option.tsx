'use client';

import { useMemo } from 'react';
import { Option, Select } from '@leafygreen-ui/select';
import { css, cx } from '@leafygreen-ui/emotion';
import type { ComposableTutorialOption } from '@/types/ast';
import { theme } from '@/styles/theme';
import { joinKeyValuesAsString } from '@/components/composable-tutorial';

const mainStyling = css`
  flex: 1 1 200px;
  font-size: ${theme.fontSize.small};
  overflow: hidden;
  z-index: ${theme.zIndexes.actionBar};
  max-width: 200px;

  label,
  button {
    font-size: inherit;
  }

  // overwriting lg style to apply to offline docs
  button {
    margin-top: 3px;
  }

  .dark-theme & {
    > button {
      background-color: var(--gray-dark4);
      color: var(--gray-light3);
    }
  }

  @media ${theme.screenSize.upToMedium} {
    flex: 0 1 calc(50% - ${theme.size.small});
  }
`;

const optionStyling = css`
  font-size: ${theme.fontSize.small};
`;

interface ConfigurationOptionProps {
  validSelections: Set<string>;
  option: ComposableTutorialOption;
  selections: Record<string, string>;
  onSelect: (value: string, option: string, key: number) => void;
  precedingOptions: ComposableTutorialOption[];
  optionIndex: number;
}

const selectStyling = css`
  > label {
    margin-bottom: ${theme.size.tiny};
    text-transform: uppercase;
    color: var(--gray-dark1);
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
  > button {
    margin-top: 0;
    height: 22px;
  }
`;

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
    <div className={cx('configurable-option', mainStyling)}>
      <Select
        className={cx(selectStyling)}
        popoverZIndex={theme.zIndexes.actionBar - 1}
        label={option.text}
        allowDeselect={false}
        value={selections[option.value]}
        aria-label={`Select your ${option.text}`}
        onChange={(value) => onSelect(value, option.value, optionIndex)}
      >
        {filteredOptions.map((selection, i) => (
          <Option className={optionStyling} value={selection.value} key={i}>
            {selection.text}
          </Option>
        ))}
      </Select>
    </div>
  );
};

export default ConfigurableOption;
