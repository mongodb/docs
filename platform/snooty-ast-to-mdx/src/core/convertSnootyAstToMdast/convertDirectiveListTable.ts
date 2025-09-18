import type { SnootyNode, MdastNode } from './types';

const LIST_CONTAINERS = ['bullet_list', 'enumerated_list', 'ordered_list', 'list'];

interface ConvertDirectiveListTableArgs {
  node: SnootyNode;
}

/** Convert a Snooty ``list-table`` directive into an mdast GFM table */
export const convertDirectiveListTable = ({ node }: ConvertDirectiveListTableArgs): MdastNode => {
  const listContainer = findListContainer(node.children);
  if (!listContainer || !Array.isArray(listContainer.children)) {
    return { type: 'html', value: '<!-- list-table: unsupported structure -->' };
  }

  /** Convert a list_item row to tableRow */
  const rowItems = (listContainer.children || []).filter(
    (r): r is SnootyNode => !!r && (r.type === 'list_item' || r.type === 'listItem'),
  );

  const headerRowsCount = (() => {
    const opt = node.options || {};
    if (typeof opt['header-rows'] === 'number') return opt['header-rows'];
    if (typeof opt.header_rows === 'number') return opt.header_rows;
    return 0;
  })();

  const tableRows: MdastNode[] = rowItems.map((rowItem, rowIdx): MdastNode => {
    const cellContainer = findListContainer(rowItem.children);
    const cellItems: SnootyNode[] =
      cellContainer && Array.isArray(cellContainer.children)
        ? cellContainer.children.filter(
            (i): i is SnootyNode => !!i && (i.type === 'list_item' || i.type === 'listItem'),
          )
        : [];

    // If no nested list (single cell per row) fall back to using rowItem itself as cell
    const effectiveCells = cellItems.length ? cellItems : [rowItem];

    const cellNodes: MdastNode[] = effectiveCells.map((cellItem, cellIdx) => {
      const text = extractInlineText(cellItem.children);
      const isHeader = rowIdx < headerRowsCount || cellIdx < ((node.options?.stub_columns as number) ?? 0);
      return {
        type: isHeader ? 'tableHeader' : 'tableCell',
        children: [
          {
            type: 'paragraph',
            children: [{ type: 'text', value: text }],
          },
        ],
      };
    });

    return {
      type: 'tableRow',
      children: cellNodes,
    };
  });

  const align: Array<'left' | 'right' | 'center' | null> = [];
  if (Array.isArray(node.options?.widths)) {
    const widths = node.options.widths;
    align.push(...widths.map(() => null));
  }

  return {
    type: 'table',
    align,
    children: tableRows,
  };
};

/** find first list-like container among children */
const findListContainer = (children?: SnootyNode[]): SnootyNode | undefined => {
  if (!Array.isArray(children)) return undefined;
  return children.find((c) => c && LIST_CONTAINERS.includes(c.type));
};

/** Extract display text from inline Snooty nodes */
const extractInlineText = (nodes?: SnootyNode[]): string => {
  if (!Array.isArray(nodes)) return '';
  const parts: string[] = [];
  const walk = (n?: SnootyNode) => {
    if (!n) return;
    if (typeof n.value === 'string') {
      parts.push(n.value);
    }
    if (Array.isArray(n.children)) n.children.forEach(walk);
  };
  nodes.forEach(walk);
  return parts.join('').trim();
};
