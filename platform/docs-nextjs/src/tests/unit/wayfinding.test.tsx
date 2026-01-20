import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MAX_INIT_OPTIONS, Wayfinding } from '@/components/wayfinding/Wayfinding';
import mockData from '@/tests/data/wayfinding.test.json';
import type { WayfindingNode } from '@/types/ast';

describe('Wayfinding component', () => {
  it('renders all options with description', () => {
    const wayfindingNode = mockData as unknown as WayfindingNode;
    const res = render(<Wayfinding nodeChildren={wayfindingNode.children} argument={wayfindingNode.argument} />);
    const expectedTotalOptions = 18;

    expect(res.asFragment()).toMatchSnapshot();
    expect(res.getByText('MongoDB with drivers')).toBeTruthy();
    expect(
      res.getByText(
        'This page documents a mongosh method. To view the equivalent method in a MongoDB driver, visit the drivers page for your programming language',
      ),
    ).toBeTruthy();

    expect(res.queryAllByRole('link', { hidden: false })).toHaveLength(MAX_INIT_OPTIONS);
    expect(res.queryAllByRole('link', { hidden: true })).toHaveLength(expectedTotalOptions);
    expect(res.queryByText('Show All', { exact: false })).toBeTruthy();
  });

  it('renders max initial options only', () => {
    const wayfindingNode = mockData as unknown as WayfindingNode;
    const modifiedData = {
      ...wayfindingNode,
      children: wayfindingNode.children.slice(0, MAX_INIT_OPTIONS + 1),
    };
    const res = render(<Wayfinding nodeChildren={modifiedData.children} argument={modifiedData.argument} />);

    expect(res.queryAllByRole('link', { hidden: false })).toHaveLength(MAX_INIT_OPTIONS);
    expect(res.queryAllByRole('link', { hidden: true })).toHaveLength(MAX_INIT_OPTIONS);
    expect(res.queryByText('Show All', { exact: false })).toBeFalsy();
  });

  it('shows all options after interaction', async () => {
    const user = userEvent.setup();
    const wayfindingNode = mockData as unknown as WayfindingNode;
    const res = render(<Wayfinding nodeChildren={wayfindingNode.children} argument={wayfindingNode.argument} />);
    const expectedTotalOptions = 18;

    expect(res.queryAllByRole('link', { hidden: false })).toHaveLength(MAX_INIT_OPTIONS);
    expect(res.queryAllByRole('link', { hidden: true })).toHaveLength(expectedTotalOptions);
    expect(res.queryByText('Show All', { exact: false })).toBeTruthy();

    const button = res.getByText('Show All', { exact: false }).closest('button');
    expect(button).toBeTruthy();
    if (button) {
      await user.click(button);
    }

    expect(res.queryAllByRole('link', { hidden: false })).toHaveLength(expectedTotalOptions);
    expect(res.queryAllByRole('link', { hidden: true })).toHaveLength(expectedTotalOptions);
    expect(res.queryByText('Show All', { exact: false })).toBeFalsy();
    expect(res.queryByText('Collapse', { exact: false })).toBeTruthy();
  });
});
