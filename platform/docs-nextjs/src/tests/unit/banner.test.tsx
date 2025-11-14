import { render } from '@testing-library/react';
import Banner, { type BannerOptions } from '@/components/banner/banner';
import OfflineBanner from '@/components/banner/offline-banner';

// data for this component
import { getCurrLocale } from '@/utils/locale';
import type { ASTNode } from '@/types/ast';
import mockData from '../data/banner.test.json';
// locale data for this component
import mockDataWithLocale from '../data/banner-locale.test.json';

jest.mock('@/utils/locale', () => ({
  getCurrLocale: jest.fn().mockReturnValue('en-US'),
}));

// Tell TypeScript that getCurrLocale is a Jest mock
const mockGetCurrLocale = jest.mocked(getCurrLocale);

describe('Snapshots', () => {
  it.skip('renders a Banner correctly', () => {
    const wrapper = render(<Banner nodeChildren={mockData.children as ASTNode[]} />);
    expect(wrapper.asFragment()).toMatchSnapshot();
  });

  it.skip('renders a Banner correctly for a beta locale', () => {
    const wrapper = render(
      <Banner
        nodeChildren={mockDataWithLocale.children as ASTNode[]}
        options={mockDataWithLocale.options as BannerOptions}
      />,
    );
    expect(wrapper.asFragment()).toMatchSnapshot();
  });

  it.skip('renders an offline banner correctly', () => {
    const wrapper = render(<OfflineBanner />);
    expect(wrapper.asFragment()).toMatchSnapshot();
  });
});

// TODO: add back in once locale is implemented
describe('Conditionally rendering banner as language callout', () => {
  it.skip('Should NOT render banner if locale is not within the beta locale', () => {
    const { queryByRole } = render(
      <Banner
        nodeChildren={mockDataWithLocale.children as ASTNode[]}
        options={mockDataWithLocale.options as BannerOptions}
      />,
    );
    const banner = queryByRole('alert');
    expect(banner).not.toBeInTheDocument();
  });

  it('Should render banner if locale is a beta locale', () => {
    // Mock one of the beta locales
    mockGetCurrLocale.mockReturnValue('es');
    const { getByRole } = render(
      <Banner
        nodeChildren={mockDataWithLocale.children as ASTNode[]}
        options={mockDataWithLocale.options as BannerOptions}
      />,
    );
    const banner = getByRole('alert');
    expect(banner).toBeVisible();
  });
});
