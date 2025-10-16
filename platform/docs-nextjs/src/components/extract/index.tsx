import type { ASTNode } from '@/types/ast';
import ComponentFactory from '../component-factory';

export type ExtractProps = {
  nodeChildren: ASTNode[];
};

const Extract = ({ nodeChildren, ...rest }: ExtractProps) =>
  nodeChildren.map((child, i) => <ComponentFactory {...rest} key={i} nodeData={child} />);

export default Extract;
