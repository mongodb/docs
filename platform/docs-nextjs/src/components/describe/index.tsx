import type { Directive } from '@/types/ast';
import ComponentFactory from '../component-factory';
import { css, cx } from '@leafygreen-ui/emotion';

export type DescribeProps = {
  argument: Directive['argument'];
  nodeChildren: Directive['children'];
};

const codeStyle = css`
  font-weight: 400;
`;

const Describe = ({ nodeChildren, argument, ...rest }: DescribeProps) => (
  <dl>
    <dt>
      <code className={cx(codeStyle)}>
        {argument.map((arg, i) => (
          <ComponentFactory {...rest} key={i} nodeData={arg} />
        ))}
      </code>
    </dt>
    <dd>
      {nodeChildren.map((child, i) => (
        <ComponentFactory {...rest} key={i} nodeData={child} />
      ))}
    </dd>
  </dl>
);

export default Describe;
