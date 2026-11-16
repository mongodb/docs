import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TocNavTree } from '@/mdx-components/UnifiedSidenav/TocNavTree';
import { sidenavAnalytics } from '@/mdx-components/UnifiedSidenav/UnifiedTocNavItems';
import type { TocItem } from '@/mdx-components/UnifiedSidenav/types';

jest.mock('next/navigation', () => ({
  useRouter: () => ({ push: jest.fn() }),
  usePathname: () => '/',
}));

jest.mock('@/mdx-components/UnifiedSidenav/UnifiedTocNavItems', () => ({
  ...jest.requireActual('@/mdx-components/UnifiedSidenav/UnifiedTocNavItems'),
  sidenavAnalytics: jest.fn(),
}));

jest.mock('@/mdx-components/UnifiedSidenav/VersionDropdown', () => ({ VersionDropdown: () => null }));

Element.prototype.scrollIntoView = jest.fn();

const items: TocItem[] = [
  {
    label: 'Atlas',
    newUrl: '/docs/atlas/',
    items: [
      { label: 'Introduction', newUrl: '/docs/atlas/' },
      {
        label: 'Clusters',
        newUrl: '/docs/atlas/clusters/',
        collapsible: true,
        items: [{ label: 'Create a Cluster', newUrl: '/docs/atlas/clusters/create/' }],
      },
      {
        label: 'Security',
        newUrl: '/docs/atlas/security/',
        collapsible: true,
        items: [{ label: 'Encryption', newUrl: '/docs/atlas/security/encryption/' }],
      },
      {
        label: 'Backup',
        newUrl: '/docs/atlas/backup/',
        collapsible: true,
        items: [{ label: 'Snapshots', newUrl: '/docs/atlas/backup/snapshots/' }],
      },
      { label: 'Terraform Provider', newUrl: 'https://registry.terraform.io/providers/mongodb/mongodbatlas/' },
      { label: 'Referral', newUrl: 'https://example.com/?ref=mongodb.com' },
      { label: 'Other Docs', newUrl: 'https://www.mongodb.com/docs/other/' },
    ],
  },
] as TocItem[];

const renderTree = (slug: string) => {
  const props = { items, isL1: true, onDriverPress: jest.fn() };
  const view = render(<TocNavTree {...props} slug={slug} />);
  return { rerender: (next: string) => view.rerender(<TocNavTree {...props} slug={next} />) };
};

const row = (label: string) => document.querySelector(`[data-toc-label="${label}"]`) as HTMLElement;
const isOpen = (label: string) => row(label).getAttribute('aria-expanded') === 'true';
const expandButton = (label: string) => within(row(label)).getAllByRole('button', { hidden: true })[0];
const link = (label: string) => screen.getByRole('link', { name: label });

describe('TocNavTree', () => {
  beforeEach(() => jest.mocked(sidenavAnalytics).mockClear());

  it('keeps user-opened sections open across navigation and swaps route-opened ones', async () => {
    const user = userEvent.setup();
    const { rerender } = renderTree('/docs/atlas/clusters/create/');

    expect(isOpen('Clusters')).toBe(true);
    expect(isOpen('Backup')).toBe(false);

    await user.click(expandButton('Backup'));
    expect(isOpen('Backup')).toBe(true);

    rerender('/docs/atlas/security/encryption/');

    expect(isOpen('Backup')).toBe(true);
    expect(isOpen('Clusters')).toBe(false);
    expect(isOpen('Security')).toBe(true);
    expect(link('Encryption')).toBeVisible();
  });

  it('marks only the child as current when an L1 shares its URL', () => {
    renderTree('/docs/atlas/');

    const current = document.querySelectorAll('[aria-current="page"]');
    expect(current).toHaveLength(1);
    expect(current[0]).toHaveTextContent('Introduction');
    expect(within(row('Atlas')).getAllByRole('link')[0]).not.toHaveAttribute('aria-current');
  });

  it('reports analytics for label links but not chevrons', async () => {
    const user = userEvent.setup();
    renderTree('/docs/atlas/clusters/create/');

    await user.click(link('Security'));
    expect(sidenavAnalytics).toHaveBeenCalledTimes(1);
    expect(sidenavAnalytics).toHaveBeenCalledWith('Security', expect.anything());

    jest.mocked(sidenavAnalytics).mockClear();
    await user.click(expandButton('Backup'));
    expect(sidenavAnalytics).not.toHaveBeenCalled();

    await user.click(link('Create a Cluster'));
    expect(sidenavAnalytics).toHaveBeenCalledTimes(1);
    expect(sidenavAnalytics).toHaveBeenCalledWith('Create a Cluster', expect.anything());
  });

  it('opens non-MongoDB links in a new tab and marks off-site links with an icon', () => {
    renderTree('/docs/atlas/');

    for (const label of ['Terraform Provider', 'Referral']) {
      expect(link(label)).toHaveAttribute('target', '_blank');
      expect(link(label)).toHaveAttribute('rel', 'noopener noreferrer');
      expect(link(label).querySelector('svg')).toBeInTheDocument();
    }

    expect(link('Other Docs')).not.toHaveAttribute('target');
    expect(link('Other Docs').querySelector('svg')).toBeInTheDocument();
    expect(link('Introduction').querySelector('svg')).not.toBeInTheDocument();
  });

  it('shows children only for the open L1 and reports presses on the others', async () => {
    const onL1Press = jest.fn();
    const l1s: TocItem[] = [
      ...items,
      { label: 'Tools', newUrl: '/docs/tools/', items: [{ label: 'Compass', newUrl: '/docs/compass/' }] },
    ];
    render(
      <TocNavTree items={l1s} slug="/docs/atlas/clusters/" isL1 onL1Press={onL1Press} onDriverPress={jest.fn()} />,
    );

    expect(row('Tools')).not.toHaveAttribute('aria-expanded');
    expect(screen.queryByText('Compass')).not.toBeInTheDocument();

    await userEvent.click(link('Tools'));
    expect(onL1Press).toHaveBeenCalledWith(l1s[1]);
  });

  it('opens the chosen L1, falling back to the current page when it no longer matches', () => {
    const l1s: TocItem[] = [
      ...items,
      { label: 'Tools', newUrl: '/docs/tools/', items: [{ label: 'Compass', newUrl: '/docs/compass/' }] },
    ];
    const props = { items: l1s, slug: '/docs/atlas/clusters/', isL1: true, onDriverPress: jest.fn() };
    const { rerender } = render(<TocNavTree {...props} openL1Url="/docs/tools/" />);
    expect(screen.getByText('Compass')).toBeInTheDocument();

    rerender(<TocNavTree {...props} openL1Url="/docs/atlas/v2/" />);
    expect(row('Atlas')).toHaveAttribute('aria-expanded', 'true');
    expect(screen.queryByText('Compass')).not.toBeInTheDocument();
  });

  it("names the version dropdown in its group row's label", () => {
    const groups: TocItem[] = [
      {
        label: 'Manual',
        group: true,
        versionDropdown: true,
        contentSite: 'docs',
        items: [{ label: 'Install', newUrl: '/docs/manual/install/' }],
      },
      { label: 'Tools', group: true, items: [{ label: 'Compass', newUrl: '/docs/compass/' }] },
    ];
    render(<TocNavTree items={groups} slug="/docs/manual/install/" onDriverPress={jest.fn()} />);

    expect(screen.getByRole('row', { name: 'Manual, View a different version of documentation.' })).toBeInTheDocument();
    expect(screen.getByRole('row', { name: 'Tools' })).toBeInTheDocument();
  });
});
