import { ASTNode } from "@/types/ast";
import ComponentFactory from "../component-factory";

interface SuperscriptProps {
  nodeChildren: ASTNode[];
}

const Superscript = ({ nodeChildren, ...rest }: SuperscriptProps) => (
  <sup>
    {nodeChildren.map((child, index) => (
      <ComponentFactory key={index} nodeData={child} {...rest} />
    ))}
  </sup>
);

export default Superscript;
