import type { TocItem } from '../types';

const tocData: TocItem[] = [
  {
    label: 'Atlas Kubernetes Operator',
    contentSite: 'atlas-operator',
    url: '/docs/atlas/operator/:version/',
    group: true,
    versionDropdown: true,
    showSubNav: true,
    items: [
      {
        label: 'Get Started',
        contentSite: 'atlas-operator',
        url: '/docs/atlas/operator/:version/ak8so-get-started',
        collapsible: true,
        items: [
          {
            label: 'Quick Start',
            contentSite: 'atlas-operator',
            url: '/docs/atlas/operator/:version/ak8so-quick-start',
          },
          {
            label: 'Verify Package Integrity',
            contentSite: 'atlas-operator',
            url: '/docs/atlas/operator/:version/ak8so-verify-packages',
            versions: { excludes: ['v1.9', 'v2.0', 'v2.1'] },
          },
          {
            label: 'Helm Charts Quick Start',
            contentSite: 'atlas-operator',
            url: '/docs/atlas/operator/:version/ak8so-quick-start-helm',
          },
          {
            label: 'Atlas for Government',
            contentSite: 'atlas-operator',
            url: '/docs/atlas/operator/:version/ak8so-for-gov',
          },
          {
            label: 'Independent Custom Resource Definitions',
            contentSite: 'atlas-operator',
            url: '/docs/atlas/operator/:version/ak8so-independent-crd',
            versions: {
              excludes: ['v1.9', 'v2.0', 'v2.1', 'v2.2', 'v2.3', 'v2.4'],
            },
          },
          {
            label: 'Migrate Parameters to CRDs',
            contentSite: 'atlas-operator',
            url: '/docs/atlas/operator/:version/migrate-parameter-to-resource',
            versions: {
              includes: ['current', 'upcoming', 'v2.6', 'v2.7', 'v2.8', 'v2.9'],
            },
          },
          {
            label: 'Compatibility',
            contentSite: 'atlas-operator',
            url: '/docs/atlas/operator/:version/ak8so-compatibility',
          },
          {
            label: 'Metrics',
            contentSite: 'atlas-operator',
            url: '/docs/atlas/operator/:version/ak8so-metrics',
            versions: {
              excludes: [
                'v1.9',
                'v2.0',
                'v2.1',
                'v2.2',
                'v2.3',
                'v2.4',
                'v2.5',
                'v2.6',
                'v2.7',
                'v2.8',
                'v2.9',
              ],
            },
          },
        ],
      },
      {
        label: 'Atlas Access',
        contentSite: 'atlas-operator',
        url: '/docs/atlas/operator/:version/configure-ak8so-access-to-atlas',
        collapsible: true,
        items: [
          {
            label: 'Secret Storage',
            contentSite: 'atlas-operator',
            url: '/docs/atlas/operator/:version/ak8so-secret-storage',
          },
          {
            label: 'Network Peering',
            contentSite: 'atlas-operator',
            url: '/docs/atlas/operator/:version/ak8so-network-peering',
          },
          {
            label: 'Private Endpoints',
            contentSite: 'atlas-operator',
            url: '/docs/atlas/operator/:version/ak8so-private-link',
            collapsible: true,
            items: [
              {
                label: 'Dedicated',
                contentSite: 'atlas-operator',
                url: '/docs/atlas/operator/:version/ak8so-private-link-dedicated',
              },
              {
                label: 'Federated',
                contentSite: 'atlas-operator',
                url: '/docs/atlas/operator/:version/ak8so-private-link-datafederation',
              },
            ],
          },
          {
            label: 'Cloud Provider Integrations',
            contentSite: 'atlas-operator',
            url: '/docs/atlas/operator/:version/ak8so-unified-access',
          },
          {
            label: 'Custom Database Roles',
            contentSite: 'atlas-operator',
            url: '/docs/atlas/operator/:version/ak8so-configure-custom-database-roles',
            versions: {
              excludes: ['current', 'upcoming', 'v2.6', 'v2.7', 'v2.8', 'v2.9'],
            },
          },
          {
            label: 'X.509',
            contentSite: 'atlas-operator',
            url: '/docs/atlas/operator/:version/ak8so-x509',
          },
          {
            label: 'Encrypt Data',
            contentSite: 'atlas-operator',
            url: '/docs/atlas/operator/:version/ak8so-encryption-at-rest-customer-keys',
          },
          {
            label: 'Federated Authentication',
            contentSite: 'atlas-operator',
            url: '/docs/atlas/operator/:version/ak8so-configure-federated-authentication',
          },
          {
            label: 'Teams',
            contentSite: 'atlas-operator',
            url: '/docs/atlas/operator/:version/ak8so-configure-teams',
          },
        ],
      },
      {
        label: 'Dry Run',
        contentSite: 'atlas-operator',
        url: '/docs/atlas/operator/:version/ak8so-dry-run',
        versions: { includes: ['current', 'upcoming', 'v2.8', 'v2.9'] },
      },
      {
        label: 'Import Projects',
        contentSite: 'atlas-operator',
        url: '/docs/atlas/operator/:version/ak8so-import-projects',
      },
      {
        label: 'Data Federation',
        contentSite: 'atlas-operator',
        url: '/docs/atlas/operator/:version/ak8so-set-up-data-federation',
      },
      {
        label: 'Atlas Search',
        contentSite: 'atlas-operator',
        url: '/docs/atlas/operator/:version/ak8so-create-atlas-search-index',
        versions: { excludes: ['v1.9', 'v2.0', 'v2.1', 'v2.2'] },
      },
      {
        label: 'Atlas Vector Search',
        contentSite: 'atlas-operator',
        url: '/docs/atlas/operator/:version/ak8so-create-vector-search-index',
        versions: { excludes: ['v1.9', 'v2.0', 'v2.1', 'v2.2'] },
      },
      {
        label: 'Atlas Stream Processing',
        contentSite: 'atlas-operator',
        url: '/docs/atlas/operator/:version/ak8so-stream-processing',
        versions: { excludes: ['v1.9', 'v2.0', 'v2.1', 'v2.2'] },
      },
      {
        label: 'Atlas Cluster Backup',
        contentSite: 'atlas-operator',
        url: '/docs/atlas/operator/:version/ak8so-back-up-deployment',
        collapsible: true,
        items: [
          {
            label: 'Compliance Policies',
            contentSite: 'atlas-operator',
            url: '/docs/atlas/operator/:version/ak8so-bcp',
            versions: { excludes: ['v1.9', 'v2.0', 'v2.1', 'v2.2', 'v2.3'] },
          },
        ],
      },
      {
        label: 'Monitor Deployments',
        contentSite: 'atlas-operator',
        url: '/docs/atlas/operator/:version/ak8so-monitoring',
        collapsible: true,
        items: [
          {
            label: 'Project Alerts',
            contentSite: 'atlas-operator',
            url: '/docs/atlas/operator/:version/ak8so-alert-configurations',
          },
          {
            label: 'Audit Logs',
            contentSite: 'atlas-operator',
            url: '/docs/atlas/operator/:version/ak8so-configure-audit-logs',
          },
          {
            label: 'Third-Party Services',
            contentSite: 'atlas-operator',
            url: '/docs/atlas/operator/:version/ak8so-integrate-third-party',
          },
        ],
      },
      {
        label: 'Custom Resources',
        contentSite: 'atlas-operator',
        url: '/docs/atlas/operator/:version/custom-resources',
        collapsible: true,
        items: [
          {
            label: 'AtlasProject',
            contentSite: 'atlas-operator',
            url: '/docs/atlas/operator/:version/atlasproject-custom-resource',
          },
          {
            label: 'AtlasDeployment',
            contentSite: 'atlas-operator',
            url: '/docs/atlas/operator/:version/atlasdeployment-custom-resource',
          },
          {
            label: 'AtlasDatabaseUser',
            contentSite: 'atlas-operator',
            url: '/docs/atlas/operator/:version/atlasdatabaseuser-custom-resource',
          },
          {
            label: 'AtlasBackupPolicy',
            contentSite: 'atlas-operator',
            url: '/docs/atlas/operator/:version/atlasbackuppolicy-custom-resource',
          },
          {
            label: 'AtlasBackupSchedule',
            contentSite: 'atlas-operator',
            url: '/docs/atlas/operator/:version/atlasbackupschedule-custom-resource',
          },
          {
            label: 'AtlasCustomRoles',
            contentSite: 'atlas-operator',
            url: '/docs/atlas/operator/:version/atlascustomrole-custom-resource',
            versions: {
              includes: ['current', 'upcoming', 'v2.6', 'v2.7', 'v2.8', 'v2.9'],
            },
          },
          {
            label: 'AtlasIPAccessList',
            contentSite: 'atlas-operator',
            url: '/docs/atlas/operator/:version/atlasipaccesslist-custom-resource',
            versions: {
              includes: ['current', 'upcoming', 'v2.7', 'v2.8', 'v2.9'],
            },
          },
          {
            label: 'AtlasNetworkContainer',
            contentSite: 'atlas-operator',
            url: '/docs/atlas/operator/:version/atlasnetworkcontainer-custom-resource',
            versions: { includes: ['current', 'upcoming', 'v2.8', 'v2.9'] },
          },
          {
            label: 'AtlasNetworkPeering',
            contentSite: 'atlas-operator',
            url: '/docs/atlas/operator/:version/atlasnetworkpeering-custom-resource',
            versions: { includes: ['current', 'upcoming', 'v2.8', 'v2.9'] },
          },
          {
            label: 'AtlasOrgSettings',
            contentSite: 'atlas-operator',
            url: '/docs/atlas/operator/:version/atlasorgsettings-custom-resource',
            versions: {
              excludes: ['v2.4', 'v2.5', 'v2.6', 'v2.7', 'v2.8', 'v2.9'],
            },
          },
          {
            label: 'AtlasPrivateEndpoint',
            contentSite: 'atlas-operator',
            url: '/docs/atlas/operator/:version/atlasprivateendpoint-custom-resource',
            versions: {
              includes: ['current', 'upcoming', 'v2.6', 'v2.7', 'v2.8', 'v2.9'],
            },
          },
          {
            label: 'AtlasSearchIndexConfig',
            contentSite: 'atlas-operator',
            url: '/docs/atlas/operator/:version/atlassearchindexconfig-custom-resource',
            versions: { excludes: ['v1.9', 'v2.0', 'v2.1', 'v2.2'] },
          },
          {
            label: 'AtlasStreamConnection',
            contentSite: 'atlas-operator',
            url: '/docs/atlas/operator/:version/atlasstreamconnection-custom-resource',
            versions: { excludes: ['v1.9', 'v2.0', 'v2.1', 'v2.2'] },
          },
          {
            label: 'AtlasStreamWorkspace',
            contentSite: 'atlas-operator',
            url: '/docs/atlas/operator/:version/atlasstreamworkspace-custom-resource',
            versions: { excludes: ['v1.9', 'v2.0', 'v2.1', 'v2.2'] },
          },
          {
            label: 'AtlasThirdPartyIntegration',
            contentSite: 'atlas-operator',
            url: '/docs/atlas/operator/:version/atlasthirdpartyintegration-custom-resource',
            versions: { includes: ['current', 'upcoming', 'v2.9'] },
          },
          {
            label: 'AtlasBackupCompliance',
            contentSite: 'atlas-operator',
            url: '/docs/atlas/operator/:version/bcp-custom-resource',
            versions: { excludes: ['v1.9', 'v2.0', 'v2.1', 'v2.2', 'v2.3'] },
          },
          {
            label: 'AtlasTeam',
            contentSite: 'atlas-operator',
            url: '/docs/atlas/operator/:version/atlasteam-custom-resource',
          },
          {
            label: 'AtlasDataFederation',
            contentSite: 'atlas-operator',
            url: '/docs/atlas/operator/:version/atlasdatafederation-custom-resource',
          },
          {
            label: 'AtlasFederatedAuth',
            contentSite: 'atlas-operator',
            url: '/docs/atlas/operator/:version/atlasfederatedauth-custom-resource',
          },
        ],
      },
      {
        label: 'Flex to Dedicated Migration',
        contentSite: 'atlas-operator',
        url: '/docs/atlas/operator/:version/flex-to-dedicated-migration',
        versions: { includes: ['current', 'upcoming'] },
      },
      {
        label: 'Production Notes',
        contentSite: 'atlas-operator',
        url: '/docs/atlas/operator/:version/production-notes',
      },
      {
        label: 'Changelog',
        contentSite: 'atlas-operator',
        url: '/docs/atlas/operator/:version/ak8so-changelog',
      },
      {
        label: 'Upgrade from v1.x to v2.x',
        contentSite: 'atlas-operator',
        url: '/docs/atlas/operator/:version/upgrade-ako-v1-to-v2',
        versions: { excludes: ['v1.9', 'v2.2'] },
      },
    ],
  },
];

export default tocData;
