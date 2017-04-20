+++
title = "Restore a Sharded Cluster"

[tags]
mongodb = "product"
+++
# Restore a Sharded Cluster


## Overview

Important: In version 3.4, MongoDB removes support for SCCC config servers. To upgrade your config servers from SCCC to CSRS, see [Upgrade Config Servers to Replica Set](#).The following procedure applies to 3.4 config servers. 

You can restore a [*sharded cluster*](#term-sharded-cluster) either from [snapshots](#) or from [*BSON*](#term-bson)
[database dumps](#) created by the
[``mongodump``](#bin.mongodump) tool. This document describes procedures to

* [Restore a Sharded Cluster with Filesystem Snapshots](#restore-sharded-cluster-with-snapshots) 

* [Restore a Sharded Cluster with Database Dumps](#restore-sh-cl-dmp) 


## Procedures

Changed in version 3.4.

For MongoDB 3.4 sharded clusters, [``mongod``](#bin.mongod) instances for
the shards **must** explicitly specify its role as a ``shardsvr``,
either via the configuration file setting
[``sharding.clusterRole``](#sharding.clusterRole) or via the command line option
[``--shardsvr``](#cmdoption-shardsvr).

Note: Default port for [``mongod``](#bin.mongod) instances with the ``shardsvr`` role is ``27018``. To use a different port, specify [``net.port``](#net.port) setting or ``--port`` option. 

The following procedures assume shard [``mongod``](#bin.mongod) instances
include the ``--shardsvr`` and ``--port`` options (or corresponding
settings in the configuration file).


### Restore a Sharded Cluster with Filesystem Snapshots

The following procedure outlines the steps to restore a sharded cluster
from filesystem snapshots. To create filesystem snapshots of sharded
clusters, see
[Back Up a Sharded Cluster with File System Snapshots](#).


#### Step 1: Shut down the entire cluster.

Stop all [``mongos``](#bin.mongos) and [``mongod``](#bin.mongod) processes, including
all shards *and* all config servers. To stop all members, connect to
**each** member and issue following operations:

```javascript

use admin
db.shutdownServer()

```


#### Step 2: Restore the data files.

On each server, extract the data files to the location where the
[``mongod``](#bin.mongod) instance will access them and restore the following:

* **Data files for each server in each shard.** 

  For each shard replica set, restore all the members of the replica
  set. See [Restore a Replica Set from MongoDB Backups](#).

* **Data files for each config server.** 

  To restore to the [config server replica set (CSRS)](#csrs),
  see [Restore a Replica Set from MongoDB Backups](#).

See also: [Restore a Snapshot](#backup-restore-snapshot). 


#### Step 3: Restart the config servers.

Restart each member of the CSRS.

```sh

mongod --configsvr --replSet <CSRS name> --dbpath <config dbpath> --port 27019

```


#### Step 4: Start **one** [``mongos``](#bin.mongos) instance.

Start [``mongos``](#bin.mongos) with the [``--configdb``](#cmdoption-configdb) option set to
the name of the config server replica set and seed list of the
members started in the step [Restart the config servers.](#restart-the-config-servers)


#### Step 5: If shard hostnames have changed, update the config database.

If shard hostnames have changed, connect a [``mongo``](#bin.mongo) shell to
the [``mongos``](#bin.mongos) instance and update the [``shards``](#config.shards)
collection in the [Config Database](#config-database) to reflect the new
hostnames.


#### Step 6: Clear per-shard sharding recovery information.

If the backup data was from a deployment using [CSRS](#csrs),
clear out the no longer applicable recovery information on each shard. For each
shard:

1. Restart the replica set members for the shard with the [``recoverShardingState``](#param.recoverShardingState) parameter set to ``false``. Include additional options as required for your specific configuration. 

   ```sh

   mongod --setParameter=recoverShardingState=false --replSet <replSetName> --shardsvr --port <port>

   ```

2. Connect [``mongo``](#bin.mongo) shell to the primary of the replica set and delete from the ``admin.system.version`` collection the document where ``_id`` equals ``minOpTimeRecovery`` id. Use write concern ``"majority"``. 

   ```javascript

   use admin
   db.system.version.remove(
      { _id: "minOpTimeRecovery" },
      { writeConcern: { w: "majority" } }
   )

   ```

3. Shut down the replica set members for the shard. 


#### Step 7: Restart all the shard [``mongod``](#bin.mongod) instances.

Do not include the [``recoverShardingState``](#param.recoverShardingState)  parameter.

Changed in version 3.4: Include the [``--shardsvr``](#cmdoption-shardsvr) option and, if appropriate, the
``--port`` option.


#### Step 8: Restart the other [``mongos``](#bin.mongos) instances.

Specify for [``--configdb``](#cmdoption-configdb) the
config server replica set name and a seed list of the CSRS started
in the step [Restart the config servers.](#restart-the-config-servers)


#### Step 9: Verify that the cluster is operational.

Connect to a [``mongos``](#bin.mongos) instance from a [``mongo``](#bin.mongo) shell
and use the [``db.printShardingStatus()``](#db.printShardingStatus) method to ensure that
the cluster is operational.

```javascript

db.printShardingStatus()
show collections

```


### Restore a Sharded Cluster with Database Dumps

The following procedure outlines the steps to restore a sharded cluster
from the BSON database dumps created by [``mongodump``](#bin.mongodump). For
information on using [``mongodump``](#bin.mongodump) to backup sharded clusters,
see [Back Up a Sharded Cluster with Database Dumps](#).

Changed in version 3.0: [``mongorestore``](#bin.mongorestore) requires a running MongoDB instances.
Earlier versions of [``mongorestore``](#bin.mongorestore) did not require a
running MongoDB instances and instead used the ``--dbpath`` option.
For instructions specific to your version of
[``mongorestore``](#bin.mongorestore), refer to the appropriate version of the
manual.


#### Step 1: Deploy a new replica set for each shard.

For each shard, deploy a new replica set:

1. Start a new [``mongod``](#bin.mongod) for each member of the replica set. Include the ``--shardsvr`` and the ``--port`` options. Include any other configuration as appropriate. 

2. Connect a [``mongo``](#bin.mongo) to *one* of the [``mongod``](#bin.mongod) instances. In the [``mongo``](#bin.mongo) shell: 

   1. Run [``rs.initiate()``](#rs.initiate). 

   2. Use [``rs.add()``](#rs.add) to add the other members of the replica set. 

For detailed instructions on deploying a replica set, see
[Deploy a Replica Set](#).


#### Step 2: Deploy new config servers.

See [Create the Config Server Replica Set](#sharding-setup-start-cfgsrvr).


#### Step 3: Start the ``mongos`` instances.

Start the [``mongos``](#bin.mongos) instances, specifying the name of the
config server replica set and a seed list of members in the
``--configdb``. Include any other configuration as appropriate.

For detailed instructions, see [Connect a mongos to the Sharded Cluster](#sharding-setup-start-mongos).


#### Step 4: Add shards to the cluster.

Connect a [``mongo``](#bin.mongo) shell to a [``mongos``](#bin.mongos) instance.
Use [``sh.addShard()``](#sh.addShard) to add each replica sets as a shard.

For detailed instructions in adding shards to the cluster, see
[Add Shards to the Cluster](#sharding-setup-add-shards).


#### Step 5: Shut down the ``mongos`` instances.

Once the new sharded cluster is up, shut down all [``mongos``](#bin.mongos)
instances.


#### Step 6: Restore the shard data.

For each shard, use [``mongorestore``](#bin.mongorestore) to restore the data dump
to the primary's data directory. Include the ``--drop`` option to
drop the collections before restoring and, because the [backup
procedure](#)
included the [``--oplog``](#cmdoption-oplog) option, include the
[``--oplogReplay``](#cmdoption-oplogreplay) option for [``mongorestore``](#bin.mongorestore).

For example, on the primary for ShardA, run the
[``mongorestore``](#bin.mongorestore). Specify any other configuration as
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


#### Step 8: Start **one** [``mongos``](#bin.mongos) instance.

Start [``mongos``](#bin.mongos) with the [``--configdb``](#cmdoption-configdb) option set to
the name of the config server replica set and seed list of the
members started in the step [Deploy new config servers.](#deploy-new-config-servers)


#### Step 9: If shard hostnames have changed, update the config database.

If shard hostnames have changed, connect a [``mongo``](#bin.mongo) shell to
the [``mongos``](#bin.mongos) instance and update the [``shards``](#config.shards)
collection in the [Config Database](#config-database) to reflect the new
hostnames.


#### Step 10: Restart all the shard [``mongod``](#bin.mongod) instances.

Do not include the [``recoverShardingState``](#param.recoverShardingState)  parameter.

Changed in version 3.4: Include the [``--shardsvr``](#cmdoption-shardsvr) option and, if appropriate, the
``--port`` option.


#### Step 11: Restart the other [``mongos``](#bin.mongos) instances.

Specify for [``--configdb``](#cmdoption-configdb) the
config server replica set name and a seed list of the CSRS started
in the step [Deploy new config servers.](#deploy-new-config-servers)


#### Step 12: Verify that the cluster is operational.

Connect to a [``mongos``](#bin.mongos) instance from a [``mongo``](#bin.mongo) shell
and use the [``db.printShardingStatus()``](#db.printShardingStatus) method to ensure that
the cluster is operational.

```javascript

db.printShardingStatus()
show collections

```

See also: [MongoDB Backup Methods](#), [Backup and Restore Sharded Clusters](#) 
