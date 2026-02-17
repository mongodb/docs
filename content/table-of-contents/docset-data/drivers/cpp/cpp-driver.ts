import type { TocItem } from '../../../types';
import docsVersions from '../../../version-arrays/drivers/cpp-versions';

import cpp_updated from '../versions/cpp-updated';
import cpp_v3_10 from '../versions/cpp-v3.10';
import cpp_v3_11 from '../versions/cpp-v3.11';

const updatedVersions = docsVersions.after('v4.0', { inclusive: true });

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
    versions: { includes: ['v3.11'] },
    items: cpp_v3_11,
  },
  {
    label: 'C++ Driver',
    contentSite: 'cpp-driver',
    group: true,
    versionDropdown: true,
    versions: { includes: ['v3.10'] },
    items: cpp_v3_10,
  },
];

export default tocData;
