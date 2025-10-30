import type { TocItem } from '../types';

const tocData: TocItem[] = [
  {
    label: 'MongoDB Atlas for Government',
    contentSite: 'cloudgov',
    url: '/docs/atlas/government/',
    collapsible: true,
    items: [
      {
        label: ' Overview',
        contentSite: 'cloudgov',
        url: '/docs/atlas/government/overview',
        collapsible: true,
        items: [
          {
            label: ' Considerations',
            contentSite: 'cloudgov',
            url: '/docs/atlas/government/overview/atlasgov-considerations',
          },
          {
            label: 'Supported Features',
            contentSite: 'cloudgov',
            url: '/docs/atlas/government/overview/supported-features',
          },
          {
            label: 'Supported Cloud Providers and Regions',
            contentSite: 'cloudgov',
            url: '/docs/atlas/government/overview/supported-regions',
          },
        ],
      },
      {
        label: 'Getting Started',
        contentSite: 'cloudgov',
        url: '/docs/atlas/government/getting-started',
        collapsible: true,
        items: [
          {
            label: 'Create an Account',
            contentSite: 'cloudgov',
            url: '/docs/atlas/government/tutorial/create-account',
          },
          {
            label: 'Create an Organization',
            contentSite: 'cloudgov',
            url: '/docs/atlas/government/tutorial/create-organization',
          },
          {
            label: 'Create a Project',
            contentSite: 'cloudgov',
            url: '/docs/atlas/government/tutorial/create-project',
          },
          {
            label: 'Create a Cluster',
            contentSite: 'cloudgov',
            url: '/docs/atlas/government/tutorial/create-cluster',
          },
          {
            label: 'Add Your Connection IP Address to IP Access List',
            contentSite: 'cloudgov',
            url: '/docs/atlas/government/tutorial/allow-ip',
          },
          {
            label: 'Create a Database User for Your Cluster',
            contentSite: 'cloudgov',
            url: '/docs/atlas/government/tutorial/create-mongodb-user-for-cluster',
          },
        ],
      },
      {
        label: ' User Access',
        contentSite: 'cloudgov',
        url: '/docs/atlas/government/atlas-access',
      },
      {
        label: 'Database Users',
        contentSite: 'cloudgov',
        url: '/docs/atlas/government/database-access',
      },
      {
        label: 'Clusters',
        contentSite: 'cloudgov',
        url: '/docs/atlas/government/clusters',
        collapsible: true,
        items: [
          {
            label: 'Monitoring, Logging and Alerts',
            contentSite: 'cloudgov',
            url: '/docs/atlas/government/clusters/monitoring',
          },
          {
            label: 'Backup and Restore Cluster Data',
            contentSite: 'cloudgov',
            url: '/docs/atlas/government/clusters/backup-restore-data',
          },
        ],
      },
      {
        label: 'Migrate or Import Data into Your Cluster',
        contentSite: 'cloudgov',
        url: '/docs/atlas/government/import-data',
      },
      {
        label: 'Atlas Search',
        contentSite: 'cloudgov',
        url: '/docs/atlas/government/atlas-search',
      },
      {
        label: 'Security',
        contentSite: 'cloudgov',
        url: '/docs/atlas/government/security',
      },
      {
        label: 'API',
        contentSite: 'cloudgov',
        url: '/docs/atlas/government/api',
      },
      {
        label: ' Programmatic Access',
        contentSite: 'cloudgov',
        url: '/docs/atlas/government/programmatic-access',
        collapsible: true,
        items: [
          {
            label: 'API',
            contentSite: 'cloudgov',
            url: '/docs/atlas/government/api',
          },
        ],
      },
      {
        label: 'Subscriptions and Billing',
        contentSite: 'cloudgov',
        url: '/docs/atlas/government/billing',
      },
      {
        label: 'Support',
        contentSite: 'cloudgov',
        url: '/docs/atlas/government/support',
      },
    ],
  },
];

export default tocData;
