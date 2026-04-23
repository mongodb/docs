import type { TocItem } from '../types';

const tocData: TocItem[] = [
  {
    label: 'Quick Start',
    contentSite: 'docs-vector-search',
    url: '/docs/vector-search/tutorials/vector-search-quick-start',
  },
  {
    label: 'Compatibility & Limitations',
    contentSite: 'docs-vector-search',
    url: '/docs/vector-search/deployment/compatibility-limitations',
  },
  {
    label: 'Create Embeddings',
    contentSite: 'docs-vector-search',
    collapsible: true,
    items: [
      {
        label: 'Automated',
        contentSite: 'docs-vector-search',
        url: '/docs/vector-search/crud-embeddings/create-embeddings-automatic',
      },
      {
        label: 'Manual',
        contentSite: 'docs-vector-search',
        url: '/docs/vector-search/crud-embeddings/create-embeddings-manual',
      },
    ],
  },
  {
    label: 'Queries & Indexes',
    contentSite: 'docs-vector-search',
    collapsible: true,
    items: [
      {
        label: 'Index Reference',
        contentSite: 'docs-vector-search',
        url: '/docs/vector-search/index/vector-search-type',
      },
      {
        label: 'Query Reference',
        contentSite: 'docs-vector-search',
        url: '/docs/vector-search/query/aggregation-stages/vector-search-stage',
        collapsible: true,
        items: [
          {
            label: 'Explain Query Results',
            contentSite: 'docs-vector-search',
            url: '/docs/vector-search/query/explain',
          },
        ],
      },
      {
        label: 'Use Compatible Views',
        contentSite: 'docs-vector-search',
        url: '/docs/vector-search/query/view-support',
      },
    ],
  },
  {
    label: 'Use Cases & Design Patterns',
    contentSite: 'docs-vector-search',
    collapsible: true,
    url: '/docs/vector-search/about/use-cases',
    items: [
      {
        label: 'Retrieval-Augmented Generation (RAG)',
        contentSite: 'docs-vector-search',
        url: '/docs/vector-search/tutorials/rag',
        collapsible: true,
        items: [
          {
            label: 'Playground Chatbot Demo Builder',
            contentSite: 'docs-vector-search',
            url: '/docs/vector-search/query/vector-search-playground/',
          },
        ],
      },
      {
        label: 'AI Agents',
        contentSite: 'docs-vector-search',
        url: '/docs/vector-search/about/ai-agents',
      },
      {
        label: 'Local RAG',
        contentSite: 'docs-vector-search',
        url: '/docs/vector-search/tutorials/local-rag',
      },
      {
        label: 'Semantic Search for Text',
        contentSite: 'docs-vector-search',
        url: '/docs/vector-search/tutorials/vector-search-tutorial',
      },
    ],
  },
  {
    label: 'Hybrid Search',
    contentSite: 'docs-vector-search',
    url: '/docs/vector-search/hybrid-search/hybrid-search',
    collapsible: true,
    items: [
      {
        label: 'Combined Vector Search and Full-Text Search',
        contentSite: 'docs-vector-search',
        url: '/docs/vector-search/hybrid-search/vector-search-with-full-text-search',
      },
      {
        label: 'Combined Vector Search',
        contentSite: 'docs-vector-search',
        url: '/docs/vector-search/hybrid-search/vector-search-with-rankfusion',
      },
    ],
  },
  {
    label: 'Review Deployment Options',
    contentSite: 'docs-vector-search',
    url: '/docs/vector-search/deployment/deployment-options',
  },
  {
    label: 'Vector Quantization',
    contentSite: 'docs-vector-search',
    url: '/docs/vector-search/about/vector-quantization',
    collapsible: true,
    items: [
      {
        label: 'Automatic Quantization with Voyage AI',
        contentSite: 'docs-vector-search',
        url: '/docs/vector-search/tutorials/auto-quantize-with-voyage-ai',
      },
    ],
  },
  {
    label: 'Improve Accuracy',
    contentSite: 'docs-vector-search',
    url: '/docs/vector-search/query/improve-accuracy',
  },
  {
    label: 'Performance Benchmark',
    contentSite: 'docs-vector-search',
    url: '/docs/vector-search/benchmark/benchmark',
    collapsible: true,
    items: [
      {
        label: 'Benchmark Overview',
        contentSite: 'docs-vector-search',
        url: '/docs/vector-search/benchmark/overview',
      },
      {
        label: 'Benchmark Results',
        contentSite: 'docs-vector-search',
        url: '/docs/vector-search/benchmark/results',
      },
      {
        label: 'Additional Recommendations',
        contentSite: 'docs-vector-search',
        url: '/docs/vector-search/benchmark/performance-recommendations',
      },
    ],
  },
  {
    label: 'Multi-Tenant Architecture',
    contentSite: 'docs-vector-search',
    url: '/docs/vector-search/deployment/multi-tenant-architecture',
  },
  {
    label: 'AI Integrations',
    isExternal: true,
    url: 'https://www.mongodb.com/docs/atlas/ai-integrations/',
  },
  {
    label: 'Troubleshooting',
    contentSite: 'docs-vector-search',
    url: '/docs/vector-search/troubleshooting',
  },
  {
    label: 'Changelog',
    isExternal: true,
    url: 'https://www.mongodb.com/docs/vector-search/changelog/',
  },
];

export default tocData;
