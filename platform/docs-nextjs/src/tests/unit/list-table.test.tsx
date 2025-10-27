import { render } from '@testing-library/react';
import { matchers } from '@emotion/jest';
import ListTable from '@/components/list-table';

import mockData from '@/tests/data/list-table.test.json';
import mockDataFixedWidths from '@/tests/data/list-table-fixed-widths.test.json';
import type { ListTableNode } from '@/types/ast';

const typedMockData = mockData as ListTableNode;
const typedMockDataFixedWidths = mockDataFixedWidths as ListTableNode;

expect.extend(matchers);

const mountListTable = (data: ListTableNode) =>
  render(<ListTable nodeChildren={data.children} options={data.options} />);

describe('when rendering a list-table directive', () => {
  const data = typedMockData;

  it('renders correctly', () => {
    const wrapper = mountListTable(data);
    expect(wrapper.asFragment()).toMatchSnapshot();
  });

  it('displays one header row', () => {
    const wrapper = mountListTable(data);
    expect(wrapper.getByTestId('leafygreen-ui-header-row')).toBeTruthy();
  });

  it('displays six header columns', () => {
    const wrapper = mountListTable(data);
    expect(wrapper.queryAllByRole('columnheader')).toHaveLength(6);
  });

  it('displays five body rows', () => {
    const wrapper = mountListTable(data);
    // we test for 6 here, with an offset to account for the header row
    expect(wrapper.queryAllByRole('row')).toHaveLength(6);
  });

  it('renders one stub column per row', () => {
    const wrapper = mountListTable(data);
    expect(wrapper.queryAllByRole('rowheader')).toHaveLength(5);
  });
});

describe('when rendering a list table with fixed widths', () => {
  const data = typedMockDataFixedWidths;

  it('renders correctly', () => {
    const wrapper = mountListTable(data);
    expect(wrapper.asFragment()).toMatchSnapshot();
  });

  it('displays no header columns', () => {
    const wrapper = mountListTable(data);
    expect(wrapper.queryAllByRole('columnheader')).toHaveLength(0);
  });

  it('displays no header row when none are set', () => {
    const wrapper = mountListTable(data);
    expect(wrapper.queryByTestId('leafygreen-ui-header-row')).toBeFalsy();
    expect(wrapper.queryByText('name')).not.toBeTruthy();
  });

  it('displays no stub columns', () => {
    const wrapper = mountListTable(data);
    expect(wrapper.queryAllByRole('rowheader')).toHaveLength(0);
  });
});
