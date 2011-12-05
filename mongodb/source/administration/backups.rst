=================================
Backup and Restoration Strategies
=================================

This document provides an inventory of database backup strategies for
use with MongoDB. Use the :ref:`backup overview <backup-overview>` and
:ref:`considerations <backup-considerations>` as you develop the most
appropriate strategy for backing up your MongoDB environment. Then,
use the examples from the :ref:`block level backup methods
<block-level-backup>` or the ":ref:`backups using
mongodump <database-dumps>`" sections to implement the backup
solution that is best suited to your deployment's needs.

.. note:: Clustered environments, either with shards or replica sets,
          require special considerations, see ":ref:`backup
          considerations for shard clusters and replica sets
          <backups-with-sharding-and-replication>`" for more
          information.

A robust backup strategy along with at tested corresponding restore
strategy is crucial for every production-grade deployment. Take the
specific features of your deployment, your use patterns, and
architecture into consideration as you develop your own strategy.

.. _backup-overview:

Overview
--------

If you are familiar with backups systems in the context of database
systems please skip ahead to :ref:`backup considerations <backup-considerations>`.

With MongoDB, the best way to are two major approaches to backups:
using system-level tools, like disk image snapshots, and using various
capacities present in the :ref:`mongodump tool <database-dumps>`
to provide backup functionality. The underlying goal of these
strategies is to produce a full copy of the data that can be used to
bring up a new or replacement database instance.

The methods described in this document operate by copying the data
file on the disk level, while MongoDB tools dump or export copies of
the data that can be imported into the new node. If your system does
not provide a capacity for this kind of backup, see the section on
:ref:`using database dumps for backups <database-dumps>`" for more
information.

One of the leading challenges for producing reliable backups from
database systems is ensuring that the state captured backup methods is
in a consistent and steerable state. Because every environment is
unique it's important to regularly test the backups that you capture
to ensure that your backup system is practically, and not just
theoretically, functional.

.. _backup-considerations:

Production Considerations
-------------------------

When evaluating a backup strategy for your node consider the following
factors:

- Geography. Ensure that you have backups that are moved away from the
  site where your primary database infrastructure is located. It's
  important to be able to restore your database if you loose access to
  a system or site.

- System errors. Ensure that your backups can survive situations where
  hardware failures, disk errors, may impact the integrity or
  availability of your backups.

- Production constraints. Backup operations themselves sometimes
  require substantial system resources. It's important to consider the
  time of the backup schedule relative to peak usage and maintenance
  windows.

- System capabilities. In order to use some of the block-level
  snapshot tools require special support on the operating-system or
  infrastructure level.

- Database configuration. Cluster configuration including replication
  and sharding can affect the procured, timing, and impact of the
  backup process.

- Actual requirements. You may be able to save time, effort, and space
  by including only crucial data in the most frequent backups and
  backing up less crucial data less frequently.

With this information in hand you can begin to develop a backup plan
for your database. Remember that all backup plans must be:

- tested. If you cannot effectively restore your database from the
  backup, then your backups are useless. Test backup restoration
  regularly in practical situations to ensure that your backup system
  provides value.

- automated. Database backups need to run regularly and
  automatically. Testing backup restoration should also be automated.

.. _block-level-backup:

Block Level Methods
-------------------

This section will provides an overview of using disk/block level
snapshots (i.e. :term:`LVM` or storage appliance) to backup a MongoDB
instance. These tools make a quick block-level backup of the device
that holds MongoDB's data files. These methods complete quickly, work
reliably, and typically provide the easiest backup systems methods to
implement.

Snapshots typically work by creating pointers between the live data
and a special snapshot data, you can think about these as "hard
links." Then, as the working data diverges from the snapshot a
copy-on-write strategy is used so that the snapshot only stores
modified data. After making the snapshot, you will mount the snapshot
image and copy the files off disk image. The resulting backup contains
full copies of all the data.

.. moreinfo: <http://www.waterlovinghead.com/StorageLVMSnap>

Snapshots have some limitations:

- The database must be in a consistent or recoverable state when the
  snapshot takes place. With journaling all states are recoverable,
  without journaling you must ensure that all pending writes are
  flushed to disk.

- Snapshots create an image of an entire disk image. Unless you need
  to back up your entire system, consider isolating your MongoDB data
  files, journal (if applicable,) and configuration on one logical
  disk that doesn't contain any other data.

  Alternately, store all MongoDB data files on a dedicated device to
  so that you can make backups without duplicating extraneous data.

- Ensure that you copy data from snapshots and onto other systems to
  ensure that data is safe from site-failures.

.. _backup-with-journaling:

With Journaling
~~~~~~~~~~~~~~~

If your system has a snapshot capability and ``mongod`` instance has
journaling enabled then you can use any kind of file system or
volume/block level snapshot tool to create backups.

.. note::

   Journaling is not enabled by default on systems running with 32-bit
   architectures.

.. warning::

   Journaling is disabled by default on pre-1.9.2 64-bit versions of
   MongoDB. Ensure that the journaling option is turned on by
   specifying ":mongodb:option:`journal` = ``true``" in the
   configuration or specifying the :option:`--journal <mongod
   --journal>` run-time option for :option:`mongod`.

Many service providers provide a block-level backup service based on
disk image snapshots. If you manage your own infrastructure on a
Linux-based system, configure your system with :term:`LVM` to provide
your disk packages and provide snapshot capability. You can also use
LVM-based setups *within* a cloud/virtualized environment.

.. note::

   Running LVM provides additional flexibility and enables the
   possibility of using snapshots to backup MongoDB.

   If you use Amazon's EBS service in a software RAID 10 (e.g. 1+0)
   configuration, use LVM to capture a consistent disk image.

The following sections provide an overview of a simple backup process
using LVM on a Linux system. While the tools, commands, and paths may
be (slightly) different on your system the following steps provide a
high level overview of the backup operation.

.. _lvm-backup-operation:

Create Snapshot
```````````````

To create a snapshot with LVM issue a command, as root, in the
following format: ::

         lvcreate --size 100M --snapshot --name mdb-snap01 /dev/vg0/mongodb

This command creates a snapshot (with the "``--snapshot`` option)
named "``mdb-snap01``" of the "``mongodb``" volume in the "``vg0``"
volume group.

In this example, the ``mdb-snap01`` that you create will be located at
``/dev/vg0/mdb-snap01``. The location and paths to your systems volume
groups and devices may be slightly different on your distributions LVM
configuration.

The snapshot is capped at 100 megabytes by the parameter "``--size
100M``". This size does not reflect the total amount of the data on
the disk, but rather the quantity of differences between the current
state of ``/dev/vg0/mongodb`` and the instant when
``/dev/vg0/mdb-snap01`` was created.

.. warning::

   Ensure that you create snapshots with enough space to account for
   data growth, particularly for a period of that it takes to copy to
   data out of the system or to a temporary image.

   If you your snapshot runs out of space, the snapshot image cannot
   be used and must be discarded.

The snapshot is created when the command returns. You can restore
directly from the snapshot at any time or by creating a new logical
volume and restoring from this snapshot to the alternate image.

While snapshots are great for creating high quality backups very
quickly, they are not ideal as a format for storing backup
data. Snapshots typically depend and reside on the same storage
infrastructure as the original disk images. Therefore, it's crucial
that these snapshots be archived and stored elsewhere.

Archive Snapshots
`````````````````

After creating a snapshot, mount the snapshot and move the data to a
separate storage You. system may wish to compress the backup images as
you move the offline. Consider the following procedure to fully
archive the data from the snapshot: ::

      umount /dev/vg0/mdb-snap01
      dd if=/dev/vg0/mdb-snap01 | tar -czf mdb-snap01.tar.gz

This command sequence:

1. Ensures that the ``/dev/vg0/mdb-snap01`` device is not mounted.

2. Does a block level copy of the entire snapshot image using the
   ``dd`` command, and compresses the result in a gziped tar archive
   in the current working directory.

   .. warning::

      This command will create a large ``tar.gz`` file in your current
      working directory. Make sure that you run this command in a
      file system that has enough free space.

Restore Snapshot
````````````````

To restore a backup created with the above method, use the following
procedure: ::

      lvcreate --size 1G --name mdb-new vg0
      tar -xzf mdb-snap01.tar.gz | dd of=/dev/vg0/mdb-new
      mount /dev/vg0/mdb-new /srv/mongodb

This sequence:

1. Creates a new logical volume named "``mdb-new``", in the
   "``/dev/vg0``" volume group. The path to the new device will be
   "``/dev/vg0/mdb-new``".

   .. warning::

      This volume will have a maximum size of 1 gigabyte. The original
      file system must have had a total size of 1 gigabyte or smaller,
      or else the restoration will fail.

      Change ``1G`` to your desired volume size.

2. Uncompresses and unarchives the "``mdb-snap01.tar.gz``" into the
   ``mdb-new`` disk image.

3. Mounts the ``mdb-new`` disk image to the ``/srv/mongodb``
   directory. Modify the mount point to correspond to your MongoDB
   data file location, or other location as needed.

.. _backup-restore-from-snapshot:

Restore Directly from a Snapshots
`````````````````````````````````

To combine the above processes without writing to a compressed ``tar``
archive, use the following sequence: ::

      umount /dev/vg0/mdb-snap01
      lvcreate --size 1G --name mdb-new vg0
      dd if=/dev/vg0/mdb-snap01 of=/dev/vg0/mdb-new
      mount /dev/vg0/mdb-new /srv/mongodb

Remote Backup Storage
`````````````````````

You can implement off-system backups using the :ref:`combined process
<backup-restore-from-snapshot>` and SSH. Consider the following
procedure: ::

     umount /dev/vg0/mdb-snap01
     dd if=/dev/vg0/mdb-snap01 | ssh username@example.com tar -czf /opt/backup/mdb-snap01.tar.gz
     lvcreate --size 1G --name mdb-new vg0
     ssh username@example.com tar -xzf /opt/backup/mdb-snap01.tar.gz | dd of=/dev/vg0/mdb-new
     mount /dev/vg0/mdb-new /srv/mongodb

This sequence is identical to procedures explained above except that
the output and input is directed (i.e. :term:`piped`) over SSH to the
remote system.

.. _backup-without-journaling:

Without Journaling
~~~~~~~~~~~~~~~~~~

If your ``mongodb`` instance does not running with journaling enabled,
obtaining a functional backup of a consistent state is more
complicated. Make sure that all writes have been flushed to disk and
that the database is locked to prevent writes during the backup
process.

To flush writes and lock the database before performing the snapshot,
issue the following command: ::

      db.fsyncLock();

Perform the :ref:`backup operation described above <lvm-backup-operation>`
at this point. To unlock the database after the snapshot has
completed, issue the following command: ::

      db.fsyncUnlock();

.. note::

   The ``db.fsyncLock()`` and ``db.fsyncUnlock`` helpers were added in
   version 1.9.0. Use the following commands with earlier versions: ::

        db.runCommand( { fsync: 1, lock: true } );
        db.runCommand( { fsync: 1, lock: false } );

Amazon EBS in Software RAID 10 Configuration
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

If you're using Amazon's Elastic Block Storage (EBS) with RAID
configured *within* your instance, it is impossible to get a
consistent state across all disks using the platform's snapshot
tool. As a result you may:

- Flush all writes to disk and create a write lock to ensure
  consistent state during the backup process.

  If you choose this option see the section on ":ref:`Backup without
  Journaling <backup-without-journaling>`"

- Configure LVM to run and hold your MongoDB data files on top of the
  RAID within your system.

  If you choose this option see the section that outlines the
  ":ref:`LVM backup operation <lvm-backup-operation>`"

.. _database-dumps:

Binary Import/Export Formats
----------------------------

This section describes the process for exporting the entire contents
of your MongoDB instance, to a file in a binary format. This command
provides the best option for full system database backups if
disk-level snapshots are not available.

.. seealso::

   The :doc:`/reference/mongodump` and :doc:`/reference/mongorestore`
   documents contain complete documentation of these tools. If you
   have questions about the function and parameters of these tools not
   covered here, please refer to these documents.

   If your system has disk level snapshot capabilities, consider the
   backup methods described :ref:`above <block-level-backup>`.

Database Export with mongodump
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

The :option:`mongodump` utility performs a live backup the data, or
can work against an inactive set of database
files. :option:`mongodump` utility can create a dump for an entire
server/database/collection (or part of a collection with a query,)
even when the database is running and active. If you run
:option:`mongodump` without any arguments the command will connect to
the local database instance (e.g. ``127.0.0.1`` or ``localhost``) and
create a database backup in a in the current directory named
"``dump/``".

You can specify  database and collection as options to the
:option:`mongodump` command to limit the amount of data included in the
database dump. For example: ::

     mongodump --collection collection --database test

This command creates a dump in of the database in the "``dump/``"
directory of only the collection named "``collection``" in the
database named "``test``". :option:`mongodump` provides the
":option:`--oplog <mongodump --oplog>``" option which forces the dump
operation to use the operation log to take a point-in-time snapshot of
the database.

If your MongoDB instance is not running, you can use the
":option:`--dbpath <mongodbump --dbpath>`" option to specify the
location to your MongoDB instance's database files. :option:`mongod
ump` reads from the data files directly with this operation. This
locks the data directory to prevent conflicting writes. The
:option:`mongod` process must *not* be running or attached to these
data files when you run :option:`mongodump` in this
configuration. Consider the following example: ::

     mongodump --dbpath /srv/mongodb

Additionally, the ":option:`--host <mongodump --host>`" and
":option:`--port <mongoddump --port>`" options allow you to
specify a non-local host to connect to capture the export. Consider
the following example: ::

     mongodump --host mongodb1.example.net --port 3017 --username user --password pass /opt/backup/mongodumpm-2011-10-24

On any :option:`mongodump` command you may, as above specify username
and password credentials to specify database authentication.

Database Import with mongorestore
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

The :option:`mongorestore` restores a binary backup created by the
:option:`mongodump` utility. Consider the following example command:
::

     mongorestore dump-2011-10-25/

Here, the database backup located in the ``dump-2011-10-25`` directory
is imported to the :option:``mongod` instance running on the localhost
interface. By default, :option:`mongorestore` will look for a database
dump in the "``dump/``" directory and restore that. If you wish to
restore to a non-default host, the "``--host``" and "``--port``"
options allow you to specify a non-local host to connect to capture
the export. Consider the following example: ::

     mongorestore --host mongodb1.example.net --port 3017 --username user --password pass /opt/backup/mongodumpm-2011-10-24

On any :option:`mongorestore` command you may, as above specify
username and password credentials as above.

If you created your database dump using the :option:`--oplog
<mongodump --oplog>` option to ensure a point-in-time snapshot, call
:option:`mongorestore` with the ":option:` --oplogReplay <mongorestore
--oplogReplay>``" option as in the following example: ::

     mongorestore --oplogReplay

You may also consider using the :option:`mongorestore --objcheck`
option to check the integrity of objects as they are inserted into the
database, or the :option:`mongorestore --drop` option to drop each
collection from the database before restoring from
backups. :option:`mongorestore` also includes the ability to a filter
to all input before it is inserted into the new database. Consider the
following example: ::

     mongorestore --filter '{"field": 1}'

Here, the only documents added to the database running on the local
system are added from the database dump located in the "``dump/``"
folder *if* the documents have a field name "``field``" that holds a
value of "``1``". Enclose the filter in single quotes (e.g. "``'``")
to ensure that it does not interact with your shell environment.

If your MongoDB instance is not running, you can use the
":option:`mongorestore --dbpath`" option to specify the location to
your MongoDB instance's database files. :option:`mongorestore` inserts
data into the data files directly with this operation. While the
command runs, the data directory is locked to prevent conflicting
writes. The :option:`mongod` process must *not* be running or attached
to these data files when you run :option:`mongodump` in this
configuration. Consider the following example: ::

     mognorestore --dbpath /srv/mongodb

If your MongoDB instance is not running, you can use the
":option:`--dbpath <mongorestore --dbpath>`" option to specify the
location to your MongoDB instance's database files. Consider using the
":option:`--journal <mongorestore --journal>`" option to ensure that
the operations of ``mon`` are recorded in the journal.

.. seealso:: ":doc:`/reference/mongodump`" and
             ":doc:`/reference/mongorestore`."

.. _backups-with-sharding-and-replication:

Shard Clusters and Replica Sets Considerations
----------------------------------------------

The underlying architecture of shard clusters and replica sets present
several challenges for creating backups of data stored in
MongoDB. This section provides a high-level overview of these
concerns, and strategies for creating quality backups in environments
with these configurations.

Creating useful backups for shard clusters is more complicated,
because it's crucial that the backup captures a consistent state
across all shards.

Shard Clusters
~~~~~~~~~~~~~~

Using Database Exports From a Cluster
`````````````````````````````````````

If you have a small collection of data, the easiest way to connecting
to the :option:`mongos` and taking a dump or export of the database
from the running copy. This will create a consistent copy of the data
in your database. If your data corpus is small enough that:

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
``````````````````````````````````````````````````````

If you there is no way to conduct a backup reasonably using an export,
then you'll need to either snapshot the database using the
:ref:`snapshot backup procedure <block-level-backup>` or create a
binary dump of each database instance using :ref:`binary export
systems <database-dumps>`.

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

Replica Sets
~~~~~~~~~~~~

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
