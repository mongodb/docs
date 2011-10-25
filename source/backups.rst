=========================================
Backup and Restore Strategies for MongoDB
=========================================

This document provides an inventory of database backup strategies for
use with MongoDB. Use the :ref:`backup overview <backup-overview>` and
:ref:`considerations <backup-considerations>` as you develop the most
appropriate strategy for backing up your MongoDB environment. Then,
use the examples from the :ref:`block level backup methods
<block-level-backup>` section and possibly the
":doc:`import-export`" documentation to implement the backup
solution that is best suited to your deployment's needs.

A robust backup strategy along with at tested corresponding restore
strategy is crucial for every production-grade deployment. Take the
specific features of your deployment, it's use, and architecture into
consideration as you develop your own strategy.

.. _backup-overview:

Backup Overview
---------------

If you are familiar with backups systems in the context of database
systems please skip ahead to :ref:`backup considerations
<backup-considerations>`.

With MongoDB, the best way to are two major approaches to backups: using
system-level tools, like disk image snapshots, and using various
capacities present in :doc:`MongoDB tools <import-export>` to provide backup
functionality. The underlying goal of these strategies is to produce a
full copy of the data that can be used to bring up a new or
replacement database instance.

The methods described in this document operate by copying the data
file on the disk level, while MongoDB tools dump or export copies of
the data that can be imported into the new node. If your system does
not provide a capacity for this kind of backup, see
":doc:`import-export`" for more information.

One of the leading challenges for producing reliable backups from
database systems is ensuring that the state captured backup methods is
in a consistent and steerable state. Because every environment is
unique it's important to regularly test the backups that you capture
to ensure that your backup system is practically, and not just
theoretically, functional.

.. _backup-considerations:

Backup Considerations
---------------------

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

Block Level Backup Methods
--------------------------

This section will provides an overview of using disk/block level
snapshots (i.e. :term:`LVM` or storage appliance) to backup a MongoDB
instance. These tools make a quick block-level backup of the device
that holds MongoDB's data files. These methods complete quickly, work
reliably, and typically provide the easiest backup systems methods to
implement.

Snapshots typically work by creating what we can think of as "hard
links" between the live data and a special snapshot data. As the
working data diverges from the snapshot a copy-on-write strategy is
used so that the snapshot only stores  modified data. After making the
snapshot, when you mount the resulting image and copy the files
off system the resulting backup will contain full copies of all the
data.

.. moreinfo: <http://www.waterlovinghead.com/StorageLVMSnap>

TODO checking use of "we". I hate it, but I'm not smart enough right now to say it any other way.

There are some limitations to snapshots:

- The database must be in a consistent or recoverable state when the
  snapshot takes place. With journeying all states are recoverable,
  without journaling it's important that all pending operations are
  written to disk.

- Snapshots create an image of an entire disk image. Unless you need
  to back up your entire system, consider isolating your MongoDB data
  files, journal (if applicable,) and configuration on one logical
  disk that doesn't contain any other data.

- Ensure that you copy data from snapshots and onto other systems to
  ensure that data is safe from site-failures.

.. _backup-with-journaling:

Backup with Journaling
~~~~~~~~~~~~~~~~~~~~~~

If your system has a snapshot capability and ``mongod`` instance has
journaling enabled then you can use any kind of file system or
volume/block level snapshot tool to create backups.

.. note::

   Journaling is not enabled by default on systems running with 32-bit
   architectures.

.. warning::

   Journaling is disabled by default on pre-1.9.2 64-bit versions of
   MongoDB. Ensure that the journaling option is turned on by
   specifying "``journal: true``" in the configuration or running
   ``mongod`` with the "``--journal``" flag.

Many cloud service providers provide a block-level backup service
based on disk image snapshots. If you are managing your own
infrastructure on a Linux-based system configure your system with
:term:`LVM` to manage your disk packages and provide snapshot
capability. You can use LVM to manage volumes within a
cloud/virtualized environment

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
^^^^^^^^^^^^^^^

To create a snapshot with LVM issue a command, as root, in the
following format: ::

         lvcreate --size 100M --snapshot --name mdb-snap01 /dev/vg0/mongodb

This command creates a snapshot (with the "``--snapshot`` option)
named "``mdb-snap01``" of the "``mongodb``" volume in the "``vg0``"
volume group. The ``mdb-snap01`` volume in the above configuration
would be located at ``/dev/vg0/mdb-snap01``. The location and paths to
your systems volume groups and devices may be slightly different on
your distributions LVM configuration.

The snapshot is capped at 100 megabytes by the parameter "``--size
100M``". This size does not reflect the total amount of the data on
the disk, but rather the quantity of differences between the current
state of ``/dev/vg0/mongodb`` and the instant when ``/dev/vg0/mdb-snap01``
was created.

.. warning::

   Ensure that you create snapshots with enough space to account for
   data growth, particularly for a period of that it takes to copy to
   data out of the system.

   If you your snapshot runs out of space, the snapshot cannot be used
   and must be discarded.

The snapshot should be created instantly. You can restore directly
from the snapshot at any time, using the tools provided by your
service provider, or by creating a new logical volume and restoring
from this snapshot.

While snapshots are great for creating high quality backups very
quickly, they are not ideal as a format for storing backup
data. Snapshots typically depend and reside on the same storage
infrastructure as the original disk images. Therefore, it's crucial
that these snapshots be archived and stored elsewhere.

Archive Backup Snapshot
^^^^^^^^^^^^^^^^^^^^^^^

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

Restore Backup Snapshot
^^^^^^^^^^^^^^^^^^^^^^^

If you created a backup using the above method, restore this archive
with the following procedure: ::

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

2. Uncompresses and unarchives the "``mdb-snap01.tar.gz``" into the
   ``mdb-new`` disk image.

3. Mounts the ``mdb-new`` disk image to the ``/srv/mongodb``
   directory. Modify the mount point to correspond to your MongoDB
   data file location, or other location as needed.

Restore a Backup Directly from a Snapshot
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

To combine the above steps without writing to a compressed ``tar``
archive, use the following command sequence: ::

      umount /dev/vg0/mdb-snap01
      lvcreate --size 1G --name mdb-new vg0
      dd if=/dev/vg0/mdb-snap01 of=/dev/vg0/mdb-new
      mount /dev/vg0/mdb-new /srv/mongodb

Remote Backup Storage
^^^^^^^^^^^^^^^^^^^^^

You can implement off system backups using this method in combination
with SSH. Consider the following procedure: ::

     umount /dev/vg0/mdb-snap01
     dd if=/dev/vg0/mdb-snap01 | ssh username@example.com tar -czf /opt/backup/mdb-snap01.tar.gz
     lvcreate --size 1G --name mdb-new vg0
     ssh username@example.com tar -xzf /opt/backup/mdb-snap01.tar.gz | dd of=/dev/vg0/mdb-new
     mount /dev/vg0/mdb-new /srv/mongodb

This sequence is identical to procedures explained above except that
the output and input is directed (i.e. piped) over SSH to the remote
system.

.. _backup-without-journaling:

Backup without Journaling
~~~~~~~~~~~~~~~~~~~~~~~~~

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

Backup with Amazon EBS in Software RAID 10 Configuration
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

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

Other Backup Methods
--------------------

If your deployment does not provide a sufficient method for snapshots
or you only need to backup a small segment of data from the database
consider using one of the import or export methods described in the
":doc:`import-export`" document.
