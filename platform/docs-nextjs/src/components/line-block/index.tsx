import type { ASTNode } from '@/types/ast';
import ComponentFactory from '../component-factory';

export type LineBlockProps = {
  nodeChildren: ASTNode[];
};

const LineBlock = ({ nodeChildren, ...rest }: LineBlockProps) => (
  <div className="line-block">
    {nodeChildren.map((child, index) => (
      <ComponentFactory key={index} nodeData={child} {...rest} />
    ))}
  </div>
);

export default LineBlock;
