import ComponentFactory from '@/components/component-factory';
import type { ParentNode } from '@/types/ast';

export type RoleFileProps = {
  nodeChildren: ParentNode['children'];
};

const RoleFile = ({ nodeChildren }: RoleFileProps) => (
  <code className="file docutils literal">
    <span className="pre">
      {nodeChildren.map((node, i) => (
        <ComponentFactory key={i} nodeData={node} />
      ))}
    </span>
  </code>
);

export default RoleFile;
