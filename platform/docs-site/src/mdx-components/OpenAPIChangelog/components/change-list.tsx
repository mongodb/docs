import styled from '@emotion/styled';
import type { AtlasAdminApiChangelogDiff, AtlasAdminApiChangelogType } from '@/types/openapi';

import ReleaseDateBlock from './release-date-block';
import ResourceChangesBlock from './resource-changes-block';
import { COMPARE_VERSIONS } from '../utils/constants';

const Wrapper = styled.div`
  width: 100%;
  margin-top: 32px;
`;

type ChangeListProps = {
  versionMode: string;
  changelog: AtlasAdminApiChangelogType;
  diff: AtlasAdminApiChangelogDiff;
};

const ChangeList = ({ versionMode, changelog, diff }: ChangeListProps) => (
  <Wrapper>
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
  </Wrapper>
);

export default ChangeList;
