This process works like
:manual:`replica set data synchronization </core/replica-set-sync>`.

The backup process:

1. Performs an :term:`initial sync` to back up all of your existing
   data in its current state.
   In :term:`sharded clusters <sharded cluster>`, this occurs on each
   shard and on the config servers.

   .. include:: /includes/backup/legacy-causes-of-initial-sync-restart.rst

#. Takes snapshots of the ``data`` directory in a deployment as often
   as your :ref:`snapshot schedule <snapshot-frequency-and-retention>`
   specifies and then transfers the snapshots to a storage system.

   .. note::

      Sharded Clusters also can
      :ref:`enable checkpoints <enable-cluster-checkpoints>` to permit
      restores at points in time between snapshots. To learn how
      sharded clusters use checkpoints, see :ref:`checkpoints
      <checkpoint>`.

#. Monitors the :term:`oplog` constantly and adds new database
   operations to the latest backup to keep the local |onprem| copy of
   the data current.

The backup process works in this manner regardless of how snapshots are
stored.
