import ComponentFactory from '@/components/component-factory';
import type { ParentNode } from '@/types/ast';

export type RoleCommandProps = {
  nodeChildren: ParentNode['children'];
};

const RoleCommand = ({ nodeChildren }: RoleCommandProps) => (
  <strong>
    {nodeChildren.map((child, i) => (
      <ComponentFactory key={i} nodeData={child} />
    ))}
  </strong>
);

export default RoleCommand;
