+++
title = "Migrate a Sharded Cluster to Different Hardware"

[tags]
mongodb = "product"
+++

# Migrate a Sharded Cluster to Different Hardware

The tutorial is specific to MongoDB 3.4. For earlier versions of
MongoDB, refer to the corresponding version of the MongoDB Manual.

Changed in version 3.2.

Starting in MongoDB 3.2, config servers for sharded clusters can be
deployed as a [replica set](https://docs.mongodb.com/manual/replication). The
replica set config servers must run the [WiredTiger storage engine](https://docs.mongodb.com/manual/core/wiredtiger). MongoDB 3.2 deprecates the use of three mirrored
[``mongod``](https://docs.mongodb.com/manual/reference/program/mongod/#bin.mongod) instances for config servers.

This procedure moves the components of the [*sharded cluster*](https://docs.mongodb.com/manual/reference/glossary/#term-sharded-cluster) to a
new hardware system without downtime for reads and writes.

Important: While the migration is in progress, do not attempt to change to the [Sharded Cluster Metadata](https://docs.mongodb.com/manual/core/sharded-cluster-config-servers/#sharding-internals-config-database). Do not use any operation that modifies the cluster metadata *in any way*. For example, do not create or drop databases, create or drop collections, or use any sharding commands.

If your cluster includes a shard backed by a [*standalone*](https://docs.mongodb.com/manual/reference/glossary/#term-standalone)
[``mongod``](https://docs.mongodb.com/manual/reference/program/mongod/#bin.mongod) instance, consider [converting the standalone
to a replica set](https://docs.mongodb.com/manual/tutorial/convert-standalone-to-replica-set) to
simplify migration and to let you keep the cluster online during
future maintenance. Migrating a shard as standalone is a multi-step
process that may require downtime.

<span id="migrate-to-new-hardware-disable-balancer"></span>


## Disable the Balancer

Disable the balancer to stop [chunk migration](https://docs.mongodb.com/manual/core/sharding-balancer-administration) and do not perform any metadata
write operations until the process finishes. If a migration is in
progress, the balancer will complete the in-progress migration before
stopping.

To disable the balancer, connect to one of the cluster's
[``mongos``](https://docs.mongodb.com/manual/reference/program/mongos/#bin.mongos) instances and issue the following method:

```javascript

sh.stopBalancer()

```

To check the balancer state, issue the [``sh.getBalancerState()``](https://docs.mongodb.com/manual/reference/method/sh.getBalancerState/#sh.getBalancerState)
method.

For more information, see [Disable the Balancer](https://docs.mongodb.com/manual/tutorial/manage-sharded-cluster-balancer/#sharding-balancing-disable-temporarily).

<span id="migrate-to-new-hardware-config-servers"></span>


## Migrate Each Config Server Separately

Changed in version 3.4.

Starting in MongoDB 3.2, config servers for sharded clusters can be
deployed as a [replica set](https://docs.mongodb.com/manual/replication) (CSRS) instead of three
mirrored config servers (SCCC). Using a replica set for the config
servers improves consistency across the config servers, since MongoDB
can take advantage of the standard replica set read and write protocols
for the config data. In addition, using a replica set for config
servers allows a sharded cluster to have more than 3 config servers
since a replica set can have up to 50 members. To deploy config servers
as a replica set, the config servers must run the [WiredTiger
storage engine](https://docs.mongodb.com/manual/core/wiredtiger).

In version 3.4, MongoDB removes support for SCCC config servers. To
upgrade your config servers from SCCC to CSRS, see
[Upgrade Config Servers to Replica Set](https://docs.mongodb.com/manual/tutorial/upgrade-config-servers-to-replica-set).

The following restrictions apply to a replica set configuration when used
for config servers:

* Must have zero [arbiters](https://docs.mongodb.com/manual/core/replica-set-arbiter).

* Must have no [delayed members](https://docs.mongodb.com/manual/core/replica-set-delayed-member).

* Must build indexes (i.e. no member should have ``buildIndexes`` setting set to false).

For each member of the config server replica set:

Important: Replace the secondary members before replacing the primary.


### Step 1: Start the replacement config server.

Start a [``mongod``](https://docs.mongodb.com/manual/reference/program/mongod/#bin.mongod) instance, specifying both the ``--configsvr``
and ``--replSet`` options.

```sh

mongod --configsvr --replSet <replicaSetName>

```


### Step 2: Add the new config server to the replica set.

Connect a [``mongo``](https://docs.mongodb.com/manual/reference/program/mongo/#bin.mongo) shell to the primary of the config server
replica set and use [``rs.add()``](https://docs.mongodb.com/manual/reference/method/rs.add/#rs.add) to add the new member.

```javascript

rs.add("<hostnameNew>:<portNew>")

```

The initial sync process copies all the data from one member of the
config server replica set to the new member without restarting.

[``mongos``](https://docs.mongodb.com/manual/reference/program/mongos/#bin.mongos) instances automatically recognize the change in the
config server replica set members without restarting.


### Step 3: Shut down the member to replace.

If replacing the primary member, step down the primary first before
shutting down.

<span id="migrate-to-new-hardware-restart-mongos"></span>


## Restart the ``mongos`` Instances

Changed in version 3.2: With replica set config servers, the [``mongos``](https://docs.mongodb.com/manual/reference/program/mongos/#bin.mongos) instances
specify in the [``--configdb``](https://docs.mongodb.com/manual/reference/program/mongos/#cmdoption-configdb) or [``sharding.configDB``](https://docs.mongodb.com/manual/reference/configuration-options/#sharding.configDB)
setting the config server replica set name and at least one of the
replica set members. The [``mongos``](https://docs.mongodb.com/manual/reference/program/mongos/#bin.mongos) instances for the sharded
cluster must specify the same config server replica set name but can
specify different members of the replica set.

If a [``mongos``](https://docs.mongodb.com/manual/reference/program/mongos/#bin.mongos) instance specifies a migrated replica set member in
the [``--configdb``](https://docs.mongodb.com/manual/reference/program/mongos/#cmdoption-configdb) or [``sharding.configDB``](https://docs.mongodb.com/manual/reference/configuration-options/#sharding.configDB) setting, update
the config server setting for the next time you restart the
[``mongos``](https://docs.mongodb.com/manual/reference/program/mongos/#bin.mongos) instance.

For more information, see [Connect a mongos to the Sharded Cluster](https://docs.mongodb.com/manual/tutorial/deploy-shard-cluster/#sharding-setup-start-mongos).

<span id="migrate-to-new-hardware-shards"></span>


## Migrate the Shards

Migrate the shards one at a time. For each shard, follow the appropriate
procedure in this section.

<span id="migrate-replica-set-shard"></span>


### Migrate a Replica Set Shard

To migrate a sharded cluster, migrate each member separately. First
migrate the non-primary members, and then migrate the [*primary*](https://docs.mongodb.com/manual/reference/glossary/#term-primary)
last.

If the replica set has two voting members, add an [arbiter](https://docs.mongodb.com/manual/core/replica-set-arbiter) to the replica set to ensure the set
keeps a majority of its votes available during the migration. You can
remove the arbiter after completing the migration.

<span id="migrate-replica-set-shard-member"></span>


#### Migrate a Member of a Replica Set Shard

1. Shut down the [``mongod``](https://docs.mongodb.com/manual/reference/program/mongod/#bin.mongod) process. To ensure a clean shutdown, use the [``shutdown``](https://docs.mongodb.com/manual/reference/command/shutdown/#dbcmd.shutdown) command.

2. Move the data directory (i.e., the [``dbPath``](https://docs.mongodb.com/manual/reference/configuration-options/#storage.dbPath)) to the new machine.

3. Restart the [``mongod``](https://docs.mongodb.com/manual/reference/program/mongod/#bin.mongod) process at the new location.

4. Connect to the replica set's current primary.

5. If the hostname of the member has changed, use [``rs.reconfig()``](https://docs.mongodb.com/manual/reference/method/rs.reconfig/#rs.reconfig) to update the [replica set configuration document](https://docs.mongodb.com/manual/reference/replica-configuration) with the new hostname.

   For example, the following sequence of commands updates the
   hostname for the instance at position ``2`` in the ``members``
   array:

   ```javascript

   cfg = rs.conf()
   cfg.members[2].host = "pocatello.example.net:27017"
   rs.reconfig(cfg)

   ```

   For more information on updating the configuration document, see
   [Examples](https://docs.mongodb.com/manual/reference/method/rs.reconfig/#replica-set-reconfiguration-usage).

6. To confirm the new configuration, issue [``rs.conf()``](https://docs.mongodb.com/manual/reference/method/rs.conf/#rs.conf).

7. Wait for the member to recover. To check the member's state, issue [``rs.status()``](https://docs.mongodb.com/manual/reference/method/rs.status/#rs.status).


#### Migrate the Primary in a Replica Set Shard

While migrating the replica set's primary, the set must elect a new
primary. This failover process which renders the replica set
unavailable to perform reads or accept writes for the duration of the
election, which typically completes quickly. If possible, plan the
migration during a maintenance window.

1. Step down the primary to allow the normal [failover](https://docs.mongodb.com/manual/core/replica-set-high-availability/#replica-set-failover) process.  To step down the primary, connect to the primary and issue the either the [``replSetStepDown``](https://docs.mongodb.com/manual/reference/command/replSetStepDown/#dbcmd.replSetStepDown) command or the [``rs.stepDown()``](https://docs.mongodb.com/manual/reference/method/rs.stepDown/#rs.stepDown) method. The following example shows the [``rs.stepDown()``](https://docs.mongodb.com/manual/reference/method/rs.stepDown/#rs.stepDown) method:

   ```javascript

   rs.stepDown()

   ```

2. Once the primary has stepped down and another member has become [``PRIMARY``](https://docs.mongodb.com/manual/reference/replica-states/#replstate.PRIMARY) state. To migrate the stepped-down primary, follow the [Migrate a Member of a Replica Set Shard](#migrate-replica-set-shard-member) procedure

   You can check the output of [``rs.status()``](https://docs.mongodb.com/manual/reference/method/rs.status/#rs.status) to confirm the
   change in status.


### Migrate a Standalone Shard

The ideal procedure for migrating a standalone shard is to
[convert the standalone to a replica set](https://docs.mongodb.com/manual/tutorial/convert-standalone-to-replica-set) and then use the
procedure for [migrating a replica set shard](#migrate-replica-set-shard). In production clusters, all shards
should be replica sets, which provides continued availability during
maintenance windows.

Migrating a shard as standalone is a multi-step process during which
part of the shard may be unavailable. If the shard is the
[*primary shard*](https://docs.mongodb.com/manual/reference/glossary/#term-primary-shard) for a database,the process includes the
[``movePrimary``](https://docs.mongodb.com/manual/reference/command/movePrimary/#dbcmd.movePrimary) command. While the [``movePrimary``](https://docs.mongodb.com/manual/reference/command/movePrimary/#dbcmd.movePrimary)
runs, you should stop modifying data in that database. To migrate the
standalone shard, use the [Remove Shards from an Existing Sharded Cluster](https://docs.mongodb.com/manual/tutorial/remove-shards-from-cluster)
procedure.

<span id="migrate-to-new-hardware-enable-balancer"></span>


## Re-Enable the Balancer

To complete the migration, re-enable the balancer to resume
[chunk migrations](https://docs.mongodb.com/manual/core/sharding-balancer-administration).

Connect to one of the cluster's [``mongos``](https://docs.mongodb.com/manual/reference/program/mongos/#bin.mongos) instances and pass
``true`` to the [``sh.setBalancerState()``](https://docs.mongodb.com/manual/reference/method/sh.setBalancerState/#sh.setBalancerState) method:

```javascript

sh.setBalancerState(true)

```

To check the balancer state, issue the [``sh.getBalancerState()``](https://docs.mongodb.com/manual/reference/method/sh.getBalancerState/#sh.getBalancerState)
method.

For more information, see [Enable the Balancer](https://docs.mongodb.com/manual/tutorial/manage-sharded-cluster-balancer/#sharding-balancing-enable).
