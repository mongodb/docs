import { render, screen, fireEvent } from '@testing-library/react';
import BreadcrumbContainer from '@/mdx-components/Breadcrumbs/breadcrumb-container';

jest.mock('next/navigation', () => ({
  useRouter: () => ({ push: jest.fn() }),
  usePathname: () => '/aggregation/pipeline/',
}));

// Enough crumbs that the mobile and tablet layouts collapse the middle ones
// into the ellipsis menu, which renders through a different link path.
const crumbs = [
  { title: 'Docs Home', path: '/docs' },
  { title: 'Aggregation', path: '/docs/manual/Aggregation' },
  { title: 'Pipeline', path: '/docs/manual/Aggregation/Pipeline' },
  { title: 'Stages', path: '/docs/manual/Aggregation/Pipeline/Stages' },
  { title: 'Operators', path: '/docs/manual/Aggregation/Pipeline/Operators' },
];

const hrefsFor = (title: string) =>
  screen.getAllByText(title).map((node) => node.closest('a')?.getAttribute('href'));

describe('BreadcrumbContainer', () => {
  it('lowercases visible crumbs and gives them a trailing slash', () => {
    render(<BreadcrumbContainer breadcrumbs={crumbs} />);

    expect(hrefsFor('Docs Home')).not.toHaveLength(0);
    hrefsFor('Docs Home').forEach((href) => expect(href).toBe('/docs/'));
    hrefsFor('Operators').forEach((href) => expect(href).toBe('/docs/manual/aggregation/pipeline/operators/'));
  });

  it('lowercases crumbs collapsed into the ellipsis menu', () => {
    render(<BreadcrumbContainer breadcrumbs={crumbs} />);

    fireEvent.click(screen.getAllByLabelText('Show all breadcrumbs')[0]);

    // "Aggregation" is only reachable through the collapsed menu at this width.
    const hrefs = hrefsFor('Aggregation');
    expect(hrefs).not.toHaveLength(0);
    hrefs.forEach((href) => expect(href).toBe('/docs/manual/aggregation/'));
  });
});
