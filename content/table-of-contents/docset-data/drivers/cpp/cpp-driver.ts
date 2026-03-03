import type { TocItem } from '../../../types';
import docsVersions from '../../../version-arrays/drivers/cpp-versions';

import cpp_updated from '../versions/cpp-updated';
import cpp_v3x from '../versions/cpp-v3.x';

const updatedVersions = docsVersions.after('v4.x', { inclusive: true });

const tocData: TocItem[] = [
  {
    label: 'C++ Driver',
    contentSite: 'cpp-driver',
    group: true,
    versionDropdown: true,
    versions: { includes: updatedVersions },
    items: cpp_updated,
  },
  {
    label: 'C++ Driver',
    contentSite: 'cpp-driver',
    group: true,
    versionDropdown: true,
    versions: { includes: ['v3.x'] },
    items: cpp_v3x,
  },
];

export default tocData;
