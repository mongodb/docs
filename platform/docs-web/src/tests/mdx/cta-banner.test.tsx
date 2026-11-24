import { render } from '@testing-library/react';
import { CTABanner } from '@/mdx-components/Banner/CTABanner';
import { useSnootyMetadata } from '@/utils/use-snooty-metadata';
import { mockLocation } from '@/tests/utils/mock-location';

jest.mock('@/utils/use-snooty-metadata', () => ({
  useSnootyMetadata: jest.fn(),
}));

beforeAll(() => {
  mockLocation({ hash: '' });
  (useSnootyMetadata as jest.Mock).mockImplementation(() => ({ project: 'docs-node', branch: 'v4.9' }));
});

const mockChildren = (
  <p>
    If you prefer learning through videos, try this lesson on{' '}
    <a href="https://university.mongodb.com/" target="_self">
      MongoDB University
    </a>
  </p>
);

const mockIconSpecifiedProps = {
  children: mockChildren,
  url: 'https://university.mongodb.com/',
  icon: 'University',
};
const mockNoIconSpecifiedProps = {
  children: mockChildren,
  url: 'https://university.mongodb.com/',
};
const mockInvalidIconSpecifiedProps = {
  children: mockChildren,
  url: 'https://university.mongodb.com/',
  icon: 'ThisIconDoesNotExist',
};
const mockLowercaseIconSpecifiedProps = {
  children: mockChildren,
  url: 'https://university.mongodb.com/',
  icon: 'bell',
};

it('renders a CTABanner correctly when non-default icon is specified', () => {
  const wrapper = render(<CTABanner {...mockIconSpecifiedProps} />);
  expect(wrapper.getByRole('img')).toHaveAttribute('aria-label', 'University Icon');
  expect(wrapper.asFragment()).toMatchSnapshot();
});

it('renders a CTABanner correctly when no icon is specified', () => {
  const wrapper = render(<CTABanner {...mockNoIconSpecifiedProps} />);
  expect(wrapper.getByRole('img')).toHaveAttribute('aria-label', 'Play Icon');
  expect(wrapper.asFragment()).toMatchSnapshot();
});

it('renders a CTABanner correctly when invalid icon is specified', () => {
  const wrapper = render(<CTABanner {...mockInvalidIconSpecifiedProps} />);
  expect(wrapper.getByRole('img')).toHaveAttribute('aria-label', 'Play Icon');
  expect(wrapper.asFragment()).toMatchSnapshot();
});

it('renders a CTABanner correctly when lowercase icon is specified', () => {
  const wrapper = render(<CTABanner {...mockLowercaseIconSpecifiedProps} />);
  expect(wrapper.getByRole('img')).toHaveAttribute('aria-label', 'Bell Icon');
  expect(wrapper.asFragment()).toMatchSnapshot();
});
