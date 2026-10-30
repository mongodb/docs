'use client';

import { useCallback, useEffect, useState, useMemo, type ReactNode } from 'react';
import queryString from 'query-string';
import { keyBy, isEmpty } from 'lodash';
import { LinkButton, ButtonVariant } from '@via-ds/components/button';
import DownloadIcon from '@via-ds/icons/Download';
import type { Version, Docset } from '@/types/data';
import { useVersionContext } from '@/context/version-context';
import { isBrowser } from '@/utils/is-browser';
import { Select } from '@/mdx-components/Select';
import styles from './deprecated-version-selector.module.scss';

type ProductChoice = {
    text: string;
    value: string;
};

export type VersionChoice = {
    text: string;
    value: string;
    versionName: string;
    url?: string;
    isDownload: boolean;
    icon?: ReactNode;
};

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
const hasValidHostName = (docset: Docset) => Boolean(docset?.prefix);

/**
 * A docset has EOL versions when any version is inactive and still surfaced as
 * end-of-life. Pool stored this as a `hasEolVersions` flag that could drift
 * from the versions themselves; it is derived now.
 */
const hasEolVersions = (docset: Docset) =>
    docset.versions.some((version) => !version.active && version.eolType);

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
    const eolDocsets = docsets.filter(hasEolVersions);
    const eolDocsetsMap = keyBy(eolDocsets, 'project');
    const [productName, setProductName] = useState('');
    const [version, setVersion] = useState('');
    const [reposMap, setReposMap] = useState(eolDocsetsMap);

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

    const generateUrl = useCallback((currentVersion: Version, reposObj: Docset) => {
        if (!currentVersion) {
            return null;
        }

        // Utilizing hardcoded env or aws bucket path because legacy sites are not available on dev/stage
        if (currentVersion.eolType === 'download') {
            const offlineURL = 'https://www.mongodb.com/docs/offline';
            return currentVersion.offlineUrl?.length
                ? currentVersion.offlineUrl
                : `${offlineURL}/${reposObj.project}-${currentVersion.versionName}.tar.gz`;
        }
        if (hasValidHostName(reposObj)) {
            const hostName = 'https://mongodb.com/' + reposObj.prefix;
            return `${hostName}/${currentVersion.versionName}`;
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
                ...reposObj.versions.map((version) => {
                    //only include versions with an eolType field
                    if (version.eolType && version.versionSelectorLabel) {
                        return {
                            text: prefixVersion(version.versionSelectorLabel),
                            value: version.versionSelectorLabel,
                            versionName: version.versionName,
                            isDownload: version.eolType === 'download',
                            icon: version.eolType === 'download' ? <DownloadIcon /> : null,
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

    const isDownload = !!versionChoicesMap[version]?.isDownload;
    const buttonDisabled = !(productName && version && !isEmpty(reposMap));

    // Fetch docsets for url
    useEffect(() => {
        const createReposMap = async () => {
            try {
                const docsetsResponse = await fetch(`/docs/platform/api/docsets`);
                const docsets: Docset[] = await docsetsResponse.json();

                const eolDocsetsMap = keyBy(docsets.filter(hasEolVersions), 'project');
                if (!isEmpty(eolDocsetsMap)) setReposMap(eolDocsetsMap);
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
                className={styles.select}
                choices={productChoices}
                defaultText="Product"
                label="Select a Product"
                onChange={updateProduct}
                value={productName}
            />
            <Select
                className={styles.select}
                choices={versionChoices}
                defaultText="Version"
                disabled={productName === ''}
                label="Select a Version"
                onChange={updateVersion}
                value={version}
            ></Select>
            <LinkButton
                variant={ButtonVariant.Primary}
                href={versionChoicesMap[version]?.url}
                isDisabled={buttonDisabled}
            >
                {isDownload ? 'Download Documentation' : 'View Documentation'}
                {isDownload && <DownloadIcon />}
            </LinkButton>
        </>
    );
};

export default DeprecatedVersionSelector;