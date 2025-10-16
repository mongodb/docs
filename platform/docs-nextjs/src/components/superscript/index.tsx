import type { ASTNode } from '@/types/ast';
import ComponentFactory from '../component-factory';

interface SuperscriptProps {
  nodeChildren: ASTNode[];
}

const Superscript = ({ nodeChildren, ...rest }: SuperscriptProps) => (
  <sup>
    {nodeChildren.map((child, index) => (
      <ComponentFactory {...rest} key={index} nodeData={child} />
    ))}
  </sup>
);

export default Superscript;
