import AtlasArchData from './L1-data/atlas-architecture-center';
import ClientLibData from './L1-data/client-libraries';
import DevelopmentData from './L1-data/development';
import ManagementData from './L1-data/management';
import ToolsData from './L1-data/tools';
import type { L1TocItem } from './types';

// These are the L1 items for the Unified ToC
export const toc: L1TocItem[] = [
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
    url: '/docs/management',
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
    contentSite: 'landing',
    url: '/docs/tools-and-connectors',
    items: ToolsData,
  },
  {
    label: 'Atlas Architecture Center',
    contentSite: 'atlas-architecture',
    url: '/docs/atlas/architecture/:version',
    items: AtlasArchData,
  },
];
