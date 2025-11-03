import { toc } from '../toc';
import type { TocItem } from '../types';

const DocSitesTesting = [
  'atlas-architecture',
  'charts',
  'atlas-cli',
  'atlas-operator',
  'bi-connector',
  'c',
  'cloud-docs',
  'cloud-manager',
  'cloudgov',
  'cluster-sync',
  'compass',
  'cpp-driver',
  'csharp',
  'database-tools',
  'datalake',
  'django',
  'drivers',
  'entity-framework',
  'golang',
  'hibernate',
  'java',
  'java-rs',
  'docs-k8s-operator',
  'docs-relational-migrator',
  'kafka-connector',
  'kotlin',
  'kotlin-sync',
  'laravel',
  'mck',
  'mcp-server',
  'meta',
  'mongocli',
  'intellij',
  'mongodb-shell',
  'mongodb-analyzer',
  'mongodb-vscode',
  'mongosync',
  'mongoid',
  'node',
  'ops-manager',
  'php-library',
  'pymongo-arrow',
  'pymongo',
  'ruby-driver',
  'rust',
  'scala',
  'docs',
  'guides',
  'spark-connector',
  'visual-studio-extension',
  'landing',
];

describe('tocData', () => {
  let result: TocItem[];

  beforeEach(() => {
    // Export the unifiedToc function and call it before each test
    result = toc;
  });

  describe('function call', () => {
    it('should return an array', () => {
      expect(Array.isArray(result)).toBe(true);
    });

    it('should return a non-empty array', () => {
      expect(result.length).toBeGreaterThan(0);
    });
  });

  describe('structure validation', () => {
    it('should have correct top-level structure for each item', () => {
      result.forEach((item) => {
        const getStarted = item.label.toLowerCase();
        // Check required properties exist
        expect(item).toHaveProperty('label');
        expect(item).toHaveProperty('url');
        expect(item).toHaveProperty('contentSite');

        if (!getStarted.includes('get started')) {
          expect(item).toHaveProperty('items');
        }

        // Check types
        expect(typeof item.label).toBe('string');
        expect(typeof item.url).toBe('string');
        expect(typeof item.contentSite).toBe('string');

        if (!getStarted.includes('get started')) {
          expect(Array.isArray(item.items)).toBe(true);
        }

        // Check contentSite is a valid DocSites enum value
        expect(Object.values(DocSitesTesting)).toContain(item.contentSite);
      });
    });

    it('should have valid contentSite values', () => {
      const validContentSites = Object.values(DocSitesTesting);
      result.forEach((item) => {
        expect(validContentSites).toContain(item.contentSite);
      });
    });
  });

  describe('nested structure validation', () => {
    it('should have valid nested items structure', () => {
      const validateNestedItems = (items: TocItem[] | undefined, depth = 0) => {
        items?.forEach((item) => {
          // Check required properties for nested items
          expect(item).toHaveProperty('label');
          expect(typeof item.label).toBe('string');

          // Check optional properties if they exist
          if (item.url) {
            expect(typeof item.url).toBe('string');
          }
          if (item.contentSite) {
            expect(typeof item.contentSite).toBe('string');
            expect(Object.values(DocSitesTesting)).toContain(item.contentSite);
          }
          if (item.group) {
            expect(typeof item.group).toBe('boolean');
          }
          if (item.collapsible) {
            expect(typeof item.collapsible).toBe('boolean');
          }
          if (item.versionDropdown) {
            expect(typeof item.versionDropdown).toBe('boolean');
          }
          if (item.showSubNav) {
            expect(typeof item.showSubNav).toBe('boolean');
          }
          if (item.breadcrumbs) {
            expect(Array.isArray(item.breadcrumbs)).toBe(true);
            item.breadcrumbs.forEach((crumb: any) => {
              expect(crumb).toHaveProperty('path');
              expect(crumb).toHaveProperty('title');
              expect(typeof crumb.path).toBe('string');
              expect(typeof crumb.title).toBe('string');
            });
          }

          // Recursively validate nested items
          if (item.items && Array.isArray(item.items)) {
            // Prevent infinite recursion
            // 10 being an arbitrary number
            expect(depth).toBeLessThan(10);
            validateNestedItems(item.items, depth + 1);
          }
        });
      };

      result.forEach((item) => {
        validateNestedItems(item.items);
      });
    });
  });

  describe('specific content validation', () => {
    it('should contain expected top-level sections', () => {
      const labels = result.map((item) => item.label);
      //TODO: Once DOP-5379 is complete, we can update this to support the real data
      expect(labels).toContain('Tools');
      expect(labels).toContain('Atlas Architecture Center');
      expect(labels).toContain('Client Libraries');
    });

    it('should have correct contentSite assignments', () => {
      const toolsItem = result.find((item) => item.label === 'Tools');
      const atlasItem = result.find(
        (item) => item.label === 'Atlas Architecture Center',
      );
      const clientLibrariesItem = result.find(
        (item) => item.label === 'Client Libraries',
      );

      expect(toolsItem?.contentSite).toBe('landing');
      expect(atlasItem?.contentSite).toBe('atlas-architecture');
      expect(clientLibrariesItem?.contentSite).toBe('drivers');
    });

    it('should have valid URLs', () => {
      const validateUrls = (items: any[]) => {
        items.forEach((item) => {
          if (item.url) {
            // Check if URL is either a relative path starting with / or an external URL
            expect(item.url).toMatch(/^(\/|https:\/\/)/);
          }
          if (item.items && Array.isArray(item.items)) {
            validateUrls(item.items);
          }
        });
      };

      result.forEach((item) => {
        validateUrls([item]);
      });
    });
  });

  // TODO: Test for version dropdowns
});

describe('Generator call', () => {
  it('spies on generateJSON', () => {
    jest.isolateModules(() => {
      const createJson = require('../src/utils/create-json-file');
      const spy = jest
        .spyOn(createJson, 'generateJSON')
        .mockImplementation(() => {});

      const { toc } = require('../toc');
      require('../main');

      expect(spy).toHaveBeenCalledWith(toc);
      spy.mockRestore();
    });
  });
});
