'use client';

import { theme } from '@/styles/theme';
import styled from '@emotion/styled';

const HeaderBuffer = styled.div`
  display: inline;
  margin-top: -${theme.header.navbarScrollOffset};
  position: absolute;
  // Add a bit of padding to help headings be more accurately set as "active" on FF and Safari
  padding-bottom: 2px;
`;

export type DefinitionListItemProps = {
  children?: React.ReactNode;
  targetId?: string;
};

export const DefinitionListItem = ({ targetId, children }: DefinitionListItemProps) => {
  return (
    <>
      {targetId && <HeaderBuffer id={targetId} />}
      {children}
    </>
  );
};
