'use client';

import { useCallback, useMemo, useState, useContext } from 'react';
import { css, cx } from '@leafygreen-ui/emotion';
import Select from '@/components/select';
import type { PartialFacet } from '@/components/search-results/search-context';
import SearchContext from '@/components/search-results/search-context';
import { theme } from '@/styles/theme';
import type { FacetOption, FacetValue } from '@/types/data';
import { initChecked } from './facet-value';

const selectStyle = css`
  font-size: ${theme.fontSize.small};
  line-height: 20px;
  margin-bottom: 8px;
  padding-left: 22px;

  button {
    height: 22px;
  }
`;

const FacetVersionGroup = ({ facetOption: { options } }: { facetOption: FacetOption }) => {
  // create select options from options
  const selectOptions = useMemo(
    () => options.map((option) => ({ text: option.name, value: option.id, key: option.key })),
    [options],
  );
  const { handleFacetChange, searchParams } = useContext(SearchContext);

  const [value, setValue] = useState(
    () =>
      selectOptions.find(({ key, value }) => initChecked(searchParams, key, value))?.value || selectOptions[0].value,
  );

  const optionsById = useMemo(
    () =>
      options.reduce<Record<string, FacetValue>>((map, option) => {
        map[option.id] = option;
        return map;
      }, {}),
    [options],
  );

  const onChange = useCallback(
    (newOption: { value: string }) => {
      const selectedOption = optionsById[newOption.value];
      const oldSelection = optionsById[value];
      const facetsToUpdate: Array<PartialFacet & { checked: boolean }> = [];

      // update to unselect current selection
      facetsToUpdate.push({
        key: oldSelection.key,
        id: oldSelection.id,
        checked: false,
      });

      // update to select new selection
      facetsToUpdate.push({
        key: selectedOption.key,
        id: selectedOption.id,
        checked: true,
      });

      setValue(selectedOption.id);
      handleFacetChange(facetsToUpdate);
    },
    [handleFacetChange, optionsById, value],
  );

  return (
    <Select
      className={cx(selectStyle)}
      value={value}
      choices={selectOptions}
      onChange={onChange}
      data-testid={'facets-version-group'}
    ></Select>
  );
};

export default FacetVersionGroup;
