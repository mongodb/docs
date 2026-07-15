import type { TocItem } from '../types';

const tocData: TocItem[] = [
  {
    label: 'Quick Start',
    contentSite: 'search',
    url: '/docs/search/tutorial',
    collapsible: true,
    items: [
      {
        label: 'Autocomplete and Partial Matching',
        contentSite: 'search',
        url: '/docs/search/tutorial/partial-match',
      },
      {
        label: 'Facets',
        contentSite: 'search',
        url: '/docs/search/tutorial/facet-tutorial',
      },
    ],
  },
  {
    label: 'Queries & Indexes',
    contentSite: 'search',
    url: '/docs/search/about/searching',
    collapsible: true,
    items: [
      {
        label: 'Manage Indexes',
        contentSite: 'search',
        url: '/docs/search/index/manage-indexes',
      },
      {
        label: 'Index Reference',
        contentSite: 'search',
        url: '/docs/search/index/index-definitions',
        collapsible: true,
        items: [
          {
            label: 'Analyzers',
            contentSite: 'search',
            url: '/docs/search/index/analyzers/overview',
            collapsible: true,
            items: [
              {
                label: 'Standard',
                contentSite: 'search',
                url: '/docs/search/index/analyzers/standard',
              },
              {
                label: 'Simple',
                contentSite: 'search',
                url: '/docs/search/index/analyzers/simple',
              },
              {
                label: 'Whitespace',
                contentSite: 'search',
                url: '/docs/search/index/analyzers/whitespace',
              },
              {
                label: 'Keyword',
                contentSite: 'search',
                url: '/docs/search/index/analyzers/keyword',
              },
              {
                label: 'Language',
                contentSite: 'search',
                url: '/docs/search/index/analyzers/language',
              },
              {
                label: 'Multi',
                contentSite: 'search',
                url: '/docs/search/index/analyzers/multi',
              },
              {
                label: 'Custom',
                contentSite: 'search',
                url: '/docs/search/index/analyzers/custom',
                collapsible: true,
                items: [
                  {
                    label: 'Character Filters',
                    contentSite: 'search',
                    url: '/docs/search/index/analyzers/character-filters',
                  },
                  {
                    label: 'Tokenizers',
                    contentSite: 'search',
                    url: '/docs/search/index/analyzers/tokenizers',
                  },
                  {
                    label: 'Token Filters',
                    contentSite: 'search',
                    url: '/docs/search/index/analyzers/token-filters',
                  },
                ],
              },
            ],
          },
          {
            label: 'Field Mappings',
            contentSite: 'search',
            url: '/docs/search/index/define-field-mappings',
            collapsible: true,
            items: [
              {
                label: 'array',
                contentSite: 'search',
                url: '/docs/search/index/field-types/array-type',
              },
              {
                label: 'autocomplete',
                contentSite: 'search',
                url: '/docs/search/index/field-types/autocomplete-type',
              },
              {
                label: 'boolean',
                contentSite: 'search',
                url: '/docs/search/index/field-types/boolean-type',
              },
              {
                label: 'date',
                contentSite: 'search',
                url: '/docs/search/index/field-types/date-type',
              },
              {
                label: 'dateFacet',
                contentSite: 'search',
                url: '/docs/search/index/field-types/date-facet-type',
              },
              {
                label: 'document',
                contentSite: 'search',
                url: '/docs/search/index/field-types/document-type',
              },
              {
                label: 'embeddedDocuments',
                contentSite: 'search',
                url: '/docs/search/index/field-types/embedded-documents-type',
              },
              {
                label: 'geo',
                contentSite: 'search',
                url: '/docs/search/index/field-types/geo-type',
              },
              {
                label: 'knnVector',
                contentSite: 'search',
                url: '/docs/search/index/field-types/knn-vector',
              },
              {
                label: 'number',
                contentSite: 'search',
                url: '/docs/search/index/field-types/number-type',
              },
              {
                label: 'numberFacet',
                contentSite: 'search',
                url: '/docs/search/index/field-types/number-facet-type',
              },
              {
                label: 'objectId',
                contentSite: 'search',
                url: '/docs/search/index/field-types/object-id-type',
              },
              {
                label: 'string',
                contentSite: 'search',
                url: '/docs/search/index/field-types/string-type',
              },
              {
                label: 'stringFacet',
                contentSite: 'search',
                url: '/docs/search/index/field-types/string-facet-type',
              },
              {
                label: 'token',
                contentSite: 'search',
                url: '/docs/search/index/field-types/token-type',
              },
              {
                label: 'uuid',
                contentSite: 'search',
                url: '/docs/search/index/field-types/uuid-type',
              },
              {
                label: 'vector',
                contentSite: 'search',
                url: '/docs/search/index/field-types/vector-type',
              },
            ],
          },
          {
            label: 'Sorted Index',
            contentSite: 'cloud-docs',
            url: '/docs/search/index/sort',
          },
          {
            label: 'Stored Source',
            contentSite: 'search',
            url: '/docs/search/index/stored-source-definition',
          },
          {
            label: 'Synonym Mappings',
            contentSite: 'search',
            url: '/docs/search/index/synonyms',
          },
          {
            label: 'Index Partitions',
            contentSite: 'search',
            url: '/docs/search/index/index-partition',
          },
        ],
      },
      {
        label: 'Query Reference',
        contentSite: 'search',
        url: '/docs/search/query/query-ref',
        collapsible: true,
        items: [
          {
            label: 'Pipeline Stages',
            contentSite: 'search',
            url: '/docs/search/query/query-syntax',
            collapsible: true,
            items: [
              {
                label: 'Documents: $search',
                contentSite: 'search',
                url: '/docs/search/query/aggregation-stages/search',
              },
              {
                label: 'Metadata: $searchMeta',
                contentSite: 'search',
                url: '/docs/search/query/aggregation-stages/searchMeta',
              },
            ],
          },
          {
            label: 'Operators & Collectors',
            contentSite: 'search',
            url: '/docs/search/query/operators-collectors/overview',
            collapsible: true,
            items: [
              {
                label: 'autocomplete',
                contentSite: 'search',
                url: '/docs/search/query/operators-collectors/autocomplete',
              },
              {
                label: 'compound',
                contentSite: 'search',
                url: '/docs/search/query/operators-collectors/compound',
              },
              {
                label: 'embeddedDocument',
                contentSite: 'search',
                url: '/docs/search/query/operators-collectors/embedded-document',
              },
              {
                label: 'equals',
                contentSite: 'search',
                url: '/docs/search/query/operators-collectors/equals',
              },
              {
                label: 'exists',
                contentSite: 'search',
                url: '/docs/search/query/operators-collectors/exists',
              },
              {
                label: 'facet',
                contentSite: 'search',
                url: '/docs/search/query/operators-collectors/facet',
              },
              {
                label: 'geoShape',
                contentSite: 'search',
                url: '/docs/search/query/operators-collectors/geoShape',
              },
              {
                label: 'geoWithin',
                contentSite: 'search',
                url: '/docs/search/query/operators-collectors/geoWithin',
              },
              {
                label: 'hasAncestor',
                contentSite: 'search',
                url: '/docs/search/query/operators-collectors/hasAncestor',
              },
              {
                label: 'hasRoot',
                contentSite: 'search',
                url: '/docs/search/query/operators-collectors/hasRoot',
              },
              {
                label: 'in',
                contentSite: 'search',
                url: '/docs/search/query/operators-collectors/in',
              },
              {
                label: 'knnBeta (Deprecated)',
                contentSite: 'search',
                url: '/docs/search/query/operators-collectors/knn-beta',
              },
              {
                label: 'morelikethis',
                contentSite: 'search',
                url: '/docs/search/query/operators-collectors/morelikethis',
              },
              {
                label: 'near',
                contentSite: 'search',
                url: '/docs/search/query/operators-collectors/near',
              },
              {
                label: 'phrase',
                contentSite: 'search',
                url: '/docs/search/query/operators-collectors/phrase',
              },
              {
                label: 'queryString',
                contentSite: 'search',
                url: '/docs/search/query/operators-collectors/queryString',
              },
              {
                label: 'range',
                contentSite: 'search',
                url: '/docs/search/query/operators-collectors/range',
              },
              {
                label: 'regex',
                contentSite: 'search',
                url: '/docs/search/query/operators-collectors/regex',
              },
              {
                label: 'span (Deprecated)',
                contentSite: 'search',
                url: '/docs/search/query/operators-collectors/span',
              },
              {
                label: 'text',
                contentSite: 'search',
                url: '/docs/search/query/operators-collectors/text',
              },
              {
                label: 'vectorSearch',
                contentSite: 'search',
                url: '/docs/search/query/operators-collectors/vectorSearch',
              },
              {
                label: 'wildcard',
                contentSite: 'search',
                url: '/docs/search/query/operators-collectors/wildcard',
              },
            ],
          },
          {
            label: 'Query Path',
            contentSite: 'search',
            url: '/docs/search/query/path-construction',
          },
          {
            label: 'Search Options',
            contentSite: 'search',
            url: '/docs/search/query/search-options',
            collapsible: true,
            items: [
              {
                label: 'score',
                contentSite: 'search',
                url: '/docs/search/query/score/overview',
                collapsible: true,
                items: [
                  {
                    label: 'Score Options',
                    contentSite: 'search',
                    url: '/docs/search/query/score/modify-score',
                  },
                  {
                    label: 'Score Details',
                    contentSite: 'search',
                    url: '/docs/search/query/score/get-details',
                  },
                ],
              },
              {
                label: 'sort',
                contentSite: 'search',
                url: '/docs/search/query/sort',
              },
              {
                label: 'highlight',
                contentSite: 'search',
                url: '/docs/search/query/highlighting',
              },
              {
                label: 'count',
                contentSite: 'search',
                url: '/docs/search/query/counting',
              },
              {
                label: 'searchSequenceToken',
                contentSite: 'search',
                url: '/docs/search/query/paginate-results',
              },
              {
                label: 'returnScope',
                contentSite: 'search',
                url: '/docs/search/query/return-scope',
              },
            ],
          },
          {
            label: 'Performance Options',
            contentSite: 'search',
            url: '/docs/search/performance/performance-options',
            collapsible: true,
            items: [
              {
                label: 'concurrent',
                contentSite: 'search',
                url: '/docs/search/query/concurrent-query',
              },
              {
                label: 'returnStoredSource',
                contentSite: 'search',
                url: '/docs/search/query/return-stored-source',
              },
            ],
          },
        ],
      },
      {
        label: 'Search Playground',
        contentSite: 'search',
        url: '/docs/search/about/playground',
      },
    ],
  },
  {
    label: 'Improve Accuracy',
    contentSite: 'search',
    url: '/docs/search/query/accuracy',
    collapsible: true,
    items: [
      {
        label: 'Customize Score',
        contentSite: 'search',
        url: '/docs/search/query/score/customize-score',
      },
      {
        label: 'Hybrid Search',
        contentSite: 'search',
        url: '/docs/search/tutorial/hybrid-search',
      },
      {
        label: 'Native Reranking',
        contentSite: 'docs',
        url: 'https://www.mongodb.com/docs/vector-search/query/native-reranking/quickstart',
      },
      {
        label: 'Synonyms',
        contentSite: 'search',
        url: '/docs/search/tutorial/synonyms-tutorial',
      },
      {
        label: 'Explain Plan & Statistics',
        contentSite: 'search',
        url: '/docs/search/query/explain',
      },
    ],
  },
  {
    label: 'Improve Performance',
    contentSite: 'search',
    url: '/docs/search/performance/overview',
    collapsible: true,
    items: [
      {
        label: 'Indexes',
        contentSite: 'search',
        url: '/docs/search/performance/index-performance',
      },
      {
        label: 'Queries',
        contentSite: 'search',
        url: '/docs/search/performance/query-performance',
      },
    ],
  },
  {
    label: 'Review Deployment Options',
    contentSite: 'search',
    url: '/docs/search/deployment/deployment-options',
    collapsible: true,
    items: [
      {
        label: 'Multi-Tenant Architecture',
        contentSite: 'search',
        url: '/docs/search/deployment/multi-tenant-architecture',
      },
    ],
  },
  {
    label: 'Monitor Search',
    contentSite: 'search',
    url: '/docs/search/deployment/monitoring',
    collapsible: true,
    items: [
      {
        label: 'Manage Alerts',
        isExternal: true,
        url: 'https://www.mongodb.com/docs/atlas/reference/alert-resolutions/atlas-search-alerts',
      },
      {
        label: 'Review Metrics',
        isExternal: true,
        url: 'https://www.mongodb.com/docs/atlas/review-atlas-search-metrics',
      },
    ],
  },
  {
    label: 'Design Search for Your Data Model',
    contentSite: 'search',
    url: '/docs/search/about/design-patterns',
    collapsible: true,
    items: [
      {
        label: 'Search Non-Alphabetical Data as Strings',
        contentSite: 'search',
        url: '/docs/search/tutorial/string-operators-tutorial',
      },
      {
        label: 'Embedded Documents',
        contentSite: 'search',
        url: '/docs/search/tutorial/embedded-documents-tutorial',
      },
      {
        label: 'Multiple Collections',
        contentSite: 'search',
        url: '/docs/search/tutorial/cross-collection-tutorials',
      },
      {
        label: 'Use Compatible Views',
        contentSite: 'search',
        url: '/docs/search/about/view-support',
      },
    ],
  },
  {
    label: 'Compatibility & Limitations',
    contentSite: 'search',
    url: '/docs/search/deployment/feature-compatibility',
  },
  {
    label: 'FAQ',
    isExternal: true,
    url: 'https://www.mongodb.com/docs/search/faq',
  },
  {
    label: 'Changelog',
    isExternal: true,
    url: 'https://www.mongodb.com/docs/atlas/search-changelog/',
  },
];

export default tocData;
