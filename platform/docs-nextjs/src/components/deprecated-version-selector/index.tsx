'use client';

import { useCallback, useEffect, useState, useMemo } from 'react';
import queryString from 'query-string';
import { keyBy, isEmpty } from 'lodash';
import Button from '@leafygreen-ui/button';
import type { LGGlyph } from '@leafygreen-ui/icon';
import Icon from '@leafygreen-ui/icon';
import { css, cx } from '@leafygreen-ui/emotion';
import { theme } from '@/styles/theme';
import type { BranchData, Docset } from '@/types/data';
import { useVersionContext } from '@/context/version-context';
import { isBrowser } from '@/utils/is-browser';
import Select from '@/components/select';
import { disabledStyle } from '@/components/button/styles';

type ProductChoice = {
  text: string;
  value: string;
};

export type VersionChoice = {
  text: string;
  value: string;
  urlSlug: string;
  url?: string;
  icon?: LGGlyph.Element;
};

const SELECT_WIDTH = '336px';

const selectStyle = css`
  margin-bottom: ${theme.size.medium};
  width: ${SELECT_WIDTH};

  @media ${theme.screenSize.upToSmall} {
    width: 100%;
  }
`;

const isPrimaryBranch = (version: string) => {
  return version === 'main' || version === 'master';
};

const prefixVersion = (version: string) => {
  if (!version) return null;
  // Display as "Version X" on menu if numeric version and remove "v" or "Version" from version name
  const versionNumber = version.replace(/v|Version /g, '');
  // if branch is 'master' or 'main', show as latest
  if (isPrimaryBranch(versionNumber)) {
    return 'Latest';
  }
  return `Version ${versionNumber}`;
};

// Validation for necessary url fields to bypass errors
const hasValidHostName = (docset: Docset) => {
  if (!docset?.url?.dotcomprd || !docset?.prefix?.dotcomprd) return false;
  return true;
};

/**
 *  Order versions in the correct order such that V1.10 and V1.11 are sorted before V1.9
 *  Function to be passed into .Sort() on an array
 */
export const sortVersions = (a: VersionChoice, b: VersionChoice) =>
  a.text
    .toString()
    .replace(/\d+/g, (n) => String(+n + 1000))
    .localeCompare(b.text.toString().replace(/\d+/g, (n) => String(+n + 1000)));

const DeprecatedVersionSelector = () => {
  const { docsets } = useVersionContext();
  const reposBranchesBuildData = docsets.filter((docset) => docset.hasEolVersions);
  const reposBranchesBuildDataMap = keyBy(reposBranchesBuildData, 'project');
  const [productName, setProductName] = useState('');
  const [version, setVersion] = useState('');
  const [reposMap, setReposMap] = useState(reposBranchesBuildDataMap);

  const alphabetize = (product1: ProductChoice, product2: ProductChoice) => {
    return product1?.text?.localeCompare(product2?.text);
  };

  const productChoices = useMemo(() => {
    const seenProducts = new Set();
    return reposMap
      ? (
          Object.keys(reposMap)
            .map((product) => ({
              text: reposMap[product].displayName,
              value: reposMap[product].displayName,
            }))
            // Ensure invalid entries do not break selector
            .filter(({ text }) => {
              if (text && !seenProducts.has(text)) {
                seenProducts.add(text);
                return text;
              }
              return false;
            }) as ProductChoice[]
        )
          //sort entries alphabetically by text
          .sort(alphabetize)
      : [];
  }, [reposMap]);

  const updateProduct = useCallback(({ value }: { value: string }) => {
    setProductName(value);
    setVersion('');
  }, []);

  const updateVersion = useCallback(({ value }: { value: string }) => setVersion(value), []);

  const generateUrl = useCallback((currentVersion: BranchData, reposObj: Docset) => {
    if (!currentVersion) {
      return null;
    }

    // Utilizing hardcoded env or aws bucket path because legacy sites are not available on dev/stage
    if (currentVersion.eol_type === 'download') {
      const offlineURL = 'https://www.mongodb.com/docs/offline';
      return currentVersion.offlineUrl?.length
        ? currentVersion.offlineUrl
        : `${offlineURL}/${reposObj.project}-${currentVersion.urlSlug}.tar.gz`;
    }
    if (hasValidHostName(reposObj)) {
      const hostName = reposObj.url.dotcomprd + reposObj.prefix.dotcomprd;
      return `${hostName}/${currentVersion.urlSlug}`;
    }
    console.error(`Invalid hostname, url could not be generated for ${currentVersion}`);
  }, []);

  const versionChoices = useMemo(() => {
    const res = [];
    for (const [, reposObj] of Object.entries(reposMap)) {
      if (reposObj['displayName'] !== productName) {
        continue;
      }
      res.push(
        ...reposObj.branches.map((version) => {
          //only include versions with an eol_type field
          if (version.eol_type && version.versionSelectorLabel) {
            return {
              text: prefixVersion(version.versionSelectorLabel),
              value: version.versionSelectorLabel,
              urlSlug: version.urlSlug,
              icon: version.eol_type === 'download' ? <Icon glyph="Download" /> : null,
              url: generateUrl(version, reposObj),
            };
          } else return null;
        }),
      );
    }

    return (
      (
        res
          //Ensure versions set to null are not included and do not break selector
          .filter((versionChoice) => versionChoice) as VersionChoice[]
      )
        //  sort versions newest(larger numbers) to oldest(smaller numbers). Assumes there are no more than three digits between/before/after each decimal place
        .sort(sortVersions)
    );
  }, [reposMap, productName, generateUrl]);

  const versionChoicesMap = useMemo(() => keyBy(versionChoices, 'value'), [versionChoices]);

  const buttonDisabled = !(productName && version && !isEmpty(reposMap));

  // Fetch docsets for url
  useEffect(() => {
    const createReposMap = async () => {
      try {
        const docsetsResponse = await fetch(`/api/docsets`);
        const docsets: Docset[] = await docsetsResponse.json();

        const reposBranchesMap = keyBy(
          docsets.filter((project) => project.hasEolVersions),
          'project',
        );
        if (!isEmpty(reposBranchesMap)) setReposMap(reposBranchesMap);
      } catch (error) {
        console.error(`ERROR: could not access docsets for deprecated version dropdown data. `, error);
      }
    };
    createReposMap();
  }, []);

  useEffect(() => {
    if (isBrowser) {
      // Extract the value of 'site' query string from the page url to pre-select product
      const { site } = queryString.parse(window.location.search);
      if (site && !Array.isArray(site) && reposMap[site] && !!reposMap[site].displayName) {
        setProductName(reposMap[site].displayName as string);
      }
    }
  }, [reposMap]);

  return (
    <>
      <Select
        className={cx(selectStyle)}
        choices={productChoices}
        defaultText="Product"
        label="Select a Product"
        onChange={updateProduct}
        value={productName}
      />
      <Select
        className={cx(selectStyle)}
        choices={versionChoices}
        defaultText="Version"
        disabled={productName === ''}
        label="Select a Version"
        onChange={updateVersion}
        value={version}
      ></Select>
      <Button
        variant="primary"
        title="View or Download Documentation"
        rightGlyph={versionChoicesMap[version]?.icon}
        href={versionChoicesMap[version]?.url}
        disabled={buttonDisabled}
        className={cx(disabledStyle)}
      >
        {versionChoicesMap[version]?.icon ? 'Download Documentation' : 'View Documentation'}
      </Button>
    </>
  );
};

export default DeprecatedVersionSelector;
