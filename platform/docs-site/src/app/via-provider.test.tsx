import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Link } from '@via-ds/components/typography';
import { ViaProviderWrapper } from './via-provider';
import { sameProjectHref } from '@/utils/base-path';

const router = { push: jest.fn() };
jest.mock('next/navigation', () => ({ useRouter: () => router }));
jest.mock('@/utils/base-path', () => ({ sameProjectHref: jest.fn() }));
const mockSameProjectHref = sameProjectHref as jest.Mock;
jest.mock('@via-ds/components/index.css', () => ({}));
jest.mock('@via-ds/icons/styles.css', () => ({}));

// jsdom lacks the Popover API that Via's Toaster calls on mount.
beforeAll(() => {
  HTMLElement.prototype.showPopover = jest.fn();
  HTMLElement.prototype.hidePopover = jest.fn();
});

const clickViaLink = async (href: string) => {
  render(
    <ViaProviderWrapper>
      <Link href={href}>Target</Link>
    </ViaProviderWrapper>,
  );
  await userEvent.click(screen.getByRole('link', { name: 'Target' }));
};

beforeEach(() => jest.clearAllMocks());

it('routes same-deploy Via links client-side via the basePath-relative href', async () => {
  mockSameProjectHref.mockReturnValue('/cluster/');

  await clickViaLink('/docs/atlas/cluster/');

  expect(mockSameProjectHref).toHaveBeenCalledWith('/docs/atlas/cluster/');
  expect(router.push).toHaveBeenCalledWith('/cluster/');
});

// jsdom's Location is sealed, so window.location.assign can't be spied on.
it('leaves cross-deploy Via links off the router', async () => {
  mockSameProjectHref.mockReturnValue(null);

  await clickViaLink('/docs/compass/current/');

  expect(mockSameProjectHref).toHaveBeenCalledWith('/docs/compass/current/');
  expect(router.push).not.toHaveBeenCalled();
});
