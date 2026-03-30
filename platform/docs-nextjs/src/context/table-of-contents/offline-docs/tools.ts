import type { L1TocItem } from '../types';

export const toc: L1TocItem[] = [
  {
    label: 'Tools',
    contentSite: 'landing',
    url: '/docs/tools-and-connectors',
    items: [
      {
        label: 'For Agents',
        contentSite: 'docs',
        group: true,
        items: [
          {
            label: 'Agent Skills',
            contentSite: 'landing',
            url: '/docs/agent-skills',
          },
          {
            label: 'Claude Plugin',
            contentSite: 'landing',
            url: '/docs/claude',
          },
          {
            label: 'Cursor Plugin',
            contentSite: 'landing',
            url: '/docs/cursor',
          },
          {
            label: 'Gemini Extension',
            contentSite: 'landing',
            url: '/docs/gemini',
          },
        ],
      },
      {
        label: 'Partner Integrations',
        contentSite: 'cloud-docs',
        group: true,
        items: [
          {
            label: 'Overview',
            contentSite: 'cloud-docs',
            url: '/docs/atlas/partner-integrations',
          },
          {
            label: 'Explore Partner Ecosystem',
            isExternal: true,
            url: 'https://cloud.mongodb.com/ecosystem',
          },
          {
            label: 'Render',
            contentSite: 'cloud-docs',
            url: '/docs/atlas/reference/partner-integrations/render',
          },
          {
            label: 'Vercel',
            contentSite: 'cloud-docs',
            url: '/docs/atlas/reference/partner-integrations/vercel',
          },
          {
            label: 'Azure',
            contentSite: 'cloud-docs',
            url: '/docs/atlas/reference/partner-integrations/azure',
          },
        ],
      },
    ],
  },
];
