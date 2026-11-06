import { format } from 'date-fns';
import { Text, TextStyle } from '@via-ds/components/typography';
import type { AtlasAdminApiChangeDateEntry } from '@/types/openapi';

import ResourceChangesBlock from './resource-changes-block';
import styles from '../openapi-changelog.module.scss';

const ReleaseDateBlock = ({ date: releaseDate, paths }: AtlasAdminApiChangeDateEntry) => {
  const formattedReleaseDate = format(new Date(releaseDate.replace(/-/g, '/')), 'dd MMMM y');

  return (
    <section className={styles.section}>
      <Text elementType="h2" textStyle={TextStyle.heading3}>{`${formattedReleaseDate} Release`}</Text>
      {paths.map((path, i) => (
        <ResourceChangesBlock key={`resource-${i}`} {...path} />
      ))}
    </section>
  );
};

export default ReleaseDateBlock;
