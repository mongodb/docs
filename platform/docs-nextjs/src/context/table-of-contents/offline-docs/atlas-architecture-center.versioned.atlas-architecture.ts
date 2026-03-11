import type { L1TocItem } from '../types';

export const toc: L1TocItem[] = [
  {
    label: 'Atlas Architecture Center',
    contentSite: 'atlas-architecture',
    url: '/docs/atlas/architecture/:version',
    items: [
      {
        label: 'Well-Architected Framework',
        contentSite: 'atlas-architecture',
        group: true,
        versionDropdown: true,
        items: [
          {
            label: 'Getting Started',
            contentSite: 'atlas-architecture',
            collapsible: true,
            url: '/docs/atlas/architecture/:version/getting-started',
            items: [
              {
                label: 'Landing Zone Design',
                contentSite: 'atlas-architecture',
                url: '/docs/atlas/architecture/:version/landing-zone',
              },
              {
                label: 'Deployment Paradigms',
                contentSite: 'atlas-architecture',
                collapsible: true,
                url: '/docs/atlas/architecture/:version/deployment-paradigms',
                versions: {
                  excludes: ['v20250604', 'v20250317', 'v20250228'],
                },
                items: [
                  {
                    label: 'Single-Region',
                    contentSite: 'atlas-architecture',
                    url: '/docs/atlas/architecture/:version/deployment-paradigms/single-region',
                    versions: {
                      excludes: ['v20250604', 'v20250317', 'v20250228'],
                    },
                  },
                  {
                    label: 'Multi-Region',
                    contentSite: 'atlas-architecture',
                    collapsible: true,
                    url: '/docs/atlas/architecture/:version/deployment-paradigms/multi-region',
                    versions: {
                      excludes: ['v20250604', 'v20250317', 'v20250228'],
                    },
                    items: [
                      {
                        label: 'Global Data',
                        contentSite: 'atlas-architecture',
                        url: '/docs/atlas/architecture/:version/deployment-paradigms/global-data',
                        versions: {
                          excludes: ['v20250604', 'v20250317', 'v20250228'],
                        },
                      },
                    ],
                  },
                  {
                    label: 'Multi-Cloud',
                    contentSite: 'atlas-architecture',
                    url: '/docs/atlas/architecture/:version/deployment-paradigms/multi-cloud',
                    versions: {
                      excludes: ['v20250604', 'v20250317', 'v20250228'],
                    },
                  },
                  {
                    label: 'Hybrid',
                    contentSite: 'atlas-architecture',
                    url: '/docs/atlas/architecture/:version/deployment-paradigms/hybrid',
                    versions: {
                      excludes: ['v20250604', 'v20250317', 'v20250228'],
                    },
                  },
                ],
              },
              {
                label: 'Orgs, Projects, and Clusters',
                contentSite: 'atlas-architecture',
                url: '/docs/atlas/architecture/:version/hierarchy',
              },
              {
                label: 'Migration',
                contentSite: 'atlas-architecture',
                url: '/docs/atlas/architecture/:version/migration',
                versions: {
                  excludes: ['v20250604', 'v20250317', 'v20250228'],
                },
              },
              {
                label: 'Operational Readiness Checklist',
                contentSite: 'atlas-architecture',
                url: '/docs/atlas/architecture/:version/operational-readiness-checklist',
                versions: {
                  excludes: ['v20250604', 'v20250317', 'v20250228'],
                },
              },
            ],
          },
          {
            label: 'Operational Efficiency',
            contentSite: 'atlas-architecture',
            collapsible: true,
            url: '/docs/atlas/architecture/:version/operational-efficiency',
            items: [
              {
                label: 'Automation',
                contentSite: 'atlas-architecture',
                url: '/docs/atlas/architecture/:version/automation',
              },
              {
                label: 'Monitoring and Alerts',
                contentSite: 'atlas-architecture',
                url: '/docs/atlas/architecture/:version/monitoring-alerts',
              },
              {
                label: 'Development and Testing',
                contentSite: 'atlas-architecture',
                url: '/docs/atlas/architecture/:version/dev-test',
                versions: {
                  excludes: ['v20250604', 'v20250317', 'v20250228'],
                },
              },
            ],
          },
          {
            label: 'Security',
            contentSite: 'atlas-architecture',
            collapsible: true,
            url: '/docs/atlas/architecture/:version/security',
            items: [
              {
                label: 'Network Security',
                contentSite: 'atlas-architecture',
                url: '/docs/atlas/architecture/:version/network-security',
              },
              {
                label: 'Authorization and Authentication',
                contentSite: 'atlas-architecture',
                url: '/docs/atlas/architecture/:version/auth',
                versions: {
                  includes: ['v20250604', 'v20250317', 'v20250228'],
                },
              },
              {
                label: 'Authorization and Authentication ',
                contentSite: 'atlas-architecture',
                collapsible: true,
                url: '/docs/atlas/architecture/:version/auth',
                versions: {
                  excludes: ['v20250604', 'v20250317', 'v20250228'],
                },
                items: [
                  {
                    label: 'Authentication',
                    contentSite: 'atlas-architecture',
                    url: '/docs/atlas/architecture/:version/auth/authentication',
                    versions: {
                      excludes: ['v20250604', 'v20250317', 'v20250228'],
                    },
                  },
                  {
                    label: 'Authorization',
                    contentSite: 'atlas-architecture',
                    url: '/docs/atlas/architecture/:version/auth/authorization',
                    versions: {
                      excludes: ['v20250604', 'v20250317', 'v20250228'],
                    },
                  },
                  {
                    label: 'Auth Examples',
                    contentSite: 'atlas-architecture',
                    url: '/docs/atlas/architecture/:version/auth/auth-examples',
                    versions: {
                      excludes: ['v20250604', 'v20250317', 'v20250228'],
                    },
                  },
                ],
              },
              {
                label: 'Data Encryption',
                contentSite: 'atlas-architecture',
                url: '/docs/atlas/architecture/:version/data-encryption',
              },
              {
                label: 'Compliance',
                contentSite: 'atlas-architecture',
                url: '/docs/atlas/architecture/:version/compliance',
                versions: {
                  includes: ['v20250604', 'v20250317', 'v20250228'],
                },
              },
              {
                label: 'Compliance ',
                contentSite: 'atlas-architecture',
                collapsible: true,
                url: '/docs/atlas/architecture/:version/compliance',
                versions: {
                  excludes: ['v20250604', 'v20250317', 'v20250228'],
                },
                items: [
                  {
                    label: 'DORA',
                    contentSite: 'atlas-architecture',
                    url: '/docs/atlas/architecture/:version/compliance/dora',
                    versions: {
                      excludes: ['v20250604', 'v20250317', 'v20250228'],
                    },
                  },
                  {
                    label: 'GDPR',
                    contentSite: 'atlas-architecture',
                    url: '/docs/atlas/architecture/:version/compliance/gdpr',
                    versions: {
                      excludes: ['v20250829', 'v20250604', 'v20250317', 'v20250228'],
                    },
                  },
                  {
                    label: 'HIPAA',
                    contentSite: 'atlas-architecture',
                    url: '/docs/atlas/architecture/:version/compliance/hipaa',
                    versions: {
                      excludes: ['v20251125', 'v20250829', 'v20250604', 'v20250317', 'v20250228'],
                    },
                  },
                  {
                    label: 'PCI DSS',
                    contentSite: 'atlas-architecture',
                    url: '/docs/atlas/architecture/:version/compliance/pcidss',
                    versions: {
                      excludes: ['v20260204', 'v20251125', 'v20250829', 'v20250604', 'v20250317', 'v20250228'],
                    },
                  },
                ],
              },
              {
                label: 'Auditing and Logging',
                contentSite: 'atlas-architecture',
                url: '/docs/atlas/architecture/:version/auditing-logging',
                versions: {
                  includes: ['v20250604', 'v20250317', 'v20250228'],
                },
              },
              {
                label: 'Auditing and Logging ',
                contentSite: 'atlas-architecture',
                collapsible: true,
                url: '/docs/atlas/architecture/:version/auditing-logging',
                versions: {
                  excludes: ['v20250604', 'v20250317', 'v20250228'],
                },
                items: [
                  {
                    label: 'Auditing',
                    contentSite: 'atlas-architecture',
                    url: '/docs/atlas/architecture/:version/auditing',
                    versions: {
                      excludes: ['v20250604', 'v20250317', 'v20250228'],
                    },
                  },
                  {
                    label: 'Logging',
                    contentSite: 'atlas-architecture',
                    url: '/docs/atlas/architecture/:version/logging',
                    versions: {
                      excludes: ['v20250604', 'v20250317', 'v20250228'],
                    },
                  },
                ],
              },
            ],
          },
          {
            label: 'Reliability',
            contentSite: 'atlas-architecture',
            collapsible: true,
            url: '/docs/atlas/architecture/:version/reliability',
            items: [
              {
                label: 'High Availability',
                contentSite: 'atlas-architecture',
                url: '/docs/atlas/architecture/:version/high-availability',
              },
              {
                label: 'Resiliency',
                contentSite: 'atlas-architecture',
                url: '/docs/atlas/architecture/:version/resiliency',
                versions: {
                  includes: ['v20250604', 'v20250317', 'v20250228'],
                },
              },
              {
                label: 'Backups',
                contentSite: 'atlas-architecture',
                url: '/docs/atlas/architecture/:version/backups',
              },
              {
                label: 'Disaster Recovery',
                contentSite: 'atlas-architecture',
                url: '/docs/atlas/architecture/:version/disaster-recovery',
              },
            ],
          },
          {
            label: 'Performance',
            contentSite: 'atlas-architecture',
            collapsible: true,
            url: '/docs/atlas/architecture/:version/performance',
            items: [
              {
                label: 'Scalability',
                contentSite: 'atlas-architecture',
                url: '/docs/atlas/architecture/:version/scalability',
              },
              {
                label: 'Latency Reduction',
                contentSite: 'atlas-architecture',
                url: '/docs/atlas/architecture/:version/latency-strategies',
                versions: {
                  excludes: ['v20250604', 'v20250317', 'v20250228'],
                },
              },
            ],
          },
          {
            label: 'Cost Optimization',
            contentSite: 'atlas-architecture',
            collapsible: true,
            url: '/docs/atlas/architecture/:version/cost-optimization',
            items: [
              {
                label: 'Cost-Saving Configurations',
                contentSite: 'atlas-architecture',
                url: '/docs/atlas/architecture/:version/cost-saving-config',
              },
              {
                label: 'Billing Data',
                contentSite: 'atlas-architecture',
                url: '/docs/atlas/architecture/:version/billing-data',
              },
            ],
          },
          {
            label: 'Release Notes',
            contentSite: 'atlas-architecture',
            url: '/docs/atlas/architecture/:version/release-notes',
          },
        ],
      },
      {
        label: 'Solutions Library',
        contentSite: 'atlas-architecture',
        group: true,
        items: [
          {
            label: 'Overview',
            contentSite: 'atlas-architecture',
            url: '/docs/atlas/architecture/:version/solutions-library',
          },
          {
            label: 'Financial Services',
            contentSite: 'atlas-architecture',
            collapsible: true,
            items: [
              {
                label: 'App-Driven Analytics',
                contentSite: 'atlas-architecture',
                collapsible: true,
                items: [
                  {
                    label: 'Modern Fintech Services',
                    contentSite: 'atlas-architecture',
                    url: '/docs/atlas/architecture/:version/solutions-library/hasura-fintech-services',
                  },
                  {
                    label: 'Open Finance Data Store',
                    contentSite: 'atlas-architecture',
                    url: '/docs/atlas/architecture/:version/solutions-library/open-finance-data-store',
                  },
                ],
              },
              {
                label: 'Fraud Prevention',
                contentSite: 'atlas-architecture',
                collapsible: true,
                items: [
                  {
                    label: 'Card Fraud Solution',
                    contentSite: 'atlas-architecture',
                    url: '/docs/atlas/architecture/:version/solutions-library/card-fraud-solution',
                  },
                  {
                    label: 'Financial Crime Mitigation',
                    contentSite: 'atlas-architecture',
                    url: '/docs/atlas/architecture/:version/solutions-library/fincrime-mitigation',
                  },
                  {
                    label: 'Fraud Detection Accelerator',
                    contentSite: 'atlas-architecture',
                    url: '/docs/atlas/architecture/:version/solutions-library/fraud-detection-accelerator',
                  },
                  {
                    label: 'Vector Search Fraud Prevention',
                    contentSite: 'atlas-architecture',
                    url: '/docs/atlas/architecture/:version/solutions-library/vector-search-fraud-prevention',
                  },
                ],
              },
              {
                label: 'Gen AI',
                contentSite: 'atlas-architecture',
                collapsible: true,
                items: [
                  {
                    label: 'Agentic AI-Powered Investment Portfolio',
                    contentSite: 'atlas-architecture',
                    url: '/docs/atlas/architecture/:version/solutions-library/fin-services-agentic-portfolio',
                  },
                  {
                    label: 'AI-Driven Interactive Banking',
                    contentSite: 'atlas-architecture',
                    url: '/docs/atlas/architecture/:version/solutions-library/ai-driven-interactive-banking',
                  },
                  {
                    label: 'Assess Business Loan Risks',
                    contentSite: 'atlas-architecture',
                    url: '/docs/atlas/architecture/:version/solutions-library/assessing-business-loan-risks-with-generative-ai',
                  },
                  {
                    label: 'Credit Card Application',
                    contentSite: 'atlas-architecture',
                    url: '/docs/atlas/architecture/:version/solutions-library/credit-card-application-with-generative-ai',
                  },
                  {
                    label: 'Document Intelligence with Agentic AI',
                    contentSite: 'atlas-architecture',
                    url: '/docs/atlas/architecture/:version/solutions-library/document-intelligence',
                  },
                  {
                    label: 'Optimize RAG Applications with Fireworks AI',
                    contentSite: 'atlas-architecture',
                    url: '/docs/atlas/architecture/:version/solutions-library/fin-services-fireworks-rag',
                  },
                  {
                    label: 'Unified Interface for RAG Applications',
                    contentSite: 'atlas-architecture',
                    url: '/docs/atlas/architecture/:version/solutions-library/rag-applications',
                  },
                ],
              },
              {
                label: 'Modernization',
                contentSite: 'atlas-architecture',
                collapsible: true,
                items: [
                  {
                    label: 'Agentic AI-Powered Payments Orchestration',
                    contentSite: 'atlas-architecture',
                    url: '/docs/atlas/architecture/:version/solutions-library/agentic-powered-payments',
                  },
                  {
                    label: 'Payments Modernization Accelerator',
                    contentSite: 'atlas-architecture',
                    url: '/docs/atlas/architecture/:version/solutions-library/payments-solution',
                  },
                ],
              },
            ],
          },
          {
            label: 'Healthcare',
            contentSite: 'atlas-architecture',
            collapsible: true,
            items: [
              {
                label: 'Interoperability',
                contentSite: 'atlas-architecture',
                collapsible: true,
                items: [
                  {
                    label: 'AI-Powered Healthcare',
                    contentSite: 'atlas-architecture',
                    url: '/docs/atlas/architecture/:version/solutions-library/healthcare-asset-ai-healthcare',
                  },
                  {
                    label: 'Hybrid FHIR ODL',
                    contentSite: 'atlas-architecture',
                    url: '/docs/atlas/architecture/:version/solutions-library/fhir-data-layer',
                  },
                ],
              },
            ],
          },
          {
            label: 'Insurance',
            contentSite: 'atlas-architecture',
            collapsible: true,
            items: [
              {
                label: 'App-Driven Analytics',
                contentSite: 'atlas-architecture',
                collapsible: true,
                items: [
                  {
                    label: 'AI-Powered Call Center Intelligence',
                    contentSite: 'atlas-architecture',
                    url: '/docs/atlas/architecture/:version/solutions-library/insurance-asset-call-centers',
                  },
                  {
                    label: 'Automating Digital Underwriting',
                    contentSite: 'atlas-architecture',
                    url: '/docs/atlas/architecture/:version/solutions-library/digital-underwriting',
                  },
                ],
              },
              {
                label: 'Gen AI',
                contentSite: 'atlas-architecture',
                collapsible: true,
                items: [
                  {
                    label: 'Agentic Claims Processing',
                    contentSite: 'atlas-architecture',
                    url: '/docs/atlas/architecture/:version/solutions-library/insurance-agentic-claims',
                  },
                  {
                    label: 'AI-Enhanced Claim Adjustment',
                    contentSite: 'atlas-architecture',
                    url: '/docs/atlas/architecture/:version/solutions-library/insurance-image-search',
                  },
                  {
                    label: 'Build a PDF Search Application',
                    contentSite: 'atlas-architecture',
                    url: '/docs/atlas/architecture/:version/solutions-library/pdf-search',
                  },
                  {
                    label: 'Claim Management for RAG',
                    contentSite: 'atlas-architecture',
                    url: '/docs/atlas/architecture/:version/solutions-library/claim-management',
                  },
                ],
              },
            ],
          },
          {
            label: 'Manufacturing & Motion',
            contentSite: 'atlas-architecture',
            collapsible: true,
            items: [
              {
                label: 'Aviation Operations',
                contentSite: 'atlas-architecture',
                collapsible: true,
                items: [
                  {
                    label: 'Agentic Voice Assistant for Airport Operations',
                    contentSite: 'atlas-architecture',
                    url: '/docs/atlas/architecture/:version/solutions-library/agentic-airport-operations',
                  },
                  {
                    label: 'Elevate Flight Operations with Real-Time Analytics',
                    contentSite: 'atlas-architecture',
                    url: '/docs/atlas/architecture/:version/solutions-library/flight-management',
                  },
                  {
                    label: 'Real-Time IoT Analytics',
                    contentSite: 'atlas-architecture',
                    url: '/docs/atlas/architecture/:version/solutions-library/manufacturing-asset-rocket-launch',
                  },
                ],
              },
              {
                label: 'Connected Vehicles',
                contentSite: 'atlas-architecture',
                collapsible: true,
                items: [
                  {
                    label: 'Agentic AI-Powered Fleet Incident Advisor',
                    contentSite: 'atlas-architecture',
                    url: '/docs/atlas/architecture/:version/solutions-library/manufacturing-asset-fleet-management',
                  },
                  {
                    label: 'Agentic Fleet Management',
                    contentSite: 'atlas-architecture',
                    url: '/docs/atlas/architecture/:version/solutions-library/agentic-fleet-management',
                  },
                  {
                    label: 'Automotive Diagnostics',
                    contentSite: 'atlas-architecture',
                    url: '/docs/atlas/architecture/:version/solutions-library/manufacturing-asset-automotive-diagnostics',
                  },
                  {
                    label: 'Build an Automotive Diagnostics App',
                    contentSite: 'atlas-architecture',
                    url: '/docs/atlas/architecture/:version/solutions-library/car-manual-explorer',
                  },
                  {
                    label: 'Context-Aware RAG for Technical Docs',
                    contentSite: 'atlas-architecture',
                    url: '/docs/atlas/architecture/:version/solutions-library/rag-technical-documents',
                  },
                  {
                    label: 'Transform the Driver Experience',
                    contentSite: 'atlas-architecture',
                    url: '/docs/atlas/architecture/:version/solutions-library/manufacturing-asset-car-assistant',
                  },
                ],
              },
              {
                label: 'Energy Management',
                contentSite: 'atlas-architecture',
                collapsible: true,
                items: [
                  {
                    label: 'Power Smart Meter Analysis',
                    contentSite: 'atlas-architecture',
                    url: '/docs/atlas/architecture/:version/solutions-library/smart-meter',
                  },
                  {
                    label: 'Real-Time Audio Diagnostics',
                    contentSite: 'atlas-architecture',
                    url: '/docs/atlas/architecture/:version/solutions-library/audio-based-AI-diagnostics',
                  },
                ],
              },
              {
                label: 'Intelligent Logistics',
                contentSite: 'atlas-architecture',
                collapsible: true,
                items: [
                  {
                    label: 'AI-Driven Inventory Classification',
                    contentSite: 'atlas-architecture',
                    url: '/docs/atlas/architecture/:version/solutions-library/inventory-optimization',
                  },
                  {
                    label: 'Event-Driven Inventory Management System',
                    contentSite: 'atlas-architecture',
                    url: '/docs/atlas/architecture/:version/solutions-library/manufacturing-event-driven-inventory',
                  },
                ],
              },
              {
                label: 'Smart Factory',
                contentSite: 'atlas-architecture',
                collapsible: true,
                items: [
                  {
                    label: 'Agentic Yield Analytics with MongoDB',
                    contentSite: 'atlas-architecture',
                    url: '/docs/atlas/architecture/:version/solutions-library/agentic-yield-analytics',
                  },
                  {
                    label: 'Build an IoT Data Hub',
                    contentSite: 'atlas-architecture',
                    url: '/docs/atlas/architecture/:version/solutions-library/iot-datahub-smart-manufacturing',
                  },
                  {
                    label: 'Framework for Rapid AI Agent Deployment',
                    contentSite: 'atlas-architecture',
                    url: '/docs/atlas/architecture/:version/solutions-library/manufacturing-agentic-ai-framework',
                  },
                  {
                    label: 'Multi-Agent Predictive Maintenance',
                    contentSite: 'atlas-architecture',
                    url: '/docs/atlas/architecture/:version/solutions-library/multi-agent-predictive-maintenance',
                  },
                  {
                    label: 'Predictive Maintenance Excellence',
                    contentSite: 'atlas-architecture',
                    url: '/docs/atlas/architecture/:version/solutions-library/manufacturing-asset-predictive-maintenance',
                  },
                  {
                    label: 'Unified Namespace Data Integrity',
                    contentSite: 'atlas-architecture',
                    url: '/docs/atlas/architecture/:version/solutions-library/manufacturing-asset-unified-namespace',
                  },
                ],
              },
            ],
          },
          {
            label: 'Media',
            contentSite: 'atlas-architecture',
            collapsible: true,
            items: [
              {
                label: 'App-Driven Analytics',
                contentSite: 'atlas-architecture',
                collapsible: true,
                items: [
                  {
                    label: 'Streamline Global Gaming Management',
                    contentSite: 'atlas-architecture',
                    url: '/docs/atlas/architecture/:version/solutions-library/streamline-gaming-management',
                  },
                ],
              },
              {
                label: 'Gen AI',
                contentSite: 'atlas-architecture',
                collapsible: true,
                items: [
                  {
                    label: 'AI-Driven Media Personalization',
                    contentSite: 'atlas-architecture',
                    url: '/docs/atlas/architecture/:version/solutions-library/media-personalization',
                  },
                  {
                    label: 'Editorial Workflows with Gen AI',
                    contentSite: 'atlas-architecture',
                    url: '/docs/atlas/architecture/:version/solutions-library/streamline-editorial-workflows',
                  },
                  {
                    label: 'Gen AI-Powered Video Summarization',
                    contentSite: 'atlas-architecture',
                    url: '/docs/atlas/architecture/:version/solutions-library/ai-powered-video-summarization',
                  },
                  {
                    label: 'Semantic Video Search',
                    contentSite: 'atlas-architecture',
                    url: '/docs/atlas/architecture/:version/solutions-library/semantic-video-search',
                  },
                  {
                    label: 'Text-to-Audio News Conversion',
                    contentSite: 'atlas-architecture',
                    url: '/docs/atlas/architecture/:version/solutions-library/text-to-audio-conversion',
                  },
                ],
              },
            ],
          },
          {
            label: 'Retail',
            contentSite: 'atlas-architecture',
            collapsible: true,
            items: [
              {
                label: 'In-Store and Omnichannel',
                contentSite: 'atlas-architecture',
                collapsible: true,
                items: [
                  {
                    label: 'Amplify Brands in Real Time for Retail Growth',
                    contentSite: 'atlas-architecture',
                    url: '/docs/atlas/architecture/:version/solutions-library/brand-amplification',
                  },
                  {
                    label: 'Building an Inventory Management System',
                    contentSite: 'atlas-architecture',
                    url: '/docs/atlas/architecture/:version/solutions-library/retail-asset-event-driven-inventory',
                  },
                  {
                    label: 'Building an Omnichannel Ordering System',
                    contentSite: 'atlas-architecture',
                    url: '/docs/atlas/architecture/:version/solutions-library/retail-asset-omnichannel-ordering',
                  },
                  {
                    label: 'Digital Receipts',
                    contentSite: 'atlas-architecture',
                    url: '/docs/atlas/architecture/:version/solutions-library/real-time-insights-from-receipts',
                  },
                  {
                    label: 'RFID Product Tracking',
                    contentSite: 'atlas-architecture',
                    url: '/docs/atlas/architecture/:version/solutions-library/retail-asset-rfid-retail',
                  },
                  {
                    label: 'Unified Commerce',
                    contentSite: 'atlas-architecture',
                    url: '/docs/atlas/architecture/:version/solutions-library/unified-commerce',
                  },
                ],
              },
              {
                label: 'Gen AI',
                contentSite: 'atlas-architecture',
                collapsible: true,
                items: [
                  {
                    label: 'Advanced Search with Enterprise Server',
                    contentSite: 'atlas-architecture',
                    url: '/docs/atlas/architecture/:version/solutions-library/search-enterprise-server',
                  },
                  {
                    label: 'Automate Product Descriptions',
                    contentSite: 'atlas-architecture',
                    url: '/docs/atlas/architecture/:version/solutions-library/retail-asset-product-description',
                  },
                  {
                    label: 'Launching an Agentic RAG Chatbot',
                    contentSite: 'atlas-architecture',
                    url: '/docs/atlas/architecture/:version/solutions-library/retail-asset-rag-chatbot',
                  },
                ],
              },
              {
                label: 'Personalization',
                contentSite: 'atlas-architecture',
                collapsible: true,
                items: [
                  {
                    label: 'AI-Driven Real-Time Pricing',
                    contentSite: 'atlas-architecture',
                    url: '/docs/atlas/architecture/:version/solutions-library/ai-driven-real-time-pricing',
                  },
                  {
                    label: 'AI Product Search',
                    contentSite: 'atlas-architecture',
                    url: '/docs/atlas/architecture/:version/solutions-library/retail-ai-product-search',
                  },
                  {
                    label: 'As-You-Type Suggestions',
                    contentSite: 'atlas-architecture',
                    url: '/docs/atlas/architecture/:version/solutions-library/retail-as-you-type-suggestions',
                  },
                ],
              },
            ],
          },
          {
            label: 'Telecommunications',
            contentSite: 'atlas-architecture',
            collapsible: true,
            items: [
              {
                label: 'Gen AI',
                contentSite: 'atlas-architecture',
                collapsible: true,
                items: [
                  {
                    label: 'AI-Powered Chatbot for Network Management',
                    contentSite: 'atlas-architecture',
                    url: '/docs/atlas/architecture/:version/solutions-library/telecom-asset-telco-ops',
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        label: 'Partner Showcase',
        contentSite: 'atlas-architecture',
        group: true,
        items: [
          {
            label: 'IntellectAI Purple Fabric',
            contentSite: 'atlas-architecture',
            url: '/docs/atlas/architecture/:version/partner-showcase/intellectai-purple-fabric',
          },
          {
            label: 'Xlrt',
            contentSite: 'atlas-architecture',
            url: '/docs/atlas/architecture/:version/partner-showcase/xlrt',
          },
        ],
      },
    ],
  },
];
