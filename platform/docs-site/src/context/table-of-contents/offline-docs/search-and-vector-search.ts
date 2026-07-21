import type { L1TocItem } from '../types';

export const toc: L1TocItem[] = [
  {
    label: 'Search and Vector Search',
    contentSite: 'self-managed-search',
    url: '/docs/search/self-managed/:version/',
    items: [
      {
        label: 'Search and Vector Search',
        contentSite: 'self-managed-search',
        group: true,
        items: [
          {
            label: 'Compatibility and Requirements',
            contentSite: 'self-managed-search',
            url: '/docs/search/self-managed/:version/deployment/compatibility-requirements',
          },
          {
            label: 'Resource Planning and Sizing',
            contentSite: 'self-managed-search',
            collapsible: true,
            items: [
              {
                label: 'Introduction',
                contentSite: 'self-managed-search',
                url: '/docs/search/self-managed/:version/resource-planning-sizing/introduction',
              },
              {
                label: 'Quickstart',
                contentSite: 'self-managed-search',
                url: '/docs/search/self-managed/:version/resource-planning-sizing/quick-start',
              },
              {
                label: 'Architecture Patterns',
                contentSite: 'self-managed-search',
                url: '/docs/search/self-managed/:version/resource-planning-sizing/architecture',
              },
              {
                label: 'Resource Allocation',
                contentSite: 'self-managed-search',
                url: '/docs/search/self-managed/:version/resource-planning-sizing/resource-allocation',
              },
              {
                label: 'Hardware',
                contentSite: 'self-managed-search',
                url: '/docs/search/self-managed/:version/resource-planning-sizing/hardware',
              },
              {
                label: 'Storage',
                contentSite: 'self-managed-search',
                url: '/docs/search/self-managed/:version/resource-planning-sizing/storage-class',
              },
            ],
          },
          {
            label: 'Installation',
            contentSite: 'self-managed-search',
            collapsible: true,
            items: [
              {
                label: 'Community',
                contentSite: 'self-managed-search',
                collapsible: true,
                items: [
                  {
                    label: 'Local Quickstart',
                    contentSite: 'self-managed-search',
                    url: '/docs/search/self-managed/:version/Installation/quick-start',
                  },
                  {
                    label: 'Standalone Linux',
                    contentSite: 'self-managed-search',
                    url: '/docs/search/self-managed/:version/Installation/linux',
                  },
                  {
                    label: 'Docker',
                    contentSite: 'self-managed-search',
                    url: '/docs/search/self-managed/:version/Installation/docker',
                  },
                  {
                    label: 'MCK',
                    isExternal: true,
                    url: 'https://www.mongodb.com/docs/kubernetes/current/tutorial/install-fts-vs-with-community/',
                  },
                ],
              },
              {
                label: 'Enterprise',
                contentSite: 'self-managed-search',
                collapsible: true,
                items: [
                  {
                    label: 'mongod and mongot in MCK',
                    isExternal: true,
                    url: 'https://www.mongodb.com/docs/kubernetes/current/tutorial/install-fts-vs-with-enterprise/',
                  },
                  {
                    label: 'External mongodb and mongot in MCK',
                    isExternal: true,
                    url: 'https://www.mongodb.com/docs/kubernetes/current/tutorial/install-fts-vs-with-external-enterprise/',
                  },
                ],
              },
              {
                label: 'Verify mongot Package Integrity',
                contentSite: 'self-managed-search',
                url: '/docs/search/self-managed/:version/deployment/verify-mongot-packages',
              },
              {
                label: 'Connect and Verify',
                contentSite: 'self-managed-search',
                collapsible: true,
                items: [
                  {
                    label: 'Verify Deployment',
                    contentSite: 'self-managed-search',
                    url: '/docs/search/self-managed/:version/connection/verify-connection',
                  },
                  {
                    label: 'Connect to Your Deployment',
                    contentSite: 'self-managed-search',
                    url: '/docs/search/self-managed/:version/connection/connect-to-search',
                  },
                ],
              },
            ],
          },
          {
            label: 'Configuration and Maintenance',
            contentSite: 'self-managed-search',
            collapsible: true,
            items: [
              {
                label: 'mongot Configuration Reference',
                contentSite: 'self-managed-search',
                url: '/docs/search/self-managed/:version/configuration/reference',
              },
              {
                label: 'Configure Replica Set',
                contentSite: 'self-managed-search',
                url: '/docs/search/self-managed/:version/configuration/replica-set',
              },
              {
                label: 'Configure Automated Embeddings',
                contentSite: 'self-managed-search',
                url: '/docs/search/self-managed/:version/configuration/automated-embeddings',
              },
              {
                label: 'Configure Authentication and Authorization',
                contentSite: 'self-managed-search',
                url: '/docs/search/self-managed/:version/security/authentication-and-authorization',
              },
              {
                label: 'Configure Security: TLS / Encryption',
                contentSite: 'self-managed-search',
                url: '/docs/search/self-managed/:version/security/tls-encryption',
              },
              {
                label: 'Upgrade or Downgrade',
                contentSite: 'self-managed-search',
                url: '/docs/search/self-managed/:version/Installation/upgrade-downgrade',
              },
            ],
          },
          {
            label: 'Backup and Restore',
            contentSite: 'self-managed-search',
            url: '/docs/search/self-managed/:version/deployment/backup-restore',
          },
          {
            label: 'Monitor Deployment',
            contentSite: 'self-managed-search',
            url: '/docs/search/self-managed/:version/deployment/monitoring',
          },
          {
            label: 'Troubleshoot',
            contentSite: 'self-managed-search',
            url: '/docs/search/self-managed/:version/troubleshooting',
          },
          {
            label: 'Limitations',
            contentSite: 'self-managed-search',
            url: '/docs/search/self-managed/:version/limitations',
          },
          {
            label: 'Release Notes',
            contentSite: 'self-managed-search',
            url: '/docs/search/self-managed/:version/release-notes',
          },
        ],
      },
    ],
  },
];
