import AtlasArchData from './data/atlas-architecture';
import CloudDocsData from './data/cloud-docs';
import CloudMangerData from './data/cloud-manager';
import ToolsData from './data/database-tools';
import ManualData from './data/server-manual';
import ClientLibData from './L2-data/client-libraries';
import PricingData from './L2-data/pricing';
import type { TocItem } from './types';

// These are all the L1's for the ToC
export const toc: TocItem[] = [
  {
    label: 'Get Started',
    contentSite: 'cloud-docs',
    url: '/docs/atlas/',
    items: CloudDocsData,
  },
  {
    label: 'Development',
    contentSite: 'docs',
    url: '/docs/manual',
    items: ManualData,
  },
  {
    label: 'Management',
    contentSite: 'cloud-manager',
    url: '/docs/cloud-manager/',
    items: CloudMangerData,
  },
  {
    label: 'Client Libraries',
    contentSite: 'drivers',
    url: '/docs/drivers/',
    items: ClientLibData,
  },
  {
    label: 'Tools',
    contentSite: 'database-tools',
    url: '/docs/database-tools',
    items: ToolsData,
  },
  {
    label: 'Plans and Pricing',
    contentSite: 'docs',
    url: '/docs/:version',
    items: PricingData,
  },
  {
    label: 'Atlas Architecture Center',
    contentSite: 'atlas-architecture',
    url: '/docs/atlas/architecture/:version',
    items: AtlasArchData,
  },
];
