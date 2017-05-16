+++
title = "Deploy a Replica Set"

tags = [
"mongodb",
"administration",
"replication",
"beginner" ]
+++

# Deploy a Replica Set

This tutorial describes how to create a three-member [*replica
set*](https://docs.mongodb.com/manual/reference/glossary/#term-replica-set) from three existing [``mongod``](https://docs.mongodb.com/manual/reference/program/mongod/#bin.mongod) instances running with
[access control](https://docs.mongodb.com/manual/core/authorization) disabled.

To deploy a replica set with enabled [access control](https://docs.mongodb.com/manual/core/authorization), see
[Deploy Replica Set With Keyfile Access Control](https://docs.mongodb.com/manual/tutorial/deploy-replica-set-with-keyfile-access-control/#deploy-repl-set-with-auth). If you wish to deploy a
replica set from a single MongoDB instance, see
[Convert a Standalone to a Replica Set](https://docs.mongodb.com/manual/tutorial/convert-standalone-to-replica-set). For more
information on replica set deployments, see the [Replication](https://docs.mongodb.com/manual/replication) and
[Replica Set Deployment Architectures](https://docs.mongodb.com/manual/core/replica-set-architectures) documentation.


## Overview

Three member [*replica sets*](https://docs.mongodb.com/manual/reference/glossary/#term-replica-set) provide enough
redundancy to survive most network partitions and other system
failures. These sets also have sufficient capacity for many distributed
read operations. Replica sets should always have an odd number of
members. This ensures that [elections](https://docs.mongodb.com/manual/core/replica-set-elections) will proceed smoothly. For more about
designing replica sets, see [the Replication overview](https://docs.mongodb.com/manual/replication).

The basic procedure is to start the [``mongod``](https://docs.mongodb.com/manual/reference/program/mongod/#bin.mongod) instances that
will become members of the replica set, configure the
replica set itself, and then add the [``mongod``](https://docs.mongodb.com/manual/reference/program/mongod/#bin.mongod) instances to it.


## Requirements

For production deployments, you should maintain as much separation between
members as possible by hosting the [``mongod``](https://docs.mongodb.com/manual/reference/program/mongod/#bin.mongod)
instances on separate machines. When using virtual machines for
production deployments, you should place each [``mongod``](https://docs.mongodb.com/manual/reference/program/mongod/#bin.mongod)
instance on a separate host server serviced by redundant power circuits
and redundant network paths.

Before you can deploy a replica set, you must install MongoDB on
each system that will be part of your [*replica set*](https://docs.mongodb.com/manual/reference/glossary/#term-replica-set).
If you have not already installed MongoDB, see the [installation tutorials](https://docs.mongodb.com/manual/installation/#tutorial-installation).

Before creating your replica set, you should verify that your network
configuration allows communication among all members; i.e. each member
must be able to connect to every other member. For instructions on how
to check your connection, see
[Test Connections Between all Members](https://docs.mongodb.com/manual/tutorial/troubleshoot-replica-sets/#replica-set-troubleshooting-check-connection).

<span id="considerations-when-deploying-rs"></span>


## Considerations When Deploying a Replica Set


### Architecture

In a production, deploy each member of the replica set to its own machine
and if possible bind to the standard MongoDB port of ``27017``. Use the
``bind_ip`` option to ensure that MongoDB listens for connections
from applications on configured addresses.

See [Replica Set Deployment Architectures](https://docs.mongodb.com/manual/core/replica-set-architectures) for more information.


### Connectivity

Ensure that network traffic can pass between all members of the set
and all clients in the network securely and efficiently. Consider the
following:

* Establish a virtual private network. Ensure that your network topology routes all traffic between members within a single site over the local area network.

* Configure access control to prevent connections from unknown clients to the replica set.

* Configure networking and firewall rules so that incoming and outgoing packets are permitted only on the default MongoDB port and only from within your deployment.

Finally ensure that each member of a replica set is accessible by
way of resolvable DNS or hostnames. You should either configure your
DNS names appropriately or set up your systems' ``/etc/hosts`` file to
reflect this configuration.


### Configuration

Specify the run time configuration on each system in a [configuration
file](https://docs.mongodb.com/manual/reference/configuration-options) stored in ``/etc/mongod.conf``
or a related location. Create the directory where MongoDB stores data
files before deploying MongoDB.

For more information about the run time options used above and other
configuration options, see [Configuration File Options](https://docs.mongodb.com/manual/reference/configuration-options).


## Procedure

The following procedure outlines the steps to deploy a replica set when
access control is disabled.


### Step 1: Start each member of the replica set with the appropriate options.

For each member, start a [``mongod``](https://docs.mongodb.com/manual/reference/program/mongod/#bin.mongod) and specify the replica set
name through the ``replSet`` option. Specify any other parameters
specific to your deployment. For replication-specific parameters, see
[Replication Options](https://docs.mongodb.com/manual/reference/program/mongod/#cli-mongod-replica-set).

If your application connects to more than one replica set, each set
should have a distinct name. Some drivers group replica set
connections by replica set name.

The following example specifies the replica set name through the
[``--replSet``](https://docs.mongodb.com/manual/reference/program/mongod/#cmdoption-replset) command-line option:

```sh

mongod --replSet "rs0"

```

You can also specify the [``replica set name``](https://docs.mongodb.com/manual/reference/configuration-options/#replication.replSetName) in a [configuration file](https://docs.mongodb.com/manual/reference/configuration-options). To start [``mongod``](https://docs.mongodb.com/manual/reference/program/mongod/#bin.mongod)
with a configuration file, specify the configuration file's path with
the ``--config`` option:

```sh

mongod --config <path-to-config>

```

In production deployments, you can configure a [*init script*](https://docs.mongodb.com/manual/reference/glossary/#term-init-script) to
manage this process. Init scripts are beyond the scope of this document.


### Step 2: Connect a [``mongo``](https://docs.mongodb.com/manual/reference/program/mongo/#bin.mongo) shell to a replica set member.

For example, to connect to a [``mongod``](https://docs.mongodb.com/manual/reference/program/mongod/#bin.mongod) running on localhost on
the default port of ``27017``, simply issue:

```sh

mongo

```


### Step 3: Initiate the replica set.

Use [``rs.initiate()``](https://docs.mongodb.com/manual/reference/method/rs.initiate/#rs.initiate) on *one and only one* member of the replica set:

```javascript

rs.initiate( {
   _id : "rs0",
   members: [ { _id : 0, host : "mongodb0.example.net:27017" } ]
})

```

MongoDB initiates a set that consists of the current member and that
uses the default replica set configuration.


### Step 4: Verify the initial replica set configuration.

Use [``rs.conf()``](https://docs.mongodb.com/manual/reference/method/rs.conf/#rs.conf) to display the [replica set configuration
object](https://docs.mongodb.com/manual/reference/replica-configuration):

```javascript

rs.conf()

```

The replica set configuration object resembles the following:

```javascript

{
   "_id" : "rs0",
   "version" : 1,
   "protocolVersion" : NumberLong(1),
   "members" : [
      {
         "_id" : 0,
         "host" : "mongodb0.example.net:27017",
         "arbiterOnly" : false,
         "buildIndexes" : true,
         "hidden" : false,
         "priority" : 1,
         "tags" : {

         },
         "slaveDelay" : NumberLong(0),
         "votes" : 1
      }
   ],
   "settings" : {
      "chainingAllowed" : true,
      "heartbeatIntervalMillis" : 2000,
      "heartbeatTimeoutSecs" : 10,
      "electionTimeoutMillis" : 10000,
      "catchUpTimeoutMillis" : 2000,
      "getLastErrorModes" : {

      },
      "getLastErrorDefaults" : {
         "w" : 1,
         "wtimeout" : 0
      },
      "replicaSetId" : ObjectId("585ab9df685f726db2c6a840")
   }
}

```


### Step 5: Add the remaining members to the replica set.

Add the remaining members with the [``rs.add()``](https://docs.mongodb.com/manual/reference/method/rs.add/#rs.add) method. You must be
connected to the [*primary*](https://docs.mongodb.com/manual/reference/glossary/#term-primary) to add members to a replica set.

[``rs.add()``](https://docs.mongodb.com/manual/reference/method/rs.add/#rs.add) can, in some cases, trigger an election.
If the [*mongod*](https://docs.mongodb.com/manual/reference/glossary/#term-mongod) you are connected to becomes a [*secondary*](https://docs.mongodb.com/manual/reference/glossary/#term-secondary), you
need to connect the [*mongo*](https://docs.mongodb.com/manual/reference/glossary/#term-mongo) shell to the new primary to
continue adding new replica set members.
Use [``rs.status()``](https://docs.mongodb.com/manual/reference/method/rs.status/#rs.status) to identify the primary in the replica set.

The following example adds two members:

```javascript

rs.add("mongodb1.example.net")
rs.add("mongodb2.example.net")

```

When complete, you have a fully functional replica set. The new replica
set will elect a [*primary*](https://docs.mongodb.com/manual/reference/glossary/#term-primary).


### Step 6: Check the status of the replica set.

Use the [``rs.status()``](https://docs.mongodb.com/manual/reference/method/rs.status/#rs.status) operation:

```javascript

rs.status()

```

See also: [Deploy Replica Set With Keyfile Access Control](https://docs.mongodb.com/manual/tutorial/deploy-replica-set-with-keyfile-access-control/#deploy-repl-set-with-auth)
