import type { TocItem } from '../types';

const tocData: TocItem[] = [
  {
    label: 'Best Practices',
    contentSite: 'docs',
    url: '/docs/:version/data-modeling/best-practices',
    collapsible: true, 
    items: [
      {
        label: "Embedded Data", 
        contentSite: "docs", 
        url: "/docs/:version/data-modeling/embedding"
      },
      {
        label: "Reference Data", 
        contentSite: "docs",
        url: "/docs/:version/data-modeling/referencing",
        collapsible: true,
        items: [
          {
            label: "Database References", 
            contentSite: "docs", 
            url: "/docs/:version/reference/database-references"
          }
        ]
      },
      {
        label: "Duplicate Data", 
        contentSite: "docs",
        url: "/docs/:version/data-modeling/handle-duplicate-data"
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
          }
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
          {
            label: "Specify Validation for Polymorphic Collections",
            contentSite: "docs",
            url: "/docs/:version/core/schema-validation/specify-validation-polymorphic-collections",
          },
        ],
      },
    ]
  },
  {
    label: 'Designing Your Schema',
    contentSite: 'docs',
    url: '/docs/:version/data-modeling/schema-design-process',
    collapsible: true,
    items: [
      {
        label: 'Identify Workload',
        contentSite: 'docs',
        url: '/docs/:version/data-modeling/schema-design-process/identify-workload',
      },
      {
        label: 'Map Relationships',
        contentSite: 'docs',
        url: '/docs/:version/data-modeling/schema-design-process/map-relationships',
      },
      {
        label: 'Apply Patterns',
        contentSite: 'docs',
        url: '/docs/:version/data-modeling/schema-design-process/apply-patterns',
      },
      {
        label: 'Create Indexes',
        contentSite: 'docs',
        url: '/docs/:version/data-modeling/schema-design-process/create-indexes',
        versions: { excludes: ['v7.0'] },
      },
      {
        label: 'Create Indexes',
        contentSite: 'docs',
        url: '/docs/:version/tutorial/create-indexes-to-support-queries',
        versions: { includes: ['v7.0'] },
      },
    ],
  },
  {
    label: 'Schema Design Patterns',
    contentSite: 'docs',
    url: '/docs/:version/data-modeling/design-patterns',
    collapsible: true,
    items: [
      {
        label: 'Computed Values',
        contentSite: 'docs',
        url: '/docs/:version/data-modeling/design-patterns/handle-computed-values',
        collapsible: true,
        items: [
          {
            label: 'Computed Data',
            contentSite: 'docs',
            url: '/docs/:version/data-modeling/design-patterns/computed-values/computed-schema-pattern',
          },
          {
            label: 'Approximation Pattern',
            contentSite: 'docs',
            url: '/docs/:version/data-modeling/design-patterns/computed-values/approximation-schema-pattern',
          },
        ],
      },
      {
        label: 'Group Data',
        contentSite: 'docs',
        url: '/docs/:version/data-modeling/design-patterns/group-data',
        collapsible: true,
        items: [
          {
            label: 'Bucket Pattern',
            contentSite: 'docs',
            url: '/docs/:version/data-modeling/design-patterns/group-data/bucket-pattern',
          },
          {
            label: 'Outlier Pattern',
            contentSite: 'docs',
            url: '/docs/:version/data-modeling/design-patterns/group-data/outlier-pattern',
          },
          {
            label: 'Attribute Pattern',
            contentSite: 'docs',
            url: '/docs/:version/data-modeling/design-patterns/group-data/attribute-pattern',
          },
          {
            label: 'Subset Pattern',
            contentSite: 'docs',
            url: '/docs/:version/data-modeling/design-patterns/group-data/subset-pattern',
          },
        ],
      },
      {
        label: 'Polymorphic Data',
        contentSite: 'docs',
        url: '/docs/:version/data-modeling/design-patterns/polymorphic-data',
        collapsible: true,
        items: [
          {
            label: 'Polymorphic Pattern',
            contentSite: 'docs',
            url: '/docs/:version/data-modeling/design-patterns/polymorphic-data/polymorphic-schema-pattern',
          },
          {
            label: 'Inheritance Pattern',
            contentSite: 'docs',
            url: '/docs/:version/data-modeling/design-patterns/polymorphic-data/inheritance-schema-pattern',
          },
        ],
      },
      {
        label: 'Versioning',
        contentSite: 'docs',
        url: '/docs/:version/data-modeling/design-patterns/data-versioning',
        collapsible: true,
        items: [
          {
            label: 'Keep Document History',
            contentSite: 'docs',
            url: '/docs/:version/data-modeling/design-patterns/data-versioning/document-versioning',
          },
          {
            label: 'Maintain Versions',
            contentSite: 'docs',
            url: '/docs/:version/data-modeling/design-patterns/data-versioning/schema-versioning',
          },
          {
            label: 'Slowly Changing Dimensions',
            contentSite: 'docs',
            url: '/docs/:version/data-modeling/design-patterns/data-versioning/slowly-changing-dimensions',
          },
        ],
      },
      {
        label: 'Archive Data',
        contentSite: 'docs',
        url: '/docs/:version/data-modeling/design-patterns/archive',
      },
    ],
  },
  {
    label: 'Schema Design Anti-Patterns',
    contentSite: 'docs',
    url: '/docs/:version/data-modeling/design-antipatterns',
    collapsible: true,
    items: [
      {
        label: 'Avoid Unbounded Arrays',
        contentSite: 'docs',
        url: '/docs/:version/data-modeling/design-antipatterns/unbounded-arrays',
      },
      {
        label: 'Reduce the Number of Collections',
        contentSite: 'docs',
        url: '/docs/:version/data-modeling/design-antipatterns/reduce-collections',
      },
      {
        label: 'Remove Unnecessary Indexes',
        contentSite: 'docs',
        url: '/docs/:version/data-modeling/design-antipatterns/unnecessary-indexes',
      },
      {
        label: 'Bloated Documents',
        contentSite: 'docs',
        url: '/docs/:version/data-modeling/design-antipatterns/bloated-documents',
      },
      {
        label: 'Reduce $lookup Operations',
        contentSite: 'docs',
        url: '/docs/:version/data-modeling/design-antipatterns/reduce-lookup-operations',
      },
    ],
  },
  {
    label: 'Model Relationships',
    contentSite: 'docs',
    url: '/docs/:version/applications/data-models-relationships',
    collapsible: true,
    items: [
      {
        label: 'One-to-One Embedded Documents',
        contentSite: 'docs',
        url: '/docs/:version/tutorial/model-embedded-one-to-one-relationships-between-documents',
      },
      {
        label: 'One-to-Many Embedded Documents',
        contentSite: 'docs',
        url: '/docs/:version/tutorial/model-embedded-one-to-many-relationships-between-documents',
      },
      {
        label: 'One-to-Many References',
        contentSite: 'docs',
        url: '/docs/:version/tutorial/model-referenced-one-to-many-relationships-between-documents',
      },
      {
        label: 'Many-to-Many Embedded Documents',
        contentSite: 'docs',
        url: '/docs/:version/tutorial/model-embedded-many-to-many-relationships-between-documents',
      },
    ],
  },
  {
    label: 'Model Tree Structures',
    contentSite: 'docs',
    url: '/docs/:version/applications/data-models-tree-structures',
    collapsible: true,
    items: [
      {
        label: 'Parent References',
        contentSite: 'docs',
        url: '/docs/:version/tutorial/model-tree-structures-with-parent-references',
      },
      {
        label: 'Child References',
        contentSite: 'docs',
        url: '/docs/:version/tutorial/model-tree-structures-with-child-references',
      },
      {
        label: 'Array of Ancestors',
        contentSite: 'docs',
        url: '/docs/:version/tutorial/model-tree-structures-with-ancestors-array',
      },
      {
        label: 'Materialized Paths',
        contentSite: 'docs',
        url: '/docs/:version/tutorial/model-tree-structures-with-materialized-paths',
      },
      {
        label: 'Nested Sets',
        contentSite: 'docs',
        url: '/docs/:version/tutorial/model-tree-structures-with-nested-sets',
      },
    ],
  },
  {
    label: 'Example Application Models',
    contentSite: 'docs',
    url: '/docs/:version/applications/data-models-applications',
    collapsible: true,
    items: [
      {
        label: 'Atomic Operations',
        contentSite: 'docs',
        url: '/docs/:version/tutorial/model-data-for-atomic-operations',
      },
      {
        label: 'IOT Data',
        contentSite: 'docs',
        url: '/docs/:version/applications/data-models-tree-structures',
        collapsible: true,
        items: [
          {
            label: 'Parent References',
            contentSite: 'docs',
            url: '/docs/:version/tutorial/model-tree-structures-with-parent-references',
          },
          {
            label: 'Child References',
            contentSite: 'docs',
            url: '/docs/:version/tutorial/model-tree-structures-with-child-references',
          },
          {
            label: 'Array of Ancestors',
            contentSite: 'docs',
            url: '/docs/:version/tutorial/model-tree-structures-with-ancestors-array',
          },
          {
            label: 'Materialized Paths',
            contentSite: 'docs',
            url: '/docs/:version/tutorial/model-tree-structures-with-materialized-paths',
          },
          {
            label: 'Nested Sets',
            contentSite: 'docs',
            url: '/docs/:version/tutorial/model-tree-structures-with-nested-sets',
          },
        ],
      },
      {
        label: 'Specific Application Contexts',
        contentSite: 'docs',
        url: '/docs/:version/applications/data-models-applications',
        collapsible: true,
        items: [
          {
            label: 'Atomic Operations',
            contentSite: 'docs',
            url: '/docs/:version/tutorial/model-data-for-atomic-operations',
          },
          {
            label: 'IOT Data',
            contentSite: 'docs',
            url: '/docs/:version/tutorial/model-iot-data',
          },
          {
            label: 'Keyword Search',
            contentSite: 'docs',
            url: '/docs/:version/tutorial/model-data-for-keyword-search',
          },
          {
            label: 'Monetary Data',
            contentSite: 'docs',
            url: '/docs/:version/tutorial/model-monetary-data',
          },
        ],
      },
    ],
  },
];

export default tocData;
