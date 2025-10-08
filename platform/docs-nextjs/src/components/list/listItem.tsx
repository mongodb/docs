import { cx, css } from '@leafygreen-ui/emotion';
import ComponentFactory from '../component-factory';
import type { ParentNode } from '@/types/ast';

const listParagraphStyles = css`
  ::marker {
    color: var(--font-color-primary);
  }
  & > p {
    margin-bottom: 8px;
  }
`;

export type ListItemProps = {
  nodeChildren: ParentNode['children'];
};

const ListItem = ({ nodeChildren, ...rest }: ListItemProps) => {
  return (
    <li className={cx(listParagraphStyles)}>
      {nodeChildren.map((element, index) => (
        <ComponentFactory {...rest} nodeData={element} key={index} skipPTag={false} />
      ))}
    </li>
  );
};

export default ListItem;
