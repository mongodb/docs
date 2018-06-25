You must restore a backup to an |service| cluster running the same
version of MongoDB as the cluster that you want to restore. The
length of time required for an upgrade depends on factors such as
the number of nodes in the cluster. |service| uses a rolling upgrade
process to maintain cluster :ref:`availability<high-availability>`.

.. tip::

   You can still use backups made before an upgrade. For example,
   you can :doc:`restore a 3.6 cluster </restore-cluster>` to 4.0
   with the following procedure:

   1.  Restore the old 3.6 backup to another 3.6 cluster.
   2.  Upgrade the restored cluster to 4.0.