import type { AtlasAdminApiChangelogDiff } from '@/types/openapi';

const getDiffResourcesList = (diff: AtlasAdminApiChangelogDiff) => {
  const resourcesList = new Set<string>();
  diff.forEach(({ httpMethod, path }) => resourcesList.add(`${httpMethod} ${path}`));

  return Array.from(resourcesList);
};

export default getDiffResourcesList;
