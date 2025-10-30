import type { TocItem } from '../types';

const tocData: TocItem[] = [
  {
    label: 'Create',
    contentSite: 'docs',
    url: '/docs/:version/core/indexes/create-index',
    collapsible: true,
    items: [
      {
        label: 'Specify a Name',
        contentSite: 'docs',
        url: '/docs/:version/core/indexes/create-index/specify-index-name',
      },
    ],
  },
  {
    label: 'Drop',
    contentSite: 'docs',
    url: '/docs/:version/core/indexes/drop-index',
  },
  {
    label: 'Types',
    contentSite: 'docs',
    url: '/docs/:version/core/indexes/index-types',
    collapsible: true,
    items: [
      {
        label: 'Single Field',
        contentSite: 'docs',
        url: '/docs/:version/core/indexes/index-types/index-single',
        collapsible: true,
        items: [
          {
            label: 'Create',
            contentSite: 'docs',
            url: '/docs/:version/core/indexes/index-types/index-single/create-single-field-index',
          },
          {
            label: 'Embedded Documents',
            contentSite: 'docs',
            url: '/docs/:version/core/indexes/index-types/index-single/create-embedded-object-index',
          },
        ],
      },
      {
        label: 'Compound',
        contentSite: 'docs',
        url: '/docs/:version/core/indexes/index-types/index-compound',
        collapsible: true,
        items: [
          {
            label: 'Create',
            contentSite: 'docs',
            url: '/docs/:version/core/indexes/index-types/index-compound/create-compound-index',
          },
          {
            label: 'Sort Order',
            contentSite: 'docs',
            url: '/docs/:version/core/indexes/index-types/index-compound/sort-order',
          },
        ],
      },
      {
        label: 'Multikey',
        contentSite: 'docs',
        url: '/docs/:version/core/indexes/index-types/index-multikey',
        collapsible: true,
        items: [
          {
            label: 'Create on Array Field',
            contentSite: 'docs',
            url: '/docs/:version/core/indexes/index-types/index-multikey/create-multikey-index-basic',
          },
          {
            label: 'Embedded Array Field',
            contentSite: 'docs',
            url: '/docs/:version/core/indexes/index-types/index-multikey/create-multikey-index-embedded',
          },
          {
            label: 'Bounds',
            contentSite: 'docs',
            url: '/docs/:version/core/indexes/index-types/index-multikey/multikey-index-bounds',
          },
        ],
      },
      {
        label: 'Wildcard',
        contentSite: 'docs',
        url: '/docs/:version/core/indexes/index-types/index-wildcard',
        collapsible: true,
        items: [
          {
            label: 'Create',
            contentSite: 'docs',
            url: '/docs/:version/core/indexes/index-types/index-wildcard/create-wildcard-index-single-field',
          },
          {
            label: 'Include or Exclude Fields',
            contentSite: 'docs',
            url: '/docs/:version/core/indexes/index-types/index-wildcard/create-wildcard-index-multiple-fields',
          },
          {
            label: 'Use All Fields',
            contentSite: 'docs',
            url: '/docs/:version/core/indexes/index-types/index-wildcard/create-wildcard-index-all-fields',
          },
          {
            label: 'Compound',
            contentSite: 'docs',
            url: '/docs/:version/core/indexes/index-types/index-wildcard/index-wildcard-compound',
          },
          {
            label: 'Reference',
            contentSite: 'docs',
            collapsible: true,
            items: [
              {
                label: 'Embedded Objects & Arrays',
                contentSite: 'docs',
                url: '/docs/:version/core/indexes/index-types/index-wildcard/reference/embedded-object-behavior',
              },
              {
                label: 'Signature',
                contentSite: 'docs',
                url: '/docs/:version/core/indexes/index-types/index-wildcard/reference/wildcard-projection-signature',
              },
              {
                label: 'Restrictions',
                contentSite: 'docs',
                url: '/docs/:version/core/indexes/index-types/index-wildcard/reference/restrictions',
              },
            ],
          },
        ],
      },
      {
        label: 'Geospatial',
        contentSite: 'docs',
        url: '/docs/:version/core/indexes/index-types/index-geospatial',
        collapsible: true,
        items: [
          {
            label: '2dsphere',
            contentSite: 'docs',
            url: '/docs/:version/core/indexes/index-types/geospatial/2dsphere',
            collapsible: true,
            items: [
              {
                label: 'Create',
                contentSite: 'docs',
                url: '/docs/:version/core/indexes/index-types/geospatial/2dsphere/create',
              },
              {
                label: 'Query',
                contentSite: 'docs',
                url: '/docs/:version/core/indexes/index-types/geospatial/2dsphere/query',
                collapsible: true,
                items: [
                  {
                    label: 'Polygons',
                    contentSite: 'docs',
                    url: '/docs/:version/core/indexes/index-types/geospatial/2dsphere/query/geojson-bound-by-polygon',
                  },
                  {
                    label: 'Spheres',
                    contentSite: 'docs',
                    url: '/docs/:version/core/indexes/index-types/geospatial/2dsphere/query/proximity-to-geojson',
                  },
                  {
                    label: 'Intersections',
                    contentSite: 'docs',
                    url: '/docs/:version/core/indexes/index-types/geospatial/2dsphere/query/intersections-of-geojson-objects',
                  },
                  {
                    label: 'Circle in a Sphere',
                    contentSite: 'docs',
                    url: '/docs/:version/core/indexes/index-types/geospatial/2dsphere/query/points-within-circle-on-sphere',
                  },
                ],
              },
              {
                label: 'Versions',
                contentSite: 'docs',
                url: '/docs/:version/core/indexes/index-types/geospatial/2dsphere/2dsphere-index-versions',
              },
            ],
          },
          {
            label: '2d',
            contentSite: 'docs',
            url: '/docs/:version/core/indexes/index-types/geospatial/2d',
            collapsible: true,
            items: [
              {
                label: 'Create',
                contentSite: 'docs',
                url: '/docs/:version/core/indexes/index-types/geospatial/2d/create',
                collapsible: true,
                items: [
                  {
                    label: 'Location Precision',
                    contentSite: 'docs',
                    url: '/docs/:version/core/indexes/index-types/geospatial/2d/create/define-location-precision',
                  },
                  {
                    label: 'Location Range',
                    contentSite: 'docs',
                    url: '/docs/:version/core/indexes/index-types/geospatial/2d/create/define-location-range',
                  },
                ],
              },
              {
                label: 'Query',
                contentSite: 'docs',
                url: '/docs/:version/core/indexes/index-types/geospatial/2d/query',
                collapsible: true,
                items: [
                  {
                    label: 'Point on a Surface',
                    contentSite: 'docs',
                    url: '/docs/:version/core/indexes/index-types/geospatial/2d/query/proximity-flat-surface',
                  },
                  {
                    label: 'Shape on a Surface',
                    contentSite: 'docs',
                    url: '/docs/:version/core/indexes/index-types/geospatial/2d/query/points-within-a-shape',
                  },
                ],
              },
              {
                label: 'Internals',
                contentSite: 'docs',
                url: '/docs/:version/core/indexes/index-types/geospatial/2d/internals',
              },
              {
                label: 'Calculate to Radians',
                contentSite: 'docs',
                url: '/docs/:version/core/indexes/index-types/geospatial/2d/calculate-distances',
              },
            ],
          },
          {
            label: 'Restrictions',
            contentSite: 'docs',
            url: '/docs/:version/core/indexes/index-types/geospatial/restrictions',
          },
        ],
      },
      {
        label: 'Hashed',
        contentSite: 'docs',
        url: '/docs/:version/core/indexes/index-types/index-hashed',
        collapsible: true,
        items: [
          {
            label: 'Create',
            contentSite: 'docs',
            url: '/docs/:version/core/indexes/index-types/index-hashed/create',
          },
        ],
      },
    ],
  },
  {
    label: 'Properties',
    contentSite: 'docs',
    url: '/docs/:version/core/indexes/index-properties',
    collapsible: true,
    items: [
      {
        label: 'Case-Insensitive',
        contentSite: 'docs',
        url: '/docs/:version/core/index-case-insensitive',
      },
      {
        label: 'Hidden',
        contentSite: 'docs',
        url: '/docs/:version/core/index-hidden',
      },
      {
        label: 'Partial',
        contentSite: 'docs',
        url: '/docs/:version/core/index-partial',
      },
      {
        label: 'Sparse',
        contentSite: 'docs',
        url: '/docs/:version/core/index-sparse',
      },
      {
        label: 'TTL',
        contentSite: 'docs',
        url: '/docs/:version/core/index-ttl',
        collapsible: true,
        items: [
          {
            label: 'Expire Data',
            contentSite: 'docs',
            url: '/docs/:version/tutorial/expire-data',
          },
        ],
      },
      {
        label: 'Unique',
        contentSite: 'docs',
        url: '/docs/:version/core/index-unique',
        collapsible: true,
        items: [
          {
            label: 'Convert to Unique',
            contentSite: 'docs',
            url: '/docs/:version/core/index-unique/convert-to-unique',
          },
          {
            label: 'Sharded Collections',
            contentSite: 'docs',
            url: '/docs/:version/tutorial/shard-collection-with-unique-index',
          },
        ],
      },
    ],
  },
  {
    label: 'Builds',
    contentSite: 'docs',
    url: '/docs/:version/core/index-creation',
    collapsible: true,
    items: [
      {
        label: 'Rolling Index Builds',
        contentSite: 'docs',
        url: '/docs/:version/core/rolling-index-builds',
        collapsible: true,
        items: [
          {
            label: 'Create on Replica Sets',
            contentSite: 'docs',
            url: '/docs/:version/tutorial/build-indexes-on-replica-sets',
          },
          {
            label: 'Create on Sharded Clusters',
            contentSite: 'docs',
            url: '/docs/:version/tutorial/build-indexes-on-sharded-clusters',
          },
        ],
      },
    ],
  },
  {
    label: 'Manage',
    contentSite: 'docs',
    url: '/docs/:version/tutorial/manage-indexes',
  },
  {
    label: 'Measure Use',
    contentSite: 'docs',
    url: '/docs/:version/tutorial/measure-index-use',
  },
  {
    label: 'Strategies',
    contentSite: 'docs',
    url: '/docs/:version/applications/indexes',
    collapsible: true,
    items: [
      {
        label: 'Equality, Sort, Range Guideline',
        contentSite: 'docs',
        url: '/docs/:version/tutorial/equality-sort-range-guideline',
      },
      {
        label: 'Sort Query Results',
        contentSite: 'docs',
        url: '/docs/:version/tutorial/sort-results-with-indexes',
      },
      {
        label: 'Ensure Query Selectivity',
        contentSite: 'docs',
        url: '/docs/:version/tutorial/create-queries-that-ensure-selectivity',
      },
      {
        label: 'Unique Indexes and Schema Validation',
        contentSite: 'docs',
        url: '/docs/:version/tutorial/unique-indexes-schema-validation',
      },
    ],
  },
  {
    label: 'Reference',
    contentSite: 'docs',
    url: '/docs/:version/reference/indexes',
  },
];

export default tocData;
