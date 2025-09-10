import type { ASTNode } from '@/types/ast';
import ComponentFactory from '../component-factory';

interface SubscriptProps {
  nodeChildren: ASTNode[];
}

const Subscript = ({ nodeChildren, ...rest }: SubscriptProps) => (
  <sub>
    {nodeChildren.map((child, index) => (
      <ComponentFactory key={index} nodeData={child} {...rest} />
    ))}
  </sub>
);

export default Subscript;
