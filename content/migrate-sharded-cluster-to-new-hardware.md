+++
title = "Migrate a Sharded Cluster to Different Hardware"

[tags]
mongodb = "product"
+++
# Migrate a Sharded Cluster to Different Hardware


# On this page

* [Disable the Balancer](#disable-the-balancer) 

* [Migrate Each Config Server Separately](#migrate-each-config-server-separately) 

* [Restart the ``mongos`` Instances](#restart-the-mongos-instances) 

* [Migrate the Shards](#migrate-the-shards) 

* [Re-Enable the Balancer](#re-enable-the-balancer) 

The tutorial is specific to MongoDB 3.4. For earlier versions of
MongoDB, refer to the corresponding version of the MongoDB Manual.

Changed in version 3.2.

Starting in MongoDB 3.2, config servers for sharded clusters can be
deployed as a [replica set](#). The
replica set config servers must run the [WiredTiger storage engine](#). MongoDB 3.2 deprecates the use of three mirrored
[``mongod``](#bin.mongod) instances for config servers.

This procedure moves the components of the [*sharded cluster*](#term-sharded-cluster) to a
new hardware system without downtime for reads and writes.

Important: While the migration is in progress, do not attempt to change to the [Sharded Cluster Metadata](#sharding-internals-config-database). Do not use any operation that modifies the cluster metadata *in any way*. For example, do not create or drop databases, create or drop collections, or use any sharding commands. 

If your cluster includes a shard backed by a [*standalone*](#term-standalone)
[``mongod``](#bin.mongod) instance, consider [converting the standalone
to a replica set](#) to
simplify migration and to let you keep the cluster online during
future maintenance. Migrating a shard as standalone is a multi-step
process that may require downtime.


## Disable the Balancer

Disable the balancer to stop [chunk migration](#) and do not perform any metadata
write operations until the process finishes. If a migration is in
progress, the balancer will complete the in-progress migration before
stopping.

To disable the balancer, connect to one of the cluster's
[``mongos``](#bin.mongos) instances and issue the following method:

```javascript

sh.stopBalancer()

```

To check the balancer state, issue the [``sh.getBalancerState()``](#sh.getBalancerState)
method.

For more information, see [Disable the Balancer](#sharding-balancing-disable-temporarily).


## Migrate Each Config Server Separately

Changed in version 3.4.

Starting in MongoDB 3.2, config servers for sharded clusters can be
deployed as a [replica set](#) (CSRS) instead of three
mirrored config servers (SCCC). Using a replica set for the config
servers improves consistency across the config servers, since MongoDB
can take advantage of the standard replica set read and write protocols
for the config data. In addition, using a replica set for config
servers allows a sharded cluster to have more than 3 config servers
since a replica set can have up to 50 members. To deploy config servers
as a replica set, the config servers must run the [WiredTiger
storage engine](#).

In version 3.4, MongoDB removes support for SCCC config servers. To
upgrade your config servers from SCCC to CSRS, see
[Upgrade Config Servers to Replica Set](#).

The following restrictions apply to a replica set configuration when used
for config servers:

* Must have zero [arbiters](#). 

* Must have no [delayed members](#). 

* Must build indexes (i.e. no member should have ``buildIndexes`` setting set to false). 

For each member of the config server replica set:

Important: Replace the secondary members before replacing the primary. 


### Step 1: Start the replacement config server.

Start a [``mongod``](#bin.mongod) instance, specifying both the ``--configsvr``
and ``--replSet`` options.

```sh

mongod --configsvr --replSet <replicaSetName>

```


### Step 2: Add the new config server to the replica set.

Connect a [``mongo``](#bin.mongo) shell to the primary of the config server
replica set and use [``rs.add()``](#rs.add) to add the new member.

```javascript

rs.add("<hostnameNew>:<portNew>")

```

The initial sync process copies all the data from one member of the
config server replica set to the new member without restarting.

[``mongos``](#bin.mongos) instances automatically recognize the change in the
config server replica set members without restarting.


### Step 3: Shut down the member to replace.

If replacing the primary member, step down the primary first before
shutting down.


## Restart the ``mongos`` Instances

Changed in version 3.2: With replica set config servers, the [``mongos``](#bin.mongos) instances
specify in the [``--configdb``](#cmdoption-configdb) or [``sharding.configDB``](#sharding.configDB)
setting the config server replica set name and at least one of the
replica set members. The [``mongos``](#bin.mongos) instances for the sharded
cluster must specify the same config server replica set name but can
specify different members of the replica set.

If a [``mongos``](#bin.mongos) instance specifies a migrated replica set member in
the [``--configdb``](#cmdoption-configdb) or [``sharding.configDB``](#sharding.configDB) setting, update
the config server setting for the next time you restart the
[``mongos``](#bin.mongos) instance.

For more information, see [Connect a mongos to the Sharded Cluster](#sharding-setup-start-mongos).


## Migrate the Shards

Migrate the shards one at a time. For each shard, follow the appropriate
procedure in this section.


### Migrate a Replica Set Shard

To migrate a sharded cluster, migrate each member separately. First
migrate the non-primary members, and then migrate the [*primary*](#term-primary)
last.

If the replica set has two voting members, add an [arbiter](#) to the replica set to ensure the set
keeps a majority of its votes available during the migration. You can
remove the arbiter after completing the migration.


#### Migrate a Member of a Replica Set Shard

1. Shut down the [``mongod``](#bin.mongod) process. To ensure a clean shutdown, use the [``shutdown``](#dbcmd.shutdown) command. 

2. Move the data directory (i.e., the [``dbPath``](#storage.dbPath)) to the new machine. 

3. Restart the [``mongod``](#bin.mongod) process at the new location. 

4. Connect to the replica set's current primary. 

5. If the hostname of the member has changed, use [``rs.reconfig()``](#rs.reconfig) to update the [replica set configuration document](#) with the new hostname. 

   For example, the following sequence of commands updates the
   hostname for the instance at position ``2`` in the ``members``
   array:

   ```javascript

   cfg = rs.conf()
   cfg.members[2].host = "pocatello.example.net:27017"
   rs.reconfig(cfg)

   ```

   For more information on updating the configuration document, see
   [Examples](#replica-set-reconfiguration-usage).

6. To confirm the new configuration, issue [``rs.conf()``](#rs.conf). 

7. Wait for the member to recover. To check the member's state, issue [``rs.status()``](#rs.status). 


#### Migrate the Primary in a Replica Set Shard

While migrating the replica set's primary, the set must elect a new
primary. This failover process which renders the replica set
unavailable to perform reads or accept writes for the duration of the
election, which typically completes quickly. If possible, plan the
migration during a maintenance window.

1. Step down the primary to allow the normal [failover](#replica-set-failover) process.  To step down the primary, connect to the primary and issue the either the [``replSetStepDown``](#dbcmd.replSetStepDown) command or the [``rs.stepDown()``](#rs.stepDown) method. The following example shows the [``rs.stepDown()``](#rs.stepDown) method: 

   ```javascript

   rs.stepDown()

   ```

2. Once the primary has stepped down and another member has become [``PRIMARY``](#replstate.PRIMARY) state. To migrate the stepped-down primary, follow the [Migrate a Member of a Replica Set Shard](#migrate-replica-set-shard-member) procedure 

   You can check the output of [``rs.status()``](#rs.status) to confirm the
   change in status.


### Migrate a Standalone Shard

The ideal procedure for migrating a standalone shard is to
[convert the standalone to a replica set](#) and then use the
procedure for [migrating a replica set shard](#migrate-replica-set-shard). In production clusters, all shards
should be replica sets, which provides continued availability during
maintenance windows.

Migrating a shard as standalone is a multi-step process during which
part of the shard may be unavailable. If the shard is the
[*primary shard*](#term-primary-shard) for a database,the process includes the
[``movePrimary``](#dbcmd.movePrimary) command. While the [``movePrimary``](#dbcmd.movePrimary)
runs, you should stop modifying data in that database. To migrate the
standalone shard, use the [Remove Shards from an Existing Sharded Cluster](#)
procedure.


## Re-Enable the Balancer

To complete the migration, re-enable the balancer to resume
[chunk migrations](#).

Connect to one of the cluster's [``mongos``](#bin.mongos) instances and pass
``true`` to the [``sh.setBalancerState()``](#sh.setBalancerState) method:

```javascript

sh.setBalancerState(true)

```

To check the balancer state, issue the [``sh.getBalancerState()``](#sh.getBalancerState)
method.

For more information, see [Enable the Balancer](#sharding-balancing-enable).
