import { TocItem } from "@/components/unified-sidenav/types";

// Absolute basic L1s as fallback for development
let tocData: TocItem[] = [
  {
    label: 'Get Started',
    contentSite: 'landing',
    url: '/docs/get-started',
  },
  {
    label: 'Development',
    contentSite: 'landing',
    url: '/docs/development',
  },
  {
    label: 'Management',
    contentSite: 'landing',
    url: '/docs/management',
  },
  {
    label: 'Client Libraries',
    contentSite: 'drivers',
    url: '/docs/drivers/',
  },
  {
    label: 'Tools',
    contentSite: 'landing',
    url: '/docs/tools-and-connectors',
  },
  {
    label: 'Atlas Architecture Center',
    contentSite: 'atlas-architecture',
    url: '/docs/atlas/architecture/:version',
  },
];

try {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  tocData = require('@/context/toc-data/data.copied').tocData;
} catch {
  console.warn('Using stub tocData — copied unified toc data is missing.');
}

export { tocData };