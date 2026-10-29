import { render, screen } from '@testing-library/react';
import BreadcrumbContainer from '@/mdx-components/Breadcrumbs/breadcrumb-container';

jest.mock('@/utils/isOfflineBuild', () => ({ isOfflineBuild: true }));

jest.mock('next/navigation', () => ({
  useRouter: () => ({ push: jest.fn() }),
  usePathname: () => '/aggregation/pipeline/',
}));

describe('BreadcrumbContainer offline', () => {
  it('points every crumb at an index.html file', () => {
    render(
      <BreadcrumbContainer
        breadcrumbs={[
          { title: 'Docs Home', path: '/docs' },
          { title: 'Aggregation', path: '/docs/manual/Aggregation/index.html' },
        ]}
      />,
    );

    expect(screen.getByRole('link', { name: 'Docs Home' })).toHaveAttribute('href', '/docs/index.html');
    expect(screen.getByRole('link', { name: 'Aggregation' })).toHaveAttribute(
      'href',
      '/docs/manual/aggregation/index.html',
    );
  });
});
