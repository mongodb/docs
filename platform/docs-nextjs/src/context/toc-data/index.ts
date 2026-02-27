import type { TocItem } from '@/components/unified-sidenav/types';

import { tocData as copiedTocData } from './data.copied';
import { isOfflineBuild } from '@/utils/isOfflineBuild';

/** Hardcoded TOC for offline build (voyageai only for first iteration). */
export const toc: TocItem[] = [
  {
    label: 'AI Models',
    contentSite: 'voyageai',
    url: '/docs/voyageai/',
    items: [
      {
        label: 'GET STARTED',
        contentSite: 'voyageai',
        group: true,
        items: [
          {
            label: 'Introduction',
            contentSite: 'voyageai',
            url: '/docs/voyageai/',
          },
          {
            label: 'Quick Start',
            contentSite: 'voyageai',
            url: '/docs/voyageai/quickstart',
          },
          {
            label: 'Models',
            contentSite: 'voyageai',
            url: '/docs/voyageai/models',
          },
          {
            label: 'API and Clients',
            contentSite: 'voyageai',
            url: '/docs/voyageai/api-and-clients',
          },
        ],
      },
      {
        label: 'MODELS',
        contentSite: 'voyageai',
        group: true,
        items: [
          {
            label: 'Text Embeddings',
            contentSite: 'voyageai',
            url: '/docs/voyageai/models/text-embeddings',
          },
          {
            label: 'Contextualized Chunk Embeddings',
            contentSite: 'voyageai',
            url: '/docs/voyageai/models/contextualized-chunk-embeddings',
          },
          {
            label: 'Multimodal Embeddings',
            contentSite: 'voyageai',
            url: '/docs/voyageai/models/multimodal-embeddings',
          },
          {
            label: 'Rerankers',
            contentSite: 'voyageai',
            url: '/docs/voyageai/models/rerankers',
          },
        ],
      },
      {
        label: 'TUTORIALS',
        contentSite: 'voyageai',
        group: true,
        items: [
          {
            label: 'Semantic Search',
            contentSite: 'voyageai',
            url: '/docs/voyageai/tutorials/semantic-search',
          },
          {
            label: 'RAG',
            contentSite: 'voyageai',
            url: '/docs/voyageai/tutorials/rag',
          },
          {
            label: 'Optimize Performance',
            contentSite: 'voyageai',
            collapsible: true,
            items: [
              {
                label: 'Tokenization',
                contentSite: 'voyageai',
                url: '/docs/voyageai/tutorials/tokenization',
              },
              {
                label: 'Flexible Dimensions & Quantization',
                contentSite: 'voyageai',
                url: '/docs/voyageai/tutorials/dimensions-and-quantization',
              },
            ],
          },
        ],
      },
      {
        label: 'MANAGE & DEPLOY',
        contentSite: 'voyageai',
        group: true,
        items: [
          {
            label: 'Model API Keys',
            contentSite: 'voyageai',
            collapsible: true,
            url: '/docs/voyageai/management/api-keys',
            items: [
              {
                label: 'Organization and Project Access',
                contentSite: 'voyageai',
                url: '/docs/voyageai/management/organization-project-access',
              },
              {
                label: 'Monitor Usage',
                contentSite: 'voyageai',
                url: '/docs/voyageai/management/monitor-usage',
              },
              {
                label: 'Manage Rate Limits',
                contentSite: 'voyageai',
                url: '/docs/voyageai/management/rate-limits',
              },
            ],
          },
          {
            label: 'Billing',
            contentSite: 'voyageai',
            url: '/docs/voyageai/management/billing',
          },
          {
            label: 'Deploy on VPC',
            contentSite: 'voyageai',
            collapsible: true,
            items: [
              {
                label: 'AWS Marketplace',
                contentSite: 'voyageai',
                url: '/docs/voyageai/management/aws-marketplace',
              },
              {
                label: 'Azure Marketplace',
                contentSite: 'voyageai',
                url: '/docs/voyageai/management/azure-marketplace',
              },
            ],
          },
        ],
      },
      {
        label: 'API REFERENCE',
        contentSite: 'voyageai',
        group: true,
        items: [
          {
            label: 'API Overview',
            contentSite: 'voyageai',
            url: '/docs/voyageai/api-reference/overview',
          },
          {
            label: 'API Specification',
            contentSite: 'voyageai',
            url: 'https://www.mongodb.com/docs/api/doc/atlas-embedding-and-reranking-api/',
          },
        ],
      },
    ],
  },
];

/** Offline build uses the hardcoded toc above; otherwise use the full TOC from data.copied. */
export const tocData: TocItem[] = isOfflineBuild ? toc : (copiedTocData as unknown as TocItem[]);
