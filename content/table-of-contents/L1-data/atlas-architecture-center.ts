import partnerShowcase from '../L2-data/partner-showcase';
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
            collapsible: true,
            items: [
              {
                label: 'Single-Region',
                contentSite: 'atlas-architecture',
                url: '/docs/atlas/architecture/:version/deployment-paradigms/single-region',
              },
              {
                label: 'Multi-Region',
                contentSite: 'atlas-architecture',
                url: '/docs/atlas/architecture/:version/deployment-paradigms/multi-region',
                collapsible: true,
                items: [
                  {
                    label: 'Global Data',
                    contentSite: 'atlas-architecture',
                    url: '/docs/atlas/architecture/:version/deployment-paradigms/global-data',
                  },
                ],
              },
              {
                label: 'Multi-Cloud',
                contentSite: 'atlas-architecture',
                url: '/docs/atlas/architecture/:version/deployment-paradigms/multi-cloud',
              },
              {
                label: 'Hybrid',
                contentSite: 'atlas-architecture',
                url: '/docs/atlas/architecture/:version/deployment-paradigms/hybrid',
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
          },
          {
            label: 'Operational Readiness Checklist',
            contentSite: 'atlas-architecture',
            url: '/docs/atlas/architecture/:version/operational-readiness-checklist',
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
            label: 'Authorization and Authentication ',
            contentSite: 'atlas-architecture',
            url: '/docs/atlas/architecture/:version/auth',
            collapsible: true,
            items: [
              {
                label: 'Authentication',
                contentSite: 'atlas-architecture',
                url: '/docs/atlas/architecture/:version/auth/authentication',
              },
              {
                label: 'Authorization',
                contentSite: 'atlas-architecture',
                url: '/docs/atlas/architecture/:version/auth/authorization',
              },
              {
                label: 'Auth Examples',
                contentSite: 'atlas-architecture',
                url: '/docs/atlas/architecture/:version/auth/auth-examples',
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
            label: 'Compliance ',
            contentSite: 'atlas-architecture',
            url: '/docs/atlas/architecture/:version/compliance',
            collapsible: true,
            items: [
              {
                label: 'DORA',
                contentSite: 'atlas-architecture',
                url: '/docs/atlas/architecture/:version/compliance/dora',
              },
              {
                label: 'GDPR',
                contentSite: 'atlas-architecture',
                url: '/docs/atlas/architecture/:version/compliance/gdpr',
              },
              {
                label: 'HIPAA',
                contentSite: 'atlas-architecture',
                url: '/docs/atlas/architecture/:version/compliance/hipaa',
              },
              {
                label: 'PCI DSS',
                contentSite: 'atlas-architecture',
                url: '/docs/atlas/architecture/:version/compliance/pcidss',
              },
              {
                label: 'SOC 2 Type II',
                contentSite: 'atlas-architecture',
                url: '/docs/atlas/architecture/:version/compliance/soc2',
                versions: {
                  excludes: [
                    'v20260204',
                    'v20251125',
                    'v20250829',
                    'v20250604',
                    'v20250317',
                    'v20250228',
                  ],
                },
              },
            ],
          },
          {
            label: 'Auditing and Logging ',
            contentSite: 'atlas-architecture',
            url: '/docs/atlas/architecture/:version/auditing-logging',
            collapsible: true,
            items: [
              {
                label: 'Auditing',
                contentSite: 'atlas-architecture',
                url: '/docs/atlas/architecture/:version/auditing',
              },
              {
                label: 'Logging',
                contentSite: 'atlas-architecture',
                url: '/docs/atlas/architecture/:version/logging',
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
    label: 'Partner Showcase',
    contentSite: 'atlas-architecture',
    group: true,
    items: partnerShowcase,
  },
];

export default tocData;
