import { render, screen, fireEvent, within } from '@testing-library/react';
import BreadcrumbContainer from '@/mdx-components/Breadcrumbs/breadcrumb-container';
import { reportAnalytics } from '@/utils/report-analytics';

jest.mock('next/navigation', () => ({
  useRouter: () => ({ push: jest.fn() }),
  usePathname: () => '/aggregation/pipeline/',
}));

jest.mock('@/utils/report-analytics', () => ({
  reportAnalytics: jest.fn(),
}));

const crumbs = [
  { title: 'Docs Home', path: '/docs' },
  { title: 'Aggregation', path: '/docs/manual/Aggregation' },
  { title: 'Pipeline', path: '/docs/manual/Aggregation/Pipeline' },
  { title: 'Stages', path: '/docs/manual/Aggregation/Pipeline/Stages' },
  { title: 'Operators', path: '/docs/manual/Aggregation/Pipeline/Operators' },
];

const crumbItem = (title: string) => screen.getByText(title).closest('li') as HTMLElement;

// Stands in for Via's container query, since jsdom loads no CSS.
const collapse = (titles: string[]) => titles.forEach((title) => (crumbItem(title).style.display = 'none'));

const openOverflowMenu = () => {
  fireEvent.click(screen.getByLabelText('Show all breadcrumbs'));
  return screen.getByRole('menu');
};

describe('BreadcrumbContainer', () => {
  beforeEach(() => jest.mocked(reportAnalytics).mockClear());

  it('lowercases visible crumbs and gives them a trailing slash', () => {
    render(<BreadcrumbContainer breadcrumbs={crumbs} />);

    expect(screen.getByRole('link', { name: 'Docs Home' })).toHaveAttribute('href', '/docs/');
    expect(screen.getByRole('link', { name: 'Operators' })).toHaveAttribute(
      'href',
      '/docs/manual/aggregation/pipeline/operators/',
    );
  });

  it('lowercases crumbs collapsed into the overflow menu', () => {
    render(<BreadcrumbContainer breadcrumbs={crumbs} />);
    collapse(['Aggregation', 'Pipeline']);

    const menu = openOverflowMenu();

    const items = within(menu).getAllByRole('menuitem');
    expect(items.map((item) => item.textContent)).toEqual(['Aggregation', 'Pipeline']);
    expect(items.map((item) => item.getAttribute('href'))).toEqual([
      '/docs/manual/aggregation/',
      '/docs/manual/aggregation/pipeline/',
    ]);
  });

  it('keeps the nearest ancestor a link', () => {
    render(<BreadcrumbContainer breadcrumbs={crumbs} />);

    expect(screen.getByRole('link', { name: 'Operators' })).not.toHaveAttribute('aria-current');
  });

  it('reports clicks on visible and collapsed crumbs alike', () => {
    render(<BreadcrumbContainer breadcrumbs={crumbs} />);
    collapse(['Aggregation', 'Pipeline']);

    fireEvent.click(screen.getByRole('link', { name: 'Stages' }));
    fireEvent.click(within(openOverflowMenu()).getByRole('menuitem', { name: 'Aggregation' }));

    expect(jest.mocked(reportAnalytics).mock.calls).toEqual([
      ['Click', expect.objectContaining({ label: '/docs/manual/aggregation/pipeline/stages/' })],
      ['Click', expect.objectContaining({ label: '/docs/manual/aggregation/' })],
    ]);
    expect(reportAnalytics).toHaveBeenCalledWith(
      'Click',
      expect.objectContaining({
        position: 'body',
        position_context: 'breadcrumb',
        tagbook: 'true',
      }),
    );
  });
});
