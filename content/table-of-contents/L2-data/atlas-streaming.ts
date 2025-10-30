import type { TocItem } from "../types";

const tocData: TocItem[] = [
  {
    label: "Atlas Stream Processing",
    contentSite: "cloud-docs",
    url: "/docs/atlas/atlas-stream-processing",
    collapsible: true,
    items: [
      {
        label: "Get Started",
        contentSite: "cloud-docs",
        url: "/docs/atlas/atlas-stream-processing/quickstart",
      },
      {
        label: "Architecture",
	contentSite: "cloud-docs",
	url: "/docs/atlas/atlas-stream-processing/architecture",
      },
      {
        label: "Stream Processor Windows",
        contentSite: "cloud-docs",
        url: "/docs/atlas/atlas-stream-processing/windows",
      },
      {
        label: "Manage Stream Processing",
        contentSite: "cloud-docs",
	collapsible: true,
	items: [
	  {
	    label: "Manage Stream Processing Workspaces",
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
		label: "Add Public Connections",
		contentSite: "cloud-docs",
		url: "/docs/atlas/atlas-stream-processing/add-sp-connection",
	      },
	      {
		label: "Advanced Networking",
		contentSite: "cloud-docs",
		collapsible: true,
		items: [      
		  {
		    label: "Kafka Private Link Connections",
		    contentSite: "cloud-docs",
		    url: "/docs/atlas/atlas-stream-processing/kafka-private-link-connection",
		  },
		  {
		    label: "S3 Private Link Connections",
		    contentSite: "cloud-docs",
		    url: "/docs/atlas/atlas-stream-processing/s3-private-link-connection",
		  },		      
		  {
		    label: "Manage VPC Connections",
		    contentSite: "cloud-docs",
		    url: "/docs/atlas/atlas-stream-processing/manage-vpc-peering-connections",
		  },
		],
	      },
	    ],
	  },
        ],
      },   
      {
        label: "Develop Stream Processors",
        contentSite: "cloud-docs",
        url: "/docs/atlas/atlas-stream-processing/manage-stream-processor",
      },      
      {
	label: "Aggregation Pipelines",
	contentSite: "cloud-docs",
	collapsible: true,
	items: [      
	  {
	    label: "Aggregation Operators",
	    contentSite: "cloud-docs",
	    url: "/docs/atlas/atlas-stream-processing/stream-aggregation-operators",
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
	    label: "Aggregation Stages",
	    contentSite: "cloud-docs",
	    url: "/docs/atlas/atlas-stream-processing/stream-aggregation-stages",
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
        ],
      },
      {
        label: "Security",
        contentSite: "cloud-docs",
        url: "/docs/atlas/atlas-stream-processing/security",
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