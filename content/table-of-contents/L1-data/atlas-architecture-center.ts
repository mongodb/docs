import type { TocItem } from "../types";
import solutionsLibrary from "../L2-data/solutions-library"

const tocData: TocItem[] = [
  {
    label: "Well-Architected Framework",
    contentSite: "atlas-architecture",
    versionDropdown: true,
    group: true,
    items: [
      {
        label: "Getting Started",
        contentSite: "atlas-architecture",
        url: "/docs/atlas/architecture/:version/getting-started",
        collapsible: true,
        items: [
          {
            label: "Landing Zone Design",
            contentSite: "atlas-architecture",
            url: "/docs/atlas/architecture/:version/landing-zone",
          },
          {
            label: "Orgs, Projects, and Clusters",
            contentSite: "atlas-architecture",
            url: "/docs/atlas/architecture/:version/hierarchy",
          },
        ],
      },
      {
        label: "Operational Efficiency",
        contentSite: "atlas-architecture",
        url: "/docs/atlas/architecture/:version/operational-efficiency",
        collapsible: true,
        items: [
          {
            label: "Automation",
            contentSite: "atlas-architecture",
            url: "/docs/atlas/architecture/:version/automation",
          },
          {
            label: "Monitoring and Alerts",
            contentSite: "atlas-architecture",
            url: "/docs/atlas/architecture/:version/monitoring-alerts",
          },
        ],
      },
      {
        label: "Security",
        contentSite: "atlas-architecture",
        url: "/docs/atlas/architecture/:version/security",
        collapsible: true,
        items: [
          {
            label: "Network Security",
            contentSite: "atlas-architecture",
            url: "/docs/atlas/architecture/:version/network-security",
          },
          {
            label: "Authorization and Authentication",
            contentSite: "atlas-architecture",
            url: "/docs/atlas/architecture/:version/auth",
          },
          {
            label: "Data Encryption",
            contentSite: "atlas-architecture",
            url: "/docs/atlas/architecture/:version/data-encryption",
          },
          {
            label: "Compliance",
            contentSite: "atlas-architecture",
            url: "/docs/atlas/architecture/:version/compliance",
          },
          {
            label: "Auditing and Logging",
            contentSite: "atlas-architecture",
            url: "/docs/atlas/architecture/:version/auditing-logging",
          },
        ],
      },
      {
        label: "Reliability",
        contentSite: "atlas-architecture",
        url: "/docs/atlas/architecture/:version/reliability",
        collapsible: true,
        items: [
          {
            label: "High Availability",
            contentSite: "atlas-architecture",
            url: "/docs/atlas/architecture/:version/high-availability",
          },
          {
            label: "Resiliency",
            contentSite: "atlas-architecture",
            url: "/docs/atlas/architecture/:version/resiliency",
          },
          {
            label: "Backups",
            contentSite: "atlas-architecture",
            url: "/docs/atlas/architecture/:version/backups",
          },
          {
            label: "Disaster Recovery",
            contentSite: "atlas-architecture",
            url: "/docs/atlas/architecture/:version/disaster-recovery",
          },
        ],
      },
      {
        label: "Performance",
        contentSite: "atlas-architecture",
        url: "/docs/atlas/architecture/:version/performance",
        collapsible: true,
        items: [
          {
            label: "Scalability",
            contentSite: "atlas-architecture",
            url: "/docs/atlas/architecture/:version/scalability",
          },
        ],
      },
      {
        label: "Cost Optimization",
        contentSite: "atlas-architecture",
        url: "/docs/atlas/architecture/:version/cost-optimization",
        collapsible: true,
        items: [
          {
            label: "Cost-Saving Configurations",
            contentSite: "atlas-architecture",
            url: "/docs/atlas/architecture/:version/cost-saving-config",
          },
          {
            label: "Billing Data",
            contentSite: "atlas-architecture",
            url: "/docs/atlas/architecture/:version/billing-data",
          },
        ],
      },
      {
        label: "Release Notes",
        contentSite: "atlas-architecture",
        url: "/docs/atlas/architecture/:version/release-notes",
      },
    ],
  },
  {
    label: "Solutions Library",
    contentSite: "atlas-architecture",
    group: true,
    items: solutionsLibrary
  },
];

export default tocData;
