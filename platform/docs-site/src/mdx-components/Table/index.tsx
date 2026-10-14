'use client';

import React, { useContext, createContext } from 'react';
import clsx from 'clsx';
import {
  Cell,
  HeaderCell,
  HeaderRow,
  Row,
  Table as ViaTable,
  TableBody as ViaTableBody,
  TableHead as ViaTableHead,
} from '@via-ds/components/table';
import { SkipPTagContext } from '@/mdx-components/Paragraph';
import { AncestorComponentContextProvider, useAncestorComponentContext } from '@/context/ancestor-components-context';
import styles from './table.module.scss';

/** Used internally to distinguish header rows from body rows */
const TableHeadContext = createContext(false);

export type TableProps = {
  children: React.ReactNode;
  widths?: string;
  /** Passed by the conversion script; not used for rendering (Via cells set their own alignment) */
  align?: string;
  width?: string;
  className?: string;
  /** Passed by the conversion script; not used for rendering (already encoded in cell types) */
  stubColumns?: number;
  /** Passed by the conversion script; not used for rendering (already encoded in cell types) */
  headerRows?: number;
  /** Number of body rows, counted by the MDX components map */
  bodyRowCount?: number;
};

export const Table = ({ children, widths, width, className, bodyRowCount = 0 }: TableProps) => {
  // Read the parent context BEFORE AncestorComponentContextProvider sets table=true for our children
  const ancestors = useAncestorComponentContext();
  const isNested = !!ancestors?.table;
  // Alternate row color only when not nested and there are more than 4 body rows
  const shouldAlternateRowColor = !isNested && bodyRowCount > 4;

  let parsedWidths: string[] | null = null;
  if (widths && widths !== 'auto') {
    parsedWidths = widths.split(/[ ,]+/);
  }

  return (
    <AncestorComponentContextProvider component="table">
      <ViaTable
        className={clsx(styles.table, className)}
        shouldAlternateRowColor={shouldAlternateRowColor}
        style={{ width }}
      >
        {parsedWidths && (
          <colgroup>
            {parsedWidths.map((w, i) => (
              <col key={i} style={{ width: `${w}%` }} />
            ))}
          </colgroup>
        )}
        {children}
      </ViaTable>
    </AncestorComponentContextProvider>
  );
};

export const TableHead = ({ children }: { children: React.ReactNode }) => (
  <TableHeadContext.Provider value={true}>
    <ViaTableHead>{children}</ViaTableHead>
  </TableHeadContext.Provider>
);

export const TableBody = ({ children }: { children: React.ReactNode }) => <ViaTableBody>{children}</ViaTableBody>;

export const TableRow = ({ children }: { children: React.ReactNode }) => {
  const isInHead = useContext(TableHeadContext);
  return isInHead ? <HeaderRow>{children}</HeaderRow> : <Row>{children}</Row>;
};

export const TableHeaderCell = ({ children }: { children: React.ReactNode }) => {
  const isInHead = useContext(TableHeadContext);
  if (isInHead) {
    return (
      <HeaderCell className={clsx(styles.cell, styles.headerCell)}>
        <SkipPTagContext.Provider value={true}>
          <div>{children}</div>
        </SkipPTagContext.Provider>
      </HeaderCell>
    );
  }
  // Stub cell in a body row
  return (
    <Cell
      className={clsx(styles.cell, styles.bodyCell, styles.stubCell)}
      contentClassName={styles.cellContainer}
      role="rowheader"
    >
      <div className={styles.bodyCellContent}>{children}</div>
    </Cell>
  );
};

export const TableCell = ({ children }: { children: React.ReactNode }) => (
  <Cell className={clsx(styles.cell, styles.bodyCell)} contentClassName={styles.cellContainer}>
    <div className={styles.bodyCellContent}>{children}</div>
  </Cell>
);
