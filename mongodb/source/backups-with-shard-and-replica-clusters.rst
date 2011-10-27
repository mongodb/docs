=======================================
Backups with Shard and Replica Clusters
=======================================

The underlying architecture of clusters presents several challenges
for creating backups of data stored in MongoDB. This document provides
a high-level overview of these concerns, and strategies for creating
quality backups in environments with these configurations.

Backup Considerations with Shard Configurations
-----------------------------------------------

Creating useful backups for shard clusters is more complicated,
because it's crucial that the backup captures a consistent state
across all shards.

Using Database Exports From a Cluster
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

If you have a small collection of data, the easiest way to connecting
to the ``mongos`` and taking a dump or export of the database from the
running copy. This will create a consistent copy of the data in your
database. If your data corpus is small enough that:

- it's possible to store the entire backup on one system, or a single
  storage device. Consider both backups of entire instances, and
  incremental exports of data.

- the state of the database at the beginning of the operation is
  not significantly different than the state of the database at the
  end of the backup. If the backup operation cannot capture a backup
  this is not a viable option.

- the backup can run and complete without impacting the performance of
  the shard cluster.

Using Conventional Backups from All Database Instances
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

If you there is no way to conduct a backup reasonably using an export,
then you'll need to either snapshot the database using the
:ref:`snapshot backup procedure <block-level-backup>` or create a
binary dump of each database instance using :ref:`binary export
systems <database-dump-import-export>`.

These backups must not only be captured when the database is in a
consistent state as described in the aforementioned procedures, but
the shard cluster needs to be consistent in itself. All operations
that balance the data among the collections need to be disabled before
the backup can be taken.

You should also all cluster members so that your backups reflect your
entire database system at a single point in time, even if your backup
methodology does not require.

.. warning::

   It is essential that you stop the balancer before creating
   backups. If the balancer remains active, your resulting backups
   could have duplicate data or miss some data, depending on how
   chunks are moved while backups are recorded.

   Similarly, if you do not lock all shards at the same time,
   the backup can reflect a highly inconsistent state that will likely
   *not* be restorable.

To stop the balancer, connect to the ``mongos`` with the ``mango``
shell and issue the following 2 commands: ::

     use config
     db.settings.update( { _id: "balancer" }, { $set : { stopped: true } } , true );

When the balancer is enabled, proceed with your backup in the
following sequence:

1. Lock all shards, in an operation that ensures that all shard
   instances are locked in as short of an interval as possible.

2. Use ``mongodump`` to backup the config database. This command can
   either be issued against the config database itself or the
   ``mongos``, and would resemble the following: ::

        mongodump --database config

2. Record a backup of all shards

3. Unlock all shards.

4. Restore the balancer.

Use the following command sequence when connected to the ``mongos``
with the ``mongo`` shell: ::

     use config
     db.settings.update( { _id: "balancer" }, { $set : { stopped: false } } , true );

If you have an automated backup schedule, you can disable all
balancing operations for a period of time. For instance, consider the
following command: ::

     use config
     db.settings.update( { _id : "balancer" }, { $set : { activeWindow : { start : "6:00", stop : "23:00" } } }, true )

Here, the balancer is configured to run between 6:00 am and 11:00pm,
server time. Schedule your backup operation to run *and complete* in
this time. Ensure that the backup can complete during the window when
the balancer is running *and* that the balancer can ensure that the
collection is balanced among the shards in the window allotted to
each.

Backup Considerations with Replica Sets
---------------------------------------

In most cases, backing up data stored in replica is similar to backing
up data stored in a single instance. It's possible to lock a single
:term:`slave` or :term:`secondary` database and then create a backup
from that instance. When you unlock the database, the slave will catch
:term:`master` or :term:`primary` node.

If you have a sharded cluster where each shard is itself a replica
set, you can use this method to create a backup of the entire cluster
without disrupting. In these situations you should still turn off the
balancer when you create backups.

For any cluster, using a non-master/primary node to create backups is
particularly advantageous, in that the backup operation does not
affect the performance of the master or primary node. Replication also
provides some measure of redundancy itself. However, it is also
important to keep point-in time backups to provide for disaster
recovery and as an additional layer of protection.

Further Reading
---------------

For more information about backups in general, see the
":doc:`backups`." document. For more information about import and
export tools in the context of backups, see the
":doc:`backups-import-export`" document.
