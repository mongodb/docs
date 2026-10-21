import type { TocItem } from '../types';

const tocData: TocItem[] = [
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
    label: 'Integrations',
    contentSite: 'voyageai',
    collapsible: true,
    items: [
      {
        label: 'LangChain',
        contentSite: 'voyageai',
        url: '/docs/voyageai/tutorials/integrations/langchain',
      },
    ],
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
];

export default tocData;
