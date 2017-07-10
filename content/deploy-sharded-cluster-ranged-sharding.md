+++
title = "Deploy Sharded Cluster using Ranged Sharding"

tags = [
"mongodb",
"administration",
"sharding",
"advanced" ]
+++

# Deploy Sharded Cluster using Ranged Sharding


## Overview

In ranged-based sharding, MongoDB automatically divides data into contiguous
ranges determined by the shard key values. In this model, documents with
"close" shard key values are likely to be in the same [*chunk*](https://docs.mongodb.com/manual/reference/glossary/#term-chunk) or
[*shard*](https://docs.mongodb.com/manual/reference/glossary/#term-shard). This allows for efficient queries where reads target documents
within a contiguous range. However, both read and write performance may
decrease with poor shard key selection. See [Shard Key Selection](https://docs.mongodb.com/manual/core/ranged-sharding/#sharding-ranged-shard-key).

If you already have a sharded cluster deployed, skip to
[Shard a Collection using Ranged Sharding](#deploy-ranged-sharded-cluster-shard-collection).


### CloudManager and OpsManager

If you are currently using or are planning to use Cloud Manager or
Ops Manager, consider using their built-in features for
deploying a [*sharded cluster*](https://docs.mongodb.com/manual/reference/glossary/#term-sharded-cluster).

See ``Deploy a Sharded Cluster`` in the
[Cloud Manager manual](https://docs.cloudmanager.mongodb.com/tutorial/deploy-sharded-cluster) or in the
[Ops Manager manual](https://docs.opsmanager.mongodb.com/current/tutorial/deploy-sharded-cluster).


## Considerations


### Operating System

This tutorial uses the [``mongod``](https://docs.mongodb.com/manual/reference/program/mongod/#bin.mongod) and [``mongos``](https://docs.mongodb.com/manual/reference/program/mongos/#bin.mongos)
programs. Windows users should use the [``mongod.exe``](https://docs.mongodb.com/manual/reference/program/mongod.exe/#bin.mongod.exe) and
[``mongos.exe``](https://docs.mongodb.com/manual/reference/program/mongos.exe/#bin.mongos.exe) programs instead.


### Security

This tutorial does *not* include the required steps for configuring
[Internal Authentication](https://docs.mongodb.com/manual/core/security-internal-authentication) or [Role-Based Access Control](https://docs.mongodb.com/manual/core/authorization).
See [Deploy Sharded Cluster with Keyfile Access Control](../deploy-sharded-cluster-with-keyfile-access-control/) for a
tutorial on deploying a sharded cluster with a
[keyfile](https://docs.mongodb.com/manual/core/security-internal-authentication/#internal-auth-keyfile).

In production environments, sharded clusters should employ at
minimum [x.509](https://docs.mongodb.com/manual/core/security-x.509) security for internal authentication
and client access.

For details on using x.509 for internal authentication, see
[Use x.509 Certificate for Membership Authentication](https://docs.mongodb.com/manual/tutorial/configure-x509-member-authentication).

For details on using x.509 for client authentication, see
[Use x.509 Certificates to Authenticate Clients](https://docs.mongodb.com/manual/tutorial/configure-x509-client-authentication).

Note: Enabling internal authentication also enables [Role-Based Access Control](https://docs.mongodb.com/manual/core/authorization).

<span id="deploy-ranged-sharded-cluster"></span>


## Deploy Sharded Cluster with Ranged Sharding

The following procedures involve creating a new sharded cluster that consists
of a [``mongos``](https://docs.mongodb.com/manual/reference/program/mongos/#bin.mongos), the config servers, and two shards.

<span id="deploy-ranged-sharded-cluster-config-server"></span>


### Create the Config Server Replica Set

The following steps deploys a config server replica set.

For a production deployment, deploys a config server replica set with at
least three members. For testing purposes, you can create a
single-member replica set.


#### Step 1: Start each member of the config server replica set.

Start *each* [``mongod``](https://docs.mongodb.com/manual/reference/program/mongod/#bin.mongod) in the config server replica set.

You can specify the [``mongod``](https://docs.mongodb.com/manual/reference/program/mongod/#bin.mongod) settings either via a
configuration file or the command line.

**Configuration File**

If using a configuration file, set [``sharding.clusterRole``](https://docs.mongodb.com/manual/reference/configuration-options/#sharding.clusterRole)
to ``configsvr``, and [``replication.replSetName``](https://docs.mongodb.com/manual/reference/configuration-options/#replication.replSetName) to the
desired name of the config server replica set.

```yaml

sharding:
  clusterRole: configsvr
replication:
  replSetName: <setname>

```

Include additional settings as appropriate to your deployment.
For more information on the configuration file, see
[configuration options](https://docs.mongodb.com/manual/reference/configuration-options).

Start the [``mongod``](https://docs.mongodb.com/manual/reference/program/mongod/#bin.mongod) specifying the ``--config`` option and the
path to the configuration file.

```shell

mongod --config <path-to-config-file>

```

**Command Line**

If using the command line parameters, start the [``mongod``](https://docs.mongodb.com/manual/reference/program/mongod/#bin.mongod) with
the ``--configsvr``, and ``--replSet`` parameters.

```sh

mongod --configsvr --replSet <setname> --dbpath <path>

```

Include additional settings as appropriate to your deployment.
For more information on startup parameters, see the
[``mongod``](https://docs.mongodb.com/manual/reference/program/mongod/#bin.mongod) reference page.


#### Step 2: Connect to one of the config servers.

Connect a [``mongo``](https://docs.mongodb.com/manual/reference/program/mongo/#bin.mongo) shell to one of the config server
members.

```sh

mongo --host <hostname> --port <port>

```


#### Step 3

The [``rs.initiate()``](https://docs.mongodb.com/manual/reference/method/rs.initiate/#rs.initiate) method initiates the replica set and can
take an optional [replica set configuration document](https://docs.mongodb.com/manual/reference/replica-configuration). In the [replica set
configuration document](https://docs.mongodb.com/manual/reference/replica-configuration), include:

* The [``_id``](https://docs.mongodb.com/manual/reference/replica-configuration/#rsconf._id). The [``_id``](https://docs.mongodb.com/manual/reference/replica-configuration/#rsconf._id) *must* match the ``--replSet`` parameter passed to the [``mongod``](https://docs.mongodb.com/manual/reference/program/mongod/#bin.mongod).

* The [``members``](https://docs.mongodb.com/manual/reference/replica-configuration/#rsconf.members) field. The [``members``](https://docs.mongodb.com/manual/reference/replica-configuration/#rsconf.members) field is an array and requires a document per each member of the replica set.

* The [``configsvr``](https://docs.mongodb.com/manual/reference/replica-configuration/#rsconf.configsvr) field. The [``configsvr``](https://docs.mongodb.com/manual/reference/replica-configuration/#rsconf.configsvr) field must be set to ``true`` for the config server replica set.

See [Replica Set Configuration](https://docs.mongodb.com/manual/reference/replica-configuration) for more information on
replica set configuration documents.

Initiate the replica set using the [``rs.initiate()``](https://docs.mongodb.com/manual/reference/method/rs.initiate/#rs.initiate) method
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

Start *each* [``mongod``](https://docs.mongodb.com/manual/reference/program/mongod/#bin.mongod) in the replica set using either
a configuration file or the command line.

**Configuration File**

If using a configuration file, set the [``replication.replSetName``](https://docs.mongodb.com/manual/reference/configuration-options/#replication.replSetName)
to the desired name of the replica set, and the
[``sharding.clusterRole``](https://docs.mongodb.com/manual/reference/configuration-options/#sharding.clusterRole) option to ``shardsvr``.

```yaml

sharding:
  clusterRole: shardsvr
replication:
  replSetName: <replSetName>

```

Include any other options as appropriate for your deployment. See
[Configuration File Options](https://docs.mongodb.com/manual/reference/configuration-options) for settings available.

Start the [``mongod``](https://docs.mongodb.com/manual/reference/program/mongod/#bin.mongod) specifying the ``--config`` option
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
see the [``mongod``](https://docs.mongodb.com/manual/reference/program/mongod/#bin.mongod) reference page.

Include additional settings as appropriate to your deployment.


#### Step 2: Connect to a member of the shard replica set.

Connect a [``mongo``](https://docs.mongodb.com/manual/reference/program/mongo/#bin.mongo) shell to one of the replica set members.

```sh

mongo --host <hostname> --port <port>

```


#### Step 3: Initiate the replica set.

The [``rs.initiate()``](https://docs.mongodb.com/manual/reference/method/rs.initiate/#rs.initiate) method initiates the replica set and can
take an optional [replica set configuration document](https://docs.mongodb.com/manual/reference/replica-configuration).

In the [replica set configuration document](https://docs.mongodb.com/manual/reference/replica-configuration), include:

* The [``_id``](https://docs.mongodb.com/manual/reference/replica-configuration/#rsconf._id) field. The [``_id``](https://docs.mongodb.com/manual/reference/replica-configuration/#rsconf._id) *must* match the ``--replSet`` parameter passed to the [``mongod``](https://docs.mongodb.com/manual/reference/program/mongod/#bin.mongod).

* The [``members``](https://docs.mongodb.com/manual/reference/replica-configuration/#rsconf.members) field. The [``members``](https://docs.mongodb.com/manual/reference/replica-configuration/#rsconf.members) field is an array and requires a document per each member of the replica set.

See [Replica Set Configuration](https://docs.mongodb.com/manual/reference/replica-configuration) for more information on
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

[``rs.initiate()``](https://docs.mongodb.com/manual/reference/method/rs.initiate/#rs.initiate) triggers an [*election*](https://docs.mongodb.com/manual/reference/glossary/#term-election) and
elects one of the members to be the [*primary*](https://docs.mongodb.com/manual/reference/glossary/#term-primary).

Connect to the primary before continuing. Use [``rs.status()``](https://docs.mongodb.com/manual/reference/method/rs.status/#rs.status) to
locate the primary member.


### Connect a ``mongos`` to the Sharded Cluster


#### Step 1: Connect a [``mongos``](https://docs.mongodb.com/manual/reference/program/mongos/#bin.mongos) to the cluster

Start a [``mongos``](https://docs.mongodb.com/manual/reference/program/mongos/#bin.mongos) specifying
using either a configuration file or a command line parameter.

**Configuration File**

If using a configuration file, set the [``sharding.configDB``](https://docs.mongodb.com/manual/reference/configuration-options/#sharding.configDB) to
the config server replica set name and at least one member of the replica
set in ``<replSetName>/<host:port>`` format.

```yaml

sharding:
  configDB: <configReplSetName>/cfg1.example.net:27017,cfg2.example.net:27017,...

```

Start the [``mongos``](https://docs.mongodb.com/manual/reference/program/mongos/#bin.mongos) specifying the ``--config`` option and the
path to the configuration file.

```shell

mongos --config <path-to-config>

```

For more information on the configuration file, see
[configuration options](https://docs.mongodb.com/manual/reference/configuration-options).

**Command Line**

If using command line parameters start the [``mongos``](https://docs.mongodb.com/manual/reference/program/mongos/#bin.mongos) and specify
the ``--configdb`` parameter.

```sh

mongos --configdb <configReplSetName>/cfg1.example.net:27017,cfg2.example.net:27017,...

```

Include any other options as appropriate for your deployment.


#### Step 2: Connect to the [``mongos``](https://docs.mongodb.com/manual/reference/program/mongos/#bin.mongos).

Connect a [``mongo``](https://docs.mongodb.com/manual/reference/program/mongo/#bin.mongo) shell to the [``mongos``](https://docs.mongodb.com/manual/reference/program/mongos/#bin.mongos).

```shell

mongo --host <hostname> --port <port>

```


### Add Shards to the Cluster

Use the [``sh.addShard()``](https://docs.mongodb.com/manual/reference/method/sh.addShard/#sh.addShard) method to add each shard to the cluster. If
the shard is a replica set, specify the name of the replica set and specify a
member of the set. In production deployments, *all* shards should be replica
sets.

The following operation adds a single shard replica set to the cluster:

```javascript

sh.addShard( "<replSetName>/s1-mongo1.example.net:27017")

```

The following operation is an example of adding a standalone [``mongod``](https://docs.mongodb.com/manual/reference/program/mongod/#bin.mongod)
shard to the cluster:

```javascript

sh.addShard( "s1-mongo1.example.net:27017")

```

Repeat these steps until the cluster includes all shards.

<span id="deploy-ranged-sharded-cluster-shard-database"></span>


### Enable Sharding for a Database

To proceed, you must be connected to a [``mongos``](https://docs.mongodb.com/manual/reference/program/mongos/#bin.mongos) associated to the
target sharded cluster.

Enabling sharding on a database makes it possible to shard collections
within a database. Use the [``sh.enableSharding()``](https://docs.mongodb.com/manual/reference/method/sh.enableSharding/#sh.enableSharding) method to
enable sharding on the target database.

```javascript

sh.enableSharding("<database>")

```

<span id="deploy-ranged-sharded-cluster-shard-collection"></span>


## Shard a Collection using Ranged Sharding

To proceed, you must be connected to a [``mongos``](https://docs.mongodb.com/manual/reference/program/mongos/#bin.mongos) associated to the
target sharded cluster.

To shard a collection, use the [``sh.shardCollection()``](https://docs.mongodb.com/manual/reference/method/sh.shardCollection/#sh.shardCollection) method. You must
specify the full namespace of the collection and a document containing the
shard key. The database must have sharding
[enabled](#deploy-ranged-sharded-cluster-shard-database).

Your selection of shard key affects the efficiency of sharding, as well as
your ability to take advantage of certain sharding features such as
[zones](https://docs.mongodb.com/manual/core/zone-sharding/#zone-sharding). See the selection considerations listed
in the [Shard Key Selection](https://docs.mongodb.com/manual/core/ranged-sharding/#sharding-ranged-shard-key).

If the collection already contains data, you must create an index on the
[*shard key*](https://docs.mongodb.com/manual/reference/glossary/#term-shard-key) using the [``db.collection.createIndex()``](https://docs.mongodb.com/manual/reference/method/db.collection.createIndex/#db.collection.createIndex) method before
using [``shardCollection()``](https://docs.mongodb.com/manual/reference/method/sh.shardCollection/#sh.shardCollection).

If the collection is empty, MongoDB creates the index as part of
[``sh.shardCollection()``](https://docs.mongodb.com/manual/reference/method/sh.shardCollection/#sh.shardCollection).

The following operation shards the target collection using the
[ranged](https://docs.mongodb.com/manual/core/ranged-sharding) sharding strategy.

```javascript

sh.shardCollection("<database>.<collection>", { <key> : <direction> } )

```
