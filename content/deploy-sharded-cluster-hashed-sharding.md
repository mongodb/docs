+++
title = "Deploy Sharded Cluster using Hashed Sharding"

tags = [
"mongodb",
"administration",
"sharding",
"advanced" ]
+++

# Deploy Sharded Cluster using Hashed Sharding


## Overview

Hashed shard keys use a [hashed index](https://docs.mongodb.com/manual/core/index-hashed/#index-hashed-index) of a
single field as the [*shard key*](https://docs.mongodb.com/manual/reference/glossary/#term-shard-key) to partition data across your
sharded cluster.

Hashed sharding provides a more even data distribution across the sharded
cluster at the cost of reducing [Query Isolation](https://docs.mongodb.com/manual/core/sharded-cluster-query-router/#sharding-query-isolation). With
hashed sharding, documents with "close" shard key values are unlikely
to be on the same chunk or shard, and the [``mongos``](https://docs.mongodb.com/manual/reference/program/mongos/#bin.mongos) is more
likely to perform [Broadcast Operations](https://docs.mongodb.com/manual/core/sharded-cluster-query-router/#sharding-mongos-broadcast) to fulfill a given
query.

If you already have a sharded cluster deployed, skip to
[Shard a Collection using Hashed Sharding](#deploy-hashed-sharded-cluster-shard-collection).


### Atlas, CloudManager and OpsManager

If you are currently using or are planning to use Atlas, Cloud Manager
or Ops Manager, refer to their respective manual for instructions on
deploying a [*sharded cluster*](https://docs.mongodb.com/manual/reference/glossary/#term-sharded-cluster):

* [Create a Cluster (Atlas)](https://docs.atlas.mongodb.com/create-new-cluster/)

* [Deploy a Sharded Cluster (Cloud Manager)](https://docs.cloudmanager.mongodb.com/tutorial/deploy-sharded-cluster)

* [Deploy a Sharded Cluster (Ops Manager)](https://docs.opsmanager.mongodb.com/current/tutorial/deploy-sharded-cluster).


## Considerations


### Operating System

This tutorial uses the [``mongod``](https://docs.mongodb.com/manual/reference/program/mongod/#bin.mongod) and [``mongos``](https://docs.mongodb.com/manual/reference/program/mongos/#bin.mongos)
programs. Windows users should use the [``mongod.exe``](https://docs.mongodb.com/manual/reference/program/mongod.exe/#bin.mongod.exe) and
[``mongos.exe``](https://docs.mongodb.com/manual/reference/program/mongos.exe/#bin.mongos.exe) programs instead.


### IP Binding

Use the ``bind_ip`` option to ensure that MongoDB listens for
connections from applications on configured addresses.

Changed in version 3.6: Starting in MongoDB 3.6, MongoDB binaries, [``mongod``](https://docs.mongodb.com/manual/reference/program/mongod/#bin.mongod) and
[``mongos``](https://docs.mongodb.com/manual/reference/program/mongos/#bin.mongos), bind to localhost (``127.0.0.1``) by default. If the
[``net.ipv6``](https://docs.mongodb.com/manual/reference/configuration-options/#net.ipv6) configuration file setting or the ``--ipv6``
command line option is set for the binary, the binary additionally binds
to the IPv6 address ``::1``. Previously, starting from MongoDB 2.6, only the binaries from the
official MongoDB RPM (Red Hat, CentOS, Fedora Linux, and derivatives)
and DEB (Debian, Ubuntu, and derivatives) packages bind to localhost by
default. When bound only to the localhost, these MongoDB 3.6 binaries can only
accept connections from clients (including the [``mongo``](https://docs.mongodb.com/manual/reference/program/mongo/#bin.mongo) shell,
other members in your deployment for replica sets and sharded clusters)
that are running on the same machine. Remote clients cannot connect to
the binaries bound only to localhost. To override and bind to other ip addresses, you can use the
[``net.bindIp``](https://docs.mongodb.com/manual/reference/configuration-options/#net.bindIp) configuration file setting or the ``--bind_ip``
command-line option to specify a list of ip addresses.

Warning: Before you bind to other ip addresses, consider [enabling access control](https://docs.mongodb.com/manual/administration/security-checklist/#checklist-auth) and other security measures listed in [Security Checklist](https://docs.mongodb.com/manual/administration/security-checklist) to prevent unauthorized access.

For example, the following [``mongod``](https://docs.mongodb.com/manual/reference/program/mongod/#bin.mongod) instance binds to both the
localhost and the sample ip address ``198.51.100.1``:

```

mongod --bind_ip localhost,198.51.100.1

```

In order to connect to this instance, remote clients must specify the
ip address ``198.51.100.1`` or the hostname associated with the ip
address:

```

mongo --host 198.51.100.1

mongo --host My-Example-Associated-Hostname

```


### Security

This tutorial does *not* include the required steps for configuring
[Internal Authentication](https://docs.mongodb.com/manual/core/security-internal-authentication) or [Role-Based Access Control](https://docs.mongodb.com/manual/core/authorization).
See [Deploy Sharded Cluster with Keyfile Access Control](../deploy-sharded-cluster-with-keyfile-access-control/) for a
tutorial on deploying a sharded cluster with a
[keyfile](https://docs.mongodb.com/manual/core/security-internal-authentication/#internal-auth-keyfile).

In production environments, sharded clusters should employ at
minimum [x.509](https://docs.mongodb.com/manual/core/security-x.509) security for internal authentication
and client access:

* For details on using x.509 for internal authentication, see [Use x.509 Certificate for Membership Authentication](https://docs.mongodb.com/manual/tutorial/configure-x509-member-authentication).

* For details on using x.509 for client authentication, see [Use x.509 Certificates to Authenticate Clients](https://docs.mongodb.com/manual/tutorial/configure-x509-client-authentication).

Note: Enabling internal authentication also enables [Role-Based Access Control](https://docs.mongodb.com/manual/core/authorization).

<span id="deploy-hashed-sharded-cluster"></span>


## Deploy Sharded Cluster with Hashed Sharding

<span id="deploy-hashed-sharded-cluster-config-server"></span>


### Create the Config Server Replica Set

The following steps deploys a config server replica set.

For a production deployment, deploy a config server replica set with at
least three members. For testing purposes, you can create a
single-member replica set.

For this tutorial, the config server replica set members are associated
with the following hosts:

| Config Server Replica Set Member | Hostname |
| - | - | - |
| Member 0 | ``cfg1.example.net`` |
| Member 1 | ``cfg2.example.net`` |
| Member 2 | ``cfg3.example.net`` |


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
members for each shard. For testing purposes, you can create a
single-member replica set.

For each shard, use the following steps to create the shard replica set.


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

Once you have connected the [``mongo``](https://docs.mongodb.com/manual/reference/program/mongo/#bin.mongo) shell to the
[``mongos``](https://docs.mongodb.com/manual/reference/program/mongos/#bin.mongos), continue to the next procedure to add shards to
the cluster.


### Add Shards to the Cluster

In the [``mongo``](https://docs.mongodb.com/manual/reference/program/mongo/#bin.mongo) shell connected to the [``mongos``](https://docs.mongodb.com/manual/reference/program/mongos/#bin.mongos), use
the [``sh.addShard()``](https://docs.mongodb.com/manual/reference/method/sh.addShard/#sh.addShard) method to add each shard to the cluster. If
the shard is a replica set, specify the name of the replica set and
specify a member of the set.

Tip: In production deployments, *all* shards should be replica sets.

The following operation adds a single shard replica set to the cluster:

```javascript

sh.addShard( "<replSetName>/s1-mongo1.example.net:27018")

```

Repeat to add all shards.

If in a development environment, the shard is a standalone
[``mongod``](https://docs.mongodb.com/manual/reference/program/mongod/#bin.mongod) instance, specify the instance's hostname and port.
The following operation is an example of adding a standalone
[``mongod``](https://docs.mongodb.com/manual/reference/program/mongod/#bin.mongod) shard to the cluster:

```javascript

sh.addShard( "s1-mongo1.example.net:27018")

```

<span id="deploy-hashed-sharded-cluster-shard-database"></span>


### Enable Sharding for a Database

From the [``mongo``](https://docs.mongodb.com/manual/reference/program/mongo/#bin.mongo) shell connected to the [``mongos``](https://docs.mongodb.com/manual/reference/program/mongos/#bin.mongos), use
the [``sh.enableSharding()``](https://docs.mongodb.com/manual/reference/method/sh.enableSharding/#sh.enableSharding) method to enable sharding on the
target database. Enabling sharding on a database makes it possible to
shard collections within a database.

```javascript

sh.enableSharding("<database>")

```

<span id="deploy-hashed-sharded-cluster-shard-collection"></span>


## Shard a Collection using Hashed Sharding

From the [``mongo``](https://docs.mongodb.com/manual/reference/program/mongo/#bin.mongo) shell connected to the [``mongos``](https://docs.mongodb.com/manual/reference/program/mongos/#bin.mongos), use
the [``sh.shardCollection()``](https://docs.mongodb.com/manual/reference/method/sh.shardCollection/#sh.shardCollection) method to shard a collection.

Note: You must have [enabled sharding](https://docs.mongodb.com/manual/tutorial/deploy-sharded-cluster-ranged-sharding/#deploy-ranged-sharded-cluster-shard-database) for the database where the collection resides. See [Enable Sharding for a Database](#deploy-hashed-sharded-cluster-shard-database).

If the collection already contains data, you must create a
[Hashed Indexes](https://docs.mongodb.com/manual/core/index-hashed/#index-type-hashed) on the [*shard key*](https://docs.mongodb.com/manual/reference/glossary/#term-shard-key) using the
[``db.collection.createIndex()``](https://docs.mongodb.com/manual/reference/method/db.collection.createIndex/#db.collection.createIndex) method before using
[``shardCollection()``](https://docs.mongodb.com/manual/reference/method/sh.shardCollection/#sh.shardCollection).

If the collection is empty, MongoDB creates the index as part of
[``sh.shardCollection()``](https://docs.mongodb.com/manual/reference/method/sh.shardCollection/#sh.shardCollection).

The following operation shards the target collection using the
[hashed](https://docs.mongodb.com/manual/core/hashed-sharding) sharding strategy.

```javascript

sh.shardCollection("<database>.<collection>", { <shard key> : "hashed" } )

```

* You must specify the full namespace of the collection and the shard key.

* Your selection of shard key affects the efficiency of sharding, as well as your ability to take advantage of certain sharding features such as [zones](https://docs.mongodb.com/manual/core/zone-sharding/#zone-sharding). See the selection considerations listed in the [Hashed Sharding Shard Key](https://docs.mongodb.com/manual/core/hashed-sharding/#hashed-sharding-shard-key).
