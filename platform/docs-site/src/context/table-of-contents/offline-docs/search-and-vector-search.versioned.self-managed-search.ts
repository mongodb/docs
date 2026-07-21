import type { L1TocItem } from '../types';

export const toc: L1TocItem[] = [
  {
    label: 'Search and Vector Search',
    contentSite: 'self-managed-search',
    url: '/docs/search/self-managed/:version/',
    items: [
      {
        label: 'Search and Vector Search for Self-Managed Deployments',
        contentSite: 'self-managed-search',
        group: true,
        versionDropdown: true,
        items: [
          {
            label: 'Overview',
            contentSite: 'self-managed-search',
            url: '/docs/search/self-managed/:version/',
          },
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
                    label: 'Quickstart',
                    contentSite: 'self-managed-search',
                    url: '/docs/search/self-managed/:version/installation/quick-start',
                  },
                  {
                    label: 'Linux',
                    contentSite: 'self-managed-search',
                    url: '/docs/search/self-managed/:version/installation/linux',
                  },
                  {
                    label: 'Docker',
                    contentSite: 'self-managed-search',
                    url: '/docs/search/self-managed/:version/installation/docker',
                  },
                  {
                    label: 'Controllers for Kubernetes Operator',
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
                    label: 'Deploy mongod and mongot in a Kubernetes Cluster',
                    isExternal: true,
                    url: 'https://www.mongodb.com/docs/kubernetes/current/tutorial/install-fts-vs-with-enterprise/?cluster-topology=repl&mongot-instances=single',
                  },
                  {
                    label: 'Deploy mongot in a Kubernetes Cluster for External mongod',
                    isExternal: true,
                    url: 'https://www.mongodb.com/docs/kubernetes/current/tutorial/install-fts-vs-with-external-enterprise/?cluster-topology=repl&mongot-instances=single',
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
                label: 'Configure Automated Embeddings',
                contentSite: 'self-managed-search',
                url: '/docs/search/self-managed/:version/configuration/automated-embedding',
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
            collapsible: true,
            url: '/docs/search/self-managed/:version/deployment/monitoring',
            items: [
              {
                label: 'Set Up Monitoring for New Deployment',
                contentSite: 'self-managed-search',
                url: '/docs/search/self-managed/:version/monitoring/setup-monitoring-new-deployment',
              },
              {
                label: 'mongot Metrics Reference',
                contentSite: 'self-managed-search',
                url: '/docs/search/self-managed/:version/monitoring/metrics-reference',
              },
              {
                label: 'mongot Logs and FTDC',
                contentSite: 'self-managed-search',
                url: '/docs/search/self-managed/:version/monitoring/logs-ftdc',
              },
              {
                label: 'Recommended Alerts',
                contentSite: 'self-managed-search',
                url: '/docs/search/self-managed/:version/monitoring/recommended-alerts',
              },
              {
                label: 'Monitoring Tool Integrations',
                contentSite: 'self-managed-search',
                url: '/docs/search/self-managed/:version/monitoring/tool-integrations',
              },
            ],
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
            url: 'https://www.mongodb.com/docs/search/self-managed/current/release-notes',
          },
        ],
      },
    ],
  },
];
