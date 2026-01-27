import { css, cx } from '@leafygreen-ui/emotion';
import ComponentFactory from '../component-factory';
import type { ListNode, ParentNode } from '@/types/ast';

const enumtypeMap = {
  arabic: '1',
  loweralpha: 'a',
  upperalpha: 'A',
  lowerroman: 'i',
  upperroman: 'I',
} as const;

const listStyles = css`
  margin-top: 0px;
`;

export type ListProps = {
  children?: React.ReactNode;
  nodeChildren?: ParentNode['children'];
  enumtype?: ListNode['enumtype'];
  startat?: ListNode['startat'];
};

const List = ({ children, nodeChildren, enumtype, startat, ...rest }: ListProps) => {
  // We can default to ordered if the enumtype value is not unordered
  const ListTag = enumtype === 'unordered' ? 'ul' : 'ol';

  const typeAttr = enumtype && enumtype in enumtypeMap ? enumtypeMap[enumtype as keyof typeof enumtypeMap] : undefined;
  const startAttr = startat ?? undefined;

  return (
    <ListTag
      className={cx(listStyles)}
      {...(typeAttr ? { type: typeAttr } : {})}
      {...(startAttr ? { start: startAttr } : {})}
    >
      {children ??
        nodeChildren?.map((listChild, index) => (
          <ComponentFactory {...rest} nodeData={listChild} key={`list-component-${index}`} />
        ))}
    </ListTag>
  );
};

export default List;
