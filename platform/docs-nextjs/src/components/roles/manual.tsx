import ComponentFactory from '@/components/component-factory';
import type { RoleManualNode } from '@/types/ast';

const REF_TARGETS = {
  manual: 'https://www.mongodb.com/docs/manual',
};

export type RoleManualProps = {
  nodeChildren: RoleManualNode['children'];
  target: RoleManualNode['target'];
};

const RoleManual = ({ nodeChildren, target }: RoleManualProps) => {
  return (
    <a href={`${REF_TARGETS.manual}${target.replace('/manual', '')}`}>
      {nodeChildren.map((node, i) => (
        <ComponentFactory key={i} nodeData={node} />
      ))}
    </a>
  );
};

export default RoleManual;
