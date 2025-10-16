import type { Directive } from '@/types/ast';
import ComponentFactory from '../component-factory';
import { getNestedValue } from '@/utils/get-nested-value';

// For now, explicitly define the arguments that should be accepted for Gatsby to build the node
const VALID_COND_ARGS = ['html', '(not man)', 'cloud'];

export type CondProps = {
  nodeData: Directive;
};

const Cond = ({ nodeData, ...rest }: CondProps) => {
  const rawArgument = getNestedValue(['argument', 0, 'value'], nodeData);
  const argument = typeof rawArgument === 'string' ? rawArgument : undefined;

  if (!!argument && VALID_COND_ARGS.includes(argument)) {
    return nodeData.children.map((child, index) => <ComponentFactory {...rest} nodeData={child} key={index} />);
  }
  return null;
};

export default Cond;
