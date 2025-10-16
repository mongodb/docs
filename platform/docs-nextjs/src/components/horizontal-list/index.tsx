import type { ASTNode, HorizontalListNode } from '@/types/ast';
import { css, cx } from '@leafygreen-ui/emotion';
import ComponentFactory from '../component-factory';

export type HorizontalListProps = {
  nodeChildren: HorizontalListNode['children'];
  columns: HorizontalListNode['options']['columns'];
};

const horizontalListStyling = css`
  table-layout: fixed;
  width: 100%;
`;

const tableDataStyling = css`
  vertical-align: top;
`;

const HorizontalList = ({ nodeChildren, columns, ...rest }: HorizontalListProps) => {
  // Divide an array into an array of n arrays as evenly as possible
  const chunkArray = (arr: ASTNode[], n: number) => {
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

  const columnArray = chunkArray(nodeChildren[0].children, columns);
  const ListTag = nodeChildren[0].enumtype === 'ordered' ? 'ol' : 'ul';

  return (
    <table className={cx(horizontalListStyling, 'hlist')}>
      <tbody>
        <tr>
          {columnArray.map((col, colIndex) => (
            <td className={cx(tableDataStyling)} key={colIndex}>
              <ListTag className="simple">
                {col.map((child, index) => (
                  <ComponentFactory {...rest} key={index} nodeData={child} />
                ))}
              </ListTag>
            </td>
          ))}
        </tr>
      </tbody>
    </table>
  );
};

export default HorizontalList;
