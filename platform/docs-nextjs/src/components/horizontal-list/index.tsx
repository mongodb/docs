import type { ASTNode, HorizontalListNode } from '@/types/ast';
import { css, cx } from '@leafygreen-ui/emotion';
import ComponentFactory from '../component-factory';

export type HorizontalListProps = {
  nodeChildren: HorizontalListNode['children'];
  columns: HorizontalListNode['options']['columns'];
  // New props for the MDX version
  children?: React.ReactNode;
  listType?: 'ordered' | 'unordered';
};

const horizontalListStyling = css`
  table-layout: fixed;
  width: 100%;
`;

const tableDataStyling = css`
  vertical-align: top;
`;

const HorizontalList = ({
  nodeChildren,
  columns,
  listType: precomputedListType,
  children,
  ...rest
}: HorizontalListProps) => {
  // Divide an array into an array of n arrays as evenly as possible
  const chunkArray = (arr: unknown[], n: number) => {
    if (n < 2) return [arr];

    const len = arr.length;
    const out = [];
    let i = 0;
    let size;

    if (len % n === 0) {
      size = Math.floor(len / n);
      while (i < len) {
        out.push(arr.slice(i, (i += size)));
      }
    } else {
      while (i < len) {
        size = Math.ceil((len - i) / n--);
        out.push(arr.slice(i, (i += size)));
      }
    }

    return out;
  };

  let columnArray: React.ReactNode[] = chunkArray(nodeChildren?.[0]?.children ?? [], columns).map((child, index) => (
    <ComponentFactory {...rest} key={index} nodeData={child as unknown as ASTNode} />
  ));
  // Use children if provided - this comes in as an object with the actual children array as a prop,
  // which works with the existing chunkArray logic. We *could* refactor this logic for children, if needed
  const nestedChildren = (children as React.ReactElement)?.props?.children;
  if (Array.isArray(nestedChildren)) {
    columnArray = chunkArray(nestedChildren, columns) as React.ReactNode[];
  }
  // Use pre-computed list type from MDX conversion if available, otherwise compute at runtime
  const listType = precomputedListType ?? nodeChildren[0].enumtype;
  const ListTag = listType === 'ordered' ? 'ol' : 'ul';

  return (
    <table className={cx(horizontalListStyling, 'hlist')}>
      <tbody>
        <tr>
          {columnArray.map((col, colIndex) => (
            <td className={cx(tableDataStyling)} key={colIndex}>
              <ListTag className="simple">{col}</ListTag>
            </td>
          ))}
        </tr>
      </tbody>
    </table>
  );
};

export default HorizontalList;
