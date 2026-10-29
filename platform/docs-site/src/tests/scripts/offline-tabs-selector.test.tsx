import { readFileSync } from 'fs';
import path from 'path';
import { render } from '@testing-library/react';
import { TabContext } from '@/context/tabs-context';
import { TabsSelector } from '@/mdx-components/TabsSelector';
import type { TextNode } from '@/types/ast';

jest.mock('@/utils/isOfflineBuild', () => ({ isOfflineBuild: true }));

const tabsScript = readFileSync(path.join(__dirname, '../../../scripts/offline-ui/tabs.js'), 'utf-8');

const text = (value: string): TextNode => ({ type: 'text', value });

// A selector-controlled tabset renders its tab list hidden.
const tabset = `
  <div data-tabset="drivers">
    <div hidden>
      <div role="tablist">
        <button role="tab" data-key="c" aria-selected="true">C</button>
        <button role="tab" data-key="go" aria-selected="false">Go</button>
      </div>
    </div>
    <div role="tabpanel" id="panel-c">C content</div>
    <div role="tabpanel" id="panel-go">Go content</div>
  </div>`;

const renderOfflinePage = () => {
  const { container, unmount } = render(
    <TabContext.Provider
      value={{
        // A static export never runs TabContext's effect.
        activeTabs: {},
        selectors: { drivers: { c: [text('C')], go: [text('Go')] } },
        setActiveTab: jest.fn(),
        setInitialTabs: jest.fn(),
        setLanguageSelectorTab: jest.fn(),
      }}
    >
      <TabsSelector />
    </TabContext.Provider>,
  );
  // Keep only the static HTML, as on an offline page.
  const selector = container.innerHTML;
  unmount();
  document.body.innerHTML = selector + tabset;
  new Function(tabsScript)();
};

const trigger = () => document.querySelector<HTMLButtonElement>('[data-offline-selector] [aria-haspopup="listbox"]')!;
const menu = () => document.querySelector<HTMLElement>('[data-offline-selector] [data-offline-list]')!;
const choice = (key: string) => menu().querySelector<HTMLElement>(`[role="option"][data-key="${key}"]`)!;
const panel = (id: string) => document.getElementById(id)!;
const triggerValue = () => trigger().querySelector('span')!;

describe('offline TabsSelector (tabs.js)', () => {
  beforeEach(renderOfflinePage);

  it('renders the menu closed and shows the initial tab', () => {
    expect(menu().hidden).toBe(true);
    expect(panel('panel-c').hidden).toBe(false);
    expect(panel('panel-go').hidden).toBe(true);
  });

  it('labels the trigger and selects the option for the initially shown tab', () => {
    expect(triggerValue().textContent).toBe('C');
    expect(triggerValue().hasAttribute('data-placeholder')).toBe(false);
    expect(choice('c').getAttribute('aria-selected')).toBe('true');
    expect(choice('c').querySelector('[slot="check"]')).not.toBeNull();
  });

  it('renders the driver icon in each option, as the live Select does', () => {
    expect(choice('go').querySelector('[slot="icon"]')).not.toBeNull();
    expect(choice('c').querySelector('[slot="icon"]')).not.toBeNull();
  });

  it('opens and closes the menu from the trigger', () => {
    trigger().click();
    expect(menu().hidden).toBe(false);
    expect(trigger().getAttribute('aria-expanded')).toBe('true');
    trigger().click();
    expect(menu().hidden).toBe(true);
    expect(trigger().getAttribute('aria-expanded')).toBe('false');
  });

  it('switches the matching tabset, updates the label, and closes when an option is chosen', () => {
    trigger().click();
    choice('go').click();
    expect(panel('panel-go').hidden).toBe(false);
    expect(panel('panel-c').hidden).toBe(true);
    expect(triggerValue().textContent).toBe('Go');
    expect(triggerValue().querySelector('[slot="icon"]')).not.toBeNull();
    expect(menu().hidden).toBe(true);
  });

  it('moves the selection and checkmark to the chosen option', () => {
    trigger().click();
    choice('go').click();
    expect(choice('go').getAttribute('aria-selected')).toBe('true');
    expect(choice('go').getAttribute('data-selected')).toBe('true');
    expect(choice('go').querySelectorAll('[slot="check"]')).toHaveLength(1);
    expect(choice('c').getAttribute('aria-selected')).toBe('false');
    expect(choice('c').querySelector('[slot="check"]')).toBeNull();
  });

  it('closes when clicking outside', () => {
    trigger().click();
    document.body.click();
    expect(menu().hidden).toBe(true);
  });
});
