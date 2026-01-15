import type { TocItem } from '../types';

const tocData: TocItem[] = [
  {
    label: 'Model API Keys',
    contentSite: 'voyageai',
    url: '/docs/voyageai/management/api-keys',
    collapsible: true,
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
];

export default tocData;
