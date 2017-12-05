+++
title = "Deploy a Sharded Cluster"

tags = [
"mongodb",
"administration",
"sharding",
"intermediate" ]
+++

<span id="sharding-procedure-setup"></span>


# Deploy a Sharded Cluster


## Overview

This tutorial involves creating a new sharded cluster that consists of a
[``mongos``](https://docs.mongodb.com/manual/reference/program/mongos/#bin.mongos), the config server replica set, and two shard replica sets.

For instructions specific to sharding a collection, see
[Shard a Collection using Hashed Sharding](https://docs.mongodb.com/manual/tutorial/deploy-sharded-cluster-hashed-sharding/#deploy-hashed-sharded-cluster-shard-collection) or
[Shard a Collection using Ranged Sharding](https://docs.mongodb.com/manual/tutorial/deploy-sharded-cluster-ranged-sharding/#deploy-ranged-sharded-cluster-shard-collection).


## Considerations


### Connectivity

Each member of a sharded cluster must be able to connect to *all* other
members in the cluster. This includes all shards and config servers.
Ensure that network and security systems, including all interface and
firewalls, allow these connections.


### CloudManager and OpsManager

If you are currently using or are planning to use Cloud Manager or
Ops Manager, consider using their built-in features for
deploying a [*sharded cluster*](https://docs.mongodb.com/manual/reference/glossary/#term-sharded-cluster).

See ``Deploy a Sharded Cluster`` in the
[Cloud Manager manual](https://docs.cloudmanager.mongodb.com/tutorial/deploy-sharded-cluster) or in the
[Ops Manager manual](https://docs.opsmanager.mongodb.com/current/tutorial/deploy-sharded-cluster).


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


### Host Identifier

If you use either ``localhost`` or ``127.0.0.1`` as the hostname portion of
any host identifier, you *must* use that identifier as the host setting
for any other MongoDB component in the cluster.

For example, the [``sh.addShard()``](https://docs.mongodb.com/manual/reference/method/sh.addShard/#sh.addShard) method takes a ``host`` parameter for
the hostname of the target shard. If you set ``host`` to ``localhost``, you
must then use ``localhost`` as the host for all other shards in the cluster.

<span id="deploy-sharded-cluster"></span><span id="sharding-deploy-sharded-cluster"></span>


## Deploy Sharded Cluster

<span id="sharding-setup-start-cfgsrvr"></span>


### Create the Config Server Replica Set

The following steps deploys a config server replica set.

For a production deployment, deploy a config server replica set with at
least three members. For testing purposes, you can create a
single-member replica set.


#### Step 1: Start each member of the config server replica set.

When starting *each* [``mongod``](https://docs.mongodb.com/manual/reference/program/mongod/#bin.mongod), specify the
[``mongod``](https://docs.mongodb.com/manual/reference/program/mongod/#bin.mongod) settings either via a configuration file or the
command line.

**Configuration File**

If using a configuration file, set:

```yaml

sharding:
  clusterRole: configsvr
replication:
  replSetName: <replica set name>
net:
  bindIp: localhost,<ip address>

```

* [``sharding.clusterRole``](https://docs.mongodb.com/manual/reference/configuration-options/#sharding.clusterRole) to ``configsvr``,

* [``replication.replSetName``](https://docs.mongodb.com/manual/reference/configuration-options/#replication.replSetName) to the desired name of the config server replica set,

* [``net.bindIp``](https://docs.mongodb.com/manual/reference/configuration-options/#net.bindIp) option to the ip or a comma-delimited list of ips that remote clients (including the other members of the config server replica set as well as other members of the sharded cluster) can use to connect to the instance.

  Warning: Before you bind to other ip addresses, consider [enabling access control](https://docs.mongodb.com/manual/administration/security-checklist/#checklist-auth) and other security measures listed in [Security Checklist](https://docs.mongodb.com/manual/administration/security-checklist) to prevent unauthorized access.

* Additional settings as appropriate to your deployment, such as [``storage.dbPath``](https://docs.mongodb.com/manual/reference/configuration-options/#storage.dbPath) and [``net.port``](https://docs.mongodb.com/manual/reference/configuration-options/#net.port). For more information on the configuration file, see [configuration options](https://docs.mongodb.com/manual/reference/configuration-options).

Start the [``mongod``](https://docs.mongodb.com/manual/reference/program/mongod/#bin.mongod) with the ``--config`` option
set to the configuration file path.

```sh

mongod --config <path-to-config-file>

```

**Command Line**

If using the command line options, start the [``mongod``](https://docs.mongodb.com/manual/reference/program/mongod/#bin.mongod)
with the ``--configsvr``, ``--replSet``, ``--bind_ip``,
and other options as appropriate to your deployment. For example:

Warning: Before you bind to other ip addresses, consider [enabling access control](https://docs.mongodb.com/manual/administration/security-checklist/#checklist-auth) and other security measures listed in [Security Checklist](https://docs.mongodb.com/manual/administration/security-checklist) to prevent unauthorized access.

```sh

mongod --configsvr --replSet <replica set name> --dbpath <path> --bind_ip localhost,<ip address of the mongod host>

```

For more information on startup parameters, see the
[``mongod``](https://docs.mongodb.com/manual/reference/program/mongod/#bin.mongod) reference page.


#### Step 2: Connect to one of the config servers.

Connect a [``mongo``](https://docs.mongodb.com/manual/reference/program/mongo/#bin.mongo) shell to one of the config server
members.

```sh

mongo --host <hostname> --port <port>

```


#### Step 3: Initiate the replica set.

From the [``mongo``](https://docs.mongodb.com/manual/reference/program/mongo/#bin.mongo) shell, run the [``rs.initiate()``](https://docs.mongodb.com/manual/reference/method/rs.initiate/#rs.initiate) method.

[``rs.initiate()``](https://docs.mongodb.com/manual/reference/method/rs.initiate/#rs.initiate) can take an optional [replica set
configuration document](https://docs.mongodb.com/manual/reference/replica-configuration). In the
[replica set configuration document](https://docs.mongodb.com/manual/reference/replica-configuration), include:

* The [``_id``](https://docs.mongodb.com/manual/reference/replica-configuration/#rsconf._id) set to the replica set name specified in either the [``replication.replSetName``](https://docs.mongodb.com/manual/reference/configuration-options/#replication.replSetName) or the ``--replSet`` option.

* The [``configsvr``](https://docs.mongodb.com/manual/reference/replica-configuration/#rsconf.configsvr) field  set to ``true`` for the config server replica set.

* The [``members``](https://docs.mongodb.com/manual/reference/replica-configuration/#rsconf.members) array with a document per each member of the replica set.

Important: Run [``rs.initiate()``](https://docs.mongodb.com/manual/reference/method/rs.initiate/#rs.initiate) on *just one and only one* [``mongod``](https://docs.mongodb.com/manual/reference/program/mongod/#bin.mongod) instance for the replica set.

```javascript

rs.initiate(
  {
    _id: "<replSetName>",
    configsvr: true,
    members: [
      { _id : 0, host : "cfg1.example.net:27019" },
      { _id : 1, host : "cfg2.example.net:27019" },
      { _id : 2, host : "cfg3.example.net:27019" }
    ]
  }
)

```

See [Replica Set Configuration](https://docs.mongodb.com/manual/reference/replica-configuration) for more information on
replica set configuration documents.

Once the config server replica set (CSRS) is initiated and up, proceed
to creating the shard replica sets.


### Create the Shard Replica Sets

For a production deployment, use a replica set with at least three
members. For testing purposes, you can create a single-member replica
set.


#### Step 1: Start each member of the shard replica set.

When starting *each* [``mongod``](https://docs.mongodb.com/manual/reference/program/mongod/#bin.mongod), specify the
[``mongod``](https://docs.mongodb.com/manual/reference/program/mongod/#bin.mongod) settings either via a configuration file or the
command line.

**Configuration File**

If using a configuration file, set:

```yaml

sharding:
   clusterRole: shardsvr
replication:
   replSetName: <replSetName>
net:
   bindIp: localhost,<ip address>

```

* [``replication.replSetName``](https://docs.mongodb.com/manual/reference/configuration-options/#replication.replSetName) to the desired name of the replica set,

* [``sharding.clusterRole``](https://docs.mongodb.com/manual/reference/configuration-options/#sharding.clusterRole) option to ``shardsvr``,

* [``net.bindIp``](https://docs.mongodb.com/manual/reference/configuration-options/#net.bindIp) option to the ip or a comma-delimited list of ips that remote clients (including the other members of the config server replica set as well as other members of the sharded cluster) can use to connect to the instance.

  Warning: Before you bind to other ip addresses, consider [enabling access control](https://docs.mongodb.com/manual/administration/security-checklist/#checklist-auth) and other security measures listed in [Security Checklist](https://docs.mongodb.com/manual/administration/security-checklist) to prevent unauthorized access.

* Additional settings as appropriate to your deployment, such as [``storage.dbPath``](https://docs.mongodb.com/manual/reference/configuration-options/#storage.dbPath) and [``net.port``](https://docs.mongodb.com/manual/reference/configuration-options/#net.port). For more information on the configuration file, see [configuration options](https://docs.mongodb.com/manual/reference/configuration-options).

Start the [``mongod``](https://docs.mongodb.com/manual/reference/program/mongod/#bin.mongod) with the ``--config`` option set to
the configuration file path.

```sh

mongod --config <path-to-config-file>

```

**Command Line**

If using the command line option,  start the [``mongod``](https://docs.mongodb.com/manual/reference/program/mongod/#bin.mongod) with
the ``--replSet``, and ``--shardsvr``, ``--bind_ip`` options,
and other options as appropriate to your deployment.  For example:

```sh

mongod --shardsvr --replSet <replSetname>  --dbpath <path> --bind_ip localhost,<ip address of the mongod host>

```

For more information on startup parameters, see the
[``mongod``](https://docs.mongodb.com/manual/reference/program/mongod/#bin.mongod) reference page.


#### Step 2: Connect to one member of the shard replica set.

Connect a [``mongo``](https://docs.mongodb.com/manual/reference/program/mongo/#bin.mongo) shell to one of the replica set members.

```sh

mongo --host <hostname> --port <port>

```


#### Step 3: Initiate the replica set.

From the [``mongo``](https://docs.mongodb.com/manual/reference/program/mongo/#bin.mongo) shell, run the [``rs.initiate()``](https://docs.mongodb.com/manual/reference/method/rs.initiate/#rs.initiate) method.

[``rs.initiate()``](https://docs.mongodb.com/manual/reference/method/rs.initiate/#rs.initiate) can take an optional [replica set
configuration document](https://docs.mongodb.com/manual/reference/replica-configuration). In the
[replica set configuration document](https://docs.mongodb.com/manual/reference/replica-configuration), include:

* The [``_id``](https://docs.mongodb.com/manual/reference/replica-configuration/#rsconf._id) field set to the replica set name specified in either the [``replication.replSetName``](https://docs.mongodb.com/manual/reference/configuration-options/#replication.replSetName) or the ``--replSet`` option.

* The [``members``](https://docs.mongodb.com/manual/reference/replica-configuration/#rsconf.members) array with a document per each member of the replica set.

The following example initiates a three member replica set.

Important: Run [``rs.initiate()``](https://docs.mongodb.com/manual/reference/method/rs.initiate/#rs.initiate) on *just one and only one* [``mongod``](https://docs.mongodb.com/manual/reference/program/mongod/#bin.mongod) instance for the replica set.

```javascript

rs.initiate(
  {
    _id : <replicaSetName>,
    members: [
      { _id : 0, host : "s1-mongo1.example.net:27018" },
      { _id : 1, host : "s1-mongo2.example.net:27018" },
      { _id : 2, host : "s1-mongo3.example.net:27018" }
    ]
  }
)

```

<span id="sharding-setup-start-mongos"></span>


### Connect a ``mongos`` to the Sharded Cluster


#### Step 1: Connect a [``mongos``](https://docs.mongodb.com/manual/reference/program/mongos/#bin.mongos) to the cluster

Start a [``mongos``](https://docs.mongodb.com/manual/reference/program/mongos/#bin.mongos) using either a configuration file or a
command line parameter to specify the config servers.

**Configuration File**

If using a configuration file, set the [``sharding.configDB``](https://docs.mongodb.com/manual/reference/configuration-options/#sharding.configDB) to
the config server replica set name and at least one member of the replica
set in ``<replSetName>/<host:port>`` format.

Warning: Before you bind to other ip addresses, consider [enabling access control](https://docs.mongodb.com/manual/administration/security-checklist/#checklist-auth) and other security measures listed in [Security Checklist](https://docs.mongodb.com/manual/administration/security-checklist) to prevent unauthorized access.

```yaml

sharding:
  configDB: <configReplSetName>/cfg1.example.net:27019,cfg2.example.net:27019
net:
  bindIp: localhost,<ip address>

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
the ``--configdb``,  ``--bind_ip``,
and other options as appropriate to your deployment. For example:

Warning: Before you bind to other ip addresses, consider [enabling access control](https://docs.mongodb.com/manual/administration/security-checklist/#checklist-auth) and other security measures listed in [Security Checklist](https://docs.mongodb.com/manual/administration/security-checklist) to prevent unauthorized access.

```sh

mongos --configdb <configReplSetName>/cfg1.example.net:27019,cfg2.example.net:27019 --bind_ip localhost,<ip address of the mongos host>

```

Include any other options as appropriate for your deployment.


#### Step 2: Connect to the [``mongos``](https://docs.mongodb.com/manual/reference/program/mongos/#bin.mongos).

Connect a [``mongo``](https://docs.mongodb.com/manual/reference/program/mongo/#bin.mongo) shell to the [``mongos``](https://docs.mongodb.com/manual/reference/program/mongos/#bin.mongos).

```shell

mongo --host <hostname> --port <port>

```

<span id="sharding-setup-add-shards"></span>


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

<span id="sharding-setup-enable-sharding"></span>


### Enable Sharding for a Database

To proceed, you must be connected to a [``mongos``](https://docs.mongodb.com/manual/reference/program/mongos/#bin.mongos) associated to the
target sharded cluster.

Before you can shard a collection, you must enable sharding for the
collection's database. Enabling sharding for a database does not redistribute
data but make it possible to shard the collections in that database.

Once you enable sharding for a database, MongoDB assigns a [*primary
shard*](https://docs.mongodb.com/manual/reference/glossary/#term-primary-shard) for that database where MongoDB stores all data in that
database.

Use the [``sh.enableSharding()``](https://docs.mongodb.com/manual/reference/method/sh.enableSharding/#sh.enableSharding) method to enable sharding on the target
database.

```javascript

sh.enableSharding("<database>")

```

<span id="sharding-setup-shard-collection"></span>


## Shard a Collection

This section contains an overall description of the sharding process.

For instructions specific to [Ranged Sharding](https://docs.mongodb.com/manual/core/ranged-sharding/#sharding-ranged) sharding,
see [Shard a Collection using Ranged Sharding](https://docs.mongodb.com/manual/tutorial/deploy-sharded-cluster-ranged-sharding/#deploy-ranged-sharded-cluster-shard-collection).

For instructions specific to [Hashed Sharding](https://docs.mongodb.com/manual/core/hashed-sharding/#sharding-hashed) sharding,
see [Shard a Collection using Hashed Sharding](https://docs.mongodb.com/manual/tutorial/deploy-sharded-cluster-hashed-sharding/#deploy-hashed-sharded-cluster-shard-collection)

To proceed, you must be connected to a [``mongos``](https://docs.mongodb.com/manual/reference/program/mongos/#bin.mongos) associated to the
target sharded cluster.

To shard a collection, use the [``sh.shardCollection()``](https://docs.mongodb.com/manual/reference/method/sh.shardCollection/#sh.shardCollection) method. You must
specify the full namespace of the collection and a document containing the
shard key. The database must have sharding
[enabled](https://docs.mongodb.com/manual/tutorial/deploy-sharded-cluster-ranged-sharding/#deploy-ranged-sharded-cluster-shard-database).

Your selection of shard key affects the efficiency of sharding, as well as
your ability to take advantage of certain sharding features such as
[zones](https://docs.mongodb.com/manual/core/zone-sharding/#zone-sharding). See the selection considerations listed
in the [Choosing a Shard Key](https://docs.mongodb.com/manual/core/sharding-shard-key/#sharding-shard-key-selection).

If the collection already contains data, you must create an index on the
[*shard key*](https://docs.mongodb.com/manual/reference/glossary/#term-shard-key) using the [``db.collection.createIndex()``](https://docs.mongodb.com/manual/reference/method/db.collection.createIndex/#db.collection.createIndex) method before
using [``shardCollection()``](https://docs.mongodb.com/manual/reference/method/sh.shardCollection/#sh.shardCollection).

If the collection is empty, MongoDB creates the index as part of
[``sh.shardCollection()``](https://docs.mongodb.com/manual/reference/method/sh.shardCollection/#sh.shardCollection).

The following operation shards the target collection:

```javascript

sh.shardCollection("<database>.<collection>", { <key> : <direction> } )

```
