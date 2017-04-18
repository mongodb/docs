+++
title = "Back Up a Sharded Cluster with Database Dumps"

[tags]
+++
# Back Up a Sharded Cluster with Database Dumps


# On this page

* [Overview](#overview) 

* [Prerequisites](#prerequisites) 

* [Consideration](#consideration) 

* [Procedure](#procedure) 

* [Additional Resources](#additional-resources) 

Changed in version 3.2: Starting in MongoDB 3.2, the following procedure can be used with the
[MMAPv1](#) and the [WiredTiger](#) storage engines. With previous versions of
MongoDB, the procedure applied to [MMAPv1](#) only.


## Overview

This document describes a procedure for taking a backup of all
components of a [*sharded cluster*](#term-sharded-cluster). This procedure
uses [``mongodump``](#bin.mongodump) to create dumps of the [``mongod``](#bin.mongod)
instances.

You may alternatively use [file system snapshots](#) to capture
the backup data. File system snapshots may be more efficient in some
situations if your system configuration supports them.

For more information on backups in MongoDB and backups of sharded
clusters in particular, see [MongoDB Backup Methods](#) and
[Backup and Restore Sharded Clusters](#).


## Prerequisites

Important: To capture a point-in-time backup from a sharded cluster you **must** stop *all* writes to the cluster. On a running production system, you can only capture an *approximation* of point-in-time snapshot. 


### Access Control

The [``backup``](#backup) role provides the required privileges to perform
backup on a sharded cluster that has access control enabled.

Changed in version 3.2.1: The [``backup``](#backup) role provides additional privileges to back
up the [``system.profile``](#<database>.system.profile)
collections that exist when running with [database profiling](#database-profiling). Previously, users required an additional
``read`` access on this collection.


## Consideration

To create backups of a sharded cluster, you will stop the
cluster balancer, take a backup of the [*config database*](#term-config-database),
and then take backups of each shard in the cluster using
[``mongodump``](#bin.mongodump) to capture the backup data. To capture a more
exact moment-in-time snapshot of the system, you will need to stop all
application writes before taking the filesystem snapshots; otherwise
the snapshot will only approximate a moment in time.

For approximate point-in-time snapshots, you can minimize the impact on
the cluster by taking the backup from a secondary member of each
replica set shard.


## Procedure


### Step 1: Disable the balancer process.

To disable the [balancer](#sharding-internals-balancing),
connect the [``mongo``](#bin.mongo) shell to a [``mongos``](#bin.mongos) instance and run
[``sh.stopBalancer()``](#sh.stopBalancer) in the ``config`` database.

```javascript

use config
sh.stopBalancer()

```

For more information, see the
[Disable the Balancer](#sharding-balancing-disable-temporarily) procedure.

Warning: If you do not stop the balancer, the backup could have duplicate data or omit data as [*chunks*](#term-chunk) migrate while recording backups. 


### Step 2: Lock one secondary member of each replica set.

Lock a secondary member of each replica set in the sharded cluster,
and one secondary of the [config server replica set (CSRS)](#replset-config-servers).

Ensure that the [*oplog*](#term-oplog) has sufficient capacity to allow these
secondaries to catch up to the state of the primaries after
finishing the backup procedure. See [Oplog Size](#replica-set-oplog-sizing)
for more information.


#### Lock shard replica set secondary.

For each shard replica set in the sharded cluster, connect a
[``mongo``](#bin.mongo) shell to the secondary member's
[``mongod``](#bin.mongod) instance and run [``db.fsyncLock()``](#db.fsyncLock).

```javascript

db.fsyncLock()

```

When calling [``db.fsyncLock()``](#db.fsyncLock), ensure that the connection
is kept open to allow a subsequent call to
[``db.fsyncUnlock()``](#db.fsyncUnlock).


#### Lock config server replica set secondary.

If locking a secondary of the CSRS, confirm that the member has
replicated data up to some control point. To verify, first connect a
[``mongo``](#bin.mongo) shell to the CSRS primary and perform a write
operation with [``"majority"``](#writeconcern."majority") write concern on a
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
document. Connect a [``mongo``](#bin.mongo) shell to the CSRS secondary
to lock and use [``db.collection.find()``](#db.collection.find) to query for the
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

To lock the secondary member, run [``db.fsyncLock()``](#db.fsyncLock) on
the member:

```javascript

db.fsyncLock()

```

When calling [``db.fsyncLock()``](#db.fsyncLock), ensure that the connection is
kept open to allow a subsequent call to [``db.fsyncUnlock()``](#db.fsyncUnlock).


### Step 3: Backup one config server.

Run [``mongodump``](#bin.mongodump) against a config server [``mongod``](#bin.mongod)
instance to back up the cluster's metadata. You only need to back up
one config server. Perform this step
against the locked config server.

Use [``mongodump``](#bin.mongodump) with the [``--oplog``](#cmdoption-oplog) option to
backup one of the [config servers](#sharding-config-server).

```sh

mongodump --oplog

```

If your deployment uses CSRS config servers, unlock the config server
node before proceeding to the next step.
To unlock the CSRS member, use [``db.fsyncUnlock()``](#db.fsyncUnlock) method in
the [``mongo``](#bin.mongo) shell used to lock the instance.

```javascript

db.fsyncUnlock()

```


### Step 4: Back up a replica set member for each shard.

Back up the locked replica set members of the shards using
[``mongodump``](#bin.mongodump) with the
[``--oplog``](#cmdoption-oplog) option. You may back up the
shards in parallel.

```sh

mongodump --oplog

```


### Step 5: Unlock replica set members for each shard.

To unlock the replica set members, use [``db.fsyncUnlock()``](#db.fsyncUnlock)
method in the [``mongo``](#bin.mongo) shell. For each locked member, use the
same [``mongo``](#bin.mongo) shell used to lock the instance.

```javascript

db.fsyncUnlock()

```

Allow these members to catch up with the state of the primary.


### Step 6: Re-enable the balancer process.

To re-enable to balancer, connect the [``mongo``](#bin.mongo) shell to a
[``mongos``](#bin.mongos) instance and run
[``sh.setBalancerState()``](#sh.setBalancerState).

```javascript

use config
sh.setBalancerState(true)

```


## Additional Resources

See also [MongoDB Cloud Manager](https://www.mongodb.com/cloud/cloud-manager/?jmp=docs) for seamless automation, backup, and monitoring.
