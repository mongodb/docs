import type { ASTNode } from '@/types/ast';
import ComponentFactory from '../component-factory';

interface SubscriptProps {
  nodeChildren: ASTNode[];
}

const Subscript = ({ nodeChildren, ...rest }: SubscriptProps) => (
  <sub>
    {nodeChildren.map((child, index) => (
      <ComponentFactory {...rest} key={index} nodeData={child} />
    ))}
  </sub>
);

export default Subscript;
