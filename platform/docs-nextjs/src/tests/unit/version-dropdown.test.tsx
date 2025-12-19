import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { tick } from '@/tests/utils';
import { mockDocsets } from '@/tests/utils/mock-docsets';
import { mockLocation } from '@/tests/utils/mock-location';
import { VersionContextProvider } from '@/context/version-context';
import VersionDropdown from '@/components/unified-sidenav/VersionDropdown';
import { useSnootyMetadata } from '@/utils/use-snooty-metadata';

const mockPush = jest.fn();
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

jest.mock('@/utils/use-snooty-metadata', () => ({
  useSnootyMetadata: jest.fn(),
}));

beforeAll(() => {
  // Use 'current' as the branch name, which matches the gitBranchName in mock-docsets.ts
  // The branch with label "v4.11 (current)" has gitBranchName: 'current'
  (useSnootyMetadata as jest.Mock).mockImplementation(() => ({ project: 'docs-node', branch: 'current', eol: false }));
});

const mountConsumer = async () => {
  const res = render(
    <VersionContextProvider docsets={mockDocsets} slug="/" env="production">
      <VersionDropdown />
    </VersionContextProvider>,
  );
  // Wait for any on-mount updates to occur. Prevents warnings about needing to wrap updates in act()
  await tick();
  return res;
};

describe('VersionDropdown', () => {
  describe('Component', () => {
    // jest.useFakeTimers();

    beforeEach(() => {
      mockPush.mockClear();
    });

    it('renders correctly', async () => {
      const tree = await mountConsumer();
      expect(tree.asFragment()).toMatchSnapshot();
    });

    it('renders the dropdown with the correct version', async () => {
      await mountConsumer();
      await screen.findByRole('button', { name: 'v4.11 (current)' });
    });

    it('show version options when user clicks button', async () => {
      const user = userEvent.setup();
      await mountConsumer();

      // Find the button by test id
      const versionDropdown = screen.getByTestId('leafygreen-ui-select-menubutton');

      // Verify listbox is not visible initially
      const listboxBefore = screen.queryByRole('listbox');
      expect(listboxBefore).not.toBeInTheDocument();

      // Click the button to open the dropdown
      await user.click(versionDropdown);

      // Wait for the listbox to appear
      const versionOptionsDropdown = await screen.findByRole('listbox', {}, { timeout: 3000 });
      expect(versionOptionsDropdown).toBeInTheDocument();
    });

    it('calls the navigate function when a user clicks on a version', async () => {
      const user = userEvent.setup({ pointerEventsCheck: 0 });
      await mountConsumer();

      // Find the button by test id
      const versionDropdown = screen.getByTestId('leafygreen-ui-select-menubutton');

      // Verify listbox is not visible initially
      const listboxBefore = screen.queryByRole('listbox');
      expect(listboxBefore).not.toBeInTheDocument();

      // Click the button to open the dropdown
      await user.click(versionDropdown);

      // Wait for the listbox to appear
      const versionOptionsDropdown = await screen.findByRole('listbox', {}, { timeout: 3000 });
      const versionOptions = within(versionOptionsDropdown).queryAllByRole('option');
      expect(versionOptions.length).toBe(3);

      await user.click(versionOptions[2]);

      expect(mockPush).toHaveBeenCalled();
      expect(mockPush).toHaveBeenCalledWith('/docs/languages/node/v4.9/');
    });

    it('calls the navigate function for translated pages', async () => {
      const user = userEvent.setup({ pointerEventsCheck: 0 });
      // Pretend page exists on Korean-translated site
      mockLocation({ pathname: '/ko-kr/docs-test/drivers/node/current' });

      await mountConsumer();

      // Find the button by test id
      const versionDropdown = screen.getByTestId('leafygreen-ui-select-menubutton');

      // Verify listbox is not visible initially
      const listboxBefore = screen.queryByRole('listbox');
      expect(listboxBefore).not.toBeInTheDocument();

      // Click the button to open the dropdown
      await user.click(versionDropdown);

      // Wait for the listbox to appear
      const versionOptionsDropdown = await screen.findByRole('listbox', {}, { timeout: 3000 });
      const versionOptions = within(versionOptionsDropdown).queryAllByRole('option');
      expect(versionOptions.length).toBe(3);

      await user.click(versionOptions[0]);

      expect(mockPush).toHaveBeenCalledWith('/ko-kr/docs/languages/node/upcoming/');
    });
  });
});
