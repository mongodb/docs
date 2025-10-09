import type { ASTNode } from '@/types/ast';
import ComponentFactory from '../component-factory';

export type LineProps = {
  nodeChildren: ASTNode[];
};

const Line = ({ nodeChildren, ...rest }: LineProps) => {
  if (nodeChildren.length !== 0) {
    return (
      <div className="line">
        {nodeChildren.map((child, index) => (
          <ComponentFactory key={index} nodeData={child} {...rest} />
        ))}
      </div>
    );
  }
  return (
    <div className="line">
      <br />
    </div>
  );
};

export default Line;
