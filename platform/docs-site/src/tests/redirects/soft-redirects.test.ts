import { findSoftRedirect } from '@/redirects/soft-redirects';

jest.mock('@/redirects/all-redirects', () => ({
  allRedirects: [
    {
      source: '/docs/drivers/node/current/fundamentals/connection/',
      destination: '/docs/drivers/node/current/connect/',
      statusCode: 301,
    },
    {
      source: '/docs/drivers/node/:version/quick-start/',
      destination: '/docs/drivers/node/:version/get-started/',
      statusCode: 301,
    },
    {
      source: '/docs/drivers/node/v7.2/:path*',
      destination: '/docs/drivers/node/v7.x/:path*',
      statusCode: 301,
    },
    {
      source: '/docs/atlas/additional-resources/',
      destination: '/docs/atlas/',
      statusCode: 301,
    },
    {
      source:
        '/docs/kubernetes/current/reference-architectures/multi-cluster/multi-cluster-sharded-cluster/',
      destination:
        '/docs/kubernetes/current/reference-architectures/multi-cluster/sharded-cluster/',
      statusCode: 301,
    },
    { source: '/docs/charts/atlas/', destination: '/docs/charts/', statusCode: 301 },
    {
      source: '/docs/voyageai/management/azure-marketplace/',
      destination: '/docs/voyageai/management/azure-foundry/',
      statusCode: 301,
    },
    {
      source: '/docs/sql-interface/connect/jdbc/',
      destination: '/docs/sql-interface/install-driver/',
      statusCode: 301,
    },
    {
      source: '/docs/mongocli/current/command/mongocli-atlas-accessLists-create/',
      destination: '/docs/atlas/cli/current/migrate-to-atlas-cli/',
      statusCode: 301,
    },
    {
      source: '/docs/cloud-manager/agents/',
      destination: '/docs/cloud-manager/tutorial/nav/mongodb-agent/',
      statusCode: 301,
    },
    {
      source: '/docs/force-only/',
      destination: '/docs/should-not-apply/',
      statusCode: 301,
      force: true,
    },
  ],
}));

describe('soft-redirects', () => {
  describe('findSoftRedirect', () => {
    it('matches a known page-specific redirect', () => {
      const result = findSoftRedirect('/docs/drivers/node/current/fundamentals/connection/');
      expect(result).not.toBeNull();
      expect(result!.destination).toBe('/docs/drivers/node/current/connect/');
      expect(result!.statusCode).toBe(301);
    });

    it('matches a parametrized redirect across versions', () => {
      const result = findSoftRedirect('/docs/drivers/node/upcoming/quick-start/');
      expect(result).not.toBeNull();
      expect(result!.destination).toBe('/docs/drivers/node/upcoming/get-started/');
    });

    it('matches wildcard version consolidation paths (these are soft too)', () => {
      const result = findSoftRedirect('/docs/drivers/node/v7.2/some-page/');
      expect(result).not.toBeNull();
      expect(result!.destination).toContain('/docs/drivers/node/v7.x/');
    });

    it('normalizes paths without trailing slash', () => {
      const result = findSoftRedirect('/docs/drivers/node/current/fundamentals/connection');
      expect(result).not.toBeNull();
      expect(result!.destination).toBe('/docs/drivers/node/current/connect/');
    });

    it('returns null for paths that do not match any redirect', () => {
      const result = findSoftRedirect('/docs/drivers/node/current/this-page-has-no-redirect/');
      expect(result).toBeNull();
    });

    it('excludes force redirects, which are handled before the page-existence check', () => {
      const result = findSoftRedirect('/docs/force-only/');
      expect(result).toBeNull();
    });

    it('matches atlas page-specific redirects', () => {
      const result = findSoftRedirect('/docs/atlas/additional-resources/');
      expect(result).not.toBeNull();
      expect(result!.destination).toBe('/docs/atlas/');
    });

    it('matches kubernetes page-specific redirects', () => {
      const result = findSoftRedirect(
        '/docs/kubernetes/current/reference-architectures/multi-cluster/multi-cluster-sharded-cluster/',
      );
      expect(result).not.toBeNull();
      expect(result!.destination).toBe(
        '/docs/kubernetes/current/reference-architectures/multi-cluster/sharded-cluster/',
      );
    });

    it.each([
      ['/docs/charts/atlas/', '/docs/charts/'],
      ['/docs/voyageai/management/azure-marketplace/', '/docs/voyageai/management/azure-foundry/'],
      ['/docs/sql-interface/connect/jdbc/', '/docs/sql-interface/install-driver/'],
      [
        '/docs/mongocli/current/command/mongocli-atlas-accessLists-create/',
        '/docs/atlas/cli/current/migrate-to-atlas-cli/',
      ],
      ['/docs/cloud-manager/agents/', '/docs/cloud-manager/tutorial/nav/mongodb-agent/'],
    ])('matches migrated product redirect %s', (source, destination) => {
      const result = findSoftRedirect(source);
      expect(result).not.toBeNull();
      expect(result!.destination).toBe(destination);
    });
  });
});
