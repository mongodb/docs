'use client';

import { css } from '@leafygreen-ui/emotion';
import { theme } from '@/styles/theme';

type FieldProps = {
  children: React.ReactNode;
  label?: string;
  name?: string;
};

export const Field = ({ children, label = '', name = '' }: FieldProps) => (
  <tr
    className={css`
      font-size: ${theme.fontSize.default};
      > th,
      > td {
        padding: 11px 5px 12px;
        text-align: left;
        vertical-align: baseline;
      }
    `}
  >
    <th>{label || name}:</th>
    <td>{children}</td>
  </tr>
);
