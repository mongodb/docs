import { Badge } from '@via-ds/components/badge';
import { Text, TextStyle } from '@via-ds/components/typography';
import { Link } from '@/mdx-components/Link';
import type { AtlasAdminApiChangeDiffEntry, AtlasAdminApiChangeEntry, AtlasAdminApiPathEntry } from '@/types/openapi';
import { useSnootyMetadata } from '@/utils/use-snooty-metadata';

import { changeTypeBadges } from '../utils/constants';
import getResourceLinkUrl from '../utils/get-resource-link-url';
import Change from './change';
import { useVersionContext } from '@/context/version-context';
import styles from '../openapi-changelog.module.scss';

type ResourceChangeProps =
  | (AtlasAdminApiPathEntry & { changes?: never })
  | (AtlasAdminApiChangeDiffEntry & { versions?: never });

const ResourceChangesBlock = ({ path, httpMethod, operationId, tag, changes, versions }: ResourceChangeProps) => {
  const { openapi_pages } = useSnootyMetadata();
  const { siteBasePrefix } = useVersionContext();
  const resourceLinkUrl = getResourceLinkUrl({ siteBasePrefix, tag, operationId, openapi_pages });

  const allResourceChanges =
    changes || versions.map((version) => (version.changes ? version.changes.map((change) => change) : null)).flat();
  /* Filter out all null changes or non-public-facing changes */
  const publicResourceChanges = allResourceChanges.filter(
    (c) => c && c.changeCode !== 'operation-id-changed' && c.changeCode !== 'operation-tag-changed',
  ) as AtlasAdminApiChangeEntry[];
  const changeTypeBadge = versions?.[0]?.changeType ? changeTypeBadges[versions[0].changeType] : null;

  return (
    <div className={styles.resourceBlock} data-testid="resource-changes-block">
      <div className={styles.resourceHeader}>
        <Link to={resourceLinkUrl} hideExternalIcon>
          <Text elementType="span" textStyle={TextStyle.heading4} className={styles.resourcePath}>
            {httpMethod} {path}
          </Text>
        </Link>
        {changeTypeBadge && <Badge variant={changeTypeBadge.variant}>{changeTypeBadge.label}</Badge>}
      </div>
      <ul className={styles.changes}>
        {publicResourceChanges.map((change, i) => (
          <Change key={`change-${i}`} {...change} />
        ))}
      </ul>
    </div>
  );
};

export default ResourceChangesBlock;
