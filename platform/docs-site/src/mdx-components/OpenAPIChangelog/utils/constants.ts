import type { Environments } from '@/utils/env-config';
import { BadgeVariant } from '@via-ds/components/badge';

export const ALL_VERSIONS = 'ALL_VERSIONS';
export const COMPARE_VERSIONS = 'COMPARE_VERSIONS';

export const getDownloadChangelogUrl = (env: Environments) => {
  const branch = env === 'dotcomstg' ? 'qa' : 'main';
  return `https://raw.githubusercontent.com/mongodb/openapi/${branch}/changelog/changelog.json`;
};

export const changeTypeBadges = {
  release: {
    variant: BadgeVariant.Success,
    label: 'Released',
  },
  deprecate: {
    variant: BadgeVariant.Error,
    label: 'Deprecated',
  },
  update: {
    variant: BadgeVariant.Success,
    label: 'Updated',
  },
  removed: {
    variant: BadgeVariant.Error,
    label: 'Removed',
  },
};
