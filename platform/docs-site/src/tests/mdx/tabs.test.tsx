import { act, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Tabs, Tab } from '@/mdx-components/Tabs';
import { TabProvider } from '@/context/tabs-context';
import { reportAnalytics } from '@/utils/report-analytics';
import { mockLocation } from '../utils/mock-location';

jest.mock('@/utils/report-analytics', () => ({
  reportAnalytics: jest.fn(),
}));

beforeAll(() => {
  mockLocation({ hash: '' });
});

beforeEach(() => {
  jest.mocked(reportAnalytics).mockClear();
});

const mountTabs = (ui: React.ReactElement) => render(<TabProvider>{ui}</TabProvider>);

describe('Tabs MDX component', () => {
  describe('Tab unit tests', () => {
    it('tabs container exists with correct number of children', () => {
      const wrapper = mountTabs(
        <Tabs>
          <Tab tabid="list-view" name="List View">
            <p>List view content</p>
          </Tab>
          <Tab tabid="table-view" name="Table View">
            <p>Table view content</p>
          </Tab>
        </Tabs>,
      );
      expect(wrapper.queryAllByRole('tablist')).toHaveLength(1);
      expect(wrapper.queryAllByRole('tab')).toHaveLength(2);
    });

    it('active tab is set in DOM', () => {
      const wrapper = mountTabs(
        <Tabs>
          <Tab tabid="list-view" name="List View">
            <p>List view content</p>
          </Tab>
          <Tab tabid="table-view" name="Table View">
            <p>Table view content</p>
          </Tab>
        </Tabs>,
      );
      expect(wrapper.queryByRole('tab', { selected: true })).toBeTruthy();
    });

    it('exists non-active tab', () => {
      const wrapper = mountTabs(
        <Tabs>
          <Tab tabid="list-view" name="List View">
            <p>List view content</p>
          </Tab>
          <Tab tabid="table-view" name="Table View">
            <p>Table view content</p>
          </Tab>
        </Tabs>,
      );
      expect(wrapper.queryAllByRole('tab', { selected: false })).toHaveLength(1);
    });
  });

  describe('named tabset', () => {
    it('renders correct number of tabs for a named tabset', () => {
      const wrapper = mountTabs(
        <Tabs tabset="platforms">
          <Tab tabid="windows" name="Windows">
            <p>Windows content</p>
          </Tab>
          <Tab tabid="linux" name="Linux">
            <p>Linux content</p>
          </Tab>
          <Tab tabid="macos" name="macOS">
            <p>macOS content</p>
          </Tab>
        </Tabs>,
      );
      expect(wrapper.queryAllByRole('tablist')).toHaveLength(1);
      expect(wrapper.queryAllByRole('tab')).toHaveLength(3);
    });
  });

  describe('when a hidden tabset is passed in', () => {
    it('does not render a visible tabset', () => {
      const wrapper = mountTabs(
        <Tabs tabset="cloud" hidden>
          <Tab tabid="atlas" name="Atlas">
            <p>Atlas content</p>
          </Tab>
          <Tab tabid="local" name="Local">
            <p>Local content</p>
          </Tab>
        </Tabs>,
      );
      expect(wrapper.queryAllByRole('tablist')).toHaveLength(0);
    });
  });

  describe('interactions', () => {
    it('renders large tabs to match the 16px body text', () => {
      mountTabs(
        <Tabs>
          <Tab tabid="list-view" name="List View">
            <p>List view content</p>
          </Tab>
        </Tabs>,
      );
      expect(screen.getByRole('tab').className).toMatch(/_large\b/);
    });

    it('hides inactive panels', () => {
      mountTabs(
        <Tabs>
          <Tab tabid="list-view" name="List View">
            <p>List view content</p>
          </Tab>
          <Tab tabid="table-view" name="Table View">
            <p>Table view content</p>
          </Tab>
        </Tabs>,
      );
      expect(screen.getByText('List view content').closest('[role="tabpanel"]')).not.toHaveAttribute('hidden');
      expect(screen.getByText('Table view content').closest('[role="tabpanel"]')).toHaveAttribute('hidden');
    });

    it('reports a tab click to analytics', async () => {
      mountTabs(
        <Tabs>
          <Tab tabid="list-view" name="List View">
            <p>List view content</p>
          </Tab>
          <Tab tabid="table-view" name="Table View">
            <p>Table view content</p>
          </Tab>
        </Tabs>,
      );
      await userEvent.click(screen.getByRole('tab', { name: 'Table View' }));
      expect(reportAnalytics).toHaveBeenCalledTimes(1);
      expect(reportAnalytics).toHaveBeenCalledWith('Click', expect.objectContaining({ label: 'Table View' }));
    });

    it('reports a nested tab click only from the inner tabset', async () => {
      mountTabs(
        <Tabs tabset="outer">
          <Tab tabid="a" name="Outer A">
            <Tabs tabset="inner">
              <Tab tabid="x" name="Inner X">
                <p>Inner X content</p>
              </Tab>
              <Tab tabid="y" name="Inner Y">
                <p>Inner Y content</p>
              </Tab>
            </Tabs>
          </Tab>
          <Tab tabid="b" name="Outer B">
            <p>Outer B content</p>
          </Tab>
        </Tabs>,
      );
      await userEvent.click(screen.getByRole('tab', { name: 'Inner Y' }));
      expect(reportAnalytics).toHaveBeenCalledTimes(1);
      expect(reportAnalytics).toHaveBeenCalledWith('Click', expect.objectContaining({ label: 'Inner Y' }));
    });

    it('syncs selection across tabsets with the same name', async () => {
      mountTabs(
        <>
          {[1, 2].map((n) => (
            <Tabs key={n} tabset="platforms">
              <Tab tabid="windows" name="Windows">
                <p>Windows content {n}</p>
              </Tab>
              <Tab tabid="linux" name="Linux">
                <p>Linux content {n}</p>
              </Tab>
            </Tabs>
          ))}
        </>,
      );
      await userEvent.click(screen.getAllByRole('tab', { name: 'Linux' })[0]);
      const linuxTabs = screen.getAllByRole('tab', { name: 'Linux' });
      expect(linuxTabs.map((tab) => tab.getAttribute('aria-selected'))).toEqual(['true', 'true']);
    });
  });

  describe('hash target inside a tab', () => {
    let scrolledTo: Element[];
    const originalScrollIntoView = Element.prototype.scrollIntoView;

    beforeEach(() => {
      window.localStorage.clear();
      scrolledTo = [];
      Element.prototype.scrollIntoView = function scrollIntoView(this: Element) {
        scrolledTo.push(this);
      };
    });

    afterEach(() => {
      Element.prototype.scrollIntoView = originalScrollIntoView;
    });

    const mountCliAndUiTabs = () =>
      mountTabs(
        <Tabs tabset="interface">
          <Tab tabid="cli" name="CLI">
            <p>CLI content</p>
            <span id="in-cli" />
          </Tab>
          <Tab tabid="ui" name="UI">
            <p>UI content</p>
            <span id="in-ui" />
          </Tab>
        </Tabs>,
      );

    const selectedTab = () => screen.getByRole('tab', { selected: true });

    it('opens the tab that contains the target and scrolls it into view', async () => {
      mockLocation({ hash: '#in-ui' });
      mountCliAndUiTabs();

      await waitFor(() => expect(selectedTab()).toHaveTextContent('UI'));
      expect(screen.getByText('UI content').closest('[role="tabpanel"]')).not.toHaveAttribute('hidden');
      await waitFor(() => expect(scrolledTo).toEqual([document.getElementById('in-ui')]));
    });

    it('opens the tab when the hash changes after the page has loaded', async () => {
      mountCliAndUiTabs();
      expect(selectedTab()).toHaveTextContent('CLI');

      act(() => {
        mockLocation({ hash: '#in-ui' });
        window.dispatchEvent(new HashChangeEvent('hashchange'));
      });

      await waitFor(() => expect(selectedTab()).toHaveTextContent('UI'));
      await waitFor(() => expect(scrolledTo).toEqual([document.getElementById('in-ui')]));
    });

    it('scrolls to a target whose tab was already open', async () => {
      mockLocation({ hash: '#in-cli' });
      mountCliAndUiTabs();

      await waitFor(() => expect(scrolledTo).toEqual([document.getElementById('in-cli')]));
      expect(selectedTab()).toHaveTextContent('CLI');
    });

    it('scrolls to the target once per hash', async () => {
      mockLocation({ hash: '#in-ui' });
      mountCliAndUiTabs();
      await waitFor(() => expect(scrolledTo).toHaveLength(1));

      await userEvent.click(screen.getByRole('tab', { name: 'CLI' }));

      expect(scrolledTo).toHaveLength(1);
    });

    it('does not pull the reader back after they pick another tab', async () => {
      mockLocation({ hash: '#in-ui' });
      mountCliAndUiTabs();
      await waitFor(() => expect(selectedTab()).toHaveTextContent('UI'));

      await userEvent.click(screen.getByRole('tab', { name: 'CLI' }));

      expect(selectedTab()).toHaveTextContent('CLI');
    });

    it('opens every tab on the path to a target in nested tabs', async () => {
      mockLocation({ hash: '#deep' });
      mountTabs(
        <Tabs tabset="outer">
          <Tab tabid="a" name="Outer A">
            <p>Outer A content</p>
          </Tab>
          <Tab tabid="b" name="Outer B">
            <Tabs tabset="inner">
              <Tab tabid="x" name="Inner X">
                <p>Inner X content</p>
              </Tab>
              <Tab tabid="y" name="Inner Y">
                <span id="deep" />
              </Tab>
            </Tabs>
          </Tab>
        </Tabs>,
      );

      await waitFor(() => {
        expect(screen.getByRole('tab', { name: 'Outer B' })).toHaveAttribute('aria-selected', 'true');
        expect(screen.getByRole('tab', { name: 'Inner Y' })).toHaveAttribute('aria-selected', 'true');
      });
      expect(document.getElementById('deep')?.closest('[role="tabpanel"][hidden]')).toBeNull();
    });

    it('ignores a hash that is not on the page or is malformed', async () => {
      mockLocation({ hash: '#missing' });
      const { unmount } = mountCliAndUiTabs();
      await waitFor(() => expect(selectedTab()).toHaveTextContent('CLI'));
      unmount();

      mockLocation({ hash: '#%E0%A4%A' });
      mountCliAndUiTabs();
      await waitFor(() => expect(selectedTab()).toHaveTextContent('CLI'));
      expect(scrolledTo).toEqual([]);
    });
  });
});
