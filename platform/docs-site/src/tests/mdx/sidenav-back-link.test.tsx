import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { AccordionNavPanel } from '@/mdx-components/UnifiedSidenav/AccordionNav';
import { DoublePannedNav } from '@/mdx-components/UnifiedSidenav/DoublePannedNav';
import type { TocItem } from '@/mdx-components/UnifiedSidenav/types';

jest.mock('next/navigation', () => ({
  useRouter: () => ({ push: jest.fn() }),
  usePathname: () => '/',
}));
jest.mock('@/context/version-context', () => ({
  ...jest.requireActual('@/context/version-context'),
  useVersionContext: () => ({ activeVersions: {}, availableVersions: {} }),
}));
jest.mock('@/hooks/use-screen-size', () => () => ({ isTabletOrMobile: false }));
jest.mock('@/mdx-components/ActionBar/ProductTabs', () => ({ ProductTabs: () => null }));
jest.mock('@/mdx-components/offline-download-modal/download-button', () => ({ DownloadButton: () => null }));

Element.prototype.scrollIntoView = jest.fn();

const driver: TocItem = {
  label: 'Node.js Driver',
  newUrl: '/docs/drivers/node/',
  showSubNav: true,
  items: [{ label: 'Quick Start', newUrl: '/docs/drivers/node/quick-start/' }],
} as TocItem;
const l1: TocItem = { label: 'Client Libraries', newUrl: '/docs/drivers/', items: [driver] } as TocItem;

const props = (setShowDriverBackBtn: jest.Mock) => ({
  showDriverBackBtn: true,
  setShowDriverBackBtn,
  slug: '/docs/drivers/node/quick-start/',
  currentL1: l1,
  currentL2s: driver,
  setCurrentL1: jest.fn(),
  setCurrentL2s: jest.fn(),
  tree: [l1],
});

describe.each([
  ['AccordionNavPanel', (p: ReturnType<typeof props>) => <AccordionNavPanel {...p} hideMobile={false} />],
  ['DoublePannedNav', (p: ReturnType<typeof props>) => <DoublePannedNav {...p} />],
])('%s driver back link', (_, renderNav) => {
  it('links to the owning L1 and closes the driver panel when pressed', async () => {
    const setShowDriverBackBtn = jest.fn();
    render(renderNav(props(setShowDriverBackBtn)));

    const back = screen.getByRole('link', { name: /Back to Client Libraries/ });
    expect(back).toHaveAttribute('href', '/docs/drivers/');

    await userEvent.setup().click(back);
    expect(setShowDriverBackBtn).toHaveBeenCalledWith(false);
  });
});
