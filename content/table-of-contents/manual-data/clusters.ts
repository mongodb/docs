import type { TocItem } from '../types';

const tocData: TocItem[] = [
  {
    label: 'Connection Strings',
    contentSite: 'docs',
    url: '/docs/:version/reference/connection-string',
    collapsible: true,
    items: [
      {
        label: 'Options',
        contentSite: 'docs',
        url: '/docs/:version/reference/connection-string-options',
      },
      {
        label: 'Formats',
        contentSite: 'docs',
        url: '/docs/:version/reference/connection-string-formats',
      },
    ],
  },
  {
    label: 'Atlas Cluster Connection',
    contentSite: 'cloud-docs',
    url: '/docs/atlas/connect-to-database-deployment',
    collapsible: true,
    items: [
      {
        label: 'Drivers',
        contentSite: 'cloud-docs',
        url: '/docs/atlas/driver-connection',
      },
      {
        label: 'Compass',
        contentSite: 'cloud-docs',
        url: '/docs/atlas/compass-connection',
      },
      {
        label: 'mongosh',
        contentSite: 'cloud-docs',
        url: '/docs/atlas/mongo-shell-connection',
      },
      {
        label: 'SQL Interface',
        contentSite: 'cloud-docs',
        url: 'https://www.mongodb.com/docs/atlas/data-federation/query/connect-with-sql-overview/',
      },
      {
        label: 'Command Line Tools',
        contentSite: 'cloud-docs',
        url: '/docs/atlas/command-line-tools',
      },
      {
        label: 'VS Code',
        contentSite: 'cloud-docs',
        url: '/docs/atlas/mongodb-for-vscode',
      },
      {
        label: 'Azure Service Connector',
        contentSite: 'cloud-docs',
        url: '/docs/atlas/tutorial/azure-service-connector',
      },
    ],
  },
  {
    label: 'Authentication',
    contentSite: 'cloud-docs',
    url: '/docs/atlas/security/config-db-auth',
    collapsible: true,
    items: [
      {
        label: 'AWS IAM',
        contentSite: 'cloud-docs',
        url: '/docs/atlas/security/aws-iam-authentication',
      },
      {
        label: 'LDAP',
        contentSite: 'cloud-docs',
        url: '/docs/atlas/security-ldaps',
        collapsible: true,
        items: [
          {
            label: 'Microsoft Entra ID DS',
            contentSite: 'cloud-docs',
            url: '/docs/atlas/security-ldaps-azure',
          },
          {
            label: 'Okta',
            contentSite: 'cloud-docs',
            url: '/docs/atlas/security-ldaps-okta',
          },
          {
            label: 'OneLogin',
            contentSite: 'cloud-docs',
            url: '/docs/atlas/security-ldaps-onelogin',
          },
        ],
      },
      {
        label: 'OIDC/OAuth2.0',
        contentSite: 'cloud-docs',
        url: '/docs/atlas/security-oidc',
        collapsible: true,
        items: [
          {
            label: 'Workforce (Humans)',
            contentSite: 'cloud-docs',
            url: '/docs/atlas/workforce-oidc',
          },
          {
            label: 'Workload (Applications)',
            contentSite: 'cloud-docs',
            url: '/docs/atlas/workload-oidc',
          },
        ],
      },
      {
        label: 'X.509',
        contentSite: 'cloud-docs',
        url: '/docs/atlas/security-self-managed-x509',
      },
    ],
  },
  {
    label: 'Atlas IP Access List',
    contentSite: 'cloud-docs',
    url: '/docs/atlas/security/ip-access-list',
  },
  {
    label: 'Network Peering',
    contentSite: 'cloud-docs',
    url: '/docs/atlas/security-vpc-peering',
  },
  {
    label: 'Cloud Provider Access',
    contentSite: 'cloud-docs',
    url: '/docs/atlas/security/cloud-provider-access',
    collapsible: true,
    items: [
      {
        label: 'Unified AWS',
        contentSite: 'cloud-docs',
        url: '/docs/atlas/security/set-up-unified-aws-access',
      },
      {
        label: 'Azure Service',
        contentSite: 'cloud-docs',
        url: '/docs/atlas/security/set-up-azure-access',
      },
      {
        label: 'GCP Service Account',
        contentSite: 'cloud-docs',
        url: '/docs/atlas/security/set-up-gcp-access',
      },
    ],
  },
  {
    label: 'Private Endpoints',
    contentSite: 'cloud-docs',
    url: '/docs/atlas/security-configure-private-endpoints',
    collapsible: true,
    items: [
      {
        label: 'Overview',
        contentSite: 'cloud-docs',
        url: '/docs/atlas/security-private-endpoint',
      },
      {
        label: 'Dedicated Clusters',
        contentSite: 'cloud-docs',
        url: '/docs/atlas/security-cluster-private-endpoint',
      },
      {
        label: 'Manage and Connect',
        contentSite: 'cloud-docs',
        url: '/docs/atlas/security-manage-private-endpoint',
      },
      {
        label: 'Troubleshoot',
        contentSite: 'cloud-docs',
        url: '/docs/atlas/troubleshoot-private-endpoints',
      },
    ],
  },
  {
    label: 'AWS Lambda',
    contentSite: 'cloud-docs',
    url: '/docs/atlas/manage-connections-aws-lambda',
  },
  {
    label: 'Azure Functions',
    contentSite: 'cloud-docs',
    url: '/docs/atlas/manage-connections-azure-functions',
  },
  {
    label: 'Google Cloud Functions',
    contentSite: 'cloud-docs',
    url: '/docs/atlas/manage-connections-google-cloud',
  },
  {
    label: 'Troubleshoot Connection Issues',
    contentSite: 'cloud-docs',
    url: '/docs/atlas/troubleshoot-connection',
  },
];

export default tocData;
