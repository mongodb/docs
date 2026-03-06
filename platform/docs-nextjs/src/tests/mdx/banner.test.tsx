import { render } from '@testing-library/react';
import { Banner } from '@/mdx-components/Banner';
import { getCurrLocale } from '@/utils/locale';

jest.mock('@/utils/locale', () => ({
  getCurrLocale: jest.fn().mockReturnValue('en-US'),
}));

const mockGetCurrLocale = jest.mocked(getCurrLocale);

describe('Snapshots', () => {
  it.skip('renders a Banner correctly', () => {
    const wrapper = render(<Banner>This is a banner message</Banner>);
    expect(wrapper.asFragment()).toMatchSnapshot();
  });

  it.skip('renders a Banner correctly for a beta locale', () => {
    const wrapper = render(
      <Banner variant="info" locale="es">
        This is a localized banner message
      </Banner>,
    );
    expect(wrapper.asFragment()).toMatchSnapshot();
  });
});

describe('Conditionally rendering banner as language callout', () => {
  it.skip('Should NOT render banner if locale is not within the beta locale', () => {
    const { queryByRole } = render(
      <Banner variant="info" locale="es">
        This is a localized banner message
      </Banner>,
    );
    const banner = queryByRole('alert');
    expect(banner).not.toBeInTheDocument();
  });

  it('Should render banner if locale is a beta locale', () => {
    mockGetCurrLocale.mockReturnValue('es');
    const { getByRole } = render(
      <Banner variant="info" locale="es">
        This is a localized banner message
      </Banner>,
    );
    const banner = getByRole('alert');
    expect(banner).toBeVisible();
  });
});
