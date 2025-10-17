import type { ParentNode } from '@/types/ast';
import ComponentFactory from '@/components/component-factory';

export interface GlossaryProps {
  nodeChildren: ParentNode['children'];
}

const Glossary = ({ nodeChildren, ...rest }: GlossaryProps) => (
  <>
    {nodeChildren.map((node, index) => (
      <ComponentFactory {...rest} nodeData={node} key={index} />
    ))}
  </>
);

export default Glossary;
