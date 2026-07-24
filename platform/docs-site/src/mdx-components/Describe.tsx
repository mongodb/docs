import { css, cx } from '@leafygreen-ui/emotion';

export type DescribeProps = {
  children: React.ReactNode;
  term: string;
};

const codeStyle = css`
  font-weight: 400;
`;

export const Describe = ({ term, children }: DescribeProps) => (
  <dl>
    <dt>
      <code className={cx(codeStyle)}>{term}</code>
    </dt>
    <dd>{children}</dd>
  </dl>
);
