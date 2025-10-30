import type { TocItem } from '../types';

const tocData: TocItem[] = [
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
        label: 'App-Driven Analytics',
        contentSite: 'atlas-architecture',
        collapsible: true,
        items: [
          {
            label: 'Elevate Flight Operations with Real-Time Analytics',
            contentSite: 'atlas-architecture',
            url: '/docs/atlas/architecture/:version/solutions-library/flight-management',
          },
        ],
      },
      {
        label: 'Gen AI',
        contentSite: 'atlas-architecture',
        collapsible: true,
        items: [
          {
            label: 'Agentic AI-Powered Fleet Incident Advisor',
            contentSite: 'atlas-architecture',
            url: '/docs/atlas/architecture/:version/solutions-library/manufacturing-asset-fleet-management',
          },
          {
            label: 'Agentic Voice Assistant for Airport Operations',
            contentSite: 'atlas-architecture',
            url: '/docs/atlas/architecture/:version/solutions-library/agentic-airport-operations',
          },
          {
            label: 'Automotive Diagnostics',
            contentSite: 'atlas-architecture',
            url: '/docs/atlas/architecture/:version/solutions-library/manufacturing-asset-automotive-diagnostics',
          },
          {
            label: 'Context-Aware RAG for Technical Documents',
            contentSite: 'atlas-architecture',
            url: '/docs/atlas/architecture/:version/solutions-library/rag-technical-documents',
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
            label: 'Transforming the Driver Experience',
            contentSite: 'atlas-architecture',
            url: '/docs/atlas/architecture/:version/solutions-library/manufacturing-asset-car-assistant',
          },
        ],
      },
      {
        label: 'IoT',
        contentSite: 'atlas-architecture',
        collapsible: true,
        items: [
          {
            label: 'Building an IoT Data Hub',
            contentSite: 'atlas-architecture',
            url: '/docs/atlas/architecture/:version/solutions-library/iot-datahub-smart-manufacturing',
          },
          {
            label: 'Power Smart Meter Solution',
            contentSite: 'atlas-architecture',
            url: '/docs/atlas/architecture/:version/solutions-library/smart-meter',
          },
          {
            label: 'Real-Time Audio Diagnostics',
            contentSite: 'atlas-architecture',
            url: '/docs/atlas/architecture/:version/solutions-library/audio-based-AI-diagnostics',
          },
          {
            label: 'Real-Time IoT Analytics',
            contentSite: 'atlas-architecture',
            url: '/docs/atlas/architecture/:version/solutions-library/manufacturing-asset-rocket-launch',
          },
        ],
      },
      {
        label: 'Modernization',
        contentSite: 'atlas-architecture',
        collapsible: true,
        items: [
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
            label: 'Automating Product Descriptions',
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
          {
            label: 'Dynamic Pricing',
            contentSite: 'atlas-architecture',
            url: '/docs/atlas/architecture/:version/solutions-library/retail-dynamic-pricing',
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
];

export default tocData;
