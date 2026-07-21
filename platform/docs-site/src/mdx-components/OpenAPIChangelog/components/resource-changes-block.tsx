import styled from '@emotion/styled';
import Badge from '@leafygreen-ui/badge';
import { css, cx } from '@leafygreen-ui/emotion';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import { palette } from '@leafygreen-ui/palette';
import { Link as LGLink, Subtitle } from '@leafygreen-ui/typography';
import { theme } from '@/styles/theme';
import type { AtlasAdminApiChangeDiffEntry, AtlasAdminApiChangeEntry, AtlasAdminApiPathEntry } from '@/types/openapi';
import { useSnootyMetadata } from '@/utils/use-snooty-metadata';

import { changeTypeBadges } from '../utils/constants';
import getResourceLinkUrl from '../utils/get-resource-link-url';
import Change, { Flex } from './change';
import { useVersionContext } from '@/context/version-context';

const Wrapper = styled.div`
  width: 100%;
  margin: 22px 0;
`;

const ResourceHeader = styled(Subtitle)`
  color: var(--color);
  word-break: break-all;
`;

const FlexLinkWrapper = styled(Flex)`
  @media ${theme.screenSize.upToMedium} {
    flex-direction: column;
    align-items: start;
  }
`;

const ChangeListUL = styled.ul`
  margin: 0;
  list-style-position: start;
`;

type ResourceChangeProps =
  | (AtlasAdminApiPathEntry & { changes?: never })
  | (AtlasAdminApiChangeDiffEntry & { versions?: never });

const ResourceChangesBlock = ({ path, httpMethod, operationId, tag, changes, versions }: ResourceChangeProps) => {
  const { openapi_pages } = useSnootyMetadata();
  const { darkMode } = useDarkMode();
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
    <Wrapper data-testid="resource-changes-block">
      <FlexLinkWrapper>
        <LGLink href={resourceLinkUrl} hideExternalIcon>
          <ResourceHeader style={{ '--color': darkMode ? palette.blue.light1 : palette.blue.base }}>
            {httpMethod} {path}
          </ResourceHeader>
        </LGLink>
        {changeTypeBadge && (
          <Badge
            className={cx(
              css`
                margin-top: 2px;
              `,
            )}
            variant={changeTypeBadge.variant}
          >
            {changeTypeBadge.label}
          </Badge>
        )}
      </FlexLinkWrapper>
      <ChangeListUL>
        {publicResourceChanges.map((change, i) => (
          <Change key={`change-${i}`} {...change} />
        ))}
      </ChangeListUL>
    </Wrapper>
  );
};

export default ResourceChangesBlock;
