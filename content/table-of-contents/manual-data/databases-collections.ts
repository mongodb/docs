import type { TocItem } from '../types';

const tocData: TocItem[] = [
  {
    label: 'Views',
    contentSite: 'docs',
    url: '/docs/:version/core/views',
    collapsible: true,
    items: [
      {
        label: 'Create & Query',
        contentSite: 'docs',
        url: '/docs/:version/core/views/create-view',
      },
      {
        label: 'Join Collections',
        contentSite: 'docs',
        url: '/docs/:version/core/views/join-collections-with-view',
      },
      {
        label: 'Use Default Collation',
        contentSite: 'docs',
        url: '/docs/:version/core/views/specify-collation',
      },
      {
        label: 'Modify or Remove',
        contentSite: 'docs',
        url: '/docs/:version/core/views/update-view',
      },
      {
        label: 'Supported Operations',
        contentSite: 'docs',
        url: '/docs/:version/core/views/supported-operations',
      },
    ],
  },
  {
    label: 'On-Demand Materialized Views',
    contentSite: 'docs',
    url: '/docs/:version/core/materialized-views',
  },
  {
    label: 'Capped Collections',
    contentSite: 'docs',
    url: '/docs/:version/core/capped-collections',
    collapsible: true,
    items: [
      {
        label: 'Create',
        contentSite: 'docs',
        url: '/docs/:version/core/capped-collections/create-capped-collection',
      },
      {
        label: 'Query',
        contentSite: 'docs',
        url: '/docs/:version/core/capped-collections/query-capped-collection',
      },
      {
        label: 'Verify',
        contentSite: 'docs',
        url: '/docs/:version/core/capped-collections/check-if-collection-is-capped',
      },
      {
        label: 'Convert',
        contentSite: 'docs',
        url: '/docs/:version/core/capped-collections/convert-collection-to-capped',
      },
      {
        label: 'Change Size',
        contentSite: 'docs',
        url: '/docs/:version/core/capped-collections/change-size-capped-collection',
      },
      {
        label: 'Change Limits',
        contentSite: 'docs',
        url: '/docs/:version/core/capped-collections/change-max-docs-capped-collection',
      },
    ],
  },
  {
    label: 'Clustered Collections',
    contentSite: 'docs',
    url: '/docs/:version/core/clustered-collections',
  },
];

export default tocData;
