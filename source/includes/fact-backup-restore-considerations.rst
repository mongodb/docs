You must restore the backup to a cluster running either the same major
release version, or the next higher one. |service| doesn't support
restoring to older versions.

You can still use backups made before an upgrade.

.. example::

   To :doc:`restore a 4.0 cluster </backup/legacy-backup/restore>` to 4.2:

   1.  Restore the old 4.0 backup to another 4.2 cluster.
   2.  Upgrade the restored cluster to 4.2.
