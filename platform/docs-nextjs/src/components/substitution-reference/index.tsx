import type { SubstitutionReferenceNode } from '@/types/ast';
import ComponentFactory from '../component-factory';

export type SubstitutionReferenceProps = {
  nodeChildren: SubstitutionReferenceNode['children'];
  name: string;
};

const SubstitutionReference = ({ nodeChildren, name, ...rest }: SubstitutionReferenceProps) => (
  <>
    {nodeChildren
      ? nodeChildren.map((child, index) => <ComponentFactory {...rest} key={index} nodeData={child} />)
      : name}
  </>
);

export default SubstitutionReference;
