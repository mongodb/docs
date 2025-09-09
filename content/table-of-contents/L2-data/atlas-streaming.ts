import type { TocItem } from "../types";

const tocData: TocItem[] = [
  {
    label: "Atlas Stream Processing",
    contentSite: "cloud-docs",
    url: "/docs/atlas/atlas-stream-processing",
    collapsible: true,
    items: [
      {
        label: "Overview",
        contentSite: "cloud-docs",
        url: "/docs/atlas/atlas-stream-processing/overview",
      },
      {
        label: "Get Started",
        contentSite: "cloud-docs",
        url: "/docs/atlas/atlas-stream-processing/tutorial",
      },
      {
        label: "Stream Processor Windows",
        contentSite: "cloud-docs",
        url: "/docs/atlas/atlas-stream-processing/windows",
      },
      {
        label: "Security",
        contentSite: "cloud-docs",
        url: "/docs/atlas/atlas-stream-processing/security",
      },
      {
        label: "Manage Stream Processing Instances",
        contentSite: "cloud-docs",
        url: "/docs/atlas/atlas-stream-processing/manage-processing-instance",
      },
      {
        label: "Manage Connections",
        contentSite: "cloud-docs",
        url: "/docs/atlas/atlas-stream-processing/manage-connection-registry",
        collapsible: true,
        items: [
          {
            label: "Kafka Connections",
            contentSite: "cloud-docs",
            url: "/docs/atlas/atlas-stream-processing/kafka-connection",
          },
          {
            label: "Atlas Connections",
            contentSite: "cloud-docs",
            url: "/docs/atlas/atlas-stream-processing/atlas-connection",
          },
          {
            label: "HTTPS Connections",
            contentSite: "cloud-docs",
            url: "/docs/atlas/atlas-stream-processing/https-connection",
          },
          {
            label: "S3 Connections",
            contentSite: "cloud-docs",
            url: "/docs/atlas/atlas-stream-processing/s3-connection",
          },
          {
            label: "External Functions Connections",
            contentSite: "cloud-docs",
            url: "/docs/atlas/atlas-stream-processing/external-function-connection",
          },
        ],
      },
      {
        label: "Manage Stream Processors",
        contentSite: "cloud-docs",
        url: "/docs/atlas/atlas-stream-processing/manage-stream-processor",
      },
      {
        label: "Manage VPC Peering Connections",
        contentSite: "cloud-docs",
        url: "/docs/atlas/atlas-stream-processing/manage-vpc-peering-connections",
      },
      {
        label: "Aggregation Expressions",
        contentSite: "cloud-docs",
        url: "/docs/atlas/atlas-stream-processing/stream-aggregation-expression",
        collapsible: true,
        items: [
          {
            label: "$convert",
            contentSite: "cloud-docs",
            url: "/docs/atlas/atlas-stream-processing/sp-agg-convert",
          },
          {
            label: "$currentDate",
            contentSite: "cloud-docs",
            url: "/docs/atlas/atlas-stream-processing/sp-agg-currentdate",
          },
          {
            label: "$meta",
            contentSite: "cloud-docs",
            url: "/docs/atlas/atlas-stream-processing/sp-agg-meta",
          },
          {
            label: "$createUUID",
            contentSite: "cloud-docs",
            url: "/docs/atlas/atlas-stream-processing/sp-agg-createuuid",
          },
          {
            label: "$function",
            contentSite: "cloud-docs",
            url: "/docs/atlas/atlas-stream-processing/sp-agg-function",
          },
        ],
      },
      {
        label: "Aggregation Pipelines",
        contentSite: "cloud-docs",
        url: "/docs/atlas/atlas-stream-processing/stream-aggregation",
        collapsible: true,
        items: [
          {
            label: "$source",
            contentSite: "cloud-docs",
            url: "/docs/atlas/atlas-stream-processing/sp-agg-source",
          },
          {
            label: "$validate",
            contentSite: "cloud-docs",
            url: "/docs/atlas/atlas-stream-processing/sp-agg-validate",
          },
          {
            label: "$https",
            contentSite: "cloud-docs",
            url: "/docs/atlas/atlas-stream-processing/sp-agg-https",
          },
          {
            label: "$lookup",
            contentSite: "cloud-docs",
            url: "/docs/atlas/atlas-stream-processing/sp-agg-lookup",
          },
          {
            label: "$cachedLookup",
            contentSite: "cloud-docs",
            url: "/docs/atlas/atlas-stream-processing/sp-agg-cachedlookup",
          },
          {
            label: "$hoppingWindow",
            contentSite: "cloud-docs",
            url: "/docs/atlas/atlas-stream-processing/sp-agg-hopping",
          },
          {
            label: "$tumblingWindow",
            contentSite: "cloud-docs",
            url: "/docs/atlas/atlas-stream-processing/sp-agg-tumbling",
          },
          {
            label: "$emit",
            contentSite: "cloud-docs",
            url: "/docs/atlas/atlas-stream-processing/sp-agg-emit",
          },
          {
            label: "$merge",
            contentSite: "cloud-docs",
            url: "/docs/atlas/atlas-stream-processing/sp-agg-merge",
          },
          {
            label: "$externalFunction",
            contentSite: "cloud-docs",
            url: "/docs/atlas/atlas-stream-processing/sp-agg-externalFunction",
          },
          {
            label: "$sessionWindow",
            contentSite: "cloud-docs",
            url: "/docs/atlas/atlas-stream-processing/sp-agg-session",
          },
        ],
      },
      {
        label: "Monitoring",
        contentSite: "cloud-docs",
        url: "/docs/atlas/atlas-stream-processing/monitoring",
      },
      {
        label: "Limitations",
        contentSite: "cloud-docs",
        url: "/docs/atlas/atlas-stream-processing/limitations",
      },
      {
        label: "Changelog",
        contentSite: "cloud-docs",
        url: "/docs/atlas/atlas-stream-processing/changelog",
      },
    ],
  },
  {
    label: "Atlas Triggers",
    contentSite: "cloud-docs",
    url: "/docs/atlas/atlas-ui/triggers",
    collapsible: true,
    items: [
      {
        label: "Database Triggers",
        contentSite: "cloud-docs",
        url: "/docs/atlas/atlas-ui/triggers/database-triggers",
      },
      {
        label: "Scheduled Triggers",
        contentSite: "cloud-docs",
        url: "/docs/atlas/atlas-ui/triggers/scheduled-triggers",
      },
      {
        label: "Authentication Triggers",
        contentSite: "cloud-docs",
        url: "/docs/atlas/atlas-ui/triggers/authentication-triggers",
      },
      {
        label: "Disable a Trigger",
        contentSite: "cloud-docs",
        url: "/docs/atlas/atlas-ui/triggers/disable",
      },
      {
        label: "Send Trigger Events to AWS EventBridge",
        contentSite: "cloud-docs",
        url: "/docs/atlas/atlas-ui/triggers/aws-eventbridge",
      },
      {
        label: "Functions",
        contentSite: "cloud-docs",
        url: "/docs/atlas/atlas-ui/triggers/functions",
        collapsible: true,
        items: [
          {
            label: "Context",
            contentSite: "cloud-docs",
            url: "/docs/atlas/atlas-ui/triggers/functions/context",
          },
          {
            label: "Global Modules",
            contentSite: "cloud-docs",
            url: "/docs/atlas/atlas-ui/triggers/functions/globals",
          },
          {
            label: "External Dependencies",
            contentSite: "cloud-docs",
            url: "/docs/atlas/atlas-ui/triggers/functions/dependencies",
          },
          {
            label: "Handle Errors",
            contentSite: "cloud-docs",
            url: "/docs/atlas/atlas-ui/triggers/functions/handle-errors",
          },
          {
            label: "JavaScript Support",
            contentSite: "cloud-docs",
            url: "/docs/atlas/atlas-ui/triggers/functions/javascript-support",
          },
          {
            label: "Read",
            contentSite: "cloud-docs",
            url: "/docs/atlas/atlas-ui/triggers/functions/read",
          },
          {
            label: "Write",
            contentSite: "cloud-docs",
            url: "/docs/atlas/atlas-ui/triggers/functions/write",
          },
          {
            label: "Aggregate",
            contentSite: "cloud-docs",
            url: "/docs/atlas/atlas-ui/triggers/functions/aggregate",
          },
          {
            label: "Define and Manage Secrets",
            contentSite: "cloud-docs",
            url: "/docs/atlas/atlas-ui/triggers/functions/secrets",
          },
          {
            label: "MongoDB API Reference",
            contentSite: "cloud-docs",
            url: "/docs/atlas/atlas-ui/triggers/functions/api",
          },
          {
            label: "Define and Access Values",
            contentSite: "cloud-docs",
            url: "/docs/atlas/atlas-ui/triggers/functions/values",
          },
          {
            label: "Security",
            contentSite: "cloud-docs",
            url: "/docs/atlas/atlas-ui/triggers/functions/security",
          }
        ],
      },
      {
        label: "Logs",
        contentSite: "cloud-docs",
        url: "/docs/atlas/atlas-ui/triggers/logs",
      },
      {
        label: "Forward Logs",
        contentSite: "cloud-docs",
        url: "/docs/atlas/atlas-ui/triggers/forward-logs",
      },
      {
        label: "Limitations",
        contentSite: "cloud-docs",
        url: "/docs/atlas/atlas-ui/triggers/limitations",
      },
      {
        label: "Triggers Code Examples",
        isExternal: true,
        url: "https://github.com/mongodb/atlas-app-services-examples/tree/main/triggers-examples",
      },
    ],
  },
];

export default tocData;