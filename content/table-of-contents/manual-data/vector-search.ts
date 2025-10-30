import type { TocItem } from '../types';

const tocData: TocItem[] = [
  {
    label: 'Quick Start',
    contentSite: 'cloud-docs',
    url: '/docs/atlas/atlas-vector-search/tutorials/vector-search-quick-start',
  },
  {
    label: 'Compatibility & Limitations',
    contentSite: 'cloud-docs',
    url: '/docs/atlas/atlas-vector-search/compatibility-limitations',
  },
  {
    label: 'Create Embeddings',
    contentSite: 'cloud-docs',
    url: '/docs/atlas/atlas-vector-search/create-embeddings',
  },
  {
    label: 'Queries & Indexes',
    contentSite: 'cloud-docs',
    collapsible: true,
    items: [
      {
        label: 'Index Reference',
        contentSite: 'cloud-docs',
        url: '/docs/atlas/atlas-vector-search/vector-search-type',
      },
      {
        label: 'Query Reference',
        contentSite: 'cloud-docs',
        url: '/docs/atlas/atlas-vector-search/vector-search-stage',
        collapsible: true,
        items: [
          {
            label: 'Explain Query Results',
            contentSite: 'cloud-docs',
            url: '/docs/atlas/atlas-vector-search/explain',
          },
        ],
      },
      {
        label: 'Use Compatible Views',
        contentSite: 'cloud-docs',
        url: '/docs/atlas/atlas-vector-search/view-support',
      },
    ],
  },
  {
    label: 'Use Cases & Design Patterns',
    contentSite: 'cloud-docs',
    collapsible: true,
    url: '/docs/atlas/atlas-vector-search/use-cases',
    items: [
      {
        label: 'Retrieval-Augmented Generation (RAG)',
        contentSite: 'cloud-docs',
        url: '/docs/atlas/atlas-vector-search/rag',
        collapsible: true,
        items: [
          {
            label: 'Playground Chatbot Demo Builder',
            contentSite: 'cloud-docs',
            url: '/docs/atlas/atlas-vector-search/vector-search-playground/',
          },
        ],
      },
      {
        label: 'AI Agents',
        contentSite: 'cloud-docs',
        url: '/docs/atlas/atlas-vector-search/ai-agents',
      },
      {
        label: 'Local RAG',
        contentSite: 'cloud-docs',
        url: '/docs/atlas/atlas-vector-search/tutorials/local-rag',
      },
      {
        label: 'Semantic Search for Text',
        contentSite: 'cloud-docs',
        url: '/docs/atlas/atlas-vector-search/tutorials/vector-search-tutorial',
      },
    ],
  },
  {
    label: 'Hybrid Search',
    contentSite: 'cloud-docs',
    url: '/docs/atlas/atlas-vector-search/hybrid-search',
    collapsible: true,
    items: [
      {
        label: 'Combined Vector Search and Full-Text Search',
        contentSite: 'cloud-docs',
        url: '/docs/atlas/atlas-vector-search/hybrid-search/vector-search-with-full-text-search',
      },
      {
        label: 'Combined Vector Search',
        contentSite: 'cloud-docs',
        url: '/docs/atlas/atlas-vector-search/hybrid-search/vector-search-with-rankfusion',
      },
    ],
  },
  {
    label: 'Review Deployment Options',
    contentSite: 'cloud-docs',
    url: '/docs/atlas/atlas-vector-search/deployment-options',
  },
  {
    label: 'Vector Quantization',
    contentSite: 'cloud-docs',
    url: '/docs/atlas/atlas-vector-search/vector-quantization',
    collapsible: true,
    items: [
      {
        label: 'Automatic Quantization with Voyage AI',
        contentSite: 'cloud-docs',
        url: '/docs/atlas/atlas-vector-search/tutorials/auto-quantize-with-voyage-ai',
      },
    ],
  },
  {
    label: 'Improve Accuracy',
    contentSite: 'cloud-docs',
    url: '/docs/atlas/atlas-vector-search/improve-accuracy',
  },
  {
    label: 'Performance Benchmark',
    contentSite: 'cloud-docs',
    url: '/docs/atlas/atlas-vector-search/benchmark',
    collapsible: true,
    items: [
      {
        label: 'Benchmark Overview',
        contentSite: 'cloud-docs',
        url: '/docs/atlas/atlas-vector-search/benchmark/overview',
      },
      {
        label: 'Benchmark Results',
        contentSite: 'cloud-docs',
        url: '/docs/atlas/atlas-vector-search/benchmark/results',
      },
      {
        label: 'Additional Recommendations',
        contentSite: 'cloud-docs',
        url: '/docs/atlas/atlas-vector-search/benchmark/performance-recommendations',
      },
    ],
  },
  {
    label: 'Multi-Tenant Architecture',
    contentSite: 'cloud-docs',
    url: '/docs/atlas/atlas-vector-search/multi-tenant-architecture',
  },
  {
    label: 'AI Integrations',
    contentSite: 'cloud-docs',
    url: 'https://www.mongodb.com/docs/atlas/ai-integrations/',
  },
  {
    label: 'Troubleshooting',
    contentSite: 'cloud-docs',
    url: '/docs/atlas/atlas-vector-search/troubleshooting',
  },
  {
    label: 'Changelog',
    contentSite: 'cloud-docs',
    url: 'https://www.mongodb.com/docs/atlas/atlas-vector-search/changelog/',
  },
];

export default tocData;
