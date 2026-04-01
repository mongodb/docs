import AtlasArchData from './L1-data/atlas-architecture-center';
import ClientLibData from './L1-data/client-libraries';
import DevelopmentData from './L1-data/development';
import GetStarted from './L1-data/get-started';
import ManagementData from './L1-data/management';
import ToolsData from './L1-data/tools';
import VoyageData from './L1-data/voyageai';
import type { L1TocItem } from './types';

// The L1 items for the Unified ToC 
export const toc: L1TocItem[] = [
  {
    label: 'Get Started',
    contentSite: 'landing',
    url: '/docs/get-started',
    items: GetStarted,
  },
  {
    label: 'Development',
    contentSite: 'landing',
    url: '/docs/development',
    subTitle:
      'Includes Database Manual, AI Integration, Streaming Data and Release notes. Select a server version.',
    items: DevelopmentData,
  },
  {
    label: 'Management',
    contentSite: 'landing',
    url: '/docs/management',
    subTitle:
      'Includes MongoDB Atlas and Self-Managed Deployments. Select a Self-Managed Deployment version. ',
    items: ManagementData,
  },
  {
    label: 'Client Libraries',
    contentSite: 'drivers',
    url: '/docs/drivers/',
    subTitle:
      'Includes compatibility tables and other document database compatibility.',
    items: ClientLibData,
  },
  {
    label: 'Tools',
    contentSite: 'landing',
    url: '/docs/tools-and-connectors',
    subTitle: 'Includes MongoDB Partner integrations.',
    items: ToolsData,
  },
  {
    label: 'AI Models',
    contentSite: 'voyageai',
    url: '/docs/voyageai/',
    subTitle: 'Use VoyageAI by MongoDB.',
    items: VoyageData,
  },
  {
    label: 'Atlas Architecture Center',
    contentSite: 'atlas-architecture',
    url: '/docs/atlas/architecture/:version',
    subTitle:
      'Includes well-architected framework, solutions library and partners library.',
    items: AtlasArchData,
  },
];
