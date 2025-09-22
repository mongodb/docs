import ComponentFactory from '@/components/component-factory';
import type { ClassRoleNode } from '@/types/ast';

export type RoleClassProps = {
  nodeChildren: ClassRoleNode['children'];
  target: ClassRoleNode['target'];
};

const RoleClass = ({ nodeChildren, target }: RoleClassProps) => (
  <a href={`${target}`}>
    {nodeChildren.map((node, i) => (
      <ComponentFactory key={i} nodeData={node} />
    ))}
  </a>
);

export default RoleClass;
