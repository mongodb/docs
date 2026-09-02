import { navigateToDocsPath } from '@/utils/navigate-to-docs-path';
import { sameProjectHref } from '@/utils/base-path';

jest.mock('@/utils/base-path', () => ({
  sameProjectHref: jest.fn(),
}));

const mockSameProjectHref = sameProjectHref as jest.Mock;
const router = { push: jest.fn() } as unknown as Parameters<typeof navigateToDocsPath>[0];
// jsdom's Location is sealed, so window.location.assign can't be spied on.
// Assert the router branch and, for full page loads, that the router is untouched.
const mockPush = (router as unknown as { push: jest.Mock }).push;

beforeEach(() => {
  jest.clearAllMocks();
});

it('routes same-deploy paths client-side with the basePath stripped', () => {
  mockSameProjectHref.mockReturnValue('/atlas-cli/install/');

  navigateToDocsPath(router, '/docs/atlas/cli/atlas-cli/install/');

  expect(mockSameProjectHref).toHaveBeenCalledWith('/docs/atlas/cli/atlas-cli/install/');
  expect(mockPush).toHaveBeenCalledWith('/atlas-cli/install/');
});

it('does not route cross-deploy paths through the router', () => {
  mockSameProjectHref.mockReturnValue(null);

  navigateToDocsPath(router, '/docs/development/');

  expect(mockPush).not.toHaveBeenCalled();
});

it('does not consult sameProjectHref for external urls', () => {
  navigateToDocsPath(router, 'https://university.mongodb.com/courses/M001/about');

  expect(mockSameProjectHref).not.toHaveBeenCalled();
  expect(mockPush).not.toHaveBeenCalled();
});
