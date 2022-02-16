- Custom policies are not supported for ``M2`` and ``M5`` cluster
  snapshots. |service| always takes a single daily snapshot at the same
  time, starting 24 hours after the cluster was created.

  If you require finer-grained backups, consider upgrading to an
  ``M10`` or larger cluster tier.

- On-demand snapshots are not supported for ``M2`` and ``M5`` clusters.

- You can't restore ``M2`` and ``M5`` snapshots to a sharded cluster.
  You can only restore ``M2`` and ``M5`` snapshots to replica sets.

- You can't restore {+serverless-instance+} snapshots to ``M2`` and 
  ``M5`` clusters.

- Starting with MongoDB 5.0, you can restore snapshots of clusters
  that run only the two most recent major versions of MongoDB to
  ``M2`` and ``M5`` {+clusters+}.

  .. example::

     - You can restore snapshots taken from {+clusters+} that run MongoDB
       4.2 to an ``M2`` or ``M5`` cluster that runs MongoDB 5.0. 
     - You can't restore snapshots taken from {+clusters+} that run
       MongoDB 4.0 to an ``M2`` or ``M5`` cluster that runs MongoDB 5.0.
