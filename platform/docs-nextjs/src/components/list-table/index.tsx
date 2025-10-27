'use client';

import type { ReactNode } from 'react';
import { useMemo, useRef } from 'react';
import {
  Cell,
  HeaderCell,
  flexRender,
  HeaderRow,
  Row,
  Table,
  TableBody,
  TableHead,
  useLeafyGreenTable,
} from '@leafygreen-ui/table';
import { palette } from '@leafygreen-ui/palette';
import { css, cx } from '@leafygreen-ui/emotion';
import { theme } from '@/styles/theme';
import { AncestorComponentContextProvider, useAncestorComponentContext } from '@/context/ancestor-components-context';
import type { ListItemNode, ListTableNode, Node, ParentListItemNode } from '@/types/ast';
import { isDirectiveNode, isFootnoteReferenceNode, isParentNode } from '@/types/ast-utils';
import ComponentFactory from '@/components/component-factory';

const align = (key: string) => {
  switch (key) {
    case 'left':
    case 'right':
    case 'center':
      return key;
    default:
      return 'inherit';
  }
};

const styleTable = ({ customAlign, customWidth }: { customAlign?: string; customWidth?: string }) => css`
  ${customAlign && `text-align: ${align(customAlign)}`};
  ${customWidth && `width: ${customWidth}`};
  margin: ${theme.size.medium} 0;
`;

const theadStyle = css`
  // Allows its box shadow to appear above stub cell's background color
  position: relative;
  color: var(--font-color-primary);
  background-color: ${palette.white};
  box-shadow: 0 ${theme.size.tiny} ${palette.gray.light2};

  .dark-theme & {
    background-color: ${palette.black};
    box-shadow: 0 ${theme.size.tiny} ${palette.gray.dark2};
  }
`;

const baseCellStyle = css`
  // Keep legacy padding; important to prevent first-child and last-child overwrites
  padding: 10px ${theme.size.small} !important;
  // Force top alignment rather than LeafyGreen default middle (PD-1217)
  vertical-align: top;
  color: var(--font-color-primary);

  * {
    // Wrap in selector to ensure it cascades down to every element
    font-size: ${theme.fontSize.small} !important;
  }

  // Ensure each cell is no higher than the highest content in row
  & > div {
    height: unset;
    min-height: unset;
  }
`;

const bodyCellStyle = css`
  overflow-wrap: anywhere;
  word-break: break-word;
  align-content: flex-start;

  & > div {
    min-height: unset;
    max-height: unset;
    flex-direction: column;
    align-items: flex-start;
  }
`;

const bodyCellContentStyle = css`
  *,
  p,
  a {
    line-height: 20px;
  }

  // Target any nested components (paragraphs, admonitions, tables) and any paragraphs within those nested components
  & > *,
  & > div p {
    margin: 0 0 12px !important;
  }

  // Prevent extra margin below last element (such as when multiple paragraphs are present)
  & > div *:last-child,
  & > *:last-child {
    margin-bottom: 0 !important;
  }
`;

const headerCellStyle = css`
  line-height: 24px;
  font-weight: 600;
  font-size: ${theme.fontSize.small};
  width: auto;
`;

const stubCellStyle = css`
  background-color: ${palette.gray.light3};
  border-right: 3px solid ${palette.gray.light2};
  font-weight: 600;

  .dark-theme & {
    background-color: ${palette.gray.dark4};
    border-right: 3px solid ${palette.gray.dark2};
  }
`;

const zebraStripingStyle = css`
  &:nth-of-type(even) {
    background-color: ${palette.gray.light3};

    .dark-theme & {
      background-color: ${palette.gray.dark4};
    }
  }
`;

const hasOneChild = (children: Node[]) => children.length === 1 && children[0].type === 'paragraph';

/**
 * recursive traversal of nodeLists' children to look for
 * id values of footnote references
 */
const getReferenceIds = (nodeList: Node[]) => {
  const results: string[] = [];
  const iter = (node: Node) => {
    if (isFootnoteReferenceNode(node)) {
      results.push(`ref-${node['refname']}-${node['id']}`);
    }
    if (!isParentNode(node) || !node.children.length) {
      return;
    }
    for (const childNode of node.children) {
      iter(childNode);
    }
  };

  for (const node of nodeList) {
    iter(node);
  }
  return results;
};

/**
 * Checks every row for the existence of a nested table.
 */
const includesNestedTable = (rows: Node[]) => {
  const checkNodeForTable = (nodeData: Node): boolean => {
    if (isDirectiveNode(nodeData) && nodeData.name === 'list-table') {
      return true;
    }

    if (!isParentNode(nodeData) || nodeData.children.length === 0) {
      return false;
    }

    return nodeData.children.some((node) => checkNodeForTable(node));
  };

  return rows.some((row) => checkNodeForTable(row));
};

export type ListTableColumnData = {
  id: string;
  accessorKey: string;
  header: string | ((ctx: unknown) => ReactNode);
};

const generateColumns = (headerRow: Node, bodyRows: ParentListItemNode[]): ListTableColumnData[] => {
  if (!isParentNode(headerRow)) {
    // generate columns from bodyRows
    const flattenedRows = bodyRows.map((bodyRow) => bodyRow.children[0].children);
    const maxColumns = Math.max(...flattenedRows.map((row) => row.length));
    const res = [];
    for (let colIndex = 0; colIndex < maxColumns; colIndex++) {
      res.push({
        id: `column-${colIndex}`,
        accessorKey: `column-${colIndex}`,
        header: '',
      });
    }
    return res;
  }

  return headerRow.children.map((listItemNode, index) => {
    const skipPTag = hasOneChild((listItemNode as ListItemNode).children);
    return {
      id: `column-${index}`,
      accessorKey: `column-${index}`,
      header: () => (
        <>
          {(listItemNode as ListItemNode).children.map((childNode, index) => (
            <ComponentFactory key={index} nodeData={childNode} skipPTag={skipPTag} />
          ))}
        </>
      ),
    };
  });
};

const generateRowsData = (bodyRowNodes: ParentListItemNode[], columns: ListTableColumnData[]) => {
  const rowNodes = bodyRowNodes.map((node) => node?.children[0]?.children ?? []);
  const rows = rowNodes.map((rowNode) => {
    return rowNode.reduce<Record<string, ReactNode>>((res, columnNode, colIndex) => {
      const column = columns[colIndex];
      if (!column) {
        console.warn(`Row has too many items (index ${colIndex}) for table with ${columns.length} columns`);
        return res;
      }
      res[column?.accessorKey ?? colIndex] = (
        <>
          {columnNode.children.map((cellNode, index) => (
            <ComponentFactory key={index} nodeData={cellNode} />
          ))}
        </>
      );
      return res;
    }, {});
  });

  return rows;
};

export type ListTableProps = {
  nodeChildren: ListTableNode['children'];
  options: ListTableNode['options'];
};

const ListTable = ({ nodeChildren, options }: ListTableProps) => {
  const ancestors = useAncestorComponentContext();
  const stubColumnCount = parseInt(options?.['stub-columns'] ?? '0', 10) || 0;
  const headerRowCount = parseInt(options?.['header-rows'] ?? '0', 10) || 0;

  // Check if :header-rows: 0 is specified or :header-rows: is omitted
  const headerRows = useMemo(() => {
    const MAX_HEADER_ROW = 1;
    return headerRowCount > 0
      ? nodeChildren[0].children[0].children.slice(0, Math.min(MAX_HEADER_ROW, headerRowCount))
      : [];
  }, [nodeChildren, headerRowCount]);

  const bodyRows = useMemo(() => {
    return nodeChildren[0].children.slice(headerRowCount);
  }, [nodeChildren, headerRowCount]);

  // get all ID's for elements within header, or first two rows of body
  const firstHeaderRowChildren = isParentNode(headerRows[0]) ? headerRows[0].children : [];
  const elmIdsForScroll = getReferenceIds(firstHeaderRowChildren.concat(bodyRows.slice(0, 3)));

  const hasNestedTable = useMemo(() => includesNestedTable(bodyRows), [bodyRows]);
  const noTableNesting = !hasNestedTable && !ancestors?.table;
  const shouldAlternateRowColor = noTableNesting && bodyRows.length > 4;

  const tableRef = useRef(null);
  const columns = useMemo(() => generateColumns(headerRows[0], bodyRows), [bodyRows, headerRows]);
  const data = useMemo(() => generateRowsData(bodyRows, columns), [bodyRows, columns]);
  const table = useLeafyGreenTable({
    containerRef: tableRef,
    columns: columns,
    data: data,
  });
  const { rows } = table.getRowModel();

  const columnCount = columns.length;

  let widths = null;
  const customWidths = options?.widths;
  if (customWidths && customWidths !== 'auto') {
    widths = customWidths.split(/[ ,]+/);
    if (columnCount !== widths.length) {
      // If custom width specification does not match number of columns, do not apply
      widths = null;
    }
  }

  return (
    <AncestorComponentContextProvider component={'table'}>
      {elmIdsForScroll.map((id) => (
        <div className="header-buffer" key={id} id={id} />
      ))}
      <Table
        className={cx(
          styleTable({
            customAlign: options?.align,
            customWidth: options?.width,
          }),
        )}
        ref={tableRef}
        shouldAlternateRowColor={shouldAlternateRowColor}
      >
        {widths && (
          <colgroup>
            {widths.map((width, i) => (
              <col key={i} style={{ width: `${width}%` }} />
            ))}
          </colgroup>
        )}
        <TableHead className={cx(theadStyle)}>
          {headerRowCount > 0 &&
            table.getHeaderGroups().map((headerGroup) => (
              <HeaderRow key={headerGroup.id} data-testid="leafygreen-ui-header-row">
                {headerGroup.headers.map((header) => {
                  return (
                    <HeaderCell className={cx(baseCellStyle, headerCellStyle)} key={header.id} header={header}>
                      {/* Wraps cell content inside of a div so that all of its content are together when laid out. */}
                      <div>{flexRender(header.column.columnDef.header, header.getContext())}</div>
                    </HeaderCell>
                  );
                })}
              </HeaderRow>
            ))}
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <Row key={row.id} row={row} className={cx(shouldAlternateRowColor && zebraStripingStyle)}>
              {row.getVisibleCells().map((cell, colIndex) => {
                const isStub = colIndex <= stubColumnCount - 1;
                const role = isStub ? 'rowheader' : null;
                return (
                  <Cell
                    key={cell.id}
                    className={cx(baseCellStyle, bodyCellStyle, isStub && stubCellStyle)}
                    role={role ?? undefined}
                  >
                    {/* Wraps cell content inside of a div so that all of its content are together when laid out. */}
                    <div className={cx(bodyCellContentStyle)}>{cell.renderValue() as ReactNode}</div>
                  </Cell>
                );
              })}
            </Row>
          ))}
        </TableBody>
      </Table>
    </AncestorComponentContextProvider>
  );
};

export default ListTable;
