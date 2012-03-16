=================================
Backup and Restoration Strategies
=================================

.. default-domain:: mongodb

This document provides an inventory of database backup strategies for
use with MongoDB. Use the ":ref:`backup overview <backup-overview>`"
and ":ref:`backup considerations <backup-considerations>`" sections as
you develop the most appropriate strategy for backing up your MongoDB
environment. Then, use the examples from the ":ref:`block level backup
methods <block-level-backup>`" or the ":ref:`backups using mongodump
<database-dumps>`" sections to implement the backup solution that is
best suited to your deployment's needs.

.. note::

   :term:`Replica sets <replica set>` and :term:`shard clusters <shard
   cluster>` require special considerations, see ":ref:`backup
   considerations for shard clusters and replica sets
   <backups-with-sharding-and-replication>`" for more information.

A robust backup strategy and a well-tested corresponding restoration
process is crucial for every production-grade deployment. Take the
specific features of your deployment, your use patterns, and
architecture into consideration as you develop your own backup system.

.. _backup-overview:

Overview
--------

If you are familiar with backups systems in the context of database
systems please skip ahead to :ref:`backup considerations <backup-considerations>`.

With MongoDB, there are two major approaches to backups:
using system-level tools, like disk image snapshots, and using various
capacities present in the :ref:`mongodump tool <database-dumps>`.
The underlying goal of these strategies is to produce a full and consistent
copy of the data that you can use to bring up a new or replacement
database instance.

The methods described in this document operate by copying the data
file on the disk level. If your system does not provide functionality
for this kind of backup, see the section on :ref:`using database dumps
for backups <database-dumps>`" for more information.

The primary challenge in producing reliable backups of database
systems is ensuring that the state captured by the backup is in a
consistent usable. Backups that you cannot feasibly restore from are
worthless.

Because every environment is unique it's important to regularly test
the backups that you capture to ensure that your backup system is
practically, and not just theoretically, functional.

.. _backup-considerations:

Production Considerations
-------------------------

When evaluating a backup strategy for your node consider the following
factors:

- Geography. Ensure that you move some backups away from the your
  primary database infrastructure. It's important to be able to
  restore your database if you lose access to a system or site.

- System errors. Ensure that your backups can survive situations where
  hardware failures or disk errors impact the integrity or
  availability of your backups.

- Production constraints. Backup operations themselves sometimes
  require substantial system resources. It's important to consider the
  time of the backup schedule relative to peak usage and maintenance
  windows.

- System capabilities. In order to use some of the block-level
  snapshot tools requires special support on the operating-system or
  infrastructure level.

- Database configuration. :term:`Replication` and :term:`sharding
  <shard>` can affect the process, and impact of the backup implementation.

- Actual requirements. You may be able to save time, effort, and space
  by including only crucial data in the most frequent backups and
  backing up less crucial data less frequently.

With this information in hand you can begin to develop a backup plan
for your database. Remember that all backup plans must be:

- Tested. If you cannot effectively restore your database from the
  backup, then your backups are useless. Test backup restoration
  regularly in practical situations to ensure that your backup system
  provides value.

- Automated. Database backups need to run regularly and
  automatically. Also automate tests of backup restoration.

.. _block-level-backup:

Block Level Methods
-------------------

This section will provides an overview of using disk/block level
snapshots (i.e. :term:`LVM` or storage appliance) to backup a MongoDB
instance. These tools make a quick block-level backup of the device
that holds MongoDB's data files. These methods complete quickly, work
reliably, and typically provide the easiest backup systems method to
implement.

Snapshots work by creating pointers between the live data and a
special snapshot volume: these pointers are theoretically equivelent
to "hard links." Then, as the working data diverges from the snapshot,
the snapshot process uses a copy-on-write strategy. As a result the snapshot
only stores modified data.

After making the snapshot, you will mount the snapshot image on your
file system and copy data from the snapshot. The resulting backup
contains a full copy of all data.

Snapshots have the following limitations:

- The database must be in a consistent or recoverable state when the
  snapshot takes place. This means that all writes accepted by the
  database need to be fully written to disk: either to the
  :term:`journal` or to data files.

  If all writes are not on disk when the backup occurs, the backup
  will not reflect these changes. If writes are *in progress* when the
  backup occurs, the data files will reflect an inconsistent
  state. With :term:`journaling <journal>` all data-file states
  resulting from in-progress writes are recoverable; without
  journaling you must flush all pending writes and to disk before
  running the backup operation and ensure that no writes occur during
  the entire backup procedure.

  If you do use journaling, the journal must reside on the same volume
  as the data.

- Snapshots create an image of an entire disk image. Unless you need
  to back up your entire system, consider isolating your MongoDB data
  files, journal (if applicable), and configuration on one logical
  disk that doesn't contain any other data.

  Alternately, store all MongoDB data files on a dedicated device to
  so that you can make backups without duplicating extraneous data.

- Ensure that you copy data from snapshots and onto other systems to
  ensure that data is safe from site-failures.

.. _backup-with-journaling:

With Journaling
~~~~~~~~~~~~~~~

If your system has snapshot capability and your :program:`mongod` instance
has journaling enabled then you can use any kind of file system or
volume/block level snapshot tool to create backups.

.. warning::

   .. versionchanged:: 1.9.2

   Journaling is only enabled by default  on 64-bit builds of
   MongoDB.

   To enable journaling on all other builds, specify
   ":setting:`journal` = ``true``" in the configuration or use the
   :option:`--journal <mongod --journal>` run-time option for
   :program:`mongod`.

Many service providers provide a block-level backup service based on
disk image snapshots. If you manage your own infrastructure on a
Linux-based system, configure your system with :term:`LVM` to provide
your disk packages and provide snapshot capability. You can also use
LVM-based setups *within* a cloud/virtualized environment.

.. note::

   Running :term:`LVM` provides additional flexibility and enables the
   possibility of using snapshots to backup MongoDB.

   If you use Amazon's EBS service in a software RAID 10 (e.g. 1+0)
   configuration, use :term:`LVM` to capture a consistent disk image.

   Also consider, :ref:`backup-amazon-software-raid`

The following sections provide an overview of a simple backup process
using :term:`LVM` on a Linux system. While the tools, commands, and paths may
be (slightly) different on your system the following steps provide a
high level overview of the backup operation.

.. _lvm-backup-operation:

Create Snapshot
```````````````

To create a snapshot with :term:`LVM` issue a command, as root, in the
following format:

.. code-block:: sh

   lvcreate --size 100M --snapshot --name mdb-snap01 /dev/vg0/mongodb

This command creates an :term:`LVM` snapshot (with the "``--snapshot`` option)
named "``mdb-snap01``" of the "``mongodb``" volume in the "``vg0``"
volume group.

This example creates a snapshot named ``mdb-snap01`` located at
``/dev/vg0/mdb-snap01``. The location and paths to your systems volume
groups and devices may vary slightly depending on your operating
system's :term:`LVM` configuration.

The snapshot has a cap of at 100 megabytes, because of the parameter
"``--size 100M``". This size does not reflect the total amount of the
data on the disk, but rather the quantity of differences between the
current state of ``/dev/vg0/mongodb`` and the creation of the snapshot
(i.e. ``/dev/vg0/mdb-snap01``.)

.. warning::

   Ensure that you create snapshots with enough space to account for
   data growth, particularly for the period of time that it takes to copy
   data out of the system or to a temporary image.

   If you your snapshot runs out of space, the snapshot image
   becomes unusable. Discard this logical volume and create another.

The snapshot will exist when the command returns. You can restore
directly from the snapshot at any time or by creating a new logical
volume and restoring from this snapshot to the alternate image.

While snapshots are great for creating high quality backups very
quickly, they are not ideal as a format for storing backup
data. Snapshots typically depend and reside on the same storage
infrastructure as the original disk images. Therefore, it's crucial
that you archive these snapshots and store them elsewhere.

Archive Snapshots
`````````````````

After creating a snapshot, mount the snapshot and move the data to
separate storage. Your system may wish to compress the backup images as
you move the offline. Consider the following procedure to fully
archive the data from the snapshot:

.. code-block:: sh

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
procedure:

.. code-block:: sh

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

Restore Directly from a Snapshot
````````````````````````````````

To combine the above processes without writing to a compressed ``tar``
archive, use the following sequence:

.. code-block:: sh

   umount /dev/vg0/mdb-snap01
   lvcreate --size 1G --name mdb-new vg0
   dd if=/dev/vg0/mdb-snap01 of=/dev/vg0/mdb-new
   mount /dev/vg0/mdb-new /srv/mongodb

Remote Backup Storage
`````````````````````

You can implement off-system backups using the :ref:`combined process
<backup-restore-from-snapshot>` and SSH. Consider the following
procedure:

.. code-block:: sh

   umount /dev/vg0/mdb-snap01
   dd if=/dev/vg0/mdb-snap01 | ssh username@example.com tar -czf /opt/backup/mdb-snap01.tar.gz
   lvcreate --size 1G --name mdb-new vg0
   ssh username@example.com tar -xzf /opt/backup/mdb-snap01.tar.gz | dd of=/dev/vg0/mdb-new
   mount /dev/vg0/mdb-new /srv/mongodb

This sequence is identical to procedures explained above, except that
it archives and compresses the backup on a remote system using SSH.

.. _backup-without-journaling:

Without Journaling
~~~~~~~~~~~~~~~~~~

If your :program:`mongod` instance does not run with journaling
enabled, or if your journal is on a separate volume, obtaining a
functional backup of a consistent state is more complicated. Flush all
writes to disk and lock the database to prevent writes during the
backup process. If you have a :term:`replica set` configuration, use a
:term:`secondary` that is not receiving reads (i.e. :term:`hidden
member`) for backup purposes.

You can flush writes to disk, and "lock" the database to prevent
further writes with the :func:`db.fsyncLock()` command in the
:program:`mongo` shell, as follows:

.. code-block:: javascript

   db.fsyncLock();

Perform the :ref:`backup operation described above
<lvm-backup-operation>` at this point. To unlock the database after
the snapshot has completed, use the following command in the
:program:`mongo` shell:

.. code-block:: javascript

   db.fsyncUnlock();

.. note::

   Version 1.9.0 added :func:`db.fsyncLock()` and
   :func:`db.fsyncUnlock()` helpers to the :program:`mongo` shell.
   Prior to this version, use the following commands:

   .. code-block:: javascript

      db.runCommand( { fsync: 1, lock: true } );
      db.runCommand( { fsync: 1, lock: false } );

.. _backup-amazon-software-raid:

Amazon EBS in Software RAID 10 Configuration
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

If your deployment depends on Amazon's Elastic Block Storage (EBS)
with RAID configured *within* your instance, it is impossible to get a
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

Database Export with :program:`mongodump`
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

The :program:`mongodump` utility performs a live backup the data, or
can work against an inactive set of database
files. The :program:`mongodump` utility can create a dump for an entire
server/database/collection (or part of a collection using of query,)
even when the database is running and active. If you run
:program:`mongodump` without any arguments the command will connect to
the local database instance (e.g. ``127.0.0.1`` or ``localhost``) and
create a database backup in a in the current directory named
"``dump/``".

You can specify  database and collection as options to the
:program:`mongodump` command to limit the amount of data included in the
database dump. For example:

.. code-block:: sh

   mongodump --collection collection --database test

This command creates a dump in of the database in the "``dump/``"
directory of only the collection named "``collection``" in the
database named "``test``". :program:`mongodump` provides the
":option:`--oplog <mongodump --oplog>`" option that forces the dump
operation to use the operation log to take a point-in-time snapshot of
the database.

With ":option:`--oplog <mongodump --oplog>`" , :program:`mongodump`
copies all the data from the source database, as well as all of the
:term:`oplog` entries from the beginning of the backup procedure to
until the backup procedure completes. This backup procedure, in
conjunction with :option:`mongorestore --oplogReplay`, allows you to
restore a backup that reflects a consistent and specific moment in
time.

If your MongoDB instance is not running, you can use the
":option:`--dbpath <mongodump --dbpath>`" option to specify the
location to your MongoDB instance's database files. :program:`mongodump`
reads from the data files directly with this operation. This
locks the data directory to prevent conflicting writes. The
:program:`mongod` process must *not* be running or attached to these
data files when you run :program:`mongodump` in this
configuration. Consider the following example:

.. code-block:: sh

   mongodump --dbpath /srv/mongodb

Additionally, the ":option:`--host <mongodump --host>`" and
":option:`--port <mongodump --port>`" options allow you to
specify a non-local host to connect to capture the export. Consider
the following example:

.. code-block:: sh

   mongodump --host mongodb1.example.net --port 3017 --username user --password pass /opt/backup/mongodumpm-2011-10-24

On any :program:`mongodump` command you may, as above specify username
and password credentials to specify database authentication.

Database Import with :program:`mongorestore`
--------------------------------------------

The :program:`mongorestore` utility restores a binary backup created by
:program:`mongodump`. Consider the following example command:

.. code-block:: sh

   mongorestore dump-2011-10-25/

Here, :program:`mongorestore` imports the database backup located in
the ``dump-2011-10-25`` directory to the :option:`mongod` instance
running on the localhost interface. By default, :program:`mongorestore`
will look for a database dump in the "``dump/``" directory and restore
that. If you wish to restore to a non-default host, the
":option:`--host <mongod>`" and ":option:`--port <mongod --port>`"
options allow you to specify a non-local host to connect to capture
the export. Consider the following example:

.. code-block:: sh

   mongorestore --host mongodb1.example.net --port 3017 --username user --password pass /opt/backup/mongodumpm-2011-10-24

On any :program:`mongorestore` command you may, as above specify
username and password credentials as above.

If you created your database dump using the :option:`--oplog
<mongodump --oplog>` option to ensure a point-in-time snapshot, call
:program:`mongorestore` with the ":option:`--oplogReplay <mongorestore
--oplogReplay>`" option as in the following example:

.. code-block:: sh

   mongorestore --oplogReplay

You may also consider using the :option:`mongorestore --objcheck`
option to check the integrity of objects while inserting them into the
database, or the :option:`mongorestore --drop` option to drop each
collection from the database before restoring from
backups. :program:`mongorestore` also includes the ability to a filter
to all input before inserting it into the new database. Consider the
following example:

.. code-block:: sh

   mongorestore --filter '{"field": 1}'

Here, :program:`mongorestore` only adds documents to the database from
the dump located in the "``dump/``" folder *if* the documents have a
field name "``field``" that holds a value of "``1``". Enclose the
filter in single quotes (e.g. "``'``") to prevent the filter from
interacting with your shell environment.

.. code-block:: sh

   mongorestore --dbpath /srv/mongodb --journal

Here, :program:`mongorestore` restores the database dump located in
``dump/`` folder into the data files located at ``/srv/mongodb``, with
the :option:`--dbpath <mongorestore --dbpath>` option. Additionally,
the ":option:`--journal <mongorestore --journal>`" option ensures that
:program:`mongorestore` records all operation in the durability
:term:`journal`. The journal prevents data file corruption if anything
(e.g. power failure, disk failure, etc.)  interrupts the restore
operation.

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
to the :program:`mongos` and taking a dump or export of the database
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

These backups must not only capture the database in a
consistent state, as described in the aforementioned procedures, but
the :term:`shard cluster` needs to be consistent in itself. Also,
disable the balancer process that equalizes the distribution of data
among the :term:`shards <shard>` before taking the backup.

You should also all cluster members so that your backups reflect your
entire database system at a single point in time, even if your backup
methodology does not require.

.. warning::

   It is essential that you stop the balancer before creating
   backups. If the balancer remains active, your resulting backups
   could have duplicate data or miss some data, as :term:`chunks <chunk>`
   migrate while recording backups.

   Similarly, if you do not lock all shards at the same time,
   the backup can reflect an inconsistent state that is impossible to
   restore from.

To stop the balancer, connect to the :program:`mongos` with the :option`mongo`
shell and issue the following 2 commands:

.. code-block:: javascript

   use config
   db.settings.update( { _id: "balancer" }, { $set : { stopped: true } } , true );

After disabling the balancer, proceed with your backup in the
following sequence:

1. Lock all shards, using a process to lock all shard
   instances in as short of an interval as possible.

2. Use :program:`mongodump` to backup the config database. Issue this command
   against the config database itself or the
   :program:`mongos`, and would resemble the following:

   .. code-block:: sh

      mongodump --database config

2. Record a backup of all shards

3. Unlock all shards.

4. Restore the balancer.

Use the following command sequence when connected to the :program:`mongos`
with the :program:`mongo` shell:

.. code-block:: javascript

   use config
   db.settings.update( { _id: "balancer" }, { $set : { stopped: false } } , true );

If you have an automated backup schedule, you can disable all
balancing operations for a period of time. For instance, consider the
following command:

.. code-block:: javascript

   use config
   db.settings.update( { _id : "balancer" }, { $set : { activeWindow : { start : "6:00", stop : "23:00" } } }, true )

This operation configures the balancer to run between 6:00 am and
11:00pm, server time. Schedule your backup operation to run *and
complete* in this time. Ensure that the backup can complete during the
window when the balancer is running *and* that the balancer can
effectively balance the collection among the shards in the window
allotted to each.

.. _replica-set-backups:

Replica Sets
~~~~~~~~~~~~

In most cases, backing up data stored in replica is similar to backing
up data stored in a single instance. It's possible to lock a single
:term:`slave` or :term:`secondary` database and then create a backup
from that instance. When you unlock the database, the slave will catch
:term:`master` or :term:`primary` node. You may also chose to deploy a
dedicated :term:`hidden member` for backup purposes.

If you have a sharded cluster where each shard is itself a replica
set, you can use this method to create a backup of the entire cluster
without disrupting the operation of the node. In these situations you
should still turn off the balancer when you create backups.

For any cluster, using a non-master/primary node to create backups is
particularly advantageous, in that the backup operation does not
affect the performance of the master or primary node. Replication
itself provides some measure of redundancy. Nevertheless, keeping
point-in time backups of your cluster to provide for disaster recovery
and as an additional layer of protection is crucial.
