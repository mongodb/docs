import type { TocItem } from '../types';
import mckLegacy from './mck-legacy';
import mckUpcoming from './mck-upcoming';

const tocData: TocItem[] = [
  {
    label: 'MongoDB Controllers for Kubernetes Operator',
    contentSite: 'mck',
    versionDropdown: true,
    group: true,
    versions: { excludes: ['upcoming', 'current', 'v1.9'] },
    items: mckLegacy,
  },
  {
    label: 'MongoDB Controllers for Kubernetes Operator',
    contentSite: 'mck',
    versionDropdown: true,
    group: true,
    versions: { includes: ['upcoming', 'current', 'v1.9'] },
    items: mckUpcoming,
  },
];

export default tocData;
