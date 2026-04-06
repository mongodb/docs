'use client';

import React, { useContext, createContext } from 'react';
import { SkipPTagContext } from '@/mdx-components/Paragraph';
import { Cell, Row, Table as LGTable, TableBody as LGTableBody, TableHead as LGTableHead } from '@leafygreen-ui/table';
import { palette } from '@leafygreen-ui/palette';
import { css, cx } from '@leafygreen-ui/emotion';
import { theme } from '@/styles/theme';
import { AncestorComponentContextProvider, useAncestorComponentContext } from '@/context/ancestor-components-context';

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

  // Force bold weight and remove paragraph margin on all descendants as a fallback
  // for when SkipPTagContext doesn't prevent Body from rendering
  * {
    font-weight: 600 !important;
  }

  p {
    margin: 0 !important;
  }
`;

const stubCellStyle = css`
  background-color: ${palette.gray.light3};
  border-right: 3px solid ${palette.gray.light2};
  font-weight: 600;

  * {
    font-weight: 600 !important;
  }

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

/** Used internally to distinguish header rows from body rows */
const TableHeadContext = createContext(false);

/**
 * Carries whether zebra striping should be applied to body rows.
 * Set by TableBody based on row count and nesting status.
 */
const TableZebraContext = createContext(false);

/**
 * Carries whether this table is nested inside another table.
 * Read from ancestors context *before* this table registers itself,
 * then passed down so TableBody can apply the correct striping logic.
 */
const TableNestingContext = createContext(false);

export type TableProps = {
  children: React.ReactNode;
  widths?: string;
  align?: string;
  width?: string;
  className?: string;
  /** Passed by the conversion script; not used for rendering (already encoded in cell types) */
  stubColumns?: number;
  /** Passed by the conversion script; not used for rendering (already encoded in cell types) */
  headerRows?: number;
};

export const Table = ({ children, widths, align: customAlign, width, className }: TableProps) => {
  // Read the parent context BEFORE AncestorComponentContextProvider sets table=true for our children
  const ancestors = useAncestorComponentContext();
  const isNested = !!ancestors?.table;

  let parsedWidths: string[] | null = null;
  if (widths && widths !== 'auto') {
    parsedWidths = widths.split(/[ ,]+/);
  }

  return (
    <TableNestingContext.Provider value={isNested}>
      <AncestorComponentContextProvider component="table">
        <LGTable className={cx(styleTable({ customAlign, customWidth: width }), className)}>
          {parsedWidths && (
            <colgroup>
              {parsedWidths.map((w, i) => (
                <col key={i} style={{ width: `${w}%` }} />
              ))}
            </colgroup>
          )}
          {children}
        </LGTable>
      </AncestorComponentContextProvider>
    </TableNestingContext.Provider>
  );
};

export const TableHead = ({ children }: { children: React.ReactNode }) => (
  <TableHeadContext.Provider value={true}>
    <LGTableHead className={cx(theadStyle)}>{children}</LGTableHead>
  </TableHeadContext.Provider>
);

export const TableBody = ({ children }: { children: React.ReactNode }) => {
  const isNested = useContext(TableNestingContext);
  const rowCount = React.Children.count(children);
  // Match the original: alternate row color only when not nested and row count > 4
  const shouldZebra = !isNested && rowCount > 4;

  return (
    <TableZebraContext.Provider value={shouldZebra}>
      <LGTableBody>{children}</LGTableBody>
    </TableZebraContext.Provider>
  );
};

export const TableRow = ({ children }: { children: React.ReactNode }) => {
  const isInHead = useContext(TableHeadContext);
  const shouldZebra = useContext(TableZebraContext);

  if (isInHead) {
    // Use a plain <tr> instead of LG's HeaderRow — HeaderRow wraps every child in
    // HeaderCell via React.Children.map, which would override our <th> elements.
    return <tr data-testid="leafygreen-ui-header-row">{children}</tr>;
  }
  return <Row className={cx(shouldZebra && zebraStripingStyle)}>{children}</Row>;
};

export const TableHeaderCell = ({ children }: { children: React.ReactNode }) => {
  const isInHead = useContext(TableHeadContext);
  if (isInHead) {
    // Use a plain <th> instead of LG's HeaderCell to avoid LG's cx() object-arg
    // composition issue that drops our className when mixed with conditional objects.
    return (
      <th className={cx(baseCellStyle, headerCellStyle)} scope="col">
        <SkipPTagContext.Provider value={true}>
          <div>{children}</div>
        </SkipPTagContext.Provider>
      </th>
    );
  }
  // Stub cell in a body row
  return (
    <Cell className={cx(baseCellStyle, bodyCellStyle, stubCellStyle)} role="rowheader">
      <div className={cx(bodyCellContentStyle)}>{children}</div>
    </Cell>
  );
};

export const TableCell = ({ children }: { children: React.ReactNode }) => (
  <Cell className={cx(baseCellStyle, bodyCellStyle)}>
    <div className={cx(bodyCellContentStyle)}>{children}</div>
  </Cell>
);
