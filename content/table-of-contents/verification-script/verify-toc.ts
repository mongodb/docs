import * as fs from 'node:fs';
import * as path from 'node:path';
// import { fileURLToPath } from 'node:url';
import { toc } from '../toc';
import type { TocItem } from '../types';
import type { ComparisonResult, VerificationResult } from './types';
import { config, remapSite, urlPrefixes } from './verification-config';

/**
 * Flattens a tree of TocItems into a single-level array.
 * @param items The array of items to flatten.
 * @returns An array containing every TocItem used in the toc
 */
function flattenToc(items: TocItem[]): TocItem[] {
  const flatList: TocItem[] = [];

  function collect(currentItems: TocItem[]) {
    for (const item of currentItems) {
      // add item to list
      flatList.push(item);

      // recurse as needed
      if (item.items) {
        collect(item.items);
      }
    }
  }

  collect(items);

  console.log(`Found ${flatList.length} ToC entries`);
  return flatList;
}

/**
 * Groups a flat list of TocItems by their `contentSite` property.
 *
 * @param items array of TocItem objects
 * @returns A Map where each key is a `contentSite` and the value is an
 * array of all TocItems from that site.
 */
function groupByContentSite(items: TocItem[]): Map<string, TocItem[]> {
  const grouped = new Map<string, TocItem[]>();

  for (const item of items) {
    const key = String(item.contentSite);
    const group = grouped.get(key);

    if (group) {
      group.push(item);
    } else {
      grouped.set(key, [item]);
    }
  }

  console.log(`Grouped ToC entries into ${grouped.size} sites`);
  return grouped;
}

/**
 * Gets all .txt files from every version of every site specified in the toc
 *
 * @param sites array of contentSite strings
 * @returns A Map where each key is a `contentSite` and the value is an
 * array of .txt file paths.
 */
function retrieveAllContentFiles(sites: string[]): Map<string, string[]> {
  const allFiles = new Map<string, string[]>();
  //const __filename = fileURLToPath(import.meta.url);
  //const __dirname = path.dirname(__filename);
  const basePath = path.join(__dirname, '..', '..');

  function walkDir(site: string, dirPath: string) {
    // check if dir exists
    if (!fs.existsSync(dirPath)) {
      console.log(`
        ${site} might not be migrated to the monorepo. The following dir does not exist:
        ${dirPath}
        `);
      return;
    }

    // get all contents of the dir
    const dirContents = fs.readdirSync(dirPath);

    for (const item of dirContents) {
      const itemPath = path.join(dirPath, item);
      // check if item exists
      if (!fs.existsSync(itemPath)) {
        console.log(`
          Skipping ${itemPath} - it does not exist
        `);
        continue;
      }
      const itemStats = fs.statSync(itemPath);

      if (itemStats.isDirectory()) {
        // if it is a dir, we want to search it for more .txt files
        walkDir(site, itemPath);
      } else if (itemStats.isFile() && path.extname(itemPath) === '.txt') {
        // if it is a .txt file we want to store it
        allFiles.get(site)?.push(itemPath);
      }
    }
  }

  function collectFiles(site: string) {
    let dirName: string = site;
    // "undefined" site indicates isExternal = true so there are no monorepo files for these
    if (site === 'undefined') {
      console.log(`Skipping "undefined" site because these are external sites`);
      return;
    }
    if (remapSite.has(site)) {
      console.log(
        `Remapping "${dirName}" site to "${remapSite.get(site)}" to match monorepo file structure`,
      );
      dirName = remapSite.get(site) as string;
    }
    // check if/what versions we need to consider
    if (config.has(site)) {
      const versions = config.get(site) as string[];
      for (const v of versions) {
        const targetPath = path.join(basePath, dirName, v, 'source');
        walkDir(site, targetPath);
      }
    } else {
      // unversioned sites
      const targetPath = path.join(basePath, dirName, 'source');
      walkDir(site, targetPath);
    }
  }

  for (const site of sites) {
    allFiles.set(site, []);
    collectFiles(site);
  }

  return allFiles;
}

/**
 * Reads a .txt file to check if it has been marked :orphan:
 *
 * @param file relative path to file starting at the /content dir
 * @returns boolean, true if the file is marked :orphan:, false if not
 */
function isMarkedOrphan(file: string): boolean {
  const basePath = path.join(__dirname, '..', '..');
  const filePath = path.join(basePath, file);

  const itemStats = fs.statSync(filePath);
  // make sure this is a file and not a dir
  if (itemStats.isFile()) {
    const fileContents = fs.readFileSync(filePath, 'utf-8').split('\n');

    for (const line of fileContents) {
      if (line.trim().toLowerCase() === ':orphan:') {
        console.log(`Orphan Page - Skipping ${file}`);
        return true;
      }
    }
  } else {
    console.log(`NOT A FILE - Tried to check ${file}`);
  }

  return false;
}

/**
 * Checks to see if a file is an "included" file
 *
 * @param file relative path to file starting at the /content dir
 * @returns boolean, true if the file has "/include" in its path, false if not
 */
function isIncludedFile(file: string): boolean {
  if (file.includes('/includes/')) {
    console.log(`INCLUDED FILE - Skipping ${file}`);
    return true;
  }

  return false;
}

/**
 * Checks all identified .txt files to see if they are represented in the ToC
 *
 * @param tocEntries a Map where each key is a contentSite string and
 * the value is an array of all .txt files in that site
 * @param siteFiles a Map where each key is a contentSite string and
 * the value is an array of all TocItems from that site.
 * @returns a ComparisonResult object containing all matched and missed files from the site
 */
function compareFilesToToc(
  tocEntries: Map<string, TocItem[]>,
  siteFiles: Map<string, string[]>,
): ComparisonResult {
  const missedFiles = new Map<string, VerificationResult[]>();
  const matchedFiles = new Map<string, VerificationResult[]>();

  for (const site of siteFiles.keys()) {
    const files = siteFiles.get(site);
    // continue if no files
    if (files?.length === 0) {
      continue;
    }
    const entries = tocEntries.get(site) as TocItem[];
    // create a set for faster lookups
    const tocLookup = new Set(entries.map((item) => item.url));
    // shorten the file paths for easier comparison
    const shortFiles = files?.map((file) => file.split('/content')[1]) || [];

    // convert each file into the url representation and see if it has a match
    for (const f of shortFiles) {
      let tempUrl = f;

      // Handle edge cases with URL names
      if (site === 'docs') {
        // remove the initial "manual" prefix from the path
        tempUrl = f.replace('/manual', '');
      } else if (site === 'atlas-operator') {
        tempUrl = f.replace('/atlas-operator', '/operator');
      } else if (site === 'atlas-cli') {
        tempUrl = f.replace('/atlas-cli', '/cli');
      } else if (site === 'golang') {
        tempUrl = f.replace('/golang', '/go');
      } else if (site === 'java') {
        tempUrl = f.replace('/java', '/java/sync');
      } else if (site === 'java-rs') {
        tempUrl = f.replace('/java-rs', '/java/reactive-streams-driver');
      } else if (site === 'kotlin') {
        tempUrl = f.replace('/kotlin', '/kotlin/coroutine');
      } else if (site === 'kotlin-sync') {
        tempUrl = f.replace('/kotlin-sync', '/kotlin/kotlin-sync-driver');
      } else if (site === 'laravel') {
        tempUrl = f.replace('/laravel', '/php/laravel');
      } else if (site === 'django') {
        tempUrl = f.replace('/django', '/python/django');
      } else if (site === 'atlas-architecture') {
        tempUrl = f.replace('/atlas-architecture', '/architecture');
      } else if (site === 'landing') {
        tempUrl = f.replace('/landing', '');
      }

      const versionRegex = /\/v\d+\.\d+|\/upcoming|\/current|\/rapid|\/manual/;
      let targetURL = tempUrl
        .replace(versionRegex, '/:version') // Replace version string like /v8.3 or /v10.12 or current/rapid/upcoming
        .replace('/source', '') // Remove /source
        .replace('.txt', '') // Remove .txt extension
        .replace('/v1.x', '/:version') // fix for php-library
        .replace('/v4.x', '/:version'); // fix for laravel

      // add url prefixes if needed
      targetURL = (urlPrefixes.get(site) || '') + targetURL;

      // all docs sites need this prefix
      targetURL = `/docs${targetURL}`;

      // check if this is a landing page (index.txt)
      if (targetURL.endsWith('/index')) {
        targetURL = targetURL.slice(0, -'/index'.length);
        console.log(
          'new target url for page ending in index.txt:',
          f,
          targetURL,
        );
      }

      // UNCOMMENT TO DEBUG URL PREFIX ISSUES
      //console.log(site, targetURL);
      //break

      // Compare and store results
      if (tocLookup.has(targetURL) || tocLookup.has(`${targetURL}/`)) {
        if (tocLookup.has(`${targetURL}/`)) {
          targetURL += '/';
        }

        const matchedItem: VerificationResult = {
          matched: true,
          filePath: f,
          tocUrl: targetURL,
          targetUrl: targetURL,
        };
        if (!matchedFiles.has(site)) {
          matchedFiles.set(site, [] as VerificationResult[]);
        }
        matchedFiles.get(site)?.push(matchedItem);
      } else if (isMarkedOrphan(f)) {
      } else if (isIncludedFile(f)) {
      } else {
        const missedItem: VerificationResult = {
          matched: false,
          filePath: f,
          tocUrl: null,
          targetUrl: targetURL,
        };
        if (!missedFiles.has(site)) {
          missedFiles.set(site, [] as VerificationResult[]);
        }
        missedFiles.get(site)?.push(missedItem);
      }
    }
  }

  const results: ComparisonResult = {
    matchedFiles: matchedFiles,
    missedFiles: missedFiles,
  };

  return results;
}

/**
 * Generates string (csv) representations of ToC comparison results
 *
 * @param results a ComparisonResults object
 * @returns [string,string] - the first string is the matched files, the second
 * is missed files.
 */
function generateReport(results: ComparisonResult): [string, string] {
  function generateString(r: Map<string, VerificationResult[]>): string {
    let output = 'site,file path,expected url,matched toc url\n';
    let entries = 0;

    for (const site of r.keys()) {
      const sortedResults =
        r.get(site)?.sort((a, b) => a.targetUrl.localeCompare(b.targetUrl)) ||
        [];
      for (const result of sortedResults) {
        output += `${site},${result.filePath},${result.targetUrl},${result.tocUrl}\n`;
        entries++;
      }
    }
    console.log(`Created ${entries} entries`);
    return output;
  }

  console.log('Creating matched file report: ');
  const matched = generateString(results.matchedFiles);
  console.log('Creating missed file report: ');
  const missed = generateString(results.missedFiles);

  return [matched, missed];
}

// write report
function writeReport(fileName: string, content: string) {
  const csvPath = path.join(__dirname, fileName);
  fs.writeFileSync(csvPath, content, { encoding: 'utf-8' });
}

/**
 * Entrypoint for script logic
 */
function main() {
  console.log('Starting script');
  console.log('Flattening ToC array');
  const allItems = flattenToc(toc);
  console.log('Grouping ToC entries by site');
  const groupedItems = groupByContentSite(allItems);
  const listOfSites = [...groupedItems.keys()];
  const groupedFiles = retrieveAllContentFiles(listOfSites);
  console.log('All files retrieved');
  const comparisonResult = compareFilesToToc(groupedItems, groupedFiles);
  const [foundReport, missedReport] = generateReport(comparisonResult);
  writeReport('missed.csv', missedReport);
  writeReport('matched.csv', foundReport);
}

main();
