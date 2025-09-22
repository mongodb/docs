import { css, cx } from '@leafygreen-ui/emotion';
import { palette } from '@leafygreen-ui/palette';
import ComponentFactory from '@/components/component-factory';
import type { ParentNode } from '@/types/ast';

const goldStyles = css`
  color: ${palette.yellow.dark2};

  .dark-theme & {
    color: ${palette.yellow.light2};
  }
`;

export type GoldProps = {
  nodeChildren: ParentNode['children'];
};

const Gold = ({ nodeChildren }: GoldProps) => (
  <strong className={cx(goldStyles)}>
    {nodeChildren.map((node, i) => (
      <ComponentFactory key={i} nodeData={node} />
    ))}
  </strong>
);

export default Gold;
