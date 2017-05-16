+++
title = "Back Up a Sharded Cluster with Database Dumps"

tags = [
"mongodb",
"administration",
"sharding",
"advanced" ]
+++

# Back Up a Sharded Cluster with Database Dumps

Changed in version 3.2: Starting in MongoDB 3.2, the following procedure can be used with the
[MMAPv1](https://docs.mongodb.com/manual/core/mmapv1) and the [WiredTiger](https://docs.mongodb.com/manual/core/wiredtiger) storage engines. With previous versions of
MongoDB, the procedure applied to [MMAPv1](https://docs.mongodb.com/manual/core/mmapv1) only.


## Overview

This document describes a procedure for taking a backup of all
components of a [*sharded cluster*](https://docs.mongodb.com/manual/reference/glossary/#term-sharded-cluster). This procedure
uses [``mongodump``](https://docs.mongodb.com/manual/reference/program/mongodump/#bin.mongodump) to create dumps of the [``mongod``](https://docs.mongodb.com/manual/reference/program/mongod/#bin.mongod)
instances.

You may alternatively use [file system snapshots](backup-sharded-cluster-with-filesystem-snapshots/) to capture
the backup data. File system snapshots may be more efficient in some
situations if your system configuration supports them.

For more information on backups in MongoDB and backups of sharded
clusters in particular, see [MongoDB Backup Methods](https://docs.mongodb.com/manual/core/backups) and
[Backup and Restore Sharded Clusters](https://docs.mongodb.com/manual/administration/backup-sharded-clusters).


## Prerequisites

Important: To capture a point-in-time backup from a sharded cluster you **must** stop *all* writes to the cluster. On a running production system, you can only capture an *approximation* of point-in-time snapshot.


### Access Control

The [``backup``](https://docs.mongodb.com/manual/reference/built-in-roles/#backup) role provides the required privileges to perform
backup on a sharded cluster that has access control enabled.

Changed in version 3.2.1: The [``backup``](https://docs.mongodb.com/manual/reference/built-in-roles/#backup) role provides additional privileges to back
up the [``system.profile``](https://docs.mongodb.com/manual/reference/system-collections/#<database>.system.profile)
collections that exist when running with [database profiling](https://docs.mongodb.com/manual/administration/analyzing-mongodb-performance/#database-profiling). Previously, users required an additional
``read`` access on this collection.


## Consideration

To create backups of a sharded cluster, you will stop the
cluster balancer, take a backup of the [*config database*](https://docs.mongodb.com/manual/reference/glossary/#term-config-database),
and then take backups of each shard in the cluster using
[``mongodump``](https://docs.mongodb.com/manual/reference/program/mongodump/#bin.mongodump) to capture the backup data. To capture a more
exact moment-in-time snapshot of the system, you will need to stop all
application writes before taking the filesystem snapshots; otherwise
the snapshot will only approximate a moment in time.

For approximate point-in-time snapshots, you can minimize the impact on
the cluster by taking the backup from a secondary member of each
replica set shard.


## Procedure


### Step 1: Disable the balancer process.

To disable the [balancer](https://docs.mongodb.com/manual/core/sharding-balancer-administration/#sharding-internals-balancing),
connect the [``mongo``](https://docs.mongodb.com/manual/reference/program/mongo/#bin.mongo) shell to a [``mongos``](https://docs.mongodb.com/manual/reference/program/mongos/#bin.mongos) instance and run
[``sh.stopBalancer()``](https://docs.mongodb.com/manual/reference/method/sh.stopBalancer/#sh.stopBalancer) in the ``config`` database.

```javascript

use config
sh.stopBalancer()

```

For more information, see the
[Disable the Balancer](https://docs.mongodb.com/manual/tutorial/manage-sharded-cluster-balancer/#sharding-balancing-disable-temporarily) procedure.

Warning: If you do not stop the balancer, the backup could have duplicate data or omit data as [*chunks*](https://docs.mongodb.com/manual/reference/glossary/#term-chunk) migrate while recording backups.


### Step 2: Lock one secondary member of each replica set.

Lock a secondary member of each replica set in the sharded cluster,
and one secondary of the [config server replica set (CSRS)](https://docs.mongodb.com/manual/core/sharded-cluster-config-servers/#replset-config-servers).

Ensure that the [*oplog*](https://docs.mongodb.com/manual/reference/glossary/#term-oplog) has sufficient capacity to allow these
secondaries to catch up to the state of the primaries after
finishing the backup procedure. See [Oplog Size](https://docs.mongodb.com/manual/core/replica-set-oplog/#replica-set-oplog-sizing)
for more information.


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
     writeConcern: { w: 'majority', wtimeout: 15000 }
   }
);

```

The operation should return either the newly inserted document or the
updated document:

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


### Step 3: Backup one config server.

Run [``mongodump``](https://docs.mongodb.com/manual/reference/program/mongodump/#bin.mongodump) against a config server [``mongod``](https://docs.mongodb.com/manual/reference/program/mongod/#bin.mongod)
instance to back up the cluster's metadata. You only need to back up
one config server. Perform this step
against the locked config server.

Use [``mongodump``](https://docs.mongodb.com/manual/reference/program/mongodump/#bin.mongodump) with the [``--oplog``](https://docs.mongodb.com/manual/reference/program/mongodump/#cmdoption-oplog) option to
backup one of the [config servers](https://docs.mongodb.com/manual/core/sharded-cluster-config-servers/#sharding-config-server).

```sh

mongodump --oplog

```

If your deployment uses CSRS config servers, unlock the config server
node before proceeding to the next step.
To unlock the CSRS member, use [``db.fsyncUnlock()``](https://docs.mongodb.com/manual/reference/method/db.fsyncUnlock/#db.fsyncUnlock) method in
the [``mongo``](https://docs.mongodb.com/manual/reference/program/mongo/#bin.mongo) shell used to lock the instance.

```javascript

db.fsyncUnlock()

```


### Step 4: Back up a replica set member for each shard.

Back up the locked replica set members of the shards using
[``mongodump``](https://docs.mongodb.com/manual/reference/program/mongodump/#bin.mongodump) with the
[``--oplog``](https://docs.mongodb.com/manual/reference/program/mongodump/#cmdoption-oplog) option. You may back up the
shards in parallel.

```sh

mongodump --oplog

```


### Step 5: Unlock replica set members for each shard.

To unlock the replica set members, use [``db.fsyncUnlock()``](https://docs.mongodb.com/manual/reference/method/db.fsyncUnlock/#db.fsyncUnlock)
method in the [``mongo``](https://docs.mongodb.com/manual/reference/program/mongo/#bin.mongo) shell. For each locked member, use the
same [``mongo``](https://docs.mongodb.com/manual/reference/program/mongo/#bin.mongo) shell used to lock the instance.

```javascript

db.fsyncUnlock()

```

Allow these members to catch up with the state of the primary.


### Step 6: Re-enable the balancer process.

To re-enable to balancer, connect the [``mongo``](https://docs.mongodb.com/manual/reference/program/mongo/#bin.mongo) shell to a
[``mongos``](https://docs.mongodb.com/manual/reference/program/mongos/#bin.mongos) instance and run
[``sh.setBalancerState()``](https://docs.mongodb.com/manual/reference/method/sh.setBalancerState/#sh.setBalancerState).

```javascript

use config
sh.setBalancerState(true)

```


## Additional Resources

See also [MongoDB Cloud Manager](https://www.mongodb.com/cloud/cloud-manager/?jmp=docs) for seamless automation, backup, and monitoring.
