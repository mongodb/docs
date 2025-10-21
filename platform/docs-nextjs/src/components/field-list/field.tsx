'use client';

import { css } from '@leafygreen-ui/emotion';
import { theme } from '@/styles/theme';
import type { FieldNode } from '@/types/ast';
import ComponentFactory from '@/components/component-factory';

export type FieldProps = {
  nodeChildren: FieldNode['children'];
  label: FieldNode['label'];
  name: FieldNode['name'];
};

const Field = ({ nodeChildren, label, name, ...rest }: FieldProps) => (
  <tr
    className={css`
      font-size: ${theme.fontSize.default};
      > th,
      > td {
        padding: 11px 5px 12px;
        text-align: left;
      }
    `}
  >
    <th>{label || name}:</th>
    <td>
      {nodeChildren.map((element, index) => (
        <ComponentFactory {...rest} nodeData={element} key={index} parentNode={index === 0 ? 'field' : undefined} />
      ))}
    </td>
  </tr>
);

export default Field;
