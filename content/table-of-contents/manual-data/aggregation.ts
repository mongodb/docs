import type { TocItem } from '../types';

const tocData: TocItem[] = [
  {
    label: 'Aggregation Pipeline',
    contentSite: 'docs',
    url: '/docs/:version/core/aggregation-pipeline',
    collapsible: true,
    items: [
      {
        label: 'Field Paths',
        contentSite: 'docs',
        url: '/docs/:version/core/field-paths',
      },
      {
        label: 'Optimization',
        contentSite: 'docs',
        url: '/docs/:version/core/aggregation-pipeline-optimization',
      },
      {
        label: 'Limits',
        contentSite: 'docs',
        url: '/docs/:version/core/aggregation-pipeline-limits',
      },
      {
        label: 'Sharded Collections',
        contentSite: 'docs',
        url: '/docs/:version/core/aggregation-pipeline-sharded-collections',
      },
      {
        label: 'Pipeline Tutorials',
        contentSite: 'docs',
        url: '/docs/:version/tutorial/aggregation-complete-examples',
        collapsible: true,
        items: [
          {
            label: 'Filter and Subset',
            contentSite: 'docs',
            url: '/docs/:version/tutorial/aggregation-examples/filtered-subset',
          },
          {
            label: 'Group and Total',
            contentSite: 'docs',
            url: '/docs/:version/tutorial/aggregation-examples/group-and-total',
          },
          {
            label: 'Unwind Arrays',
            contentSite: 'docs',
            url: '/docs/:version/tutorial/aggregation-examples/unpack-arrays',
          },
          {
            label: 'One-to-One Join',
            contentSite: 'docs',
            url: '/docs/:version/tutorial/aggregation-examples/one-to-one-join',
          },
          {
            label: 'Multi-Field Join',
            contentSite: 'docs',
            url: '/docs/:version/tutorial/aggregation-examples/multi-field-join',
          },
        ],
      },
    ],
  },
  {
    label: 'Reference',
    contentSite: 'docs',
    url: '/docs/:version/reference/aggregation',
    collapsible: true,
    items: [
      {
        label: 'Commands',
        contentSite: 'docs',
        url: '/docs/:version/reference/operator/aggregation/interface',
      },
      {
        label: 'Commands Comparison',
        contentSite: 'docs',
        url: '/docs/:version/reference/aggregation-commands-comparison',
      },
      {
        label: 'Variables',
        contentSite: 'docs',
        url: '/docs/:version/reference/aggregation-variables',
      },
      {
        label: 'SQL to Aggregation',
        contentSite: 'docs',
        url: '/docs/:version/reference/sql-aggregation-comparison',
      },
      {
        label: 'Practical MongoDB Aggregations (e-book)',
        isExternal: true,
        url: 'https://www.practical-mongodb-aggregations.com',
      },
    ],
  },
  {
    label: 'Map-Reduce',
    contentSite: 'docs',
    url: '/docs/:version/core/map-reduce',
    collapsible: true,
    items: [
      {
        label: 'Sharded Collections',
        contentSite: 'docs',
        url: '/docs/:version/core/map-reduce-sharded-collections',
      },
      {
        label: 'Concurrency',
        contentSite: 'docs',
        url: '/docs/:version/core/map-reduce-concurrency',
      },
      {
        label: 'Examples',
        contentSite: 'docs',
        url: '/docs/:version/tutorial/map-reduce-examples',
      },
      {
        label: 'Perform with Increments',
        contentSite: 'docs',
        url: '/docs/:version/tutorial/perform-incremental-map-reduce',
      },
      {
        label: 'Troubleshoot Map',
        contentSite: 'docs',
        url: '/docs/:version/tutorial/troubleshoot-map-function',
      },
      {
        label: 'Troubleshoot Reduce',
        contentSite: 'docs',
        url: '/docs/:version/tutorial/troubleshoot-reduce-function',
      },
      {
        label: 'Aggregation Pipeline',
        contentSite: 'docs',
        url: '/docs/:version/reference/map-reduce-to-aggregation-pipeline',
      },
    ],
  },
];

export default tocData;
