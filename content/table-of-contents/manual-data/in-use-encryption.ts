import type { TocItem } from '../types';

const tocData: TocItem[] = [
  {
    label: 'Comparing Approaches',
    contentSite: 'docs',
    url: '/docs/:version/core/queryable-encryption/about-qe-csfle',
    collapsible: true,
    items: [
      {
        label: 'Compatibility',
        contentSite: 'docs',
        url: '/docs/:version/core/queryable-encryption/reference/compatibility',
      },
      {
        label: 'Queryable Encryption Limitations',
        contentSite: 'docs',
        url: '/docs/:version/core/queryable-encryption/reference/limitations',
      },
      {
        label: 'CSFLE Limitations',
        contentSite: 'docs',
        url: '/docs/:version/core/csfle/reference/limitations',
      },
    ],
  },
  {
    label: 'Cryptographic Primitives',
    contentSite: 'docs',
    url: '/docs/:version/core/csfle/reference/cryptographic-primitives',
  },
  {
    label: 'Keys and Key Vaults',
    contentSite: 'docs',
    url: '/docs/:version/core/queryable-encryption/fundamentals/keys-key-vaults',
    collapsible: true,
    items: [
      {
        label: 'KMS Providers',
        contentSite: 'docs',
        url: '/docs/:version/core/queryable-encryption/fundamentals/kms-providers',
      },
    ],
  },
  {
    label: 'Queryable Encryption',
    contentSite: 'docs',
    url: '/docs/:version/core/queryable-encryption',
    collapsible: true,
    items: [
      {
        label: 'Features',
        contentSite: 'docs',
        url: '/docs/:version/core/queryable-encryption/features',
      },
      {
        label: 'Quick Start',
        contentSite: 'docs',
        url: '/docs/:version/core/queryable-encryption/quick-start',
      },
      {
        label: 'Fundamentals',
        contentSite: 'docs',
        url: '/docs/:version/core/queryable-encryption/fundamentals',
        collapsible: true,
        items: [
          {
            label: 'Fields & Queries',
            contentSite: 'docs',
            url: '/docs/:version/core/queryable-encryption/fundamentals/encrypt-and-query',
          },
          {
            label: 'Create a Schema',
            contentSite: 'docs',
            url: '/docs/:version/core/queryable-encryption/qe-create-encryption-schema',
          },
          {
            label: 'Encrypt Collections at Creation',
            contentSite: 'docs',
            url: '/docs/:version/core/queryable-encryption/fundamentals/enable-qe',
          },
          {
            label: 'Collections',
            contentSite: 'docs',
            url: '/docs/:version/core/queryable-encryption/fundamentals/manage-collections',
          },
          {
            label: 'Explicit Encryption',
            contentSite: 'docs',
            url: '/docs/:version/core/queryable-encryption/fundamentals/manual-encryption',
          },
          {
            label: 'Manage Keys',
            contentSite: 'docs',
            url: '/docs/:version/core/queryable-encryption/fundamentals/manage-keys',
          },
        ],
      },
      {
        label: 'Tutorials',
        contentSite: 'docs',
        url: '/docs/:version/core/queryable-encryption/tutorials',
        collapsible: true,
        items: [
          {
            label: 'Enable',
            contentSite: 'docs',
            url: '/docs/:version/core/queryable-encryption/overview-enable-qe',
            collapsible: true,
            items: [
              {
                label: 'Install a Driver',
                contentSite: 'docs',
                url: '/docs/:version/core/queryable-encryption/install',
              },
              {
                label: 'Install and Configure a Query Analysis Component',
                contentSite: 'docs',
                url: '/docs/:version/core/queryable-encryption/install-library',
              },
              {
                label: 'Create a Customer Master Key',
                contentSite: 'docs',
                url: '/docs/:version/core/queryable-encryption/qe-create-cmk',
              },
              {
                label: 'Create an Application',
                contentSite: 'docs',
                url: '/docs/:version/core/queryable-encryption/qe-create-application',
              },
            ],
          },
          {
            label: 'Create & Query',
            contentSite: 'docs',
            url: '/docs/:version/core/queryable-encryption/overview-use-qe',
            collapsible: true,
            items: [
              {
                label: 'Create a Collection',
                contentSite: 'docs',
                url: '/docs/:version/core/queryable-encryption/qe-create-encrypted-collection',
              },
              {
                label: 'Query',
                contentSite: 'docs',
                url: '/docs/:version/core/queryable-encryption/qe-retrieve-encrypted-document',
              },
            ],
          },
          {
            label: 'Use Explicit Encryption',
            contentSite: 'docs',
            url: '/docs/:version/core/queryable-encryption/tutorials/explicit-encryption',
          },
        ],
      },
      {
        label: 'Reference',
        contentSite: 'docs',
        url: '/docs/:version/core/queryable-encryption/reference',
        collapsible: true,
        items: [
          {
            label: 'Supported Operations',
            contentSite: 'docs',
            url: '/docs/:version/core/queryable-encryption/reference/supported-operations',
          },
          {
            label: 'MongoClient Options',
            contentSite: 'docs',
            url: '/docs/:version/core/queryable-encryption/reference/qe-options-clients',
          },
        ],
      },
    ],
  },
  {
    label: 'Client-Side Field Level Encryption',
    contentSite: 'docs',
    url: '/docs/:version/core/csfle',
    collapsible: true,
    items: [
      {
        label: 'Features',
        contentSite: 'docs',
        url: '/docs/:version/core/csfle/features',
      },
      {
        label: 'Installation Requirements',
        contentSite: 'docs',
        url: '/docs/:version/core/csfle/install',
      },
      {
        label: 'Quick Start',
        contentSite: 'docs',
        url: '/docs/:version/core/csfle/quick-start',
      },
      {
        label: 'Fundamentals',
        contentSite: 'docs',
        url: '/docs/:version/core/csfle/fundamentals',
        collapsible: true,
        items: [
          {
            label: 'Automatic Encryption',
            contentSite: 'docs',
            url: '/docs/:version/core/csfle/fundamentals/automatic-encryption',
          },
          {
            label: 'Explicit Encryption',
            contentSite: 'docs',
            url: '/docs/:version/core/csfle/fundamentals/manual-encryption',
          },
          {
            label: 'Encryption Schemas',
            contentSite: 'docs',
            url: '/docs/:version/core/csfle/fundamentals/create-schema',
          },
          {
            label: 'Keys and Key Vaults',
            contentSite: 'docs',
            url: '/docs/:version/core/queryable-encryption/fundamentals/keys-key-vaults/',
          },
          {
            label: 'Encryption Key Management',
            contentSite: 'docs',
            url: '/docs/:version/core/csfle/fundamentals/manage-keys',
          },
          {
            label: 'Fields and Encryption Types',
            contentSite: 'docs',
            url: '/docs/:version/core/csfle/fundamentals/encryption-algorithms',
          },
        ],
      },
      {
        label: 'Tutorials',
        contentSite: 'docs',
        url: '/docs/:version/core/csfle/tutorials',
        collapsible: true,
        items: [
          {
            label: 'Use Automatic Client-Side Field Level Encryption with AWS',
            contentSite: 'docs',
            url: '/docs/:version/core/csfle/tutorials/aws/aws-automatic',
          },
          {
            label:
              'Use Automatic Client-Side Field Level Encryption with Azure',
            contentSite: 'docs',
            url: '/docs/:version/core/csfle/tutorials/azure/azure-automatic',
          },
          {
            label: 'Use Automatic Client-Side Field Level Encryption with GCP',
            contentSite: 'docs',
            url: '/docs/:version/core/csfle/tutorials/gcp/gcp-automatic',
          },
          {
            label: 'Use Automatic Client-Side Field Level Encryption with KMIP',
            contentSite: 'docs',
            url: '/docs/:version/core/csfle/tutorials/kmip/kmip-automatic',
          },
          {
            label: 'Implement Right to Erasure',
            contentSite: 'docs',
            url: '/docs/:version/core/csfle/tutorials/right-to-erasure',
            versions: { excludes: ['v7.0'] },
          },
        ],
      },
      {
        label: 'Reference',
        contentSite: 'docs',
        url: '/docs/:version/core/csfle/reference',
        collapsible: true,
        items: [
          {
            label: 'CSFLE Limitations',
            contentSite: 'docs',
            url: '/docs/:version/core/csfle/reference/limitations',
          },
          {
            label: 'CSFLE Encryption Schemas',
            contentSite: 'docs',
            url: '/docs/:version/core/csfle/reference/encryption-schemas',
          },
          {
            label: 'CSFLE Server-Side Schema Enforcement',
            contentSite: 'docs',
            url: '/docs/:version/core/csfle/reference/server-side-schema',
          },
          {
            label: 'Supported Operations for Automatic Encryption',
            contentSite: 'docs',
            url: '/docs/:version/core/csfle/reference/supported-operations',
          },
          {
            label: 'CSFLE-Specific MongoClient Options',
            contentSite: 'docs',
            url: '/docs/:version/core/csfle/reference/csfle-options-clients',
          },
          {
            label: 'CSFLE Encryption Components',
            contentSite: 'docs',
            url: '/docs/:version/core/csfle/reference/encryption-components',
          },
          {
            label: 'How CSFLE Decrypts Documents',
            contentSite: 'docs',
            url: '/docs/:version/core/csfle/reference/decryption',
          },
          {
            label: 'Install and Configure a CSFLE Query Analysis Component',
            contentSite: 'docs',
            url: '/docs/:version/core/csfle/reference/install-library/',
          },
          {
            label: 'Install libmongocrypt',
            contentSite: 'docs',
            url: '/docs/:version/core/csfle/reference/libmongocrypt',
          },
        ],
      },
    ],
  },
];

export default tocData;
