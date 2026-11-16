import { readFileSync } from 'fs';
import path from 'path';
import { render } from '@testing-library/react';
import { TocNavTree } from '@/mdx-components/UnifiedSidenav/TocNavTree';
import type { TocItem } from '@/mdx-components/UnifiedSidenav/types';

jest.mock('@/utils/isOfflineBuild', () => ({ isOfflineBuild: true }));
jest.mock('next/navigation', () => ({
  usePathname: () => '/docs/b/b1/',
  useRouter: () => ({ push: jest.fn() }),
}));
jest.mock('@/context/version-context', () => ({
  ...jest.requireActual('@/context/version-context'),
  useVersionContext: () => ({ activeVersions: {}, availableVersions: {} }),
}));

const sidenavScript = readFileSync(path.join(__dirname, '../../../scripts/offline-ui/sidenav-collapsible.js'), 'utf-8');

const items: TocItem[] = [
  {
    label: 'Alpha',
    collapsible: true,
    newUrl: '/docs/a/',
    items: [{ label: 'Alpha One', newUrl: '/docs/a/a1/' }],
  },
  {
    label: 'Beta',
    collapsible: true,
    newUrl: '/docs/b/',
    items: [
      { label: 'Beta One', newUrl: '/docs/b/b1/' },
      { label: 'Beta Two', newUrl: '/docs/b/b2/' },
    ],
  },
  {
    label: 'Gamma',
    group: true,
    items: [{ label: 'Gamma One', newUrl: '/docs/g/g1/' }],
  },
];

const renderOfflineTree = () => {
  const { container, unmount } = render(<TocNavTree items={items} slug="/docs/b/b1/" onDriverPress={jest.fn()} />);
  const html = container.innerHTML;
  unmount();
  document.body.innerHTML = html;
  new Function(sidenavScript)();
};

const row = (label: string) => document.querySelector<HTMLElement>(`[role="row"][data-toc-label="${label}"]`)!;
const rowContaining = (label: string) =>
  Array.from(document.querySelectorAll<HTMLElement>('[role="row"]')).find((r) => r.textContent?.includes(label))!;
const isShown = (el: HTMLElement) => el.style.display !== 'none';
const chevron = (r: HTMLElement) => r.querySelector<HTMLElement>('[slot="chevron"]')!;
const link = (r: HTMLElement) => r.querySelector<HTMLElement>('a[href]')!;

describe('offline sidenav tree (sidenav-collapsible.js)', () => {
  beforeEach(renderOfflineTree);

  it('collapses sections off the current path and hides their rows', () => {
    expect(row('Alpha').getAttribute('aria-expanded')).toBe('false');
    expect(isShown(rowContaining('Alpha One'))).toBe(false);
  });

  it('keeps the path to the current page open and visible', () => {
    expect(row('Beta').getAttribute('aria-expanded')).toBe('true');
    expect(isShown(rowContaining('Beta One'))).toBe(true);
    expect(isShown(rowContaining('Beta Two'))).toBe(true);
  });

  it('never toggles always-open rows', () => {
    const gamma = document.querySelector<HTMLElement>('[role="row"][data-always-open]')!;
    expect(gamma.textContent).toContain('Gamma');
    const before = gamma.getAttribute('aria-expanded');
    gamma.click();
    expect(gamma.getAttribute('aria-expanded')).toBe(before);
    expect(isShown(rowContaining('Gamma One'))).toBe(true);
  });

  it('toggles a section and its children from the chevron', () => {
    chevron(row('Alpha')).click();
    expect(row('Alpha').getAttribute('aria-expanded')).toBe('true');
    expect(isShown(rowContaining('Alpha One'))).toBe(true);
    chevron(row('Alpha')).click();
    expect(row('Alpha').getAttribute('aria-expanded')).toBe('false');
    expect(isShown(rowContaining('Alpha One'))).toBe(false);
  });

  it('opens a closed section from its link and leaves an open one open', () => {
    link(row('Alpha')).click();
    expect(row('Alpha').getAttribute('aria-expanded')).toBe('true');
    expect(isShown(rowContaining('Alpha One'))).toBe(true);
    link(row('Beta')).click();
    expect(row('Beta').getAttribute('aria-expanded')).toBe('true');
    expect(isShown(rowContaining('Beta One'))).toBe(true);
  });
});
