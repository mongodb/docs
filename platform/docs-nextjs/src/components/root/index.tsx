import type { Root as RootNode } from '@/types/ast';
import ComponentFactory from '../component-factory';

export type RootProps = {
  nodeChildren: RootNode['children'];
};

const Root = ({ nodeChildren, ...rest }: RootProps) =>
  nodeChildren.map((child, i) => <ComponentFactory {...rest} key={i} nodeData={child} />);

export default Root;
