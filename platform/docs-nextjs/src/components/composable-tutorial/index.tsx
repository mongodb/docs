'use client';

import { useCallback, useContext, useEffect, useMemo, useRef } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { isEmpty } from 'lodash';
import queryString, { type ParsedQuery } from 'query-string';
import { palette } from '@leafygreen-ui/palette';
import { css, cx } from '@leafygreen-ui/emotion';
import type { ComposableNode, ComposableTutorialNode } from '@/types/ast';
import { getLocalValue, setLocalValue } from '../../utils/browser-storage';
import { isBrowser } from '@/utils/is-browser';
import { theme } from '@/styles/theme';
import ComponentFactory from '@/components/component-factory';
import { findAllKeyValuePairs } from '@/utils/find-all-key-value-pairs';
import { findAllNestedAttribute } from '@/utils/find-all-nested-attribute';
import ConfigurableOption from './configurable-option';
import ComposableContext, { ComposableContextProvider } from './composable-context';
import { useHash } from '@/hooks/use-hash';

const DELIMITER_KEY = '**';
// helper function to join key-value pairs as one string
// ordered by keys alphabetically
// separated by DELIMITER_KEY
export function joinKeyValuesAsString(targetObj: { [key: string]: string }) {
  return Object.keys(targetObj)
    .map((key) => `${key}=${targetObj[key]}`)
    .sort()
    .join(DELIMITER_KEY);
}

function filterValidQueryParams(
  parsedQuery: ParsedQuery<string>,
  composableOptions: ComposableTutorialNode['composable_options'],
  validSelections: Set<string>,
  fallbackToDefaults = false,
): Record<string, string>[] {
  const validQueryParams = composableOptions.reduce(
    (res: Record<string, { values: string[]; dependencies: Record<string, string>[] }>, composableOption) => {
      res[composableOption['value']] = {
        values: composableOption.selections.map((s) => s.value),
        dependencies: composableOption.dependencies,
      };
      return res;
    },
    {},
  );

  const res: Record<string, string> = {};
  const removedQueryParams: Record<string, string> = {};

  // query params take precedence
  for (const [key, value] of Object.entries(parsedQuery)) {
    const dependenciesMet = validQueryParams[key]?.dependencies.every((d) => {
      const key = Object.keys(d)[0];
      return parsedQuery[key] === Object.values(d)[0];
    });
    if (
      key in validQueryParams &&
      typeof value === 'string' &&
      validQueryParams[key]['values'].indexOf(value) > -1 &&
      dependenciesMet
    ) {
      res[key] = value;
    } else if (key in validQueryParams) {
      // remove bad key
      removedQueryParams[key] = value as string;
    }
  }

  if (!fallbackToDefaults) {
    return [res, removedQueryParams];
  }

  // fallback to composableOptions if not present in query
  for (const composableOption of composableOptions) {
    const dependenciesMet = composableOption.dependencies.every((d) => {
      const key = Object.keys(d)[0];
      return res[key] === Object.values(d)[0];
    });

    // skip this composable option if
    // there is already a valid value in parsed query,
    // or this option has missing dependency
    if (res[composableOption.value] || !dependenciesMet) {
      continue;
    }
    // check if default value for this option has content
    const targetObj = { ...res, [composableOption.value]: composableOption.default };
    const targetString = joinKeyValuesAsString(targetObj);
    if (validSelections.has(targetString)) {
      res[composableOption.value] = composableOption.default;
      continue;
    }

    // if the specified default does not have content (fault in data)
    // safety to find a valid combination from children and select
    const currentSelections = joinKeyValuesAsString({ ...res });
    for (const [validSelection] of validSelections.entries()) {
      const validSelectionParts = validSelection.split(DELIMITER_KEY);
      const selectionPartForOption = validSelectionParts.find((str) => str.includes(`${composableOption.value}=`));
      if (validSelection.includes(currentSelections) && selectionPartForOption) {
        res[composableOption.value] = selectionPartForOption.split('=')[1];
      }
    }
  }

  return [res, removedQueryParams];
}

function fulfilledSelections(
  filteredParams: Record<string, string>,
  composableOptions: ComposableTutorialNode['composable_options'],
) {
  // every composable option should either
  // have its value as a key in selections
  // or its dependency was not met
  return composableOptions.every((composableOption) => {
    const dependenciesMet = composableOption.dependencies.every((d) => {
      const key = Object.keys(d)[0];
      return filteredParams[key] === Object.values(d)[0];
    });
    return composableOption['value'] in filteredParams || !dependenciesMet;
  });
}

export function getSelectionPermutation(selections: Record<string, string>): Set<string> {
  const res: Set<string> = new Set();
  const partialRes: string[] = [];
  for (const [key, value] of Object.entries(selections)) {
    if (!value || value.toLowerCase() === 'none') {
      continue;
    }
    partialRes.push(`${key}=${value}`);
    res.add(partialRes.sort().join(DELIMITER_KEY));
  }
  return res;
}

export interface ComposableTutorialProps {
  nodeChildren: ComposableTutorialNode['children'];
  composableOptions: ComposableTutorialNode['composable_options'];
}

const LOCAL_STORAGE_KEY = 'activeComposables';

const containerStyling = css`
  display: flex;
  position: sticky;
  top: ${theme.header.actionBarMobileHeight};
  background: var(--background-color-primary);
  column-gap: ${theme.size.default};
  row-gap: 12px;
  justify-items: space-between;
  border-bottom: 1px solid ${palette.gray.light2};
  padding-bottom: ${theme.size.medium};
  z-index: ${theme.zIndexes.content + 1};

  @media ${theme.screenSize.upToMedium} {
    flex-wrap: wrap;
  }
`;

export const showComposable = (dependencies: Record<string, string>[], currentSelections: Record<string, string>) =>
  dependencies.every((d) =>
    Object.keys(d).every((key) => d[key]?.toLowerCase() === 'none' || currentSelections[key] === d[key]),
  );

// Internal component that consumes the context
const ComposableTutorialInternal = ({ nodeChildren, composableOptions, ...rest }: ComposableTutorialProps) => {
  const { currentSelections, setCurrentSelections } = useContext(ComposableContext);
  const hash = useHash();
  const search = useSearchParams();
  const router = useRouter();
  // flag to either preserve the hash or not when navigating
  // ie. if providing default selections, preserve the hash in url
  //    vs. if changing selections, do not preserve the hash
  const preserveHash = useRef(false);
  const initialLoad = useRef(true);

  const validSelections = useMemo(() => {
    const res: Set<string> = new Set();
    const composableContents = findAllKeyValuePairs(nodeChildren, 'name', 'selected-content') as ComposableNode[];
    for (const composableNode of composableContents) {
      const newSet = getSelectionPermutation(composableNode.selections ?? {});
      for (const elm of newSet) {
        res.add(elm);
      }
    }
    return res;
  }, [nodeChildren]);

  const refToSelection = useMemo(() => {
    const res: Record<string, Record<string, string>> = {};
    const composableContents = findAllKeyValuePairs(nodeChildren, 'name', 'selected-content') as ComposableNode[];
    for (const composableContent of composableContents) {
      const ids = findAllNestedAttribute(composableContent.children, 'id');
      const html_ids = findAllNestedAttribute(composableContent.children, 'html_id');
      const selection = composableContent.selections;
      for (const id of [...ids, ...html_ids]) {
        // if multiple composable contents have the same id, this is a content issue.
        // use the first composable content that has this id
        if (res[id]) {
          continue;
        }
        res[id] = selection;
      }
    }
    return res;
  }, [nodeChildren]);

  const [externalQueryParamsString, internalQueryParamsString] = useMemo(() => {
    const queryParams = queryString.parse(search?.toString() ?? '');
    const composableOptionsKeys = composableOptions.map((option) => option.value);
    const external: Record<string, string> = {};
    const internal: Record<string, string> = {};
    for (const [key, value] of Object.entries(queryParams)) {
      if (!composableOptionsKeys.includes(key)) {
        external[key] = value as string;
      } else {
        internal[key] = value as string;
      }
    }
    return [queryString.stringify(external), queryString.stringify(internal)];
  }, [composableOptions, search]);

  const navigatePreservingExternalQueryParams = useCallback(
    ({ queryString, hash = '' }: { queryString: string; hash?: string }) => {
      // Preserve hash if we are not navigating from our own useEffect
      let newHash;
      if (preserveHash.current) {
        newHash = hash;
      }
      router.push(
        `${queryString.startsWith('?') ? '' : '?'}${queryString}${
          queryString.length > 0 && externalQueryParamsString.length > 0 ? '&' : ''
        }${externalQueryParamsString}${newHash ? newHash : ''}`,
      );
    },
    [externalQueryParamsString, router],
  );

  // takes care of query param reading and rerouting on initial load
  // if query params fulfill all selections, show the selections
  // otherwise, fallback to getting default values from combination of local storage and nodeData
  useEffect(() => {
    // do this only on initial load
    if (!isBrowser || !initialLoad.current) {
      return;
    }

    initialLoad.current = false;

    // first verify if there is a hash
    // if there is a hash and it belongs to a composable option,
    // set the current selections that composable option to show the content with hash id
    if (hash) {
      const hashString = hash.slice(1);
      const selection = refToSelection[hashString];
      if (selection) {
        preserveHash.current = true;
        setCurrentSelections(selection);
        return;
      }
    }

    // read query params
    const queryParams = queryString.parse(search?.toString() ?? '');

    const [filteredParams, removedQueryParams] = filterValidQueryParams(
      queryParams,
      composableOptions,
      validSelections,
      false,
    );
    // if params fulfill selections, show the current selections
    if (fulfilledSelections(filteredParams, composableOptions) && Object.keys(removedQueryParams).length === 0) {
      setCurrentSelections(filteredParams);
      return;
    }

    // params are missing. get default values using local storage and nodeData
    const localStorage: Record<string, string> = getLocalValue(LOCAL_STORAGE_KEY) ?? {};
    const [defaultParams] = filterValidQueryParams(localStorage, composableOptions, validSelections, true);
    preserveHash.current = true;
    setCurrentSelections(defaultParams);
  }, [hash, refToSelection, setCurrentSelections, search, composableOptions, validSelections]);

  // when updating selection state, update the url and local storage with the new selections
  useEffect(() => {
    // if no selections, do not update the url
    if (!currentSelections || isEmpty(currentSelections)) {
      return;
    }

    setLocalValue(LOCAL_STORAGE_KEY, currentSelections);

    // if query params are the same as the current selections, do not update the url
    const validQueryParts = queryString.parse(internalQueryParamsString);
    const allSelectionsMatch = Object.entries(currentSelections).every(
      ([key, value]) => validQueryParts[key] === value,
    );
    if (allSelectionsMatch) {
      return;
    }

    const query = new URLSearchParams(currentSelections).toString();
    return navigatePreservingExternalQueryParams({
      queryString: `?${query}`,
      hash,
    });
  }, [currentSelections, hash, internalQueryParamsString, navigatePreservingExternalQueryParams]);

  const onSelect = useCallback(
    (value: string, option: string, index: number) => {
      const newSelections = { ...currentSelections, [option]: value };
      const [correctedParams] = filterValidQueryParams(newSelections, composableOptions, validSelections, true);

      // do not preserve hash since we are changing the selections
      preserveHash.current = false;

      if (validSelections.has(joinKeyValuesAsString(correctedParams))) {
        setCurrentSelections(correctedParams);
        return;
      }

      // need to correct preceding options
      // keep selections for previous composable options
      // and generate valid selections
      const persistSelections: Record<string, string> = {
        [option]: value,
      };
      for (let idx = 0; idx < index; idx++) {
        const composableOption = composableOptions[idx];
        if (composableOption.value !== option && currentSelections[composableOption.value]) {
          persistSelections[composableOption.value] = currentSelections[composableOption.value];
        }
      }

      const [defaultParams] = filterValidQueryParams(persistSelections, composableOptions, validSelections, true);
      setCurrentSelections(defaultParams);
    },
    [composableOptions, currentSelections, validSelections, setCurrentSelections],
  );

  return (
    <div>
      <div className={cx(containerStyling)}>
        {composableOptions.map((option, index) => {
          if (showComposable(option.dependencies, currentSelections)) {
            return (
              <ConfigurableOption
                validSelections={validSelections}
                option={option}
                selections={currentSelections}
                onSelect={onSelect}
                key={index}
                optionIndex={index}
                precedingOptions={composableOptions.slice(0, index)}
              />
            );
          }
          return null;
        })}
      </div>
      <div
        className={css`
          margin-top: ${theme.size.medium};
        `}
      >
        {nodeChildren.map((c, i) => {
          return <ComponentFactory nodeData={c} key={i} {...rest} />;
        })}
      </div>
    </div>
  );
};

// Wrapper component that provides the context
const ComposableTutorial = ({ nodeChildren, composableOptions, ...rest }: ComposableTutorialProps) => {
  return (
    <ComposableContextProvider>
      <ComposableTutorialInternal nodeChildren={nodeChildren} composableOptions={composableOptions} {...rest} />
    </ComposableContextProvider>
  );
};

export default ComposableTutorial;
