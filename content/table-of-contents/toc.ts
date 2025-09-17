import AtlasArchData from './L1-data/atlas-architecture-center';
import ToolsData from './L1-data/tools';
import DevelopmentData from './L1-data/development';
import ManagementData from './L1-data/management';
import ClientLibData from './L1-data/client-libraries';
import type { TocItem } from './types';

// These are all the L1's for the ToC
export const toc: TocItem[] = [
  {
    label: 'Get Started',
    contentSite: 'landing',
    url: '/docs/get-started',
  },
  {
    label: 'Development',
    contentSite: 'landing',
    url: '/docs/development',
    items: DevelopmentData,
  },
  {
    label: 'Management',
    contentSite: 'landing',
    url: "/docs/management",
    items: ManagementData,
  },
  {
    label: 'Client Libraries',
    contentSite: 'drivers',
    url: '/docs/drivers/',
    items: ClientLibData,
  },
  {
    label: 'Tools',
    contentSite: "landing",
    url: "/docs/tools-and-connectors",
    items: ToolsData,
  },
  {
    label: 'Atlas Architecture Center',
    contentSite: 'atlas-architecture',
    url: '/docs/atlas/architecture/:version',
    items: AtlasArchData,
  },
];
