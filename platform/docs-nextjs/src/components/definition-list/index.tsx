import type { DefinitionListNode } from '@/types/ast';
import ComponentFactory from '@/components/component-factory';

export type DefinitionListProps = {
  nodeChildren: DefinitionListNode['children'];
};

const DefinitionList = ({ nodeChildren, ...rest }: DefinitionListProps) => {
  return (
    <dl>
      {nodeChildren.map((definition, index) => (
        <ComponentFactory {...rest} nodeData={definition} key={index} />
      ))}
    </dl>
  );
};

export default DefinitionList;
