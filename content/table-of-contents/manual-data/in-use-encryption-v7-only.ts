import type { TocItem } from '../types';

const tocData: TocItem[] = [
  {
    label: 'Queryable Encryption',
    contentSite: 'docs',
    url: '/docs/:version/core/queryable-encryption/',
    collapsible: true,
    items: [
      {
        label: 'Features',
        contentSite: 'docs',
        url: '/docs/:version/core/queryable-encryption/features/',
      },
      {
        label: 'Install a Driver',
        contentSite: 'docs',
        url: '/docs/:version/core/queryable-encryption/install/',
      },
      {
        label: 'Quick Start',
        contentSite: 'docs',
        url: '/docs/:version/core/queryable-encryption/quick-start/',
      },
      {
        label: 'Fundamentals',
        contentSite: 'docs',
        collapsible: true,
        items: [
          {
            label: 'Fields & Queries',
            contentSite: 'docs',
            url: '/docs/:version/core/queryable-encryption/fundamentals/encrypt-and-query/',
          },
          {
            label: 'Collections',
            contentSite: 'docs',
            url: '/docs/:version/core/queryable-encryption/fundamentals/manage-collections/',
          },
          {
            label: 'Explicit Encryption',
            contentSite: 'docs',
            url: '/docs/:version/core/queryable-encryption/fundamentals/manual-encryption/',
          },
          {
            label: 'Manage Keys',
            contentSite: 'docs',
            url: '/docs/:version/core/queryable-encryption/fundamentals/manage-keys/',
          },
          {
            label: 'KMS Providers',
            contentSite: 'docs',
            url: '/docs/:version/core/queryable-encryption/fundamentals/kms-providers/',
          },
        ],
      },
      {
        label: 'Tutorials',
        contentSite: 'docs',
        url: '/docs/:version/core/queryable-encryption/tutorials/',
        collapsible: true,
        items: [
          {
            label: 'Use AWS',
            contentSite: 'docs',
            url: '/docs/:version/core/queryable-encryption/tutorials/aws/aws-automatic/',
          },
          {
            label: 'Use Azure',
            contentSite: 'docs',
            url: '/docs/:version/core/queryable-encryption/tutorials/azure/azure-automatic/',
          },
          {
            label: 'Use GCP',
            contentSite: 'docs',
            url: '/docs/:version/core/queryable-encryption/tutorials/gcp/gcp-automatic/',
          },
          {
            label: 'Use KMIP',
            contentSite: 'docs',
            url: '/docs/:version/core/queryable-encryption/tutorials/kmip/kmip-automatic/',
          },
          {
            label: 'Use Explicit Encryption',
            contentSite: 'docs',
            url: '/docs/:version/core/queryable-encryption/tutorials/explicit-encryption/',
          },
        ],
      },
      {
        label: 'Reference',
        contentSite: 'docs',
        collapsible: true,
        items: [
          {
            label: 'Compatibility',
            contentSite: 'docs',
            url: '/docs/:version/core/queryable-encryption/reference/compatibility/',
          },
          {
            label: 'Queryable Encryption Limitations',
            contentSite: 'docs',
            url: '/docs/:version/core/queryable-encryption/reference/limitations/',
          },
          {
            label: 'Supported Operations',
            contentSite: 'docs',
            url: '/docs/:version/core/queryable-encryption/reference/supported-operations/',
          },
          {
            label: 'MongoClient Options',
            contentSite: 'docs',
            url: '/docs/:version/core/queryable-encryption/reference/qe-options-clients/',
          },
          {
            label: 'Shared Library',
            contentSite: 'docs',
            url: '/docs/:version/core/queryable-encryption/reference/shared-library/',
          },
          {
            label: 'Install libmongocrypt',
            contentSite: 'docs',
            url: '/docs/:version/core/queryable-encryption/reference/libmongocrypt/',
          },
          {
            label: 'Use mongocryptd',
            contentSite: 'docs',
            url: '/docs/:version/core/queryable-encryption/reference/mongocryptd/',
          },
        ],
      },
    ],
  },
  {
    label: 'Client-Side Field Level Encryption',
    contentSite: 'docs',
    url: '/docs/:version/core/csfle/',
    collapsible: true,
    items: [
      {
        label: 'Features',
        contentSite: 'docs',
        url: '/docs/:version/core/csfle/features/',
      },
      {
        label: 'Installation',
        contentSite: 'docs',
        url: '/docs/:version/core/csfle/install/',
      },
      {
        label: 'Quick Start',
        contentSite: 'docs',
        url: '/docs/:version/core/csfle/quick-start/',
      },
      {
        label: 'Fundamentals',
        contentSite: 'docs',
        collapsible: true,
        items: [
          {
            label: 'Automatic Encryption',
            contentSite: 'docs',
            url: '/docs/:version/core/csfle/fundamentals/automatic-encryption/',
          },
          {
            label: 'Explicit Encryption',
            contentSite: 'docs',
            url: '/docs/:version/core/csfle/fundamentals/manual-encryption/',
          },
          {
            label: 'Keys & Key Vaults',
            contentSite: 'docs',
            url: '/docs/:version/core/csfle/fundamentals/keys-key-vaults/',
          },
          {
            label: 'Schemas',
            contentSite: 'docs',
            url: '/docs/:version/core/csfle/fundamentals/create-schema/',
          },
          {
            label: 'Key Management',
            contentSite: 'docs',
            url: '/docs/:version/core/csfle/fundamentals/manage-keys/',
          },
          {
            label: 'Fields & Encryption Types',
            contentSite: 'docs',
            url: '/docs/:version/core/csfle/fundamentals/encryption-algorithms/',
          },
        ],
      },
      {
        label: 'Tutorials',
        contentSite: 'docs',
        url: '/docs/:version/core/queryable-encryption/tutorials/',
        collapsible: true,
        items: [
          {
            label: 'Use AWS',
            contentSite: 'docs',
            url: '/docs/:version/core/csfle/tutorials/aws/aws-automatic/',
          },
          {
            label: 'Use Azure',
            contentSite: 'docs',
            url: '/docs/:version/core/csfle/tutorials/azure/azure-automatic/',
          },
          {
            label: 'Use GCP',
            contentSite: 'docs',
            url: '/docs/:version/core/csfle/tutorials/gcp/gcp-automatic/',
          },
          {
            label: 'Use KMIP',
            contentSite: 'docs',
            url: '/docs/:version/core/csfle/tutorials/kmip/kmip-automatic/',
          },
        ],
      },
      {
        label: 'Reference',
        contentSite: 'docs',
        collapsible: true,
        items: [
          {
            label: 'Compatibility',
            contentSite: 'docs',
            url: '/docs/:version/core/csfle/reference/compatibility/',
          },
          {
            label: 'CSFLE Limitations',
            contentSite: 'docs',
            url: '/docs/:version/core/csfle/reference/limitations/',
          },
          {
            label: 'Schemas',
            contentSite: 'docs',
            url: '/docs/:version/core/csfle/reference/encryption-schemas/',
          },
          {
            label: 'Schema Enforcement',
            contentSite: 'docs',
            url: '/docs/:version/core/csfle/reference/server-side-schema/',
          },
          {
            label: 'Supported Operations',
            contentSite: 'docs',
            url: '/docs/:version/core/csfle/reference/supported-operations/',
          },
          {
            label: 'MongoClient Options',
            contentSite: 'docs',
            url: '/docs/:version/core/csfle/reference/csfle-options-clients/',
          },
          {
            label: 'KMS Providers',
            contentSite: 'docs',
            url: '/docs/:version/core/csfle/reference/kms-providers/',
          },
          {
            label: 'Components',
            contentSite: 'docs',
            url: '/docs/:version/core/csfle/reference/encryption-components/',
          },
          {
            label: 'Decryption',
            contentSite: 'docs',
            url: '/docs/:version/core/csfle/reference/decryption/',
          },
          {
            label: 'Cryptography',
            contentSite: 'docs',
            url: '/docs/:version/core/csfle/reference/cryptographic-primitives/',
          },
          {
            label: 'Shared Library',
            contentSite: 'docs',
            url: '/docs/:version/core/csfle/reference/shared-library/',
          },
          {
            label: 'Use mongocryptd',
            contentSite: 'docs',
            url: '/docs/:version/core/csfle/reference/mongocryptd/',
          },
          {
            label: 'Use libmongocrypt',
            contentSite: 'docs',
            url: '/docs/:version/core/csfle/reference/libmongocrypt/',
          },
        ],
      },
    ],
  },
];

export default tocData;
