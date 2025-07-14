import type { TocItem } from "../types";

const tocData: TocItem[] = [
  {
    label: "Pricing",
    isExternal: true,
    group: true,
    items: [
      {
        label: "AI-Driven Real-Time Pricing",
        contentSite: "atlas-architecture",
        url: "/docs/atlas/architecture/:version/solutions-library/ai-driven-real-time-pricing",
      },
      {
        label: "Dynamic Pricing",
        contentSite: "atlas-architecture",
        url: "/docs/atlas/architecture/:version/solutions-library/retail-dynamic-pricing",
      },
      {
        label: "Pricing",
        contentSite: "charts",
        url: "/docs/atlas/charts/pricing",
      },
      {
        label: "Process Payment",
        contentSite: "cloud-manager",
        url: "/docs/cloud-manager/core/pricing",
        collapsible: true,
        items: [
          {
            label: "Manage Invoices",
            contentSite: "cloud-manager",
            url: "/docs/cloud-manager/billing/invoices",
          },
          {
            label: "Process International Payments",
            contentSite: "cloud-manager",
            url: "/docs/cloud-manager/billing/international-billing",
          },
        ],
      },
    ],
  },
];

export default tocData;
