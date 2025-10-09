import { render } from '@testing-library/react';
import { ThemeProvider } from '@emotion/react';
import Tabs from '@/components/tabs';
import { TabProvider } from '@/context/tabs-context';
import { theme } from '@/styles/theme';

// data for this component
import mockDataPlatforms from '@/tests/data/tabs-platform.test.json';
import mockDataLanguages from '@/tests/data/tabs-languages.test.json';
import mockDataHidden from '@/tests/data/tabs-hidden.test.json';
import mockDataAnonymous from '@/tests/data/tabs-anonymous.test.json';
import type { TabsNode } from '@/types/ast';

const mountTabs = ({ mockData }: { mockData: TabsNode }) => {
  return render(
    <ThemeProvider theme={theme}>
      <TabProvider>
        <Tabs nodeChildren={mockData.children} options={mockData.options} />
      </TabProvider>
    </ThemeProvider>,
  );
};

describe('Tabs testing', () => {
  describe('Tab unit tests', () => {
    const mockAddTabset = jest.fn();

    it('tabs container exists with correct number of children', () => {
      const wrapper = mountTabs({
        mockData: mockDataAnonymous as TabsNode,
      });
      const tabCount = mockDataAnonymous.children.length;
      expect(wrapper.queryAllByRole('tablist')).toHaveLength(1);
      expect(wrapper.queryAllByRole('tab')).toHaveLength(tabCount);
    });

    it('did not call mockAddTabset for a non-guides tabset', () => {
      const wrapper = mountTabs({
        mockData: mockDataAnonymous as TabsNode,
      });
      expect(wrapper.queryAllByRole('tablist')).toHaveLength(1);
      expect(mockAddTabset.mock.calls.length).toBe(0);
    });

    it('active tab is set in DOM', () => {
      const wrapper = mountTabs({
        mockData: mockDataAnonymous as TabsNode,
      });
      expect(wrapper.queryByRole('tab', { selected: true })).toBeTruthy();
    });

    it('exists non-active tab', () => {
      const wrapper = mountTabs({
        mockData: mockDataAnonymous as TabsNode,
      });
      expect(wrapper.queryAllByRole('tab', { selected: false })).toBeTruthy();
    });
  });

  describe('Ecosystem unit tests', () => {
    it('tabset should be created for drivers/language pills', () => {
      process.env = Object.assign(process.env, { GATSBY_SITE: 'ecosystem' });
      const wrapper = mountTabs({
        mockData: mockDataLanguages as TabsNode,
      });
      expect(wrapper.queryAllByRole('tablist')).toHaveLength(1);
    });
  });

  describe('when a hidden tabset is passed in', () => {
    it('does not render a tabset', () => {
      const wrapper = mountTabs({
        mockData: mockDataHidden as TabsNode,
      });
      expect(wrapper.queryAllByRole('tablist')).toHaveLength(0);
    });
  });

  describe('when javascript is disabled', () => {
    it('renders tabs in the set', () => {
      const wrapper = mountTabs({
        mockData: mockDataPlatforms as TabsNode,
      });
      expect(wrapper.queryAllByRole('tablist')).toHaveLength(1);
    });
  });
});
