import { cache } from 'react';
import { docsets } from 'versioning';
import type { Docset } from '@/types/data';

/**
 * The docset catalog, formerly an Atlas aggregation over `pool.docsets` and
 * `pool.repos_branches`. It is now a plain import from `platform/versioning`,
 * so this is synchronous data behind an async signature — the signature is
 * kept so callers (server components, route handlers) need not change.
 */
export const getAllDocsetsWithVersions = async (): Promise<Docset[]> => docsets;

export const getAllDocsetsWithVersionsCached = cache(getAllDocsetsWithVersions);

/** Looks up one docset by Snooty project name. */
export const getDocsetByProject = async (project: string): Promise<Docset | undefined> =>
  docsets.find((docset) => docset.project === project);
