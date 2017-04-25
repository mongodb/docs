+++
title = "Back Up a Sharded Cluster with File System Snapshots"

[tags]
mongodb = "product"
+++

# Back Up a Sharded Cluster with File System Snapshots

Changed in version 3.2: Starting in MongoDB 3.2, the procedure can be used with the
[MMAPv1](https://docs.mongodb.com/manual/core/mmapv1) and the [WiredTiger](https://docs.mongodb.com/manual/core/wiredtiger) storage engines. With previous versions of
MongoDB, the procedure applied to [MMAPv1](https://docs.mongodb.com/manual/core/mmapv1) only.


## Overview

This document describes a procedure for taking a backup of all
components of a [*sharded cluster*](https://docs.mongodb.com/manual/reference/glossary/#term-sharded-cluster). This procedure uses file system
snapshots to capture a copy of the [``mongod``](https://docs.mongodb.com/manual/reference/program/mongod/#bin.mongod) instance. An
alternate procedure uses [``mongodump``](https://docs.mongodb.com/manual/reference/program/mongodump/#bin.mongodump) to create binary
database dumps when file-system snapshots are not available. See
[Back Up a Sharded Cluster with Database Dumps](backup-sharded-cluster-with-database-dumps/) for the
alternate procedure.

Important: To capture a point-in-time backup from a sharded cluster you **must** stop *all* writes to the cluster. On a running production system, you can only capture an *approximation* of point-in-time snapshot.

For more information on backups in MongoDB and backups of sharded
clusters in particular, see [MongoDB Backup Methods](https://docs.mongodb.com/manual/core/backups) and
[Backup and Restore Sharded Clusters](https://docs.mongodb.com/manual/administration/backup-sharded-clusters).


## Considerations


### Balancer

It is *essential* that you stop the [balancer](https://docs.mongodb.com/manual/core/sharding-balancer-administration/#sharding-internals-balancing) before capturing a backup.

If the balancer is active while you capture backups, the backup
artifacts may be incomplete and/or have duplicate data, as [*chunks*](https://docs.mongodb.com/manual/reference/glossary/#term-chunk) may migrate while recording backups.


### Precision

In this procedure, you will stop the cluster balancer and take a backup
up of the [*config database*](https://docs.mongodb.com/manual/reference/glossary/#term-config-database), and then take backups of each
shard in the cluster using a file-system snapshot tool. If you need an
exact moment-in-time snapshot of the system, you will need to stop all
application writes before taking the file system snapshots; otherwise
the snapshot will only approximate a moment in time.

For approximate point-in-time snapshots, you can minimize the impact on
the cluster by taking the backup from a secondary member of each
replica set shard.


### Consistency

If the journal and data files are on the same logical volume, you can
use a single point-in-time snapshot to capture a consistent copy of the
data files.

If the journal and data files are on different file systems, you must
use [``db.fsyncLock()``](https://docs.mongodb.com/manual/reference/method/db.fsyncLock/#db.fsyncLock) and [``db.fsyncUnlock()``](https://docs.mongodb.com/manual/reference/method/db.fsyncUnlock/#db.fsyncUnlock) to ensure
that the data files do not change, providing consistency for the
purposes of creating backups.


### Snapshots with Amazon EBS in a RAID 10 Configuration

If your deployment depends on Amazon's Elastic Block Storage (EBS) with
RAID configured within your instance, it is impossible to get a
consistent state across all disks using the platform's snapshot tool. As
an alternative, you can do one of the following:

* Flush all writes to disk and create a write lock to ensure consistent state during the backup process.

  If you choose this option see [Back up Instances with Journal Files on Separate Volume or without Journaling](https://docs.mongodb.com/manual/tutorial/backup-with-filesystem-snapshots/#backup-without-journaling).

* Configure [*LVM*](https://docs.mongodb.com/manual/reference/glossary/#term-lvm) to run and hold your MongoDB data files on top of the RAID within your system.

  If you choose this option, perform the LVM backup operation described
  in [Create a Snapshot](https://docs.mongodb.com/manual/tutorial/backup-with-filesystem-snapshots/#lvm-backup-operation).


## Procedure


### Step 1: Disable the balancer.

To disable the [balancer](https://docs.mongodb.com/manual/core/sharding-balancer-administration/#sharding-internals-balancing),
connect the [``mongo``](https://docs.mongodb.com/manual/reference/program/mongo/#bin.mongo) shell to a [``mongos``](https://docs.mongodb.com/manual/reference/program/mongos/#bin.mongos) instance and run
[``sh.stopBalancer()``](https://docs.mongodb.com/manual/reference/method/sh.stopBalancer/#sh.stopBalancer) in the ``config`` database.

```javascript

use config
sh.stopBalancer()

```

For more information, see the
[Disable the Balancer](https://docs.mongodb.com/manual/tutorial/manage-sharded-cluster-balancer/#sharding-balancing-disable-temporarily) procedure.


### Step 2: If necessary, lock one secondary member of each replica set.

If your secondary does not have journaling enabled *or* its
journal and data files are on different volumes, you **must** lock
the secondary's [``mongod``](https://docs.mongodb.com/manual/reference/program/mongod/#bin.mongod) instance before capturing a backup.

If your secondary has journaling enabled and its journal and data
files are on the same volume, you may skip this step.

Important: If your deployment requires this step, you must perform it on one secondary of each shard and one secondary of the [config server replica set (CSRS)](https://docs.mongodb.com/manual/core/sharded-cluster-config-servers/#replset-config-servers).

Ensure that the [*oplog*](https://docs.mongodb.com/manual/reference/glossary/#term-oplog) has sufficient capacity to allow these
secondaries to catch up to the state of the primaries after finishing
the backup procedure. See [Oplog Size](https://docs.mongodb.com/manual/core/replica-set-oplog/#replica-set-oplog-sizing) for more
information.


#### Lock shard replica set secondary.

For each shard replica set in the sharded cluster, connect a
[``mongo``](https://docs.mongodb.com/manual/reference/program/mongo/#bin.mongo) shell to the secondary member's
[``mongod``](https://docs.mongodb.com/manual/reference/program/mongod/#bin.mongod) instance and run [``db.fsyncLock()``](https://docs.mongodb.com/manual/reference/method/db.fsyncLock/#db.fsyncLock).

```javascript

db.fsyncLock()

```

When calling [``db.fsyncLock()``](https://docs.mongodb.com/manual/reference/method/db.fsyncLock/#db.fsyncLock), ensure that the connection
is kept open to allow a subsequent call to
[``db.fsyncUnlock()``](https://docs.mongodb.com/manual/reference/method/db.fsyncUnlock/#db.fsyncUnlock).


#### Lock config server replica set secondary.

If locking a secondary of the CSRS, confirm that the member has
replicated data up to some control point. To verify, first connect a
[``mongo``](https://docs.mongodb.com/manual/reference/program/mongo/#bin.mongo) shell to the CSRS primary and perform a write
operation with [``"majority"``](https://docs.mongodb.com/manual/reference/write-concern/#writeconcern."majority") write concern on a
control collection:

```javascript

use config
db.BackupControl.findAndModify(
   {
     query: { _id: 'BackupControlDocument' },
     update: { $inc: { counter : 1 } },
     new: true,
     upsert: true,
     writeConcern: { w: 'majority', wtimeout: 15000 } }
   }
);

```

The operation should return the modified (or inserted) control
document:

```javascript

{ "_id" : "BackupControlDocument", "counter" : 1 }

```

Query the CSRS secondary member for the returned control
document. Connect a [``mongo``](https://docs.mongodb.com/manual/reference/program/mongo/#bin.mongo) shell to the CSRS secondary
to lock and use [``db.collection.find()``](https://docs.mongodb.com/manual/reference/method/db.collection.find/#db.collection.find) to query for the
control document:

```javascript

rs.slaveOk();
use config;

db.BackupControl.find(
   { "_id" : "BackupControlDocument", "counter" : 1 }
).readConcern('majority');

```

If the secondary member contains the latest control document, it
is safe to lock the member. Otherwise, wait until the member
contains the document or select a different secondary member
that contains the latest control document.

To lock the secondary member, run [``db.fsyncLock()``](https://docs.mongodb.com/manual/reference/method/db.fsyncLock/#db.fsyncLock) on
the member:

```javascript

db.fsyncLock()

```

When calling [``db.fsyncLock()``](https://docs.mongodb.com/manual/reference/method/db.fsyncLock/#db.fsyncLock), ensure that the connection is
kept open to allow a subsequent call to [``db.fsyncUnlock()``](https://docs.mongodb.com/manual/reference/method/db.fsyncUnlock/#db.fsyncUnlock).


### Step 3: Back up one of the config servers.

Note: Backing up a [config server](https://docs.mongodb.com/manual/core/sharded-cluster-config-servers/#sharding-config-server) backs up the sharded cluster's metadata. You only need to back up one config server, as they all hold the same data. Perform this step against the locked CSRS secondary member.

To create a file-system snapshot of the config server, follow the
procedure in [Create a Snapshot](https://docs.mongodb.com/manual/tutorial/backup-with-filesystem-snapshots/#lvm-backup-operation).


### Step 4: Back up a replica set member for each shard.

If you locked a member of the replica set shards, perform this step
against the locked secondary.

You may back up the shards in parallel. For each shard, create a
snapshot, using the procedure in
[Back Up and Restore with Filesystem Snapshots](backup-with-filesystem-snapshots/).


### Step 5: Unlock all locked replica set members.

If you locked any [``mongod``](https://docs.mongodb.com/manual/reference/program/mongod/#bin.mongod) instances to capture the backup,
unlock them.

To unlock the replica set members, use [``db.fsyncUnlock()``](https://docs.mongodb.com/manual/reference/method/db.fsyncUnlock/#db.fsyncUnlock)
method in the [``mongo``](https://docs.mongodb.com/manual/reference/program/mongo/#bin.mongo) shell. For each locked member, use the
same [``mongo``](https://docs.mongodb.com/manual/reference/program/mongo/#bin.mongo) shell used to lock the instance.

```javascript

db.fsyncUnlock()

```


### Step 6: Enable the balancer.

To re-enable to balancer, connect the [``mongo``](https://docs.mongodb.com/manual/reference/program/mongo/#bin.mongo) shell to a
[``mongos``](https://docs.mongodb.com/manual/reference/program/mongos/#bin.mongos) instance and run
[``sh.setBalancerState()``](https://docs.mongodb.com/manual/reference/method/sh.setBalancerState/#sh.setBalancerState).

```javascript

sh.setBalancerState(true)

```


## Additional Resources

See also [MongoDB Cloud Manager](https://www.mongodb.com/cloud/cloud-manager/?jmp=docs) for seamless automation, backup, and monitoring.
