import { render } from '@testing-library/react';
import { ThemeProvider } from '@emotion/react';
import { Tabs, Tab } from '@/mdx-components/Tabs';
import { TabProvider } from '@/context/tabs-context';
import { theme } from '@/styles/theme';
import { mockLocation } from '../utils/mock-location';

beforeAll(() => {
  mockLocation({ hash: '' });
});

const mountTabs = (ui: React.ReactElement) =>
  render(
    <ThemeProvider theme={theme}>
      <TabProvider>{ui}</TabProvider>
    </ThemeProvider>,
  );

describe('Tabs MDX component', () => {
  describe('Tab unit tests', () => {
    it('tabs container exists with correct number of children', () => {
      const wrapper = mountTabs(
        <Tabs tabids="list-view,table-view">
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
        <Tabs tabids="list-view,table-view">
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
        <Tabs tabids="list-view,table-view">
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
        <Tabs tabset="platforms" tabids="windows,linux,macos">
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
        <Tabs tabset="cloud" hidden tabids="atlas,local">
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
});
