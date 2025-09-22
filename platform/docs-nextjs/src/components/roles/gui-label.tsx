import { cx, css } from '@leafygreen-ui/emotion';
import ComponentFactory from '@/components/component-factory';
import type { ParentNode } from '@/types/ast';

const guiLabelStyle = css`
  font-style: normal;
  font-weight: 700;
`;

export type RoleGUILabelProps = {
  nodeChildren: ParentNode['children'];
};

const RoleGUILabel = ({ nodeChildren }: RoleGUILabelProps) => (
  // Keep "guilabel" className for styling when this component is inside of a Heading.
  <span className={cx('guilabel', guiLabelStyle)}>
    {nodeChildren.map((node, i) => (
      <ComponentFactory key={i} nodeData={node} />
    ))}
  </span>
);

export default RoleGUILabel;
