'use client';

import styled from '@emotion/styled';
import { theme } from '@/styles/theme';

const Table = styled('table')`
  border-spacing: 0;
  font-size: ${theme.fontSize.small};
  line-height: ${theme.size.medium};
  margin: ${theme.size.medium} 0;
  max-width: 100%;

  tbody {
    vertical-align: top;
  }
`;

type FieldListProps = {
  children: React.ReactNode;
};

export const FieldList = ({ children }: FieldListProps) => (
  <Table>
    <colgroup>
      <col className="field-name" />
      <col className="field-body" />
    </colgroup>
    <tbody>{children}</tbody>
  </Table>
);
