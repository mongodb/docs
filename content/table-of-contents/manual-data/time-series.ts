import type { TocItem } from '../types';

const tocData: TocItem[] = [
  {
    label: 'Quick Start',
    contentSite: 'docs',
    url: '/docs/:version/core/timeseries/timeseries-quick-start',
  },
  {
    label: 'Time Series Data',
    contentSite: 'docs',
    url: '/docs/:version/core/timeseries/timeseries-bucketing',
  },
  {
    label: 'Considerations',
    contentSite: 'docs',
    url: '/docs/:version/core/timeseries/timeseries-considerations',
  },
  {
    label: 'Create & Configure',
    contentSite: 'docs',
    url: '/docs/:version/core/timeseries/timeseries-create-configure',
    collapsible: true,
    items: [
      {
        label: 'Create & Query',
        contentSite: 'docs',
        url: '/docs/:version/core/timeseries/timeseries-procedures',
      },
      {
        label: 'Set Granularity',
        contentSite: 'docs',
        url: '/docs/:version/core/timeseries/timeseries-granularity',
      },
      {
        label: 'Migrate Data',
        contentSite: 'docs',
        url: '/docs/:version/core/timeseries/timeseries-migrate-data-into-timeseries-collection',
        collapsible: true,
        items: [
          {
            label: 'Use Aggregation',
            contentSite: 'docs',
            url: '/docs/:version/core/timeseries/timeseries-migrate-with-aggregation',
          },
          {
            label: 'Use Tools',
            contentSite: 'docs',
            url: '/docs/:version/core/timeseries/timeseries-migrate-with-tools',
          },
        ],
      },
      {
        label: 'Use Automatic Removal',
        contentSite: 'docs',
        url: '/docs/:version/core/timeseries/timeseries-automatic-removal',
      },
      {
        label: 'Compression',
        contentSite: 'docs',
        url: '/docs/:version/core/timeseries/timeseries-compression',
      },
      {
        label: 'Shard Collection',
        contentSite: 'docs',
        url: '/docs/:version/core/timeseries/timeseries-shard-collection',
      },
    ],
  },
  {
    label: 'Query',
    contentSite: 'docs',
    url: '/docs/:version/core/timeseries/timeseries-querying',
    collapsible: true,
    items: [
      {
        label: 'Aggregations & Operators',
        contentSite: 'docs',
        url: '/docs/:version/core/timeseries/timeseries-aggregations-operators',
      },
      {
        label: 'List Time Series Collections',
        contentSite: 'docs',
        url: '/docs/:version/core/timeseries/timeseries-check-type',
      },
      {
        label: 'Build Materialized Views',
        contentSite: 'docs',
        url: '/docs/:version/core/timeseries/timeseries-build-materialized-views',
      },
    ],
  },
  {
    label: 'Indexes',
    contentSite: 'docs',
    url: '/docs/:version/core/timeseries/timeseries-index',
    collapsible: true,
    items: [
      {
        label: 'Add Secondary Indexes',
        contentSite: 'docs',
        url: '/docs/:version/core/timeseries/timeseries-secondary-index',
      },
    ],
  },
  {
    label: 'Best Practices',
    contentSite: 'docs',
    url: '/docs/:version/core/timeseries/timeseries-best-practices',
  },
  {
    label: 'Limitations',
    contentSite: 'docs',
    url: '/docs/:version/core/timeseries/timeseries-limitations',
  },
];

export default tocData;
