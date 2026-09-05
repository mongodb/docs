import { findSoftRedirect } from '@/redirects/soft-redirects';

describe('soft-redirects', () => {
  describe('findSoftRedirect', () => {
    it.skip('matches a known page-specific redirect', () => {
      const result = findSoftRedirect('/docs/drivers/node/current/fundamentals/connection/');
      expect(result).not.toBeNull();
      expect(result!.destination).toBe('/docs/drivers/node/current/connect/');
      expect(result!.statusCode).toBe(301);
    });

    it.skip('matches a parametrized redirect across versions', () => {
      const result = findSoftRedirect('/docs/drivers/node/upcoming/quick-start/');
      expect(result).not.toBeNull();
      expect(result!.destination).toBe('/docs/drivers/node/upcoming/get-started/');
    });

    it.skip('matches wildcard version consolidation paths (these are soft too)', () => {
      const result = findSoftRedirect('/docs/drivers/node/v7.2/some-page/');
      expect(result).not.toBeNull();
      expect(result!.destination).toContain('/docs/drivers/node/v7.x/');
    });

    it.skip('normalizes paths without trailing slash', () => {
      const result = findSoftRedirect('/docs/drivers/node/current/fundamentals/connection');
      expect(result).not.toBeNull();
      expect(result!.destination).toBe('/docs/drivers/node/current/connect/');
    });

    it('returns null for paths that do not match any redirect', () => {
      const result = findSoftRedirect('/docs/drivers/node/current/this-page-has-no-redirect/');
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
