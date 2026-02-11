import type { SnootyNode, MdastNode, ConversionContext, ConvertChildrenFn } from './types';

const LIST_CONTAINERS = ['bullet_list', 'enumerated_list', 'ordered_list', 'list'];

interface ConvertDirectiveListTableArgs {
  node: SnootyNode;
  ctx: ConversionContext;
  depth: number;
  convertChildren: ConvertChildrenFn;
}

/** Convert a Snooty ``list-table`` directive into MDX Table components */
export const convertDirectiveListTable = ({
  node,
  ctx,
  depth,
  convertChildren,
}: ConvertDirectiveListTableArgs): MdastNode => {
  const listContainer = findListContainer(node.children);
  if (!listContainer || !Array.isArray(listContainer.children)) {
    return { type: 'html', value: '<!-- list-table: unsupported structure -->' };
  }

  const rowItems = (listContainer.children || []).filter(
    (r): r is SnootyNode => !!r && (r.type === 'list_item' || r.type === 'listItem'),
  );

  const opt = node.options || {};

  const headerRowsCount = (() => {
    if (typeof opt['header-rows'] === 'number') return opt['header-rows'];
    const parsed = parseInt(String(opt['header-rows'] ?? ''), 10);
    return Number.isNaN(parsed) ? 0 : parsed;
  })();

  const stubColumns = (() => {
    if (typeof opt['stub-columns'] === 'number') return opt['stub-columns'];
    const parsed = parseInt(String(opt['stub-columns'] ?? ''), 10);
    return Number.isNaN(parsed) ? 0 : parsed;
  })();

  /** Build a TableRow element from a row item */
  const buildTableRow = (rowItem: SnootyNode, isHeaderRow: boolean): MdastNode => {
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
      // Use stubColumns to mark leading cells as header cells even in body rows
      const isStubCell = !isHeaderRow && cellIdx < stubColumns;
      const cellChildren = convertChildren({ nodes: cellItem.children, ctx, depth: depth + 1 });

      return {
        type: 'mdxJsxFlowElement',
        name: isHeaderRow || isStubCell ? 'TableHeaderCell' : 'TableCell',
        attributes: [],
        children: cellChildren,
      };
    });

    return {
      type: 'mdxJsxFlowElement',
      name: 'TableRow',
      attributes: [],
      children: cellNodes,
    };
  };

  const headerRows = rowItems.slice(0, headerRowsCount);
  const bodyRows = rowItems.slice(headerRowsCount);

  const tableChildren: MdastNode[] = [];

  // Build TableHead if there are header rows
  if (headerRows.length > 0) {
    tableChildren.push({
      type: 'mdxJsxFlowElement',
      name: 'TableHead',
      attributes: [],
      children: headerRows.map((row) => buildTableRow(row, true)),
    });
  }

  // Build TableBody for remaining rows
  if (bodyRows.length > 0) {
    tableChildren.push({
      type: 'mdxJsxFlowElement',
      name: 'TableBody',
      attributes: [],
      children: bodyRows.map((row) => buildTableRow(row, false)),
    });
  }

  // Build Table-level attributes from directive options
  const tableAttributes: MdastNode[] = buildTableAttributes(opt);

  return {
    type: 'mdxJsxFlowElement',
    name: 'Table',
    attributes: tableAttributes,
    children: tableChildren,
  };
};

/**
 * Map RST list-table directive options to MDX JSX attributes for the Table component.
 *
 * Supported options:
 *  - widths:        Column width specification (e.g. "20 80", "30,70", "auto")
 *  - align:         Horizontal alignment ("left" | "center" | "right")
 *  - width:         Overall table width (e.g. "100%")
 *  - class:         CSS class name(s) applied to the table
 *  - stub-columns:  Number of leading columns styled as row headers
 *  - header-rows:   Number of rows used as table headers
 */
const buildTableAttributes = (opt: Record<string, unknown>): MdastNode[] => {
  const attrs: MdastNode[] = [];

  const addStringAttr = (name: string, value: unknown) => {
    if (value !== undefined && value !== null && String(value).length > 0) {
      attrs.push({ type: 'mdxJsxAttribute', name, value: String(value) });
    }
  };

  const addNumericAttr = (name: string, value: unknown) => {
    const n = typeof value === 'number' ? value : parseInt(String(value ?? ''), 10);
    if (!Number.isNaN(n) && n > 0) {
      attrs.push({
        type: 'mdxJsxAttribute',
        name,
        value: { type: 'mdxJsxAttributeValueExpression', value: String(n) },
      });
    }
  };

  const cls = opt['class'] ?? opt.class;
  addStringAttr('className', cls);
  addStringAttr('widths', opt.widths);
  addStringAttr('align', opt.align);
  addStringAttr('width', opt.width);
  addNumericAttr('stubColumns', opt['stub-columns']);
  addNumericAttr('headerRows', opt['header-rows']);

  return attrs;
};

/** find first list-like container among children */
const findListContainer = (children?: SnootyNode[]): SnootyNode | undefined => {
  if (!Array.isArray(children)) return undefined;
  return children.find((c) => c && LIST_CONTAINERS.includes(c.type));
};
