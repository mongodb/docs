import type { ASTNode } from '@/types/ast';
import { css, cx } from '@leafygreen-ui/emotion';
import ComponentFactory from '../component-factory';

const rubricStyle = css`
  font-weight: 700;
`;

export type RubricProps = {
  argument: ASTNode[];
};

const Rubric = ({ argument, ...rest }: RubricProps) => (
  <p className={cx(rubricStyle)}>
    {argument.map((node, i) => (
      <ComponentFactory {...rest} key={i} nodeData={node} />
    ))}
  </p>
);

export default Rubric;
