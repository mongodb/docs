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
  children?: React.ReactNode;
  nodeChildren?: ParentNode['children'];
};

const ListItem = ({ children, nodeChildren, ...rest }: ListItemProps) => {
  return (
    <li className={cx(listParagraphStyles)}>
      {children ??
        nodeChildren?.map((element, index) => (
          <ComponentFactory {...rest} nodeData={element} key={index} skipPTag={false} />
        ))}
    </li>
  );
};

export default ListItem;
