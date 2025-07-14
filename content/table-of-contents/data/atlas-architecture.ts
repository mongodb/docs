import type { TocItem } from "../types";

const tocData: TocItem[] = [
  {
    label: "Atlas Architecture Center",
    contentSite: "atlas-architecture",
    url: "/docs/atlas/architecture/:version/",
    collapsible: true,
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
        label: "Solutions Library",
        contentSite: "atlas-architecture",
        url: "/docs/atlas/architecture/:version/solutions-library",
        collapsible: true,
        items: [
          {
            label: "Financial Services",
            contentSite: "atlas-architecture",
            url: "/docs/atlas/architecture/:version/solutions-library/financial-services",
            collapsible: true,
            items: [
              {
                label: "App-Driven Analytics",
                contentSite: "atlas-architecture",
                url: "/docs/atlas/architecture/:version/solutions-library/fin-services-app-driven-analytics",
                collapsible: true,
                items: [
                  {
                    label: "Modern Fintech Services",
                    contentSite: "atlas-architecture",
                    url: "/docs/atlas/architecture/:version/solutions-library/hasura-fintech-services",
                  },
                  {
                    label: "Open Finance Data Store",
                    contentSite: "atlas-architecture",
                    url: "/docs/atlas/architecture/:version/solutions-library/open-finance-data-store",
                  },
                ],
              },
              {
                label: "Fraud Prevention",
                contentSite: "atlas-architecture",
                url: "/docs/atlas/architecture/:version/solutions-library/fin-services-fraud-prevention",
                collapsible: true,
                items: [
                  {
                    label: "Card Fraud Solution",
                    contentSite: "atlas-architecture",
                    url: "/docs/atlas/architecture/:version/solutions-library/card-fraud-solution",
                  },
                  {
                    label: "Fraud Detection Accelerator",
                    contentSite: "atlas-architecture",
                    url: "/docs/atlas/architecture/:version/solutions-library/fraud-detection-accelerator",
                  },
                  {
                    label: "Vector Search Fraud Prevention",
                    contentSite: "atlas-architecture",
                    url: "/docs/atlas/architecture/:version/solutions-library/vector-search-fraud-prevention",
                  },
                ],
              },
              {
                label: "Gen AI",
                contentSite: "atlas-architecture",
                url: "/docs/atlas/architecture/:version/solutions-library/fin-services-gen-ai",
                collapsible: true,
                items: [
                  {
                    label: "Agentic AI-Powered Investment Portfolio",
                    contentSite: "atlas-architecture",
                    url: "/docs/atlas/architecture/:version/solutions-library/fin-services-agentic-portfolio",
                  },
                  {
                    label: "AI-Driven Interactive Banking",
                    contentSite: "atlas-architecture",
                    url: "/docs/atlas/architecture/:version/solutions-library/ai-driven-interactive-banking",
                  },
                  {
                    label: "Assess Business Loan Risks",
                    contentSite: "atlas-architecture",
                    url: "/docs/atlas/architecture/:version/solutions-library/assessing-business-loan-risks-with-generative-ai",
                  },
                  {
                    label: "Credit Card Application",
                    contentSite: "atlas-architecture",
                    url: "/docs/atlas/architecture/:version/solutions-library/credit-card-application-with-generative-ai",
                  },
                  {
                    label: "Optimize RAG Applications with Fireworks AI",
                    contentSite: "atlas-architecture",
                    url: "/docs/atlas/architecture/:version/solutions-library/fin-services-fireworks-rag",
                  },
                  {
                    label: "Unified Interface for RAG Applications",
                    contentSite: "atlas-architecture",
                    url: "/docs/atlas/architecture/:version/solutions-library/rag-applications",
                  },
                ],
              },
              {
                label: "Modernization",
                contentSite: "atlas-architecture",
                url: "/docs/atlas/architecture/:version/solutions-library/fin-services-modernization",
                collapsible: true,
                items: [
                  {
                    label: "Payments Modernization Accelerator",
                    contentSite: "atlas-architecture",
                    url: "/docs/atlas/architecture/:version/solutions-library/payments-solution",
                  },
                ],
              },
            ],
          },
          {
            label: "Healthcare",
            contentSite: "atlas-architecture",
            url: "/docs/atlas/architecture/:version/solutions-library/healthcare",
            collapsible: true,
            items: [
              {
                label: "Interoperability",
                contentSite: "atlas-architecture",
                url: "/docs/atlas/architecture/:version/solutions-library/healthcare-interoperability",
                collapsible: true,
                items: [
                  {
                    label: "AI-Powered Healthcare",
                    contentSite: "atlas-architecture",
                    url: "/docs/atlas/architecture/:version/solutions-library/healthcare-asset-ai-healthcare",
                  },
                ],
              },
            ],
          },
          {
            label: "Insurance",
            contentSite: "atlas-architecture",
            url: "/docs/atlas/architecture/:version/solutions-library/insurance",
            collapsible: true,
            items: [
              {
                label: "App-Driven Analytics",
                contentSite: "atlas-architecture",
                url: "/docs/atlas/architecture/:version/solutions-library/insurance-app-driven-analytics",
                collapsible: true,
                items: [
                  {
                    label: "AI-Powered Call Center Intelligence",
                    contentSite: "atlas-architecture",
                    url: "/docs/atlas/architecture/:version/solutions-library/insurance-asset-call-centers",
                  },
                  {
                    label: "Automating Digital Underwriting",
                    contentSite: "atlas-architecture",
                    url: "/docs/atlas/architecture/:version/solutions-library/digital-underwriting",
                  },
                ],
              },
              {
                label: "Gen AI",
                contentSite: "atlas-architecture",
                url: "/docs/atlas/architecture/:version/solutions-library/insurance-gen-ai",
                collapsible: true,
                items: [
                  {
                    label: "AI-Enhanced Claim Adjustment",
                    contentSite: "atlas-architecture",
                    url: "/docs/atlas/architecture/:version/solutions-library/insurance-image-search",
                  },
                  {
                    label: "Build a PDF Search Application",
                    contentSite: "atlas-architecture",
                    url: "/docs/atlas/architecture/:version/solutions-library/pdf-search",
                  },
                  {
                    label: "Claim Management for RAG",
                    contentSite: "atlas-architecture",
                    url: "/docs/atlas/architecture/:version/solutions-library/claim-management",
                  },
                ],
              },
            ],
          },
          {
            label: "Manufacturing & Motion",
            contentSite: "atlas-architecture",
            url: "/docs/atlas/architecture/:version/solutions-library/manufacturing",
            collapsible: true,
            items: [
              {
                label: "App-Driven Analytics",
                contentSite: "atlas-architecture",
                url: "/docs/atlas/architecture/:version/solutions-library/manufacturing-app-driven-analytics",
                collapsible: true,
                items: [
                  {
                    label: "Elevate Flight Operations with Real-Time Analytics",
                    contentSite: "atlas-architecture",
                    url: "/docs/atlas/architecture/:version/solutions-library/flight-management",
                  },
                ],
              },
              {
                label: "Gen AI",
                contentSite: "atlas-architecture",
                url: "/docs/atlas/architecture/:version/solutions-library/manufacturing-gen-ai",
                collapsible: true,
                items: [
                  {
                    label: "Agentic AI-Powered Fleet Incident Advisor",
                    contentSite: "atlas-architecture",
                    url: "/docs/atlas/architecture/:version/solutions-library/manufacturing-asset-fleet-management",
                  },
                  {
                    label: "Automotive Diagnostics",
                    contentSite: "atlas-architecture",
                    url: "/docs/atlas/architecture/:version/solutions-library/manufacturing-asset-automotive-diagnostics",
                  },
                  {
                    label: "Framework for Rapid AI Agent Deployment",
                    contentSite: "atlas-architecture",
                    url: "/docs/atlas/architecture/:version/solutions-library/manufacturing-agentic-ai-framework",
                  },
                  {
                    label: "Predictive Maintenance Excellence",
                    contentSite: "atlas-architecture",
                    url: "/docs/atlas/architecture/:version/solutions-library/manufacturing-asset-predictive-maintenance",
                  },
                  {
                    label: "Transforming the Driver Experience",
                    contentSite: "atlas-architecture",
                    url: "/docs/atlas/architecture/:version/solutions-library/manufacturing-asset-car-assistant",
                  },
                ],
              },
              {
                label: "IoT",
                contentSite: "atlas-architecture",
                url: "/docs/atlas/architecture/:version/solutions-library/manufacturing-iot",
                collapsible: true,
                items: [
                  {
                    label: "Building an IoT Data Hub",
                    contentSite: "atlas-architecture",
                    url: "/docs/atlas/architecture/:version/solutions-library/iot-datahub-smart-manufacturing",
                  },
                  {
                    label: "Power Smart Meter Solution",
                    contentSite: "atlas-architecture",
                    url: "/docs/atlas/architecture/:version/solutions-library/smart-meter",
                  },
                  {
                    label: "Real-Time Audio Diagnostics",
                    contentSite: "atlas-architecture",
                    url: "/docs/atlas/architecture/:version/solutions-library/audio-based-AI-diagnostics",
                  },
                  {
                    label: "Real-Time IoT Analytics",
                    contentSite: "atlas-architecture",
                    url: "/docs/atlas/architecture/:version/solutions-library/manufacturing-asset-rocket-launch",
                  },
                ],
              },
              {
                label: "Modernization",
                contentSite: "atlas-architecture",
                url: "/docs/atlas/architecture/:version/solutions-library/manufacturing-modernization",
                collapsible: true,
                items: [
                  {
                    label: "Unified Namespace Data Integrity",
                    contentSite: "atlas-architecture",
                    url: "/docs/atlas/architecture/:version/solutions-library/manufacturing-asset-unified-namespace",
                  },
                ],
              },
            ],
          },
          {
            label: "Media",
            contentSite: "atlas-architecture",
            url: "/docs/atlas/architecture/:version/solutions-library/media",
            collapsible: true,
            items: [
              {
                label: "App-Driven Analytics",
                contentSite: "atlas-architecture",
                url: "/docs/atlas/architecture/:version/solutions-library/media-app-driven-analytics",
                collapsible: true,
                items: [
                  {
                    label: "Streamline Global Gaming Management",
                    contentSite: "atlas-architecture",
                    url: "/docs/atlas/architecture/:version/solutions-library/streamline-gaming-management",
                  },
                ],
              },
              {
                label: "Gen AI",
                contentSite: "atlas-architecture",
                url: "/docs/atlas/architecture/:version/solutions-library/media-gen-ai",
                collapsible: true,
                items: [
                  {
                    label: "AI-Driven Media Personalization",
                    contentSite: "atlas-architecture",
                    url: "/docs/atlas/architecture/:version/solutions-library/media-personalization",
                  },
                  {
                    label: "Gen AI-Powered Video Summarization",
                    contentSite: "atlas-architecture",
                    url: "/docs/atlas/architecture/:version/solutions-library/ai-powered-video-summarization",
                  },
                ],
              },
            ],
          },
          {
            label: "Retail",
            contentSite: "atlas-architecture",
            url: "/docs/atlas/architecture/:version/solutions-library/retail",
            collapsible: true,
            items: [
              {
                label: "Catalog",
                contentSite: "atlas-architecture",
                url: "/docs/atlas/architecture/:version/solutions-library/retail-catalog",
                collapsible: true,
                items: [
                  {
                    label: "As-You-Type Suggestions",
                    contentSite: "atlas-architecture",
                    url: "/docs/atlas/architecture/:version/solutions-library/retail-as-you-type-suggestions",
                  },
                  {
                    label: "Building an Inventory Management System",
                    contentSite: "atlas-architecture",
                    url: "/docs/atlas/architecture/:version/solutions-library/retail-asset-event-driven-inventory",
                  },
                  {
                    label: "Building an Omnichannel Ordering System",
                    contentSite: "atlas-architecture",
                    url: "/docs/atlas/architecture/:version/solutions-library/retail-asset-omnichannel-ordering",
                  },
                  {
                    label: "RFID Product Tracking",
                    contentSite: "atlas-architecture",
                    url: "/docs/atlas/architecture/:version/solutions-library/retail-asset-rfid-retail",
                  },
                ],
              },
              {
                label: "Gen AI",
                contentSite: "atlas-architecture",
                url: "/docs/atlas/architecture/:version/solutions-library/retail-gen-ai",
                collapsible: true,
                items: [
                  {
                    label: "AI Product Search",
                    contentSite: "atlas-architecture",
                    url: "/docs/atlas/architecture/:version/solutions-library/retail-ai-product-search",
                  },
                  {
                    label: "Automating Product Descriptions",
                    contentSite: "atlas-architecture",
                    url: "/docs/atlas/architecture/:version/solutions-library/retail-asset-product-description",
                  },
                  {
                    label: "Launching an Agentic RAG Chatbot",
                    contentSite: "atlas-architecture",
                    url: "/docs/atlas/architecture/:version/solutions-library/retail-asset-rag-chatbot",
                  },
                ],
              },
              {
                label: "Personalization",
                contentSite: "atlas-architecture",
                url: "/docs/atlas/architecture/:version/solutions-library/retail-personalization",
                collapsible: true,
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
                    label: "Real-Time Receipt Data",
                    contentSite: "atlas-architecture",
                    url: "/docs/atlas/architecture/:version/solutions-library/real-time-insights-from-receipts",
                  },
                ],
              },
            ],
          },
          {
            label: "Telecommunications",
            contentSite: "atlas-architecture",
            url: "/docs/atlas/architecture/:version/solutions-library/telco",
            collapsible: true,
            items: [
              {
                label: "Gen AI",
                contentSite: "atlas-architecture",
                url: "/docs/atlas/architecture/:version/solutions-library/telcom-gen-ai",
                collapsible: true,
                items: [
                  {
                    label: "AI-Powered Chatbot for Network Management",
                    contentSite: "atlas-architecture",
                    url: "/docs/atlas/architecture/:version/solutions-library/telecom-asset-telco-ops",
                  },
                ],
              },
            ],
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
];

export default tocData;
