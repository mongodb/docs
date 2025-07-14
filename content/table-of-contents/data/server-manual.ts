import type { TocItem } from "../types";

const tocData: TocItem[] = [
  {
    label: "Database Manual",
    contentSite: "docs",
    group: true,
    items: [
      {
        label: "Introduction",
        contentSite: "docs",
        url: "/docs/:version/introduction",
        collapsible: true,
        items: [
          {
            label: "Get Started",
            contentSite: "docs",
            url: "/docs/:version/tutorial/getting-started",
          },
          {
            label: "Create an Atlas Free Tier Cluster",
            contentSite: "cloud-docs",
            url: "/docs/atlas/getting-started/",
          },
          {
            label: "MongoDB Shell (mongosh)",
            contentSite: "mongodb-shell",
            url: "/docs/mongodb-shell/",
          },
          {
            label: "Databases & Collections",
            contentSite: "docs",
            url: "/docs/:version/core/databases-and-collections",
            collapsible: true,
            items: [
              {
                label: "Views",
                contentSite: "docs",
                url: "/docs/:version/core/views",
                collapsible: true,
                items: [
                  {
                    label: "Create & Query",
                    contentSite: "docs",
                    url: "/docs/:version/core/views/create-view",
                  },
                  {
                    label: "Join Collections",
                    contentSite: "docs",
                    url: "/docs/:version/core/views/join-collections-with-view",
                  },
                  {
                    label: "Use Default Collation",
                    contentSite: "docs",
                    url: "/docs/:version/core/views/specify-collation",
                  },
                  {
                    label: "Modify",
                    contentSite: "docs",
                    url: "/docs/:version/core/views/update-view",
                  },
                  {
                    label: "Remove",
                    contentSite: "docs",
                    url: "/docs/:version/core/views/drop-view",
                  },
                  {
                    label: "Supported Operations",
                    contentSite: "docs",
                    url: "/docs/:version/core/views/supported-operations",
                  },
                ],
              },
              {
                label: "On-Demand Materialized Views",
                contentSite: "docs",
                url: "/docs/:version/core/materialized-views",
              },
              {
                label: "Capped Collections",
                contentSite: "docs",
                url: "/docs/:version/core/capped-collections",
                collapsible: true,
                items: [
                  {
                    label: "Create",
                    contentSite: "docs",
                    url: "/docs/:version/core/capped-collections/create-capped-collection",
                  },
                  {
                    label: "Query",
                    contentSite: "docs",
                    url: "/docs/:version/core/capped-collections/query-capped-collection",
                  },
                  {
                    label: "Verify",
                    contentSite: "docs",
                    url: "/docs/:version/core/capped-collections/check-if-collection-is-capped",
                  },
                  {
                    label: "Convert",
                    contentSite: "docs",
                    url: "/docs/:version/core/capped-collections/convert-collection-to-capped",
                  },
                  {
                    label: "Change Size",
                    contentSite: "docs",
                    url: "/docs/:version/core/capped-collections/change-size-capped-collection",
                  },
                  {
                    label: "Change Limits",
                    contentSite: "docs",
                    url: "/docs/:version/core/capped-collections/change-max-docs-capped-collection",
                  },
                ],
              },
              {
                label: "Clustered Collections",
                contentSite: "docs",
                url: "/docs/:version/core/clustered-collections",
              },
            ],
          },
          {
            label: "Documents",
            contentSite: "docs",
            url: "/docs/:version/core/document",
          },
          {
            label: "Query API",
            contentSite: "docs",
            url: "/docs/:version/query-api",
          },
          {
            label: "BSON Types",
            contentSite: "docs",
            url: "/docs/:version/reference/bson-types",
            collapsible: true,
            items: [
              {
                label: "Comparison and Sort Order",
                contentSite: "docs",
                url: "/docs/:version/reference/bson-type-comparison-order",
              },
              {
                label: "Migrate Undefined Data and Queries",
                contentSite: "docs",
                url: "/docs/:version/reference/bson-types/migrate-undefined",
              },
              {
                label: "Extended JSON (v2)",
                contentSite: "docs",
                url: "/docs/:version/reference/mongodb-extended-json",
              },
              {
                label: "Extended JSON (v1)",
                contentSite: "docs",
                url: "/docs/:version/reference/mongodb-extended-json-v1",
              },
            ],
          },
        ],
      },
      {
        label: "CRUD Operations",
        contentSite: "docs",
        url: "/docs/:version/crud",
        collapsible: true,
        items: [
          {
            label: "Insert",
            contentSite: "docs",
            url: "/docs/:version/tutorial/insert-documents",
            collapsible: true,
            items: [
              {
                label: "Methods",
                contentSite: "docs",
                url: "/docs/:version/reference/insert-methods",
              },
            ],
          },
          {
            label: "Query",
            contentSite: "docs",
            url: "/docs/:version/tutorial/query-documents",
            collapsible: true,
            items: [
              {
                label: "Embedded Documents",
                contentSite: "docs",
                url: "/docs/:version/tutorial/query-embedded-documents",
              },
              {
                label: "Arrays",
                contentSite: "docs",
                url: "/docs/:version/tutorial/query-arrays",
              },
              {
                label: "Arrays of Embedded Documents",
                contentSite: "docs",
                url: "/docs/:version/tutorial/query-array-of-documents",
              },
              {
                label: "Project Results",
                contentSite: "docs",
                url: "/docs/:version/tutorial/project-fields-from-query-results",
              },
              {
                label: "Null or Missing Fields",
                contentSite: "docs",
                url: "/docs/:version/tutorial/query-for-null-fields",
              },
              {
                label: "Timeouts",
                contentSite: "docs",
                url: "/docs/:version/tutorial/query-documents/specify-query-timeout",
              },
              {
                label: "Long-Running Snapshots",
                contentSite: "docs",
                url: "/docs/:version/tutorial/long-running-queries",
              },
            ],
          },
          {
            label: "Update",
            contentSite: "docs",
            url: "/docs/:version/tutorial/update-documents",
            collapsible: true,
            items: [
              {
                label: "Aggregation Pipeline",
                contentSite: "docs",
                url: "/docs/:version/tutorial/update-documents-with-aggregation-pipeline",
              },
              {
                label: "Methods",
                contentSite: "docs",
                url: "/docs/:version/reference/update-methods",
              },
            ],
          },
          {
            label: "Remove",
            contentSite: "docs",
            url: "/docs/:version/tutorial/remove-documents",
            collapsible: true,
            items: [
              {
                label: "Methods",
                contentSite: "docs",
                url: "/docs/:version/reference/delete-methods",
              },
            ],
          },
          {
            label: "Bulk Write",
            contentSite: "docs",
            url: "/docs/:version/core/bulk-write-operations",
          },
          {
            label: "Retryable Writes",
            contentSite: "docs",
            url: "/docs/:version/core/retryable-writes",
          },
          {
            label: "Retryable Reads",
            contentSite: "docs",
            url: "/docs/:version/core/retryable-reads",
          },
          {
            label: "SQL to MongoDB",
            contentSite: "docs",
            url: "/docs/:version/reference/sql-comparison",
          },
          {
            label: "Text Search",
            contentSite: "docs",
            url: "/docs/:version/text-search",
            collapsible: true,
            items: [
              {
                label: "Atlas Search",
                contentSite: "cloud-docs",
                url: "/docs/atlas/atlas-search/",
              },
              {
                label: "Atlas Vector Search",
                contentSite: "cloud-docs",
                url: "/docs/atlas/atlas-vector-search/vector-search-overview/",
              },
            ],
          },
          {
            label: "Geospatial Queries",
            contentSite: "docs",
            url: "/docs/:version/geospatial-queries",
            collapsible: true,
            items: [
              {
                label: "Find Restaurants",
                contentSite: "docs",
                url: "/docs/:version/tutorial/geospatial-tutorial",
              },
              {
                label: "GeoJSON Objects",
                contentSite: "docs",
                url: "/docs/:version/reference/geojson",
              },
            ],
          },
          {
            label: "Read Concern",
            contentSite: "docs",
            url: "/docs/:version/reference/read-concern",
            collapsible: true,
            items: [
              {
                label: '"local"',
                contentSite: "docs",
                url: "/docs/:version/reference/read-concern-local",
              },
              {
                label: '"available"',
                contentSite: "docs",
                url: "/docs/:version/reference/read-concern-available",
              },
              {
                label: '"majority"',
                contentSite: "docs",
                url: "/docs/:version/reference/read-concern-majority",
              },
              {
                label: '"linearizable"',
                contentSite: "docs",
                url: "/docs/:version/reference/read-concern-linearizable",
              },
              {
                label: '"snapshot"',
                contentSite: "docs",
                url: "/docs/:version/reference/read-concern-snapshot",
              },
            ],
          },
          {
            label: "Write Concern",
            contentSite: "docs",
            url: "/docs/:version/reference/write-concern",
            collapsible: true,
            items: [
              {
                label: "Lifecycle Diagrams",
                contentSite: "docs",
                url: "/docs/:version/reference/write-concern/write-lifecycle",
              },
            ],
          },
          {
            label: "CRUD Concepts",
            contentSite: "docs",
            url: "/docs/:version/core/crud",
            collapsible: true,
            items: [
              {
                label: "Atomicity & Transactions",
                contentSite: "docs",
                url: "/docs/:version/core/write-operations-atomicity",
              },
              {
                label: "Distributed Queries",
                contentSite: "docs",
                url: "/docs/:version/core/distributed-queries",
              },
              {
                label: "Periods & Dollar Signs",
                contentSite: "docs",
                url: "/docs/:version/core/dot-dollar-considerations",
                collapsible: true,
                items: [
                  {
                    label: "Dollar Signs",
                    contentSite: "docs",
                    url: "/docs/:version/core/dot-dollar-considerations/dollar-prefix",
                  },
                  {
                    label: "Periods",
                    contentSite: "docs",
                    url: "/docs/:version/core/dot-dollar-considerations/periods",
                  },
                ],
              },
              {
                label: "Read Isolation, Consistency, & Recency",
                contentSite: "docs",
                url: "/docs/:version/core/read-isolation-consistency-recency",
                collapsible: true,
                items: [
                  {
                    label: "Causal Consistency",
                    contentSite: "docs",
                    url: "/docs/:version/core/causal-consistency-read-write-concerns",
                  },
                ],
              },
              {
                label: "Query Optimization",
                contentSite: "docs",
                url: "/docs/:version/core/query-optimization",
                collapsible: true,
                items: [
                  {
                    label: "Analyze Performance",
                    contentSite: "docs",
                    url: "/docs/:version/tutorial/evaluate-operation-performance",
                    collapsible: true,
                    items: [
                      {
                        label: "Explain Results",
                        contentSite: "docs",
                        url: "/docs/:version/reference/explain-results",
                        collapsible: true,
                        items: [
                          {
                            label: "Interpret Results",
                            contentSite: "docs",
                            url: "/docs/:version/tutorial/analyze-query-plan",
                          },
                        ],
                      },
                      {
                        label: "Database Profiler",
                        contentSite: "docs",
                        url: "/docs/:version/tutorial/manage-the-database-profiler",
                        collapsible: true,
                        items: [
                          {
                            label: "Output",
                            contentSite: "docs",
                            url: "/docs/:version/reference/database-profiler",
                          },
                        ],
                      },
                      {
                        label: "Block Slow Queries",
                        contentSite: "docs",
                        url: "/docs/:version/tutorial/operation-rejection-filters",
                      },
                    ],
                  },
                  {
                    label: "Optimize Performance",
                    contentSite: "docs",
                    url: "/docs/:version/tutorial/optimize-query-performance-with-indexes-and-projections",
                  },
                  {
                    label: "Write Performance",
                    contentSite: "docs",
                    url: "/docs/:version/core/write-performance",
                  },
                ],
              },
              {
                label: "Query Plans",
                contentSite: "docs",
                url: "/docs/:version/core/query-plans",
              },
              {
                label: "Query Shapes",
                contentSite: "docs",
                url: "/docs/:version/core/query-shapes",
              },
              {
                label: "Cursors",
                contentSite: "docs",
                url: "/docs/:version/core/cursors",
                collapsible: true,
                items: [
                  {
                    label: "Iterate a Cursor",
                    contentSite: "docs",
                    url: "/docs/:version/tutorial/iterate-a-cursor",
                  },
                  {
                    label: "Tailable Cursors",
                    contentSite: "docs",
                    url: "/docs/:version/core/tailable-cursors",
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        label: "Aggregation Operations",
        contentSite: "docs",
        url: "/docs/:version/aggregation",
        collapsible: true,
        items: [
          {
            label: "Aggregation Pipeline",
            contentSite: "docs",
            url: "/docs/:version/core/aggregation-pipeline",
            collapsible: true,
            items: [
              {
                label: "Field Paths",
                contentSite: "docs",
                url: "/docs/:version/core/field-paths",
              },
              {
                label: "Optimization",
                contentSite: "docs",
                url: "/docs/:version/core/aggregation-pipeline-optimization",
              },
              {
                label: "Limits",
                contentSite: "docs",
                url: "/docs/:version/core/aggregation-pipeline-limits",
              },
              {
                label: "Sharded Collections",
                contentSite: "docs",
                url: "/docs/:version/core/aggregation-pipeline-sharded-collections",
              },
              {
                label: "Zip Code Example",
                contentSite: "docs",
                url: "/docs/:version/tutorial/aggregation-zip-code-data-set",
              },
              {
                label: "User Preference Example",
                contentSite: "docs",
                url: "/docs/:version/tutorial/aggregation-with-user-preference-data",
              },
            ],
          },
          {
            label: "Reference",
            contentSite: "docs",
            url: "/docs/:version/reference/aggregation",
            collapsible: true,
            items: [
              {
                label: "Commands",
                contentSite: "docs",
                url: "/docs/:version/reference/operator/aggregation/interface",
              },
              {
                label: "Commands Comparison",
                contentSite: "docs",
                url: "/docs/:version/reference/aggregation-commands-comparison",
              },
              {
                label: "Variables",
                contentSite: "docs",
                url: "/docs/:version/reference/aggregation-variables",
              },
              {
                label: "SQL to Aggregation",
                contentSite: "docs",
                url: "/docs/:version/reference/sql-aggregation-comparison",
              },
              {
                label: "Practical MongoDB Aggregations (e-book)",
                isExternal: true,
                url: "https://www.practical-mongodb-aggregations.com",
              },
            ],
          },
          {
            label: "Map-Reduce",
            contentSite: "docs",
            url: "/docs/:version/core/map-reduce",
            collapsible: true,
            items: [
              {
                label: "Sharded Collections",
                contentSite: "docs",
                url: "/docs/:version/core/map-reduce-sharded-collections",
              },
              {
                label: "Concurrency",
                contentSite: "docs",
                url: "/docs/:version/core/map-reduce-concurrency",
              },
              {
                label: "Examples",
                contentSite: "docs",
                url: "/docs/:version/tutorial/map-reduce-examples",
              },
              {
                label: "Perform with Increments",
                contentSite: "docs",
                url: "/docs/:version/tutorial/perform-incremental-map-reduce",
              },
              {
                label: "Troubleshoot Map",
                contentSite: "docs",
                url: "/docs/:version/tutorial/troubleshoot-map-function",
              },
              {
                label: "Troubleshoot Reduce",
                contentSite: "docs",
                url: "/docs/:version/tutorial/troubleshoot-reduce-function",
              },
              {
                label: "Aggregation Pipeline",
                contentSite: "docs",
                url: "/docs/:version/reference/map-reduce-to-aggregation-pipeline",
              },
            ],
          },
        ],
      },
      {
        label: "Indexes",
        contentSite: "docs",
        url: "/docs/:version/indexes",
        collapsible: true,
        items: [
          {
            label: "Create",
            contentSite: "docs",
            url: "/docs/:version/core/indexes/create-index",
            collapsible: true,
            items: [
              {
                label: "Specify a Name",
                contentSite: "docs",
                url: "/docs/:version/core/indexes/create-index/specify-index-name",
              },
            ],
          },
          {
            label: "Drop",
            contentSite: "docs",
            url: "/docs/:version/core/indexes/drop-index",
          },
          {
            label: "Types",
            contentSite: "docs",
            url: "/docs/:version/core/indexes/index-types",
            collapsible: true,
            items: [
              {
                label: "Single Field",
                contentSite: "docs",
                url: "/docs/:version/core/indexes/index-types/index-single",
                collapsible: true,
                items: [
                  {
                    label: "Create",
                    contentSite: "docs",
                    url: "/docs/:version/core/indexes/index-types/index-single/create-single-field-index",
                  },
                  {
                    label: "Embedded Documents",
                    contentSite: "docs",
                    url: "/docs/:version/core/indexes/index-types/index-single/create-embedded-object-index",
                  },
                ],
              },
              {
                label: "Compound",
                contentSite: "docs",
                url: "/docs/:version/core/indexes/index-types/index-compound",
                collapsible: true,
                items: [
                  {
                    label: "Create",
                    contentSite: "docs",
                    url: "/docs/:version/core/indexes/index-types/index-compound/create-compound-index",
                  },
                  {
                    label: "Sort Order",
                    contentSite: "docs",
                    url: "/docs/:version/core/indexes/index-types/index-compound/sort-order",
                  },
                ],
              },
              {
                label: "Multikey",
                contentSite: "docs",
                url: "/docs/:version/core/indexes/index-types/index-multikey",
                collapsible: true,
                items: [
                  {
                    label: "Create on Array Field",
                    contentSite: "docs",
                    url: "/docs/:version/core/indexes/index-types/index-multikey/create-multikey-index-basic",
                  },
                  {
                    label: "Embedded Array Field",
                    contentSite: "docs",
                    url: "/docs/:version/core/indexes/index-types/index-multikey/create-multikey-index-embedded",
                  },
                  {
                    label: "Bounds",
                    contentSite: "docs",
                    url: "/docs/:version/core/indexes/index-types/index-multikey/multikey-index-bounds",
                  },
                ],
              },
              {
                label: "Wildcard",
                contentSite: "docs",
                url: "/docs/:version/core/indexes/index-types/index-wildcard",
                collapsible: true,
                items: [
                  {
                    label: "Create",
                    contentSite: "docs",
                    url: "/docs/:version/core/indexes/index-types/index-wildcard/create-wildcard-index-single-field",
                  },
                  {
                    label: "Include or Exclude Fields",
                    contentSite: "docs",
                    url: "/docs/:version/core/indexes/index-types/index-wildcard/create-wildcard-index-multiple-fields",
                  },
                  {
                    label: "Use All Fields",
                    contentSite: "docs",
                    url: "/docs/:version/core/indexes/index-types/index-wildcard/create-wildcard-index-all-fields",
                  },
                  {
                    label: "Compound",
                    contentSite: "docs",
                    url: "/docs/:version/core/indexes/index-types/index-wildcard/index-wildcard-compound",
                  },
                  {
                    label: "Reference",
                    contentSite: "docs",
                    url: "/docs/:version/core/indexes/index-types/index-wildcard/reference",
                    collapsible: true,
                    items: [
                      {
                        label: "Embedded Objects & Arrays",
                        contentSite: "docs",
                        url: "/docs/:version/core/indexes/index-types/index-wildcard/reference/embedded-object-behavior",
                      },
                      {
                        label: "Signature",
                        contentSite: "docs",
                        url: "/docs/:version/core/indexes/index-types/index-wildcard/reference/wildcard-projection-signature",
                      },
                      {
                        label: "Restrictions",
                        contentSite: "docs",
                        url: "/docs/:version/core/indexes/index-types/index-wildcard/reference/restrictions",
                      },
                    ],
                  },
                ],
              },
              {
                label: "Geospatial",
                contentSite: "docs",
                url: "/docs/:version/core/indexes/index-types/index-geospatial",
                collapsible: true,
                items: [
                  {
                    label: "2dsphere",
                    contentSite: "docs",
                    url: "/docs/:version/core/indexes/index-types/geospatial/2dsphere",
                    collapsible: true,
                    items: [
                      {
                        label: "Create",
                        contentSite: "docs",
                        url: "/docs/:version/core/indexes/index-types/geospatial/2dsphere/create",
                      },
                      {
                        label: "Query",
                        contentSite: "docs",
                        url: "/docs/:version/core/indexes/index-types/geospatial/2dsphere/query",
                        collapsible: true,
                        items: [
                          {
                            label: "Polygons",
                            contentSite: "docs",
                            url: "/docs/:version/core/indexes/index-types/geospatial/2dsphere/query/geojson-bound-by-polygon",
                          },
                          {
                            label: "Spheres",
                            contentSite: "docs",
                            url: "/docs/:version/core/indexes/index-types/geospatial/2dsphere/query/proximity-to-geojson",
                          },
                          {
                            label: "Intersections",
                            contentSite: "docs",
                            url: "/docs/:version/core/indexes/index-types/geospatial/2dsphere/query/intersections-of-geojson-objects",
                          },
                          {
                            label: "Circle in a Sphere",
                            contentSite: "docs",
                            url: "/docs/:version/core/indexes/index-types/geospatial/2dsphere/query/points-within-circle-on-sphere",
                          },
                        ],
                      },
                      {
                        label: "Versions",
                        contentSite: "docs",
                        url: "/docs/:version/core/indexes/index-types/geospatial/2dsphere/2dsphere-index-versions",
                      },
                    ],
                  },
                  {
                    label: "2d",
                    contentSite: "docs",
                    url: "/docs/:version/core/indexes/index-types/geospatial/2d",
                    collapsible: true,
                    items: [
                      {
                        label: "Create",
                        contentSite: "docs",
                        url: "/docs/:version/core/indexes/index-types/geospatial/2d/create",
                        collapsible: true,
                        items: [
                          {
                            label: "Location Precision",
                            contentSite: "docs",
                            url: "/docs/:version/core/indexes/index-types/geospatial/2d/create/define-location-precision",
                          },
                          {
                            label: "Location Range",
                            contentSite: "docs",
                            url: "/docs/:version/core/indexes/index-types/geospatial/2d/create/define-location-range",
                          },
                        ],
                      },
                      {
                        label: "Query",
                        contentSite: "docs",
                        url: "/docs/:version/core/indexes/index-types/geospatial/2d/query",
                        collapsible: true,
                        items: [
                          {
                            label: "Point on a Surface",
                            contentSite: "docs",
                            url: "/docs/:version/core/indexes/index-types/geospatial/2d/query/proximity-flat-surface",
                          },
                          {
                            label: "Shape on a Surface",
                            contentSite: "docs",
                            url: "/docs/:version/core/indexes/index-types/geospatial/2d/query/points-within-a-shape",
                          },
                        ],
                      },
                      {
                        label: "Internals",
                        contentSite: "docs",
                        url: "/docs/:version/core/indexes/index-types/geospatial/2d/internals",
                      },
                      {
                        label: "Calculate to Radians",
                        contentSite: "docs",
                        url: "/docs/:version/core/indexes/index-types/geospatial/2d/calculate-distances",
                      },
                    ],
                  },
                  {
                    label: "Restrictions",
                    contentSite: "docs",
                    url: "/docs/:version/core/indexes/index-types/geospatial/restrictions",
                  },
                ],
              },
              {
                label: "Hashed",
                contentSite: "docs",
                url: "/docs/:version/core/indexes/index-types/index-hashed",
                collapsible: true,
                items: [
                  {
                    label: "Create",
                    contentSite: "docs",
                    url: "/docs/:version/core/indexes/index-types/index-hashed/create",
                  },
                ],
              },
            ],
          },
          {
            label: "Properties",
            contentSite: "docs",
            url: "/docs/:version/core/indexes/index-properties",
            collapsible: true,
            items: [
              {
                label: "Case-Insensitive",
                contentSite: "docs",
                url: "/docs/:version/core/index-case-insensitive",
              },
              {
                label: "Hidden",
                contentSite: "docs",
                url: "/docs/:version/core/index-hidden",
              },
              {
                label: "Partial",
                contentSite: "docs",
                url: "/docs/:version/core/index-partial",
              },
              {
                label: "Sparse",
                contentSite: "docs",
                url: "/docs/:version/core/index-sparse",
              },
              {
                label: "TTL",
                contentSite: "docs",
                url: "/docs/:version/core/index-ttl",
                collapsible: true,
                items: [
                  {
                    label: "Expire Data",
                    contentSite: "docs",
                    url: "/docs/:version/tutorial/expire-data",
                  },
                ],
              },
              {
                label: "Unique",
                contentSite: "docs",
                url: "/docs/:version/core/index-unique",
                collapsible: true,
                items: [
                  {
                    label: "Convert to Unique",
                    contentSite: "docs",
                    url: "/docs/:version/core/index-unique/convert-to-unique",
                  },
                ],
              },
            ],
          },
          {
            label: "Builds",
            contentSite: "docs",
            url: "/docs/:version/core/index-creation",
            collapsible: true,
            items: [
              {
                label: "Rolling Index Builds",
                contentSite: "docs",
                url: "/docs/:version/core/rolling-index-builds",
                collapsible: true,
                items: [
                  {
                    label: "Create on Replica Sets",
                    contentSite: "docs",
                    url: "/docs/:version/tutorial/build-indexes-on-replica-sets",
                  },
                  {
                    label: "Create on Sharded Clusters",
                    contentSite: "docs",
                    url: "/docs/:version/tutorial/build-indexes-on-sharded-clusters",
                  },
                ],
              },
            ],
          },
          {
            label: "Manage",
            contentSite: "docs",
            url: "/docs/:version/tutorial/manage-indexes",
          },
          {
            label: "Measure Use",
            contentSite: "docs",
            url: "/docs/:version/tutorial/measure-index-use",
          },
          {
            label: "Strategies",
            contentSite: "docs",
            url: "/docs/:version/applications/indexes",
            collapsible: true,
            items: [
              {
                label: "Equality, Sort, Range Guideline",
                contentSite: "docs",
                url: "/docs/:version/tutorial/equality-sort-range-guideline",
              },
              {
                label: "Sort Query Results",
                contentSite: "docs",
                url: "/docs/:version/tutorial/sort-results-with-indexes",
              },
              {
                label: "Ensure Query Selectivity",
                contentSite: "docs",
                url: "/docs/:version/tutorial/create-queries-that-ensure-selectivity",
              },
            ],
          },
          {
            label: "Reference",
            contentSite: "docs",
            url: "/docs/:version/reference/indexes",
          },
        ],
      },
      {
        label: "Atlas Search",
        contentSite: "docs",
        url: "/docs/atlas/atlas-search/?tck=docs_server_toc",
      },
      {
        label: "Atlas Vector Search",
        contentSite: "cloud-docs",
        url: "/atlas/atlas-vector-search/vector-search-overview/?tck=docs_server_toc",
      },
      {
        label: "Time Series",
        contentSite: "docs",
        url: "/docs/:version/core/timeseries-collections",
        collapsible: true,
        items: [
          {
            label: "Quick Start",
            contentSite: "docs",
            url: "/docs/:version/core/timeseries/timeseries-quick-start",
          },
          {
            label: "Time Series Data",
            contentSite: "docs",
            url: "/docs/:version/core/timeseries/timeseries-bucketing",
          },
          {
            label: "Considerations",
            contentSite: "docs",
            url: "/docs/:version/core/timeseries/timeseries-considerations",
          },
          {
            label: "Create & Configure",
            contentSite: "docs",
            url: "/docs/:version/core/timeseries/timeseries-create-configure",
            collapsible: true,
            items: [
              {
                label: "Create & Query",
                contentSite: "docs",
                url: "/docs/:version/core/timeseries/timeseries-procedures",
              },
              {
                label: "Set Granularity",
                contentSite: "docs",
                url: "/docs/:version/core/timeseries/timeseries-granularity",
              },
              {
                label: "Migrate Data",
                contentSite: "docs",
                url: "/docs/:version/core/timeseries/timeseries-migrate-data-into-timeseries-collection",
                collapsible: true,
                items: [
                  {
                    label: "Use Aggregation",
                    contentSite: "docs",
                    url: "/docs/:version/core/timeseries/timeseries-migrate-with-aggregation",
                  },
                  {
                    label: "Use Tools",
                    contentSite: "docs",
                    url: "/docs/:version/core/timeseries/timeseries-migrate-with-tools",
                  },
                ],
              },
              {
                label: "Use Automatic Removal",
                contentSite: "docs",
                url: "/docs/:version/core/timeseries/timeseries-automatic-removal",
              },
              {
                label: "Compression",
                contentSite: "docs",
                url: "/docs/:version/core/timeseries/timeseries-compression",
              },
              {
                label: "Shard Collection",
                contentSite: "docs",
                url: "/docs/:version/core/timeseries/timeseries-shard-collection",
              },
            ],
          },
          {
            label: "Query",
            contentSite: "docs",
            url: "/docs/:version/core/timeseries/timeseries-querying",
            collapsible: true,
            items: [
              {
                label: "Aggregations & Operators",
                contentSite: "docs",
                url: "/docs/:version/core/timeseries/timeseries-aggregations-operators",
              },
              {
                label: "List Time Series Collections",
                contentSite: "docs",
                url: "/docs/:version/core/timeseries/timeseries-check-type",
              },
              {
                label: "Build Materialized Views",
                contentSite: "docs",
                url: "/docs/:version/core/timeseries/timeseries-build-materialized-views",
              },
            ],
          },
          {
            label: "Indexes",
            contentSite: "docs",
            url: "/docs/:version/core/timeseries/timeseries-index",
            collapsible: true,
            items: [
              {
                label: "Add Secondary Indexes",
                contentSite: "docs",
                url: "/docs/:version/core/timeseries/timeseries-secondary-index",
              },
            ],
          },
          {
            label: "Best Practices",
            contentSite: "docs",
            url: "/docs/:version/core/timeseries/timeseries-best-practices",
          },
          {
            label: "Limitations",
            contentSite: "docs",
            url: "/docs/:version/core/timeseries/timeseries-limitations",
          },
        ],
      },
      {
        label: "Change Streams",
        contentSite: "docs",
        url: "/docs/:version/changeStreams",
        collapsible: true,
        items: [
          {
            label: "Production Recommendations",
            contentSite: "docs",
            url: "/docs/:version/administration/change-streams-production-recommendations",
          },
          {
            label: "Change Events",
            contentSite: "docs",
            url: "/docs/:version/reference/change-events",
            collapsible: true,
            items: [
              {
                label: "create",
                contentSite: "docs",
                url: "/docs/:version/reference/change-events/create",
              },
              {
                label: "createIndexes",
                contentSite: "docs",
                url: "/docs/:version/reference/change-events/createIndexes",
              },
              {
                label: "delete",
                contentSite: "docs",
                url: "/docs/:version/reference/change-events/delete",
              },
              {
                label: "drop",
                contentSite: "docs",
                url: "/docs/:version/reference/change-events/drop",
              },
              {
                label: "dropDatabase",
                contentSite: "docs",
                url: "/docs/:version/reference/change-events/dropDatabase",
              },
              {
                label: "dropIndexes",
                contentSite: "docs",
                url: "/docs/:version/reference/change-events/dropIndexes",
              },
              {
                label: "insert",
                contentSite: "docs",
                url: "/docs/:version/reference/change-events/insert",
              },
              {
                label: "invalidate",
                contentSite: "docs",
                url: "/docs/:version/reference/change-events/invalidate",
              },
              {
                label: "modify",
                contentSite: "docs",
                url: "/docs/:version/reference/change-events/modify",
              },
              {
                label: "refineCollectionShardKey",
                contentSite: "docs",
                url: "/docs/:version/reference/change-events/refineCollectionShardKey",
              },
              {
                label: "rename",
                contentSite: "docs",
                url: "/docs/:version/reference/change-events/rename",
              },
              {
                label: "replace",
                contentSite: "docs",
                url: "/docs/:version/reference/change-events/replace",
              },
              {
                label: "reshardCollection",
                contentSite: "docs",
                url: "/docs/:version/reference/change-events/reshardCollection",
              },
              {
                label: "shardCollection",
                contentSite: "docs",
                url: "/docs/:version/reference/change-events/shardCollection",
              },
              {
                label: "update",
                contentSite: "docs",
                url: "/docs/:version/reference/change-events/update",
              },
            ],
          },
        ],
      },
      {
        label: "Transactions",
        contentSite: "docs",
        url: "/docs/:version/core/transactions",
        collapsible: true,
        items: [
          {
            label: "Drivers API",
            contentSite: "docs",
            url: "/docs/:version/core/transactions-in-applications",
          },
          {
            label: "Operations",
            contentSite: "docs",
            url: "/docs/:version/core/transactions-operations",
          },
          {
            label: "Production Considerations",
            contentSite: "docs",
            url: "/docs/:version/core/transactions-production-consideration",
          },
          {
            label: "Sharded Clusters",
            contentSite: "docs",
            url: "/docs/:version/core/transactions-sharded-clusters",
          },
        ],
      },
      {
        label: "Data Modeling",
        contentSite: "docs",
        url: "/docs/:version/data-modeling",
        collapsible: true,
        items: [
          {
            label: "Designing Your Schema",
            contentSite: "docs",
            url: "/docs/:version/data-modeling/schema-design-process",
            collapsible: true,
            items: [
              {
                label: "Identify Workload",
                contentSite: "docs",
                url: "/docs/:version/data-modeling/schema-design-process/identify-workload",
              },
              {
                label: "Map Relationships",
                contentSite: "docs",
                url: "/docs/:version/data-modeling/schema-design-process/map-relationships",
              },
              {
                label: "Apply Patterns",
                contentSite: "docs",
                url: "/docs/:version/data-modeling/schema-design-process/apply-patterns",
              },
              {
                label: "Create Indexes",
                contentSite: "docs",
                url: "/docs/:version/data-modeling/schema-design-process/create-indexes",
              },
            ],
          },
          {
            label: "Schema Design Patterns",
            contentSite: "docs",
            url: "/docs/:version/data-modeling/design-patterns",
            collapsible: true,
            items: [
              {
                label: "Computed Values",
                contentSite: "docs",
                url: "/docs/:version/data-modeling/design-patterns/handle-computed-values",
                collapsible: true,
                items: [
                  {
                    label: "Computed Data",
                    contentSite: "docs",
                    url: "/docs/:version/data-modeling/design-patterns/computed-values/computed-schema-pattern",
                  },
                  {
                    label: "Approximation Pattern",
                    contentSite: "docs",
                    url: "/docs/:version/data-modeling/design-patterns/computed-values/approximation-schema-pattern",
                  },
                ],
              },
              {
                label: "Group Data",
                contentSite: "docs",
                url: "/docs/:version/data-modeling/design-patterns/group-data",
                collapsible: true,
                items: [
                  {
                    label: "Bucket Pattern",
                    contentSite: "docs",
                    url: "/docs/:version/data-modeling/design-patterns/group-data/bucket-pattern",
                  },
                  {
                    label: "Outlier Pattern",
                    contentSite: "docs",
                    url: "/docs/:version/data-modeling/design-patterns/group-data/outlier-pattern",
                  },
                  {
                    label: "Attribute Pattern",
                    contentSite: "docs",
                    url: "/docs/:version/data-modeling/design-patterns/group-data/attribute-pattern",
                  },
                ],
              },
              {
                label: "Polymorphic Data",
                contentSite: "docs",
                url: "/docs/:version/data-modeling/design-patterns/polymorphic-data",
                collapsible: true,
                items: [
                  {
                    label: "Polymorphic Pattern",
                    contentSite: "docs",
                    url: "/docs/:version/data-modeling/design-patterns/polymorphic-data/polymorphic-schema-pattern",
                  },
                  {
                    label: "Inheritance Pattern",
                    contentSite: "docs",
                    url: "/docs/:version/data-modeling/design-patterns/polymorphic-data/inheritance-schema-pattern",
                  },
                ],
              },
              {
                label: "Versioning",
                contentSite: "docs",
                url: "/docs/:version/data-modeling/design-patterns/data-versioning",
                collapsible: true,
                items: [
                  {
                    label: "Keep Document History",
                    contentSite: "docs",
                    url: "/docs/:version/data-modeling/design-patterns/data-versioning/document-versioning",
                  },
                  {
                    label: "Maintain Versions",
                    contentSite: "docs",
                    url: "/docs/:version/data-modeling/design-patterns/data-versioning/schema-versioning",
                  },
                ],
              },
              {
                label: "Archive Data",
                contentSite: "docs",
                url: "/docs/:version/data-modeling/design-patterns/archive",
              },
            ],
          },
          {
            label: "Schema Design Anti-Patterns",
            contentSite: "docs",
            url: "/docs/:version/data-modeling/design-antipatterns",
            collapsible: true,
            items: [
              {
                label: "Avoid Unbounded Arrays",
                contentSite: "docs",
                url: "/docs/:version/data-modeling/design-antipatterns/unbounded-arrays",
              },
              {
                label: "Reduce the Number of Collections",
                contentSite: "docs",
                url: "/docs/:version/data-modeling/design-antipatterns/reduce-collections",
              },
              {
                label: "Remove Unnecessary Indexes",
                contentSite: "docs",
                url: "/docs/:version/data-modeling/design-antipatterns/unnecessary-indexes",
              },
              {
                label: "Bloated Documents",
                contentSite: "docs",
                url: "/docs/:version/data-modeling/design-antipatterns/bloated-documents",
              },
              {
                label: "Reduce $lookup Operations",
                contentSite: "docs",
                url: "/docs/:version/data-modeling/design-antipatterns/reduce-lookup-operations",
              },
            ],
          },
          {
            label: "Data Modeling Concepts",
            contentSite: "docs",
            url: "/docs/:version/data-modeling/concepts",
            collapsible: true,
            items: [
              {
                label: "Embedded Vs Reference",
                contentSite: "docs",
                url: "/docs/:version/data-modeling/concepts/embedding-vs-references",
              },
              {
                label: "Operational Factors",
                contentSite: "docs",
                url: "/docs/:version/core/data-model-operations",
              },
            ],
          },
          {
            label: "Handle Duplicate Data",
            contentSite: "docs",
            url: "/docs/:version/data-modeling/handle-duplicate-data",
          },
          {
            label: "Data Consistency",
            contentSite: "docs",
            url: "/docs/:version/data-modeling/data-consistency",
            collapsible: true,
            items: [
              {
                label: "Use Transactions",
                contentSite: "docs",
                url: "/docs/:version/data-modeling/enforce-consistency/transactions",
              },
              {
                label: "Use Embedding",
                contentSite: "docs",
                url: "/docs/:version/data-modeling/enforce-consistency/embed-data",
              },
            ],
          },
          {
            label: "Schema Validation",
            contentSite: "docs",
            url: "/docs/:version/core/schema-validation",
            collapsible: true,
            items: [
              {
                label: "Specify JSON Validation",
                contentSite: "docs",
                url: "/docs/:version/core/schema-validation/specify-json-schema",
                collapsible: true,
                items: [
                  {
                    label: "Specify Field Values",
                    contentSite: "docs",
                    url: "/docs/:version/core/schema-validation/specify-json-schema/specify-allowed-field-values",
                  },
                  {
                    label: "Best Practices",
                    contentSite: "docs",
                    url: "/docs/:version/core/schema-validation/specify-json-schema/json-schema-tips",
                  },
                ],
              },
              {
                label: "Specify Query Operators",
                contentSite: "docs",
                url: "/docs/:version/core/schema-validation/specify-query-expression-rules",
              },
              {
                label: "Specify Validation Level",
                contentSite: "docs",
                url: "/docs/:version/core/schema-validation/specify-validation-level",
              },
              {
                label: "Handle Invalid Documents",
                contentSite: "docs",
                url: "/docs/:version/core/schema-validation/handle-invalid-documents",
              },
              {
                label: "Bypass",
                contentSite: "docs",
                url: "/docs/:version/core/schema-validation/bypass-document-validation",
              },
              {
                label: "View Existing Rules",
                contentSite: "docs",
                url: "/docs/:version/core/schema-validation/view-existing-validation-rules",
              },
              {
                label: "Modify Rules",
                contentSite: "docs",
                url: "/docs/:version/core/schema-validation/update-schema-validation",
              },
              {
                label: "Query and Modify",
                contentSite: "docs",
                url: "/docs/:version/core/schema-validation/use-json-schema-query-conditions",
              },
            ],
          },
          {
            label: "Data Model Examples and Patterns",
            contentSite: "docs",
            url: "/docs/:version/applications/data-models",
            collapsible: true,
            items: [
              {
                label: "Document Relationships",
                contentSite: "docs",
                url: "/docs/:version/applications/data-models-relationships",
                collapsible: true,
                items: [
                  {
                    label: "One-to-One Embedded Documents",
                    contentSite: "docs",
                    url: "/docs/:version/tutorial/model-embedded-one-to-one-relationships-between-documents",
                  },
                  {
                    label: "One-to-Many Embedded Documents",
                    contentSite: "docs",
                    url: "/docs/:version/tutorial/model-embedded-one-to-many-relationships-between-documents",
                  },
                  {
                    label: "One-to-Many References",
                    contentSite: "docs",
                    url: "/docs/:version/tutorial/model-referenced-one-to-many-relationships-between-documents",
                  },
                  {
                    label: "Many-to-Many Embedded Documents",
                    contentSite: "docs",
                    url: "/docs/:version/tutorial/model-embedded-many-to-many-relationships-between-documents",
                  },
                ],
              },
              {
                label: "Tree Structures",
                contentSite: "docs",
                url: "/docs/:version/applications/data-models-tree-structures",
                collapsible: true,
                items: [
                  {
                    label: "Parent References",
                    contentSite: "docs",
                    url: "/docs/:version/tutorial/model-tree-structures-with-parent-references",
                  },
                  {
                    label: "Child References",
                    contentSite: "docs",
                    url: "/docs/:version/tutorial/model-tree-structures-with-child-references",
                  },
                  {
                    label: "Array of Ancestors",
                    contentSite: "docs",
                    url: "/docs/:version/tutorial/model-tree-structures-with-ancestors-array",
                  },
                  {
                    label: "Materialized Paths",
                    contentSite: "docs",
                    url: "/docs/:version/tutorial/model-tree-structures-with-materialized-paths",
                  },
                  {
                    label: "Nested Sets",
                    contentSite: "docs",
                    url: "/docs/:version/tutorial/model-tree-structures-with-nested-sets",
                  },
                ],
              },
              {
                label: "Specific Application Contexts",
                contentSite: "docs",
                url: "/docs/:version/applications/data-models-applications",
                collapsible: true,
                items: [
                  {
                    label: "Atomic Operations",
                    contentSite: "docs",
                    url: "/docs/:version/tutorial/model-data-for-atomic-operations",
                  },
                  {
                    label: "IOT Data",
                    contentSite: "docs",
                    url: "/docs/:version/tutorial/model-iot-data",
                  },
                  {
                    label: "Keyword Search",
                    contentSite: "docs",
                    url: "/docs/:version/tutorial/model-data-for-keyword-search",
                  },
                  {
                    label: "Monetary Data",
                    contentSite: "docs",
                    url: "/docs/:version/tutorial/model-monetary-data",
                  },
                ],
              },
            ],
          },
          {
            label: "Data Model Reference",
            contentSite: "docs",
            url: "/docs/:version/reference/data-models",
            collapsible: true,
            items: [
              {
                label: "Database References",
                contentSite: "docs",
                url: "/docs/:version/reference/database-references",
              },
            ],
          },
        ],
      },
      {
        label: "Replication",
        contentSite: "docs",
        url: "/docs/:version/replication",
        collapsible: true,
        items: [
          {
            label: "Oplog",
            contentSite: "docs",
            url: "/docs/:version/core/replica-set-oplog",
          },
          {
            label: "Data Synchronization",
            contentSite: "docs",
            url: "/docs/:version/core/replica-set-sync",
          },
          {
            label: "Replica Set Members",
            contentSite: "docs",
            url: "/docs/:version/core/replica-set-members",
            collapsible: true,
            items: [
              {
                label: "Primary",
                contentSite: "docs",
                url: "/docs/:version/core/replica-set-primary",
              },
              {
                label: "Secondary",
                contentSite: "docs",
                url: "/docs/:version/core/replica-set-secondary",
                collapsible: true,
                items: [
                  {
                    label: "Priority 0 Members",
                    contentSite: "docs",
                    url: "/docs/:version/core/replica-set-priority-0-member",
                  },
                  {
                    label: "Hidden Members",
                    contentSite: "docs",
                    url: "/docs/:version/core/replica-set-hidden-member",
                  },
                  {
                    label: "Delayed Members",
                    contentSite: "docs",
                    url: "/docs/:version/core/replica-set-delayed-member",
                  },
                ],
              },
              {
                label: "Arbiter",
                contentSite: "docs",
                url: "/docs/:version/core/replica-set-arbiter",
              },
            ],
          },
          {
            label: "Deployment Architectures",
            contentSite: "docs",
            url: "/docs/:version/core/replica-set-architectures",
            collapsible: true,
            items: [
              {
                label: "Three Members",
                contentSite: "docs",
                url: "/docs/:version/core/replica-set-architecture-three-members",
              },
              {
                label: "Distributed Data Centers",
                contentSite: "docs",
                url: "/docs/:version/core/replica-set-architecture-geographically-distributed",
              },
            ],
          },
          {
            label: "High Availability",
            contentSite: "docs",
            url: "/docs/:version/core/replica-set-high-availability",
            collapsible: true,
            items: [
              {
                label: "Elections",
                contentSite: "docs",
                url: "/docs/:version/core/replica-set-elections",
              },
              {
                label: "Failover Rollbacks",
                contentSite: "docs",
                url: "/docs/:version/core/replica-set-rollbacks",
              },
            ],
          },
          {
            label: "Read & Write Semantics",
            contentSite: "docs",
            url: "/docs/:version/applications/replication",
            collapsible: true,
            items: [
              {
                label: "Write Concern",
                contentSite: "docs",
                url: "/docs/:version/core/replica-set-write-concern",
              },
              {
                label: "Read Preference",
                contentSite: "docs",
                url: "/docs/:version/core/read-preference",
                collapsible: true,
                items: [
                  {
                    label: "Use Cases",
                    contentSite: "docs",
                    url: "/docs/:version/core/read-preference-use-cases",
                  },
                  {
                    label: "Tag Sets",
                    contentSite: "docs",
                    url: "/docs/:version/core/read-preference-tags",
                  },
                  {
                    label: "Configure Tag Sets",
                    contentSite: "docs",
                    url: "/docs/:version/tutorial/configure-replica-set-tag-sets",
                  },
                  {
                    label: "maxStalenessSeconds",
                    contentSite: "docs",
                    url: "/docs/:version/core/read-preference-staleness",
                  },
                ],
              },
              {
                label: "Server Selection Algorithm",
                contentSite: "docs",
                url: "/docs/:version/core/read-preference-mechanics",
              },
            ],
          },
          {
            label: "Troubleshoot",
            contentSite: "docs",
            url: "/docs/:version/tutorial/troubleshoot-replica-sets",
          },
          {
            label: "local Database",
            contentSite: "docs",
            url: "/docs/:version/reference/local-database",
          },
        ],
      },
      {
        label: "Sharding",
        contentSite: "docs",
        url: "/docs/:version/sharding",
        collapsible: true,
        items: [
          {
            label: "Sharded Cluster Components",
            contentSite: "docs",
            url: "/docs/:version/core/sharded-cluster-components",
            collapsible: true,
            items: [
              {
                label: "Shards",
                contentSite: "docs",
                url: "/docs/:version/core/sharded-cluster-shards",
              },
              {
                label: "Config Servers (metadata)",
                contentSite: "docs",
                url: "/docs/:version/core/sharded-cluster-config-servers",
              },
              {
                label: "Router (mongos)",
                contentSite: "docs",
                url: "/docs/:version/core/sharded-cluster-query-router",
              },
            ],
          },
          {
            label: "Shard Keys",
            contentSite: "docs",
            url: "/docs/:version/core/sharding-shard-key",
            collapsible: true,
            items: [
              {
                label: "Shard a Collection",
                contentSite: "docs",
                url: "/docs/:version/core/sharding-shard-a-collection",
              },
              {
                label: "Choose Shard Key",
                contentSite: "docs",
                url: "/docs/:version/core/sharding-choose-a-shard-key",
              },
              {
                label: "Change Shard Key",
                contentSite: "docs",
                url: "/docs/:version/core/sharding-change-a-shard-key",
                collapsible: true,
                items: [
                  {
                    label: "Refine a Shard Key",
                    contentSite: "docs",
                    url: "/docs/:version/core/sharding-refine-a-shard-key",
                  },
                  {
                    label: "Reshard a Collection",
                    contentSite: "docs",
                    url: "/docs/:version/core/sharding-reshard-a-collection",
                  },
                ],
              },
              {
                label: "Change Shard Key Value",
                contentSite: "docs",
                url: "/docs/:version/core/sharding-change-shard-key-value",
              },
              {
                label: "Set Missing Key Fields",
                contentSite: "docs",
                url: "/docs/:version/core/sharding-set-missing-shard-key-fields",
              },
              {
                label: "Find a Shard Key",
                contentSite: "docs",
                url: "/docs/:version/core/sharding-find-shard-key",
              },
              {
                label: "Troubleshoot",
                contentSite: "docs",
                url: "/docs/:version/core/sharding-troubleshooting-shard-keys",
              },
            ],
          },
          {
            label: "Hashed Sharding",
            contentSite: "docs",
            url: "/docs/:version/core/hashed-sharding",
          },
          {
            label: "Ranged Sharding",
            contentSite: "docs",
            url: "/docs/:version/core/ranged-sharding",
          },
          {
            label: "Zones",
            contentSite: "docs",
            url: "/docs/:version/core/zone-sharding",
            collapsible: true,
            items: [
              {
                label: "Manage",
                contentSite: "docs",
                url: "/docs/:version/tutorial/manage-shard-zone",
                collapsible: true,
                items: [
                  {
                    label: "Update Shard Zone",
                    contentSite: "docs",
                    url: "/docs/:version/tutorial/manage-shard-zone/update-existing-shard-zone",
                  },
                ],
              },
              {
                label: "Segment by Location",
                contentSite: "docs",
                url: "/docs/:version/tutorial/sharding-segmenting-data-by-location",
              },
              {
                label: "Segment by Application or Customer",
                contentSite: "docs",
                url: "/docs/:version/tutorial/sharding-segmenting-shards",
              },
              {
                label: "Distributed Local Writes for Insert-Only Workloads",
                contentSite: "docs",
                url: "/docs/:version/tutorial/sharding-high-availability-writes",
              },
              {
                label: "Distribute Collections",
                contentSite: "docs",
                url: "/docs/:version/tutorial/sharding-distribute-collections-with-zones",
              },
            ],
          },
          {
            label: "Data Partitioning",
            contentSite: "docs",
            url: "/docs/:version/core/sharding-data-partitioning",
            collapsible: true,
            items: [
              {
                label: "Create Ranges",
                contentSite: "docs",
                url: "/docs/:version/tutorial/create-chunks-in-sharded-cluster",
              },
              {
                label: "Split Chunks",
                contentSite: "docs",
                url: "/docs/:version/tutorial/split-chunks-in-sharded-cluster",
              },
              {
                label: "Merge Chunks",
                contentSite: "docs",
                url: "/docs/:version/tutorial/merge-chunks-in-sharded-cluster",
              },
              {
                label: "Modify Range Size",
                contentSite: "docs",
                url: "/docs/:version/tutorial/modify-chunk-size-in-sharded-cluster",
              },
              {
                label: "Moveable Collections",
                contentSite: "docs",
                url: "/docs/:version/core/moveable-collections",
                collapsible: true,
                items: [
                  {
                    label: "Move a Collection",
                    contentSite: "docs",
                    url: "/docs/:version/tutorial/move-a-collection",
                  },
                  {
                    label: "Multi-Tenant Architecture",
                    contentSite: "docs",
                    url: "/docs/:version/core/moveable-collections/multi-tenant",
                  },
                  {
                    label: "Stop Moving a Collection",
                    contentSite: "docs",
                    url: "/docs/:version/tutorial/stop-moving-a-collection",
                  },
                ],
              },
            ],
          },
          {
            label: "Balancer",
            contentSite: "docs",
            url: "/docs/:version/core/sharding-balancer-administration",
            collapsible: true,
            items: [
              {
                label: "Manage",
                contentSite: "docs",
                url: "/docs/:version/tutorial/manage-sharded-cluster-balancer",
              },
              {
                label: "Migrate Ranges",
                contentSite: "docs",
                url: "/docs/:version/tutorial/migrate-chunks-in-sharded-cluster",
              },
              {
                label: "The AutoMerger",
                contentSite: "docs",
                url: "/docs/:version/core/automerger-concept",
              },
            ],
          },
          {
            label: "Administration",
            contentSite: "docs",
            url: "/docs/:version/administration/sharded-cluster-administration",
            collapsible: true,
            items: [
              {
                label: "Scaling Strategies",
                contentSite: "docs",
                url: "/docs/:version/core/sharding-scaling-strategies",
                collapsible: true,
                items: [
                  {
                    label: "Start with Sharded Clusters",
                    contentSite: "docs",
                    url: "/docs/:version/core/sharding-start-with-sharding",
                  },
                  {
                    label: "Manage Unsharded Collections",
                    contentSite: "docs",
                    url: "/docs/:version/core/sharding-manage-unsharded-collections",
                  },
                  {
                    label: "Distribute Collection Data",
                    contentSite: "docs",
                    url: "/docs/:version/core/sharding-distribute-collection-data",
                  },
                  {
                    label: "Consolidate Collection Data",
                    contentSite: "docs",
                    url: "/docs/:version/core/sharding-consolidate-collection-data",
                  },
                ],
              },
              {
                label: "View Cluster Configuration",
                contentSite: "docs",
                url: "/docs/:version/tutorial/view-sharded-cluster-configuration",
              },
              {
                label: "Add Shards",
                contentSite: "docs",
                url: "/docs/:version/tutorial/add-shards-to-shard-cluster",
              },
              {
                label: "Add a Member to a Shard",
                contentSite: "docs",
                url: "/docs/:version/tutorial/add-member-to-shard",
              },
              {
                label: "Remove Shards",
                contentSite: "docs",
                url: "/docs/:version/tutorial/remove-shards-from-cluster",
              },
              {
                label: "Unsharded Collections",
                contentSite: "docs",
                url: "/docs/:version/core/unsharded-collections",
                collapsible: true,
                items: [
                  {
                    label: "Unshard a Collection",
                    contentSite: "docs",
                    url: "/docs/:version/tutorial/unshard-collection",
                  },
                  {
                    label: "Stop Unsharding a Collection",
                    contentSite: "docs",
                    url: "/docs/:version/tutorial/stop-unsharding-collection",
                  },
                ],
              },
              {
                label: "Clear jumbo Flag",
                contentSite: "docs",
                url: "/docs/:version/tutorial/clear-jumbo-flag",
              },
              {
                label: "Drop Hashed Shard Key Index",
                contentSite: "docs",
                url: "/docs/:version/tutorial/drop-a-hashed-shard-key-index",
              },
              {
                label: "Config Shard",
                contentSite: "docs",
                url: "/docs/:version/core/config-shard",
                collapsible: true,
                items: [
                  {
                    label:
                      "Convert a Replica Set to a Sharded Cluster with an Embedded Config Server",
                    contentSite: "docs",
                    url: "/docs/:version/tutorial/convert-replica-set-to-embedded-config-server",
                  },
                ],
              },
              {
                label: "Start with a Config Shard",
                contentSite: "docs",
                url: "/docs/:version/tutorial/start-a-sharded-cluster-with-config-shard",
              },
              {
                label: "Reshard to the Same Shard Key",
                contentSite: "docs",
                url: "/docs/:version/core/reshard-to-same-key",
              },
              {
                label: "Reshard a Collection back to the Same Shard Key",
                contentSite: "docs",
                url: "/docs/:version/tutorial/resharding-back-to-same-key",
              },
              {
                label: "Resharding for Adding and Removing Shards",
                contentSite: "docs",
                url: "/docs/:version/tutorial/resharding-for-adding-and-removing-shards",
              },
            ],
          },
          {
            label: "Reference",
            contentSite: "docs",
            url: "/docs/:version/reference/sharding",
            collapsible: true,
            items: [
              {
                label: "Config Database",
                contentSite: "docs",
                url: "/docs/:version/reference/config-database",
              },
              {
                label: "Defragment Sharded Collections",
                contentSite: "docs",
                url: "/docs/:version/core/defragment-sharded-collections",
                collapsible: true,
                items: [
                  {
                    label: "Start",
                    contentSite: "docs",
                    url: "/docs/:version/core/defragment-sharded-collections/start-defragmenting-sharded-collection",
                  },
                  {
                    label: "Monitor",
                    contentSite: "docs",
                    url: "/docs/:version/core/defragment-sharded-collections/monitor-defragmentation-sharded-collection",
                  },
                  {
                    label: "Stop",
                    contentSite: "docs",
                    url: "/docs/:version/core/defragment-sharded-collections/stop-defragmenting-sharded-collection",
                  },
                ],
              },
              {
                label: "Inconsistency Types",
                contentSite: "docs",
                url: "/docs/:version/reference/inconsistency-type",
                collapsible: true,
                items: [
                  {
                    label: "CollectionAuxiliaryMetadataMismatch",
                    contentSite: "docs",
                    url: "/docs/:version/reference/inconsistency-type/CollectionAuxiliaryMetadataMismatch",
                  },
                  {
                    label: "CollectionOptionsMismatch",
                    contentSite: "docs",
                    url: "/docs/:version/reference/inconsistency-type/CollectionOptionsMismatch",
                  },
                  {
                    label: "CollectionUUIDMismatch",
                    contentSite: "docs",
                    url: "/docs/:version/reference/inconsistency-type/CollectionUUIDMismatch",
                  },
                  {
                    label: "CorruptedChunkShardKey",
                    contentSite: "docs",
                    url: "/docs/:version/reference/inconsistency-type/CorruptedChunkShardKey",
                  },
                  {
                    label: "CorruptedZoneShardKey",
                    contentSite: "docs",
                    url: "/docs/:version/reference/inconsistency-type/CorruptedZoneShardKey",
                  },
                  {
                    label: "HiddenShardedCollection",
                    contentSite: "docs",
                    url: "/docs/:version/reference/inconsistency-type/HiddenShardedCollection",
                  },
                  {
                    label: "InconsistentIndex",
                    contentSite: "docs",
                    url: "/docs/:version/reference/inconsistency-type/InconsistentIndex",
                  },
                  {
                    label: "MisplacedCollection",
                    contentSite: "docs",
                    url: "/docs/:version/reference/inconsistency-type/MisplacedCollection",
                  },
                  {
                    label: "MissingLocalCollection",
                    contentSite: "docs",
                    url: "/docs/:version/reference/inconsistency-type/MissingLocalCollection",
                  },
                  {
                    label: "MissingRoutingTable",
                    contentSite: "docs",
                    url: "/docs/:version/reference/inconsistency-type/MissingRoutingTable",
                  },
                  {
                    label: "MissingShardKeyIndex",
                    contentSite: "docs",
                    url: "/docs/:version/reference/inconsistency-type/MissingShardKeyIndex",
                  },
                  {
                    label: "RoutingTableMissingMaxKey",
                    contentSite: "docs",
                    url: "/docs/:version/reference/inconsistency-type/RoutingTableMissingMaxKey",
                  },
                  {
                    label: "RoutingTableMissingMinKey",
                    contentSite: "docs",
                    url: "/docs/:version/reference/inconsistency-type/RoutingTableMissingMinKey",
                  },
                  {
                    label: "RoutingTableRangeGap",
                    contentSite: "docs",
                    url: "/docs/:version/reference/inconsistency-type/RoutingTableRangeGap",
                  },
                  {
                    label: "RoutingTableRangeOverlap",
                    contentSite: "docs",
                    url: "/docs/:version/reference/inconsistency-type/RoutingTableRangeOverlap",
                  },
                  {
                    label: "ShardMissingCollectionRoutingInfo",
                    contentSite: "docs",
                    url: "/docs/:version/reference/inconsistency-type/ShardMissingCollectionRoutingInfo",
                  },
                  {
                    label: "TrackedUnshardedCollectionHasInvalidKey",
                    contentSite: "docs",
                    url: "/docs/:version/reference/inconsistency-type/TrackedUnshardedCollectionHasInvalidKey",
                  },
                  {
                    label: "TrackedUnshardedCollectionHasMultipleChunks",
                    contentSite: "docs",
                    url: "/docs/:version/reference/inconsistency-type/TrackedUnshardedCollectionHasMultipleChunks",
                  },
                  {
                    label: "ZonesRangeOverlap",
                    contentSite: "docs",
                    url: "/docs/:version/reference/inconsistency-type/ZonesRangeOverlap",
                  },
                ],
              },
              {
                label: "Operational Restrictions",
                contentSite: "docs",
                url: "/docs/:version/core/sharded-cluster-requirements",
              },
              {
                label: "Troubleshoot Sharded Clusters",
                contentSite: "docs",
                url: "/docs/:version/tutorial/troubleshoot-sharded-clusters",
              },
              {
                label: "Shard Direct Commands",
                contentSite: "docs",
                url: "/docs/:version/reference/supported-shard-direct-commands",
              },
            ],
          },
        ],
      },
      {
        label: "Storage",
        contentSite: "docs",
        url: "/docs/:version/storage",
        collapsible: true,
        items: [
          {
            label: "WiredTiger",
            contentSite: "docs",
            url: "/docs/:version/core/wiredtiger",
          },
          {
            label: "Journaling",
            contentSite: "docs",
            url: "/docs/:version/core/journaling",
          },
        ],
      },
      {
        label: "Administration",
        contentSite: "docs",
        url: "/docs/:version/administration",
        collapsible: true,
        items: [
          {
            label: "Development Checklist",
            contentSite: "docs",
            url: "/docs/:version/administration/production-checklist-development",
          },
          {
            label: "Performance",
            contentSite: "docs",
            url: "/docs/:version/administration/analyzing-mongodb-performance",
            collapsible: true,
            items: [
              {
                label: "Connection Pool",
                contentSite: "docs",
                url: "/docs/:version/administration/connection-pool-overview",
                collapsible: true,
                items: [
                  {
                    label: "Tuning",
                    contentSite: "docs",
                    url: "/docs/:version/tutorial/connection-pool-performance-tuning",
                  },
                ],
              },
              {
                label: "Performance Tuning",
                contentSite: "docs",
                url: "/docs/:version/administration/performance-tuning",
              },
            ],
          },
          {
            label: "Management",
            contentSite: "docs",
            url: "/docs/:version/administration/configuration-and-maintenance",
            collapsible: true,
            items: [
              {
                label: "Terminate Operations",
                contentSite: "docs",
                url: "/docs/:version/tutorial/terminate-running-operations",
              },
              {
                label: "Rotate Log Files",
                contentSite: "docs",
                url: "/docs/:version/tutorial/rotate-log-files",
              },
            ],
          },
          {
            label: "Data Center Awareness",
            contentSite: "docs",
            url: "/docs/:version/data-center-awareness",
            collapsible: true,
            items: [
              {
                label: "Workload Isolation",
                contentSite: "docs",
                url: "/docs/:version/core/workload-isolation",
              },
            ],
          },
        ],
      },
      {
        label: "Security",
        contentSite: "docs",
        url: "/docs/:version/security",
        collapsible: true,
        items: [
          {
            label: "Database Users",
            contentSite: "docs",
            url: "/docs/:version/reference/database-users",
            collapsible: true,
            items: [
              {
                label: "Built-In Roles",
                contentSite: "docs",
                url: "/docs/:version/reference/built-in-roles",
              },
              {
                label: "Privilege Actions",
                contentSite: "docs",
                url: "/docs/:version/reference/privilege-actions",
              },
              {
                label: "Non-Root User Permissions",
                contentSite: "docs",
                url: "/docs/:version/reference/non-root-user-permissions",
              },
            ],
          },
          {
            label: "SCRAM",
            contentSite: "docs",
            url: "/docs/:version/core/security-scram",
            collapsible: true,
            items: [
              {
                label: "Authenticate Clients",
                contentSite: "docs",
                url: "/docs/:version/tutorial/configure-scram-client-authentication",
              },
            ],
          },
          {
            label: "x.509",
            contentSite: "docs",
            url: "/docs/:version/core/security-x.509",
            collapsible: true,
            items: [
              {
                label: "Authenticate Clients",
                contentSite: "docs",
                url: "/docs/:version/tutorial/configure-x509-client-authentication",
              },
            ],
          },
          {
            label: "Encryption",
            contentSite: "docs",
            url: "/docs/:version/core/security-data-encryption",
            collapsible: true,
            items: [
              {
                label: "In-Use Encryption",
                contentSite: "docs",
                url: "/docs/:version/core/security-in-use-encryption",
                collapsible: true,
                items: [
                  {
                    label: "Comparing Approaches",
                    contentSite: "docs",
                    url: "/docs/:version/core/queryable-encryption/about-qe-csfle",
                    collapsible: true,
                    items: [
                      {
                        label: "Queryable Encryption Limitations",
                        contentSite: "docs",
                        url: "/docs/:version/core/queryable-encryption/reference/limitations",
                      },
                      {
                        label: "CSFLE Limitations",
                        contentSite: "docs",
                        url: "/docs/:version/core/csfle/reference/limitations",
                      },
                    ],
                  },
                  {
                    label: "Compatibility",
                    contentSite: "docs",
                    url: "/docs/:version/core/queryable-encryption/reference/compatibility",
                  },
                  {
                    label: "Keys and Key Vaults",
                    contentSite: "docs",
                    url: "/docs/:version/core/queryable-encryption/fundamentals/keys-key-vaults",
                    collapsible: true,
                    items: [
                      {
                        label: "KMS Providers",
                        contentSite: "docs",
                        url: "/docs/:version/core/queryable-encryption/fundamentals/kms-providers",
                      },
                    ],
                  },
                  {
                    label: "Queryable Encryption",
                    contentSite: "docs",
                    url: "/docs/:version/core/queryable-encryption",
                    collapsible: true,
                    items: [
                      {
                        label: "Features",
                        contentSite: "docs",
                        url: "/docs/:version/core/queryable-encryption/features",
                      },
                      {
                        label: "Quick Start",
                        contentSite: "docs",
                        url: "/docs/:version/core/queryable-encryption/quick-start",
                      },
                      {
                        label: "Fundamentals",
                        contentSite: "docs",
                        url: "/docs/:version/core/queryable-encryption/fundamentals",
                        collapsible: true,
                        items: [
                          {
                            label: "Fields & Queries",
                            contentSite: "docs",
                            url: "/docs/:version/core/queryable-encryption/fundamentals/encrypt-and-query",
                          },
                          {
                            label: "Create a Schema",
                            contentSite: "docs",
                            url: "/docs/:version/core/queryable-encryption/qe-create-encryption-schema",
                          },
                          {
                            label: "Encrypt Collections at Creation",
                            contentSite: "docs",
                            url: "/docs/:version/core/queryable-encryption/fundamentals/enable-qe",
                          },
                          {
                            label: "Collections",
                            contentSite: "docs",
                            url: "/docs/:version/core/queryable-encryption/fundamentals/manage-collections",
                          },
                          {
                            label: "Explicit Encryption",
                            contentSite: "docs",
                            url: "/docs/:version/core/queryable-encryption/fundamentals/manual-encryption",
                          },
                          {
                            label: "Manage Keys",
                            contentSite: "docs",
                            url: "/docs/:version/core/queryable-encryption/fundamentals/manage-keys",
                          },
                        ],
                      },
                      {
                        label: "Tutorials",
                        contentSite: "docs",
                        url: "/docs/:version/core/queryable-encryption/tutorials",
                        collapsible: true,
                        items: [
                          {
                            label: "Enable",
                            contentSite: "docs",
                            url: "/docs/:version/core/queryable-encryption/overview-enable-qe",
                            collapsible: true,
                            items: [
                              {
                                label: "Install a Driver",
                                contentSite: "docs",
                                url: "/docs/:version/core/queryable-encryption/install",
                              },
                              {
                                label: "Install libmongocrypt",
                                contentSite: "docs",
                                url: "/docs/:version/core/queryable-encryption/reference/libmongocrypt",
                              },
                              {
                                label:
                                  "Install and Configure a Query Analysis Component",
                                contentSite: "docs",
                                url: "/docs/:version/core/queryable-encryption/install-library",
                              },
                              {
                                label: "Create a Customer Master Key",
                                contentSite: "docs",
                                url: "/docs/:version/core/queryable-encryption/qe-create-cmk",
                              },
                              {
                                label: "Create an Application",
                                contentSite: "docs",
                                url: "/docs/:version/core/queryable-encryption/qe-create-application",
                              },
                            ],
                          },
                          {
                            label: "Create & Query",
                            contentSite: "docs",
                            url: "/docs/:version/core/queryable-encryption/overview-use-qe",
                            collapsible: true,
                            items: [
                              {
                                label: "Create a Collection",
                                contentSite: "docs",
                                url: "/docs/:version/core/queryable-encryption/qe-create-encrypted-collection",
                              },
                              {
                                label: "Query",
                                contentSite: "docs",
                                url: "/docs/:version/core/queryable-encryption/qe-retrieve-encrypted-document",
                              },
                            ],
                          },
                          {
                            label: "Use Explicit Encryption",
                            contentSite: "docs",
                            url: "/docs/:version/core/queryable-encryption/tutorials/explicit-encryption",
                          },
                        ],
                      },
                      {
                        label: "Reference",
                        contentSite: "docs",
                        url: "/docs/:version/core/queryable-encryption/reference",
                        collapsible: true,
                        items: [
                          {
                            label: "Supported Operations",
                            contentSite: "docs",
                            url: "/docs/:version/core/queryable-encryption/reference/supported-operations",
                          },
                          {
                            label: "MongoClient Options",
                            contentSite: "docs",
                            url: "/docs/:version/core/queryable-encryption/reference/qe-options-clients",
                          },
                        ],
                      },
                    ],
                  },
                  {
                    label: "Client-Side Field Level Encryption",
                    contentSite: "docs",
                    url: "/docs/:version/core/csfle",
                    collapsible: true,
                    items: [
                      {
                        label: "Features",
                        contentSite: "docs",
                        url: "/docs/:version/core/csfle/features",
                      },
                      {
                        label: "Installation",
                        contentSite: "docs",
                        url: "/docs/:version/core/csfle/install",
                      },
                      {
                        label: "Quick Start",
                        contentSite: "docs",
                        url: "/docs/:version/core/csfle/quick-start",
                      },
                      {
                        label: "Fundamentals",
                        contentSite: "docs",
                        url: "/docs/:version/core/csfle/fundamentals",
                        collapsible: true,
                        items: [
                          {
                            label: "Automatic Encryption",
                            contentSite: "docs",
                            url: "/docs/:version/core/csfle/fundamentals/automatic-encryption",
                          },
                          {
                            label: "Explicit Encryption",
                            contentSite: "docs",
                            url: "/docs/:version/core/csfle/fundamentals/manual-encryption",
                          },
                          {
                            label: "Schemas",
                            contentSite: "docs",
                            url: "/docs/:version/core/csfle/fundamentals/create-schema",
                          },
                          {
                            label: "Key Management",
                            contentSite: "docs",
                            url: "/docs/:version/core/csfle/fundamentals/manage-keys",
                          },
                          {
                            label: "Field & Encryption Types",
                            contentSite: "docs",
                            url: "/docs/:version/core/csfle/fundamentals/encryption-algorithms",
                          },
                        ],
                      },
                      {
                        label: "Tutorials",
                        contentSite: "docs",
                        url: "/docs/:version/core/csfle/tutorials",
                        collapsible: true,
                        items: [
                          {
                            label: "Use AWS",
                            contentSite: "docs",
                            url: "/docs/:version/core/csfle/tutorials/aws/aws-automatic",
                          },
                          {
                            label: "Use Azure",
                            contentSite: "docs",
                            url: "/docs/:version/core/csfle/tutorials/azure/azure-automatic",
                          },
                          {
                            label: "Use GCP",
                            contentSite: "docs",
                            url: "/docs/:version/core/csfle/tutorials/gcp/gcp-automatic",
                          },
                          {
                            label: "Use KMIP",
                            contentSite: "docs",
                            url: "/docs/:version/core/csfle/tutorials/kmip/kmip-automatic",
                          },
                        ],
                      },
                      {
                        label: "Reference",
                        contentSite: "docs",
                        url: "/docs/:version/core/csfle/reference",
                        collapsible: true,
                        items: [
                          {
                            label: "Schemas",
                            contentSite: "docs",
                            url: "/docs/:version/core/csfle/reference/encryption-schemas",
                          },
                          {
                            label: "Schema Enforcement",
                            contentSite: "docs",
                            url: "/docs/:version/core/csfle/reference/server-side-schema",
                          },
                          {
                            label: "Supported Operations",
                            contentSite: "docs",
                            url: "/docs/:version/core/csfle/reference/supported-operations",
                          },
                          {
                            label: "MongoClient Options",
                            contentSite: "docs",
                            url: "/docs/:version/core/csfle/reference/csfle-options-clients",
                          },
                          {
                            label: "Components",
                            contentSite: "docs",
                            url: "/docs/:version/core/csfle/reference/encryption-components",
                          },
                          {
                            label: "Decryption",
                            contentSite: "docs",
                            url: "/docs/:version/core/csfle/reference/decryption",
                          },
                          {
                            label: "Cryptography",
                            contentSite: "docs",
                            url: "/docs/:version/core/csfle/reference/cryptographic-primitives",
                          },
                          {
                            label:
                              "Install and Configure a CSFLE Query Analysis Component",
                            contentSite: "docs",
                            url: "/docs/:version/core/csfle/reference/install-library",
                          },
                          {
                            label: "Use libmongocrypt",
                            contentSite: "docs",
                            url: "/docs/:version/core/csfle/reference/libmongocrypt",
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
              {
                label: "Encryption at Rest",
                contentSite: "docs",
                url: "/docs/:version/core/security-encryption-at-rest",
                collapsible: true,
                items: [
                  {
                    label: "Configure",
                    contentSite: "docs",
                    url: "/docs/:version/tutorial/configure-encryption",
                  },
                  {
                    label: "Rotate Keys",
                    contentSite: "docs",
                    url: "/docs/:version/tutorial/rotate-encryption-key",
                  },
                ],
              },
              {
                label: "TLS/SSL",
                contentSite: "docs",
                url: "/docs/:version/core/security-transport-encryption",
                collapsible: true,
                items: [
                  {
                    label: "Configure mongod & mongos",
                    contentSite: "docs",
                    url: "/docs/:version/tutorial/configure-ssl",
                  },
                  {
                    label: "Configure Clients",
                    contentSite: "docs",
                    url: "/docs/:version/tutorial/configure-ssl-clients",
                  },
                  {
                    label: "Upgrade Cluster",
                    contentSite: "docs",
                    url: "/docs/:version/tutorial/upgrade-cluster-to-ssl",
                  },
                  {
                    label: "Configure for FIPS",
                    contentSite: "docs",
                    url: "/docs/:version/tutorial/configure-fips",
                  },
                ],
              },
            ],
          },
          {
            label: "Auditing",
            contentSite: "docs",
            url: "/docs/:version/core/auditing",
            collapsible: true,
            items: [
              {
                label: "Configure",
                contentSite: "docs",
                url: "/docs/:version/tutorial/configure-auditing",
              },
              {
                label: "Configure Filters",
                contentSite: "docs",
                url: "/docs/:version/tutorial/configure-audit-filters",
              },
              {
                label: "Audit Messages",
                contentSite: "docs",
                url: "/docs/:version/reference/audit-message",
                collapsible: true,
                items: [
                  {
                    label: "mongo Schema",
                    contentSite: "docs",
                    url: "/docs/:version/reference/audit-message/mongo",
                  },
                  {
                    label: "OSCF Schema",
                    contentSite: "docs",
                    url: "/docs/:version/reference/audit-message/ocsf",
                  },
                ],
              },
            ],
          },
          {
            label: "Use Field Level Redaction",
            contentSite: "docs",
            url: "/docs/:version/tutorial/implement-field-level-redaction",
          },
          {
            label: "Create a Vulnerability Report",
            contentSite: "docs",
            url: "/docs/:version/tutorial/create-a-vulnerability-report",
          },
        ],
      },
      {
        label: "Self-Managed Deployments",
        contentSite: "docs",
        url: "/docs/:version/self-managed-deployments",
        collapsible: true,
        items: [
          {
            label: "Install",
            contentSite: "docs",
            url: "/docs/:version/installation",
            collapsible: true,
            items: [
              {
                label: "Community Edition",
                contentSite: "docs",
                url: "/docs/:version/administration/install-community",
                collapsible: true,
                items: [
                  {
                    label: "Install on Linux",
                    contentSite: "docs",
                    url: "/docs/:version/administration/install-on-linux",
                    collapsible: true,
                    items: [
                      {
                        label: "Install on Red Hat",
                        contentSite: "docs",
                        url: "/docs/:version/tutorial/install-mongodb-on-red-hat",
                        collapsible: true,
                        items: [
                          {
                            label: "Install using .tgz Tarball",
                            contentSite: "docs",
                            url: "/docs/:version/tutorial/install-mongodb-on-red-hat-tarball",
                          },
                        ],
                      },
                      {
                        label: "Install on Ubuntu",
                        contentSite: "docs",
                        url: "/docs/:version/tutorial/install-mongodb-on-ubuntu",
                        collapsible: true,
                        items: [
                          {
                            label: "Install using .tgz Tarball",
                            contentSite: "docs",
                            url: "/docs/:version/tutorial/install-mongodb-on-ubuntu-tarball",
                          },
                          {
                            label: "Troubleshoot Ubuntu Installation",
                            contentSite: "docs",
                            url: "/docs/:version/reference/installation-ubuntu-community-troubleshooting",
                          },
                        ],
                      },
                      {
                        label: "Install on Debian",
                        contentSite: "docs",
                        url: "/docs/:version/tutorial/install-mongodb-on-debian",
                        collapsible: true,
                        items: [
                          {
                            label: "Install using .tgz Tarball",
                            contentSite: "docs",
                            url: "/docs/:version/tutorial/install-mongodb-on-debian-tarball",
                          },
                        ],
                      },
                      {
                        label: "Install on SUSE",
                        contentSite: "docs",
                        url: "/docs/:version/tutorial/install-mongodb-on-suse",
                        collapsible: true,
                        items: [
                          {
                            label: "Install using .tgz Tarball",
                            contentSite: "docs",
                            url: "/docs/:version/tutorial/install-mongodb-on-suse-tarball",
                          },
                        ],
                      },
                      {
                        label: "Install on Amazon",
                        contentSite: "docs",
                        url: "/docs/:version/tutorial/install-mongodb-on-amazon",
                        collapsible: true,
                        items: [
                          {
                            label: "Install using .tgz Tarball",
                            contentSite: "docs",
                            url: "/docs/:version/tutorial/install-mongodb-on-amazon-tarball",
                          },
                        ],
                      },
                    ],
                  },
                  {
                    label: "Install on macOS",
                    contentSite: "docs",
                    url: "/docs/:version/tutorial/install-mongodb-on-os-x",
                    collapsible: true,
                    items: [
                      {
                        label: "Install using .tgz Tarball",
                        contentSite: "docs",
                        url: "/docs/:version/tutorial/install-mongodb-on-os-x-tarball",
                      },
                    ],
                  },
                  {
                    label: "Install on Windows",
                    contentSite: "docs",
                    url: "/docs/:version/tutorial/install-mongodb-on-windows",
                    collapsible: true,
                    items: [
                      {
                        label: "Install using msiexec.exe",
                        contentSite: "docs",
                        url: "/docs/:version/tutorial/install-mongodb-on-windows-unattended",
                      },
                    ],
                  },
                  {
                    label: "Install with Docker",
                    contentSite: "docs",
                    url: "/docs/:version/tutorial/install-mongodb-community-with-docker",
                  },
                ],
              },
              {
                label: "Enterprise",
                contentSite: "docs",
                url: "/docs/:version/administration/install-enterprise",
                collapsible: true,
                items: [
                  {
                    label: "Install on Linux",
                    contentSite: "docs",
                    url: "/docs/:version/administration/install-enterprise-linux",
                    collapsible: true,
                    items: [
                      {
                        label: "Install on Red Hat",
                        contentSite: "docs",
                        url: "/docs/:version/tutorial/install-mongodb-enterprise-on-red-hat",
                        collapsible: true,
                        items: [
                          {
                            label: "Install using .tgz Tarball",
                            contentSite: "docs",
                            url: "/docs/:version/tutorial/install-mongodb-enterprise-on-red-hat-tarball",
                          },
                        ],
                      },
                      {
                        label: "Install on Ubuntu",
                        contentSite: "docs",
                        url: "/docs/:version/tutorial/install-mongodb-enterprise-on-ubuntu",
                        collapsible: true,
                        items: [
                          {
                            label: "Install using .tgz Tarball",
                            contentSite: "docs",
                            url: "/docs/:version/tutorial/install-mongodb-enterprise-on-ubuntu-tarball",
                          },
                        ],
                      },
                      {
                        label: "Install on Debian",
                        contentSite: "docs",
                        url: "/docs/:version/tutorial/install-mongodb-enterprise-on-debian",
                        collapsible: true,
                        items: [
                          {
                            label: "Install using .tgz Tarball",
                            contentSite: "docs",
                            url: "/docs/:version/tutorial/install-mongodb-enterprise-on-debian-tarball",
                          },
                        ],
                      },
                      {
                        label: "Install on SUSE",
                        contentSite: "docs",
                        url: "/docs/:version/tutorial/install-mongodb-enterprise-on-suse",
                        collapsible: true,
                        items: [
                          {
                            label: "Install using .tgz Tarball",
                            contentSite: "docs",
                            url: "/docs/:version/tutorial/install-mongodb-enterprise-on-suse-tarball",
                          },
                        ],
                      },
                      {
                        label: "Install on Amazon",
                        contentSite: "docs",
                        url: "/docs/:version/tutorial/install-mongodb-enterprise-on-amazon",
                        collapsible: true,
                        items: [
                          {
                            label: "Install using .tgz Tarball",
                            contentSite: "docs",
                            url: "/docs/:version/tutorial/install-mongodb-enterprise-on-amazon-tarball",
                          },
                        ],
                      },
                    ],
                  },
                  {
                    label: "Install on macOS",
                    contentSite: "docs",
                    url: "/docs/:version/tutorial/install-mongodb-enterprise-on-os-x",
                  },
                  {
                    label: "Install on Windows",
                    contentSite: "docs",
                    url: "/docs/:version/tutorial/install-mongodb-enterprise-on-windows",
                    collapsible: true,
                    items: [
                      {
                        label: "Install using msiexec.exe",
                        contentSite: "docs",
                        url: "/docs/:version/tutorial/install-mongodb-enterprise-on-windows-unattended",
                      },
                    ],
                  },
                  {
                    label: "Install with Docker",
                    contentSite: "docs",
                    url: "/docs/:version/tutorial/install-mongodb-enterprise-with-docker",
                  },
                ],
              },
              {
                label: "Upgrade Community to Enterprise",
                contentSite: "docs",
                url: "/docs/:version/administration/upgrade-community-to-enterprise",
                collapsible: true,
                items: [
                  {
                    label: "Standalone",
                    contentSite: "docs",
                    url: "/docs/:version/tutorial/upgrade-to-enterprise-standalone",
                  },
                  {
                    label: "Replica Set",
                    contentSite: "docs",
                    url: "/docs/:version/tutorial/upgrade-to-enterprise-replica-set",
                  },
                  {
                    label: "Sharded Cluster",
                    contentSite: "docs",
                    url: "/docs/:version/tutorial/upgrade-to-enterprise-sharded-cluster",
                  },
                ],
              },
              {
                label: "Verify Package Integrity",
                contentSite: "docs",
                url: "/docs/:version/tutorial/verify-mongodb-packages",
              },
              {
                label: "MongoDB Package Components",
                contentSite: "docs",
                url: "/docs/:version/reference/program",
                collapsible: true,
                items: [
                  {
                    label: "mongod",
                    contentSite: "docs",
                    url: "/docs/:version/reference/program/mongod",
                  },
                  {
                    label: "mongos",
                    contentSite: "docs",
                    url: "/docs/:version/reference/program/mongos",
                  },
                  {
                    label: "mongod.exe",
                    contentSite: "docs",
                    url: "/docs/:version/reference/program/mongod.exe",
                  },
                  {
                    label: "mongos.exe",
                    contentSite: "docs",
                    url: "/docs/:version/reference/program/mongos.exe",
                  },
                  {
                    label: "mongokerberos",
                    contentSite: "docs",
                    url: "/docs/:version/reference/program/mongokerberos",
                  },
                  {
                    label: "mongoldap",
                    contentSite: "docs",
                    url: "/docs/:version/reference/program/mongoldap",
                  },
                  {
                    label: "install_compass",
                    contentSite: "docs",
                    url: "/docs/:version/reference/program/install_compass",
                  },
                  {
                    label: "Database Tools",
                    contentSite: "database-tools",
                    url: "/docs/database-tools/",
                  },
                ],
              },
            ],
          },
          {
            label: "Deploy & Manage Replica Sets",
            contentSite: "docs",
            url: "/docs/:version/administration/deploy-manage-self-managed-replica-sets",
            collapsible: true,
            items: [
              {
                label: "Deploy",
                contentSite: "docs",
                url: "/docs/:version/administration/replica-set-deployment",
                collapsible: true,
                items: [
                  {
                    label: "Replica Set",
                    contentSite: "docs",
                    url: "/docs/:version/tutorial/deploy-replica-set",
                  },
                  {
                    label: "Convert to Replica Set",
                    contentSite: "docs",
                    url: "/docs/:version/tutorial/convert-standalone-to-replica-set",
                  },
                  {
                    label: "Add Members",
                    contentSite: "docs",
                    url: "/docs/:version/tutorial/expand-replica-set",
                  },
                  {
                    label: "Add an Arbiter",
                    contentSite: "docs",
                    url: "/docs/:version/tutorial/add-replica-set-arbiter",
                  },
                  {
                    label: "Remove Members",
                    contentSite: "docs",
                    url: "/docs/:version/tutorial/remove-replica-set-member",
                  },
                  {
                    label: "Replace a Member",
                    contentSite: "docs",
                    url: "/docs/:version/tutorial/replace-replica-set-member",
                  },
                  {
                    label: "Test & Development Replica Sets",
                    contentSite: "docs",
                    url: "/docs/:version/tutorial/deploy-replica-set-for-testing",
                  },
                  {
                    label: "Geographically Redundant Replica Sets",
                    contentSite: "docs",
                    url: "/docs/:version/tutorial/deploy-geographically-distributed-replica-set",
                  },
                ],
              },
              {
                label: "Configure",
                contentSite: "docs",
                url: "/docs/:version/administration/replica-set-member-configuration",
                collapsible: true,
                items: [
                  {
                    label: "Hidden Members",
                    contentSite: "docs",
                    url: "/docs/:version/tutorial/configure-a-hidden-replica-set-member",
                  },
                  {
                    label: "Delayed Members",
                    contentSite: "docs",
                    url: "/docs/:version/tutorial/configure-a-delayed-replica-set-member",
                  },
                  {
                    label: "Non-Voting Members",
                    contentSite: "docs",
                    url: "/docs/:version/tutorial/configure-a-non-voting-replica-set-member",
                  },
                  {
                    label: "Adjust Member Priority",
                    contentSite: "docs",
                    url: "/docs/:version/tutorial/adjust-replica-set-member-priority",
                  },
                  {
                    label: "Block Secondary Priority",
                    contentSite: "docs",
                    url: "/docs/:version/tutorial/configure-secondary-only-replica-set-member",
                  },
                  {
                    label: "Convert Secondary to Arbiter",
                    contentSite: "docs",
                    url: "/docs/:version/tutorial/convert-secondary-into-arbiter",
                  },
                ],
              },
              {
                label: "Maintain",
                contentSite: "docs",
                url: "/docs/:version/administration/replica-set-maintenance",
                collapsible: true,
                items: [
                  {
                    label: "Change Oplog Size",
                    contentSite: "docs",
                    url: "/docs/:version/tutorial/change-oplog-size",
                  },
                  {
                    label: "Maintain Member",
                    contentSite: "docs",
                    url: "/docs/:version/tutorial/perform-maintence-on-replica-set-members",
                  },
                  {
                    label: "Force a Primary",
                    contentSite: "docs",
                    url: "/docs/:version/tutorial/force-member-to-be-primary",
                  },
                  {
                    label: "Resync a Member",
                    contentSite: "docs",
                    url: "/docs/:version/tutorial/resync-replica-set-member",
                  },
                  {
                    label: "Configure Unavailable Members",
                    contentSite: "docs",
                    url: "/docs/:version/tutorial/reconfigure-replica-set-with-unavailable-members",
                  },
                  {
                    label: "Self-Managed Chained Replication",
                    contentSite: "docs",
                    url: "/docs/:version/tutorial/manage-chained-replication",
                  },
                  {
                    label: "Change Hostname",
                    contentSite: "docs",
                    url: "/docs/:version/tutorial/change-hostnames-in-a-replica-set",
                  },
                  {
                    label: "Configure Sync Target",
                    contentSite: "docs",
                    url: "/docs/:version/tutorial/configure-replica-set-secondary-sync-target",
                  },
                  {
                    label: "Rename",
                    contentSite: "docs",
                    url: "/docs/:version/tutorial/rename-unsharded-replica-set",
                  },
                  {
                    label: "Modify PSA",
                    contentSite: "docs",
                    url: "/docs/:version/tutorial/modify-psa-replica-set-safely",
                  },
                  {
                    label: "Mitigate Performance",
                    contentSite: "docs",
                    url: "/docs/:version/tutorial/mitigate-psa-performance-issues",
                  },
                ],
              },
              {
                label: "Reference",
                contentSite: "docs",
                url: "/docs/:version/reference/replication",
                collapsible: true,
                items: [
                  {
                    label: "Configuration",
                    contentSite: "docs",
                    url: "/docs/:version/reference/replica-configuration",
                  },
                  {
                    label: "Protocol Version",
                    contentSite: "docs",
                    url: "/docs/:version/reference/replica-set-protocol-versions",
                  },
                  {
                    label: "Member States",
                    contentSite: "docs",
                    url: "/docs/:version/reference/replica-states",
                  },
                ],
              },
            ],
          },
          {
            label: "Deploy & Manage Sharded Clusters",
            contentSite: "docs",
            url: "/docs/:version/administration/deploy-manage-self-managed-sharded-clusters",
            collapsible: true,
            items: [
              {
                label: "Deploy",
                contentSite: "docs",
                url: "/docs/:version/tutorial/deploy-shard-cluster",
                collapsible: true,
                items: [
                  {
                    label: "Tiered Hardware for Varying SLA or SLO",
                    contentSite: "docs",
                    url: "/docs/:version/tutorial/sharding-tiered-hardware-for-varying-slas",
                  },
                ],
              },
              {
                label: "Administration",
                contentSite: "docs",
                url: "/docs/:version/administration/self-managed-sharded-cluster-admin",
                collapsible: true,
                items: [
                  {
                    label: "Config Server Administration",
                    contentSite: "docs",
                    url: "/docs/:version/administration/sharded-cluster-config-servers",
                    collapsible: true,
                    items: [
                      {
                        label: "Replace a Self-Managed Config Server",
                        contentSite: "docs",
                        url: "/docs/:version/tutorial/replace-config-server",
                      },
                    ],
                  },
                  {
                    label: "Restart",
                    contentSite: "docs",
                    url: "/docs/:version/tutorial/restart-sharded-cluster",
                  },
                  {
                    label: "Migrate",
                    contentSite: "docs",
                    url: "/docs/:version/tutorial/migrate-sharded-cluster-to-new-hardware",
                  },
                  {
                    label: "Back Up Cluster Metadata",
                    contentSite: "docs",
                    url: "/docs/:version/tutorial/backup-sharded-cluster-metadata",
                  },
                  {
                    label: "Convert Sharded Cluster to Replica Set",
                    contentSite: "docs",
                    url: "/docs/:version/tutorial/convert-sharded-cluster-to-replica-set",
                  },
                  {
                    label: "Convert a Replica Set to a Sharded Cluster",
                    contentSite: "docs",
                    url: "/docs/:version/tutorial/convert-replica-set-to-replicated-shard-cluster",
                  },
                ],
              },
            ],
          },
          {
            label: "Storage",
            contentSite: "docs",
            url: "/docs/:version/core/self-managed-storage",
            collapsible: true,
            items: [
              {
                label: "Storage Engines",
                contentSite: "docs",
                url: "/docs/:version/core/storage-engines",
                collapsible: true,
                items: [
                  {
                    label: "WiredTiger",
                    contentSite: "docs",
                    url: "/docs/:version/core/self-managed-wiredtiger",
                    collapsible: true,
                    items: [
                      {
                        label: "Convert Standalone",
                        contentSite: "docs",
                        url: "/docs/:version/tutorial/change-standalone-wiredtiger",
                      },
                      {
                        label: "Convert Replica Set",
                        contentSite: "docs",
                        url: "/docs/:version/tutorial/change-replica-set-wiredtiger",
                      },
                      {
                        label: "Convert Sharded Cluster",
                        contentSite: "docs",
                        url: "/docs/:version/tutorial/change-sharded-cluster-wiredtiger",
                      },
                    ],
                  },
                  {
                    label: "In-Memory",
                    contentSite: "docs",
                    url: "/docs/:version/core/inmemory",
                  },
                ],
              },
              {
                label: "Manage Journaling",
                contentSite: "docs",
                url: "/docs/:version/tutorial/manage-journaling",
              },
              {
                label: "GridFS",
                contentSite: "docs",
                url: "/docs/:version/core/gridfs",
              },
              {
                label: "FAQ",
                contentSite: "docs",
                url: "/docs/:version/faq/storage",
              },
            ],
          },
          {
            label: "Administration",
            contentSite: "docs",
            url: "/docs/:version/administration/self-managed-administration",
            collapsible: true,
            items: [
              {
                label: "Production Notes",
                contentSite: "docs",
                url: "/docs/:version/administration/production-notes",
              },
              {
                label: "Operations Checklist",
                contentSite: "docs",
                url: "/docs/:version/administration/production-checklist-operations",
              },
              {
                label: "Performance",
                contentSite: "docs",
                url: "/docs/:version/administration/self-managed-performance",
                collapsible: true,
                items: [
                  {
                    label: "TCMalloc Performance",
                    contentSite: "docs",
                    url: "/docs/:version/administration/tcmalloc-performance",
                    collapsible: true,
                    items: [
                      {
                        label: "Disable Transparent Hugepages",
                        contentSite: "docs",
                        url: "/docs/:version/tutorial/disable-transparent-huge-pages",
                      },
                    ],
                  },
                  {
                    label: "Health Managers",
                    contentSite: "docs",
                    url: "/docs/:version/administration/health-managers",
                  },
                  {
                    label: "UNIX ulimit",
                    contentSite: "docs",
                    url: "/docs/:version/reference/ulimit",
                  },
                  {
                    label: "Full Time Diagnostic Data Capture",
                    contentSite: "docs",
                    url: "/docs/:version/administration/full-time-diagnostic-data-capture",
                  },
                ],
              },
              {
                label: "Configuration & Maintenance",
                contentSite: "docs",
                url: "/docs/:version/administration/self-managed-configuration-and-maintenance",
                collapsible: true,
                items: [
                  {
                    label: "Run-time Database Configuration",
                    contentSite: "docs",
                    url: "/docs/:version/administration/configuration",
                  },
                  {
                    label: "Upgrade to the Latest Patch Release",
                    contentSite: "docs",
                    url: "/docs/:version/tutorial/upgrade-revision",
                  },
                  {
                    label: "Manage mongod Processes",
                    contentSite: "docs",
                    url: "/docs/:version/tutorial/manage-mongodb-processes",
                  },
                  {
                    label: "Configuration File Options",
                    contentSite: "docs",
                    url: "/docs/:version/reference/configuration-options",
                    collapsible: true,
                    items: [
                      {
                        label: "Externally Sourced Values",
                        contentSite: "docs",
                        url: "/docs/:version/reference/expansion-directives",
                      },
                      {
                        label: "Convert Command-Line Options to YAML",
                        contentSite: "docs",
                        url: "/docs/:version/tutorial/convert-command-line-options-to-yaml",
                      },
                      {
                        label:
                          "Configuration File Settings and Command-Line Options Mapping",
                        contentSite: "docs",
                        url: "/docs/:version/reference/configuration-file-settings-command-line-options-mapping",
                      },
                    ],
                  },
                  {
                    label: "Server Parameters",
                    contentSite: "docs",
                    url: "/docs/:version/reference/parameters",
                  },
                  {
                    label: "Cluster Parameters",
                    contentSite: "docs",
                    url: "/docs/:version/reference/cluster-parameters",
                    collapsible: true,
                    items: [
                      {
                        label: "auditConfig",
                        contentSite: "docs",
                        url: "/docs/:version/reference/cluster-parameters/auditConfig",
                      },
                      {
                        label: "changeStreamOptions",
                        contentSite: "docs",
                        url: "/docs/:version/reference/cluster-parameters/changeStreamOptions",
                      },
                      {
                        label: "defaultMaxTimeMS",
                        contentSite: "docs",
                        url: "/docs/:version/reference/cluster-parameters/defaultMaxTimeMS",
                      },
                    ],
                  },
                ],
              },
              {
                label: "Backup Methods",
                contentSite: "docs",
                url: "/docs/:version/core/backups",
                collapsible: true,
                items: [
                  {
                    label: "Use Snapshots",
                    contentSite: "docs",
                    url: "/docs/:version/tutorial/backup-with-filesystem-snapshots",
                  },
                  {
                    label: "Use MongoDB Tools",
                    contentSite: "docs",
                    url: "/docs/:version/tutorial/backup-and-restore-tools",
                  },
                  {
                    label: "Restore Replica Set",
                    contentSite: "docs",
                    url: "/docs/:version/tutorial/restore-replica-set-from-backup",
                  },
                  {
                    label: "Restore Sharded Clusters",
                    contentSite: "docs",
                    url: "/docs/:version/administration/backup-sharded-clusters",
                    collapsible: true,
                    items: [
                      {
                        label: "Use Snapshots",
                        contentSite: "docs",
                        url: "/docs/:version/tutorial/backup-sharded-cluster-with-filesystem-snapshots",
                      },
                      {
                        label: "Use Database Dumps",
                        contentSite: "docs",
                        url: "/docs/:version/tutorial/backup-sharded-cluster-with-database-dumps",
                      },
                      {
                        label: "Schedule Backups",
                        contentSite: "docs",
                        url: "/docs/:version/tutorial/schedule-backup-window-for-sharded-clusters",
                      },
                      {
                        label: "Restore",
                        contentSite: "docs",
                        url: "/docs/:version/tutorial/restore-sharded-cluster",
                      },
                    ],
                  },
                  {
                    label: "Recover Standalone",
                    contentSite: "docs",
                    url: "/docs/:version/tutorial/recover-data-following-unexpected-shutdown",
                  },
                ],
              },
              {
                label: "Monitoring",
                contentSite: "docs",
                url: "/docs/:version/administration/monitoring",
                collapsible: true,
                items: [
                  {
                    label: "FAQ: Diagnostics",
                    contentSite: "docs",
                    url: "/docs/:version/faq/diagnostics",
                  },
                ],
              },
              {
                label: "Exit Codes & Statuses",
                contentSite: "docs",
                url: "/docs/:version/reference/exit-codes",
              },
            ],
          },
          {
            label: "Security",
            contentSite: "docs",
            url: "/docs/:version/core/self-managed-security",
            collapsible: true,
            items: [
              {
                label: "Security Checklist",
                contentSite: "docs",
                url: "/docs/:version/administration/security-checklist",
              },
              {
                label: "Enable Access Control",
                contentSite: "docs",
                url: "/docs/:version/tutorial/enable-authentication",
              },
              {
                label: "Authentication",
                contentSite: "docs",
                url: "/docs/:version/core/authentication",
                collapsible: true,
                items: [
                  {
                    label: "Kerberos",
                    contentSite: "docs",
                    url: "/docs/:version/core/kerberos",
                    collapsible: true,
                    items: [
                      {
                        label: "Configure on Linux",
                        contentSite: "docs",
                        url: "/docs/:version/tutorial/control-access-to-mongodb-with-kerberos-authentication",
                      },
                      {
                        label: "Configure on Windows",
                        contentSite: "docs",
                        url: "/docs/:version/tutorial/control-access-to-mongodb-windows-with-kerberos-authentication",
                      },
                      {
                        label: "Troubleshoot",
                        contentSite: "docs",
                        url: "/docs/:version/tutorial/troubleshoot-kerberos",
                      },
                      {
                        label: "Use Active Directory Authorization",
                        contentSite: "docs",
                        url: "/docs/:version/tutorial/kerberos-auth-activedirectory-authz",
                      },
                    ],
                  },
                  {
                    label: "LDAP Proxy",
                    contentSite: "docs",
                    url: "/docs/:version/core/security-ldap",
                    collapsible: true,
                    items: [
                      {
                        label: "Use ActiveDirectory",
                        contentSite: "docs",
                        url: "/docs/:version/tutorial/configure-ldap-sasl-activedirectory",
                      },
                      {
                        label: "Use OpenLDAP",
                        contentSite: "docs",
                        url: "/docs/:version/tutorial/configure-ldap-sasl-openldap",
                      },
                      {
                        label: "Use Native LDAP",
                        contentSite: "docs",
                        url: "/docs/:version/tutorial/authenticate-nativeldap-activedirectory",
                      },
                    ],
                  },
                  {
                    label: "OIDC/OAuth 2.0",
                    contentSite: "docs",
                    url: "/docs/:version/core/oidc/security-oidc",
                    collapsible: true,
                    items: [
                      {
                        label: "Workforce (Humans)",
                        contentSite: "docs",
                        url: "/docs/:version/core/oidc/workforce/workforce",
                        collapsible: true,
                        items: [
                          {
                            label:
                              "Configure an External Identity Provider for Workforce Authentication",
                            contentSite: "docs",
                            url: "/docs/:version/core/oidc/workforce/workforce-external-provider",
                          },
                          {
                            label:
                              "Configure MongoDB with Workforce Identity Federation",
                            contentSite: "docs",
                            url: "/docs/:version/core/oidc/workforce/configure-oidc",
                          },
                          {
                            label:
                              "Authorize Users with Workforce Identity Federation",
                            contentSite: "docs",
                            url: "/docs/:version/core/oidc/workforce/database-user-workforce",
                          },
                        ],
                      },
                      {
                        label: "Workload (Applications)",
                        contentSite: "docs",
                        url: "/docs/:version/core/oidc/workload/workload",
                        collapsible: true,
                        items: [
                          {
                            label:
                              "Configure an External Identity Provider for Workload Authentication",
                            contentSite: "docs",
                            url: "/docs/:version/core/oidc/workload/workload-external-provider",
                          },
                          {
                            label:
                              "Configure MongoDB with Workload Identity Federation",
                            contentSite: "docs",
                            url: "/docs/:version/core/oidc/workload/configure-mongodb-workload",
                          },
                          {
                            label:
                              "Authorize Users with Workload Identity Federation",
                            contentSite: "docs",
                            url: "/docs/:version/core/oidc/workload/database-user-workload",
                          },
                        ],
                      },
                    ],
                  },
                  {
                    label: "Internal",
                    contentSite: "docs",
                    url: "/docs/:version/core/security-internal-authentication",
                    collapsible: true,
                    items: [
                      {
                        label: "Deploy Replica Set",
                        contentSite: "docs",
                        url: "/docs/:version/tutorial/deploy-replica-set-with-keyfile-access-control",
                      },
                      {
                        label: "Update Replica Set",
                        contentSite: "docs",
                        url: "/docs/:version/tutorial/enforce-keyfile-access-control-in-existing-replica-set",
                      },
                      {
                        label: "Update Replica Set (No Downtime)",
                        contentSite: "docs",
                        url: "/docs/:version/tutorial/enforce-keyfile-access-control-in-existing-replica-set-without-downtime",
                      },
                      {
                        label: "Deploy Sharded Cluster",
                        contentSite: "docs",
                        url: "/docs/:version/tutorial/deploy-sharded-cluster-with-keyfile-access-control",
                      },
                      {
                        label: "Update Sharded Cluster",
                        contentSite: "docs",
                        url: "/docs/:version/tutorial/enforce-keyfile-access-control-in-existing-sharded-cluster",
                      },
                      {
                        label: "Update Sharded Cluster (No Downtime)",
                        contentSite: "docs",
                        url: "/docs/:version/tutorial/enforce-keyfile-access-control-in-existing-sharded-cluster-no-downtime",
                      },
                      {
                        label: "Rotate Replica Set Keys",
                        contentSite: "docs",
                        url: "/docs/:version/tutorial/rotate-key-replica-set",
                      },
                      {
                        label: "Rotate Sharded Cluster Keys",
                        contentSite: "docs",
                        url: "/docs/:version/tutorial/rotate-key-sharded-cluster",
                      },
                      {
                        label: "Use X.509",
                        contentSite: "docs",
                        url: "/docs/:version/tutorial/configure-x509-member-authentication",
                      },
                      {
                        label: "Upgrade to X.509 from Keyfile",
                        contentSite: "docs",
                        url: "/docs/:version/tutorial/upgrade-keyfile-to-x509",
                      },
                      {
                        label: "Rotate X.509 with New DN",
                        contentSite: "docs",
                        url: "/docs/:version/tutorial/rotate-x509-membership-certificates",
                      },
                      {
                        label:
                          "Rotate X.509 with New clusterAuthX509 Attributes",
                        contentSite: "docs",
                        url: "/docs/:version/tutorial/rotate-x509-member-cert",
                      },
                      {
                        label: "Rotate X.509 to Use Extension Values",
                        contentSite: "docs",
                        url: "/docs/:version/tutorial/rotate-x509-to-extensionValue",
                      },
                    ],
                  },
                  {
                    label: "Localhost Exception",
                    contentSite: "docs",
                    url: "/docs/:version/core/localhost-exception",
                  },
                  {
                    label: "Users",
                    contentSite: "docs",
                    url: "/docs/:version/core/security-users",
                    collapsible: true,
                    items: [
                      {
                        label: "Create",
                        contentSite: "docs",
                        url: "/docs/:version/tutorial/create-users",
                      },
                      {
                        label: "Authenticate",
                        contentSite: "docs",
                        url: "/docs/:version/tutorial/authenticate-a-user",
                      },
                      {
                        label: "List",
                        contentSite: "docs",
                        url: "/docs/:version/tutorial/list-users",
                      },
                    ],
                  },
                ],
              },
              {
                label: "Role-Based Access Control",
                contentSite: "docs",
                url: "/docs/:version/core/authorization",
                collapsible: true,
                items: [
                  {
                    label: "User Defined Roles",
                    contentSite: "docs",
                    url: "/docs/:version/core/security-user-defined-roles",
                  },
                  {
                    label: "Manage Users & Roles",
                    contentSite: "docs",
                    url: "/docs/:version/tutorial/manage-users-and-roles",
                  },
                  {
                    label: "Change Password & Custom Data",
                    contentSite: "docs",
                    url: "/docs/:version/tutorial/change-own-password-and-custom-data",
                  },
                  {
                    label: "Collection-Level Access",
                    contentSite: "docs",
                    url: "/docs/:version/core/collection-level-access-control",
                  },
                  {
                    label: "LDAP Authorization",
                    contentSite: "docs",
                    url: "/docs/:version/core/security-ldap-external",
                  },
                  {
                    label: "LDAP Deprecation",
                    contentSite: "docs",
                    url: "/docs/:version/core/LDAP-deprecation",
                  },
                ],
              },
              {
                label: "Network & Configuration Hardening",
                contentSite: "docs",
                url: "/docs/:version/core/security-hardening",
                collapsible: true,
                items: [
                  {
                    label: "IP Binding",
                    contentSite: "docs",
                    url: "/docs/:version/core/security-mongodb-configuration",
                  },
                  {
                    label: "Use Linux iptables",
                    contentSite: "docs",
                    url: "/docs/:version/tutorial/configure-linux-iptables-firewall",
                  },
                  {
                    label: "Use Windows netsh",
                    contentSite: "docs",
                    url: "/docs/:version/tutorial/configure-windows-netsh-firewall",
                  },
                ],
              },
              {
                label: "Reference",
                contentSite: "docs",
                url: "/docs/:version/reference/security",
                collapsible: true,
                items: [
                  {
                    label: "systems.roles Collection",
                    contentSite: "docs",
                    url: "/docs/:version/reference/system-roles-collection",
                  },
                  {
                    label: "systems.users Collection",
                    contentSite: "docs",
                    url: "/docs/:version/reference/system-users-collection",
                  },
                  {
                    label: "Resource Document",
                    contentSite: "docs",
                    url: "/docs/:version/reference/resource-document",
                  },
                ],
              },
              {
                label: "Appendix",
                contentSite: "docs",
                url: "/docs/:version/appendix/security",
                collapsible: true,
                items: [
                  {
                    label: "OpenSSL CA",
                    contentSite: "docs",
                    url: "/docs/:version/appendix/security/appendixA-openssl-ca",
                  },
                  {
                    label: "OpenSSL Server",
                    contentSite: "docs",
                    url: "/docs/:version/appendix/security/appendixB-openssl-server",
                  },
                  {
                    label: "OpenSSL Client",
                    contentSite: "docs",
                    url: "/docs/:version/appendix/security/appendixC-openssl-client",
                  },
                ],
              },
            ],
          },
          {
            label: "Text Search",
            contentSite: "docs",
            url: "/docs/:version/core/text-search/on-prem",
            collapsible: true,
            items: [
              {
                label: "Perform a Text Search",
                contentSite: "docs",
                url: "/docs/:version/core/link-text-indexes",
              },
              {
                label: "Text Search Operators",
                contentSite: "docs",
                url: "/docs/:version/core/text-search-operators",
                collapsible: true,
                items: [
                  {
                    label: "$text",
                    contentSite: "docs",
                    url: "/docs/:version/reference/operator/query/text",
                  },
                ],
              },
              {
                label: "Aggregation Pipeline",
                contentSite: "docs",
                url: "/docs/:version/tutorial/text-search-in-aggregation",
              },
              {
                label: "Languages",
                contentSite: "docs",
                url: "/docs/:version/reference/text-search-languages",
              },
              {
                label: "Text Indexes",
                contentSite: "docs",
                url: "/docs/:version/core/indexes/index-types/index-text",
                collapsible: true,
                items: [
                  {
                    label: "Create",
                    contentSite: "docs",
                    url: "/docs/:version/core/indexes/index-types/index-text/create-text-index",
                  },
                  {
                    label: "Create a Wildcard",
                    contentSite: "docs",
                    url: "/docs/:version/core/indexes/index-types/index-text/create-wildcard-text-index",
                  },
                  {
                    label: "Specify Language",
                    contentSite: "docs",
                    url: "/docs/:version/core/indexes/index-types/index-text/specify-text-index-language",
                    collapsible: true,
                    items: [
                      {
                        label: "Multiple Languages",
                        contentSite: "docs",
                        url: "/docs/:version/core/indexes/index-types/index-text/specify-language-text-index/create-text-index-multiple-languages",
                      },
                      {
                        label: "Field Use",
                        contentSite: "docs",
                        url: "/docs/:version/core/indexes/index-types/index-text/specify-language-text-index/use-any-field-to-specify-language",
                      },
                    ],
                  },
                  {
                    label: "Assign Weights",
                    contentSite: "docs",
                    url: "/docs/:version/core/indexes/index-types/index-text/control-text-search-results",
                  },
                  {
                    label: "Limit Entries",
                    contentSite: "docs",
                    url: "/docs/:version/core/indexes/index-types/index-text/limit-number-of-items-scanned-for-text-search",
                  },
                  {
                    label: "Properties",
                    contentSite: "docs",
                    url: "/docs/:version/core/indexes/index-types/index-text/text-index-properties",
                  },
                  {
                    label: "Restrictions",
                    contentSite: "docs",
                    url: "/docs/:version/core/indexes/index-types/index-text/text-index-restrictions",
                  },
                  {
                    label: "Versions",
                    contentSite: "docs",
                    url: "/docs/:version/core/indexes/index-types/index-text/text-index-versions",
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        label: "FAQ",
        contentSite: "docs",
        url: "/docs/:version/faq",
        collapsible: true,
        items: [
          {
            label: "Fundamentals",
            contentSite: "docs",
            url: "/docs/:version/faq/fundamentals",
          },
          {
            label: "Indexes",
            contentSite: "docs",
            url: "/docs/:version/faq/indexes",
          },
          {
            label: "Concurrency",
            contentSite: "docs",
            url: "/docs/:version/faq/concurrency",
          },
          {
            label: "Sharding",
            contentSite: "docs",
            url: "/docs/:version/faq/sharding",
          },
          {
            label: "Replication",
            contentSite: "docs",
            url: "/docs/:version/faq/replica-sets",
          },
        ],
      },
      {
        label: "Reference",
        contentSite: "docs",
        url: "/docs/:version/reference",
        collapsible: true,
        items: [
          {
            label: "Collation",
            contentSite: "docs",
            url: "/docs/:version/reference/collation",
            collapsible: true,
            items: [
              {
                label: "Locales & Default Parameters",
                contentSite: "docs",
                url: "/docs/:version/reference/collation-locales-defaults",
              },
            ],
          },
          {
            label: "Connection Strings",
            contentSite: "docs",
            url: "/docs/:version/reference/connection-string",
            collapsible: true,
            items: [
              {
                label: "Options",
                contentSite: "docs",
                url: "/docs/:version/reference/connection-string-options",
              },
              {
                label: "Examples",
                contentSite: "docs",
                url: "/docs/:version/reference/connection-string-examples",
              },
            ],
          },
          {
            label: "Database Commands",
            contentSite: "docs",
            url: "/docs/:version/reference/command",
            collapsible: true,
            items: [
              {
                label: "Geospatial",
                contentSite: "docs",
                url: "/docs/:version/reference/command/nav-geospatial",
                collapsible: true,
                items: [
                  {
                    label: "geoSearch",
                    contentSite: "docs",
                    url: "/docs/:version/reference/command/geoSearch",
                  },
                ],
              },
              {
                label: "Query Plan Cache",
                contentSite: "docs",
                url: "/docs/:version/reference/command/nav-plan-cache",
                collapsible: true,
                items: [
                  {
                    label: "planCacheClear",
                    contentSite: "docs",
                    url: "/docs/:version/reference/command/planCacheClear",
                  },
                  {
                    label: "planCacheClearFilters",
                    contentSite: "docs",
                    url: "/docs/:version/reference/command/planCacheClearFilters",
                  },
                  {
                    label: "planCacheListFilters",
                    contentSite: "docs",
                    url: "/docs/:version/reference/command/planCacheListFilters",
                  },
                  {
                    label: "planCacheSetFilter",
                    contentSite: "docs",
                    url: "/docs/:version/reference/command/planCacheSetFilter",
                  },
                ],
              },
              {
                label: "Authentication",
                contentSite: "docs",
                url: "/docs/:version/reference/command/nav-authentication",
                collapsible: true,
                items: [
                  {
                    label: "authenticate",
                    contentSite: "docs",
                    url: "/docs/:version/reference/command/authenticate",
                  },
                  {
                    label: "logout",
                    contentSite: "docs",
                    url: "/docs/:version/reference/command/logout",
                  },
                ],
              },
              {
                label: "User Management",
                contentSite: "docs",
                url: "/docs/:version/reference/command/nav-user-management",
                collapsible: true,
                items: [
                  {
                    label: "createUser",
                    contentSite: "docs",
                    url: "/docs/:version/reference/command/createUser",
                  },
                  {
                    label: "dropAllUsersFromDatabase",
                    contentSite: "docs",
                    url: "/docs/:version/reference/command/dropAllUsersFromDatabase",
                  },
                  {
                    label: "dropUser",
                    contentSite: "docs",
                    url: "/docs/:version/reference/command/dropUser",
                  },
                  {
                    label: "grantRolesToUser",
                    contentSite: "docs",
                    url: "/docs/:version/reference/command/grantRolesToUser",
                  },
                  {
                    label: "revokeRolesFromUser",
                    contentSite: "docs",
                    url: "/docs/:version/reference/command/revokeRolesFromUser",
                  },
                  {
                    label: "updateUser",
                    contentSite: "docs",
                    url: "/docs/:version/reference/command/updateUser",
                  },
                  {
                    label: "usersInfo",
                    contentSite: "docs",
                    url: "/docs/:version/reference/command/usersInfo",
                  },
                ],
              },
              {
                label: "Role Management",
                contentSite: "docs",
                url: "/docs/:version/reference/command/nav-role-management",
                collapsible: true,
                items: [
                  {
                    label: "createRole",
                    contentSite: "docs",
                    url: "/docs/:version/reference/command/createRole",
                  },
                  {
                    label: "dropRole",
                    contentSite: "docs",
                    url: "/docs/:version/reference/command/dropRole",
                  },
                  {
                    label: "dropAllRolesFromDatabase",
                    contentSite: "docs",
                    url: "/docs/:version/reference/command/dropAllRolesFromDatabase",
                  },
                  {
                    label: "grantPrivilegesToRole",
                    contentSite: "docs",
                    url: "/docs/:version/reference/command/grantPrivilegesToRole",
                  },
                  {
                    label: "grantRolesToRole",
                    contentSite: "docs",
                    url: "/docs/:version/reference/command/grantRolesToRole",
                  },
                  {
                    label: "invalidateUserCache",
                    contentSite: "docs",
                    url: "/docs/:version/reference/command/invalidateUserCache",
                  },
                  {
                    label: "revokePrivilegesFromRole",
                    contentSite: "docs",
                    url: "/docs/:version/reference/command/revokePrivilegesFromRole",
                  },
                  {
                    label: "revokeRolesFromRole",
                    contentSite: "docs",
                    url: "/docs/:version/reference/command/revokeRolesFromRole",
                  },
                  {
                    label: "rolesInfo",
                    contentSite: "docs",
                    url: "/docs/:version/reference/command/rolesInfo",
                  },
                  {
                    label: "updateRole",
                    contentSite: "docs",
                    url: "/docs/:version/reference/command/updateRole",
                  },
                ],
              },
              {
                label: "Replication",
                contentSite: "docs",
                url: "/docs/:version/reference/command/nav-replication",
                collapsible: true,
                items: [
                  {
                    label: "appendOplogNote",
                    contentSite: "docs",
                    url: "/docs/:version/reference/command/appendOplogNote",
                  },
                  {
                    label: "applyOps",
                    contentSite: "docs",
                    url: "/docs/:version/reference/command/applyOps",
                  },
                  {
                    label: "hello",
                    contentSite: "docs",
                    url: "/docs/:version/reference/command/hello",
                  },
                  {
                    label: "replSetAbortPrimaryCatchUp",
                    contentSite: "docs",
                    url: "/docs/:version/reference/command/replSetAbortPrimaryCatchUp",
                  },
                  {
                    label: "replSetFreeze",
                    contentSite: "docs",
                    url: "/docs/:version/reference/command/replSetFreeze",
                  },
                  {
                    label: "replSetGetConfig",
                    contentSite: "docs",
                    url: "/docs/:version/reference/command/replSetGetConfig",
                  },
                  {
                    label: "replSetGetStatus",
                    contentSite: "docs",
                    url: "/docs/:version/reference/command/replSetGetStatus",
                  },
                  {
                    label: "replSetInitiate",
                    contentSite: "docs",
                    url: "/docs/:version/reference/command/replSetInitiate",
                  },
                  {
                    label: "replSetMaintenance",
                    contentSite: "docs",
                    url: "/docs/:version/reference/command/replSetMaintenance",
                  },
                  {
                    label: "replSetReconfig",
                    contentSite: "docs",
                    url: "/docs/:version/reference/command/replSetReconfig",
                  },
                  {
                    label: "replSetResizeOplog",
                    contentSite: "docs",
                    url: "/docs/:version/reference/command/replSetResizeOplog",
                  },
                  {
                    label: "replSetStepDown",
                    contentSite: "docs",
                    url: "/docs/:version/reference/command/replSetStepDown",
                  },
                  {
                    label: "replSetSyncFrom",
                    contentSite: "docs",
                    url: "/docs/:version/reference/command/replSetSyncFrom",
                  },
                ],
              },
              {
                label: "Sharding",
                contentSite: "docs",
                url: "/docs/:version/reference/command/nav-sharding",
                collapsible: true,
                items: [
                  {
                    label: "abortMoveCollection",
                    contentSite: "docs",
                    url: "/docs/:version/reference/command/abortMoveCollection",
                  },
                  {
                    label: "abortReshardCollection",
                    contentSite: "docs",
                    url: "/docs/:version/reference/command/abortReshardCollection",
                  },
                  {
                    label: "abortUnshardCollection",
                    contentSite: "docs",
                    url: "/docs/:version/reference/command/abortUnshardCollection",
                  },
                  {
                    label: "addShard",
                    contentSite: "docs",
                    url: "/docs/:version/reference/command/addShard",
                  },
                  {
                    label: "addShardToZone",
                    contentSite: "docs",
                    url: "/docs/:version/reference/command/addShardToZone",
                  },
                  {
                    label: "analyzeShardKey",
                    contentSite: "docs",
                    url: "/docs/:version/reference/command/analyzeShardKey",
                  },
                  {
                    label: "balancerCollectionStatus",
                    contentSite: "docs",
                    url: "/docs/:version/reference/command/balancerCollectionStatus",
                  },
                  {
                    label: "balancerStart",
                    contentSite: "docs",
                    url: "/docs/:version/reference/command/balancerStart",
                  },
                  {
                    label: "balancerStatus",
                    contentSite: "docs",
                    url: "/docs/:version/reference/command/balancerStatus",
                  },
                  {
                    label: "balancerStop",
                    contentSite: "docs",
                    url: "/docs/:version/reference/command/balancerStop",
                  },
                  {
                    label: "checkMetadataConsistency",
                    contentSite: "docs",
                    url: "/docs/:version/reference/command/checkMetadataConsistency",
                  },
                  {
                    label: "clearJumboFlag",
                    contentSite: "docs",
                    url: "/docs/:version/reference/command/clearJumboFlag",
                  },
                  {
                    label: "cleanupOrphaned",
                    contentSite: "docs",
                    url: "/docs/:version/reference/command/cleanupOrphaned",
                  },
                  {
                    label: "cleanupReshardCollection",
                    contentSite: "docs",
                    url: "/docs/:version/reference/command/cleanupReshardCollection",
                  },
                  {
                    label: "commitReshardCollection",
                    contentSite: "docs",
                    url: "/docs/:version/reference/command/commitReshardCollection",
                  },
                  {
                    label: "configureCollectionBalancing",
                    contentSite: "docs",
                    url: "/docs/:version/reference/command/configureCollectionBalancing",
                  },
                  {
                    label: "configureQueryAnalyzer",
                    contentSite: "docs",
                    url: "/docs/:version/reference/command/configureQueryAnalyzer",
                  },
                  {
                    label: "enableSharding",
                    contentSite: "docs",
                    url: "/docs/:version/reference/command/enableSharding",
                  },
                  {
                    label: "flushRouterConfig",
                    contentSite: "docs",
                    url: "/docs/:version/reference/command/flushRouterConfig",
                  },
                  {
                    label: "getShard Map",
                    contentSite: "docs",
                    url: "/docs/:version/reference/command/getShardMap",
                  },
                  {
                    label: "isdbgrid",
                    contentSite: "docs",
                    url: "/docs/:version/reference/command/isdbgrid",
                  },
                  {
                    label: "listShards",
                    contentSite: "docs",
                    url: "/docs/:version/reference/command/listShards",
                  },
                  {
                    label: "mergeAllChunksOnShard",
                    contentSite: "docs",
                    url: "/docs/:version/reference/command/mergeAllChunksOnShard",
                  },
                  {
                    label: "moveChunk",
                    contentSite: "docs",
                    url: "/docs/:version/reference/command/moveChunk",
                  },
                  {
                    label: "moveCollection",
                    contentSite: "docs",
                    url: "/docs/:version/reference/command/moveCollection",
                  },
                  {
                    label: "movePrimary",
                    contentSite: "docs",
                    url: "/docs/:version/reference/command/movePrimary",
                  },
                  {
                    label: "moveRange",
                    contentSite: "docs",
                    url: "/docs/:version/reference/command/moveRange",
                  },
                  {
                    label: "mergeChunks",
                    contentSite: "docs",
                    url: "/docs/:version/reference/command/mergeChunks",
                  },
                  {
                    label: "refineCollectionShardKey",
                    contentSite: "docs",
                    url: "/docs/:version/reference/command/refineCollectionShardKey",
                  },
                  {
                    label: "removeShard",
                    contentSite: "docs",
                    url: "/docs/:version/reference/command/removeShard",
                  },
                  {
                    label: "removeShardFromZone",
                    contentSite: "docs",
                    url: "/docs/:version/reference/command/removeShardFromZone",
                  },
                  {
                    label: "reshardCollection",
                    contentSite: "docs",
                    url: "/docs/:version/reference/command/reshardCollection",
                  },
                  {
                    label: "setAllowMigrations",
                    contentSite: "docs",
                    url: "/docs/:version/reference/command/setAllowMigrations",
                  },
                  {
                    label: "shardCollection",
                    contentSite: "docs",
                    url: "/docs/:version/reference/command/shardCollection",
                  },
                  {
                    label: "shardingState",
                    contentSite: "docs",
                    url: "/docs/:version/reference/command/shardingState",
                  },
                  {
                    label: "split",
                    contentSite: "docs",
                    url: "/docs/:version/reference/command/split",
                  },
                  {
                    label: "transitionFromDedicatedConfigServer",
                    contentSite: "docs",
                    url: "/docs/:version/reference/command/transitionFromDedicatedConfigServer",
                  },
                  {
                    label: "transitionToDedicatedConfigServer",
                    contentSite: "docs",
                    url: "/docs/:version/reference/command/transitionToDedicatedConfigServer",
                  },
                  {
                    label: "unsetSharding",
                    contentSite: "docs",
                    url: "/docs/:version/reference/command/unsetSharding",
                  },
                  {
                    label: "unshardCollection",
                    contentSite: "docs",
                    url: "/docs/:version/reference/command/unshardCollection",
                  },
                  {
                    label: "updateZoneKeyRange",
                    contentSite: "docs",
                    url: "/docs/:version/reference/command/updateZoneKeyRange",
                  },
                ],
              },
              {
                label: "Sessions",
                contentSite: "docs",
                url: "/docs/:version/reference/command/nav-sessions",
                collapsible: true,
                items: [
                  {
                    label: "abortTransaction",
                    contentSite: "docs",
                    url: "/docs/:version/reference/command/abortTransaction",
                  },
                  {
                    label: "commitTransaction",
                    contentSite: "docs",
                    url: "/docs/:version/reference/command/commitTransaction",
                  },
                  {
                    label: "endSessions",
                    contentSite: "docs",
                    url: "/docs/:version/reference/command/endSessions",
                  },
                  {
                    label: "killAllSessions",
                    contentSite: "docs",
                    url: "/docs/:version/reference/command/killAllSessions",
                  },
                  {
                    label: "killAllSessionsByPattern",
                    contentSite: "docs",
                    url: "/docs/:version/reference/command/killAllSessionsByPattern",
                  },
                  {
                    label: "killSessions",
                    contentSite: "docs",
                    url: "/docs/:version/reference/command/killSessions",
                  },
                  {
                    label: "refreshSessions",
                    contentSite: "docs",
                    url: "/docs/:version/reference/command/refreshSessions",
                  },
                  {
                    label: "startSession",
                    contentSite: "docs",
                    url: "/docs/:version/reference/command/startSession",
                  },
                ],
              },
              {
                label: "Administration",
                contentSite: "docs",
                url: "/docs/:version/reference/command/nav-administration",
                collapsible: true,
                items: [
                  {
                    label: "autoCompact",
                    contentSite: "docs",
                    url: "/docs/:version/reference/command/autoCompact",
                  },
                  {
                    label: "bulkWrite",
                    contentSite: "docs",
                    url: "/docs/:version/reference/command/bulkWrite",
                  },
                  {
                    label: "cloneCollectionAsCapped",
                    contentSite: "docs",
                    url: "/docs/:version/reference/command/cloneCollectionAsCapped",
                  },
                  {
                    label: "collMod",
                    contentSite: "docs",
                    url: "/docs/:version/reference/command/collMod",
                  },
                  {
                    label: "compact",
                    contentSite: "docs",
                    url: "/docs/:version/reference/command/compact",
                  },
                  {
                    label: "compactStructuredEncryptionData",
                    contentSite: "docs",
                    url: "/docs/:version/reference/command/compactStructuredEncryptionData",
                  },
                  {
                    label: "convertToCapped",
                    contentSite: "docs",
                    url: "/docs/:version/reference/command/convertToCapped",
                  },
                  {
                    label: "create",
                    contentSite: "docs",
                    url: "/docs/:version/reference/command/create",
                  },
                  {
                    label: "createIndexes",
                    contentSite: "docs",
                    url: "/docs/:version/reference/command/createIndexes",
                  },
                  {
                    label: "currentOp",
                    contentSite: "docs",
                    url: "/docs/:version/reference/command/currentOp",
                  },
                  {
                    label: "drop",
                    contentSite: "docs",
                    url: "/docs/:version/reference/command/drop",
                  },
                  {
                    label: "dropDatabase",
                    contentSite: "docs",
                    url: "/docs/:version/reference/command/dropDatabase",
                  },
                  {
                    label: "dropConnections",
                    contentSite: "docs",
                    url: "/docs/:version/reference/command/dropConnections",
                  },
                  {
                    label: "dropIndexes",
                    contentSite: "docs",
                    url: "/docs/:version/reference/command/dropIndexes",
                  },
                  {
                    label: "filemd5",
                    contentSite: "docs",
                    url: "/docs/:version/reference/command/filemd5",
                  },
                  {
                    label: "fsync",
                    contentSite: "docs",
                    url: "/docs/:version/reference/command/fsync",
                  },
                  {
                    label: "fsyncUnlock",
                    contentSite: "docs",
                    url: "/docs/:version/reference/command/fsyncUnlock",
                  },
                  {
                    label: "getAuditConfig",
                    contentSite: "docs",
                    url: "/docs/:version/reference/command/getAuditConfig",
                  },
                  {
                    label: "getClusterParameter",
                    contentSite: "docs",
                    url: "/docs/:version/reference/command/getClusterParameter",
                  },
                  {
                    label: "getDefaultRWConcern",
                    contentSite: "docs",
                    url: "/docs/:version/reference/command/getDefaultRWConcern",
                  },
                  {
                    label: "getParameter",
                    contentSite: "docs",
                    url: "/docs/:version/reference/command/getParameter",
                  },
                  {
                    label: "killCursors",
                    contentSite: "docs",
                    url: "/docs/:version/reference/command/killCursors",
                  },
                  {
                    label: "killOp",
                    contentSite: "docs",
                    url: "/docs/:version/reference/command/killOp",
                  },
                  {
                    label: "listCollections",
                    contentSite: "docs",
                    url: "/docs/:version/reference/command/listCollections",
                  },
                  {
                    label: "listDatabases",
                    contentSite: "docs",
                    url: "/docs/:version/reference/command/listDatabases",
                  },
                  {
                    label: "listIndexes",
                    contentSite: "docs",
                    url: "/docs/:version/reference/command/listIndexes",
                  },
                  {
                    label: "logRotate",
                    contentSite: "docs",
                    url: "/docs/:version/reference/command/logRotate",
                  },
                  {
                    label: "reIndex",
                    contentSite: "docs",
                    url: "/docs/:version/reference/command/reIndex",
                  },
                  {
                    label: "removeQuerySettings",
                    contentSite: "docs",
                    url: "/docs/:version/reference/command/removeQuerySettings",
                  },
                  {
                    label: "renameCollection",
                    contentSite: "docs",
                    url: "/docs/:version/reference/command/renameCollection",
                  },
                  {
                    label: "rotateCertificates",
                    contentSite: "docs",
                    url: "/docs/:version/reference/command/rotateCertificates",
                  },
                  {
                    label: "setAuditConfig",
                    contentSite: "docs",
                    url: "/docs/:version/reference/command/setAuditConfig",
                  },
                  {
                    label: "setClusterParameter",
                    contentSite: "docs",
                    url: "/docs/:version/reference/command/setClusterParameter",
                  },
                  {
                    label: "setFeatureCompatibilityVersion",
                    contentSite: "docs",
                    url: "/docs/:version/reference/command/setFeatureCompatibilityVersion",
                  },
                  {
                    label: "setIndexCommitQuorum",
                    contentSite: "docs",
                    url: "/docs/:version/reference/command/setIndexCommitQuorum",
                  },
                  {
                    label: "setParameter",
                    contentSite: "docs",
                    url: "/docs/:version/reference/command/setParameter",
                  },
                  {
                    label: "setDefaultRWConcern",
                    contentSite: "docs",
                    url: "/docs/:version/reference/command/setDefaultRWConcern",
                  },
                  {
                    label: "setQuerySettings",
                    contentSite: "docs",
                    url: "/docs/:version/reference/command/setQuerySettings",
                  },
                  {
                    label: "setUserWriteBlockMode",
                    contentSite: "docs",
                    url: "/docs/:version/reference/command/setUserWriteBlockMode",
                  },
                  {
                    label: "shutdown",
                    contentSite: "docs",
                    url: "/docs/:version/reference/command/shutdown",
                  },
                ],
              },
              {
                label: "Diagnostics",
                contentSite: "docs",
                url: "/docs/:version/reference/command/nav-diagnostic",
                collapsible: true,
                items: [
                  {
                    label: "buildInfo",
                    contentSite: "docs",
                    url: "/docs/:version/reference/command/buildInfo",
                  },
                  {
                    label: "collStats",
                    contentSite: "docs",
                    url: "/docs/:version/reference/command/collStats",
                  },
                  {
                    label: "connPoolStats",
                    contentSite: "docs",
                    url: "/docs/:version/reference/command/connPoolStats",
                  },
                  {
                    label: "connectionStatus",
                    contentSite: "docs",
                    url: "/docs/:version/reference/command/connectionStatus",
                  },
                  {
                    label: "dataSize",
                    contentSite: "docs",
                    url: "/docs/:version/reference/command/dataSize",
                  },
                  {
                    label: "dbHash",
                    contentSite: "docs",
                    url: "/docs/:version/reference/command/dbHash",
                  },
                  {
                    label: "dbStats",
                    contentSite: "docs",
                    url: "/docs/:version/reference/command/dbStats",
                  },
                  {
                    label: "explain",
                    contentSite: "docs",
                    url: "/docs/:version/reference/command/explain",
                  },
                  {
                    label: "getCmdLineOpts",
                    contentSite: "docs",
                    url: "/docs/:version/reference/command/getCmdLineOpts",
                  },
                  {
                    label: "getLog",
                    contentSite: "docs",
                    url: "/docs/:version/reference/command/getLog",
                  },
                  {
                    label: "hostInfo",
                    contentSite: "docs",
                    url: "/docs/:version/reference/command/hostInfo",
                  },
                  {
                    label: "listCommands",
                    contentSite: "docs",
                    url: "/docs/:version/reference/command/listCommands",
                  },
                  {
                    label: "lockInfo",
                    contentSite: "docs",
                    url: "/docs/:version/reference/command/lockInfo",
                  },
                  {
                    label: "ping",
                    contentSite: "docs",
                    url: "/docs/:version/reference/command/ping",
                  },
                  {
                    label: "profile",
                    contentSite: "docs",
                    url: "/docs/:version/reference/command/profile",
                  },
                  {
                    label: "serverStatus",
                    contentSite: "docs",
                    url: "/docs/:version/reference/command/serverStatus",
                  },
                  {
                    label: "shardConnPoolStats",
                    contentSite: "docs",
                    url: "/docs/:version/reference/command/shardConnPoolStats",
                  },
                  {
                    label: "top",
                    contentSite: "docs",
                    url: "/docs/:version/reference/command/top",
                  },
                  {
                    label: "validate",
                    contentSite: "docs",
                    url: "/docs/:version/reference/command/validate",
                  },
                  {
                    label: "validateDBMetadata",
                    contentSite: "docs",
                    url: "/docs/:version/reference/command/validateDBMetadata",
                  },
                  {
                    label: "whatsmyuri",
                    contentSite: "docs",
                    url: "/docs/:version/reference/command/whatsmyuri",
                  },
                ],
              },
              {
                label: "Auditing",
                contentSite: "docs",
                url: "/docs/:version/reference/command/nav-auditing",
                collapsible: true,
                items: [
                  {
                    label: "logApplicationMessage",
                    contentSite: "docs",
                    url: "/docs/:version/reference/command/logApplicationMessage",
                  },
                ],
              },
              {
                label: "Atlas Search",
                contentSite: "docs",
                url: "/docs/:version/reference/command/nav-atlas-search",
                collapsible: true,
                items: [
                  {
                    label: "createSearchIndexes",
                    contentSite: "docs",
                    url: "/docs/:version/reference/command/createSearchIndexes",
                  },
                  {
                    label: "dropSearchIndex",
                    contentSite: "docs",
                    url: "/docs/:version/reference/command/dropSearchIndex",
                  },
                  {
                    label: "updateSearchIndex",
                    contentSite: "docs",
                    url: "/docs/:version/reference/command/updateSearchIndex",
                  },
                ],
              },
            ],
          },
          {
            label: "DDL Operations",
            contentSite: "docs",
            url: "/docs/:version/reference/ddl-operations",
          },
          {
            label: "Default Port",
            contentSite: "docs",
            url: "/docs/:version/reference/default-mongodb-port",
          },
          {
            label: "Read & Write Concerns",
            contentSite: "docs",
            url: "/docs/:version/reference/mongodb-defaults",
          },
          {
            label: "Error Codes",
            contentSite: "docs",
            url: "/docs/:version/reference/error-codes",
          },
          {
            label: "Glossary",
            contentSite: "docs",
            url: "/docs/:version/reference/glossary",
          },
          {
            label: "Log Messages",
            contentSite: "docs",
            url: "/docs/:version/reference/log-messages",
          },
          {
            label: "Limits & Thresholds",
            contentSite: "docs",
            url: "/docs/:version/reference/limits",
          },
          {
            label: "MongoDB Database Tools",
            contentSite: "database-tools",
            url: "/docs/database-tools/?tck=docs_server_toc",
          },
          {
            label: "Wire Protocol",
            contentSite: "docs",
            url: "/docs/:version/reference/mongodb-wire-protocol",
            collapsible: true,
            items: [
              {
                label: "Legacy Opcodes",
                contentSite: "docs",
                url: "/docs/:version/legacy-opcodes",
              },
            ],
          },
          {
            label: "mongosh Methods",
            contentSite: "docs",
            url: "/docs/:version/reference/method",
            collapsible: true,
            items: [
              {
                label: "Native Methods",
                contentSite: "docs",
                url: "/docs/:version/reference/method/js-native",
              },
              {
                label: "Atlas Search Index",
                contentSite: "docs",
                url: "/docs/:version/reference/method/js-atlas-search",
                collapsible: true,
                items: [
                  {
                    label: "db.collection.createSearchIndex",
                    contentSite: "docs",
                    url: "/docs/:version/reference/method/db.collection.createSearchIndex",
                  },
                  {
                    label: "db.collection.dropSearchIndex",
                    contentSite: "docs",
                    url: "/docs/:version/reference/method/db.collection.dropSearchIndex",
                  },
                  {
                    label: "db.collection.getSearchIndexes",
                    contentSite: "docs",
                    url: "/docs/:version/reference/method/db.collection.getSearchIndexes",
                  },
                  {
                    label: "db.collection.updateSearchIndex",
                    contentSite: "docs",
                    url: "/docs/:version/reference/method/db.collection.updateSearchIndex",
                  },
                ],
              },
              {
                label: "Atlas Stream Processing",
                contentSite: "docs",
                url: "/docs/:version/reference/method/js-atlas-streams",
                collapsible: true,
                items: [
                  {
                    label: "sp.createStreamProcessor",
                    contentSite: "docs",
                    url: "/docs/:version/reference/method/sp.createStreamProcessor",
                  },
                  {
                    label: "sp.listStreamProcessors",
                    contentSite: "docs",
                    url: "/docs/:version/reference/method/sp.listStreamProcessors",
                  },
                  {
                    label: "sp.process",
                    contentSite: "docs",
                    url: "/docs/:version/reference/method/sp.process",
                  },
                  {
                    label: "sp.processor.drop",
                    contentSite: "docs",
                    url: "/docs/:version/reference/method/sp.processor.drop",
                  },
                  {
                    label: "sp.processor.sample",
                    contentSite: "docs",
                    url: "/docs/:version/reference/method/sp.processor.sample",
                  },
                  {
                    label: "sp.processor.start",
                    contentSite: "docs",
                    url: "/docs/:version/reference/method/sp.processor.start",
                  },
                  {
                    label: "sp.processor.stats",
                    contentSite: "docs",
                    url: "/docs/:version/reference/method/sp.processor.stats",
                  },
                  {
                    label: "sp.processor.stop",
                    contentSite: "docs",
                    url: "/docs/:version/reference/method/sp.processor.stop",
                  },
                ],
              },
              {
                label: "Collections",
                contentSite: "docs",
                url: "/docs/:version/reference/method/js-collection",
                collapsible: true,
                items: [
                  {
                    label: "db.collection.aggregate",
                    contentSite: "docs",
                    url: "/docs/:version/reference/method/db.collection.aggregate",
                  },
                  {
                    label: "db.collection.analyzeShardKey",
                    contentSite: "docs",
                    url: "/docs/:version/reference/method/db.collection.analyzeShardKey",
                  },
                  {
                    label: "db.collection.bulkWrite",
                    contentSite: "docs",
                    url: "/docs/:version/reference/method/db.collection.bulkWrite",
                  },
                  {
                    label: "db.collection.compactStructuredEncryptionData",
                    contentSite: "docs",
                    url: "/docs/:version/reference/method/db.collection.compactStructuredEncryptionData",
                  },
                  {
                    label: "db.collection.configureQueryAnalyzer",
                    contentSite: "docs",
                    url: "/docs/:version/reference/method/db.collection.configureQueryAnalyzer",
                  },
                  {
                    label: "db.collection.count",
                    contentSite: "docs",
                    url: "/docs/:version/reference/method/db.collection.count",
                  },
                  {
                    label: "db.collection.countDocuments",
                    contentSite: "docs",
                    url: "/docs/:version/reference/method/db.collection.countDocuments",
                  },
                  {
                    label: "db.collection.createIndex",
                    contentSite: "docs",
                    url: "/docs/:version/reference/method/db.collection.createIndex",
                  },
                  {
                    label: "db.collection.createIndexes",
                    contentSite: "docs",
                    url: "/docs/:version/reference/method/db.collection.createIndexes",
                  },
                  {
                    label: "db.collection.dataSize",
                    contentSite: "docs",
                    url: "/docs/:version/reference/method/db.collection.dataSize",
                  },
                  {
                    label: "db.collection.deleteMany",
                    contentSite: "docs",
                    url: "/docs/:version/reference/method/db.collection.deleteMany",
                  },
                  {
                    label: "db.collection.deleteOne",
                    contentSite: "docs",
                    url: "/docs/:version/reference/method/db.collection.deleteOne",
                  },
                  {
                    label: "db.collection.distinct",
                    contentSite: "docs",
                    url: "/docs/:version/reference/method/db.collection.distinct",
                  },
                  {
                    label: "db.collection.drop",
                    contentSite: "docs",
                    url: "/docs/:version/reference/method/db.collection.drop",
                  },
                  {
                    label: "db.collection.dropIndex",
                    contentSite: "docs",
                    url: "/docs/:version/reference/method/db.collection.dropIndex",
                  },
                  {
                    label: "db.collection.dropIndexes",
                    contentSite: "docs",
                    url: "/docs/:version/reference/method/db.collection.dropIndexes",
                  },
                  {
                    label: "db.collection.ensureIndex",
                    contentSite: "docs",
                    url: "/docs/:version/reference/method/db.collection.ensureIndex",
                  },
                  {
                    label: "db.collection.estimatedDocumentCount",
                    contentSite: "docs",
                    url: "/docs/:version/reference/method/db.collection.estimatedDocumentCount",
                  },
                  {
                    label: "db.collection.explain",
                    contentSite: "docs",
                    url: "/docs/:version/reference/method/db.collection.explain",
                  },
                  {
                    label: "db.collection.find",
                    contentSite: "docs",
                    url: "/docs/:version/reference/method/db.collection.find",
                  },
                  {
                    label: "db.collection.findAndModify",
                    contentSite: "docs",
                    url: "/docs/:version/reference/method/db.collection.findAndModify",
                  },
                  {
                    label: "db.collection.findOne",
                    contentSite: "docs",
                    url: "/docs/:version/reference/method/db.collection.findOne",
                  },
                  {
                    label: "db.collection.findOneAndDelete",
                    contentSite: "docs",
                    url: "/docs/:version/reference/method/db.collection.findOneAndDelete",
                  },
                  {
                    label: "db.collection.findOneAndReplace",
                    contentSite: "docs",
                    url: "/docs/:version/reference/method/db.collection.findOneAndReplace",
                  },
                  {
                    label: "db.collection.findOneAndUpdate",
                    contentSite: "docs",
                    url: "/docs/:version/reference/method/db.collection.findOneAndUpdate",
                  },
                  {
                    label: "db.collection.getIndexes",
                    contentSite: "docs",
                    url: "/docs/:version/reference/method/db.collection.getIndexes",
                  },
                  {
                    label: "db.collection.getShardDistribution",
                    contentSite: "docs",
                    url: "/docs/:version/reference/method/db.collection.getShardDistribution",
                  },
                  {
                    label: "db.collection.getShardVersion",
                    contentSite: "docs",
                    url: "/docs/:version/reference/method/db.collection.getShardVersion",
                  },
                  {
                    label: "db.collection.hideIndex",
                    contentSite: "docs",
                    url: "/docs/:version/reference/method/db.collection.hideIndex",
                  },
                  {
                    label: "db.collection.insert",
                    contentSite: "docs",
                    url: "/docs/:version/reference/method/db.collection.insert",
                  },
                  {
                    label: "db.collection.insertMany",
                    contentSite: "docs",
                    url: "/docs/:version/reference/method/db.collection.insertMany",
                  },
                  {
                    label: "db.collection.insertOne",
                    contentSite: "docs",
                    url: "/docs/:version/reference/method/db.collection.insertOne",
                  },
                  {
                    label: "db.collection.isCapped",
                    contentSite: "docs",
                    url: "/docs/:version/reference/method/db.collection.isCapped",
                  },
                  {
                    label: "db.collection.latencyStats",
                    contentSite: "docs",
                    url: "/docs/:version/reference/method/db.collection.latencyStats",
                  },
                  {
                    label: "db.collection.mapReduce",
                    contentSite: "docs",
                    url: "/docs/:version/reference/method/db.collection.mapReduce",
                  },
                  {
                    label: "db.collection.reIndex",
                    contentSite: "docs",
                    url: "/docs/:version/reference/method/db.collection.reIndex",
                  },
                  {
                    label: "db.collection.remove",
                    contentSite: "docs",
                    url: "/docs/:version/reference/method/db.collection.remove",
                  },
                  {
                    label: "db.collection.renameCollection",
                    contentSite: "docs",
                    url: "/docs/:version/reference/method/db.collection.renameCollection",
                  },
                  {
                    label: "db.collection.replaceOne",
                    contentSite: "docs",
                    url: "/docs/:version/reference/method/db.collection.replaceOne",
                  },
                  {
                    label: "db.collection.stats",
                    contentSite: "docs",
                    url: "/docs/:version/reference/method/db.collection.stats",
                  },
                  {
                    label: "db.collection.storageSize",
                    contentSite: "docs",
                    url: "/docs/:version/reference/method/db.collection.storageSize",
                  },
                  {
                    label: "db.collection.totalIndexSize",
                    contentSite: "docs",
                    url: "/docs/:version/reference/method/db.collection.totalIndexSize",
                  },
                  {
                    label: "db.collection.totalSize",
                    contentSite: "docs",
                    url: "/docs/:version/reference/method/db.collection.totalSize",
                  },
                  {
                    label: "db.collection.unhideIndex",
                    contentSite: "docs",
                    url: "/docs/:version/reference/method/db.collection.unhideIndex",
                  },
                  {
                    label: "db.collection.update",
                    contentSite: "docs",
                    url: "/docs/:version/reference/method/db.collection.update",
                  },
                  {
                    label: "db.collection.updateMany",
                    contentSite: "docs",
                    url: "/docs/:version/reference/method/db.collection.updateMany",
                  },
                  {
                    label: "db.collection.updateOne",
                    contentSite: "docs",
                    url: "/docs/:version/reference/method/db.collection.updateOne",
                  },
                  {
                    label: "db.collection.validate",
                    contentSite: "docs",
                    url: "/docs/:version/reference/method/db.collection.validate",
                  },
                  {
                    label: "db.collection.watch",
                    contentSite: "docs",
                    url: "/docs/:version/reference/method/db.collection.watch",
                  },
                ],
              },
              {
                label: "Cursors",
                contentSite: "docs",
                url: "/docs/:version/reference/method/js-cursor",
                collapsible: true,
                items: [
                  {
                    label: "cursor.addOption",
                    contentSite: "docs",
                    url: "/docs/:version/reference/method/cursor.addOption",
                  },
                  {
                    label: "cursor.allowDiskUse",
                    contentSite: "docs",
                    url: "/docs/:version/reference/method/cursor.allowDiskUse",
                  },
                  {
                    label: "cursor.allowPartialResults",
                    contentSite: "docs",
                    url: "/docs/:version/reference/method/cursor.allowPartialResults",
                  },
                  {
                    label: "cursor.batchSize",
                    contentSite: "docs",
                    url: "/docs/:version/reference/method/cursor.batchSize",
                  },
                  {
                    label: "cursor.close",
                    contentSite: "docs",
                    url: "/docs/:version/reference/method/cursor.close",
                  },
                  {
                    label: "cursor.isClosed",
                    contentSite: "docs",
                    url: "/docs/:version/reference/method/cursor.isClosed",
                  },
                  {
                    label: "cursor.collation",
                    contentSite: "docs",
                    url: "/docs/:version/reference/method/cursor.collation",
                  },
                  {
                    label: "cursor.comment",
                    contentSite: "docs",
                    url: "/docs/:version/reference/method/cursor.comment",
                  },
                  {
                    label: "cursor.count",
                    contentSite: "docs",
                    url: "/docs/:version/reference/method/cursor.count",
                  },
                  {
                    label: "cursor.explain",
                    contentSite: "docs",
                    url: "/docs/:version/reference/method/cursor.explain",
                  },
                  {
                    label: "cursor.forEach",
                    contentSite: "docs",
                    url: "/docs/:version/reference/method/cursor.forEach",
                  },
                  {
                    label: "cursor.hasNext",
                    contentSite: "docs",
                    url: "/docs/:version/reference/method/cursor.hasNext",
                  },
                  {
                    label: "cursor.hint",
                    contentSite: "docs",
                    url: "/docs/:version/reference/method/cursor.hint",
                  },
                  {
                    label: "cursor.isExhausted",
                    contentSite: "docs",
                    url: "/docs/:version/reference/method/cursor.isExhausted",
                  },
                  {
                    label: "cursor.itcount",
                    contentSite: "docs",
                    url: "/docs/:version/reference/method/cursor.itcount",
                  },
                  {
                    label: "cursor.limit",
                    contentSite: "docs",
                    url: "/docs/:version/reference/method/cursor.limit",
                  },
                  {
                    label: "cursor.map",
                    contentSite: "docs",
                    url: "/docs/:version/reference/method/cursor.map",
                  },
                  {
                    label: "cursor.max",
                    contentSite: "docs",
                    url: "/docs/:version/reference/method/cursor.max",
                  },
                  {
                    label: "cursor.maxAwaitTimeMS",
                    contentSite: "docs",
                    url: "/docs/:version/reference/method/cursor.maxAwaitTimeMS",
                  },
                  {
                    label: "cursor.maxTimeMS",
                    contentSite: "docs",
                    url: "/docs/:version/reference/method/cursor.maxTimeMS",
                  },
                  {
                    label: "cursor.min",
                    contentSite: "docs",
                    url: "/docs/:version/reference/method/cursor.min",
                  },
                  {
                    label: "cursor.next",
                    contentSite: "docs",
                    url: "/docs/:version/reference/method/cursor.next",
                  },
                  {
                    label: "cursor.noCursorTimeout",
                    contentSite: "docs",
                    url: "/docs/:version/reference/method/cursor.noCursorTimeout",
                  },
                  {
                    label: "cursor.objsLeftInBatch",
                    contentSite: "docs",
                    url: "/docs/:version/reference/method/cursor.objsLeftInBatch",
                  },
                  {
                    label: "cursor.pretty",
                    contentSite: "docs",
                    url: "/docs/:version/reference/method/cursor.pretty",
                  },
                  {
                    label: "cursor.readConcern",
                    contentSite: "docs",
                    url: "/docs/:version/reference/method/cursor.readConcern",
                  },
                  {
                    label: "cursor.readPref",
                    contentSite: "docs",
                    url: "/docs/:version/reference/method/cursor.readPref",
                  },
                  {
                    label: "cursor.returnKey",
                    contentSite: "docs",
                    url: "/docs/:version/reference/method/cursor.returnKey",
                  },
                  {
                    label: "cursor.showRecordId",
                    contentSite: "docs",
                    url: "/docs/:version/reference/method/cursor.showRecordId",
                  },
                  {
                    label: "cursor.size",
                    contentSite: "docs",
                    url: "/docs/:version/reference/method/cursor.size",
                  },
                  {
                    label: "cursor.skip",
                    contentSite: "docs",
                    url: "/docs/:version/reference/method/cursor.skip",
                  },
                  {
                    label: "cursor.sort",
                    contentSite: "docs",
                    url: "/docs/:version/reference/method/cursor.sort",
                  },
                  {
                    label: "cursor.tailable",
                    contentSite: "docs",
                    url: "/docs/:version/reference/method/cursor.tailable",
                  },
                  {
                    label: "cursor.toArray",
                    contentSite: "docs",
                    url: "/docs/:version/reference/method/cursor.toArray",
                  },
                  {
                    label: "cursor.tryNext",
                    contentSite: "docs",
                    url: "/docs/:version/reference/method/cursor.tryNext",
                  },
                ],
              },
              {
                label: "Databases",
                contentSite: "docs",
                url: "/docs/:version/reference/method/js-database",
                collapsible: true,
                items: [
                  {
                    label: "db.adminCommand",
                    contentSite: "docs",
                    url: "/docs/:version/reference/method/db.adminCommand",
                  },
                  {
                    label: "db.aggregate",
                    contentSite: "docs",
                    url: "/docs/:version/reference/method/db.aggregate",
                  },
                  {
                    label: "db.commandHelp",
                    contentSite: "docs",
                    url: "/docs/:version/reference/method/db.commandHelp",
                  },
                  {
                    label: "db.createCollection",
                    contentSite: "docs",
                    url: "/docs/:version/reference/method/db.createCollection",
                  },
                  {
                    label: "db.createView",
                    contentSite: "docs",
                    url: "/docs/:version/reference/method/db.createView",
                  },
                  {
                    label: "db.currentOp",
                    contentSite: "docs",
                    url: "/docs/:version/reference/method/db.currentOp",
                  },
                  {
                    label: "db.dropDatabase",
                    contentSite: "docs",
                    url: "/docs/:version/reference/method/db.dropDatabase",
                  },
                  {
                    label: "db.fsyncLock",
                    contentSite: "docs",
                    url: "/docs/:version/reference/method/db.fsyncLock",
                  },
                  {
                    label: "db.fsyncUnlock",
                    contentSite: "docs",
                    url: "/docs/:version/reference/method/db.fsyncUnlock",
                  },
                  {
                    label: "db.getCollection",
                    contentSite: "docs",
                    url: "/docs/:version/reference/method/db.getCollection",
                  },
                  {
                    label: "db.getCollectionInfos",
                    contentSite: "docs",
                    url: "/docs/:version/reference/method/db.getCollectionInfos",
                  },
                  {
                    label: "db.getCollectionNames",
                    contentSite: "docs",
                    url: "/docs/:version/reference/method/db.getCollectionNames",
                  },
                  {
                    label: "db.getLogComponents",
                    contentSite: "docs",
                    url: "/docs/:version/reference/method/db.getLogComponents",
                  },
                  {
                    label: "db.getMongo",
                    contentSite: "docs",
                    url: "/docs/:version/reference/method/db.getMongo",
                  },
                  {
                    label: "db.getName",
                    contentSite: "docs",
                    url: "/docs/:version/reference/method/db.getName",
                  },
                  {
                    label: "db.getProfilingStatus",
                    contentSite: "docs",
                    url: "/docs/:version/reference/method/db.getProfilingStatus",
                  },
                  {
                    label: "db.getReplicationInfo",
                    contentSite: "docs",
                    url: "/docs/:version/reference/method/db.getReplicationInfo",
                  },
                  {
                    label: "db.getSiblingDB",
                    contentSite: "docs",
                    url: "/docs/:version/reference/method/db.getSiblingDB",
                  },
                  {
                    label: "db.hello",
                    contentSite: "docs",
                    url: "/docs/:version/reference/method/db.hello",
                  },
                  {
                    label: "db.help",
                    contentSite: "docs",
                    url: "/docs/:version/reference/method/db.help",
                  },
                  {
                    label: "db.hostInfo",
                    contentSite: "docs",
                    url: "/docs/:version/reference/method/db.hostInfo",
                  },
                  {
                    label: "db.killOp",
                    contentSite: "docs",
                    url: "/docs/:version/reference/method/db.killOp",
                  },
                  {
                    label: "db.listCommands",
                    contentSite: "docs",
                    url: "/docs/:version/reference/method/db.listCommands",
                  },
                  {
                    label: "db.logout",
                    contentSite: "docs",
                    url: "/docs/:version/reference/method/db.logout",
                  },
                  {
                    label: "db.printCollectionStats",
                    contentSite: "docs",
                    url: "/docs/:version/reference/method/db.printCollectionStats",
                  },
                  {
                    label: "db.printReplicationInfo",
                    contentSite: "docs",
                    url: "/docs/:version/reference/method/db.printReplicationInfo",
                  },
                  {
                    label: "db.printSecondaryReplicationInfo",
                    contentSite: "docs",
                    url: "/docs/:version/reference/method/db.printSecondaryReplicationInfo",
                  },
                  {
                    label: "db.printShardingStatus",
                    contentSite: "docs",
                    url: "/docs/:version/reference/method/db.printShardingStatus",
                  },
                  {
                    label: "db.rotateCertificates",
                    contentSite: "docs",
                    url: "/docs/:version/reference/method/db.rotateCertificates",
                  },
                  {
                    label: "db.runCommand",
                    contentSite: "docs",
                    url: "/docs/:version/reference/method/db.runCommand",
                  },
                  {
                    label: "db.serverBuildInfo",
                    contentSite: "docs",
                    url: "/docs/:version/reference/method/db.serverBuildInfo",
                  },
                  {
                    label: "db.serverCmdLineOpts",
                    contentSite: "docs",
                    url: "/docs/:version/reference/method/db.serverCmdLineOpts",
                  },
                  {
                    label: "db.serverStatus",
                    contentSite: "docs",
                    url: "/docs/:version/reference/method/db.serverStatus",
                  },
                  {
                    label: "db.setLogLevel",
                    contentSite: "docs",
                    url: "/docs/:version/reference/method/db.setLogLevel",
                  },
                  {
                    label: "db.setProfilingLevel",
                    contentSite: "docs",
                    url: "/docs/:version/reference/method/db.setProfilingLevel",
                  },
                  {
                    label: "db.shutdownServer",
                    contentSite: "docs",
                    url: "/docs/:version/reference/method/db.shutdownServer",
                  },
                  {
                    label: "db.stats",
                    contentSite: "docs",
                    url: "/docs/:version/reference/method/db.stats",
                  },
                  {
                    label: "db.version",
                    contentSite: "docs",
                    url: "/docs/:version/reference/method/db.version",
                  },
                  {
                    label: "db.watch",
                    contentSite: "docs",
                    url: "/docs/:version/reference/method/db.watch",
                  },
                ],
              },
              {
                label: "Query Plan Caches",
                contentSite: "docs",
                url: "/docs/:version/reference/method/js-plan-cache",
                collapsible: true,
                items: [
                  {
                    label: "db.collection.getPlanCache",
                    contentSite: "docs",
                    url: "/docs/:version/reference/method/db.collection.getPlanCache",
                  },
                  {
                    label: "PlanCache.clear",
                    contentSite: "docs",
                    url: "/docs/:version/reference/method/PlanCache.clear",
                  },
                  {
                    label: "PlanCache.clearPlansByQuery",
                    contentSite: "docs",
                    url: "/docs/:version/reference/method/PlanCache.clearPlansByQuery",
                  },
                  {
                    label: "PlanCache.help",
                    contentSite: "docs",
                    url: "/docs/:version/reference/method/PlanCache.help",
                  },
                  {
                    label: "PlanCache.list",
                    contentSite: "docs",
                    url: "/docs/:version/reference/method/PlanCache.list",
                  },
                ],
              },
              {
                label: "Bulk Operations",
                contentSite: "docs",
                url: "/docs/:version/reference/method/js-bulk",
                collapsible: true,
                items: [
                  {
                    label: "db.collection.initializeOrderedBulkOp",
                    contentSite: "docs",
                    url: "/docs/:version/reference/method/db.collection.initializeOrderedBulkOp",
                  },
                  {
                    label: "db.collection.initializeUnorderedBulkOp",
                    contentSite: "docs",
                    url: "/docs/:version/reference/method/db.collection.initializeUnorderedBulkOp",
                  },
                  {
                    label: "Mongo.bulkWrite",
                    contentSite: "docs",
                    url: "/docs/:version/reference/method/Mongo.bulkWrite",
                  },
                  {
                    label: "Bulk",
                    contentSite: "docs",
                    url: "/docs/:version/reference/method/Bulk",
                  },
                  {
                    label: "Bulk.execute",
                    contentSite: "docs",
                    url: "/docs/:version/reference/method/Bulk.execute",
                  },
                  {
                    label: "Bulk.find",
                    contentSite: "docs",
                    url: "/docs/:version/reference/method/Bulk.find",
                  },
                  {
                    label: "Bulk.find.arrayFilters",
                    contentSite: "docs",
                    url: "/docs/:version/reference/method/Bulk.find.arrayFilters",
                  },
                  {
                    label: "Bulk.find.collation",
                    contentSite: "docs",
                    url: "/docs/:version/reference/method/Bulk.find.collation",
                  },
                  {
                    label: "Bulk.find.delete",
                    contentSite: "docs",
                    url: "/docs/:version/reference/method/Bulk.find.delete",
                  },
                  {
                    label: "Bulk.find.deleteOne",
                    contentSite: "docs",
                    url: "/docs/:version/reference/method/Bulk.find.deleteOne",
                  },
                  {
                    label: "Bulk.find.hint",
                    contentSite: "docs",
                    url: "/docs/:version/reference/method/Bulk.find.hint",
                  },
                  {
                    label: "Bulk.find.remove",
                    contentSite: "docs",
                    url: "/docs/:version/reference/method/Bulk.find.remove",
                  },
                  {
                    label: "Bulk.find.removeOne",
                    contentSite: "docs",
                    url: "/docs/:version/reference/method/Bulk.find.removeOne",
                  },
                  {
                    label: "Bulk.find.replaceOne",
                    contentSite: "docs",
                    url: "/docs/:version/reference/method/Bulk.find.replaceOne",
                  },
                  {
                    label: "Bulk.find.updateOne",
                    contentSite: "docs",
                    url: "/docs/:version/reference/method/Bulk.find.updateOne",
                  },
                  {
                    label: "Bulk.find.update",
                    contentSite: "docs",
                    url: "/docs/:version/reference/method/Bulk.find.update",
                  },
                  {
                    label: "Bulk.find.upsert",
                    contentSite: "docs",
                    url: "/docs/:version/reference/method/Bulk.find.upsert",
                  },
                  {
                    label: "Bulk.getOperations",
                    contentSite: "docs",
                    url: "/docs/:version/reference/method/Bulk.getOperations",
                  },
                  {
                    label: "Bulk.insert",
                    contentSite: "docs",
                    url: "/docs/:version/reference/method/Bulk.insert",
                  },
                  {
                    label: "Bulk.tojson",
                    contentSite: "docs",
                    url: "/docs/:version/reference/method/Bulk.tojson",
                  },
                  {
                    label: "Bulk.toString",
                    contentSite: "docs",
                    url: "/docs/:version/reference/method/Bulk.toString",
                  },
                ],
              },
              {
                label: "User Management",
                contentSite: "docs",
                url: "/docs/:version/reference/method/js-user-management",
                collapsible: true,
                items: [
                  {
                    label: "db.auth",
                    contentSite: "docs",
                    url: "/docs/:version/reference/method/db.auth",
                  },
                  {
                    label: "db.changeUserPassword",
                    contentSite: "docs",
                    url: "/docs/:version/reference/method/db.changeUserPassword",
                  },
                  {
                    label: "db.createUser",
                    contentSite: "docs",
                    url: "/docs/:version/reference/method/db.createUser",
                  },
                  {
                    label: "db.dropUser",
                    contentSite: "docs",
                    url: "/docs/:version/reference/method/db.dropUser",
                  },
                  {
                    label: "db.dropAllUsers",
                    contentSite: "docs",
                    url: "/docs/:version/reference/method/db.dropAllUsers",
                  },
                  {
                    label: "db.getUser",
                    contentSite: "docs",
                    url: "/docs/:version/reference/method/db.getUser",
                  },
                  {
                    label: "db.getUsers",
                    contentSite: "docs",
                    url: "/docs/:version/reference/method/db.getUsers",
                  },
                  {
                    label: "db.grantRolesToUser",
                    contentSite: "docs",
                    url: "/docs/:version/reference/method/db.grantRolesToUser",
                  },
                  {
                    label: "db.removeUser",
                    contentSite: "docs",
                    url: "/docs/:version/reference/method/db.removeUser",
                  },
                  {
                    label: "db.revokeRolesFromUser",
                    contentSite: "docs",
                    url: "/docs/:version/reference/method/db.revokeRolesFromUser",
                  },
                  {
                    label: "db.updateUser",
                    contentSite: "docs",
                    url: "/docs/:version/reference/method/db.updateUser",
                  },
                  {
                    label: "passwordPrompt",
                    contentSite: "docs",
                    url: "/docs/:version/reference/method/passwordPrompt",
                  },
                ],
              },
              {
                label: "Role Management",
                contentSite: "docs",
                url: "/docs/:version/reference/method/js-role-management",
                collapsible: true,
                items: [
                  {
                    label: "db.createRole",
                    contentSite: "docs",
                    url: "/docs/:version/reference/method/db.createRole",
                  },
                  {
                    label: "db.dropRole",
                    contentSite: "docs",
                    url: "/docs/:version/reference/method/db.dropRole",
                  },
                  {
                    label: "db.dropAllRoles",
                    contentSite: "docs",
                    url: "/docs/:version/reference/method/db.dropAllRoles",
                  },
                  {
                    label: "db.getRole",
                    contentSite: "docs",
                    url: "/docs/:version/reference/method/db.getRole",
                  },
                  {
                    label: "db.getRoles",
                    contentSite: "docs",
                    url: "/docs/:version/reference/method/db.getRoles",
                  },
                  {
                    label: "db.grantPrivilegesToRole",
                    contentSite: "docs",
                    url: "/docs/:version/reference/method/db.grantPrivilegesToRole",
                  },
                  {
                    label: "db.revokePrivilegesFromRole",
                    contentSite: "docs",
                    url: "/docs/:version/reference/method/db.revokePrivilegesFromRole",
                  },
                  {
                    label: "db.grantRolesToRole",
                    contentSite: "docs",
                    url: "/docs/:version/reference/method/db.grantRolesToRole",
                  },
                  {
                    label: "db.revokeRolesFromRole",
                    contentSite: "docs",
                    url: "/docs/:version/reference/method/db.revokeRolesFromRole",
                  },
                  {
                    label: "db.updateRole",
                    contentSite: "docs",
                    url: "/docs/:version/reference/method/db.updateRole",
                  },
                ],
              },
              {
                label: "Replication",
                contentSite: "docs",
                url: "/docs/:version/reference/method/js-replication",
                collapsible: true,
                items: [
                  {
                    label: "rs.add",
                    contentSite: "docs",
                    url: "/docs/:version/reference/method/rs.add",
                  },
                  {
                    label: "rs.addArb",
                    contentSite: "docs",
                    url: "/docs/:version/reference/method/rs.addArb",
                  },
                  {
                    label: "rs.conf",
                    contentSite: "docs",
                    url: "/docs/:version/reference/method/rs.conf",
                  },
                  {
                    label: "rs.freeze",
                    contentSite: "docs",
                    url: "/docs/:version/reference/method/rs.freeze",
                  },
                  {
                    label: "rs.help",
                    contentSite: "docs",
                    url: "/docs/:version/reference/method/rs.help",
                  },
                  {
                    label: "rs.initiate",
                    contentSite: "docs",
                    url: "/docs/:version/reference/method/rs.initiate",
                  },
                  {
                    label: "rs.printReplicationInfo",
                    contentSite: "docs",
                    url: "/docs/:version/reference/method/rs.printReplicationInfo",
                  },
                  {
                    label: "rs.printSecondaryReplicationInfo",
                    contentSite: "docs",
                    url: "/docs/:version/reference/method/rs.printSecondaryReplicationInfo",
                  },
                  {
                    label: "rs.reconfig",
                    contentSite: "docs",
                    url: "/docs/:version/reference/method/rs.reconfig",
                  },
                  {
                    label: "rs.reconfigForPSASet",
                    contentSite: "docs",
                    url: "/docs/:version/reference/method/rs.reconfigForPSASet",
                  },
                  {
                    label: "rs.remove",
                    contentSite: "docs",
                    url: "/docs/:version/reference/method/rs.remove",
                  },
                  {
                    label: "rs.status",
                    contentSite: "docs",
                    url: "/docs/:version/reference/method/rs.status",
                  },
                  {
                    label: "rs.stepDown",
                    contentSite: "docs",
                    url: "/docs/:version/reference/method/rs.stepDown",
                  },
                  {
                    label: "rs.syncFrom",
                    contentSite: "docs",
                    url: "/docs/:version/reference/method/rs.syncFrom",
                  },
                ],
              },
              {
                label: "Sharding",
                contentSite: "docs",
                url: "/docs/:version/reference/method/js-sharding",
                collapsible: true,
                items: [
                  {
                    label: "convertShardKeyToHashed",
                    contentSite: "docs",
                    url: "/docs/:version/reference/method/convertShardKeyToHashed",
                  },
                  {
                    label: "db.checkMetadataConsistency",
                    contentSite: "docs",
                    url: "/docs/:version/reference/method/db.checkMetadataConsistency",
                  },
                  {
                    label: "db.collection.checkMetadataConsistency",
                    contentSite: "docs",
                    url: "/docs/:version/reference/method/db.collection.checkMetadataConsistency",
                  },
                  {
                    label: "sh.abortMoveCollection",
                    contentSite: "docs",
                    url: "/docs/:version/reference/method/sh.abortMoveCollection",
                  },
                  {
                    label: "sh.abortReshardCollection",
                    contentSite: "docs",
                    url: "/docs/:version/reference/method/sh.abortReshardCollection",
                  },
                  {
                    label: "sh.abortUnshardCollection",
                    contentSite: "docs",
                    url: "/docs/:version/reference/method/sh.abortUnshardCollection",
                  },
                  {
                    label: "sh.addShard",
                    contentSite: "docs",
                    url: "/docs/:version/reference/method/sh.addShard",
                  },
                  {
                    label: "sh.addShardTag",
                    contentSite: "docs",
                    url: "/docs/:version/reference/method/sh.addShardTag",
                  },
                  {
                    label: "sh.addShardToZone",
                    contentSite: "docs",
                    url: "/docs/:version/reference/method/sh.addShardToZone",
                  },
                  {
                    label: "sh.addTagRange",
                    contentSite: "docs",
                    url: "/docs/:version/reference/method/sh.addTagRange",
                  },
                  {
                    label: "sh.balancerCollectionStatus",
                    contentSite: "docs",
                    url: "/docs/:version/reference/method/sh.balancerCollectionStatus",
                  },
                  {
                    label: "sh.checkMetadataConsistency",
                    contentSite: "docs",
                    url: "/docs/:version/reference/method/sh.checkMetadataConsistency",
                  },
                  {
                    label: "sh.commitReshardCollection",
                    contentSite: "docs",
                    url: "/docs/:version/reference/method/sh.commitReshardCollection",
                  },
                  {
                    label: "sh.disableAutoMerger",
                    contentSite: "docs",
                    url: "/docs/:version/reference/method/sh.disableAutoMerger",
                  },
                  {
                    label: "sh.disableAutoSplit",
                    contentSite: "docs",
                    url: "/docs/:version/reference/method/sh.disableAutoSplit",
                  },
                  {
                    label: "sh.disableBalancing",
                    contentSite: "docs",
                    url: "/docs/:version/reference/method/sh.disableBalancing",
                  },
                  {
                    label: "sh.enableAutoMerger",
                    contentSite: "docs",
                    url: "/docs/:version/reference/method/sh.enableAutoMerger",
                  },
                  {
                    label: "sh.enableBalancing",
                    contentSite: "docs",
                    url: "/docs/:version/reference/method/sh.enableBalancing",
                  },
                  {
                    label: "sh.enableAutoSplit",
                    contentSite: "docs",
                    url: "/docs/:version/reference/method/sh.enableAutoSplit",
                  },
                  {
                    label: "sh.enableSharding",
                    contentSite: "docs",
                    url: "/docs/:version/reference/method/sh.enableSharding",
                  },
                  {
                    label: "sh.getBalancerState",
                    contentSite: "docs",
                    url: "/docs/:version/reference/method/sh.getBalancerState",
                  },
                  {
                    label: "sh.getShardedDataDistribution",
                    contentSite: "docs",
                    url: "/docs/:version/reference/method/sh.getShardedDataDistribution",
                  },
                  {
                    label: "sh.help",
                    contentSite: "docs",
                    url: "/docs/:version/reference/method/sh.help",
                  },
                  {
                    label: "sh.isBalancerRunning",
                    contentSite: "docs",
                    url: "/docs/:version/reference/method/sh.isBalancerRunning",
                  },
                  {
                    label: "sh.isConfigShardEnabled",
                    contentSite: "docs",
                    url: "/docs/:version/reference/method/sh.isConfigShardEnabled",
                  },
                  {
                    label: "sh.listShards",
                    contentSite: "docs",
                    url: "/docs/:version/reference/method/sh.listShards",
                  },
                  {
                    label: "sh.moveChunk",
                    contentSite: "docs",
                    url: "/docs/:version/reference/method/sh.moveChunk",
                  },
                  {
                    label: "sh.moveCollection",
                    contentSite: "docs",
                    url: "/docs/:version/reference/method/sh.moveCollection",
                  },
                  {
                    label: "sh.moveRange",
                    contentSite: "docs",
                    url: "/docs/:version/reference/method/sh.moveRange",
                  },
                  {
                    label: "sh.removeRangeFromZone",
                    contentSite: "docs",
                    url: "/docs/:version/reference/method/sh.removeRangeFromZone",
                  },
                  {
                    label: "sh.removeShardTag",
                    contentSite: "docs",
                    url: "/docs/:version/reference/method/sh.removeShardTag",
                  },
                  {
                    label: "sh.removeShardFromZone",
                    contentSite: "docs",
                    url: "/docs/:version/reference/method/sh.removeShardFromZone",
                  },
                  {
                    label: "sh.removeTagRange",
                    contentSite: "docs",
                    url: "/docs/:version/reference/method/sh.removeTagRange",
                  },
                  {
                    label: "sh.reshardCollection",
                    contentSite: "docs",
                    url: "/docs/:version/reference/method/sh.reshardCollection",
                  },
                  {
                    label: "sh.setBalancerState",
                    contentSite: "docs",
                    url: "/docs/:version/reference/method/sh.setBalancerState",
                  },
                  {
                    label: "sh.shardAndDistributeCollection",
                    contentSite: "docs",
                    url: "/docs/:version/reference/method/sh.shardAndDistributeCollection",
                  },
                  {
                    label: "sh.shardCollection",
                    contentSite: "docs",
                    url: "/docs/:version/reference/method/sh.shardCollection",
                  },
                  {
                    label: "sh.splitAt",
                    contentSite: "docs",
                    url: "/docs/:version/reference/method/sh.splitAt",
                  },
                  {
                    label: "sh.splitFind",
                    contentSite: "docs",
                    url: "/docs/:version/reference/method/sh.splitFind",
                  },
                  {
                    label: "sh.startAutoMerger",
                    contentSite: "docs",
                    url: "/docs/:version/reference/method/sh.startAutoMerger",
                  },
                  {
                    label: "sh.startBalancer",
                    contentSite: "docs",
                    url: "/docs/:version/reference/method/sh.startBalancer",
                  },
                  {
                    label: "sh.status",
                    contentSite: "docs",
                    url: "/docs/:version/reference/method/sh.status",
                  },
                  {
                    label: "sh.stopAutoMerger",
                    contentSite: "docs",
                    url: "/docs/:version/reference/method/sh.stopAutoMerger",
                  },
                  {
                    label: "sh.stopBalancer",
                    contentSite: "docs",
                    url: "/docs/:version/reference/method/sh.stopBalancer",
                  },
                  {
                    label: "sh.unshardCollection",
                    contentSite: "docs",
                    url: "/docs/:version/reference/method/sh.unshardCollection",
                  },
                  {
                    label: "sh.updateZoneKeyRange",
                    contentSite: "docs",
                    url: "/docs/:version/reference/method/sh.updateZoneKeyRange",
                  },
                  {
                    label: "sh.waitForBalancer",
                    contentSite: "docs",
                    url: "/docs/:version/reference/method/sh.waitForBalancer",
                  },
                  {
                    label: "sh.waitForBalancerOff",
                    contentSite: "docs",
                    url: "/docs/:version/reference/method/sh.waitForBalancerOff",
                  },
                  {
                    label: "sh.waitForPingChange",
                    contentSite: "docs",
                    url: "/docs/:version/reference/method/sh.waitForPingChange",
                  },
                ],
              },
              {
                label: "Object Constructors",
                contentSite: "docs",
                url: "/docs/:version/reference/method/js-constructor",
                collapsible: true,
                items: [
                  {
                    label: "Binary.createFromBase64",
                    contentSite: "docs",
                    url: "/docs/:version/reference/method/Binary.createFromBase64",
                  },
                  {
                    label: "Binary.createFromHexString",
                    contentSite: "docs",
                    url: "/docs/:version/reference/method/Binary.createFromHexString",
                  },
                  {
                    label: "BinData",
                    contentSite: "docs",
                    url: "/docs/:version/reference/method/BinData",
                  },
                  {
                    label: "BSONRegExp",
                    contentSite: "docs",
                    url: "/docs/:version/reference/method/BSONRegExp",
                  },
                  {
                    label: "BulkWriteResult",
                    contentSite: "docs",
                    url: "/docs/:version/reference/method/BulkWriteResult",
                  },
                  {
                    label: "Date",
                    contentSite: "docs",
                    url: "/docs/:version/reference/method/Date",
                  },
                  {
                    label: "HexData",
                    contentSite: "docs",
                    url: "/docs/:version/reference/method/HexData",
                  },
                  {
                    label: "ObjectId",
                    contentSite: "docs",
                    url: "/docs/:version/reference/method/ObjectId",
                  },
                  {
                    label: "ObjectId.createFromBase64",
                    contentSite: "docs",
                    url: "/docs/:version/reference/method/ObjectId.createFromBase64",
                  },
                  {
                    label: "ObjectId.createFromHexString",
                    contentSite: "docs",
                    url: "/docs/:version/reference/method/ObjectId.createFromHexString",
                  },
                  {
                    label: "ObjectId.getTimestamp",
                    contentSite: "docs",
                    url: "/docs/:version/reference/method/ObjectId.getTimestamp",
                  },
                  {
                    label: "ObjectId.toString",
                    contentSite: "docs",
                    url: "/docs/:version/reference/method/ObjectId.toString",
                  },
                  {
                    label: "UUID",
                    contentSite: "docs",
                    url: "/docs/:version/reference/method/UUID",
                  },
                  {
                    label: "WriteResult",
                    contentSite: "docs",
                    url: "/docs/:version/reference/method/WriteResult",
                  },
                ],
              },
              {
                label: "Connections",
                contentSite: "docs",
                url: "/docs/:version/reference/method/js-connection",
                collapsible: true,
                items: [
                  {
                    label: "connect",
                    contentSite: "docs",
                    url: "/docs/:version/reference/method/connect",
                  },
                  {
                    label: "Mongo",
                    contentSite: "docs",
                    url: "/docs/:version/reference/method/Mongo",
                  },
                  {
                    label: "Mongo.getDB",
                    contentSite: "docs",
                    url: "/docs/:version/reference/method/Mongo.getDB",
                  },
                  {
                    label: "Mongo.getDBNames",
                    contentSite: "docs",
                    url: "/docs/:version/reference/method/Mongo.getDBNames",
                  },
                  {
                    label: "Mongo.getDBs",
                    contentSite: "docs",
                    url: "/docs/:version/reference/method/Mongo.getDBs",
                  },
                  {
                    label: "Mongo.getReadPrefMode",
                    contentSite: "docs",
                    url: "/docs/:version/reference/method/Mongo.getReadPrefMode",
                  },
                  {
                    label: "Mongo.getReadPrefTagSet",
                    contentSite: "docs",
                    url: "/docs/:version/reference/method/Mongo.getReadPrefTagSet",
                  },
                  {
                    label: "Mongo.getURI",
                    contentSite: "docs",
                    url: "/docs/:version/reference/method/Mongo.getURI",
                  },
                  {
                    label: "Mongo.getWriteConcern",
                    contentSite: "docs",
                    url: "/docs/:version/reference/method/Mongo.getWriteConcern",
                  },
                  {
                    label: "Mongo.setCausalConsistency",
                    contentSite: "docs",
                    url: "/docs/:version/reference/method/Mongo.setCausalConsistency",
                  },
                  {
                    label: "Mongo.setReadPref",
                    contentSite: "docs",
                    url: "/docs/:version/reference/method/Mongo.setReadPref",
                  },
                  {
                    label: "Mongo.startSession",
                    contentSite: "docs",
                    url: "/docs/:version/reference/method/Mongo.startSession",
                  },
                  {
                    label: "Mongo.setWriteConcern",
                    contentSite: "docs",
                    url: "/docs/:version/reference/method/Mongo.setWriteConcern",
                  },
                  {
                    label: "Mongo.watch",
                    contentSite: "docs",
                    url: "/docs/:version/reference/method/Mongo.watch",
                  },
                  {
                    label: "Session",
                    contentSite: "docs",
                    url: "/docs/:version/reference/method/Session",
                    collapsible: true,
                    items: [
                      {
                        label: "Session.abortTransaction()",
                        contentSite: "docs",
                        url: "/docs/:version/reference/method/Session.abortTransaction",
                      },
                      {
                        label: "Session.commitTransaction()",
                        contentSite: "docs",
                        url: "/docs/:version/reference/method/Session.commitTransaction",
                      },
                      {
                        label: "Session.startTransaction()",
                        contentSite: "docs",
                        url: "/docs/:version/reference/method/Session.startTransaction",
                      },
                      {
                        label: "Session.withTransaction()",
                        contentSite: "docs",
                        url: "/docs/:version/reference/method/Session.withTransaction",
                      },
                    ],
                  },
                  {
                    label: "SessionOptions",
                    contentSite: "docs",
                    url: "/docs/:version/reference/method/SessionOptions",
                  },
                ],
              },
              {
                label: "In-Use Encryption",
                contentSite: "docs",
                url: "/docs/:version/reference/method/js-client-side-field-level-encryption",
                collapsible: true,
                items: [
                  {
                    label: "ClientEncryption.createEncryptedCollection",
                    contentSite: "docs",
                    url: "/docs/:version/reference/method/ClientEncryption.createEncryptedCollection",
                  },
                  {
                    label: "ClientEncryption.encrypt",
                    contentSite: "docs",
                    url: "/docs/:version/reference/method/ClientEncryption.encrypt",
                  },
                  {
                    label: "ClientEncryption.encryptExpression",
                    contentSite: "docs",
                    url: "/docs/:version/reference/method/ClientEncryption.encryptExpression",
                  },
                  {
                    label: "ClientEncryption.decrypt",
                    contentSite: "docs",
                    url: "/docs/:version/reference/method/ClientEncryption.decrypt",
                  },
                  {
                    label: "getClientEncryption",
                    contentSite: "docs",
                    url: "/docs/:version/reference/method/getClientEncryption",
                  },
                  {
                    label: "getKeyVault",
                    contentSite: "docs",
                    url: "/docs/:version/reference/method/getKeyVault",
                  },
                  {
                    label: "KeyVault.addKeyName",
                    contentSite: "docs",
                    url: "/docs/:version/reference/method/KeyVault.addKeyName",
                  },
                  {
                    label: "KeyVault.addKeyAlternateName",
                    contentSite: "docs",
                    url: "/docs/:version/reference/method/KeyVault.addKeyAlternateName",
                  },
                  {
                    label: "KeyVault.createDataKey",
                    contentSite: "docs",
                    url: "/docs/:version/reference/method/KeyVault.createDataKey",
                  },
                  {
                    label: "KeyVault.createKey",
                    contentSite: "docs",
                    url: "/docs/:version/reference/method/KeyVault.createKey",
                  },
                  {
                    label: "KeyVault.deleteKey",
                    contentSite: "docs",
                    url: "/docs/:version/reference/method/KeyVault.deleteKey",
                  },
                  {
                    label: "KeyVault.getKey",
                    contentSite: "docs",
                    url: "/docs/:version/reference/method/KeyVault.getKey",
                  },
                  {
                    label: "KeyVault.getKeys",
                    contentSite: "docs",
                    url: "/docs/:version/reference/method/KeyVault.getKeys",
                  },
                  {
                    label: "KeyVault.getKeyByAltName",
                    contentSite: "docs",
                    url: "/docs/:version/reference/method/KeyVault.getKeyByAltName",
                  },
                  {
                    label: "KeyVault.removeKeyAlternateName",
                    contentSite: "docs",
                    url: "/docs/:version/reference/method/KeyVault.removeKeyAlternateName",
                  },
                  {
                    label: "KeyVault.removeKeyAltName",
                    contentSite: "docs",
                    url: "/docs/:version/reference/method/KeyVault.removeKeyAltName",
                  },
                  {
                    label: "KeyVault.rewrapManyDataKey",
                    contentSite: "docs",
                    url: "/docs/:version/reference/method/KeyVault.rewrapManyDataKey",
                  },
                ],
              },
            ],
          },
          {
            label: "Query Language",
            contentSite: "docs",
            url: "/docs/:version/reference/mql",
            collapsible: true,
            items: [
              {
                label: "CRUD Commands",
                contentSite: "docs",
                url: "/docs/:version/reference/mql/crud-commands",
                collapsible: true,
                items: [
                  {
                    label: "aggregate",
                    contentSite: "docs",
                    url: "/docs/:version/reference/command/aggregate",
                  },
                  {
                    label: "bulkWrite",
                    contentSite: "docs",
                    url: "/docs/:version/reference/command/bulkWrite",
                  },
                  {
                    label: "count",
                    contentSite: "docs",
                    url: "/docs/:version/reference/command/count",
                  },
                  {
                    label: "delete",
                    contentSite: "docs",
                    url: "/docs/:version/reference/command/delete",
                  },
                  {
                    label: "distinct",
                    contentSite: "docs",
                    url: "/docs/:version/reference/command/distinct",
                  },
                  {
                    label: "find",
                    contentSite: "docs",
                    url: "/docs/:version/reference/command/find",
                  },
                  {
                    label: "findAndModify",
                    contentSite: "docs",
                    url: "/docs/:version/reference/command/findAndModify",
                  },
                  {
                    label: "getMore",
                    contentSite: "docs",
                    url: "/docs/:version/reference/command/getMore",
                  },
                  {
                    label: "insert",
                    contentSite: "docs",
                    url: "/docs/:version/reference/command/insert",
                  },
                  {
                    label: "mapReduce",
                    contentSite: "docs",
                    url: "/docs/:version/reference/command/mapReduce",
                  },
                  {
                    label: "update",
                    contentSite: "docs",
                    url: "/docs/:version/reference/command/update",
                  },
                ],
              },
              {
                label: "Aggregation Stages",
                contentSite: "docs",
                url: "/docs/:version/reference/mql/aggregation-stages",
                collapsible: true,
                items: [
                  {
                    label: "$addFields",
                    contentSite: "docs",
                    url: "/docs/:version/reference/operator/aggregation/addFields",
                  },
                  {
                    label: "$bucket",
                    contentSite: "docs",
                    url: "/docs/:version/reference/operator/aggregation/bucket",
                  },
                  {
                    label: "$bucketAuto",
                    contentSite: "docs",
                    url: "/docs/:version/reference/operator/aggregation/bucketAuto",
                  },
                  {
                    label: "$changeStream",
                    contentSite: "docs",
                    url: "/docs/:version/reference/operator/aggregation/changeStream",
                  },
                  {
                    label: "$changeStreamSplitLargeEvent",
                    contentSite: "docs",
                    url: "/docs/:version/reference/operator/aggregation/changeStreamSplitLargeEvent",
                  },
                  {
                    label: "$collStats",
                    contentSite: "docs",
                    url: "/docs/:version/reference/operator/aggregation/collStats",
                  },
                  {
                    label: "$count",
                    contentSite: "docs",
                    url: "/docs/:version/reference/operator/aggregation/count",
                  },
                  {
                    label: "$currentOp",
                    contentSite: "docs",
                    url: "/docs/:version/reference/operator/aggregation/currentOp",
                  },
                  {
                    label: "$densify",
                    contentSite: "docs",
                    url: "/docs/:version/reference/operator/aggregation/densify",
                  },
                  {
                    label: "$documents",
                    contentSite: "docs",
                    url: "/docs/:version/reference/operator/aggregation/documents",
                  },
                  {
                    label: "$facet",
                    contentSite: "docs",
                    url: "/docs/:version/reference/operator/aggregation/facet",
                  },
                  {
                    label: "$fill",
                    contentSite: "docs",
                    url: "/docs/:version/reference/operator/aggregation/fill",
                  },
                  {
                    label: "$geoNear",
                    contentSite: "docs",
                    url: "/docs/:version/reference/operator/aggregation/geoNear",
                  },
                  {
                    label: "$graphLookup",
                    contentSite: "docs",
                    url: "/docs/:version/reference/operator/aggregation/graphLookup",
                  },
                  {
                    label: "$group",
                    contentSite: "docs",
                    url: "/docs/:version/reference/operator/aggregation/group",
                  },
                  {
                    label: "$indexStats",
                    contentSite: "docs",
                    url: "/docs/:version/reference/operator/aggregation/indexStats",
                  },
                  {
                    label: "$limit",
                    contentSite: "docs",
                    url: "/docs/:version/reference/operator/aggregation/limit",
                  },
                  {
                    label: "$listClusterCatalog",
                    contentSite: "docs",
                    url: "/docs/:version/reference/operator/aggregation/listClusterCatalog",
                  },
                  {
                    label: "$listLocalSessions",
                    contentSite: "docs",
                    url: "/docs/:version/reference/operator/aggregation/listLocalSessions",
                  },
                  {
                    label: "$listSampledQueries",
                    contentSite: "docs",
                    url: "/docs/:version/reference/operator/aggregation/listSampledQueries",
                  },
                  {
                    label: "$listSearchIndexes",
                    contentSite: "docs",
                    url: "/docs/:version/reference/operator/aggregation/listSearchIndexes",
                  },
                  {
                    label: "$listSessions",
                    contentSite: "docs",
                    url: "/docs/:version/reference/operator/aggregation/listSessions",
                  },
                  {
                    label: "$lookup",
                    contentSite: "docs",
                    url: "/docs/:version/reference/operator/aggregation/lookup",
                  },
                  {
                    label: "$match",
                    contentSite: "docs",
                    url: "/docs/:version/reference/operator/aggregation/match",
                  },
                  {
                    label: "$merge",
                    contentSite: "docs",
                    url: "/docs/:version/reference/operator/aggregation/merge",
                  },
                  {
                    label: "$out",
                    contentSite: "docs",
                    url: "/docs/:version/reference/operator/aggregation/out",
                  },
                  {
                    label: "$planCacheStats",
                    contentSite: "docs",
                    url: "/docs/:version/reference/operator/aggregation/planCacheStats",
                  },
                  {
                    label: "$project",
                    contentSite: "docs",
                    url: "/docs/:version/reference/operator/aggregation/project",
                  },
                  {
                    label: "$querySettings",
                    contentSite: "docs",
                    url: "/docs/:version/reference/operator/aggregation/querySettings",
                  },
                  {
                    label: "$queryStats",
                    contentSite: "docs",
                    url: "/docs/:version/reference/operator/aggregation/queryStats",
                    collapsible: true,
                    items: [
                      {
                        label: "Toggle Log Output",
                        contentSite: "docs",
                        url: "/docs/:version/reference/operator/aggregation/queryStats/toggle-logging",
                      },
                    ],
                  },
                  {
                    label: "$redact",
                    contentSite: "docs",
                    url: "/docs/:version/reference/operator/aggregation/redact",
                  },
                  {
                    label: "$replaceRoot",
                    contentSite: "docs",
                    url: "/docs/:version/reference/operator/aggregation/replaceRoot",
                  },
                  {
                    label: "$replaceWith",
                    contentSite: "docs",
                    url: "/docs/:version/reference/operator/aggregation/replaceWith",
                  },
                  {
                    label: "$sample",
                    contentSite: "docs",
                    url: "/docs/:version/reference/operator/aggregation/sample",
                  },
                  {
                    label: "$search",
                    contentSite: "docs",
                    url: "/docs/:version/reference/operator/aggregation/search",
                  },
                  {
                    label: "$searchMeta",
                    contentSite: "docs",
                    url: "/docs/:version/reference/operator/aggregation/searchMeta",
                  },
                  {
                    label: "$set",
                    contentSite: "docs",
                    url: "/docs/:version/reference/operator/aggregation/set",
                  },
                  {
                    label: "$setWindowFields",
                    contentSite: "docs",
                    url: "/docs/:version/reference/operator/aggregation/setWindowFields",
                  },
                  {
                    label: "$shardedDataDistribution",
                    contentSite: "docs",
                    url: "/docs/:version/reference/operator/aggregation/shardedDataDistribution",
                  },
                  {
                    label: "$skip",
                    contentSite: "docs",
                    url: "/docs/:version/reference/operator/aggregation/skip",
                  },
                  {
                    label: "$sort",
                    contentSite: "docs",
                    url: "/docs/:version/reference/operator/aggregation/sort",
                  },
                  {
                    label: "$sortByCount",
                    contentSite: "docs",
                    url: "/docs/:version/reference/operator/aggregation/sortByCount",
                  },
                  {
                    label: "$unionWith",
                    contentSite: "docs",
                    url: "/docs/:version/reference/operator/aggregation/unionWith",
                  },
                  {
                    label: "$unset",
                    contentSite: "docs",
                    url: "/docs/:version/reference/operator/aggregation/unset",
                  },
                  {
                    label: "$unwind",
                    contentSite: "docs",
                    url: "/docs/:version/reference/operator/aggregation/unwind",
                  },
                  {
                    label: "$vectorSearch",
                    contentSite: "docs",
                    url: "/docs/:version/reference/operator/aggregation/vectorSearch",
                  },
                ],
              },
              {
                label: "Query Predicates",
                contentSite: "docs",
                url: "/docs/:version/reference/mql/query-predicates",
                collapsible: true,
                items: [
                  {
                    label: "Arrays",
                    contentSite: "docs",
                    url: "/docs/:version/reference/mql/query-predicates/arrays",
                    collapsible: true,
                    items: [
                      {
                        label: "$all",
                        contentSite: "docs",
                        url: "/docs/:version/reference/operator/query/all",
                      },
                      {
                        label: "$elemMatch",
                        contentSite: "docs",
                        url: "/docs/:version/reference/operator/query/elemMatch",
                      },
                      {
                        label: "$size",
                        contentSite: "docs",
                        url: "/docs/:version/reference/operator/query/size",
                      },
                    ],
                  },
                  {
                    label: "Bitwise",
                    contentSite: "docs",
                    url: "/docs/:version/reference/mql/query-predicates/bitwise",
                    collapsible: true,
                    items: [
                      {
                        label: "$bitsAllClear",
                        contentSite: "docs",
                        url: "/docs/:version/reference/operator/query/bitsAllClear",
                      },
                      {
                        label: "$bitsAllSet",
                        contentSite: "docs",
                        url: "/docs/:version/reference/operator/query/bitsAllSet",
                      },
                      {
                        label: "$bitsAnyClear",
                        contentSite: "docs",
                        url: "/docs/:version/reference/operator/query/bitsAnyClear",
                      },
                      {
                        label: "$bitsAnySet",
                        contentSite: "docs",
                        url: "/docs/:version/reference/operator/query/bitsAnySet",
                      },
                    ],
                  },
                  {
                    label: "Comparison",
                    contentSite: "docs",
                    url: "/docs/:version/reference/mql/query-predicates/comparison",
                    collapsible: true,
                    items: [
                      {
                        label: "$eq",
                        contentSite: "docs",
                        url: "/docs/:version/reference/operator/query/eq",
                      },
                      {
                        label: "$gt",
                        contentSite: "docs",
                        url: "/docs/:version/reference/operator/query/gt",
                      },
                      {
                        label: "$gte",
                        contentSite: "docs",
                        url: "/docs/:version/reference/operator/query/gte",
                      },
                      {
                        label: "$in",
                        contentSite: "docs",
                        url: "/docs/:version/reference/operator/query/in",
                      },
                      {
                        label: "$lt",
                        contentSite: "docs",
                        url: "/docs/:version/reference/operator/query/lt",
                      },
                      {
                        label: "$lte",
                        contentSite: "docs",
                        url: "/docs/:version/reference/operator/query/lte",
                      },
                      {
                        label: "$ne",
                        contentSite: "docs",
                        url: "/docs/:version/reference/operator/query/ne",
                      },
                      {
                        label: "$nin",
                        contentSite: "docs",
                        url: "/docs/:version/reference/operator/query/nin",
                      },
                    ],
                  },
                  {
                    label: "Data Type",
                    contentSite: "docs",
                    url: "/docs/:version/reference/mql/query-predicates/data-type",
                    collapsible: true,
                    items: [
                      {
                        label: "$exists",
                        contentSite: "docs",
                        url: "/docs/:version/reference/operator/query/exists",
                      },
                      {
                        label: "$type",
                        contentSite: "docs",
                        url: "/docs/:version/reference/operator/query/type",
                      },
                    ],
                  },
                  {
                    label: "Geospatial",
                    contentSite: "docs",
                    url: "/docs/:version/reference/mql/query-predicates/geospatial",
                    collapsible: true,
                    items: [
                      {
                        label: "$box",
                        contentSite: "docs",
                        url: "/docs/:version/reference/operator/query/box",
                      },
                      {
                        label: "$center",
                        contentSite: "docs",
                        url: "/docs/:version/reference/operator/query/center",
                      },
                      {
                        label: "$centerSphere",
                        contentSite: "docs",
                        url: "/docs/:version/reference/operator/query/centerSphere",
                      },
                      {
                        label: "$geoIntersects",
                        contentSite: "docs",
                        url: "/docs/:version/reference/operator/query/geoIntersects",
                      },
                      {
                        label: "$geometry",
                        contentSite: "docs",
                        url: "/docs/:version/reference/operator/query/geometry",
                      },
                      {
                        label: "$geoWithin",
                        contentSite: "docs",
                        url: "/docs/:version/reference/operator/query/geoWithin",
                      },
                      {
                        label: "$maxDistance",
                        contentSite: "docs",
                        url: "/docs/:version/reference/operator/query/maxDistance",
                      },
                      {
                        label: "$minDistance",
                        contentSite: "docs",
                        url: "/docs/:version/reference/operator/query/minDistance",
                      },
                      {
                        label: "$near",
                        contentSite: "docs",
                        url: "/docs/:version/reference/operator/query/near",
                      },
                      {
                        label: "$nearSphere",
                        contentSite: "docs",
                        url: "/docs/:version/reference/operator/query/nearSphere",
                      },
                      {
                        label: "$polygon",
                        contentSite: "docs",
                        url: "/docs/:version/reference/operator/query/polygon",
                      },
                    ],
                  },
                  {
                    label: "Logical",
                    contentSite: "docs",
                    url: "/docs/:version/reference/mql/query-predicates/logical",
                    collapsible: true,
                    items: [
                      {
                        label: "$and",
                        contentSite: "docs",
                        url: "/docs/:version/reference/operator/query/and",
                      },
                      {
                        label: "$nor",
                        contentSite: "docs",
                        url: "/docs/:version/reference/operator/query/nor",
                      },
                      {
                        label: "$not",
                        contentSite: "docs",
                        url: "/docs/:version/reference/operator/query/not",
                      },
                      {
                        label: "$or",
                        contentSite: "docs",
                        url: "/docs/:version/reference/operator/query/or",
                      },
                    ],
                  },
                  {
                    label: "Miscellaneous",
                    contentSite: "docs",
                    url: "/docs/:version/reference/mql/query-predicates/misc",
                    collapsible: true,
                    items: [
                      {
                        label: "$expr",
                        contentSite: "docs",
                        url: "/docs/:version/reference/operator/query/expr",
                      },
                      {
                        label: "$jsonSchema",
                        contentSite: "docs",
                        url: "/docs/:version/reference/operator/query/jsonSchema",
                      },
                      {
                        label: "$mod",
                        contentSite: "docs",
                        url: "/docs/:version/reference/operator/query/mod",
                      },
                      {
                        label: "$regex",
                        contentSite: "docs",
                        url: "/docs/:version/reference/operator/query/regex",
                      },
                      {
                        label: "$where",
                        contentSite: "docs",
                        url: "/docs/:version/reference/operator/query/where",
                      },
                    ],
                  },
                ],
              },
              {
                label: "Expressions",
                contentSite: "docs",
                url: "/docs/:version/reference/mql/expressions",
                collapsible: true,
                items: [
                  {
                    label: "$abs",
                    contentSite: "docs",
                    url: "/docs/:version/reference/operator/aggregation/abs",
                  },
                  {
                    label: "$acos",
                    contentSite: "docs",
                    url: "/docs/:version/reference/operator/aggregation/acos",
                  },
                  {
                    label: "$acosh",
                    contentSite: "docs",
                    url: "/docs/:version/reference/operator/aggregation/acosh",
                  },
                  {
                    label: "$add",
                    contentSite: "docs",
                    url: "/docs/:version/reference/operator/aggregation/add",
                  },
                  {
                    label: "$allElementsTrue",
                    contentSite: "docs",
                    url: "/docs/:version/reference/operator/aggregation/allElementsTrue",
                  },
                  {
                    label: "$and",
                    contentSite: "docs",
                    url: "/docs/:version/reference/operator/aggregation/and",
                  },
                  {
                    label: "$anyElementTrue",
                    contentSite: "docs",
                    url: "/docs/:version/reference/operator/aggregation/anyElementTrue",
                  },
                  {
                    label: "$arrayElemAt",
                    contentSite: "docs",
                    url: "/docs/:version/reference/operator/aggregation/arrayElemAt",
                  },
                  {
                    label: "$arrayToObject",
                    contentSite: "docs",
                    url: "/docs/:version/reference/operator/aggregation/arrayToObject",
                  },
                  {
                    label: "$asin",
                    contentSite: "docs",
                    url: "/docs/:version/reference/operator/aggregation/asin",
                  },
                  {
                    label: "$asinh",
                    contentSite: "docs",
                    url: "/docs/:version/reference/operator/aggregation/asinh",
                  },
                  {
                    label: "$atan",
                    contentSite: "docs",
                    url: "/docs/:version/reference/operator/aggregation/atan",
                  },
                  {
                    label: "$atan2",
                    contentSite: "docs",
                    url: "/docs/:version/reference/operator/aggregation/atan2",
                  },
                  {
                    label: "$atanh",
                    contentSite: "docs",
                    url: "/docs/:version/reference/operator/aggregation/atanh",
                  },
                  {
                    label: "$binarySize",
                    contentSite: "docs",
                    url: "/docs/:version/reference/operator/aggregation/binarySize",
                  },
                  {
                    label: "$bitAnd",
                    contentSite: "docs",
                    url: "/docs/:version/reference/operator/aggregation/bitAnd",
                  },
                  {
                    label: "$bitNot",
                    contentSite: "docs",
                    url: "/docs/:version/reference/operator/aggregation/bitNot",
                  },
                  {
                    label: "$bitOr",
                    contentSite: "docs",
                    url: "/docs/:version/reference/operator/aggregation/bitOr",
                  },
                  {
                    label: "$bitXor",
                    contentSite: "docs",
                    url: "/docs/:version/reference/operator/aggregation/bitXor",
                  },
                  {
                    label: "$bsonSize",
                    contentSite: "docs",
                    url: "/docs/:version/reference/operator/aggregation/bsonSize",
                  },
                  {
                    label: "$ceil",
                    contentSite: "docs",
                    url: "/docs/:version/reference/operator/aggregation/ceil",
                  },
                  {
                    label: "$cmp",
                    contentSite: "docs",
                    url: "/docs/:version/reference/operator/aggregation/cmp",
                  },
                  {
                    label: "$concat",
                    contentSite: "docs",
                    url: "/docs/:version/reference/operator/aggregation/concat",
                  },
                  {
                    label: "$concatArrays",
                    contentSite: "docs",
                    url: "/docs/:version/reference/operator/aggregation/concatArrays",
                  },
                  {
                    label: "$cond",
                    contentSite: "docs",
                    url: "/docs/:version/reference/operator/aggregation/cond",
                  },
                  {
                    label: "$convert",
                    contentSite: "docs",
                    url: "/docs/:version/reference/operator/aggregation/convert",
                  },
                  {
                    label: "$cos",
                    contentSite: "docs",
                    url: "/docs/:version/reference/operator/aggregation/cos",
                  },
                  {
                    label: "$cosh",
                    contentSite: "docs",
                    url: "/docs/:version/reference/operator/aggregation/cosh",
                  },
                  {
                    label: "$count-accumulator",
                    contentSite: "docs",
                    url: "/docs/:version/reference/operator/aggregation/count-accumulator",
                  },
                  {
                    label: "$covariancePop",
                    contentSite: "docs",
                    url: "/docs/:version/reference/operator/aggregation/covariancePop",
                  },
                  {
                    label: "$covarianceSamp",
                    contentSite: "docs",
                    url: "/docs/:version/reference/operator/aggregation/covarianceSamp",
                  },
                  {
                    label: "$dateAdd",
                    contentSite: "docs",
                    url: "/docs/:version/reference/operator/aggregation/dateAdd",
                  },
                  {
                    label: "$dateDiff",
                    contentSite: "docs",
                    url: "/docs/:version/reference/operator/aggregation/dateDiff",
                  },
                  {
                    label: "$dateFromParts",
                    contentSite: "docs",
                    url: "/docs/:version/reference/operator/aggregation/dateFromParts",
                  },
                  {
                    label: "$dateFromString",
                    contentSite: "docs",
                    url: "/docs/:version/reference/operator/aggregation/dateFromString",
                  },
                  {
                    label: "$dateSubtract",
                    contentSite: "docs",
                    url: "/docs/:version/reference/operator/aggregation/dateSubtract",
                  },
                  {
                    label: "$dateToParts",
                    contentSite: "docs",
                    url: "/docs/:version/reference/operator/aggregation/dateToParts",
                  },
                  {
                    label: "$dateToString",
                    contentSite: "docs",
                    url: "/docs/:version/reference/operator/aggregation/dateToString",
                  },
                  {
                    label: "$dateTrunc",
                    contentSite: "docs",
                    url: "/docs/:version/reference/operator/aggregation/dateTrunc",
                  },
                  {
                    label: "$dayOfMonth",
                    contentSite: "docs",
                    url: "/docs/:version/reference/operator/aggregation/dayOfMonth",
                  },
                  {
                    label: "$dayOfWeek",
                    contentSite: "docs",
                    url: "/docs/:version/reference/operator/aggregation/dayOfWeek",
                  },
                  {
                    label: "$dayOfYear",
                    contentSite: "docs",
                    url: "/docs/:version/reference/operator/aggregation/dayOfYear",
                  },
                  {
                    label: "$degreesToRadians",
                    contentSite: "docs",
                    url: "/docs/:version/reference/operator/aggregation/degreesToRadians",
                  },
                  {
                    label: "$denseRank",
                    contentSite: "docs",
                    url: "/docs/:version/reference/operator/aggregation/denseRank",
                  },
                  {
                    label: "$derivative",
                    contentSite: "docs",
                    url: "/docs/:version/reference/operator/aggregation/derivative",
                  },
                  {
                    label: "$divide",
                    contentSite: "docs",
                    url: "/docs/:version/reference/operator/aggregation/divide",
                  },
                  {
                    label: "$documentNumber",
                    contentSite: "docs",
                    url: "/docs/:version/reference/operator/aggregation/documentNumber",
                  },
                  {
                    label: "$eq",
                    contentSite: "docs",
                    url: "/docs/:version/reference/operator/aggregation/eq",
                  },
                  {
                    label: "$exp",
                    contentSite: "docs",
                    url: "/docs/:version/reference/operator/aggregation/exp",
                  },
                  {
                    label: "$expMovingAvg",
                    contentSite: "docs",
                    url: "/docs/:version/reference/operator/aggregation/expMovingAvg",
                  },
                  {
                    label: "$filter",
                    contentSite: "docs",
                    url: "/docs/:version/reference/operator/aggregation/filter",
                  },
                  {
                    label: "$floor",
                    contentSite: "docs",
                    url: "/docs/:version/reference/operator/aggregation/floor",
                  },
                  {
                    label: "$function",
                    contentSite: "docs",
                    url: "/docs/:version/reference/operator/aggregation/function",
                  },
                  {
                    label: "$getField",
                    contentSite: "docs",
                    url: "/docs/:version/reference/operator/aggregation/getField",
                  },
                  {
                    label: "$gt",
                    contentSite: "docs",
                    url: "/docs/:version/reference/operator/aggregation/gt",
                  },
                  {
                    label: "$gte",
                    contentSite: "docs",
                    url: "/docs/:version/reference/operator/aggregation/gte",
                  },
                  {
                    label: "$hour",
                    contentSite: "docs",
                    url: "/docs/:version/reference/operator/aggregation/hour",
                  },
                  {
                    label: "$ifNull",
                    contentSite: "docs",
                    url: "/docs/:version/reference/operator/aggregation/ifNull",
                  },
                  {
                    label: "$in",
                    contentSite: "docs",
                    url: "/docs/:version/reference/operator/aggregation/in",
                  },
                  {
                    label: "$indexOfArray",
                    contentSite: "docs",
                    url: "/docs/:version/reference/operator/aggregation/indexOfArray",
                  },
                  {
                    label: "$indexOfBytes",
                    contentSite: "docs",
                    url: "/docs/:version/reference/operator/aggregation/indexOfBytes",
                  },
                  {
                    label: "$indexOfCP",
                    contentSite: "docs",
                    url: "/docs/:version/reference/operator/aggregation/indexOfCP",
                  },
                  {
                    label: "$integral",
                    contentSite: "docs",
                    url: "/docs/:version/reference/operator/aggregation/integral",
                  },
                  {
                    label: "$isArray",
                    contentSite: "docs",
                    url: "/docs/:version/reference/operator/aggregation/isArray",
                  },
                  {
                    label: "$isNumber",
                    contentSite: "docs",
                    url: "/docs/:version/reference/operator/aggregation/isNumber",
                  },
                  {
                    label: "$isoDayOfWeek",
                    contentSite: "docs",
                    url: "/docs/:version/reference/operator/aggregation/isoDayOfWeek",
                  },
                  {
                    label: "$isoWeek",
                    contentSite: "docs",
                    url: "/docs/:version/reference/operator/aggregation/isoWeek",
                  },
                  {
                    label: "$isoWeekYear",
                    contentSite: "docs",
                    url: "/docs/:version/reference/operator/aggregation/isoWeekYear",
                  },
                  {
                    label: "$let",
                    contentSite: "docs",
                    url: "/docs/:version/reference/operator/aggregation/let",
                  },
                  {
                    label: "$linearFill",
                    contentSite: "docs",
                    url: "/docs/:version/reference/operator/aggregation/linearFill",
                  },
                  {
                    label: "$literal",
                    contentSite: "docs",
                    url: "/docs/:version/reference/operator/aggregation/literal",
                  },
                  {
                    label: "$ln",
                    contentSite: "docs",
                    url: "/docs/:version/reference/operator/aggregation/ln",
                  },
                  {
                    label: "$locf",
                    contentSite: "docs",
                    url: "/docs/:version/reference/operator/aggregation/locf",
                  },
                  {
                    label: "$log",
                    contentSite: "docs",
                    url: "/docs/:version/reference/operator/aggregation/log",
                  },
                  {
                    label: "$log10",
                    contentSite: "docs",
                    url: "/docs/:version/reference/operator/aggregation/log10",
                  },
                  {
                    label: "$lt",
                    contentSite: "docs",
                    url: "/docs/:version/reference/operator/aggregation/lt",
                  },
                  {
                    label: "$lte",
                    contentSite: "docs",
                    url: "/docs/:version/reference/operator/aggregation/lte",
                  },
                  {
                    label: "$ltrim",
                    contentSite: "docs",
                    url: "/docs/:version/reference/operator/aggregation/ltrim",
                  },
                  {
                    label: "$map",
                    contentSite: "docs",
                    url: "/docs/:version/reference/operator/aggregation/map",
                  },
                  {
                    label: "$maxN-array-element",
                    contentSite: "docs",
                    url: "/docs/:version/reference/operator/aggregation/maxN-array-element",
                  },
                  {
                    label: "$meta",
                    contentSite: "docs",
                    url: "/docs/:version/reference/operator/aggregation/meta",
                  },
                  {
                    label: "$minN-array-element",
                    contentSite: "docs",
                    url: "/docs/:version/reference/operator/aggregation/minN-array-element",
                  },
                  {
                    label: "$millisecond",
                    contentSite: "docs",
                    url: "/docs/:version/reference/operator/aggregation/millisecond",
                  },
                  {
                    label: "$minute",
                    contentSite: "docs",
                    url: "/docs/:version/reference/operator/aggregation/minute",
                  },
                  {
                    label: "$mod",
                    contentSite: "docs",
                    url: "/docs/:version/reference/operator/aggregation/mod",
                  },
                  {
                    label: "$month",
                    contentSite: "docs",
                    url: "/docs/:version/reference/operator/aggregation/month",
                  },
                  {
                    label: "$multiply",
                    contentSite: "docs",
                    url: "/docs/:version/reference/operator/aggregation/multiply",
                  },
                  {
                    label: "$ne",
                    contentSite: "docs",
                    url: "/docs/:version/reference/operator/aggregation/ne",
                  },
                  {
                    label: "$not",
                    contentSite: "docs",
                    url: "/docs/:version/reference/operator/aggregation/not",
                  },
                  {
                    label: "$objectToArray",
                    contentSite: "docs",
                    url: "/docs/:version/reference/operator/aggregation/objectToArray",
                  },
                  {
                    label: "$or",
                    contentSite: "docs",
                    url: "/docs/:version/reference/operator/aggregation/or",
                  },
                  {
                    label: "$pow",
                    contentSite: "docs",
                    url: "/docs/:version/reference/operator/aggregation/pow",
                  },
                  {
                    label: "$radiansToDegrees",
                    contentSite: "docs",
                    url: "/docs/:version/reference/operator/aggregation/radiansToDegrees",
                  },
                  {
                    label: "$rand",
                    contentSite: "docs",
                    url: "/docs/:version/reference/operator/aggregation/rand",
                  },
                  {
                    label: "$range",
                    contentSite: "docs",
                    url: "/docs/:version/reference/operator/aggregation/range",
                  },
                  {
                    label: "$rank",
                    contentSite: "docs",
                    url: "/docs/:version/reference/operator/aggregation/rank",
                  },
                  {
                    label: "$reduce",
                    contentSite: "docs",
                    url: "/docs/:version/reference/operator/aggregation/reduce",
                  },
                  {
                    label: "$regexFind",
                    contentSite: "docs",
                    url: "/docs/:version/reference/operator/aggregation/regexFind",
                  },
                  {
                    label: "$regexFindAll",
                    contentSite: "docs",
                    url: "/docs/:version/reference/operator/aggregation/regexFindAll",
                  },
                  {
                    label: "$regexMatch",
                    contentSite: "docs",
                    url: "/docs/:version/reference/operator/aggregation/regexMatch",
                  },
                  {
                    label: "$replaceOne",
                    contentSite: "docs",
                    url: "/docs/:version/reference/operator/aggregation/replaceOne",
                  },
                  {
                    label: "$replaceAll",
                    contentSite: "docs",
                    url: "/docs/:version/reference/operator/aggregation/replaceAll",
                  },
                  {
                    label: "$reverseArray",
                    contentSite: "docs",
                    url: "/docs/:version/reference/operator/aggregation/reverseArray",
                  },
                  {
                    label: "$round",
                    contentSite: "docs",
                    url: "/docs/:version/reference/operator/aggregation/round",
                  },
                  {
                    label: "$rtrim",
                    contentSite: "docs",
                    url: "/docs/:version/reference/operator/aggregation/rtrim",
                  },
                  {
                    label: "$sampleRate",
                    contentSite: "docs",
                    url: "/docs/:version/reference/operator/aggregation/sampleRate",
                  },
                  {
                    label: "$second",
                    contentSite: "docs",
                    url: "/docs/:version/reference/operator/aggregation/second",
                  },
                  {
                    label: "$setDifference",
                    contentSite: "docs",
                    url: "/docs/:version/reference/operator/aggregation/setDifference",
                  },
                  {
                    label: "$setEquals",
                    contentSite: "docs",
                    url: "/docs/:version/reference/operator/aggregation/setEquals",
                  },
                  {
                    label: "$setField",
                    contentSite: "docs",
                    url: "/docs/:version/reference/operator/aggregation/setField",
                  },
                  {
                    label: "$setIntersection",
                    contentSite: "docs",
                    url: "/docs/:version/reference/operator/aggregation/setIntersection",
                  },
                  {
                    label: "$setIsSubset",
                    contentSite: "docs",
                    url: "/docs/:version/reference/operator/aggregation/setIsSubset",
                  },
                  {
                    label: "$setUnion",
                    contentSite: "docs",
                    url: "/docs/:version/reference/operator/aggregation/setUnion",
                  },
                  {
                    label: "$shift",
                    contentSite: "docs",
                    url: "/docs/:version/reference/operator/aggregation/shift",
                  },
                  {
                    label: "$size",
                    contentSite: "docs",
                    url: "/docs/:version/reference/operator/aggregation/size",
                  },
                  {
                    label: "$sin",
                    contentSite: "docs",
                    url: "/docs/:version/reference/operator/aggregation/sin",
                  },
                  {
                    label: "$sinh",
                    contentSite: "docs",
                    url: "/docs/:version/reference/operator/aggregation/sinh",
                  },
                  {
                    label: "$slice",
                    contentSite: "docs",
                    url: "/docs/:version/reference/operator/aggregation/slice",
                  },
                  {
                    label: "$sortArray",
                    contentSite: "docs",
                    url: "/docs/:version/reference/operator/aggregation/sortArray",
                  },
                  {
                    label: "$split",
                    contentSite: "docs",
                    url: "/docs/:version/reference/operator/aggregation/split",
                  },
                  {
                    label: "$sqrt",
                    contentSite: "docs",
                    url: "/docs/:version/reference/operator/aggregation/sqrt",
                  },
                  {
                    label: "$strcasecmp",
                    contentSite: "docs",
                    url: "/docs/:version/reference/operator/aggregation/strcasecmp",
                  },
                  {
                    label: "$strLenBytes",
                    contentSite: "docs",
                    url: "/docs/:version/reference/operator/aggregation/strLenBytes",
                  },
                  {
                    label: "$strLenCP",
                    contentSite: "docs",
                    url: "/docs/:version/reference/operator/aggregation/strLenCP",
                  },
                  {
                    label: "$substr",
                    contentSite: "docs",
                    url: "/docs/:version/reference/operator/aggregation/substr",
                  },
                  {
                    label: "$substrBytes",
                    contentSite: "docs",
                    url: "/docs/:version/reference/operator/aggregation/substrBytes",
                  },
                  {
                    label: "$substrCP",
                    contentSite: "docs",
                    url: "/docs/:version/reference/operator/aggregation/substrCP",
                  },
                  {
                    label: "$subtract",
                    contentSite: "docs",
                    url: "/docs/:version/reference/operator/aggregation/subtract",
                  },
                  {
                    label: "$switch",
                    contentSite: "docs",
                    url: "/docs/:version/reference/operator/aggregation/switch",
                  },
                  {
                    label: "$tan",
                    contentSite: "docs",
                    url: "/docs/:version/reference/operator/aggregation/tan",
                  },
                  {
                    label: "$tanh",
                    contentSite: "docs",
                    url: "/docs/:version/reference/operator/aggregation/tanh",
                  },
                  {
                    label: "$toBool",
                    contentSite: "docs",
                    url: "/docs/:version/reference/operator/aggregation/toBool",
                  },
                  {
                    label: "$toDate",
                    contentSite: "docs",
                    url: "/docs/:version/reference/operator/aggregation/toDate",
                  },
                  {
                    label: "$toDecimal",
                    contentSite: "docs",
                    url: "/docs/:version/reference/operator/aggregation/toDecimal",
                  },
                  {
                    label: "$toDouble",
                    contentSite: "docs",
                    url: "/docs/:version/reference/operator/aggregation/toDouble",
                  },
                  {
                    label: "$toHashedIndexKey",
                    contentSite: "docs",
                    url: "/docs/:version/reference/operator/aggregation/toHashedIndexKey",
                  },
                  {
                    label: "$toInt",
                    contentSite: "docs",
                    url: "/docs/:version/reference/operator/aggregation/toInt",
                  },
                  {
                    label: "$toLong",
                    contentSite: "docs",
                    url: "/docs/:version/reference/operator/aggregation/toLong",
                  },
                  {
                    label: "$toObjectId",
                    contentSite: "docs",
                    url: "/docs/:version/reference/operator/aggregation/toObjectId",
                  },
                  {
                    label: "$toString",
                    contentSite: "docs",
                    url: "/docs/:version/reference/operator/aggregation/toString",
                  },
                  {
                    label: "$toLower",
                    contentSite: "docs",
                    url: "/docs/:version/reference/operator/aggregation/toLower",
                  },
                  {
                    label: "$toUpper",
                    contentSite: "docs",
                    url: "/docs/:version/reference/operator/aggregation/toUpper",
                  },
                  {
                    label: "$toUUID",
                    contentSite: "docs",
                    url: "/docs/:version/reference/operator/aggregation/toUUID",
                  },
                  {
                    label: "$tsIncrement",
                    contentSite: "docs",
                    url: "/docs/:version/reference/operator/aggregation/tsIncrement",
                  },
                  {
                    label: "$tsSecond",
                    contentSite: "docs",
                    url: "/docs/:version/reference/operator/aggregation/tsSecond",
                  },
                  {
                    label: "$trim",
                    contentSite: "docs",
                    url: "/docs/:version/reference/operator/aggregation/trim",
                  },
                  {
                    label: "$trunc",
                    contentSite: "docs",
                    url: "/docs/:version/reference/operator/aggregation/trunc",
                  },
                  {
                    label: "$type",
                    contentSite: "docs",
                    url: "/docs/:version/reference/operator/aggregation/type",
                  },
                  {
                    label: "$unsetField",
                    contentSite: "docs",
                    url: "/docs/:version/reference/operator/aggregation/unsetField",
                  },
                  {
                    label: "$week",
                    contentSite: "docs",
                    url: "/docs/:version/reference/operator/aggregation/week",
                  },
                  {
                    label: "$year",
                    contentSite: "docs",
                    url: "/docs/:version/reference/operator/aggregation/year",
                  },
                  {
                    label: "$zip",
                    contentSite: "docs",
                    url: "/docs/:version/reference/operator/aggregation/zip",
                  },
                ],
              },
              {
                label: "Projection",
                contentSite: "docs",
                url: "/docs/:version/reference/mql/projection",
                collapsible: true,
                items: [
                  {
                    label: "$",
                    contentSite: "docs",
                    url: "/docs/:version/reference/operator/projection/positional",
                  },
                  {
                    label: "$elemMatch",
                    contentSite: "docs",
                    url: "/docs/:version/reference/operator/projection/elemMatch",
                  },
                  {
                    label: "$slice",
                    contentSite: "docs",
                    url: "/docs/:version/reference/operator/projection/slice",
                  },
                ],
              },
              {
                label: "Accumulators",
                contentSite: "docs",
                url: "/docs/:version/reference/mql/accumulators",
                collapsible: true,
                items: [
                  {
                    label: "$accumulator",
                    contentSite: "docs",
                    url: "/docs/:version/reference/operator/aggregation/accumulator",
                  },
                  {
                    label: "$addToSet",
                    contentSite: "docs",
                    url: "/docs/:version/reference/operator/aggregation/addToSet",
                  },
                  {
                    label: "$avg",
                    contentSite: "docs",
                    url: "/docs/:version/reference/operator/aggregation/avg",
                  },
                  {
                    label: "$bottom",
                    contentSite: "docs",
                    url: "/docs/:version/reference/operator/aggregation/bottom",
                  },
                  {
                    label: "$bottomN",
                    contentSite: "docs",
                    url: "/docs/:version/reference/operator/aggregation/bottomN",
                  },
                  {
                    label: "$count",
                    contentSite: "docs",
                    url: "/docs/:version/reference/operator/aggregation/count-accumulator",
                  },
                  {
                    label: "$first",
                    contentSite: "docs",
                    url: "/docs/:version/reference/operator/aggregation/first",
                  },
                  {
                    label: "$firstN",
                    contentSite: "docs",
                    url: "/docs/:version/reference/operator/aggregation/firstN",
                  },
                  {
                    label: "$last",
                    contentSite: "docs",
                    url: "/docs/:version/reference/operator/aggregation/last",
                  },
                  {
                    label: "$lastN",
                    contentSite: "docs",
                    url: "/docs/:version/reference/operator/aggregation/lastN",
                  },
                  {
                    label: "$max",
                    contentSite: "docs",
                    url: "/docs/:version/reference/operator/aggregation/max",
                  },
                  {
                    label: "$maxN",
                    contentSite: "docs",
                    url: "/docs/:version/reference/operator/aggregation/maxN",
                  },
                  {
                    label: "$median",
                    contentSite: "docs",
                    url: "/docs/:version/reference/operator/aggregation/median",
                  },
                  {
                    label: "$mergeObjects",
                    contentSite: "docs",
                    url: "/docs/:version/reference/operator/aggregation/mergeObjects",
                  },
                  {
                    label: "$min",
                    contentSite: "docs",
                    url: "/docs/:version/reference/operator/aggregation/min",
                  },
                  {
                    label: "$minN",
                    contentSite: "docs",
                    url: "/docs/:version/reference/operator/aggregation/minN",
                  },
                  {
                    label: "$percentile",
                    contentSite: "docs",
                    url: "/docs/:version/reference/operator/aggregation/percentile",
                  },
                  {
                    label: "$push",
                    contentSite: "docs",
                    url: "/docs/:version/reference/operator/aggregation/push",
                  },
                  {
                    label: "$stdDevPop",
                    contentSite: "docs",
                    url: "/docs/:version/reference/operator/aggregation/stdDevPop",
                  },
                  {
                    label: "$stdDevSamp",
                    contentSite: "docs",
                    url: "/docs/:version/reference/operator/aggregation/stdDevSamp",
                  },
                  {
                    label: "$sum",
                    contentSite: "docs",
                    url: "/docs/:version/reference/operator/aggregation/sum",
                  },
                  {
                    label: "$top",
                    contentSite: "docs",
                    url: "/docs/:version/reference/operator/aggregation/top",
                  },
                  {
                    label: "$topN",
                    contentSite: "docs",
                    url: "/docs/:version/reference/operator/aggregation/topN",
                  },
                ],
              },
              {
                label: "Update",
                contentSite: "docs",
                url: "/docs/:version/reference/mql/update",
                collapsible: true,
                items: [
                  {
                    label: "Arrays",
                    contentSite: "docs",
                    url: "/docs/:version/reference/operator/update-array",
                    collapsible: true,
                    items: [
                      {
                        label: "$ (update)",
                        contentSite: "docs",
                        url: "/docs/:version/reference/operator/update/positional",
                      },
                      {
                        label: "$[]",
                        contentSite: "docs",
                        url: "/docs/:version/reference/operator/update/positional-all",
                      },
                      {
                        label: "$[<identifier>]",
                        contentSite: "docs",
                        url: "/docs/:version/reference/operator/update/positional-filtered",
                      },
                      {
                        label: "$addToSet",
                        contentSite: "docs",
                        url: "/docs/:version/reference/operator/update/addToSet",
                      },
                      {
                        label: "$pop",
                        contentSite: "docs",
                        url: "/docs/:version/reference/operator/update/pop",
                      },
                      {
                        label: "$pull",
                        contentSite: "docs",
                        url: "/docs/:version/reference/operator/update/pull",
                      },
                      {
                        label: "$push",
                        contentSite: "docs",
                        url: "/docs/:version/reference/operator/update/push",
                      },
                      {
                        label: "$pullAll",
                        contentSite: "docs",
                        url: "/docs/:version/reference/operator/update/pullAll",
                      },
                      {
                        label: "$each",
                        contentSite: "docs",
                        url: "/docs/:version/reference/operator/update/each",
                      },
                      {
                        label: "$position",
                        contentSite: "docs",
                        url: "/docs/:version/reference/operator/update/position",
                      },
                      {
                        label: "$slice",
                        contentSite: "docs",
                        url: "/docs/:version/reference/operator/update/slice",
                      },
                      {
                        label: "$sort",
                        contentSite: "docs",
                        url: "/docs/:version/reference/operator/update/sort",
                      },
                    ],
                  },
                  {
                    label: "Bitwise",
                    contentSite: "docs",
                    url: "/docs/:version/reference/operator/update-bitwise",
                    collapsible: true,
                    items: [
                      {
                        label: "$bit",
                        contentSite: "docs",
                        url: "/docs/:version/reference/operator/update/bit",
                      },
                    ],
                  },
                  {
                    label: "Fields",
                    contentSite: "docs",
                    url: "/docs/:version/reference/operator/update-field",
                    collapsible: true,
                    items: [
                      {
                        label: "$currentDate",
                        contentSite: "docs",
                        url: "/docs/:version/reference/operator/update/currentDate",
                      },
                      {
                        label: "$inc",
                        contentSite: "docs",
                        url: "/docs/:version/reference/operator/update/inc",
                      },
                      {
                        label: "$min",
                        contentSite: "docs",
                        url: "/docs/:version/reference/operator/update/min",
                      },
                      {
                        label: "$max",
                        contentSite: "docs",
                        url: "/docs/:version/reference/operator/update/max",
                      },
                      {
                        label: "$mul",
                        contentSite: "docs",
                        url: "/docs/:version/reference/operator/update/mul",
                      },
                      {
                        label: "$rename",
                        contentSite: "docs",
                        url: "/docs/:version/reference/operator/update/rename",
                      },
                      {
                        label: "$set",
                        contentSite: "docs",
                        url: "/docs/:version/reference/operator/update/set",
                      },
                      {
                        label: "$setOnInsert",
                        contentSite: "docs",
                        url: "/docs/:version/reference/operator/update/setOnInsert",
                      },
                      {
                        label: "$unset",
                        contentSite: "docs",
                        url: "/docs/:version/reference/operator/update/unset",
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            label: "Server Sessions",
            contentSite: "docs",
            url: "/docs/:version/reference/server-sessions",
          },
          {
            label: "Slot-Based Query Execution Engine",
            contentSite: "docs",
            url: "/docs/:version/reference/sbe",
          },
          {
            label: "Stable API",
            contentSite: "docs",
            url: "/docs/:version/reference/stable-api",
            collapsible: true,
            items: [
              {
                label: "Migrate to Later Version",
                contentSite: "docs",
                url: "/docs/:version/reference/stable-api-reference",
              },
              {
                label: "Changelog",
                contentSite: "docs",
                url: "/docs/:version/reference/stable-api-changelog",
              },
            ],
          },
          {
            label: "System Collections",
            contentSite: "docs",
            url: "/docs/:version/reference/system-collections",
          },
          {
            label: "Legacy mongo Shell",
            contentSite: "docs",
            url: "/docs/:version/reference/mongo",
          },
        ],
      },
      {
        label: "Release Notes",
        contentSite: "docs",
        url: "/docs/:version/release-notes",
        collapsible: true,
        items: [
          {
            label: "8.1 (Rapid Release)",
            contentSite: "docs",
            url: "/docs/:version/release-notes/8.1",
            collapsible: true,
            items: [
              {
                label: "Compatibility Changes",
                contentSite: "docs",
                url: "/docs/:version/release-notes/8.1-compatibility",
              },
              {
                label: "Changelog",
                contentSite: "docs",
                url: "/docs/:version/release-notes/8.1-changelog",
              },
            ],
          },
          {
            label: "8.0 (Stable Release)",
            contentSite: "docs",
            url: "/docs/:version/release-notes/8.0",
            collapsible: true,
            items: [
              {
                label: "Compatibility Changes",
                contentSite: "docs",
                url: "/docs/:version/release-notes/8.0-compatibility",
              },
              {
                label: "Upgrade 7.0 to 8.0",
                contentSite: "docs",
                url: "/docs/:version/release-notes/8.0-upgrade",
                collapsible: true,
                items: [
                  {
                    label: "Standalone",
                    contentSite: "docs",
                    url: "/docs/:version/release-notes/8.0-upgrade-standalone",
                  },
                  {
                    label: "Replica Set",
                    contentSite: "docs",
                    url: "/docs/:version/release-notes/8.0-upgrade-replica-set",
                  },
                  {
                    label: "Sharded Cluster",
                    contentSite: "docs",
                    url: "/docs/:version/release-notes/8.0-upgrade-sharded-cluster",
                  },
                ],
              },
              {
                label: "Downgrade 8.0 to 7.0",
                contentSite: "docs",
                url: "/docs/:version/release-notes/8.0-downgrade",
              },
              {
                label: "Changelog",
                contentSite: "docs",
                url: "/docs/:version/release-notes/8.0-changelog",
              },
            ],
          },
          {
            label: "7.0",
            contentSite: "docs",
            url: "/docs/:version/release-notes/7.0",
            collapsible: true,
            items: [
              {
                label: "Compatibility Changes",
                contentSite: "docs",
                url: "/docs/:version/release-notes/7.0-compatibility",
              },
              {
                label: "Upgrade 6.0 to 7.0",
                contentSite: "docs",
                url: "/docs/:version/release-notes/7.0-upgrade",
                collapsible: true,
                items: [
                  {
                    label: "Standalone",
                    contentSite: "docs",
                    url: "/docs/:version/release-notes/7.0-upgrade-standalone",
                  },
                  {
                    label: "Replica Set",
                    contentSite: "docs",
                    url: "/docs/:version/release-notes/7.0-upgrade-replica-set",
                  },
                  {
                    label: "Sharded Cluster",
                    contentSite: "docs",
                    url: "/docs/:version/release-notes/7.0-upgrade-sharded-cluster",
                  },
                ],
              },
              {
                label: "Downgrade 7.0 to 6.0",
                contentSite: "docs",
                url: "/docs/:version/release-notes/7.0-downgrade",
              },
              {
                label: "Changelog",
                contentSite: "docs",
                url: "/docs/:version/release-notes/7.0-changelog",
              },
            ],
          },
          {
            label: "6.0",
            contentSite: "docs",
            url: "/docs/:version/release-notes/6.0",
            collapsible: true,
            items: [
              {
                label: "Compatibility Changes",
                contentSite: "docs",
                url: "/docs/:version/release-notes/6.0-compatibility",
              },
              {
                label: "Upgrade 5.0 to 6.0",
                contentSite: "docs",
                url: "/docs/:version/release-notes/6.0-upgrade",
                collapsible: true,
                items: [
                  {
                    label: "Standalone",
                    contentSite: "docs",
                    url: "/docs/:version/release-notes/6.0-upgrade-standalone",
                  },
                  {
                    label: "Replica Set",
                    contentSite: "docs",
                    url: "/docs/:version/release-notes/6.0-upgrade-replica-set",
                  },
                  {
                    label: "Sharded Cluster",
                    contentSite: "docs",
                    url: "/docs/:version/release-notes/6.0-upgrade-sharded-cluster",
                  },
                ],
              },
              {
                label: "Downgrade 6.0 to 5.0",
                contentSite: "docs",
                url: "/docs/:version/release-notes/6.0-downgrade",
                collapsible: true,
                items: [
                  {
                    label: "Standalone",
                    contentSite: "docs",
                    url: "/docs/:version/release-notes/6.0-downgrade-standalone",
                  },
                  {
                    label: "Replica Set",
                    contentSite: "docs",
                    url: "/docs/:version/release-notes/6.0-downgrade-replica-set",
                  },
                  {
                    label: "Sharded Cluster",
                    contentSite: "docs",
                    url: "/docs/:version/release-notes/6.0-downgrade-sharded-cluster",
                  },
                ],
              },
              {
                label: "Changelog",
                contentSite: "docs",
                url: "/docs/:version/release-notes/6.0-changelog",
              },
            ],
          },
          {
            label: "Versioning",
            contentSite: "docs",
            url: "/docs/:version/reference/versioning",
          },
        ],
      },
      {
        label: "Technical Support",
        contentSite: "docs",
        url: "/docs/:version/support",
      },
    ],
  },
];

export default tocData;
