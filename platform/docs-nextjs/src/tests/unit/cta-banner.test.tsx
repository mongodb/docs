import { render } from '@testing-library/react';
import { mockLocation } from '@/tests/utils/mock-location';
import CTABanner from '@/components/banner/cta-banner';
import type { ASTNode } from '@/types/ast';
import { useSnootyMetadata } from '@/utils/use-snooty-metadata';

// data for this component
import mockData from '../data/cta-banner.test.json';

jest.mock('@/utils/use-snooty-metadata', () => ({
  useSnootyMetadata: jest.fn(),
}));

beforeAll(() => {
  mockLocation({ hash: '' });
  (useSnootyMetadata as jest.Mock).mockImplementation(() => ({ project: 'docs-node', branch: 'v4.9' }));
});

it('renders a CTABanner correctly when non-default icon is specified', () => {
  const wrapper = render(
    <CTABanner nodeChildren={mockData.iconSpecified.children as ASTNode[]} options={mockData.iconSpecified.options} />,
  );
  expect(wrapper.getByRole('img')).toHaveAttribute('aria-label', 'University Icon');
  expect(wrapper.asFragment()).toMatchSnapshot();
});

it('renders a CTABanner correctly when no icon is specified', () => {
  const wrapper = render(
    <CTABanner
      nodeChildren={mockData.noIconSpecified.children as ASTNode[]}
      options={mockData.noIconSpecified.options}
    />,
  );
  expect(wrapper.getByRole('img')).toHaveAttribute('aria-label', 'Play Icon');
  expect(wrapper.asFragment()).toMatchSnapshot();
});

it('renders a CTABanner correctly when invalid icon is specified', () => {
  const wrapper = render(
    <CTABanner
      nodeChildren={mockData.invalidIconSpecified.children as ASTNode[]}
      options={mockData.invalidIconSpecified.options}
    />,
  );
  expect(wrapper.getByRole('img')).toHaveAttribute('aria-label', 'Play Icon');
  expect(wrapper.asFragment()).toMatchSnapshot();
});

it('renders a CTABanner correctly when lowercase icon is specified', () => {
  const wrapper = render(
    <CTABanner
      nodeChildren={mockData.lowercaseIconSpecified.children as ASTNode[]}
      options={mockData.lowercaseIconSpecified.options}
    />,
  );
  expect(wrapper.getByRole('img')).toHaveAttribute('aria-label', 'Bell Icon');
  expect(wrapper.asFragment()).toMatchSnapshot();
});
