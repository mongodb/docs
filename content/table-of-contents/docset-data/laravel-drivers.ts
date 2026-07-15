import type { TocItem } from '../types';
import docsVersions from '../version-arrays/drivers/laravel-versions';
import laravel_current from './drivers/versions/laravel-current';
import laravel_v4x from './drivers/versions/laravel-v4.x';

const updatedVersions = docsVersions.after('v4.x', { inclusive: false });

const tocData: TocItem[] = [
  {
    label: 'Laravel MongoDB',
    contentSite: 'laravel',
    group: true,
    versionDropdown: true,
    versions: { includes: updatedVersions },
    items: laravel_current,
  },
  {
    label: 'Laravel MongoDB',
    contentSite: 'laravel',
    group: true,
    versionDropdown: true,
    versions: { includes: ['v4.x'] },
    items: laravel_v4x,
  },
];

export default tocData;
