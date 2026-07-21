import { css, cx } from '@leafygreen-ui/emotion';

export type HorizontalListProps = {
  children: React.ReactNode;
  columns: number;
};

const horizontalListStyling = css`
  table-layout: fixed;
  width: 100%;
`;

const tableDataStyling = css`
  vertical-align: top;
`;

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

export const HorizontalList = ({ children, columns }: HorizontalListProps) => {
  const childElement = children as React.ReactElement;
  // Infer ordered/unordered from the list wrapper MDX renders (ul vs ol).
  const listType = childElement?.type === 'ol' ? 'ordered' : childElement?.type === 'ul' ? 'unordered' : 'unordered';

  const nestedChildren = childElement?.props?.children;
  // TODO: Revisit offloading this logic to a 3rd party library
  const columnArray = Array.isArray(nestedChildren)
    ? (chunkArray(nestedChildren, columns) as React.ReactNode[])
    : [children];
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
