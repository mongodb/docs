You must restore a backup to an |service| cluster running the same
major release version of MongoDB  or the next release version of MongoDB 
as the cluster that you want to restore. You cannot restore a backup 
to an |service| cluster running a lower release version of MongoDB than the 
cluster that you want to restore.

.. tip::

   You can still use backups made before an upgrade. For example,
   you can :doc:`restore a 3.6 cluster </restore-cluster>` to 4.0
   with the following procedure:

   1.  Restore the old 3.6 backup to another 3.6 cluster.
   2.  Upgrade the restored cluster to 4.0.