import { readFileSync } from 'fs';
import path from 'path';
import { render } from '@testing-library/react';
import ComposableTutorial from '@/mdx-components/ComposableTutorial';
import ComposableContent from '@/mdx-components/ComposableTutorial/ComposableContent';
import { PageContextProvider } from '@/context/page-context';
import type { PageTemplateType } from '@/types/ast';

jest.mock('@/utils/isOfflineBuild', () => ({ isOfflineBuild: true }));
jest.mock('next/navigation', () => ({
  useRouter: () => ({ push: jest.fn() }),
  useSearchParams: () => ({ toString: () => '' }),
}));
jest.mock('@/hooks/use-hash', () => ({ useHash: () => '', navigate: jest.fn() }));

const script = readFileSync(path.join(__dirname, '../../../scripts/offline-ui/composable-tutorial.js'), 'utf-8');

// interface has no dependencies; language only appears once interface=driver.
const composableOptions = [
  {
    value: 'interface',
    text: 'Interface',
    default: 'mongosh',
    dependencies: [],
    selections: [
      { value: 'driver', text: 'Driver' },
      { value: 'mongosh', text: 'Mongosh' },
    ],
  },
  {
    value: 'language',
    text: 'Language',
    default: 'python',
    dependencies: [{ interface: 'driver' }],
    selections: [
      { value: 'nodejs', text: 'Node.js' },
      { value: 'python', text: 'Python' },
    ],
  },
];

const renderOfflinePage = () => {
  const { container, unmount } = render(
    <PageContextProvider
      template={'document' as PageTemplateType}
      slug="/test"
      tabsMainColumn={null}
      options={{
        template: 'document' as PageTemplateType,
        composable_tutorial: { validSelections: [], refToSelection: {} },
      }}
    >
      <ComposableTutorial composableOptions={composableOptions}>
        <ComposableContent selections={{ interface: 'mongosh', language: 'None' }}>Mongosh content</ComposableContent>
        <ComposableContent selections={{ interface: 'driver', language: 'nodejs' }}>Node content</ComposableContent>
        <ComposableContent selections={{ interface: 'driver', language: 'python' }}>Python content</ComposableContent>
      </ComposableTutorial>
    </PageContextProvider>,
  );
  // Keep only the static HTML, as on an offline page.
  const html = container.innerHTML;
  unmount();
  document.body.innerHTML = html;
  new Function(script)();
  document.dispatchEvent(new Event('DOMContentLoaded'));
};

const option = (key: string) =>
  document.querySelector<HTMLElement>(`.configurable-option[data-option-value="${key}"]`)!;
const trigger = (key: string) => option(key).querySelector<HTMLButtonElement>('[aria-haspopup="listbox"]')!;
const list = (key: string) => option(key).querySelector<HTMLElement>('[data-offline-list]')!;
const choose = (key: string, value: string) => {
  trigger(key).click();
  list(key).querySelector<HTMLElement>(`[role="option"][data-key="${value}"]`)!.click();
};
const visibleContent = () =>
  Array.from(document.querySelectorAll<HTMLElement>('.composable-content[data-selections]'))
    .filter((el) => !el.hasAttribute('hidden'))
    .map((el) => el.textContent?.trim());

describe('offline ComposableTutorial (composable-tutorial.js)', () => {
  beforeEach(renderOfflinePage);

  it('applies each option default on load and shows the matching content', () => {
    expect(option('interface').dataset['selectionValue']).toBe('mongosh');
    expect(trigger('interface').querySelector('span')!.textContent).toBe('Mongosh');
    expect(option('language').hasAttribute('hidden')).toBe(true);
    expect(visibleContent()).toEqual(['Mongosh content']);
  });

  it('starts every list closed', () => {
    expect(list('interface').hidden).toBe(true);
    expect(list('language').hidden).toBe(true);
  });

  it('reveals a dependent option with its default once its dependency is met', () => {
    choose('interface', 'driver');
    expect(option('language').hasAttribute('hidden')).toBe(false);
    expect(option('language').dataset['selectionValue']).toBe('python');
    expect(visibleContent()).toEqual(['Python content']);
  });

  it('updates the selection, checkmark, label, and content when a choice changes', () => {
    choose('interface', 'driver');
    choose('language', 'nodejs');
    const nodejs = list('language').querySelector('[role="option"][data-key="nodejs"]')!;
    expect(nodejs.getAttribute('aria-selected')).toBe('true');
    expect(nodejs.querySelector('[slot="check"]')).not.toBeNull();
    expect(trigger('language').querySelector('span')!.textContent).toBe('Node.js');
    expect(list('language').hidden).toBe(true);
    expect(visibleContent()).toEqual(['Node content']);
  });
});
