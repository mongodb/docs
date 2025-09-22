'use client';

import { css, cx } from '@leafygreen-ui/emotion';
import { InlineKeyCode } from '@leafygreen-ui/typography';
import ComponentFactory from '@/components/component-factory';
import type { ParentNode } from '@/types/ast';

export type KbdProps = {
  nodeChildren: ParentNode['children'];
};

const darkModeOverwriteStyling = css`
  color: var(--font-color-primary);
  background-color: var(--background-color-primary);
`;

const Kbd = ({ nodeChildren }: KbdProps) => (
  <InlineKeyCode className={cx(darkModeOverwriteStyling)}>
    {nodeChildren.map((node, i) => (
      <ComponentFactory key={i} nodeData={node} />
    ))}
  </InlineKeyCode>
);

export default Kbd;
