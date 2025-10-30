import type { TocItem } from '../types';

const tocData: TocItem[] = [
  {
    label: 'Spark Connector',
    contentSite: 'spark-connector',
    group: true,
    versionDropdown: true,
    items: [
      {
        label: 'Overview',
        contentSite: 'spark-connector',
        url: '/docs/spark-connector/:version',
      },
      {
        label: 'Get Started',
        contentSite: 'spark-connector',
        url: '/docs/spark-connector/:version/getting-started',
      },
      {
        label: 'Configure Spark',
        contentSite: 'spark-connector',
        url: '/docs/spark-connector/:version/configuration',
      },
      {
        label: 'Configure TLS/SSL',
        contentSite: 'spark-connector',
        url: '/docs/spark-connector/:version/tls',
      },
      {
        label: 'Batch Mode',
        contentSite: 'spark-connector',
        url: '/docs/spark-connector/:version/batch-mode',
        collapsible: true,
        items: [
          {
            label: 'Read',
            contentSite: 'spark-connector',
            url: '/docs/spark-connector/:version/batch-mode/batch-read',
            collapsible: true,
            items: [
              {
                label: 'Configuration',
                contentSite: 'spark-connector',
                url: '/docs/spark-connector/:version/batch-mode/batch-read-config',
              },
            ],
          },
          {
            label: 'Write',
            contentSite: 'spark-connector',
            url: '/docs/spark-connector/:version/batch-mode/batch-write',
            collapsible: true,
            items: [
              {
                label: 'Configuration',
                contentSite: 'spark-connector',
                url: '/docs/spark-connector/:version/batch-mode/batch-write-config',
              },
            ],
          },
        ],
      },
      {
        label: 'Streaming Mode',
        contentSite: 'spark-connector',
        url: '/docs/spark-connector/:version/streaming-mode',
        collapsible: true,
        items: [
          {
            label: 'Read',
            contentSite: 'spark-connector',
            url: '/docs/spark-connector/:version/streaming-mode/streaming-read',
            collapsible: true,
            items: [
              {
                label: 'Configuration',
                contentSite: 'spark-connector',
                url: '/docs/spark-connector/:version/streaming-mode/streaming-read-config',
              },
            ],
          },
          {
            label: 'Write',
            contentSite: 'spark-connector',
            url: '/docs/spark-connector/:version/streaming-mode/streaming-write',
            collapsible: true,
            items: [
              {
                label: 'Configuration',
                contentSite: 'spark-connector',
                url: '/docs/spark-connector/:version/streaming-mode/streaming-write-config',
              },
            ],
          },
        ],
      },
      {
        label: 'FAQ',
        contentSite: 'spark-connector',
        url: '/docs/spark-connector/:version/faq',
      },
      {
        label: 'Release Notes',
        contentSite: 'spark-connector',
        url: '/docs/spark-connector/:version/release-notes',
      },
      {
        label: 'API Documentation',
        contentSite: 'spark-connector',
        collapsible: true,
        items: [
          {
            label: 'Spark Connector for Scala 2.13',
            isExternal: true,
            url: 'https://www.javadoc.io/doc/org.mongodb.spark/mongo-spark-connector_2.13/10.5.0/index.html',
          },
          {
            label: 'Spark Connector for Scala 2.12',
            isExternal: true,
            url: 'https://www.javadoc.io/doc/org.mongodb.spark/mongo-spark-connector_2.12/10.5.0/index.html',
          },
        ],
      },
    ],
  },
];

export default tocData;
