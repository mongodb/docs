import type { TocItem } from "../types";

const tocData: TocItem[] = [
  {
    label: "Atlas Charts",
    contentSite: "charts",
    url: "/docs/atlas/charts/",
    collapsible: true,
    items: [
      {
        label: "Launch",
        contentSite: "charts",
        url: "/docs/atlas/charts/launch-charts",
        collapsible: true,
        items: [
          {
            label: "Get Started",
            contentSite: "charts",
            url: "/docs/atlas/charts/welcome-experience",
          },
        ],
      },
      {
        label: "Tutorials",
        contentSite: "charts",
        url: "/docs/atlas/charts/tutorials",
        collapsible: true,
        items: [
          {
            label: "Visualize Order Data",
            contentSite: "charts",
            url: "/docs/atlas/charts/tutorial/order-data/order-data-tutorial-overview",
            collapsible: true,
            items: [
              {
                label: "Load Sample Data for Charts Visualizations",
                contentSite: "charts",
                url: "/docs/atlas/charts/tutorial/order-data/prerequisites-setup",
              },
              {
                label: "Create a New Charts Visualizations Dashboard",
                contentSite: "charts",
                url: "/docs/atlas/charts/tutorial/order-data/create-new-dashboard",
              },
              {
                label: "Create a Column Chart",
                contentSite: "charts",
                url: "/docs/atlas/charts/tutorial/order-data/column-chart-sales-by-store",
              },
              {
                label: "Create a Donut Chart",
                contentSite: "charts",
                url: "/docs/atlas/charts/tutorial/order-data/donut-chart-item-tags",
              },
              {
                label: "Group Column Chart",
                contentSite: "charts",
                url: "/docs/atlas/charts/tutorial/order-data/grouped-column-items-sold",
              },
              {
                label: "Rearrange & Resize Chart",
                contentSite: "charts",
                url: "/docs/atlas/charts/tutorial/order-data/rearrange-resize",
              },
              {
                label: "Create an Area Chart",
                contentSite: "charts",
                url: "/docs/atlas/charts/tutorial/order-data/area-chart-age-distribution",
              },
            ],
          },
          {
            label: "Visualize Movie Details",
            contentSite: "charts",
            url: "/docs/atlas/charts/tutorial/movie-details/movie-details-tutorial-overview",
            collapsible: true,
            items: [
              {
                label: "Load Data",
                contentSite: "charts",
                url: "/docs/atlas/charts/tutorial/movie-details/prereqs-and-import-data",
              },
              {
                label: "Create a Dashboard",
                contentSite: "charts",
                url: "/docs/atlas/charts/tutorial/movie-details/create-dashboard",
              },
              {
                label: "Create a Column Chart",
                contentSite: "charts",
                url: "/docs/atlas/charts/tutorial/movie-details/column-chart-director-awards",
              },
              {
                label: "Create a Scatter Chart",
                contentSite: "charts",
                url: "/docs/atlas/charts/tutorial/movie-details/scatter-chart-movies-ratings",
              },
              {
                label: "Arrange Charts",
                contentSite: "charts",
                url: "/docs/atlas/charts/tutorial/movie-details/arrange-charts",
              },
            ],
          },
        ],
      },
      {
        label: "Dashboards",
        contentSite: "charts",
        url: "/docs/atlas/charts/dashboards",
        collapsible: true,
        items: [
          {
            label: "Access",
            contentSite: "charts",
            url: "/docs/atlas/charts/dashboards/dashboard-access",
            collapsible: true,
            items: [
              {
                label: "Ownership",
                contentSite: "charts",
                url: "/docs/atlas/charts/dashboards/dashboard-access/dashboard-ownership",
              },
              {
                label: "Permissions & Sharing",
                contentSite: "charts",
                url: "/docs/atlas/charts/dashboards/dashboard-access/dashboard-permissions",
              },
            ],
          },
          {
            label: "Manage",
            contentSite: "charts",
            url: "/docs/atlas/charts/dashboards/manage-dashboards",
            collapsible: true,
            items: [
              {
                label: "Existing Dashboards",
                contentSite: "charts",
                url: "/docs/atlas/charts/dashboards/manage-dashboards/existing-dashboards",
              },
              {
                label: "Billing Dashboards",
                contentSite: "charts",
                url: "/docs/atlas/charts/dashboards/manage-dashboards/billing-dashboards",
              },
            ],
          },
          {
            label: "Import & Export",
            contentSite: "charts",
            url: "/docs/atlas/charts/dashboards/dashboard-import-export",
          },
          {
            label: "View Data",
            contentSite: "charts",
            url: "/docs/atlas/charts/dashboards/view-dashboard-data",
            collapsible: true,
            items: [
              {
                label: "Refresh",
                contentSite: "charts",
                url: "/docs/atlas/charts/dashboards/view-dashboard-data/dashboard-refresh",
              },
              {
                label: "Filter by Field Values",
                contentSite: "charts",
                url: "/docs/atlas/charts/dashboards/view-dashboard-data/dashboard-filtering",
              },
              {
                label: "Interact",
                contentSite: "charts",
                url: "/docs/atlas/charts/dashboards/view-dashboard-data/interact-with-charts",
              },
              {
                label: "Schedule Reports",
                contentSite: "charts",
                url: "/docs/atlas/charts/dashboards/view-dashboard-data/scheduled-reports",
              },
            ],
          },
        ],
      },
      {
        label: "Data Sources",
        contentSite: "charts",
        url: "/docs/atlas/charts/data-sources",
        collapsible: true,
        items: [
          {
            label: "Manage Data Sources",
            contentSite: "charts",
            url: "/docs/atlas/charts/manage-data-sources",
          },
          {
            label: "Manage Deployments",
            contentSite: "charts",
            url: "/docs/atlas/charts/manage-deployment",
          },
          {
            label: "Create & Manage Charts Views",
            contentSite: "charts",
            url: "/docs/atlas/charts/create-manage-charts-view",
          },
        ],
      },
      {
        label: "Build Charts",
        contentSite: "charts",
        url: "/docs/atlas/charts/build-charts",
        collapsible: true,
        items: [
          {
            label: "Encoding Channels",
            contentSite: "charts",
            url: "/docs/atlas/charts/encoding-channels",
            collapsible: true,
            items: [
              {
                label: "Aggregation Options",
                contentSite: "charts",
                url: "/docs/atlas/charts/encoding-channels/aggregation-options",
              },
            ],
          },
          {
            label: "Title & Description",
            contentSite: "charts",
            url: "/docs/atlas/charts/title-description",
          },
          {
            label: "Apply a Suggested Chart",
            contentSite: "charts",
            url: "/docs/atlas/charts/apply-suggested-charts",
          },
          {
            label: "Create a Single-Series Chart with Multiple Aggregations",
            contentSite: "charts",
            url: "/docs/atlas/charts/single-series-categories",
          },
          {
            label: "Create a Multi-Series Chart",
            contentSite: "charts",
            url: "/docs/atlas/charts/multi-series-charts",
          },
          {
            label: "Visualize Embedded Objects & Arrays",
            contentSite: "charts",
            url: "/docs/atlas/charts/rich-schema-support",
          },
          {
            label: "Reshape Data",
            contentSite: "charts",
            url: "/docs/atlas/charts/reshape-data",
            collapsible: true,
            items: [
              {
                label: "Calculate New Data Fields",
                contentSite: "charts",
                url: "/docs/atlas/charts/calculated-fields",
              },
              {
                label: "Convert Field Data Types",
                contentSite: "charts",
                url: "/docs/atlas/charts/convert-field-data-types",
              },
              {
                label: "Add a Lookup Field",
                contentSite: "charts",
                url: "/docs/atlas/charts/add-lookup-field",
              },
              {
                label: "Run Aggregation Pipelines",
                contentSite: "charts",
                url: "/docs/atlas/charts/aggregation-pipeline",
              },
              {
                label: "Save & Reuse Queries",
                contentSite: "charts",
                url: "/docs/atlas/charts/query-library",
              },
            ],
          },
          {
            label: "Filter Chart Results",
            contentSite: "charts",
            url: "/docs/atlas/charts/filter-chart-results",
          },
          {
            label: "Bin, Sort, & Limit Data",
            contentSite: "charts",
            url: "/docs/atlas/charts/bin-data",
          },
          {
            label: "Customize Charts",
            contentSite: "charts",
            url: "/docs/atlas/charts/customize-charts",
            collapsible: true,
            items: [
              {
                label:
                  "Customize Color Palette, Labels, Chart Types, and Legend",
                contentSite: "charts",
                url: "/docs/atlas/charts/customize-charts/general-customization",
              },
              {
                label: "Conditional Formatting",
                contentSite: "charts",
                url: "/docs/atlas/charts/customize-charts/conditional-formatting",
                collapsible: true,
                items: [
                  {
                    label: "Reference",
                    contentSite: "charts",
                    url: "/docs/atlas/charts/customize-charts/conditional-formatting-reference",
                  },
                ],
              },
              {
                label: "Chart's Axes Value Options",
                contentSite: "charts",
                url: "/docs/atlas/charts/customize-charts/value-axis-options",
              },
              {
                label: "Field-Level Options",
                contentSite: "charts",
                url: "/docs/atlas/charts/customize-charts/field-level-options",
              },
            ],
          },
          {
            label: "View & Export Data",
            contentSite: "charts",
            url: "/docs/atlas/charts/view-export-chart-data",
          },
          {
            label: "Reference",
            contentSite: "charts",
            url: "/docs/atlas/charts/build-charts-reference",
            collapsible: true,
            items: [
              {
                label: "Subset Mode",
                contentSite: "charts",
                url: "/docs/atlas/charts/subset-mode",
              },
              {
                label: "Backing Aggregation Pipeline",
                contentSite: "charts",
                url: "/docs/atlas/charts/aggregation-pipeline-generation",
              },
            ],
          },
        ],
      },
      {
        label: "Chart Types",
        contentSite: "charts",
        url: "/docs/atlas/charts/chart-types",
        collapsible: true,
        items: [
          {
            label: "Natural Language Charts",
            contentSite: "charts",
            url: "/docs/atlas/charts/chart-type-reference/natural-language-charts",
          },
          {
            label: "Column & Bar Charts",
            contentSite: "charts",
            url: "/docs/atlas/charts/chart-type-reference/column-bar-chart",
            collapsible: true,
            items: [
              {
                label: "Candlestick Chart",
                contentSite: "charts",
                url: "/docs/atlas/charts/chart-type-reference/candlestick-chart",
              },
            ],
          },
          {
            label: "Line & Area Charts",
            contentSite: "charts",
            url: "/docs/atlas/charts/chart-type-reference/line-area-chart",
          },
          {
            label: "Combo Charts",
            contentSite: "charts",
            url: "/docs/atlas/charts/chart-type-reference/combo-charts",
          },
          {
            label: "Grid Charts",
            contentSite: "charts",
            url: "/docs/atlas/charts/chart-type-reference/grid-charts",
            collapsible: true,
            items: [
              {
                label: "Heatmap",
                contentSite: "charts",
                url: "/docs/atlas/charts/chart-type-reference/heatmap",
              },
              {
                label: "Scatter Chart",
                contentSite: "charts",
                url: "/docs/atlas/charts/chart-type-reference/scatter-chart",
              },
            ],
          },
          {
            label: "Circular Charts",
            contentSite: "charts",
            url: "/docs/atlas/charts/chart-type-reference/circular-charts",
            collapsible: true,
            items: [
              {
                label: "Donut Chart",
                contentSite: "charts",
                url: "/docs/atlas/charts/chart-type-reference/donut-chart",
              },
              {
                label: "Gauge Chart",
                contentSite: "charts",
                url: "/docs/atlas/charts/chart-type-reference/gauge-chart",
              },
            ],
          },
          {
            label: "Text Charts",
            contentSite: "charts",
            url: "/docs/atlas/charts/chart-type-reference/text-charts",
            collapsible: true,
            items: [
              {
                label: "Table",
                contentSite: "charts",
                url: "/docs/atlas/charts/chart-type-reference/data-table",
                collapsible: true,
                items: [
                  {
                    label: "Reorder Columns",
                    contentSite: "charts",
                    url: "/docs/atlas/charts/chart-type-reference/data-table/reorder-columns",
                  },
                  {
                    label: "Sort & Resize Columns",
                    contentSite: "charts",
                    url: "/docs/atlas/charts/chart-type-reference/data-table/sort-resize-columns",
                  },
                  {
                    label: "Resize Text",
                    contentSite: "charts",
                    url: "/docs/atlas/charts/chart-type-reference/data-table/resize-table-text",
                  },
                  {
                    label: "Toggle Totals",
                    contentSite: "charts",
                    url: "/docs/atlas/charts/chart-type-reference/data-table/toggle-row-column-totals",
                  },
                  {
                    label: "Limit Rows",
                    contentSite: "charts",
                    url: "/docs/atlas/charts/chart-type-reference/data-table/limit-rows",
                  },
                ],
              },
              {
                label: "Number Chart",
                contentSite: "charts",
                url: "/docs/atlas/charts/chart-type-reference/number-chart",
              },
              {
                label: "Word Cloud",
                contentSite: "charts",
                url: "/docs/atlas/charts/chart-type-reference/word-cloud",
              },
              {
                label: "Top Item Chart",
                contentSite: "charts",
                url: "/docs/atlas/charts/chart-type-reference/top-item",
              },
            ],
          },
          {
            label: "Geospatial Charts",
            contentSite: "charts",
            url: "/docs/atlas/charts/chart-type-reference/geo-spatial",
            collapsible: true,
            items: [
              {
                label: "Choropleth Chart",
                contentSite: "charts",
                url: "/docs/atlas/charts/chart-type-reference/choropleth",
                collapsible: true,
                items: [
                  {
                    label: "Shape Schemes",
                    contentSite: "charts",
                    url: "/docs/atlas/charts/chart-type-reference/choropleth-regions",
                  },
                ],
              },
              {
                label: "Geospatial Scatter Chart",
                contentSite: "charts",
                url: "/docs/atlas/charts/chart-type-reference/geospatial-scatter",
              },
              {
                label: "Geospatial Heatmap",
                contentSite: "charts",
                url: "/docs/atlas/charts/chart-type-reference/geospatial-heatmap",
              },
            ],
          },
        ],
      },
      {
        label: "Embedding",
        contentSite: "charts",
        url: "/docs/atlas/charts/embed-charts-and-dashboards",
        collapsible: true,
        items: [
          {
            label: "Get Started",
            contentSite: "charts",
            url: "/docs/atlas/charts/get-started-embedding",
          },
          {
            label: "Embed a Chart",
            contentSite: "charts",
            url: "/docs/atlas/charts/embedding-charts",
            collapsible: true,
            items: [
              {
                label: "Use an iframe",
                contentSite: "charts",
                url: "/docs/atlas/charts/embedding-charts-iframe",
              },
              {
                label: "Use the Embedding SDK",
                contentSite: "charts",
                url: "/docs/atlas/charts/charts-embedding-sdk",
              },
              {
                label: "Options",
                contentSite: "charts",
                url: "/docs/atlas/charts/embedded-chart-options",
                collapsible: true,
                items: [
                  {
                    label: "SDK",
                    contentSite: "charts",
                    url: "/docs/atlas/charts/embedded-charts-options/embedded-sdk",
                  },
                  {
                    label: "iframe",
                    contentSite: "charts",
                    url: "/docs/atlas/charts/embedded-charts-options/iframe",
                  },
                ],
              },
              {
                label: "Filter",
                contentSite: "charts",
                url: "/docs/atlas/charts/filter-embedded-charts",
              },
            ],
          },
          {
            label: "Embed a Dashboard",
            contentSite: "charts",
            url: "/docs/atlas/charts/embedding-dashboards",
            collapsible: true,
            items: [
              {
                label: "Use an iframe",
                contentSite: "charts",
                url: "/docs/atlas/charts/embedding-dashboards-iframe",
              },
              {
                label: "Use the Embedding SDK",
                contentSite: "charts",
                url: "/docs/atlas/charts/dashboards-embedding-sdk",
              },
              {
                label: "Options",
                contentSite: "charts",
                url: "/docs/atlas/charts/embedded-dashboard-options",
                collapsible: true,
                items: [
                  {
                    label: "Embedded Dashboard SDK Methods and Options",
                    contentSite: "charts",
                    url: "/docs/atlas/charts/embedded-dashboards-options/embedded-sdk",
                  },
                  {
                    label: "Configure Iframe Style and Theme",
                    contentSite: "charts",
                    url: "/docs/atlas/charts/embedded-dashboards-options/iframe",
                  },
                ],
              },
              {
                label: "Filter",
                contentSite: "charts",
                url: "/docs/atlas/charts/filter-embedded-dashboards",
              },
            ],
          },
          {
            label: "Embedding SDK",
            contentSite: "charts",
            url: "/docs/atlas/charts/embedding-charts-sdk",
            collapsible: true,
            items: [
              {
                label: "Get Started",
                contentSite: "charts",
                url: "/docs/atlas/charts/get-started-embedding-sdk",
              },
              {
                label: "Configure Authentication Providers",
                contentSite: "charts",
                url: "/docs/atlas/charts/configure-auth-providers",
              },
              {
                label: "Handle Click Events",
                contentSite: "charts",
                url: "/docs/atlas/charts/handle-click-events",
              },
              {
                label: "Highlight Chart Elements",
                contentSite: "charts",
                url: "/docs/atlas/charts/highlight-chart-elements",
              },
              {
                label: "Tutorials",
                contentSite: "charts",
                url: "/docs/atlas/charts/embedding-tutorials",
                collapsible: true,
                items: [
                  {
                    label: "Use Google-Sign-In Authentication",
                    contentSite: "charts",
                    url: "/docs/atlas/charts/embed-chart-google-auth",
                  },
                  {
                    label: "Use Custom JWT Provider",
                    contentSite: "charts",
                    url: "/docs/atlas/charts/embed-chart-jwt-auth",
                  },
                  {
                    label: "Use an Unauthenticated Chart",
                    contentSite: "charts",
                    url: "/docs/atlas/charts/embed-chart-anon-auth",
                  },
                ],
              },
              {
                label: "Reference",
                isExternal: true,
                url: "https://www.npmjs.com/package/@mongodb-js/charts-embed-dom",
              },
            ],
          },
          {
            label: "Manage",
            contentSite: "charts",
            url: "/docs/atlas/charts/manage-embedded-items",
          },
          {
            label: "Error Codes",
            contentSite: "charts",
            url: "/docs/atlas/charts/embedded-chart-error-codes",
          },
        ],
      },
      {
        label: "Data Transfer",
        contentSite: "charts",
        url: "/docs/atlas/charts/admin-settings",
      },
      {
        label: "Pricing",
        contentSite: "charts",
        url: "/docs/atlas/charts/pricing",
      },
      {
        label: "FAQ",
        contentSite: "charts",
        url: "/docs/atlas/charts/faq",
      },
      {
        label: "Release Notes",
        contentSite: "charts",
        url: "/docs/atlas/charts/release-notes",
      },
      {
        label: "Third-Party Licenses",
        contentSite: "charts",
        url: "/docs/atlas/charts/third-party-licenses",
      },
      {
        label: "AI & Data Usage",
        contentSite: "charts",
        url: "/docs/atlas/charts/ai-and-data-usage-information",
      },
      {
        label: "Experimental Features",
        contentSite: "charts",
        url: "/docs/atlas/charts/experimental-features",
      },
    ],
  },
];

export default tocData;
