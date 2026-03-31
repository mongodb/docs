import { render } from '@testing-library/react';
import { TabContext } from '@/context/tabs-context';
import { TabsSelector } from '@/mdx-components/TabsSelector';

const windowsTextNode = { type: 'text', value: 'Windows' };
const linuxTextNode = { type: 'text', value: 'Linux' };

const mockSelectors = {
  platforms: {
    windows: [windowsTextNode],
    linux: [linuxTextNode],
  },
};

const mockActiveTabs = { platforms: 'windows' };

const mockTabContext = {
  activeTabs: mockActiveTabs,
  selectors: mockSelectors,
  setActiveTab: jest.fn(),
  setInitialTabs: jest.fn(),
  setLanguageSelectorTab: jest.fn(),
};

const renderTabsSelector = (props = {}) =>
  render(
    <TabContext.Provider value={mockTabContext}>
      <TabsSelector {...props} />
    </TabContext.Provider>,
  );

describe('TabsSelector', () => {
  it('renders null when selectors is empty', () => {
    const { container } = render(
      <TabContext.Provider value={{ ...mockTabContext, selectors: {} }}>
        <TabsSelector />
      </TabContext.Provider>,
    );
    expect(container.firstChild).toBeNull();
  });

  it('renders a selector for each entry in selectors', () => {
    const { getAllByRole } = renderTabsSelector();
    // Each TabSelector renders a <button> for the LeafyGreen Select trigger
    expect(getAllByRole('button')).toHaveLength(1);
  });

  it('matches snapshot', () => {
    const { asFragment } = renderTabsSelector();
    expect(asFragment()).toMatchSnapshot();
  });
});
