import AtlasArchData from './L1-data/atlas-architecture-center';
import ClientLibData from './L1-data/client-libraries';
import DeploymentData from './L1-data/deployment';
import DevelopmentData from './L1-data/development';
import GetStarted from './L1-data/get-started';
import ManagementData from './L1-data/management';
import ToolsData from './L1-data/tools';
import VoyageData from './L1-data/voyageai';
import type { L1TocItem } from './types';

// The L1 Items for the Unified Toc
export const toc: L1TocItem[] = [
  {
    label: 'Get Started',
    contentSite: 'landing',
    url: '/docs/get-started',
    items: GetStarted,
    navSection: 'docs',
  },
  {
    label: 'Deployment',
    contentSite: 'landing',
    url: '/docs/deployment',
    items: DeploymentData,
    navSection: 'docs',
  },
  {
    label: 'Development',
    contentSite: 'landing',
    url: '/docs/development',
    subTitle:
      'Includes Database Manual, AI Integration, Streaming Data and Release notes. Select a server version.',
    items: DevelopmentData,
    navSection: 'docs',
  },
  {
    label: 'Management',
    contentSite: 'landing',
    url: '/docs/management',
    subTitle:
      'Includes MongoDB Atlas and Self-Managed Deployments. Select a Self-Managed Deployment version. ',
    items: ManagementData,
    navSection: 'docs',
  },
  {
    label: 'Client Libraries',
    contentSite: 'drivers',
    url: '/docs/drivers/',
    subTitle:
      'Includes compatibility tables and other document database compatibility.',
    items: ClientLibData,
    navSection: 'docs',
  },
  {
    label: 'Tools',
    contentSite: 'landing',
    url: '/docs/tools-and-connectors',
    subTitle: 'Includes MongoDB Partner integrations.',
    items: ToolsData,
    navSection: 'docs',
  },
  {
    label: 'AI Model APIs',
    contentSite: 'voyageai',
    url: '/docs/voyageai/',
    subTitle: 'Use VoyageAI by MongoDB.',
    items: VoyageData,
    navSection: 'voyageai',
  },
  {
    label: 'Atlas Architecture Center',
    contentSite: 'atlas-architecture',
    url: '/docs/atlas/architecture/:version',
    subTitle:
      'Includes well-architected framework, solutions library and partners library.',
    items: AtlasArchData,
    navSection: 'docs',
  },
];
