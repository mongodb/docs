- Custom policies are not supported for ``M2`` and ``M5`` cluster
  snapshots. |service| always takes a single daily snapshot at the same
  time, starting 24 hours after the cluster was created.

  If you require finer-grained backups, consider upgrading to an
  ``M10`` or larger cluster tier.

- On-demand snapshots are not supported for ``M2`` and ``M5`` clusters.

- You can't restore ``M2`` and ``M5`` snapshots to a sharded cluster.
  You can only restore ``M2`` and ``M5`` snapshots to replica sets.