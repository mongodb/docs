'use client';

import { css, cx } from '@leafygreen-ui/emotion';
import { palette } from '@leafygreen-ui/palette';
import ComponentFactory from '@/components/component-factory';
import type { ParentNode } from '@/types/ast';

export type RedProps = {
  nodeChildren: ParentNode['children'];
};

const redStyles = css`
  color: ${palette.red.dark2};

  .dark-theme & {
    color: ${palette.red.light1};
  }
`;

const Red = ({ nodeChildren }: RedProps) => (
  <strong className={cx(redStyles)}>
    {nodeChildren.map((node, i) => (
      <ComponentFactory key={i} nodeData={node} />
    ))}
  </strong>
);

export default Red;
