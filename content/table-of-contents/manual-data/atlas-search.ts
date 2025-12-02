import type { TocItem } from '../types';

const tocData: TocItem[] = [
  {
    label: 'Quick Start',
    contentSite: 'cloud-docs',
    url: '/docs/atlas/atlas-search/tutorial',
    collapsible: true,
    items: [
      {
        label: 'Autocomplete and Partial Matching',
        contentSite: 'cloud-docs',
        url: '/docs/atlas/atlas-search/tutorial/partial-match',
      },
      {
        label: 'Facets',
        contentSite: 'cloud-docs',
        url: '/docs/atlas/atlas-search/tutorial/facet-tutorial',
      },
    ],
  },
  {
    label: 'Queries & Indexes',
    contentSite: 'cloud-docs',
    url: '/docs/atlas/atlas-search/searching',
    collapsible: true,
    items: [
      {
        label: 'Manage Indexes',
        contentSite: 'cloud-docs',
        url: '/docs/atlas/atlas-search/manage-indexes',
      },
      {
        label: 'Index Reference',
        contentSite: 'cloud-docs',
        url: '/docs/atlas/atlas-search/index-definitions',
        collapsible: true,
        items: [
          {
            label: 'Analyzers',
            contentSite: 'cloud-docs',
            url: '/docs/atlas/atlas-search/analyzers',
            collapsible: true,
            items: [
              {
                label: 'Standard',
                contentSite: 'cloud-docs',
                url: '/docs/atlas/atlas-search/analyzers/standard',
              },
              {
                label: 'Simple',
                contentSite: 'cloud-docs',
                url: '/docs/atlas/atlas-search/analyzers/simple',
              },
              {
                label: 'Whitespace',
                contentSite: 'cloud-docs',
                url: '/docs/atlas/atlas-search/analyzers/whitespace',
              },
              {
                label: 'Keyword',
                contentSite: 'cloud-docs',
                url: '/docs/atlas/atlas-search/analyzers/keyword',
              },
              {
                label: 'Language',
                contentSite: 'cloud-docs',
                url: '/docs/atlas/atlas-search/analyzers/language',
              },
              {
                label: 'Multi',
                contentSite: 'cloud-docs',
                url: '/docs/atlas/atlas-search/analyzers/multi',
              },
              {
                label: 'Custom',
                contentSite: 'cloud-docs',
                url: '/docs/atlas/atlas-search/analyzers/custom',
                collapsible: true,
                items: [
                  {
                    label: 'Character Filters',
                    contentSite: 'cloud-docs',
                    url: '/docs/atlas/atlas-search/analyzers/character-filters',
                  },
                  {
                    label: 'Tokenizers',
                    contentSite: 'cloud-docs',
                    url: '/docs/atlas/atlas-search/analyzers/tokenizers',
                  },
                  {
                    label: 'Token Filters',
                    contentSite: 'cloud-docs',
                    url: '/docs/atlas/atlas-search/analyzers/token-filters',
                  },
                ],
              },
            ],
          },
          {
            label: 'Field Mappings',
            contentSite: 'cloud-docs',
            url: '/docs/atlas/atlas-search/define-field-mappings',
            collapsible: true,
            items: [
              {
                label: 'array',
                contentSite: 'cloud-docs',
                url: '/docs/atlas/atlas-search/field-types/array-type',
              },
              {
                label: 'autocomplete',
                contentSite: 'cloud-docs',
                url: '/docs/atlas/atlas-search/field-types/autocomplete-type',
              },
              {
                label: 'boolean',
                contentSite: 'cloud-docs',
                url: '/docs/atlas/atlas-search/field-types/boolean-type',
              },
              {
                label: 'date',
                contentSite: 'cloud-docs',
                url: '/docs/atlas/atlas-search/field-types/date-type',
              },
              {
                label: 'dateFacet',
                contentSite: 'cloud-docs',
                url: '/docs/atlas/atlas-search/field-types/date-facet-type',
              },
              {
                label: 'document',
                contentSite: 'cloud-docs',
                url: '/docs/atlas/atlas-search/field-types/document-type',
              },
              {
                label: 'embeddedDocuments',
                contentSite: 'cloud-docs',
                url: '/docs/atlas/atlas-search/field-types/embedded-documents-type',
              },
              {
                label: 'geo',
                contentSite: 'cloud-docs',
                url: '/docs/atlas/atlas-search/field-types/geo-type',
              },
              {
                label: 'knnVector',
                contentSite: 'cloud-docs',
                url: '/docs/atlas/atlas-search/field-types/knn-vector',
              },
              {
                label: 'number',
                contentSite: 'cloud-docs',
                url: '/docs/atlas/atlas-search/field-types/number-type',
              },
              {
                label: 'numberFacet',
                contentSite: 'cloud-docs',
                url: '/docs/atlas/atlas-search/field-types/number-facet-type',
              },
              {
                label: 'objectId',
                contentSite: 'cloud-docs',
                url: '/docs/atlas/atlas-search/field-types/object-id-type',
              },
              {
                label: 'string',
                contentSite: 'cloud-docs',
                url: '/docs/atlas/atlas-search/field-types/string-type',
              },
              {
                label: 'stringFacet',
                contentSite: 'cloud-docs',
                url: '/docs/atlas/atlas-search/field-types/string-facet-type',
              },
              {
                label: 'token',
                contentSite: 'cloud-docs',
                url: '/docs/atlas/atlas-search/field-types/token-type',
              },
              {
                label: 'uuid',
                contentSite: 'cloud-docs',
                url: '/docs/atlas/atlas-search/field-types/uuid-type',
              },
              {
                label: 'vector',
                contentSite: 'cloud-docs',
                url: '/docs/atlas/atlas-search/field-types/vector-type',
              },
            ],
          },
          {
            label: 'Stored Source',
            contentSite: 'cloud-docs',
            url: '/docs/atlas/atlas-search/stored-source-definition',
          },
          {
            label: 'Synonym Mappings',
            contentSite: 'cloud-docs',
            url: '/docs/atlas/atlas-search/synonyms',
          },
          {
            label: 'Index Partitions',
            contentSite: 'cloud-docs',
            url: '/docs/atlas/atlas-search/index-partition',
          },
        ],
      },
      {
        label: 'Query Reference',
        contentSite: 'cloud-docs',
        url: '/docs/atlas/atlas-search/query-ref',
        collapsible: true,
        items: [
          {
            label: 'Pipeline Stages',
            contentSite: 'cloud-docs',
            url: '/docs/atlas/atlas-search/query-syntax',
            collapsible: true,
            items: [
              {
                label: 'Documents: $search',
                contentSite: 'cloud-docs',
                url: '/docs/atlas/atlas-search/aggregation-stages/search',
              },
              {
                label: 'Metadata: $searchMeta',
                contentSite: 'cloud-docs',
                url: '/docs/atlas/atlas-search/aggregation-stages/searchMeta',
              },
            ],
          },
          {
            label: 'Operators & Collectors',
            contentSite: 'cloud-docs',
            url: '/docs/atlas/atlas-search/operators-and-collectors',
            collapsible: true,
            items: [
              {
                label: 'autocomplete',
                contentSite: 'cloud-docs',
                url: '/docs/atlas/atlas-search/operators-collectors/autocomplete',
              },
              {
                label: 'compound',
                contentSite: 'cloud-docs',
                url: '/docs/atlas/atlas-search/operators-collectors/compound',
              },
              {
                label: 'embeddedDocument',
                contentSite: 'cloud-docs',
                url: '/docs/atlas/atlas-search/operators-collectors/embedded-document',
              },
              {
                label: 'equals',
                contentSite: 'cloud-docs',
                url: '/docs/atlas/atlas-search/operators-collectors/equals',
              },
              {
                label: 'exists',
                contentSite: 'cloud-docs',
                url: '/docs/atlas/atlas-search/operators-collectors/exists',
              },
              {
                label: 'facet',
                contentSite: 'cloud-docs',
                url: '/docs/atlas/atlas-search/operators-collectors/facet',
              },
              {
                label: 'geoShape',
                contentSite: 'cloud-docs',
                url: '/docs/atlas/atlas-search/operators-collectors/geoShape',
              },
              {
                label: 'geoWithin',
                contentSite: 'cloud-docs',
                url: '/docs/atlas/atlas-search/operators-collectors/geoWithin',
              },
              {
                label: 'hasAncestor',
                contentSite: 'cloud-docs',
                url: '/docs/atlas/atlas-search/operators-collectors/hasAncestor',
              },
              {
                label: 'hasRoot',
                contentSite: 'cloud-docs',
                url: '/docs/atlas/atlas-search/operators-collectors/hasRoot',
              },
              {
                label: 'in',
                contentSite: 'cloud-docs',
                url: '/docs/atlas/atlas-search/operators-collectors/in',
              },
              {
                label: 'knnBeta (Deprecated)',
                contentSite: 'cloud-docs',
                url: '/docs/atlas/atlas-search/operators-collectors/knn-beta',
              },
              {
                label: 'morelikethis',
                contentSite: 'cloud-docs',
                url: '/docs/atlas/atlas-search/operators-collectors/morelikethis',
              },
              {
                label: 'near',
                contentSite: 'cloud-docs',
                url: '/docs/atlas/atlas-search/operators-collectors/near',
              },
              {
                label: 'phrase',
                contentSite: 'cloud-docs',
                url: '/docs/atlas/atlas-search/operators-collectors/phrase',
              },
              {
                label: 'queryString',
                contentSite: 'cloud-docs',
                url: '/docs/atlas/atlas-search/operators-collectors/queryString',
              },
              {
                label: 'range',
                contentSite: 'cloud-docs',
                url: '/docs/atlas/atlas-search/operators-collectors/range',
              },
              {
                label: 'regex',
                contentSite: 'cloud-docs',
                url: '/docs/atlas/atlas-search/operators-collectors/regex',
              },
              {
                label: 'span (Deprecated)',
                contentSite: 'cloud-docs',
                url: '/docs/atlas/atlas-search/operators-collectors/span',
              },
              {
                label: 'text',
                contentSite: 'cloud-docs',
                url: '/docs/atlas/atlas-search/operators-collectors/text',
              },
              {
                label: 'vectorSearch',
                contentSite: 'cloud-docs',
                url: '/docs/atlas/atlas-search/operators-collectors/vectorSearch',
              },
              {
                label: 'wildcard',
                contentSite: 'cloud-docs',
                url: '/docs/atlas/atlas-search/operators-collectors/wildcard',
              },
            ],
          },
          {
            label: 'Query Path',
            contentSite: 'cloud-docs',
            url: '/docs/atlas/atlas-search/path-construction',
          },
          {
            label: 'Search Options',
            contentSite: 'cloud-docs',
            url: '/docs/atlas/atlas-search/search-options',
            collapsible: true,
            items: [
              {
                label: 'score',
                contentSite: 'cloud-docs',
                url: '/docs/atlas/atlas-search/scoring',
                collapsible: true,
                items: [
                  {
                    label: 'Score Options',
                    contentSite: 'cloud-docs',
                    url: '/docs/atlas/atlas-search/score/modify-score',
                  },
                  {
                    label: 'Score Details',
                    contentSite: 'cloud-docs',
                    url: '/docs/atlas/atlas-search/score/get-details',
                  },
                ],
              },
              {
                label: 'sort',
                contentSite: 'cloud-docs',
                url: '/docs/atlas/atlas-search/sort',
              },
              {
                label: 'highlight',
                contentSite: 'cloud-docs',
                url: '/docs/atlas/atlas-search/highlighting',
              },
              {
                label: 'count',
                contentSite: 'cloud-docs',
                url: '/docs/atlas/atlas-search/counting',
              },
              {
                label: 'searchSequenceToken',
                contentSite: 'cloud-docs',
                url: '/docs/atlas/atlas-search/paginate-results',
              },
              {
                label: 'returnScope',
                contentSite: 'cloud-docs',
                url: '/docs/atlas/atlas-search/return-scope',
              },
              {
                label: 'tracking',
                contentSite: 'cloud-docs',
                url: '/docs/atlas/atlas-search/tracking',
              },
            ],
          },
          {
            label: 'Performance Options',
            contentSite: 'cloud-docs',
            url: '/docs/atlas/atlas-search/performance-options',
            collapsible: true,
            items: [
              {
                label: 'concurrent',
                contentSite: 'cloud-docs',
                url: '/docs/atlas/atlas-search/concurrent-query',
              },
              {
                label: 'returnStoredSource',
                contentSite: 'cloud-docs',
                url: '/docs/atlas/atlas-search/return-stored-source',
              },
            ],
          },
        ],
      },
      {
        label: 'Transform Documents & Filter Collections',
        contentSite: 'cloud-docs',
        url: '/docs/atlas/atlas-search/transform-documents-collections',
      },
      {
        label: 'Search Playground',
        contentSite: 'cloud-docs',
        url: '/docs/atlas/atlas-search/playground',
      },
    ],
  },
  {
    label: 'Improve Accuracy',
    contentSite: 'cloud-docs',
    url: '/docs/atlas/atlas-search/accuracy',
    collapsible: true,
    items: [
      {
        label: 'Customize Score',
        contentSite: 'cloud-docs',
        url: '/docs/atlas/atlas-search/customize-score',
      },
      {
        label: 'Hybrid Search',
        contentSite: 'cloud-docs',
        url: '/docs/atlas/atlas-search/tutorial/hybrid-search',
      },
      {
        label: 'Synonyms',
        contentSite: 'cloud-docs',
        url: '/docs/atlas/atlas-search/tutorial/synonyms-tutorial',
      },
      {
        label: 'Explain Plan & Statistics',
        contentSite: 'cloud-docs',
        url: '/docs/atlas/atlas-search/explain',
      },
    ],
  },
  {
    label: 'Improve Performance',
    contentSite: 'cloud-docs',
    url: '/docs/atlas/atlas-search/performance',
    collapsible: true,
    items: [
      {
        label: 'Indexes',
        contentSite: 'cloud-docs',
        url: '/docs/atlas/atlas-search/performance/index-performance',
      },
      {
        label: 'Queries',
        contentSite: 'cloud-docs',
        url: '/docs/atlas/atlas-search/performance/query-performance',
      },
    ],
  },
  {
    label: 'Review Deployment Options',
    contentSite: 'cloud-docs',
    url: '/docs/atlas/atlas-search/about/deployment-options',
  },
  {
    label: 'Monitor Atlas Search',
    contentSite: 'cloud-docs',
    url: '/docs/atlas/atlas-search/monitoring',
    collapsible: true,
    items: [
      {
        label: 'Manage Alerts',
        contentSite: 'cloud-docs',
        url: 'https://www.mongodb.com/docs/atlas/reference/alert-resolutions/atlas-search-alerts',
      },
      {
        label: 'Review Metrics',
        contentSite: 'cloud-docs',
        url: 'https://www.mongodb.com/docs/atlas/review-atlas-search-metrics',
      },
      {
        label: 'View Query Analytics',
        contentSite: 'cloud-docs',
        url: '/docs/atlas/atlas-search/view-query-analytics',
      },
    ],
  },
  {
    label: 'Design Search for Your Data Model',
    contentSite: 'cloud-docs',
    url: '/docs/atlas/atlas-search/design-patterns',
    collapsible: true,
    items: [
      {
        label: 'Search Non-Alphabetical Data as Strings',
        contentSite: 'cloud-docs',
        url: '/docs/atlas/atlas-search/tutorial/string-operators-tutorial',
      },
      {
        label: 'Embedded Documents',
        contentSite: 'cloud-docs',
        url: '/docs/atlas/atlas-search/tutorial/embedded-documents-tutorial',
      },
      {
        label: 'Multiple Collections',
        contentSite: 'cloud-docs',
        url: '/docs/atlas/atlas-search/tutorial/cross-collection-tutorials',
      },
      {
        label: 'Use Compatible Views',
        contentSite: 'cloud-docs',
        url: '/docs/atlas/atlas-search/view-support',
      },
    ],
  },
  {
    label: 'Compatibility & Limitations',
    contentSite: 'cloud-docs',
    url: '/docs/atlas/atlas-search/about/feature-compatibility',
  },
  {
    label: 'Changelog',
    contentSite: 'cloud-docs',
    url: 'https://www.mongodb.com/docs/atlas/atlas-search/changelog/',
  },
];

export default tocData;
