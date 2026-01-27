import type { ASTNode } from '@/types/ast';
import ComponentFactory from '../component-factory';

export type LineBlockProps = {
  children?: React.ReactNode;
  nodeChildren?: ASTNode[];
};

const LineBlock = ({ children, nodeChildren, ...rest }: LineBlockProps) => (
  <div className="line-block">
    {children ?? nodeChildren?.map((child, index) => <ComponentFactory {...rest} key={index} nodeData={child} />)}
  </div>
);

export default LineBlock;
