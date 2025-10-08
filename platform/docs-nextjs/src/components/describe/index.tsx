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
          <ComponentFactory key={i} nodeData={arg} {...rest} />
        ))}
      </code>
    </dt>
    <dd>
      {nodeChildren.map((child, i) => (
        <ComponentFactory key={i} nodeData={child} {...rest} />
      ))}
    </dd>
  </dl>
);

export default Describe;
