import type { TocItem } from '@/components/unified-sidenav/types';

import { tocData as tocDataArray } from './data.copied';

export const tocData = tocDataArray as unknown as TocItem[];
