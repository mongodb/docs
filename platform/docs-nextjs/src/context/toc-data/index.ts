import type { TocItem } from '@/components/unified-sidenav/types';

import { tocData as copiedTocData } from './data.copied';

/** Hardcoded TOC for offline build (voyageai only for first iteration). */
export const toc: TocItem[] = [
  {
    label: 'AI Models',
    contentSite: 'voyageai',
    url: '/mdx/voyageai/',
    items: [
      {
        label: 'GET STARTED',
        contentSite: 'voyageai',
        group: true,
        items: [
          {
            label: 'Introduction',
            contentSite: 'voyageai',
            url: '/mdx/voyageai/',
          },
          {
            label: 'Quick Start',
            contentSite: 'voyageai',
            url: '/mdx/voyageai/quickstart',
          },
          {
            label: 'Models',
            contentSite: 'voyageai',
            url: '/mdx/voyageai/models',
          },
          {
            label: 'API and Clients',
            contentSite: 'voyageai',
            url: '/mdx/voyageai/api-and-clients',
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
            url: '/mdx/voyageai/models/text-embeddings',
          },
          {
            label: 'Contextualized Chunk Embeddings',
            contentSite: 'voyageai',
            url: '/mdx/voyageai/models/contextualized-chunk-embeddings',
          },
          {
            label: 'Multimodal Embeddings',
            contentSite: 'voyageai',
            url: '/mdx/voyageai/models/multimodal-embeddings',
          },
          {
            label: 'Rerankers',
            contentSite: 'voyageai',
            url: '/mdx/voyageai/models/rerankers',
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
            url: '/mdx/voyageai/tutorials/semantic-search',
          },
          {
            label: 'RAG',
            contentSite: 'voyageai',
            url: '/mdx/voyageai/tutorials/rag',
          },
          {
            label: 'Optimize Performance',
            contentSite: 'voyageai',
            collapsible: true,
            items: [
              {
                label: 'Tokenization',
                contentSite: 'voyageai',
                url: '/mdx/voyageai/tutorials/tokenization',
              },
              {
                label: 'Flexible Dimensions & Quantization',
                contentSite: 'voyageai',
                url: '/mdx/voyageai/tutorials/dimensions-and-quantization',
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
            url: '/mdx/voyageai/management/api-keys',
            items: [
              {
                label: 'Organization and Project Access',
                contentSite: 'voyageai',
                url: '/mdx/voyageai/management/organization-project-access',
              },
              {
                label: 'Monitor Usage',
                contentSite: 'voyageai',
                url: '/mdx/voyageai/management/monitor-usage',
              },
              {
                label: 'Manage Rate Limits',
                contentSite: 'voyageai',
                url: '/mdx/voyageai/management/rate-limits',
              },
            ],
          },
          {
            label: 'Billing',
            contentSite: 'voyageai',
            url: '/mdx/voyageai/management/billing',
          },
          {
            label: 'Deploy on VPC',
            contentSite: 'voyageai',
            collapsible: true,
            items: [
              {
                label: 'AWS Marketplace',
                contentSite: 'voyageai',
                url: '/mdx/voyageai/management/aws-marketplace',
              },
              {
                label: 'Azure Marketplace',
                contentSite: 'voyageai',
                url: '/mdx/voyageai/management/azure-marketplace',
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
            url: '/mdx/voyageai/api-reference/overview',
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

function getOfflineToc(): TocItem[] | null {
  if (process.env.NEXT_PUBLIC_BUILD_STATIC_PAGES !== 'true') return null;
  return toc;
}

/** When building static export, use voyageai TOC (hardcoded for first iteration); else data.copied. */
export const tocData: TocItem[] = getOfflineToc() ?? (copiedTocData as unknown as TocItem[]);
