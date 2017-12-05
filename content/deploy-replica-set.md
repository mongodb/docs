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
[Deploy New Replica Set With Keyfile Access Control](https://docs.mongodb.com/manual/tutorial/deploy-replica-set-with-keyfile-access-control/#deploy-repl-set-with-auth). If you wish to deploy a
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

<span id="considerations-when-deploying-rs"></span>


## Considerations When Deploying a Replica Set


### Architecture

In production, deploy each member of the replica set to its own machine
and if possible bind to the standard MongoDB port of ``27017``.

See [Replica Set Deployment Architectures](https://docs.mongodb.com/manual/core/replica-set-architectures) for more information.


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


### Connectivity

Ensure that network traffic can pass securely between all members of the set and
all clients in the network .

Consider the following:

* Establish a virtual private network. Ensure that your network topology routes all traffic between members within a single site over the local area network.

* Configure access control to prevent connections from unknown clients to the replica set.

* Configure networking and firewall rules so that incoming and outgoing packets are permitted only on the default MongoDB port and only from within your deployment. See the IP Binding considerations.

Ensure that each member of a replica set is accessible by
way of resolvable DNS or hostnames. You should either configure your
DNS names appropriately or set up your systems' ``/etc/hosts`` file to
reflect this configuration.

Each member must be able to connect to every other member. For
instructions on how to check your connection, see
[Test Connections Between all Members](https://docs.mongodb.com/manual/tutorial/troubleshoot-replica-sets/#replica-set-troubleshooting-check-connection).


### Configuration

Create the directory where MongoDB stores data files before deploying
MongoDB.

Specify the [``mongod``](https://docs.mongodb.com/manual/reference/program/mongod/#bin.mongod) configuration in a [configuration
file](https://docs.mongodb.com/manual/reference/configuration-options) stored in ``/etc/mongod.conf``
or a related location.

For more information about configuration options, see
[Configuration File Options](https://docs.mongodb.com/manual/reference/configuration-options).


## Procedure

The following procedure outlines the steps to deploy a replica set when
access control is disabled.


### Step 1: Start each member of the replica set with the appropriate options.

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


### Step 2: Connect a [``mongo``](https://docs.mongodb.com/manual/reference/program/mongo/#bin.mongo) shell to one of the ``mongod`` instances.

From the same machine where one of the [``mongod``](https://docs.mongodb.com/manual/reference/program/mongod/#bin.mongod) is running
(in this tutorial, ``mongodb0.example.net``), start the [``mongo``](https://docs.mongodb.com/manual/reference/program/mongo/#bin.mongo)
shell. To connect to the [``mongod``](https://docs.mongodb.com/manual/reference/program/mongod/#bin.mongod) listening to localhost on
the default port of ``27017``, simply issue:

```sh

mongo

```

Depending on your path, you may need to specify the path to the
[``mongo``](https://docs.mongodb.com/manual/reference/program/mongo/#bin.mongo) binary.


### Step 3: Initiate the replica set.

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


### Step 4: View the replica set configuration.

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
      },
      {
         "_id" : 1,
         "host" : "mongodb1.example.net:27017",
         "arbiterOnly" : false,
         "buildIndexes" : true,
         "hidden" : false,
         "priority" : 1,
         "tags" : {

         },
         "slaveDelay" : NumberLong(0),
         "votes" : 1
      },
      {
         "_id" : 2,
         "host" : "mongodb2.example.net:27017",
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
      "catchUpTimeoutMillis" : -1,
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


### Step 5: Ensure that the replica set has a primary.

Use [``rs.status()``](https://docs.mongodb.com/manual/reference/method/rs.status/#rs.status) to identify the primary in the replica set.

See also: [Deploy New Replica Set With Keyfile Access Control](https://docs.mongodb.com/manual/tutorial/deploy-replica-set-with-keyfile-access-control/#deploy-repl-set-with-auth)
