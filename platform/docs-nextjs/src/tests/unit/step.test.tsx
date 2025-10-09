import { render } from '@testing-library/react';
import { mockLocation } from '../utils/mock-location';
import Step from '@/components/procedure/step';
// data for this component
import mockData from '../data/step.test.json';
import type { StepNode } from '@/types/ast';

beforeAll(() => {
  mockLocation({ hash: '' });
});

it.skip('renders with "connected" styling by default', () => {
  const tree = render(<Step nodeChildren={(mockData as StepNode).children} stepNumber={1} />);
  expect(tree.asFragment()).toMatchSnapshot();
});

it.skip('renders with "connected" styling', () => {
  const tree = render(<Step nodeChildren={(mockData as StepNode).children} stepStyle="connected" stepNumber={1} />);
  expect(tree.asFragment()).toMatchSnapshot();
});

it.skip('renders with "normal" or YAML steps styling', () => {
  const tree = render(<Step nodeChildren={(mockData as StepNode).children} stepStyle="normal" stepNumber={1} />);
  expect(tree.asFragment()).toMatchSnapshot();
});
