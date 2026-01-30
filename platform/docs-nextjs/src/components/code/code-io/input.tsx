import ComponentFactory from '@/components/component-factory';
import type { ASTNode } from '@/types/ast';

type InputProps = {
  nodeChildren: ASTNode[];
};

const Input = ({ nodeChildren }: InputProps) => {
  return nodeChildren.map((child, i) => <ComponentFactory key={i} nodeData={child} />);
};

export default Input;
