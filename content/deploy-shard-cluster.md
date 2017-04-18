+++
title = "Deploy a Sharded Cluster"

[tags]
mongodb = "product"
+++
# Deploy a Sharded Cluster


# On this page

* [Overview](#overview) 

* [Considerations](#considerations) 

* [Deploy Sharded Cluster](#sharding-deploy-sharded-cluster) 

* [Shard a Collection](#shard-a-collection) 


## Overview

This tutorial involves creating a new sharded cluster that consists of a
[``mongos``](#bin.mongos), the config server replica set, and two shard replica sets.

For instructions specific to sharding a collection, see
[Shard a Collection using Hashed Sharding](#deploy-hashed-sharded-cluster-shard-collection) or
[Shard a Collection using Ranged Sharding](#deploy-ranged-sharded-cluster-shard-collection).


## Considerations


### Connectivity

Each member of a sharded cluster must be able to connect to *all* other
members in the cluster. This includes all shards and config servers.
Ensure that network and security systems, including all interface and
firewalls, allow these connections.


### CloudManager and OpsManager

If you are currently using or are planning to use Cloud Manager or
Ops Manager, consider using their built-in features for
deploying a [*sharded cluster*](#term-sharded-cluster).

See ``Deploy a Sharded Cluster`` in the
[Cloud Manager manual](https://docs.cloudmanager.mongodb.com/tutorial/deploy-sharded-cluster) or in the
[Ops Manager manual](https://docs.opsmanager.mongodb.com/current/tutorial/deploy-sharded-cluster).


### Operating System

This tutorial uses the [``mongod``](#bin.mongod) and [``mongos``](#bin.mongos)
programs. Windows users should use the [``mongod.exe``](#bin.mongod.exe) and
[``mongos.exe``](#bin.mongos.exe) programs instead.


### Security

This tutorial does *not* include the required steps for configuring
[Internal Authentication](#) or [Role-Based Access Control](#).
See [Deploy Sharded Cluster with Keyfile Access Control](#) for a
tutorial on deploying a sharded cluster with a
[keyfile](#internal-auth-keyfile).

In production environments, sharded clusters should employ at
minimum [x.509](#) security for internal authentication
and client access.

For details on using x.509 for internal authentication, see
[Use x.509 Certificate for Membership Authentication](#).

For details on using x.509 for client authentication, see
[Use x.509 Certificates to Authenticate Clients](#).

Note: Enabling internal authentication also enables [Role-Based Access Control](#). 


### Host Identifier

If you use either ``localhost`` or ``127.0.0.1`` as the hostname portion of
any host identifier, you *must* use that identifier as the host setting
for any other MongoDB component in the cluster.

For example, the [``sh.addShard()``](#sh.addShard) method takes a ``host`` parameter for
the hostname of the target shard. If you set ``host`` to ``localhost``, you
must then use ``localhost`` as the host for all other shards in the cluster.


## Deploy Sharded Cluster


### Create the Config Server Replica Set

The following steps deploys a config server replica set.

For a production deployment, deploys a config server replica set with at
least three members. For testing purposes, you can create a
single-member replica set.


#### Step 1: Start each member of the config server replica set.

Start *each* [``mongod``](#bin.mongod) in the config server replica set.

You can specify the [``mongod``](#bin.mongod) settings either via a
configuration file or the command line.

**Configuration File**

If using a configuration file, set [``sharding.clusterRole``](#sharding.clusterRole)
to ``configsvr``, and [``replication.replSetName``](#replication.replSetName) to the
desired name of the config server replica set.

```yaml

sharding:
  clusterRole: configsvr
replication:
  replSetName: <setname>

```

Include additional settings as appropriate to your deployment.
For more information on the configuration file, see
[configuration options](#).

Start the [``mongod``](#bin.mongod) specifying the ``--config`` option and the
path to the configuration file.

```shell

mongod --config <path-to-config-file>

```

**Command Line**

If using the command line parameters, start the [``mongod``](#bin.mongod) with
the ``--configsvr``, and ``--replSet`` parameters.

```sh

mongod --configsvr --replSet <setname> --dbpath <path>

```

Include additional settings as appropriate to your deployment.
For more information on startup parameters, see the
[``mongod``](#bin.mongod) reference page.


#### Step 2: Connect to one of the config servers.

Connect a [``mongo``](#bin.mongo) shell to one of the config server
members.

```sh

mongo --host <hostname> --port <port>

```


#### Step 3

The [``rs.initiate()``](#rs.initiate) method initiates the replica set and can
take an optional [replica set configuration document](#). In the [replica set
configuration document](#), include:

* The [``_id``](#rsconf._id). The [``_id``](#rsconf._id) *must* match the ``--replSet`` parameter passed to the [``mongod``](#bin.mongod). 

* The [``members``](#rsconf.members) field. The [``members``](#rsconf.members) field is an array and requires a document per each member of the replica set. 

* The [``configsvr``](#rsconf.configsvr) field. The [``configsvr``](#rsconf.configsvr) field must be set to ``true`` for the config server replica set. 

See [Replica Set Configuration](#) for more information on
replica set configuration documents.

Initiate the replica set using the [``rs.initiate()``](#rs.initiate) method
and a configuration document:

```javascript

rs.initiate(
  {
    _id: "<replSetName>",
    configsvr: true,
    members: [
      { _id : 0, host : "cfg1.example.net:27017" },
      { _id : 1, host : "cfg2.example.net:27017" },
      { _id : 2, host : "cfg3.example.net:27017" }
    ]
  }
)

```

Once the config server replica set (CSRS) is initiated and up, proceed
to creating the shard replica sets.


### Create the Shard Replica Sets

For a production deployment, use a replica set with at least three
members. For testing purposes, you can create a single-member replica
set.


#### Step 1: Start each member of the shard replica set.

Start *each* [``mongod``](#bin.mongod) in the replica set using either
a configuration file or the command line.

**Configuration File**

If using a configuration file, set the [``replication.replSetName``](#replication.replSetName)
to the desired name of the replica set, and the
[``sharding.clusterRole``](#sharding.clusterRole) option to ``shardsvr``.

```yaml

sharding:
  clusterRole: shardsvr
replication:
  replSetName: <replSetName>

```

Include any other options as appropriate for your deployment. See
[Configuration File Options](#) for settings available.

Start the [``mongod``](#bin.mongod) specifying the ``--config`` option
and the path to the configuration file.

```sh

mongod --config <path-to-config-file>

```

**Command Line**

If using the command line option, when starting the component, specify
the ``replSet``, and ``--shardsvr`` parameters, as in the
following example:

```sh

mongod --shardsvr --replSet <replSetname>

```

Include any other options as appropriate for your deployment.

For more information on startup parameters,
see the [``mongod``](#bin.mongod) reference page.

Include additional settings as appropriate to your deployment.


#### Step 2: Connect to a member of the shard replica set.

Connect a [``mongo``](#bin.mongo) shell to one of the replica set members.

```sh

mongo --host <hostname> --port <port>

```


#### Step 3: Initiate the replica set.

The [``rs.initiate()``](#rs.initiate) method initiates the replica set and can
take an optional [replica set configuration document](#).

In the [replica set configuration document](#), include:

* The [``_id``](#rsconf._id) field. The [``_id``](#rsconf._id) *must* match the ``--replSet`` parameter passed to the [``mongod``](#bin.mongod). 

* The [``members``](#rsconf.members) field. The [``members``](#rsconf.members) field is an array and requires a document per each member of the replica set. 

See [Replica Set Configuration](#) for more information on
replica set configuration documents.

The following example initates a three member replica set.

```javascript

rs.initiate(
  {
    _id : <replicaSetName>,
    members: [
      { _id : 0, host : "s1-mongo1.example.net:27017" },
      { _id : 1, host : "s1-mongo2.example.net:27017" },
      { _id : 2, host : "s1-mongo3.example.net:27017" }
    ]
  }
)

```

[``rs.initiate()``](#rs.initiate) triggers an [*election*](#term-election) and
elects one of the members to be the [*primary*](#term-primary).

Connect to the primary before continuing. Use [``rs.status()``](#rs.status) to
locate the primary member.


### Connect a ``mongos`` to the Sharded Cluster


#### Step 1: Connect a [``mongos``](#bin.mongos) to the cluster

Start a [``mongos``](#bin.mongos) specifying
using either a configuration file or a command line parameter.

**Configuration File**

If using a configuration file, set the [``sharding.configDB``](#sharding.configDB) to
the config server replica set name and at least one member of the replica
set in ``<replSetName>/<host:port>`` format.

```yaml

sharding:
  configDB: <configReplSetName>/cfg1.example.net:27017,cfg2.example.net:27017,...

```

Start the [``mongos``](#bin.mongos) specifying the ``--config`` option and the
path to the configuration file.

```shell

mongos --config <path-to-config>

```

For more information on the configuration file, see
[configuration options](#).

**Command Line**

If using command line parameters start the [``mongos``](#bin.mongos) and specify
the ``--configdb`` parameter.

```sh

mongos --configdb <configReplSetName>/cfg1.example.net:27017,cfg2.example.net:27017,...

```

Include any other options as appropriate for your deployment.


#### Step 2: Connect to the [``mongos``](#bin.mongos).

Connect a [``mongo``](#bin.mongo) shell to the [``mongos``](#bin.mongos).

```shell

mongo --host <hostname> --port <port>

```


### Add Shards to the Cluster

Use the [``sh.addShard()``](#sh.addShard) method to add each shard to the cluster. If
the shard is a replica set, specify the name of the replica set and specify a
member of the set. In production deployments, *all* shards should be replica
sets.

The following operation adds a single shard replica set to the cluster:

```javascript

sh.addShard( "<replSetName>/s1-mongo1.example.net:27017")

```

The following operation is an example of adding a standalone [``mongod``](#bin.mongod)
shard to the cluster:

```javascript

sh.addShard( "s1-mongo1.example.net:27017")

```

Repeat these steps until the cluster includes all shards.


### Enable Sharding for a Database

To proceed, you must be connected to a [``mongos``](#bin.mongos) associated to the
target sharded cluster.

Before you can shard a collection, you must enable sharding for the
collection's database. Enabling sharding for a database does not redistribute
data but make it possible to shard the collections in that database.

Once you enable sharding for a database, MongoDB assigns a [*primary
shard*](#term-primary-shard) for that database where MongoDB stores all data in that
database.

Use the [``sh.enableSharding()``](#sh.enableSharding) method to enable sharding on the target
database.

```javascript

sh.enableSharding("<database>")

```


## Shard a Collection

This section contains an overall description of the sharding process.

For instructions specific to [Ranged Sharding](#sharding-ranged) sharding,
see [Shard a Collection using Ranged Sharding](#deploy-ranged-sharded-cluster-shard-collection).

For instructions specific to [Hashed Sharding](#sharding-hashed) sharding,
see [Shard a Collection using Hashed Sharding](#deploy-hashed-sharded-cluster-shard-collection)

To proceed, you must be connected to a [``mongos``](#bin.mongos) associated to the
target sharded cluster.

To shard a collection, use the [``sh.shardCollection()``](#sh.shardCollection) method. You must
specify the full namespace of the collection and a document containing the
shard key. The database must have sharding
[enabled](#deploy-ranged-sharded-cluster-shard-database).

Your selection of shard key affects the efficiency of sharding, as well as
your ability to take advantage of certain sharding features such as
[zones](#zone-sharding). See the selection considerations listed
in the [Choosing a Shard Key](#sharding-shard-key-selection).

If the collection already contains data, you must create an index on the
[*shard key*](#term-shard-key) using the [``db.collection.createIndex()``](#db.collection.createIndex) method before
using [``shardCollection()``](#sh.shardCollection).

If the collection is empty, MongoDB creates the index as part of
[``sh.shardCollection()``](#sh.shardCollection).

The following operation shards the target collection:

```javascript

sh.shardCollection("<database>.<collection>", { <key> : <direction> } )

```
