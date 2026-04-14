import type { TocItem } from '@/components/unified-sidenav/types';
import { toc as offlineTocRaw } from './offline-toc-selected';
import { applyVersionToToc } from '@/utils/apply-version-to-toc';

// NEXT_PUBLIC_ vars are baked in at build time by Next.js — this runs once at module load.
const version = process.env.NEXT_PUBLIC_STATIC_BUILD_VERSION ?? 'main';
export const toc: TocItem[] = version !== 'main' ? applyVersionToToc(offlineTocRaw, version) : offlineTocRaw;
