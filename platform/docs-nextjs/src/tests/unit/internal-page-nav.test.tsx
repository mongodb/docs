import { render } from '@testing-library/react';
import { mockLocation } from '@/tests/utils/mock-location';
import { InternalPageNav } from '@/components/internal-page-nav';
import { useSnootyMetadata } from '@/utils/use-snooty-metadata';
import { PageContext } from '@/context/page-context';
import { UnifiedTocProvider } from '@/context/unified-toc-context';

jest.mock('@/utils/use-snooty-metadata', () => ({
  useSnootyMetadata: jest.fn(),
}));

// jest.mock is hoisted above const declarations, so the data must live inside the factory.
// virtual: true lets Jest mock this without needing the file on disk (it is gitignored).
jest.mock('@/context/toc-data/data.copied', () => ({
  tocData: [
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
            { label: 'Introduction', contentSite: 'voyageai', url: '/docs/voyageai/' },
            { label: 'Quick Start', contentSite: 'voyageai', url: '/docs/voyageai/quickstart' },
            { label: 'Models', contentSite: 'voyageai', url: '/docs/voyageai/models' },
            { label: 'API and Clients', contentSite: 'voyageai', url: '/docs/voyageai/api-and-clients' },
          ],
        },
        {
          label: 'MODELS',
          contentSite: 'voyageai',
          group: true,
          items: [
            { label: 'Text Embeddings', contentSite: 'voyageai', url: '/docs/voyageai/models/text-embeddings' },
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
            { label: 'Rerankers', contentSite: 'voyageai', url: '/docs/voyageai/models/rerankers' },
          ],
        },
        {
          label: 'TUTORIALS',
          contentSite: 'voyageai',
          group: true,
          items: [
            { label: 'Semantic Search', contentSite: 'voyageai', url: '/docs/voyageai/tutorials/semantic-search' },
            { label: 'RAG', contentSite: 'voyageai', url: '/docs/voyageai/tutorials/rag' },
            {
              label: 'Optimize Performance',
              contentSite: 'voyageai',
              collapsible: true,
              items: [
                { label: 'Tokenization', contentSite: 'voyageai', url: '/docs/voyageai/tutorials/tokenization' },
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
                { label: 'Monitor Usage', contentSite: 'voyageai', url: '/docs/voyageai/management/monitor-usage' },
                {
                  label: 'Manage Rate Limits',
                  contentSite: 'voyageai',
                  url: '/docs/voyageai/management/rate-limits',
                },
              ],
            },
            { label: 'Billing', contentSite: 'voyageai', url: '/docs/voyageai/management/billing' },
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
            { label: 'API Overview', contentSite: 'voyageai', url: '/docs/voyageai/api-reference/overview' },
            {
              label: 'API Specification',
              contentSite: 'voyageai',
              url: 'https://www.mongodb.com/docs/api/doc/atlas-embedding-and-reranking-api/',
            },
          ],
        },
      ],
    },
  ],
}));

const renderNav = (slug: string) =>
  render(
    <UnifiedTocProvider>
      <PageContext.Provider
        value={{
          slug,
          template: 'document',
          tabsMainColumn: false,
          options: null,
          hasBanner: false,
          setHasBanner: () => {},
        }}
      >
        <InternalPageNav />
      </PageContext.Provider>
      ,
    </UnifiedTocProvider>,
  );

beforeAll(() => {
  mockLocation({ hash: '/' });
  (useSnootyMetadata as jest.Mock).mockImplementation(() => ({}));
});

describe('internal page nav', () => {
  it('renders a page with next and previous links correctly', () => {
    const tree = renderNav('docs/languages/go');
    expect(tree.asFragment()).toMatchSnapshot();
  });

  it('renders a page with no previous link correctly', () => {
    const tree = renderNav('docs/atlas/access/manage-org-users');
    expect(tree.asFragment()).toMatchSnapshot();
  });

  it('renders a page with no next link correctly', () => {
    const tree = renderNav('docs/atlas/atlas-resource-policies');
    expect(tree.asFragment()).toMatchSnapshot();
  });
});
