'use client';

import ComponentFactory from '@/components/component-factory';
import Link from '@/components/link';
import type { LinkNewTabNode } from '@/types/ast';

export type LinkNewTabProps = {
  nodeChildren: LinkNewTabNode['children'];
  target: LinkNewTabNode['target'];
};

const LinkNewTab = ({ nodeChildren, target }: LinkNewTabProps) => (
  <Link to={target} openInNewTab={true}>
    {nodeChildren.map((node, i) => (
      <ComponentFactory key={i} nodeData={node} />
    ))}
  </Link>
);

export default LinkNewTab;
