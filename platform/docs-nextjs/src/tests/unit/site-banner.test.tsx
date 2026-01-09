import { render, screen } from '@testing-library/react';
import { palette } from '@leafygreen-ui/palette';
import SiteBanner from '@/components/banner/site-banner';
import type { SiteBannerContent } from '@/components/banner/site-banner/types';
import * as BannerContext from '@/components/banner/site-banner/banner-context'; // match component import
import * as BannerService from '@/services/db/banner';
import { tick } from '../utils';

jest.mock('@/components/banner/site-banner/banner-context', () => {
  const actual = jest.requireActual('@/components/banner/site-banner/banner-context');
  return { ...actual, useSiteBanner: jest.fn() };
});

jest.mock('@/services/db/banner', () => ({
  getBannerData: jest.fn(),
}));

const useSiteBanner = BannerContext.useSiteBanner as unknown as jest.Mock;

beforeEach(() => {
  jest.resetAllMocks();
  // Default so tests that don't override still work
  useSiteBanner.mockReturnValue({ bannerData: null, hasBanner: true });
});

const mockBannerContent: SiteBannerContent = {
  isEnabled: true,
  altText: 'Test Banner',
  imgPath: '/banners/test.png',
  tabletImgPath: '/banners/test-tablet.png',
  mobileImgPath: '/banners/test-mobile.png',
  url: 'https://mongodb.com',
};

describe('SiteBanner component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.useRealTimers();
  });
  it('renders without a banner image', () => {
    // bannerContent state should remain null
    const wrapper = render(<SiteBanner />);
    expect(wrapper.queryByAltText(mockBannerContent.altText)).toBeNull();
  });
  it('renders nothing when banner data is null', () => {
    useSiteBanner.mockReturnValue({ bannerData: null });

    const { container } = render(<SiteBanner />);
    expect(container.firstChild).toBeNull();
  });

  it('renders nothing when banner has no url', () => {
    useSiteBanner.mockReturnValue({
      bannerData: { ...mockBannerContent, url: '' },
    });

    const { container } = render(<SiteBanner />);
    expect(container.firstChild).toBeNull();
  });

  it('renders nothing when banner has no imgPath or text', () => {
    useSiteBanner.mockReturnValue({
      bannerData: { ...mockBannerContent, imgPath: undefined, text: undefined },
    });

    const { container } = render(<SiteBanner />);
    expect(container.firstChild).toBeNull();
  });

  it('renders with a banner image', () => {
    useSiteBanner.mockReturnValue({ bannerData: mockBannerContent });

    const { container } = render(<SiteBanner />);
    const link = container.querySelector('a[href="https://mongodb.com"]');

    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('title', 'Test Banner');
    expect(link).toHaveClass('site-banner');
  });

  it('renders with custom text and pill', () => {
    const bannerWithText: SiteBannerContent = {
      isEnabled: true,
      altText: 'Custom Banner',
      bgColor: '#00684A',
      text: 'This is custom banner text',
      pillText: 'NEW',
      url: 'https://mongodb.com/new',
    };

    useSiteBanner.mockReturnValue({ bannerData: bannerWithText });

    render(<SiteBanner />);

    expect(screen.getByText('This is custom banner text')).toBeInTheDocument();
    expect(screen.getByText('NEW')).toBeInTheDocument();
  });

  it('renders with a banner image (snapshot)', async () => {
    jest.useFakeTimers();
    (BannerService.getBannerData as jest.Mock).mockResolvedValueOnce(mockBannerContent);
    useSiteBanner.mockReturnValue({ bannerData: mockBannerContent, hasBanner: true });
    const wrapper = render(<SiteBanner />);
    await tick();
    expect(wrapper.asFragment()).toMatchSnapshot();
  });

  it('renders with custom text (snapshot)', async () => {
    jest.useFakeTimers();
    const bannerContent: SiteBannerContent = {
      isEnabled: true,
      altText: mockBannerContent.altText,
      bgColor: palette.green.dark3,
      text: 'This is custom banner text',
      pillText: 'DOP',
      url: mockBannerContent.url,
    };
    (BannerService.getBannerData as jest.Mock).mockResolvedValueOnce(bannerContent);
    useSiteBanner.mockReturnValue({ bannerData: bannerContent, hasBanner: true });
    const wrapper = render(<SiteBanner />);
    await tick();
    expect(wrapper.asFragment()).toMatchSnapshot();
  });
});
