import type { ASTNode } from '@/types/ast';
import ComponentFactory from '../component-factory';

export type IncludeProps = {
  nodeChildren: ASTNode[];
};

const Include = ({ nodeChildren, ...rest }: IncludeProps) =>
  nodeChildren.map((child, i) => <ComponentFactory {...rest} key={i} nodeData={child} />);

export default Include;
