import type { AtlasAdminApiChangelogDiff, AtlasAdminApiChangelogType } from '@/types/openapi';

import ReleaseDateBlock from './release-date-block';
import ResourceChangesBlock from './resource-changes-block';
import { COMPARE_VERSIONS } from '../utils/constants';
import styles from '../openapi-changelog.module.scss';

type ChangeListProps = {
  versionMode: string;
  changelog: AtlasAdminApiChangelogType;
  diff: AtlasAdminApiChangelogDiff;
};

const ChangeList = ({ versionMode, changelog, diff }: ChangeListProps) => (
  <div className={styles.changeList}>
    {versionMode === COMPARE_VERSIONS ? (
      <>
        {diff.map((data, i) => (
          <ResourceChangesBlock key={`change-list-${i}`} {...data} />
        ))}
      </>
    ) : (
      <>
        {changelog.map((data, i) => (
          <ReleaseDateBlock key={`change-list-${i}`} {...data} />
        ))}
      </>
    )}
  </div>
);

export default ChangeList;
