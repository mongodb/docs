import type { TocItem } from '../types';

// import docsVersions from '../version-arrays/drivers/java-versions';

//const outdatedVersions = docsVersions.before('v5.3', { inclusive: true });

const tocData: TocItem[] = [
  {
    label: 'Java Sync Driver',
    contentSite: 'java',
    group: true,
    versionDropdown: true,
    items: [
      {
        label: 'Overview',
        contentSite: 'java',
        url: '/docs/drivers/java/sync/:version',
      },
      {
        label: 'Get Started',
        contentSite: 'java',
        url: '/docs/drivers/java/sync/:version/get-started',
      },
      {
        label: 'Connect',
        contentSite: 'java',
        collapsible: true,
        items: [
          {
            label: 'Create a MongoClient',
            contentSite: 'java',
            url: '/docs/drivers/java/sync/:version/connection/mongoclient',
          },
          {
            label: 'Specify Connection Options',
            contentSite: 'java',
            collapsible: true,
            items: [
              {
                label: 'Stable API',
                contentSite: 'java',
                url: '/docs/drivers/java/sync/:version/connection/specify-connection-options/stable-api',
              },
              {
                label: 'Limit Execution Time',
                contentSite: 'java',
                url: '/docs/drivers/java/sync/:version/connection/specify-connection-options/csot',
              },
              {
                label: 'Connection Pools',
                contentSite: 'java',
                url: '/docs/drivers/java/sync/:version/connection/specify-connection-options/connection-pools',
              },
              {
                label: 'Cluster Settings',
                contentSite: 'java',
                url: '/docs/drivers/java/sync/:version/connection/specify-connection-options/cluster-settings',
              },
              {
                label: 'Server Settings',
                contentSite: 'java',
                url: '/docs/drivers/java/sync/:version/connection/specify-connection-options/server-settings',
              },
              {
                label: 'Socket Settings',
                contentSite: 'java',
                url: '/docs/drivers/java/sync/:version/connection/specify-connection-options/socket-settings',
              },
              {
                label: 'Configure Client-level CRUD Settings',
                contentSite: 'java',
                url: '/docs/drivers/java/sync/:version/connection/specify-connection-options/configure-crud',
              },
              {
                label: 'Network Compression',
                contentSite: 'java',
                url: '/docs/drivers/java/sync/:version/connection/specify-connection-options/network-compression',
              },
              {
                label: 'JNDI Datasource',
                contentSite: 'java',
                url: '/docs/drivers/java/sync/:version/connection/specify-connection-options/jndi',
              },
              {
                label: 'AWS Lambda',
                contentSite: 'cloud-docs',
                url: 'https://www.mongodb.com/docs/atlas/manage-connections-aws-lambda',
              },
            ],
          },
          {
            label: 'Connection Troubleshooting',
            contentSite: 'java',
            url: '/docs/drivers/java/sync/:version/connection/connection-troubleshooting',
          },
        ],
      },
      {
        label: 'Databases & Collections',
        contentSite: 'java',
        url: '/docs/drivers/java/sync/:version/databases-collections',
      },
      {
        label: 'CRUD Operations',
        contentSite: 'java',
        collapsible: true,
        items: [
          {
            label: 'Insert Documents',
            contentSite: 'java',
            url: '/docs/drivers/java/sync/:version/crud/insert',
          },
          {
            label: 'Query Documents',
            contentSite: 'java',
            collapsible: true,
            items: [
              {
                label: 'Specify a Query',
                contentSite: 'java',
                url: '/docs/drivers/java/sync/:version/crud/query-documents/specify-query',
              },
              {
                label: 'Find Documents',
                contentSite: 'java',
                url: '/docs/drivers/java/sync/:version/crud/query-documents/find',
              },
              {
                label: 'Count Documents',
                contentSite: 'java',
                url: '/docs/drivers/java/sync/:version/crud/query-documents/count',
              },
              {
                label: 'Retrieve Distinct Values of a Field',
                contentSite: 'java',
                url: '/docs/drivers/java/sync/:version/crud/query-documents/distinct',
              },
              {
                label: 'Specify Which Fields to Return',
                contentSite: 'java',
                url: '/docs/drivers/java/sync/:version/crud/query-documents/project',
              },
              {
                label: 'Limit Returned Results',
                contentSite: 'java',
                url: '/docs/drivers/java/sync/:version/crud/query-documents/limit',
              },
              {
                label: 'Sort Results',
                contentSite: 'java',
                url: '/docs/drivers/java/sync/:version/crud/query-documents/sort',
              },
              {
                label: 'Skip Returned Results',
                contentSite: 'java',
                url: '/docs/drivers/java/sync/:version/crud/query-documents/skip',
              },
              {
                label: 'Search Geospatially',
                contentSite: 'java',
                url: '/docs/drivers/java/sync/:version/crud/query-documents/geo',
              },
              {
                label: 'Query Text',
                contentSite: 'java',
                url: '/docs/drivers/java/sync/:version/crud/query-documents/text',
              },
              {
                label: 'Access Data from a Cursor',
                contentSite: 'java',
                url: '/docs/drivers/java/sync/:version/crud/query-documents/cursor',
              },
            ],
          },
          {
            label: 'Update Documents',
            contentSite: 'java',
            url: '/docs/drivers/java/sync/:version/crud/update-documents',
            collapsible: true,
            items: [
              {
                label: 'Update Array Elements',
                contentSite: 'java',
                url: '/docs/drivers/java/sync/:version/crud/update-documents/embedded-arrays',
              },
              {
                label: 'Upsert',
                contentSite: 'java',
                url: '/docs/drivers/java/sync/:version/crud/update-documents/upsert',
              },
            ],
          },
          {
            label: 'Replace Documents',
            contentSite: 'java',
            url: '/docs/drivers/java/sync/:version/crud/replace-documents',
          },
          {
            label: 'Delete Documents',
            contentSite: 'java',
            url: '/docs/drivers/java/sync/:version/crud/delete',
          },
          {
            label: 'Bulk Operations',
            contentSite: 'java',
            url: '/docs/drivers/java/sync/:version/crud/bulk',
          },
          {
            label: 'Compound Operations',
            contentSite: 'java',
            url: '/docs/drivers/java/sync/:version/crud/compound-operations',
          },
          {
            label: 'Transactions',
            contentSite: 'java',
            url: '/docs/drivers/java/sync/:version/crud/transactions',
          },
          {
            label: 'Operations on Replica Sets',
            contentSite: 'java',
            url: '/docs/drivers/java/sync/:version/crud/read-write-config',
          },
          {
            label: 'Collations',
            contentSite: 'java',
            url: '/docs/drivers/java/sync/:version/crud/collations',
          },
          {
            label: 'Large File Storage with GridFS',
            contentSite: 'java',
            url: '/docs/drivers/java/sync/:version/crud/gridfs',
          },
          {
            label: 'Configure Custom CRUD Settings',
            contentSite: 'java',
            url: '/docs/drivers/java/sync/:version/crud/crud-settings',
          },
        ],
      },
      {
        label: 'Aggregation',
        contentSite: 'java',
        url: '/docs/drivers/java/sync/:version/aggregation',
        collapsible: true,
        items: [
          {
            label: 'Aggregation Expressions',
            contentSite: 'java',
            url: '/docs/drivers/java/sync/:version/aggregation/aggregation-expression-operations',
          },
          {
            label: 'Aggregation Examples',
            contentSite: 'java',
            url: '/docs/drivers/java/sync/:version/aggregation/aggregation-examples',
          },
        ],
      },
      {
        label: 'Builders',
        contentSite: 'java',
        url: '/docs/drivers/java/sync/:version/builders',
        collapsible: true,
        items: [
          {
            label: 'Aggregation',
            contentSite: 'java',
            url: '/docs/drivers/java/sync/:version/builders/aggregates',
          },
          {
            label: 'Filters',
            contentSite: 'java',
            url: '/docs/drivers/java/sync/:version/builders/filters',
          },
          {
            label: 'Indexes',
            contentSite: 'java',
            url: '/docs/drivers/java/sync/:version/builders/indexes',
          },
          {
            label: 'Projection',
            contentSite: 'java',
            url: '/docs/drivers/java/sync/:version/builders/projections',
          },
          {
            label: 'Sort',
            contentSite: 'java',
            url: '/docs/drivers/java/sync/:version/builders/sort',
          },
          {
            label: 'Update',
            contentSite: 'java',
            url: '/docs/drivers/java/sync/:version/builders/updates',
          },
        ],
      },
      {
        label: 'Data Formats',
        contentSite: 'java',
        collapsible: true,
        items: [
          {
            label: 'BSON',
            contentSite: 'java',
            url: '/docs/drivers/java/sync/:version/data-formats/document-data-format-bson',
          },
          {
            label: 'Extended JSON',
            contentSite: 'java',
            url: '/docs/drivers/java/sync/:version/data-formats/document-data-format-extended-json',
          },
          {
            label: 'Documents',
            contentSite: 'java',
            url: '/docs/drivers/java/sync/:version/data-formats/documents',
          },
          {
            label: 'POJOs',
            contentSite: 'java',
            url: '/docs/drivers/java/sync/:version/data-formats/document-data-format-pojo',
          },
          {
            label: 'POJO Customization',
            contentSite: 'java',
            url: '/docs/drivers/java/sync/:version/data-formats/pojo-customization',
          },
          {
            label: 'Records',
            contentSite: 'java',
            url: '/docs/drivers/java/sync/:version/data-formats/document-data-format-record',
          },
          {
            label: 'Codecs',
            contentSite: 'java',
            url: '/docs/drivers/java/sync/:version/data-formats/codecs',
          },
          {
            label: 'Time Series Collections',
            contentSite: 'java',
            url: '/docs/drivers/java/sync/:version/data-formats/time-series',
          },
        ],
      },
      {
        label: 'Indexes',
        contentSite: 'java',
        url: '/docs/drivers/java/sync/:version/indexes',
      },
      {
        label: 'Run a Command',
        contentSite: 'java',
        url: '/docs/drivers/java/sync/:version/command',
      },
      {
        label: 'MongoDB Search',
        contentSite: 'java',
        url: '/docs/drivers/java/sync/:version/atlas-search',
      },
      {
        label: 'MongoDB Vector Search',
        contentSite: 'java',
        url: '/docs/drivers/java/sync/:version/atlas-vector-search',
      },
      {
        label: 'Logging and Monitoring',
        contentSite: 'java',
        collapsible: true,
        items: [
          {
            label: 'Logging',
            contentSite: 'java',
            url: '/docs/drivers/java/sync/:version/logging-monitoring/logging',
          },
          {
            label: 'Monitoring',
            contentSite: 'java',
            url: '/docs/drivers/java/sync/:version/logging-monitoring/monitoring',
          },
          {
            label: 'Change Streams',
            contentSite: 'java',
            url: '/docs/drivers/java/sync/:version/logging-monitoring/change-streams',
          },
        ],
      },
      {
        label: 'Security',
        contentSite: 'java',
        collapsible: true,
        items: [
          {
            label: 'Authentication',
            contentSite: 'java',
            url: '/docs/drivers/java/sync/:version/security/auth',
            collapsible: true,
            items: [
              {
                label: 'SCRAM',
                contentSite: 'java',
                url: '/docs/drivers/java/sync/:version/security/auth/scram',
              },
              {
                label: 'X.509',
                contentSite: 'java',
                url: '/docs/drivers/java/sync/:version/security/auth/x509',
              },
              {
                label: 'AWS IAM',
                contentSite: 'java',
                url: '/docs/drivers/java/sync/:version/security/auth/aws-iam',
              },
              {
                label: 'OIDC',
                contentSite: 'java',
                url: '/docs/drivers/java/sync/:version/security/auth/oidc',
              },
              {
                label: 'LDAP (PLAIN)',
                contentSite: 'java',
                url: '/docs/drivers/java/sync/:version/security/auth/ldap',
              },
              {
                label: 'Kerberos (GSSAPI)',
                contentSite: 'java',
                url: '/docs/drivers/java/sync/:version/security/auth/kerberos',
              },
            ],
          },
          {
            label: 'In-Use Encryption',
            contentSite: 'java',
            url: '/docs/drivers/java/sync/:version/security/encrypt-fields',
          },
          {
            label: 'TLS/SSL',
            contentSite: 'java',
            url: '/docs/drivers/java/sync/:version/security/tls',
          },
          {
            label: 'SOCKS5 Proxy',
            contentSite: 'java',
            url: '/docs/drivers/java/sync/:version/security/socks',
          },
          {
            label: 'Validate Driver Artifact Signatures',
            contentSite: 'java',
            url: '/docs/drivers/java/sync/:version/security/validate-signatures',
          },
        ],
      },
      {
        label: 'Third-Party Integrations',
        contentSite: 'java',
        collapsible: true,
        url: '/docs/drivers/java/sync/:version/integrations',
        items: [
          {
            label: 'Spring Data MongoDB',
            contentSite: 'java',
            url: '/docs/drivers/java/sync/:version/integrations/spring-data-integration',
          },
          {
            label: 'MongoDB Queries with Spring Data',
            contentSite: 'java',
            url: '/docs/drivers/java/sync/:version/integrations/spring-queries',
          },
          {
            label: 'Spring Session MongoDB',
            contentSite: 'java',
            url: '/docs/drivers/java/sync/:version/integrations/spring-session',
            collapsible: true,
            items: [
              {
                label: 'Get Started with Spring Session MongoDB',
                contentSite: 'java',
                url: '/docs/drivers/java/sync/:version/integrations/spring-session/spring-session-get-started',
              },
            ],
          },
          {
            label: `Sharding in Spring Boot with Spring Data`,
            contentSite: 'java',
            url: '/docs/drivers/java/sync/:version/integrations/spring-sharding',
          },
          {
            label: 'Spring Data CSFLE',
            contentSite: 'java',
            url: '/docs/drivers/java/sync/:version/integrations/spring-csfle',
          },
          {
            label: 'Build a Microservices App With MongoDB and Spring',
            contentSite: 'java',
            url: '/docs/drivers/java/sync/:version/integrations/spring-microservice',
          },
          {
            label: 'Quarkus with Panache and MongoDB',
            contentSite: 'java',
            url: '/docs/drivers/java/sync/:version/integrations/panache',
          },
          {
            label: 'Paginate Data with Java and Quarkus',
            contentSite: 'java',
            url: '/docs/drivers/java/sync/:version/integrations/quarkus-pagination',
          },
          {
            label: 'Testcontainers Integration Testing',
            contentSite: 'java',
            url: '/docs/drivers/java/sync/:version/integrations/testcontainers',
          },
        ],
      },
      {
        label: 'Reference',
        contentSite: 'java',
        collapsible: true,
        items: [
          {
            label: 'Release Notes',
            contentSite: 'java',
            url: '/docs/drivers/java/sync/:version/reference/release-notes',
          },

          {
            label: 'Upgrade',
            contentSite: 'java',
            url: '/docs/drivers/java/sync/:version/reference/upgrade',
          },
          {
            label: 'Migrate from the Legacy API',
            contentSite: 'java',
            url: '/docs/drivers/java/sync/:version/reference/legacy',
          },
        ],
      },
      {
        label: 'Compatibility',
        contentSite: 'drivers',
        url: '/docs/drivers/compatibility/?driver-language=java&java-driver-framework=java-sync',
      },
      {
        label: 'API Documentation',
        contentSite: 'java',
        url: '/docs/drivers/java/sync/:version/api-documentation',
        collapsible: true,
        items: [
          {
            label: ' BSON',
            isExternal: true,
            url: 'https://mongodb.github.io/mongo-java-driver/5.6/apidocs/bson/index.html',
          },
          {
            label: ' BSON Record Codec',
            isExternal: true,
            url: 'https://mongodb.github.io/mongo-java-driver/5.6/apidocs/bson-record-codec/index.html',
          },
          {
            label: ' Core',
            isExternal: true,
            url: 'https://mongodb.github.io/mongo-java-driver/5.6/apidocs/driver-core/index.html',
          },
          {
            label: ' Java Driver (modern API)',
            isExternal: true,
            url: 'https://mongodb.github.io/mongo-java-driver/5.6/apidocs/driver-sync/index.html',
          },
          {
            label: ' Java Driver (legacy API)',
            isExternal: true,
            url: 'https://mongodb.github.io/mongo-java-driver/5.6/apidocs/driver-legacy/index.html',
          },
        ],
      },
      {
        label: 'Issues & Help',
        contentSite: 'java',
        url: '/docs/drivers/java/sync/:version/issues-and-help',
      },
    ],
  },
];

export default tocData;
