import type { ReferenceNode } from '@/types/ast';
import LinkComponent from '@/components/link';
import ComponentFactory from '@/components/component-factory';

export type ReferenceProps = {
  nodeChildren: ReferenceNode['children'];
  refuri: ReferenceNode['refuri'];
};

const Reference = ({ nodeChildren, refuri, ...rest }: ReferenceProps) => {
  return (
    <LinkComponent to={refuri} {...rest}>
      {nodeChildren.map((element, index) => (
        <ComponentFactory key={index} nodeData={element} />
      ))}
    </LinkComponent>
  );
};

export default Reference;
