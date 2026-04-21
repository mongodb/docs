import type { L1TocItem } from '../types';

export const toc: L1TocItem[] = [
  {
    label: 'Kafka Connector',
    contentSite: 'kafka-connector',
    url: '/docs/kafka-connector/:version/',
    items: [
      {
        label: 'Kafka Connector',
        contentSite: 'kafka-connector',
        group: true,
        versionDropdown: true,
        items: [
          {
            label: 'Overview',
            contentSite: 'kafka-connector',
            url: '/docs/kafka-connector/:version/',
          },
          {
            label: 'What\'s New',
            contentSite: 'kafka-connector',
            url: '/docs/kafka-connector/:version/whats-new',
          },
          {
            label: 'Quick Start',
            contentSite: 'kafka-connector',
            url: '/docs/kafka-connector/:version/quick-start',
          },
          {
            label: 'Introduction',
            contentSite: 'kafka-connector',
            collapsible: true,
            url: '/docs/kafka-connector/:version/introduction',
            items: [
              {
                label: 'Kafka and Kafka Connect',
                contentSite: 'kafka-connector',
                url: '/docs/kafka-connector/:version/introduction/kafka-connect',
              },
              {
                label: 'Install the Connector',
                contentSite: 'kafka-connector',
                url: '/docs/kafka-connector/:version/introduction/install',
              },
              {
                label: 'Connect to MongoDB',
                contentSite: 'kafka-connector',
                url: '/docs/kafka-connector/:version/introduction/connect',
              },
              {
                label: 'Data Formats',
                contentSite: 'kafka-connector',
                url: '/docs/kafka-connector/:version/introduction/data-formats',
              },
              {
                label: 'Converters',
                contentSite: 'kafka-connector',
                url: '/docs/kafka-connector/:version/introduction/converters',
              },
            ],
          },
          {
            label: 'Tutorials',
            contentSite: 'kafka-connector',
            collapsible: true,
            url: '/docs/kafka-connector/:version/tutorials',
            items: [
              {
                label: 'Tutorial Setup',
                contentSite: 'kafka-connector',
                url: '/docs/kafka-connector/:version/tutorials/tutorial-setup',
              },
              {
                label: 'Explore MongoDB Change Streams',
                contentSite: 'kafka-connector',
                url: '/docs/kafka-connector/:version/tutorials/explore-change-streams',
              },
              {
                label: 'Getting Started with the MongoDB Kafka Source Connector',
                contentSite: 'kafka-connector',
                url: '/docs/kafka-connector/:version/tutorials/source-connector',
              },
              {
                label: 'Getting Started with the MongoDB Kafka Sink Connector',
                contentSite: 'kafka-connector',
                url: '/docs/kafka-connector/:version/tutorials/sink-connector',
              },
              {
                label: 'Replicate Data with a Change Data Capture Handler',
                contentSite: 'kafka-connector',
                url: '/docs/kafka-connector/:version/tutorials/replicate-with-cdc',
              },
              {
                label: 'Migrate an Existing Collection to a Time Series Collection',
                contentSite: 'kafka-connector',
                url: '/docs/kafka-connector/:version/tutorials/migrate-time-series',
              },
            ],
          },
          {
            label: 'Sink Connector',
            contentSite: 'kafka-connector',
            collapsible: true,
            url: '/docs/kafka-connector/:version/sink-connector',
            items: [
              {
                label: 'Configuration Properties',
                contentSite: 'kafka-connector',
                collapsible: true,
                url: '/docs/kafka-connector/:version/sink-connector/configuration-properties',
                items: [
                  {
                    label: 'MongoDB Connection',
                    contentSite: 'kafka-connector',
                    url: '/docs/kafka-connector/:version/sink-connector/configuration-properties/mongodb-connection',
                  },
                  {
                    label: 'MongoDB Namespace',
                    contentSite: 'kafka-connector',
                    url: '/docs/kafka-connector/:version/sink-connector/configuration-properties/mongodb-namespace',
                  },
                  {
                    label: 'Kafka Topics',
                    contentSite: 'kafka-connector',
                    url: '/docs/kafka-connector/:version/sink-connector/configuration-properties/kafka-topic',
                  },
                  {
                    label: 'Connector Message Processing',
                    contentSite: 'kafka-connector',
                    url: '/docs/kafka-connector/:version/sink-connector/configuration-properties/connector-message',
                  },
                  {
                    label: 'Connector Error Handling',
                    contentSite: 'kafka-connector',
                    url: '/docs/kafka-connector/:version/sink-connector/configuration-properties/error-handling',
                  },
                  {
                    label: 'Post-processors',
                    contentSite: 'kafka-connector',
                    url: '/docs/kafka-connector/:version/sink-connector/configuration-properties/post-processors',
                  },
                  {
                    label: 'Id Strategy',
                    contentSite: 'kafka-connector',
                    url: '/docs/kafka-connector/:version/sink-connector/configuration-properties/id-strategy',
                  },
                  {
                    label: 'Write Model Strategy',
                    contentSite: 'kafka-connector',
                    url: '/docs/kafka-connector/:version/sink-connector/configuration-properties/write-strategies',
                  },
                  {
                    label: 'Topic Override',
                    contentSite: 'kafka-connector',
                    url: '/docs/kafka-connector/:version/sink-connector/configuration-properties/topic-override',
                  },
                  {
                    label: 'Change Data Capture',
                    contentSite: 'kafka-connector',
                    url: '/docs/kafka-connector/:version/sink-connector/configuration-properties/cdc',
                  },
                  {
                    label: 'Time Series',
                    contentSite: 'kafka-connector',
                    url: '/docs/kafka-connector/:version/sink-connector/configuration-properties/time-series',
                  },
                  {
                    label: 'All Properties',
                    contentSite: 'kafka-connector',
                    url: '/docs/kafka-connector/:version/sink-connector/configuration-properties/all-properties',
                  },
                ],
              },
              {
                label: 'Fundamentals',
                contentSite: 'kafka-connector',
                collapsible: true,
                url: '/docs/kafka-connector/:version/sink-connector/fundamentals',
                items: [
                  {
                    label: 'Write Model Strategies',
                    contentSite: 'kafka-connector',
                    url: '/docs/kafka-connector/:version/sink-connector/fundamentals/write-strategies',
                  },
                  {
                    label: 'Post-processors',
                    contentSite: 'kafka-connector',
                    url: '/docs/kafka-connector/:version/sink-connector/fundamentals/post-processors',
                  },
                  {
                    label: 'Error Handling',
                    contentSite: 'kafka-connector',
                    url: '/docs/kafka-connector/:version/sink-connector/fundamentals/error-handling-strategies',
                  },
                  {
                    label: 'Change Data Capture Handlers',
                    contentSite: 'kafka-connector',
                    url: '/docs/kafka-connector/:version/sink-connector/fundamentals/change-data-capture',
                  },
                ],
              },
            ],
          },
          {
            label: 'Source Connector',
            contentSite: 'kafka-connector',
            collapsible: true,
            url: '/docs/kafka-connector/:version/source-connector',
            items: [
              {
                label: 'Configuration Properties',
                contentSite: 'kafka-connector',
                collapsible: true,
                url: '/docs/kafka-connector/:version/source-connector/configuration-properties',
                items: [
                  {
                    label: 'MongoDB Connection',
                    contentSite: 'kafka-connector',
                    url: '/docs/kafka-connector/:version/source-connector/configuration-properties/mongodb-connection',
                  },
                  {
                    label: 'Kafka Topics',
                    contentSite: 'kafka-connector',
                    url: '/docs/kafka-connector/:version/source-connector/configuration-properties/kafka-topic',
                  },
                  {
                    label: 'Change Stream',
                    contentSite: 'kafka-connector',
                    url: '/docs/kafka-connector/:version/source-connector/configuration-properties/change-stream',
                  },
                  {
                    label: 'Output Format',
                    contentSite: 'kafka-connector',
                    url: '/docs/kafka-connector/:version/source-connector/configuration-properties/output-format',
                  },
                  {
                    label: 'Startup',
                    contentSite: 'kafka-connector',
                    url: '/docs/kafka-connector/:version/source-connector/configuration-properties/startup',
                  },
                  {
                    label: 'Error Handling and Resuming from Interruption',
                    contentSite: 'kafka-connector',
                    url: '/docs/kafka-connector/:version/source-connector/configuration-properties/error-handling',
                  },
                  {
                    label: 'All Properties',
                    contentSite: 'kafka-connector',
                    url: '/docs/kafka-connector/:version/source-connector/configuration-properties/all-properties',
                  },
                ],
              },
              {
                label: 'Usage Examples',
                contentSite: 'kafka-connector',
                collapsible: true,
                url: '/docs/kafka-connector/:version/source-connector/usage-examples',
                items: [
                  {
                    label: 'Custom Pipeline',
                    contentSite: 'kafka-connector',
                    url: '/docs/kafka-connector/:version/source-connector/usage-examples/custom-pipeline',
                  },
                  {
                    label: 'Multiple Sources',
                    contentSite: 'kafka-connector',
                    url: '/docs/kafka-connector/:version/source-connector/usage-examples/multiple-sources',
                  },
                  {
                    label: 'Topic Naming',
                    contentSite: 'kafka-connector',
                    url: '/docs/kafka-connector/:version/source-connector/usage-examples/topic-naming',
                  },
                  {
                    label: 'Copy Existing Data',
                    contentSite: 'kafka-connector',
                    url: '/docs/kafka-connector/:version/source-connector/usage-examples/copy-existing-data',
                  },
                  {
                    label: 'Specify a Schema',
                    contentSite: 'kafka-connector',
                    url: '/docs/kafka-connector/:version/source-connector/usage-examples/schema',
                  },
                ],
              },
              {
                label: 'Fundamentals',
                contentSite: 'kafka-connector',
                collapsible: true,
                url: '/docs/kafka-connector/:version/source-connector/fundamentals',
                items: [
                  {
                    label: 'Change Streams',
                    contentSite: 'kafka-connector',
                    url: '/docs/kafka-connector/:version/source-connector/fundamentals/change-streams',
                  },
                  {
                    label: 'Apply Schemas',
                    contentSite: 'kafka-connector',
                    url: '/docs/kafka-connector/:version/source-connector/fundamentals/specify-schema',
                  },
                  {
                    label: 'JSON Formatters',
                    contentSite: 'kafka-connector',
                    url: '/docs/kafka-connector/:version/source-connector/fundamentals/json-formatters',
                  },
                ],
              },
            ],
          },
          {
            label: 'Security and Authentication',
            contentSite: 'kafka-connector',
            collapsible: true,
            url: '/docs/kafka-connector/:version/security-and-authentication',
            items: [
              {
                label: 'SSL/TLS and X.509 Certificates',
                contentSite: 'kafka-connector',
                url: '/docs/kafka-connector/:version/security-and-authentication/tls-and-x509',
              },
              {
                label: 'MongoDB AWS-based Authentication',
                contentSite: 'kafka-connector',
                url: '/docs/kafka-connector/:version/security-and-authentication/mongodb-aws-auth',
              },
              {
                label: 'Custom Authentication Provider',
                contentSite: 'kafka-connector',
                url: '/docs/kafka-connector/:version/security-and-authentication/custom-auth',
              },
            ],
          },
          {
            label: 'Monitoring',
            contentSite: 'kafka-connector',
            url: '/docs/kafka-connector/:version/monitoring',
          },
          {
            label: 'Migrate from the Community Connector',
            contentSite: 'kafka-connector',
            url: '/docs/kafka-connector/:version/migrate-from-kafka-connect-mongodb',
          },
          {
            label: 'Compare Kafka Connector and Atlas Stream Processing',
            contentSite: 'kafka-connector',
            url: '/docs/kafka-connector/:version/kafka-connector-atlas-stream-processing-comparison',
            versions: {
              includes: ['upcoming', 'current', 'v2.0', 'v1.16'],
            },
          },
          {
            label: 'Troubleshooting',
            contentSite: 'kafka-connector',
            collapsible: true,
            url: '/docs/kafka-connector/:version/troubleshooting',
            items: [
              {
                label: 'Invalid Resume Token',
                contentSite: 'kafka-connector',
                url: '/docs/kafka-connector/:version/troubleshooting/recover-from-invalid-resume-token',
              },
              {
                label: 'Reset Connector Offsets',
                contentSite: 'kafka-connector',
                url: '/docs/kafka-connector/:version/troubleshooting/reset-connector-offset',
              },
            ],
          },
          {
            label: 'How to Contribute',
            contentSite: 'kafka-connector',
            url: '/docs/kafka-connector/:version/contribute',
          },
          {
            label: 'Issues & Help',
            contentSite: 'kafka-connector',
            url: '/docs/kafka-connector/:version/issues-and-help',
          },
          {
            label: 'Compatibility',
            contentSite: 'kafka-connector',
            url: '/docs/kafka-connector/:version/compatibility',
          },
        ],
      },
    ],
  },
];
