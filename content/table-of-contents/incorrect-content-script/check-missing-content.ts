#!/usr/bin/env ts-node
import * as fs from 'fs';
import * as path from 'path';
import type { TocItem } from '../types';

interface MissingPage {
  url: string;
  version: string;
  contentSite: string;
  expectedPath: string;
}

class ContentChecker {
  private contentRoot: string;
  private tocData: TocItem[];
  private missingPages: MissingPage[] = [];
  private siteMapping: Map<string, string> = new Map([
    ["manual", "docs"],
    ["c-driver", "c"],
    ["atlas", "cloud-docs"],
    ["atlas-government", "cloudgov"],
    ["django-mongodb", "django"],
    ["mongodb-intellij", "intellij"],
    ["laravel-mongodb", "laravel"],
    ["mongodb-analyzer", "visual-studio-extension"],
    ["pymongo-driver", "pymongo"],
    ["pymongo-arrow-driver", "pymongo-arrow"],
    ["scala-driver", "scala"],
    ["relational-migrator", "docs-relational-migrator"],
    ["kubernetes", "mck"],
    ["kubernetes-operator", "docs-k8s-operator"]
  ]);
  private siteMappingPrefix: Map<string, string> = new Map([
    ["atlas-cli", "atlas/cli"],
    ["c", "languages/c/c-driver"],
    ["atlas-architecture", "atlas/architecture"],
    ["atlas-operator", "atlas/operator"],
    ["atlas-charts", "atlas/charts"],
    ["django", "languages/django/django-mongodb"],
    ["atlas-government", "atlas/government"],
    ["cpp-driver", "languages/cpp/"],
    ["csharp", "drivers/csharp"],
    ["docs-k8s-operator", "kubernetes-operator"],
    ["golang", "drivers/go"],
    ["java", "drivers/java/sync"],
    ["java-rs", "languages/java/reactive-streams-driver"],
    ["kotlin", "drivers/kotlin/coroutine"],
    ["kotlin-sync", "languages/kotlin/kotlin-sync-driver"],
    ["laravel", "drivers/php/laravel-mongodb"],
    ["php", "drivers/php-library"],
    ["pymongo", "languages/python/pymongo-driver"],
    ["pymongo-arrow", "languages/python/pymongo-arrow-driver"],
    ["node", "drivers/node"],
    ["rust", "drivers/rust"],
    ["scala", "languages/scala/scala-driver"],
  ]);

  constructor() {
    this.contentRoot = path.resolve(__dirname, '../../');
    const tocPath = path.join(__dirname, '../output/toc.json');
    this.tocData = JSON.parse(fs.readFileSync(tocPath, 'utf8'));
  }

  // Map contentSite to actual directory name
  private mapSite(contentSite: string): string {
    for (const [directoryName, mappedContentSite] of this.siteMapping) {
      if (mappedContentSite === contentSite) {
        return directoryName;
      }
    }
    return contentSite;
  }

  // Map contentSite to prefix if needed
  private mapSitePrefix(contentSite: string): string {
    for (const [site, prefix] of this.siteMappingPrefix) {
      if (site === contentSite) {
        return prefix;
      }
    }
    return this.mapSite(contentSite);
  }

  private getSitePath(contentSite: string): string {
    const actualSite = this.mapSite(contentSite);
    return path.join(this.contentRoot, actualSite);
  }

  // Check if a site is versioned by examining its directory structure
  private isVersionedSite(contentSite: string): boolean {
    if (!contentSite) {
      return false;
    }
    
    const sitePath = this.getSitePath(contentSite);
    
    if (!fs.existsSync(sitePath)) {
      return false;
    }

    const entries = fs.readdirSync(sitePath, { withFileTypes: true });
    const hasDirectSource = entries.some((entry: any) => entry.isDirectory() && entry.name === 'source');
    
    // If there's a direct source directory, it's non-versioned
    if (hasDirectSource) {
      return false;
    }

    // Double check if there are version-like directories
    const versionDirs = entries.filter((entry: any) => 
      entry.isDirectory() && 
      (entry.name === 'current' || 
       entry.name.match(/^v\d+\.\d+/))
    );

    return versionDirs.length > 0;
  }

  // Get available versions for a versioned site
  private getAvailableVersions(contentSite: string): string[] {
    const sitePath = this.getSitePath(contentSite);
    
    if (!fs.existsSync(sitePath)) {
      return [];
    }

    const entries = fs.readdirSync(sitePath, { withFileTypes: true });

    
    return entries
      .filter((entry: any) => entry.isDirectory())
      .map((entry: any) => entry.name)
      .filter((name: string) => {
        // Check if this directory has a source subdirectory
        const sourcePath = path.join(sitePath, name, 'source');
        return fs.existsSync(sourcePath);
      })
      .sort();
  }

  // Filter versions based on includes/excludes rules
  private filterVersions(versions: string[], versionRules?: { includes?: string[]; excludes?: string[] }): string[] {
    if (!versionRules) {
      return versions;
    }

    let filtered = versions;

    if (versionRules.includes && versionRules.includes.length > 0) {
      filtered = filtered.filter(version => versionRules.includes!.includes(version));
    }

    if (versionRules.excludes && versionRules.excludes.length > 0) {
      filtered = filtered.filter(version => !versionRules.excludes!.includes(version));
    }

    return filtered;
  }

  // Convert URL to file path, handling version substitution
  private urlToFilePath(url: string, contentSite: string, version?: string): string {
    // Remove URL fragments (anything after #)
    let relativePath = url.split('#')[0];
  
    if (relativePath.startsWith('/docs/')) {
      relativePath = relativePath.replace('/docs/', '');
    }

    if (relativePath.includes(':version')) {
      if (version) {
        relativePath = relativePath.replace(/:version/g, version);
      } else {
        // If no version provided but :version exists, return empty path (should be skipped)
        console.error(`URL contains :version placeholder but no version was provided. URL: ${url}, ContentSite: ${contentSite}`);
        return '';
      }
    }

    // Remove contentSite and version in the url to only get the page path
    const sitePrefix = `${this.mapSitePrefix(contentSite)}/`;
    if (relativePath.startsWith(sitePrefix)) {
      relativePath = relativePath.substring(sitePrefix.length);
    }

    if (version && relativePath.startsWith(`${version}/`)) {
      relativePath = relativePath.substring(`${version}/`.length);
    }

    let filePath = relativePath.replace(/\/$/, ''); 

    return filePath;
  }

  // Check if a content file exists
  private checkFileExists(contentSite: string, url: string, version?: string): boolean {
    const actualSite = this.mapSite(contentSite);
    const isVersioned = this.isVersionedSite(contentSite);
    let basePath: string;

    if (isVersioned && version) {
      basePath = path.join(this.contentRoot, actualSite, version, 'source');
    } else if (!isVersioned) {
      basePath = path.join(this.contentRoot, actualSite, 'source');
    } else {
      return false;
    }

    const filePath = this.urlToFilePath(url, contentSite, version);
   
    
    const fullPath = path.join(basePath, filePath);

    // possible ways the page can be declared in content 
    const possibilities = [
      fullPath,
      fullPath + '.txt',
      fullPath + '.rst',
      path.join(path.dirname(fullPath), 'index.txt'),
      path.join(path.dirname(fullPath), 'index.rst'),
      path.join(fullPath, 'index.txt'),
      path.join(fullPath, 'index.rst')
    ];

    return possibilities.some(p => {
      try {
        return fs.existsSync(p) && fs.statSync(p).isFile();
      } catch {
        return false;
      }
    });
  }

  // Adds a missing page array if found
  private checkMissingPage(item: TocItem, version: string): void {
    if (!item.contentSite || !item.url) {
      return;
    }

    if (!this.checkFileExists(item.contentSite, item.url, version)) {
      const filePath = this.urlToFilePath(item.url, item.contentSite, version);
      const actualSite = this.mapSite(item.contentSite);
      const expectedPath = path.join(this.contentRoot, actualSite, version, 'source', filePath);
      
      this.missingPages.push({
        url: item.url,
        version: version,
        contentSite: item.contentSite,
        expectedPath: expectedPath
      });
    }
  } 
    
  //  Process a single TOC item
  private processTocItem(item: TocItem): void {
    if (!item.url || !item.contentSite) {
      return;
    }

    // Skips literal urls 
    if (item.url.startsWith('http')) {
      return;
    }

    const isVersioned = this.isVersionedSite(item.contentSite);

    if (isVersioned) {
      // Get available versions and filter them
      const availableVersions = this.getAvailableVersions(item.contentSite);
      const filteredVersions = this.filterVersions(availableVersions, item.versions);

      for (const version of filteredVersions) {
        this.checkMissingPage(item, version);
      }
    } else {
      // Non-versioned site
      this.checkMissingPage(item, '');
    }
  }

  // Recursively process all TOC items
  private processTocItems(items: TocItem[]): void {
    for (const item of items) {
      this.processTocItem(item);
      
      if (item.items) {
        this.processTocItems(item.items);
      }
    }
  }

  // Generate CSV output
  private generateCSV(): string {
    const header = 'URL,Version,Content Site,Expected Path\n';
    const rows = this.missingPages.map(page => 
      `"${page.url}","${page.version}","${page.contentSite}","${page.expectedPath}"`
    ).join('\n');
    
    return header + rows;
  }

  // Run the content check
  public run(): void {
    console.log('Starting content check...');
    console.log(`Content root: ${this.contentRoot}`);
    
    this.processTocItems(this.tocData);
    
    console.log(`Found ${this.missingPages.length} missing pages`);
    
    // Write CSV output
    const csv = this.generateCSV();
    const outputPath = path.join(__dirname, 'missing-content-pages.csv');
    fs.writeFileSync(outputPath, csv);
    
    console.log(`Results written to: ${outputPath}`);
    
    // Print summary
    const bySite = new Map<string, number>();
    for (const page of this.missingPages) {
      bySite.set(page.contentSite, (bySite.get(page.contentSite) || 0) + 1);
    }
    
    console.log('\nSummary by content site:');
    for (const [site, count] of Array.from(bySite.entries()).sort()) {
      console.log(`  ${site}: ${count} missing pages`);
    }
  }
}

// Run the checker
if (require.main === module) {
  const checker = new ContentChecker();
  checker.run();
}

export { ContentChecker };
