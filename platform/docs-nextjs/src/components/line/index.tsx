import type { ASTNode } from '@/types/ast';
import ComponentFactory from '../component-factory';

export type LineProps = {
  children?: React.ReactNode;
  nodeChildren?: ASTNode[];
};

const Line = ({ children, nodeChildren, ...rest }: LineProps) => {
  if (children) {
    return <div className="line">{children}</div>;
  }

  if (nodeChildren && nodeChildren.length !== 0) {
    return (
      <div className="line">
        {nodeChildren.map((child, index) => (
          <ComponentFactory {...rest} key={index} nodeData={child} />
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
