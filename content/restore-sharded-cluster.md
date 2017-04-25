+++
title = "Restore a Sharded Cluster"

[tags]
mongodb = "product"
+++

# Restore a Sharded Cluster


## Overview

Important: In version 3.4, MongoDB removes support for SCCC config servers. To upgrade your config servers from SCCC to CSRS, see [Upgrade Config Servers to Replica Set](https://docs.mongodb.com/manual/tutorial/upgrade-config-servers-to-replica-set).The following procedure applies to 3.4 config servers.

You can restore a [*sharded cluster*](https://docs.mongodb.com/manual/reference/glossary/#term-sharded-cluster) either from [snapshots](backup-with-filesystem-snapshots/) or from [*BSON*](https://docs.mongodb.com/manual/reference/glossary/#term-bson)
[database dumps](backup-sharded-cluster-with-database-dumps/) created by the
[``mongodump``](https://docs.mongodb.com/manual/reference/program/mongodump/#bin.mongodump) tool. This document describes procedures to

* [Restore a Sharded Cluster with Filesystem Snapshots](#restore-sharded-cluster-with-snapshots)

* [Restore a Sharded Cluster with Database Dumps](#restore-sh-cl-dmp)


## Procedures

Changed in version 3.4.

For MongoDB 3.4 sharded clusters, [``mongod``](https://docs.mongodb.com/manual/reference/program/mongod/#bin.mongod) instances for
the shards **must** explicitly specify its role as a ``shardsvr``,
either via the configuration file setting
[``sharding.clusterRole``](https://docs.mongodb.com/manual/reference/configuration-options/#sharding.clusterRole) or via the command line option
[``--shardsvr``](https://docs.mongodb.com/manual/reference/program/mongod/#cmdoption-shardsvr).

Note: Default port for [``mongod``](https://docs.mongodb.com/manual/reference/program/mongod/#bin.mongod) instances with the ``shardsvr`` role is ``27018``. To use a different port, specify [``net.port``](https://docs.mongodb.com/manual/reference/configuration-options/#net.port) setting or ``--port`` option.

The following procedures assume shard [``mongod``](https://docs.mongodb.com/manual/reference/program/mongod/#bin.mongod) instances
include the ``--shardsvr`` and ``--port`` options (or corresponding
settings in the configuration file).


### Restore a Sharded Cluster with Filesystem Snapshots

The following procedure outlines the steps to restore a sharded cluster
from filesystem snapshots. To create filesystem snapshots of sharded
clusters, see
[Back Up a Sharded Cluster with File System Snapshots](backup-sharded-cluster-with-filesystem-snapshots/).


#### Step 1: Shut down the entire cluster.

Stop all [``mongos``](https://docs.mongodb.com/manual/reference/program/mongos/#bin.mongos) and [``mongod``](https://docs.mongodb.com/manual/reference/program/mongod/#bin.mongod) processes, including
all shards *and* all config servers. To stop all members, connect to
**each** member and issue following operations:

```javascript

use admin
db.shutdownServer()

```


#### Step 2: Restore the data files.

On each server, extract the data files to the location where the
[``mongod``](https://docs.mongodb.com/manual/reference/program/mongod/#bin.mongod) instance will access them and restore the following:

* **Data files for each server in each shard.**

  For each shard replica set, restore all the members of the replica
  set. See [Restore a Replica Set from MongoDB Backups](restore-replica-set-from-backup/).

* **Data files for each config server.**

  To restore to the [config server replica set (CSRS)](https://docs.mongodb.com/manual/core/sharded-cluster-config-servers/#csrs),
  see [Restore a Replica Set from MongoDB Backups](restore-replica-set-from-backup/).

See also: [Restore a Snapshot](https://docs.mongodb.com/manual/tutorial/backup-with-filesystem-snapshots/#backup-restore-snapshot).


#### Step 3: Restart the config servers.

Restart each member of the CSRS.

```sh

mongod --configsvr --replSet <CSRS name> --dbpath <config dbpath> --port 27019

```


#### Step 4: Start **one** [``mongos``](https://docs.mongodb.com/manual/reference/program/mongos/#bin.mongos) instance.

Start [``mongos``](https://docs.mongodb.com/manual/reference/program/mongos/#bin.mongos) with the [``--configdb``](https://docs.mongodb.com/manual/reference/program/mongos/#cmdoption-configdb) option set to
the name of the config server replica set and seed list of the
members started in the step [Restart the config servers.](#restart-the-config-servers)


#### Step 5: If shard hostnames have changed, update the config database.

If shard hostnames have changed, connect a [``mongo``](https://docs.mongodb.com/manual/reference/program/mongo/#bin.mongo) shell to
the [``mongos``](https://docs.mongodb.com/manual/reference/program/mongos/#bin.mongos) instance and update the [``shards``](https://docs.mongodb.com/manual/reference/config-database/#config.shards)
collection in the [Config Database](https://docs.mongodb.com/manual/reference/config-database/#config-database) to reflect the new
hostnames.


#### Step 6: Clear per-shard sharding recovery information.

If the backup data was from a deployment using [CSRS](https://docs.mongodb.com/manual/core/sharded-cluster-config-servers/#csrs),
clear out the no longer applicable recovery information on each shard. For each
shard:

1. Restart the replica set members for the shard with the [``recoverShardingState``](https://docs.mongodb.com/manual/reference/parameters/#param.recoverShardingState) parameter set to ``false``. Include additional options as required for your specific configuration.

   ```sh

   mongod --setParameter=recoverShardingState=false --replSet <replSetName> --shardsvr --port <port>

   ```

2. Connect [``mongo``](https://docs.mongodb.com/manual/reference/program/mongo/#bin.mongo) shell to the primary of the replica set and delete from the ``admin.system.version`` collection the document where ``_id`` equals ``minOpTimeRecovery`` id. Use write concern ``"majority"``.

   ```javascript

   use admin
   db.system.version.remove(
      { _id: "minOpTimeRecovery" },
      { writeConcern: { w: "majority" } }
   )

   ```

3. Shut down the replica set members for the shard.


#### Step 7: Restart all the shard [``mongod``](https://docs.mongodb.com/manual/reference/program/mongod/#bin.mongod) instances.

Do not include the [``recoverShardingState``](https://docs.mongodb.com/manual/reference/parameters/#param.recoverShardingState)  parameter.

Changed in version 3.4: Include the [``--shardsvr``](https://docs.mongodb.com/manual/reference/program/mongod/#cmdoption-shardsvr) option and, if appropriate, the
``--port`` option.


#### Step 8: Restart the other [``mongos``](https://docs.mongodb.com/manual/reference/program/mongos/#bin.mongos) instances.

Specify for [``--configdb``](https://docs.mongodb.com/manual/reference/program/mongos/#cmdoption-configdb) the
config server replica set name and a seed list of the CSRS started
in the step [Restart the config servers.](#restart-the-config-servers)


#### Step 9: Verify that the cluster is operational.

Connect to a [``mongos``](https://docs.mongodb.com/manual/reference/program/mongos/#bin.mongos) instance from a [``mongo``](https://docs.mongodb.com/manual/reference/program/mongo/#bin.mongo) shell
and use the [``db.printShardingStatus()``](https://docs.mongodb.com/manual/reference/method/db.printShardingStatus/#db.printShardingStatus) method to ensure that
the cluster is operational.

```javascript

db.printShardingStatus()
show collections

```


### Restore a Sharded Cluster with Database Dumps

The following procedure outlines the steps to restore a sharded cluster
from the BSON database dumps created by [``mongodump``](https://docs.mongodb.com/manual/reference/program/mongodump/#bin.mongodump). For
information on using [``mongodump``](https://docs.mongodb.com/manual/reference/program/mongodump/#bin.mongodump) to backup sharded clusters,
see [Back Up a Sharded Cluster with Database Dumps](backup-sharded-cluster-with-database-dumps/).

Changed in version 3.0: [``mongorestore``](https://docs.mongodb.com/manual/reference/program/mongorestore/#bin.mongorestore) requires a running MongoDB instances.
Earlier versions of [``mongorestore``](https://docs.mongodb.com/manual/reference/program/mongorestore/#bin.mongorestore) did not require a
running MongoDB instances and instead used the ``--dbpath`` option.
For instructions specific to your version of
[``mongorestore``](https://docs.mongodb.com/manual/reference/program/mongorestore/#bin.mongorestore), refer to the appropriate version of the
manual.


#### Step 1: Deploy a new replica set for each shard.

For each shard, deploy a new replica set:

1. Start a new [``mongod``](https://docs.mongodb.com/manual/reference/program/mongod/#bin.mongod) for each member of the replica set. Include the ``--shardsvr`` and the ``--port`` options. Include any other configuration as appropriate.

2. Connect a [``mongo``](https://docs.mongodb.com/manual/reference/program/mongo/#bin.mongo) to *one* of the [``mongod``](https://docs.mongodb.com/manual/reference/program/mongod/#bin.mongod) instances. In the [``mongo``](https://docs.mongodb.com/manual/reference/program/mongo/#bin.mongo) shell:

   1. Run [``rs.initiate()``](https://docs.mongodb.com/manual/reference/method/rs.initiate/#rs.initiate).

   2. Use [``rs.add()``](https://docs.mongodb.com/manual/reference/method/rs.add/#rs.add) to add the other members of the replica set.

For detailed instructions on deploying a replica set, see
[Deploy a Replica Set](deploy-replica-set/).


#### Step 2: Deploy new config servers.

See [Create the Config Server Replica Set](https://docs.mongodb.com/manual/tutorial/deploy-shard-cluster/#sharding-setup-start-cfgsrvr).


#### Step 3: Start the ``mongos`` instances.

Start the [``mongos``](https://docs.mongodb.com/manual/reference/program/mongos/#bin.mongos) instances, specifying the name of the
config server replica set and a seed list of members in the
``--configdb``. Include any other configuration as appropriate.

For detailed instructions, see [Connect a mongos to the Sharded Cluster](https://docs.mongodb.com/manual/tutorial/deploy-shard-cluster/#sharding-setup-start-mongos).


#### Step 4: Add shards to the cluster.

Connect a [``mongo``](https://docs.mongodb.com/manual/reference/program/mongo/#bin.mongo) shell to a [``mongos``](https://docs.mongodb.com/manual/reference/program/mongos/#bin.mongos) instance.
Use [``sh.addShard()``](https://docs.mongodb.com/manual/reference/method/sh.addShard/#sh.addShard) to add each replica sets as a shard.

For detailed instructions in adding shards to the cluster, see
[Add Shards to the Cluster](https://docs.mongodb.com/manual/tutorial/deploy-shard-cluster/#sharding-setup-add-shards).


#### Step 5: Shut down the ``mongos`` instances.

Once the new sharded cluster is up, shut down all [``mongos``](https://docs.mongodb.com/manual/reference/program/mongos/#bin.mongos)
instances.


#### Step 6: Restore the shard data.

For each shard, use [``mongorestore``](https://docs.mongodb.com/manual/reference/program/mongorestore/#bin.mongorestore) to restore the data dump
to the primary's data directory. Include the ``--drop`` option to
drop the collections before restoring and, because the [backup
procedure](backup-sharded-cluster-with-database-dumps/)
included the [``--oplog``](https://docs.mongodb.com/manual/reference/program/mongodump/#cmdoption-oplog) option, include the
[``--oplogReplay``](https://docs.mongodb.com/manual/reference/program/mongorestore/#cmdoption-oplogreplay) option for [``mongorestore``](https://docs.mongodb.com/manual/reference/program/mongorestore/#bin.mongorestore).

For example, on the primary for ShardA, run the
[``mongorestore``](https://docs.mongodb.com/manual/reference/program/mongorestore/#bin.mongorestore). Specify any other configuration as
appropriate.

```sh

mongorestore --drop --oplogReplay /data/dump/shardA --port <port>

```

After you have finished restoring all the shards, shut down all shard
instances.


#### Step 7: Restore the config server data.

```sh

mongorestore --drop --oplogReplay /data/dump/configData

```


#### Step 8: Start **one** [``mongos``](https://docs.mongodb.com/manual/reference/program/mongos/#bin.mongos) instance.

Start [``mongos``](https://docs.mongodb.com/manual/reference/program/mongos/#bin.mongos) with the [``--configdb``](https://docs.mongodb.com/manual/reference/program/mongos/#cmdoption-configdb) option set to
the name of the config server replica set and seed list of the
members started in the step [Deploy new config servers.](#deploy-new-config-servers)


#### Step 9: If shard hostnames have changed, update the config database.

If shard hostnames have changed, connect a [``mongo``](https://docs.mongodb.com/manual/reference/program/mongo/#bin.mongo) shell to
the [``mongos``](https://docs.mongodb.com/manual/reference/program/mongos/#bin.mongos) instance and update the [``shards``](https://docs.mongodb.com/manual/reference/config-database/#config.shards)
collection in the [Config Database](https://docs.mongodb.com/manual/reference/config-database/#config-database) to reflect the new
hostnames.


#### Step 10: Restart all the shard [``mongod``](https://docs.mongodb.com/manual/reference/program/mongod/#bin.mongod) instances.

Do not include the [``recoverShardingState``](https://docs.mongodb.com/manual/reference/parameters/#param.recoverShardingState)  parameter.

Changed in version 3.4: Include the [``--shardsvr``](https://docs.mongodb.com/manual/reference/program/mongod/#cmdoption-shardsvr) option and, if appropriate, the
``--port`` option.


#### Step 11: Restart the other [``mongos``](https://docs.mongodb.com/manual/reference/program/mongos/#bin.mongos) instances.

Specify for [``--configdb``](https://docs.mongodb.com/manual/reference/program/mongos/#cmdoption-configdb) the
config server replica set name and a seed list of the CSRS started
in the step [Deploy new config servers.](#deploy-new-config-servers)


#### Step 12: Verify that the cluster is operational.

Connect to a [``mongos``](https://docs.mongodb.com/manual/reference/program/mongos/#bin.mongos) instance from a [``mongo``](https://docs.mongodb.com/manual/reference/program/mongo/#bin.mongo) shell
and use the [``db.printShardingStatus()``](https://docs.mongodb.com/manual/reference/method/db.printShardingStatus/#db.printShardingStatus) method to ensure that
the cluster is operational.

```javascript

db.printShardingStatus()
show collections

```

See also: [MongoDB Backup Methods](https://docs.mongodb.com/manual/core/backups), [Backup and Restore Sharded Clusters](https://docs.mongodb.com/manual/administration/backup-sharded-clusters)
