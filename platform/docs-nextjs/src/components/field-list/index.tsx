'use client';

import { theme } from '@/styles/theme';
import type { FieldListNode } from '@/types/ast';
import styled from '@emotion/styled';
import ComponentFactory from '@/components/component-factory';

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

export type FieldListProps = {
  nodeChildren: FieldListNode['children'];
};

const FieldList = ({ nodeChildren, ...rest }: FieldListProps) => (
  <Table>
    <colgroup>
      <col className="field-name" />
      <col className="field-body" />
    </colgroup>
    <tbody>
      {nodeChildren.map((element, index) => (
        <ComponentFactory {...rest} nodeData={element} key={index} />
      ))}
    </tbody>
  </Table>
);

export default FieldList;
