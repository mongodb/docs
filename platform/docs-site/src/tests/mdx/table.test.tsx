import { render } from '@testing-library/react';
import { Table, TableHead, TableBody, TableRow, TableHeaderCell, TableCell } from '@/mdx-components/Table';
import { components } from '@/mdx-components';

describe('when rendering a table directive', () => {
  // Data from table.test.json: header-rows: 1, stub-columns: 1
  // Headers: name, quantity, size, status, tags, rating
  // Body rows: journal, notebook, paper, planner, postcard (5 rows)

  const renderTable = () =>
    render(
      <Table widths="auto" headerRows={1} stubColumns={1}>
        <TableHead>
          <TableRow>
            <TableHeaderCell>name</TableHeaderCell>
            <TableHeaderCell>quantity</TableHeaderCell>
            <TableHeaderCell>size</TableHeaderCell>
            <TableHeaderCell>status</TableHeaderCell>
            <TableHeaderCell>tags</TableHeaderCell>
            <TableHeaderCell>rating</TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableHeaderCell>journal</TableHeaderCell>
            <TableCell>25</TableCell>
            <TableCell>14x21,cm</TableCell>
            <TableCell>A</TableCell>
            <TableCell>brown, lined</TableCell>
            <TableCell>9</TableCell>
          </TableRow>
          <TableRow>
            <TableHeaderCell>notebook</TableHeaderCell>
            <TableCell>50</TableCell>
            <TableCell>8.5x11,in</TableCell>
            <TableCell>A</TableCell>
            <TableCell>college-ruled,perforated</TableCell>
            <TableCell>8</TableCell>
          </TableRow>
          <TableRow>
            <TableHeaderCell>paper</TableHeaderCell>
            <TableCell>100</TableCell>
            <TableCell>8.5x11,in</TableCell>
            <TableCell>D</TableCell>
            <TableCell>watercolor</TableCell>
            <TableCell>10</TableCell>
          </TableRow>
          <TableRow>
            <TableHeaderCell>planner</TableHeaderCell>
            <TableCell>75</TableCell>
            <TableCell>22.85x30,cm</TableCell>
            <TableCell>D</TableCell>
            <TableCell>2019</TableCell>
            <TableCell>10</TableCell>
          </TableRow>
          <TableRow>
            <TableHeaderCell>postcard</TableHeaderCell>
            <TableCell>45</TableCell>
            <TableCell>10x,cm</TableCell>
            <TableCell>D</TableCell>
            <TableCell>double-sided,white</TableCell>
            <TableCell>2</TableCell>
          </TableRow>
        </TableBody>
      </Table>,
    );

  it('renders correctly', () => {
    const wrapper = renderTable();
    expect(wrapper.asFragment()).toMatchSnapshot();
  });

  it('displays one header row', () => {
    const wrapper = renderTable();
    expect(wrapper.getByTestId('via-table-header_row')).toBeTruthy();
  });

  it('displays six header columns', () => {
    const wrapper = renderTable();
    expect(wrapper.queryAllByRole('columnheader')).toHaveLength(6);
  });

  it('displays five body rows', () => {
    const wrapper = renderTable();
    // 6 rows total: 1 header row + 5 body rows
    expect(wrapper.queryAllByRole('row')).toHaveLength(6);
  });

  it('renders one stub column per body row', () => {
    const wrapper = renderTable();
    expect(wrapper.queryAllByRole('rowheader')).toHaveLength(5);
  });
});

describe('when rendering a table with fixed widths', () => {
  // Data from table-fixed-widths.test.json: widths: "5 10 15 20 30 20", no headers/stubs
  // One body row: notebook, 50, 8.5x11,in, A, college-ruled,perforated, 8

  const renderFixedWidthsTable = () =>
    render(
      <Table widths="5 10 15 20 30 20">
        <TableBody>
          <TableRow>
            <TableCell>notebook</TableCell>
            <TableCell>50</TableCell>
            <TableCell>8.5x11,in</TableCell>
            <TableCell>A</TableCell>
            <TableCell>college-ruled,perforated</TableCell>
            <TableCell>8</TableCell>
          </TableRow>
        </TableBody>
      </Table>,
    );

  it('renders correctly', () => {
    const wrapper = renderFixedWidthsTable();
    expect(wrapper.asFragment()).toMatchSnapshot();
  });

  it('displays no header columns', () => {
    const wrapper = renderFixedWidthsTable();
    expect(wrapper.queryAllByRole('columnheader')).toHaveLength(0);
  });

  it('displays no header row when none are set', () => {
    const wrapper = renderFixedWidthsTable();
    expect(wrapper.queryByTestId('via-table-header_row')).toBeFalsy();
    expect(wrapper.queryByText('name')).not.toBeTruthy();
  });

  it('displays no stub columns', () => {
    const wrapper = renderFixedWidthsTable();
    expect(wrapper.queryAllByRole('rowheader')).toHaveLength(0);
  });
});

describe('when deciding zebra striping', () => {
  // Rendered through the MDX components map, which is where body rows are counted
  const { Table: MdxTable, TableBody: MdxTableBody, TableRow: MdxTableRow, TableCell: MdxTableCell } = components();
  const isZebra = /Row-module_\w+_zebra/;

  const rows = (count: number, prefix = 'row') =>
    Array.from({ length: count }, (_, i) => (
      <MdxTableRow key={i}>
        <MdxTableCell>{`${prefix}-${i}`}</MdxTableCell>
      </MdxTableRow>
    ));

  it('stripes body rows when there are more than four', () => {
    const wrapper = render(
      <MdxTable>
        <MdxTableBody>{rows(5)}</MdxTableBody>
      </MdxTable>,
    );
    expect(wrapper.getAllByTestId('via-table-row')).toHaveLength(5);
    wrapper.getAllByTestId('via-table-row').forEach((row) => expect(row.className).toMatch(isZebra));
  });

  it('does not stripe four or fewer body rows', () => {
    const wrapper = render(
      <MdxTable>
        <MdxTableBody>{rows(4)}</MdxTableBody>
      </MdxTable>,
    );
    expect(wrapper.getAllByTestId('via-table-row')).toHaveLength(4);
    wrapper.getAllByTestId('via-table-row').forEach((row) => expect(row.className).not.toMatch(isZebra));
  });

  it('does not stripe a nested table', () => {
    const wrapper = render(
      <MdxTable>
        <MdxTableBody>
          {rows(4)}
          <MdxTableRow>
            <MdxTableCell>
              <MdxTable>
                <MdxTableBody>{rows(5, 'nested')}</MdxTableBody>
              </MdxTable>
            </MdxTableCell>
          </MdxTableRow>
        </MdxTableBody>
      </MdxTable>,
    );
    const [outer, inner] = wrapper.getAllByTestId('via-table');
    const outerRows = outer.querySelectorAll(':scope > tbody > tr');
    const innerRows = inner.querySelectorAll('tbody > tr');
    expect(outerRows).toHaveLength(5);
    expect(innerRows).toHaveLength(5);
    outerRows.forEach((row) => expect(row.className).toMatch(isZebra));
    innerRows.forEach((row) => expect(row.className).not.toMatch(isZebra));
  });
});

describe('when rendering a table with a width', () => {
  it('applies the width to the table element', () => {
    const wrapper = render(
      <Table width="50%">
        <TableBody>
          <TableRow>
            <TableCell>cell</TableCell>
          </TableRow>
        </TableBody>
      </Table>,
    );
    expect(wrapper.getByTestId('via-table')).toHaveStyle({ width: '50%' });
  });
});
