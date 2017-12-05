+++
title = "Back Up and Restore with Filesystem Snapshots"

tags = [
"mongodb",
"administration",
"intermediate" ]
+++

# Back Up and Restore with Filesystem Snapshots

This document describes a procedure for creating backups of MongoDB
systems using system-level tools, such as [*LVM*](https://docs.mongodb.com/manual/reference/glossary/#term-lvm) or storage
appliance, as well as the corresponding restoration strategies.

These filesystem snapshots, or "block-level" backup methods, use system
level tools to create copies of the device that holds MongoDB's data
files. These methods complete quickly and work reliably, but require
additional system configuration outside of MongoDB.

Changed in version 3.2: MongoDB 3.2 added support for volume-level back up of MongoDB instances
using the [WiredTiger](https://docs.mongodb.com/manual/core/wiredtiger) storage engine when
the MongoDB instance's data files and journal files reside on separate
volumes. Prior to MongoDB 3.2, creating volume-level backups
of MongoDB instances using WiredTiger required that the data files and journal
reside on the same volume.

See also: [MongoDB Backup Methods](https://docs.mongodb.com/manual/core/backups) and [Back Up and Restore with MongoDB Tools](https://docs.mongodb.com/manual/tutorial/backup-and-restore-tools).

<span id="snapshots-overview"></span>


## Snapshots Overview

Snapshots work by creating pointers between the live data and a
special snapshot volume. These pointers are theoretically equivalent
to "hard links." As the working data diverges from the snapshot,
the snapshot process uses a copy-on-write strategy. As a result, the snapshot
only stores modified data.

After making the snapshot, you mount the snapshot image on your
file system and copy data from the snapshot. The resulting backup
contains a full copy of all data.


### Considerations


#### Valid Database at the Time of Snapshot

The database must be valid when the snapshot takes place. This means
that all writes accepted by the database need to be fully written to
disk: either to the [*journal*](https://docs.mongodb.com/manual/reference/glossary/#term-journal) or to data files.

If there are writes that are not on disk when the backup occurs, the backup
will not reflect these changes.

For the [MMAPv1 storage engine](https://docs.mongodb.com/manual/core/mmapv1), if writes are
*in progress* when the backup occurs, the data files will reflect an
inconsistent state. With [journaling](https://docs.mongodb.com/manual/core/journaling/#journaling-mmapv1), all
data file states resulting from in-progress writes are recoverable;
without journaling, you must flush all pending writes to disk before
running the back up operation and must ensure that no writes occur
during the entire back up procedure. If you do use journaling, the
journal **must** reside on the same volume as the data.

For the [WiredTiger storage engine](https://docs.mongodb.com/manual/core/wiredtiger), the data
files reflect a consistent state as of the last [checkpoint](https://docs.mongodb.com/manual/core/wiredtiger/#storage-wiredtiger-checkpoints). Checkpoints occur with every 2 GB of
data or every minute.


#### Entire Disk Image

Snapshots create an image of an entire disk image. Unless you need to
back up your entire system, consider isolating your MongoDB data files,
journal (if applicable), and configuration on one logical disk that
doesn't contain any other data.

Alternately, store all MongoDB data files on a dedicated device
so that you can make backups without duplicating extraneous data.


#### Site Failure Precaution

Ensure that you copy data from snapshots onto other systems. This
ensures that data is safe from site failures.


#### No Incremental Backups

This tutorial does not include procedures for incremental backups.
Although different snapshot methods provide different features, the
LVM method outlined below does not provide any capacity for capturing
incremental backups.

<span id="backup-with-journaling"></span>


### Snapshots With Journaling

If your [``mongod``](https://docs.mongodb.com/manual/reference/program/mongod/#bin.mongod) instance has journaling enabled, then you can
use any kind of file system or volume/block level snapshot tool to
create backups.

If you manage your own infrastructure on a Linux-based system, configure
your system with [*LVM*](https://docs.mongodb.com/manual/reference/glossary/#term-lvm) to provide your disk packages and provide
snapshot capability. You can also use LVM-based setups *within* a
cloud/virtualized environment.

Note: Running [*LVM*](https://docs.mongodb.com/manual/reference/glossary/#term-lvm) provides additional flexibility and enables the possibility of using snapshots to back up MongoDB.


### Snapshots with Amazon EBS in a RAID 10 Configuration

If your deployment depends on Amazon's Elastic Block Storage (EBS) with
RAID configured within your instance, it is impossible to get a
consistent state across all disks using the platform's snapshot tool. As
an alternative, you can do one of the following:

* Flush all writes to disk and create a write lock to ensure consistent state during the backup process.

  If you choose this option see [Back up Instances with Journal Files on Separate Volume or without Journaling](#backup-without-journaling).

* Configure [*LVM*](https://docs.mongodb.com/manual/reference/glossary/#term-lvm) to run and hold your MongoDB data files on top of the RAID within your system.

  If you choose this option, perform the LVM backup operation described
  in [Create a Snapshot](#lvm-backup-operation).

<span id="lvm-backup-and-restore"></span>


## Back Up and Restore Using LVM on Linux

This section provides an overview of a simple backup process
using [*LVM*](https://docs.mongodb.com/manual/reference/glossary/#term-lvm) on a Linux system. While the tools, commands, and paths may
be (slightly) different on your system the following steps provide a
high level overview of the backup operation.

Note: Only use the following procedure as a guideline for a backup system and infrastructure. Production backup systems must consider a number of application specific requirements and factors unique to specific environments.

<span id="lvm-backup-operation"></span>


### Create a Snapshot

Changed in version 3.2: Starting in MongoDB 3.2, for the purpose of volume-level backup of
MongoDB instances using WiredTiger, the data files and the journal
are no longer required to reside on a single volume.

To create a snapshot with [*LVM*](https://docs.mongodb.com/manual/reference/glossary/#term-lvm), issue a command as root in the
following format:

```sh

lvcreate --size 100M --snapshot --name mdb-snap01 /dev/vg0/mongodb

```

This command creates an [*LVM*](https://docs.mongodb.com/manual/reference/glossary/#term-lvm) snapshot (with the ``--snapshot`` option)
named ``mdb-snap01`` of the ``mongodb`` volume in the ``vg0``
volume group.

This example creates a snapshot named ``mdb-snap01`` located at
``/dev/vg0/mdb-snap01``. The location and paths to your systems volume
groups and devices may vary slightly depending on your operating
system's [*LVM*](https://docs.mongodb.com/manual/reference/glossary/#term-lvm) configuration.

The snapshot has a cap of at 100 megabytes, because of the parameter
``--size 100M``. This size does not reflect the total amount of the
data on the disk, but rather the quantity of differences between the
current state of ``/dev/vg0/mongodb`` and the creation of the snapshot
(i.e. ``/dev/vg0/mdb-snap01``.)

Warning: Ensure that you create snapshots with enough space to account for data growth, particularly for the period of time that it takes to copy data out of the system or to a temporary image. If your snapshot runs out of space, the snapshot image becomes unusable. Discard this logical volume and create another.

The snapshot will exist when the command returns. You can restore
directly from the snapshot at any time or by creating a new logical
volume and restoring from this snapshot to the alternate image.

While snapshots are great for creating high quality backups
quickly, they are not ideal as a format for storing backup
data. Snapshots typically depend and reside on the same storage
infrastructure as the original disk images. Therefore, it's crucial
that you archive these snapshots and store them elsewhere.


### Archive a Snapshot

After creating a snapshot, mount the snapshot and copy the data to
separate storage. Your system might try to compress the backup images as
you move them offline. Alternatively, take a block level copy of the
snapshot image, such as with the following procedure:

```sh

umount /dev/vg0/mdb-snap01
dd if=/dev/vg0/mdb-snap01 | gzip > mdb-snap01.gz

```

The above command sequence does the following:

* Ensures that the ``/dev/vg0/mdb-snap01`` device is not mounted.  Never take a block level copy of a filesystem or filesystem snapshot that is mounted.

* Performs a block level copy of the entire snapshot image using the ``dd`` command and compresses the result in a gzipped file in the current working directory.

  Warning: This command will create a large ``gz`` file in your current working directory. Make sure that you run this command in a file system that has enough free space.

<span id="backup-restore-snapshot"></span>


### Restore a Snapshot

To restore a snapshot created with [*LVM*](https://docs.mongodb.com/manual/reference/glossary/#term-lvm), issue the following
sequence of commands:

```sh

lvcreate --size 1G --name mdb-new vg0
gzip -d -c mdb-snap01.gz | dd of=/dev/vg0/mdb-new
mount /dev/vg0/mdb-new /srv/mongodb

```

The above sequence does the following:

* Creates a new logical volume named ``mdb-new``, in the ``/dev/vg0`` volume group. The path to the new device will be ``/dev/vg0/mdb-new``.

  Warning: This volume will have a maximum size of 1 gigabyte. The original file system must have had a total size of 1 gigabyte or smaller, or else the restoration will fail. Change ``1G`` to your desired volume size.

* Uncompresses and unarchives the ``mdb-snap01.gz`` into the ``mdb-new`` disk image.

* Mounts the ``mdb-new`` disk image to the ``/srv/mongodb`` directory. Modify the mount point to correspond to your MongoDB data file location, or other location as needed.

Note: The restored snapshot will have a stale ``mongod.lock`` file. If you do not remove this file from the snapshot, and MongoDB may assume that the stale lock file indicates an unclean shutdown. If you're running with [``storage.journal.enabled``](https://docs.mongodb.com/manual/reference/configuration-options/#storage.journal.enabled) enabled, and you *do not* use [``db.fsyncLock()``](https://docs.mongodb.com/manual/reference/method/db.fsyncLock/#db.fsyncLock), you do not need to remove the ``mongod.lock`` file. If you use [``db.fsyncLock()``](https://docs.mongodb.com/manual/reference/method/db.fsyncLock/#db.fsyncLock) you will need to remove the lock.

<span id="backup-restore-from-snapshot"></span>


### Restore Directly from a Snapshot

To restore a backup without writing to a compressed ``gz`` file, use
the following sequence of commands:

```sh

umount /dev/vg0/mdb-snap01
lvcreate --size 1G --name mdb-new vg0
dd if=/dev/vg0/mdb-snap01 of=/dev/vg0/mdb-new
mount /dev/vg0/mdb-new /srv/mongodb

```

Note: *New in version 3.6:* All MongoDB collections have UUIDs (Universally unique identifiers) by default. When MongoDB restores collections, the restored collections retain their original UUIDs. When restoring a collection where no UUID was present, MongoDB generates a UUID for the restored collection. For more information on collection UUIDs, see [Collections](https://docs.mongodb.com/v3.6/core/databases-and-collections/#collections).


### Remote Backup Storage

You can implement off-system backups using the [combined process](#backup-restore-from-snapshot) and SSH.

This sequence is identical to procedures explained above, except that it
archives and compresses the backup on a remote system using SSH.

Consider the following procedure:

```sh

umount /dev/vg0/mdb-snap01
dd if=/dev/vg0/mdb-snap01 | ssh username@example.com gzip > /opt/backup/mdb-snap01.gz
lvcreate --size 1G --name mdb-new vg0
ssh username@example.com gzip -d -c /opt/backup/mdb-snap01.gz | dd of=/dev/vg0/mdb-new
mount /dev/vg0/mdb-new /srv/mongodb

```

<span id="backup-without-journaling"></span>


## Back up Instances with Journal Files on Separate Volume or without Journaling

Changed in version 3.2: Starting in MongoDB 3.2, for the purpose of volume-level backup of
MongoDB instances using WiredTiger, the data files and the journal
are no longer required to reside on a single volume.

If your [``mongod``](https://docs.mongodb.com/manual/reference/program/mongod/#bin.mongod) instance is either running without journaling
or has the journal files on a separate volume, you must flush all
writes to disk and lock the database to prevent writes during the
backup process. If you have a [*replica set*](https://docs.mongodb.com/manual/reference/glossary/#term-replica-set) configuration, then
for your backup use a [*secondary*](https://docs.mongodb.com/manual/reference/glossary/#term-secondary) which is not receiving reads
(i.e. [*hidden member*](https://docs.mongodb.com/manual/reference/glossary/#term-hidden-member)).

Important: In the following procedure to create backups, you **must** issue the [``db.fsyncLock()``](https://docs.mongodb.com/manual/reference/method/db.fsyncLock/#db.fsyncLock) and [``db.fsyncUnlock()``](https://docs.mongodb.com/manual/reference/method/db.fsyncUnlock/#db.fsyncUnlock) operations on the same connection. The client that issues [``db.fsyncLock()``](https://docs.mongodb.com/manual/reference/method/db.fsyncLock/#db.fsyncLock) is solely responsible for issuing a [``db.fsyncUnlock()``](https://docs.mongodb.com/manual/reference/method/db.fsyncUnlock/#db.fsyncUnlock) operation and must be able to handle potential error conditions so that it can perform the [``db.fsyncUnlock()``](https://docs.mongodb.com/manual/reference/method/db.fsyncUnlock/#db.fsyncUnlock) before terminating the connection.


### Step 1: Flush writes to disk and lock the database to prevent further writes.

To flush writes to disk and to "lock" the database, issue the
[``db.fsyncLock()``](https://docs.mongodb.com/manual/reference/method/db.fsyncLock/#db.fsyncLock) method in the [``mongo``](https://docs.mongodb.com/manual/reference/program/mongo/#bin.mongo) shell:

```javascript

db.fsyncLock();

```


### Step 2: Perform the backup operation described in [Create a Snapshot](#lvm-backup-operation).


### Step 3: After the snapshot completes, unlock the database.

To unlock the database after the snapshot has completed, use the
following command in the [``mongo``](https://docs.mongodb.com/manual/reference/program/mongo/#bin.mongo) shell:

```javascript

db.fsyncUnlock();

```


## Additional Resources

See also [MongoDB Cloud Manager](https://www.mongodb.com/cloud/cloud-manager/?jmp=docs) for seamless automation, backup, and monitoring.
