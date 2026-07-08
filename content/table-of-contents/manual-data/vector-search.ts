import type { TocItem } from '../types';

const tocData: TocItem[] = [
  {
    label: 'Quick Start',
    contentSite: 'vector-search',
    url: '/docs/vector-search/tutorials/quick-start',
  },
  {
    label: 'Automated Embedding',
    contentSite: 'vector-search',
    url: '/docs/vector-search/crud-embeddings/automated-embedding',
    collapsible: true,
    items: [
      {
        label: 'Get Started',
        contentSite: 'vector-search',
        url: 'https://www.mongodb.com/docs/vector-search/tutorials/quick-start/',
      },
      {
        label: 'Model Pricing and Rate Limits',
        contentSite: 'vector-search',
        url: '/docs/vector-search/crud-embeddings/automated-embedding/models',
      },
      {
        label: 'Manage Automated Embedding',
        contentSite: 'vector-search',
        url: '/docs/vector-search/crud-embeddings/automated-embedding/management',
      },
      {
        label: 'Manage Billing',
        contentSite: 'vector-search',
        url: '/docs/vector-search/crud-embeddings/automated-embedding/billing',
      },
      {
        label: 'Architecture',
        contentSite: 'vector-search',
        url: '/docs/vector-search/crud-embeddings/automated-embedding/overview',
      },
    ],
  },
  {
    label: 'Queries & Indexes',
    contentSite: 'vector-search',
    collapsible: true,
    items: [
      {
        label: 'Index Reference',
        contentSite: 'vector-search',
        url: '/docs/vector-search/index/vector-search-type',
      },
      {
        label: 'Query Reference',
        contentSite: 'vector-search',
        url: '/docs/vector-search/query/aggregation-stages/vector-search-stage',
        collapsible: true,
        items: [
          {
            label: 'Explain Query Results',
            contentSite: 'vector-search',
            url: '/docs/vector-search/query/explain',
          },
        ],
      },
      {
        label: 'Use Compatible Views',
        contentSite: 'vector-search',
        url: '/docs/vector-search/query/view-support',
      },
    ],
  },
  {
    label: 'Native Reranking',
    contentSite: 'vector-search',
    collapsible: true,
    items: [
      {
        label: '$rerank Aggregation Stage',
        contentSite: 'vector-search',
        url: '/docs/vector-search/query/aggregation-stages/rerank',
      },
      {
        label: 'Get Started',
        contentSite: 'vector-search',
        url: '/docs/vector-search/query/native-reranking/quickstart',
      },
      {
        label: 'Manage Native Reranking',
        contentSite: 'vector-search',
        url: '/docs/vector-search/query/native-reranking/managing',
      },
      {
        label: 'Manage Billing',
        contentSite: 'vector-search',
        url: '/docs/vector-search/query/native-reranking/billing',
      },
    ],
  },
  {
    label: 'Create Embeddings Manually',
    contentSite: 'vector-search',
    url: '/docs/vector-search/crud-embeddings/create-embeddings-manual',
  },
  {
    label: 'Use Cases & Design Patterns',
    contentSite: 'vector-search',
    collapsible: true,
    url: '/docs/vector-search/about/use-cases',
    items: [
      {
        label: 'Retrieval-Augmented Generation (RAG)',
        contentSite: 'vector-search',
        url: '/docs/vector-search/tutorials/rag',
        collapsible: true,
        items: [
          {
            label: 'Playground Chatbot Demo Builder',
            contentSite: 'vector-search',
            url: '/docs/vector-search/query/vector-search-playground/',
          },
        ],
      },
      {
        label: 'AI Agents',
        contentSite: 'vector-search',
        url: '/docs/vector-search/about/ai-agents',
      },
      {
        label: 'Local RAG',
        contentSite: 'vector-search',
        url: '/docs/vector-search/tutorials/local-rag',
      },
      {
        label: 'Semantic Search for Text',
        contentSite: 'vector-search',
        url: 'https://www.mongodb.com/docs/vector-search/tutorials/quick-start/',
      },
    ],
  },
  {
    label: 'Hybrid Search',
    contentSite: 'vector-search',
    url: '/docs/vector-search/hybrid-search/hybrid-search-overview',
    collapsible: true,
    items: [
      {
        label: 'Combined Vector Search and Full-Text Search',
        contentSite: 'vector-search',
        url: '/docs/vector-search/hybrid-search/vector-search-with-full-text-search',
      },
      {
        label: 'Combined Vector Search',
        contentSite: 'vector-search',
        url: '/docs/vector-search/hybrid-search/vector-search-with-rankfusion',
      },
    ],
  },
  {
    label: 'Review Deployment Options',
    contentSite: 'vector-search',
    url: '/docs/vector-search/deployment/deployment-options',
  },
  {
    label: 'Vector Quantization',
    contentSite: 'vector-search',
    url: '/docs/vector-search/about/vector-quantization',
  },
  {
    label: 'Improve Accuracy',
    contentSite: 'vector-search',
    url: '/docs/vector-search/query/improve-accuracy',
    collapsible: true,
    items: [
      {
        label: 'Optimize and Measure Performance',
        contentSite: 'vector-search',
        url: '/docs/vector-search/tutorials/auto-quantize-with-voyage-ai',
      },
    ],
  },
  {
    label: 'Performance Benchmark',
    contentSite: 'vector-search',
    collapsible: true,
    items: [
      {
        label: 'Benchmark Overview',
        contentSite: 'vector-search',
        url: '/docs/vector-search/benchmark/overview',
      },
      {
        label: 'Benchmark Results',
        contentSite: 'vector-search',
        url: '/docs/vector-search/benchmark/results',
      },
      {
        label: 'Additional Recommendations',
        contentSite: 'vector-search',
        url: '/docs/vector-search/benchmark/performance-recommendations',
      },
    ],
  },
  {
    label: 'Multi-Tenant Architecture',
    contentSite: 'vector-search',
    url: '/docs/vector-search/deployment/multi-tenant-architecture',
  },
  {
    label: 'AI Integrations',
    isExternal: true,
    url: 'https://www.mongodb.com/docs/atlas/ai-integrations/',
  },
  {
    label: 'Troubleshooting',
    contentSite: 'vector-search',
    url: '/docs/vector-search/troubleshooting',
  },
  {
    label: 'Changelog',
    isExternal: true,
    url: 'https://www.mongodb.com/docs/atlas/search-changelog/',
  },
];

export default tocData;
