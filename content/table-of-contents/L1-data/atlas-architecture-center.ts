import partnersLibrary from '../L2-data/partners-library';
import solutionsLibrary from '../L2-data/solutions-library';
import type { TocItem } from '../types';

const tocData: TocItem[] = [
  {
    label: 'Well-Architected Framework',
    contentSite: 'atlas-architecture',
    versionDropdown: true,
    group: true,
    items: [
      {
        label: 'Getting Started',
        contentSite: 'atlas-architecture',
        url: '/docs/atlas/architecture/:version/getting-started',
        collapsible: true,
        items: [
          {
            label: 'Landing Zone Design',
            contentSite: 'atlas-architecture',
            url: '/docs/atlas/architecture/:version/landing-zone',
          },
          {
            label: 'Deployment Paradigms',
            contentSite: 'atlas-architecture',
            url: '/docs/atlas/architecture/:version/deployment-paradigms',
            versions: { excludes: ['v20250604', 'v20250317', 'v20250228'] },
            collapsible: true,
            items: [
              {
                label: 'Single-Region',
                contentSite: 'atlas-architecture',
                url: '/docs/atlas/architecture/:version/deployment-paradigms/single-region',
                versions: { excludes: ['v20250604', 'v20250317', 'v20250228'] },
              },
              {
                label: 'Multi-Region',
                contentSite: 'atlas-architecture',
                url: '/docs/atlas/architecture/:version/deployment-paradigms/multi-region',
                versions: { excludes: ['v20250604', 'v20250317', 'v20250228'] },
                collapsible: true,
                items: [
                  {
                    label: 'Global Data',
                    contentSite: 'atlas-architecture',
                    url: '/docs/atlas/architecture/:version/deployment-paradigms/global-data',
                    versions: {
                      excludes: ['v20250604', 'v20250317', 'v20250228'],
                    },
                  },
                ],
              },
              {
                label: 'Multi-Cloud',
                contentSite: 'atlas-architecture',
                url: '/docs/atlas/architecture/:version/deployment-paradigms/multi-cloud',
                versions: { excludes: ['v20250604', 'v20250317', 'v20250228'] },
              },
              {
                label: 'Hybrid',
                contentSite: 'atlas-architecture',
                url: '/docs/atlas/architecture/:version/deployment-paradigms/hybrid',
                versions: { excludes: ['v20250604', 'v20250317', 'v20250228'] },
              },
            ],
          },
          {
            label: 'Orgs, Projects, and Clusters',
            contentSite: 'atlas-architecture',
            url: '/docs/atlas/architecture/:version/hierarchy',
          },
          {
            label: 'Migration',
            contentSite: 'atlas-architecture',
            url: '/docs/atlas/architecture/:version/migration',
            versions: { excludes: ['v20250604', 'v20250317', 'v20250228'] },
          },
          {
            label: 'Operational Readiness Checklist',
            contentSite: 'atlas-architecture',
            url: '/docs/atlas/architecture/:version/operational-readiness-checklist',
            versions: { excludes: ['v20250604', 'v20250317', 'v20250228'] },
          },
        ],
      },
      {
        label: 'Operational Efficiency',
        contentSite: 'atlas-architecture',
        url: '/docs/atlas/architecture/:version/operational-efficiency',
        collapsible: true,
        items: [
          {
            label: 'Automation',
            contentSite: 'atlas-architecture',
            url: '/docs/atlas/architecture/:version/automation',
          },
          {
            label: 'Monitoring and Alerts',
            contentSite: 'atlas-architecture',
            url: '/docs/atlas/architecture/:version/monitoring-alerts',
          },
          {
            label: 'Development and Testing',
            contentSite: 'atlas-architecture',
            url: '/docs/atlas/architecture/:version/dev-test',
            versions: { excludes: ['v20250604', 'v20250317', 'v20250228'] },
          },
        ],
      },
      {
        label: 'Security',
        contentSite: 'atlas-architecture',
        url: '/docs/atlas/architecture/:version/security',
        collapsible: true,
        items: [
          {
            label: 'Network Security',
            contentSite: 'atlas-architecture',
            url: '/docs/atlas/architecture/:version/network-security',
          },
          {
            label: 'Authorization and Authentication',
            contentSite: 'atlas-architecture',
            url: '/docs/atlas/architecture/:version/auth',
            versions: { includes: ['v20250604', 'v20250317', 'v20250228'] },
          },
          {
            label: 'Authorization and Authentication ',
            contentSite: 'atlas-architecture',
            url: '/docs/atlas/architecture/:version/auth',
            versions: { excludes: ['v20250604', 'v20250317', 'v20250228'] },
            collapsible: true,
            items: [
              {
                label: 'Authentication',
                contentSite: 'atlas-architecture',
                url: '/docs/atlas/architecture/:version/auth/authentication',
                versions: { excludes: ['v20250604', 'v20250317', 'v20250228'] },
              },
              {
                label: 'Authorization',
                contentSite: 'atlas-architecture',
                url: '/docs/atlas/architecture/:version/auth/authorization',
                versions: { excludes: ['v20250604', 'v20250317', 'v20250228'] },
              },
              {
                label: 'Auth Examples',
                contentSite: 'atlas-architecture',
                url: '/docs/atlas/architecture/:version/auth/auth-examples',
                versions: { excludes: ['v20250604', 'v20250317', 'v20250228'] },
              },
            ],
          },
          {
            label: 'Data Encryption',
            contentSite: 'atlas-architecture',
            url: '/docs/atlas/architecture/:version/data-encryption',
          },
          {
            label: 'Compliance',
            contentSite: 'atlas-architecture',
            url: '/docs/atlas/architecture/:version/compliance',
          },
          {
            label: 'Auditing and Logging',
            contentSite: 'atlas-architecture',
            url: '/docs/atlas/architecture/:version/auditing-logging',
            versions: { includes: ['v20250604', 'v20250317', 'v20250228'] },
          },
          {
            label: 'Auditing and Logging ',
            contentSite: 'atlas-architecture',
            url: '/docs/atlas/architecture/:version/auditing-logging',
            collapsible: true,
            versions: { excludes: ['v20250604', 'v20250317', 'v20250228'] },
            items: [
              {
                label: 'Auditing',
                contentSite: 'atlas-architecture',
                url: '/docs/atlas/architecture/:version/auditing',
                versions: { excludes: ['v20250604', 'v20250317', 'v20250228'] },
              },
              {
                label: 'Logging',
                contentSite: 'atlas-architecture',
                url: '/docs/atlas/architecture/:version/logging',
                versions: { excludes: ['v20250604', 'v20250317', 'v20250228'] },
              },
            ],
          },
        ],
      },
      {
        label: 'Reliability',
        contentSite: 'atlas-architecture',
        url: '/docs/atlas/architecture/:version/reliability',
        collapsible: true,
        items: [
          {
            label: 'High Availability',
            contentSite: 'atlas-architecture',
            url: '/docs/atlas/architecture/:version/high-availability',
          },
          {
            label: 'Resiliency',
            contentSite: 'atlas-architecture',
            url: '/docs/atlas/architecture/:version/resiliency',
            versions: { includes: ['v20250604', 'v20250317', 'v20250228'] },
          },
          {
            label: 'Backups',
            contentSite: 'atlas-architecture',
            url: '/docs/atlas/architecture/:version/backups',
          },
          {
            label: 'Disaster Recovery',
            contentSite: 'atlas-architecture',
            url: '/docs/atlas/architecture/:version/disaster-recovery',
          },
        ],
      },
      {
        label: 'Performance',
        contentSite: 'atlas-architecture',
        url: '/docs/atlas/architecture/:version/performance',
        collapsible: true,
        items: [
          {
            label: 'Scalability',
            contentSite: 'atlas-architecture',
            url: '/docs/atlas/architecture/:version/scalability',
          },
          {
            label: 'Latency Reduction',
            contentSite: 'atlas-architecture',
            url: '/docs/atlas/architecture/:version/latency-strategies',
            versions: { excludes: ['v20250604', 'v20250317', 'v20250228'] },
          },
        ],
      },
      {
        label: 'Cost Optimization',
        contentSite: 'atlas-architecture',
        url: '/docs/atlas/architecture/:version/cost-optimization',
        collapsible: true,
        items: [
          {
            label: 'Cost-Saving Configurations',
            contentSite: 'atlas-architecture',
            url: '/docs/atlas/architecture/:version/cost-saving-config',
          },
          {
            label: 'Billing Data',
            contentSite: 'atlas-architecture',
            url: '/docs/atlas/architecture/:version/billing-data',
          },
        ],
      },
      {
        label: 'Release Notes',
        contentSite: 'atlas-architecture',
        url: '/docs/atlas/architecture/:version/release-notes',
      },
    ],
  },
  {
    label: 'Solutions Library',
    contentSite: 'atlas-architecture',
    group: true,
    items: solutionsLibrary,
  },
  {
    label: 'Partners Library',
    contentSite: 'atlas-architecture',
    group: true,
    items: partnersLibrary,
  },
];

export default tocData;
