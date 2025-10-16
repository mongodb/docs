import type { ASTNode } from '@/types/ast';
import ComponentFactory from '../component-factory';

export type LineBlockProps = {
  nodeChildren: ASTNode[];
};

const LineBlock = ({ nodeChildren, ...rest }: LineBlockProps) => (
  <div className="line-block">
    {nodeChildren.map((child, index) => (
      <ComponentFactory {...rest} key={index} nodeData={child} />
    ))}
  </div>
);

export default LineBlock;
