+++
title = "Convert a Replica Set to a Sharded Cluster"

tags = [
"mongodb",
"administration",
"replication",
"sharding",
"intermediate" ]
+++

# Convert a Replica Set to a Sharded Cluster


## Overview

This tutorial converts a single three-member replica set to a sharded
cluster with two shards. Each shard is an independent three-member
replica set. This tutorial is specific to MongoDB 3.6. For other
versions of MongoDB, refer to the corresponding version of the MongoDB
Manual.

The procedure is as follows:

1. Create the initial three-member replica set and insert data into a collection. See [Set Up Initial Replica Set](#convert-setup-initial-set).

2. Start the config servers and a [``mongos``](https://docs.mongodb.com/manual/reference/program/mongos/#bin.mongos). See [Deploy Config Server Replica Set and mongos](#convert-deploy-sharding-infrastructure).

3. Add the initial replica set as a shard. See [Add Initial Replica Set as a Shard](#convert-add-initial-shard).

4. Create a second shard and add to the cluster. See [Add Second Shard](#convert-add-second-shard).

5. Shard the desired collection. See [Shard a Collection](#convert-shard-collection).


## Prerequisites

This tutorial uses a total of ten servers: one server for the
[``mongos``](https://docs.mongodb.com/manual/reference/program/mongos/#bin.mongos) and three servers each for the first [*replica
set*](https://docs.mongodb.com/manual/reference/glossary/#term-replica-set), the second replica set, and the [config server replica set](https://docs.mongodb.com/manual/core/sharded-cluster-config-servers).

Each server must have a resolvable domain, hostname, or IP address
within your system.

The tutorial uses the default data directories (e.g. ``/data/db`` and
``/data/configdb``). Create the appropriate directories with
appropriate permissions. To use different paths, see
[Configuration File Options](https://docs.mongodb.com/manual/reference/configuration-options) .


## Procedures

<span id="convert-setup-initial-set"></span>


### Set Up Initial Replica Set

This procedure creates the initial three-member replica set ``rs0``.
The replica set members are on the following hosts:
``mongodb0.example.net``, ``mongodb1.example.net``, and
``mongodb2.example.net``.


#### Step 1: Start each member of the replica set with the appropriate options.

For each member, start a [``mongod``](https://docs.mongodb.com/manual/reference/program/mongod/#bin.mongod) instance with the
following settings:

* Set [``replication.replSetName``](https://docs.mongodb.com/manual/reference/configuration-options/#replication.replSetName) option to the replica set name,

  If your application connects to more than one replica set, each set
  should have a distinct name. Some drivers group replica set
  connections by replica set name.

* Set [``net.bindIp``](https://docs.mongodb.com/manual/reference/configuration-options/#net.bindIp) option to the ip or a comma-delimited list of ips, and

* Set any other settings as appropriate for your deployment.

In this tutorial, the three [``mongod``](https://docs.mongodb.com/manual/reference/program/mongod/#bin.mongod) instances are
associated with the following hosts:

| Replica Set Member | Hostname |
| - | - | - |
| Member 0 | ``mongodb0.example.net`` |
| Member 1 | ``mongodb1.example.net`` |
| Member 2 | ``mongodb2.example.net`` |

The following example specifies the replica set name and the ip
binding through the [``--replSet``](https://docs.mongodb.com/manual/reference/program/mongod/#cmdoption-replset) and [``--bind_ip``](https://docs.mongodb.com/manual/reference/program/mongos/#cmdoption-bind-ip)
command-line options:

Warning: Before you bind to other ip addresses, consider [enabling access control](https://docs.mongodb.com/manual/administration/security-checklist/#checklist-auth) and other security measures listed in [Security Checklist](https://docs.mongodb.com/manual/administration/security-checklist) to prevent unauthorized access.

```sh

mongod --replSet "rs0" --bind_ip localhost,<ip address of the mongod host>

```

For ``<ip address>``, specify the ip address or hostname for your
[``mongod``](https://docs.mongodb.com/manual/reference/program/mongod/#bin.mongod) instance that remote clients (including the other
members of the replica set) can use to connect to the instance.

Alternatively, you can also specify the [``replica set name``](https://docs.mongodb.com/manual/reference/configuration-options/#replication.replSetName) and the [``ip addresses``](https://docs.mongodb.com/manual/reference/configuration-options/#net.bindIp) in a [configuration file](https://docs.mongodb.com/manual/reference/configuration-options):

```yaml

replication:
   replSetName: "rs0"
net:
   bindIp: localhost,<ip address>

```

To start [``mongod``](https://docs.mongodb.com/manual/reference/program/mongod/#bin.mongod) with a configuration file, specify the
configuration file's path with the ``--config`` option:

```sh

mongod --config <path-to-config>

```

In production deployments, you can configure a [*init script*](https://docs.mongodb.com/manual/reference/glossary/#term-init-script)
to manage this process. Init scripts are beyond the scope of this
document.


#### Step 2: Connect a [``mongo``](https://docs.mongodb.com/manual/reference/program/mongo/#bin.mongo) shell to one of the ``mongod`` instances.

From the same machine where one of the [``mongod``](https://docs.mongodb.com/manual/reference/program/mongod/#bin.mongod) is running
(in this tutorial, ``mongodb0.example.net``), start the [``mongo``](https://docs.mongodb.com/manual/reference/program/mongo/#bin.mongo)
shell. To connect to the [``mongod``](https://docs.mongodb.com/manual/reference/program/mongod/#bin.mongod) listening to localhost on
the default port of ``27017``, simply issue:

```sh

mongo

```

Depending on your path, you may need to specify the path to the
[``mongo``](https://docs.mongodb.com/manual/reference/program/mongo/#bin.mongo) binary.


#### Step 3: Initiate the replica set.

From the [``mongo``](https://docs.mongodb.com/manual/reference/program/mongo/#bin.mongo) shell, run [``rs.initiate()``](https://docs.mongodb.com/manual/reference/method/rs.initiate/#rs.initiate) on
replica set member 0.

Important: Run [``rs.initiate()``](https://docs.mongodb.com/manual/reference/method/rs.initiate/#rs.initiate) on *just one and only one* [``mongod``](https://docs.mongodb.com/manual/reference/program/mongod/#bin.mongod) instance for the replica set.

```javascript

rs.initiate( {
   _id : "rs0",
   members: [
      { _id: 0, host: "mongodb0.example.net:27017" },
      { _id: 1, host: "mongodb1.example.net:27017" },
      { _id: 2, host: "mongodb2.example.net:27017" }
   ]
})

```

MongoDB initiates a replica set, using
the default replica set configuration.


#### Step 4: Create and populate a new collection.

The following step adds one million documents to the collection
``test_collection`` and can take several minutes depending on
your system.

To determine the primary, use [``rs.status()``](https://docs.mongodb.com/manual/reference/method/rs.status/#rs.status).

Issue the following operations on the primary of the replica set:

```javascript

use test
var bulk = db.test_collection.initializeUnorderedBulkOp();
people = ["Marc", "Bill", "George", "Eliot", "Matt", "Trey", "Tracy", "Greg", "Steve", "Kristina", "Katie", "Jeff"];
for(var i=0; i<1000000; i++){
   user_id = i;
   name = people[Math.floor(Math.random()*people.length)];
   number = Math.floor(Math.random()*10001);
   bulk.insert( { "user_id":user_id, "name":name, "number":number });
}
bulk.execute();

```

For more information on deploying a replica set, see
[Deploy a Replica Set](../deploy-replica-set/).


### Restart the Replica Set as a Shard

Changed in version 3.4: For MongoDB 3.4 sharded clusters, [``mongod``](https://docs.mongodb.com/manual/reference/program/mongod/#bin.mongod) instances for
the shards **must** explicitly specify its role as a ``shardsvr``,
either via the configuration file setting
[``sharding.clusterRole``](https://docs.mongodb.com/manual/reference/configuration-options/#sharding.clusterRole) or via the command line option
[``--shardsvr``](https://docs.mongodb.com/manual/reference/program/mongod/#cmdoption-shardsvr).

Note: Default port for [``mongod``](https://docs.mongodb.com/manual/reference/program/mongod/#bin.mongod) instances with the ``shardsvr`` role is ``27018``. To use a different port, specify [``net.port``](https://docs.mongodb.com/manual/reference/configuration-options/#net.port) setting or ``--port`` option.


#### Step 1: Determine the primary and secondary members.

Connect a [``mongo``](https://docs.mongodb.com/manual/reference/program/mongo/#bin.mongo) shell to one of the members and run
[``rs.status()``](https://docs.mongodb.com/manual/reference/method/rs.status/#rs.status) to determine the primary and secondary members.


#### Step 2: Restart secondary members with the ``--shardsvr`` option.

One secondary at a time, restart each [secondary](https://docs.mongodb.com/manual/core/replica-set-members/#replica-set-secondary-members) with the [``--shardsvr``](https://docs.mongodb.com/manual/reference/program/mongod/#cmdoption-shardsvr)
option. To continue to use the same port, include the ``--port``
option. Include additional options, such as [``--bind_ip``](https://docs.mongodb.com/manual/reference/program/mongos/#cmdoption-bind-ip), as
appropriate for your deployment.

Warning: Before you bind to other ip addresses, consider [enabling access control](https://docs.mongodb.com/manual/administration/security-checklist/#checklist-auth) and other security measures listed in [Security Checklist](https://docs.mongodb.com/manual/administration/security-checklist) to prevent unauthorized access.

```javascript

mongod --replSet "rs0" --shardsvr --port 27017 --bind_ip localhost,<ip address of the mongod host>

```

Include any other options as appropriate for your deployment.
Repeat this step for the other secondary.


#### Step 3: Step down the primary.

Connect a [``mongo``](https://docs.mongodb.com/manual/reference/program/mongo/#bin.mongo) shell to the primary and stepdown the primary.

```javascript

rs.stepDown()

```


#### Step 4: Restart the primary with the ``--shardsvr`` option.

Restart the primary with the [``--shardsvr``](https://docs.mongodb.com/manual/reference/program/mongod/#cmdoption-shardsvr) option.
To continue to use the same port, include the ``--port`` option.

```javascript

mongod --replSet "rs0" --shardsvr --port 27017 --bind_ip localhost,<ip address of the mongod host>

```

Include any other options as appropriate for your deployment.

<span id="convert-deploy-sharding-infrastructure"></span>


### Deploy Config Server Replica Set and ``mongos``

This procedure deploys the three-member replica set for the [config
servers](https://docs.mongodb.com/manual/core/sharded-cluster-config-servers) and the
[``mongos``](https://docs.mongodb.com/manual/reference/program/mongos/#bin.mongos).

* The config servers use the following hosts: ``mongodb7.example.net``, ``mongodb8.example.net``, and ``mongodb9.example.net``.

* The [``mongos``](https://docs.mongodb.com/manual/reference/program/mongos/#bin.mongos) uses ``mongodb6.example.net``.


#### Step 1: Deploy the config servers as a three-member replica set.

Start a config server on ``mongodb7.example.net``,
``mongodb8.example.net``, and ``mongodb9.example.net``. Specify the
same replica set name. The config servers use the default data
directory ``/data/configdb`` and the default port ``27019``.

Warning: Before you bind to other ip addresses, consider [enabling access control](https://docs.mongodb.com/manual/administration/security-checklist/#checklist-auth) and other security measures listed in [Security Checklist](https://docs.mongodb.com/manual/administration/security-checklist) to prevent unauthorized access.

```sh

mongod --configsvr --replSet configReplSet --bind_ip localhost,<ip address of the mongod host>

```

To modify the default settings or to include additional options
specific to your deployment, see [mongod](https://docs.mongodb.com/manual/reference/program/mongod) or
[Configuration File Options](https://docs.mongodb.com/manual/reference/configuration-options).

Connect a [``mongo``](https://docs.mongodb.com/manual/reference/program/mongo/#bin.mongo) shell to one of the config servers and
run [``rs.initiate()``](https://docs.mongodb.com/manual/reference/method/rs.initiate/#rs.initiate) to initiate the replica set.

Important: Run [``rs.initiate()``](https://docs.mongodb.com/manual/reference/method/rs.initiate/#rs.initiate) on *just one and only one* [``mongod``](https://docs.mongodb.com/manual/reference/program/mongod/#bin.mongod) instance for the replica set.

```javascript

rs.initiate( {
   _id: "configReplSet",
   configsvr: true,
   members: [
      { _id: 0, host: "mongodb07.example.net:27019" },
      { _id: 1, host: "mongodb08.example.net:27019" },
      { _id: 2, host: "mongodb09.example.net:27019" }
   ]
} )

```


#### Step 2: Start a ``mongos`` instance.

On ``mongodb6.example.net``, start the [``mongos``](https://docs.mongodb.com/manual/reference/program/mongos/#bin.mongos) specifying
the config server replica set name followed by a slash ``/`` and at least
one of the config server hostnames and ports.

```sh

mongos --configdb configReplSet/mongodb07.example.net:27019,mongodb08.example.net:27019,mongodb09.example.net:27019  --bind_ip localhost,<ip address of the mongos host>

```

<span id="convert-add-initial-shard"></span>


### Add Initial Replica Set as a Shard

The following procedure adds the initial replica set ``rs0`` as a shard.


#### Step 1: Connect a ``mongo`` shell to the ``mongos``.

```javascript

mongo mongodb6.example.net:27017/admin

```


#### Step 2: Add the shard.

Add a shard to the cluster with the [``sh.addShard``](https://docs.mongodb.com/manual/reference/method/sh.addShard/#sh.addShard) method:

```javascript

sh.addShard( "rs0/mongodb0.example.net:27017,mongodb1.example.net:27017,mongodb2.example.net:27017" )

```

<span id="convert-add-second-shard"></span>


### Add Second Shard

The following procedure deploys a new replica set ``rs1`` for the
second shard and adds it to the cluster. The replica set members are on
the following hosts: ``mongodb3.example.net``,
``mongodb4.example.net``, and ``mongodb5.example.net``.

Changed in version 3.4: For MongoDB 3.4 sharded clusters, [``mongod``](https://docs.mongodb.com/manual/reference/program/mongod/#bin.mongod) instances for
the shards **must** explicitly specify its role as a ``shardsvr``,
either via the configuration file setting
[``sharding.clusterRole``](https://docs.mongodb.com/manual/reference/configuration-options/#sharding.clusterRole) or via the command line option
[``--shardsvr``](https://docs.mongodb.com/manual/reference/program/mongod/#cmdoption-shardsvr).

Note: Default port for [``mongod``](https://docs.mongodb.com/manual/reference/program/mongod/#bin.mongod) instances with the ``shardsvr`` role is ``27018``. To use a different port, specify [``net.port``](https://docs.mongodb.com/manual/reference/configuration-options/#net.port) setting or ``--port`` option.


#### Step 1: Start each member of the replica set with the appropriate options.

For each member, start a [``mongod``](https://docs.mongodb.com/manual/reference/program/mongod/#bin.mongod), specifying the replica
set name through the ``replSet`` option and its role as a
shard with the [``--shardsvr``](https://docs.mongodb.com/manual/reference/program/mongod/#cmdoption-shardsvr) option. Specify additional options,
such as [``--bind_ip``](https://docs.mongodb.com/manual/reference/program/mongos/#cmdoption-bind-ip), as appropriate.

Warning: Before you bind to other ip addresses, consider [enabling access control](https://docs.mongodb.com/manual/administration/security-checklist/#checklist-auth) and other security measures listed in [Security Checklist](https://docs.mongodb.com/manual/administration/security-checklist) to prevent unauthorized access.

For replication-specific parameters, see
[Replication Options](https://docs.mongodb.com/manual/reference/program/mongod/#cli-mongod-replica-set).

```javascript

mongod --replSet "rs1" --shardsvr --port 27017 --bind_ip localhost,<ip address of the mongod host>

```

Repeat this step for the other two members of the ``rs1`` replica set.


#### Step 2: Connect a [``mongo``](https://docs.mongodb.com/manual/reference/program/mongo/#bin.mongo) shell to a replica set member.

Connect a [``mongo``](https://docs.mongodb.com/manual/reference/program/mongo/#bin.mongo) shell to *one* member of the replica set
(e.g. ``mongodb3.example.net``)

```javascript

mongo mongodb3.example.net

```


#### Step 3: Initiate the replica set.

From the [``mongo``](https://docs.mongodb.com/manual/reference/program/mongo/#bin.mongo) shell, run [``rs.initiate()``](https://docs.mongodb.com/manual/reference/method/rs.initiate/#rs.initiate) to
initiate a replica set that consists of the current member.

Important: Run [``rs.initiate()``](https://docs.mongodb.com/manual/reference/method/rs.initiate/#rs.initiate) on *just one and only one* [``mongod``](https://docs.mongodb.com/manual/reference/program/mongod/#bin.mongod) instance for the replica set.

```javascript

rs.initiate( {
   _id : "rs1",
   members: [ { _id : 0, host : "mongodb3.example.net:27017" } ]
})

```


#### Step 4: Add the remaining members to the replica set.

Add the remaining members with the [``rs.add()``](https://docs.mongodb.com/manual/reference/method/rs.add/#rs.add) method.

```javascript

rs.add("mongodb4.example.net")
rs.add("mongodb5.example.net")

```


#### Step 5: Connect a ``mongo`` shell to the ``mongos``.

```javascript

mongo mongodb6.example.net:27017/admin

```


#### Step 6: Add the shard.

In a [``mongo``](https://docs.mongodb.com/manual/reference/program/mongo/#bin.mongo) shell connected to the [``mongos``](https://docs.mongodb.com/manual/reference/program/mongos/#bin.mongos), add
the shard to the cluster with the [``sh.addShard()``](https://docs.mongodb.com/manual/reference/method/sh.addShard/#sh.addShard) method:

```javascript

sh.addShard( "rs1/mongodb3.example.net:27017,mongodb4.example.net:27017,mongodb5.example.net:27017" )

```

<span id="convert-shard-collection"></span>


### Shard a Collection


#### Step 1: Connect a ``mongo`` shell to the ``mongos``.

```javascript

mongo mongodb6.example.net:27017/admin

```


#### Step 2: Enable sharding for a database.

Before you can shard a collection, you must first enable sharding
for the collection's database. Enabling sharding for a database does not
redistribute data but makes it possible to shard the collections in
that database.

The following operation enables
sharding on the ``test`` database:

```sh

sh.enableSharding( "test" )

```

The operation returns the status of the operation:

```sh

{ "ok" : 1 }

```


#### Step 3: Determine the shard key.

For the collection to shard, determine the shard key. The [shard
key](https://docs.mongodb.com/manual/core/sharding-shard-key/#sharding-shard-key) determines how MongoDB distributes the
documents between shards. Good shard keys:

* have values that are evenly distributed among all documents,

* group documents that are often accessed at the same time into contiguous chunks, and

* allow for effective distribution of activity among shards.

Once you shard a collection with the specified shard key, you
**cannot** change the shard key. For more information on shard keys,
see [Shard Keys](https://docs.mongodb.com/manual/core/sharding-shard-key).

This procedure will use the ``number`` field as the shard key for
``test_collection``.


#### Step 4: Create an index on the shard key.

Before sharding a non-empty collection, create an [index on
the shard key](https://docs.mongodb.com/manual/core/sharding-shard-key).

```sh

use test
db.test_collection.createIndex( { number : 1 } )

```


#### Step 5: Shard the collection.

In the ``test`` database, shard the ``test_collection``,
specifying ``number`` as the shard key.

```sh

use test
sh.shardCollection( "test.test_collection", { "number" : 1 } )

```

The method returns the status of the operation:

```sh

{ "collectionsharded" : "test.test_collection", "ok" : 1 }

```

The [balancer](https://docs.mongodb.com/manual/core/sharding-balancer-administration) redistributes
chunks of documents when it next runs. As clients insert additional
documents into this collection, the [``mongos``](https://docs.mongodb.com/manual/reference/program/mongos/#bin.mongos) routes the
documents to the appropriate shard.


#### Step 6: Confirm the shard is balancing.

To confirm balancing activity, run [``db.stats()``](https://docs.mongodb.com/manual/reference/method/db.stats/#db.stats) or
[``db.printShardingStatus()``](https://docs.mongodb.com/manual/reference/method/db.printShardingStatus/#db.printShardingStatus) in the ``test`` database.

```sh

use test
db.stats()
db.printShardingStatus()

```

Example output of the [``db.stats()``](https://docs.mongodb.com/manual/reference/method/db.stats/#db.stats):

```sh

{
  "raw" : {
      "rs0/mongodb0.example.net:27017,mongodb1.example.net:27017,mongodb2.example.net:27017" : {
         "db" : "test",
         "collections" : 1,
         "views" : 0,
         "objects" : 640545,
         "avgObjSize" : 70.83200339949052,
         "dataSize" : 45370913,
         "storageSize" : 50438144,
         "numExtents" : 0,
         "indexes" : 2,
         "indexSize" : 24502272,
         "ok" : 1,
         "$gleStats" : {
                     "lastOpTime" : Timestamp(0, 0),
                     "electionId" : ObjectId("7fffffff0000000000000003")
                  }
      },
      "rs1/mongodb3.example.net:27017,mongodb4.example.net:27017,mongodb5.example.net:27017" : {
         "db" : "test",
         "collections" : 1,
         "views" : 0,
         "objects" : 359455,
         "avgObjSize" : 70.83259935179647,
         "dataSize" : 25461132,
         "storageSize" : 8630272,
         "numExtents" : 0,
         "indexes" : 2,
         "indexSize" : 8151040,
         "ok" : 1,
         "$gleStats" : {
            "lastOpTime" : Timestamp(0, 0),
            "electionId" : ObjectId("7fffffff0000000000000001")
         }

      }
  },
  "objects" : 1000000,
  "avgObjSize" : 70,
  "dataSize" : 70832045,
  "storageSize" : 59068416,
  "numExtents" : 0,
  "indexes" : 4,
  "indexSize" : 32653312,
  "fileSize" : 0,
  "extentFreeList" : {
      "num" : 0,
      "totalSize" : 0
  },
  "ok" : 1
}

```

Example output of the [``db.printShardingStatus()``](https://docs.mongodb.com/manual/reference/method/db.printShardingStatus/#db.printShardingStatus):

```sh

--- Sharding Status ---
sharding version: {
   "_id" : 1,
   "minCompatibleVersion" : 5,
   "currentVersion" : 6,
   "clusterId" : ObjectId("58039f730a4826076824c25f")
}
shards:
   {  "_id" : "rs0",  "host" : "rs0/mongodb0.example.net:27017,mongodb1.example.net:27017,mongodb2.example.net:27017",  "state" : 1 }
   {  "_id" : "rs1",  "host" : "rs1/mongodb3.example.net:27017,mongodb4.example.net:27017,mongodb5.example.net:27017",  "state" : 1 }
active mongoses:
   "3.4.0" : 1
autosplit:
   Currently enabled: yes
balancer:
   Currently enabled:  yes
   Currently running:  yes
         Balancer lock taken at Sun Oct 16 2016 11:59:51 GMT-0400 (EDT) by ConfigServer:Balancer
Failed balancer rounds in last 5 attempts:  0
Migration Results for the last 24 hours:
   3 : Success
   1 : Failed with error 'aborted', from rs0 to rs1
databases:
   {  "_id" : "test", "primary" : "rs0", "partitioned" : true }
      test.test_collection
            shard key: { "number" : 1 }
            unique: false
            balancing: true
            chunks:
               rs0   5
               rs1   1
            { "number" : { "$minKey" : 1 } } -->> { "number" : 1195 } on : rs1 Timestamp(2, 0)
            { "number" : 1195 } -->> { "number" : 2394 } on : rs0 Timestamp(2, 1)
            { "number" : 2394 } -->> { "number" : 3596 } on : rs0 Timestamp(1, 5)
            { "number" : 3596 } -->> { "number" : 4797 } on : rs0 Timestamp(1, 6)
            { "number" : 4797 } -->> { "number" : 9588 } on : rs0 Timestamp(1, 1)
            { "number" : 9588 } -->> { "number" : { "$maxKey" : 1 } } on : rs0 Timestamp(1, 2)

```

Run these commands for a second time to demonstrate that [*chunks*](https://docs.mongodb.com/manual/reference/glossary/#term-chunk) are migrating from ``rs0`` to ``rs1``.
