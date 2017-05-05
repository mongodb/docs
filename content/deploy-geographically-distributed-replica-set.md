+++
title = "Deploy a Geographically Redundant Replica Set"

tags = [
"mongodb",
"administration",
"replication",
"beginner" ]
+++

# Deploy a Geographically Redundant Replica Set


## Overview

This tutorial outlines the process for deploying a [*replica set*](https://docs.mongodb.com/manual/reference/glossary/#term-replica-set)
with [members in multiple locations](https://docs.mongodb.com/manual/core/replica-set-architecture-geographically-distributed). The
tutorial addresses three-member replica sets and five-member replica
sets. If you have an even number of replica set members, add an arbiter
to deploy an odd number replica set.

For more information on distributed replica sets, see
[Replica Sets Distributed Across Two or More Data Centers](https://docs.mongodb.com/manual/core/replica-set-architecture-geographically-distributed). See
also [Replica Set Deployment Architectures](https://docs.mongodb.com/manual/core/replica-set-architectures) and see [Replication](https://docs.mongodb.com/manual/replication).


## Considerations


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


### Distribution of the Members

If possible, use an odd number of data centers, and choose a
distribution of members that maximizes the likelihood that even with a
loss of a data center, the remaining replica set members can form a
majority or at minimum, provide a copy of your data.


### Voting Members

Never deploy more than seven voting members.


## Prerequisites

For all configurations in this tutorial, deploy each replica set member
on a separate system. Although you may deploy more than one replica set member on a
single system, doing so reduces the redundancy and capacity
of the replica set. Such deployments are typically for testing
purposes.

This tutorial assumes you have installed MongoDB on each system that
will be part of your replica set. If you have not already installed
MongoDB, see the [installation tutorials](https://docs.mongodb.com/manual/installation/#tutorial-installation).


## Procedures

<span id="replica-set-deploy-distributed-three-member"></span>


### Deploy a Geographically Redundant Three-Member Replica Set

For a geographically redundant three-member replica set deployment, you
must decide how to distribute your system. Some possible distributions
for the three members are:

* Across Three Data Centers: One members to each site.

* Across Two Data Centers: Two members to Site A and one member to Site B. If one of the members of the replica set is an arbiter, distribute the arbiter to Site A with a data-bearing member.


#### Step 1: Start each member of the replica set with the appropriate options.

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


#### Step 2: Connect a [``mongo``](https://docs.mongodb.com/manual/reference/program/mongo/#bin.mongo) shell to a replica set member.

For example, to connect to a [``mongod``](https://docs.mongodb.com/manual/reference/program/mongod/#bin.mongod) running on localhost on
the default port of ``27017``, simply issue:

```sh

mongo

```


#### Step 3: Initiate the replica set.

Use [``rs.initiate()``](https://docs.mongodb.com/manual/reference/method/rs.initiate/#rs.initiate) on *one and only one* member of the replica set:

```javascript

rs.initiate( {
   _id : "rs0",
   members: [ { _id : 0, host : "mongodb0.example.net:27017" } ]
})

```

MongoDB initiates a set that consists of the current member and that
uses the default replica set configuration.


#### Step 4: Verify the initial replica set configuration.

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


#### Step 5: Add the remaining members to the replica set.

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


#### Step 6: Optional. Configure the member eligibility for becoming primary.

In some cases, you may prefer that the members in one data center be
elected primary before the members in the other data centers. You can
modify the [``priority``](https://docs.mongodb.com/manual/reference/replica-configuration/#rsconf.members[n].priority) of the members such that the
members in the one data center has higher
[``priority``](https://docs.mongodb.com/manual/reference/replica-configuration/#rsconf.members[n].priority) than the members in the other data
centers.

Some members of the replica set, such as members that have networking
restraint or limited resources, should not be able to become primary
in a [*failover*](https://docs.mongodb.com/manual/reference/glossary/#term-failover). Configure members that should not become
primary to have [priority 0](https://docs.mongodb.com/manual/core/replica-set-priority-0-member/#replica-set-secondary-only-members).

For example, to lower the relative eligibility of the the member
located in one of the sites (in this example,
``mongodb2.example.net``), set the member's priority to ``0.5``.

1. View the replica set configuration to determine the [``members``](https://docs.mongodb.com/manual/reference/replica-configuration/#rsconf.members) array position for the member. Keep in mind the array position is not the same as the ``_id``:

   ```javascript

   rs.conf()

   ```

2. Copy the replica set configuration object to a variable (to ``cfg`` in the example below). Then, in the variable, set the correct priority for the member. Then pass the variable to [``rs.reconfig()``](https://docs.mongodb.com/manual/reference/method/rs.reconfig/#rs.reconfig) to update the replica set configuration.

   For example, to set priority for the third member in the array (i.e.,
   the member at position 2), issue the following sequence of commands:

   ```javascript

   cfg = rs.conf()
   cfg.members[2].priority = 0.5
   rs.reconfig(cfg)

   ```

   Note: The [``rs.reconfig()``](https://docs.mongodb.com/manual/reference/method/rs.reconfig/#rs.reconfig) shell method can force the current primary to step down, causing an election. When the primary steps down, all clients will disconnect. This is the intended behavior. While most elections complete within a minute, always make sure any replica configuration changes occur during scheduled maintenance periods.

After these commands return, you have a geographically redundant
three-member replica set.


#### Step 7: Check the status of the replica set.

Use the [``rs.status()``](https://docs.mongodb.com/manual/reference/method/rs.status/#rs.status) operation:

```javascript

rs.status()

```


### Deploy a Geographically Redundant Five-Member Replica Set

For a geographically redundant five-member replica set deployment, you
must decide how to distribute your system. Some possible distributions
for the five members are:

* Across Three Data Centers: Two members in Site A, two members in Site B, one member in Site C.

* Across Four Data Centers: Two members in one site, and one member in the other three sites.

* Across Five Data Centers: One members in each site.

* Across Two Data Centers: Three members in Site A and two members in Site B.

The following five-member replica set includes an arbiter.


#### Step 1: Start each member of the replica set with the appropriate options.

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


#### Step 2: Connect a [``mongo``](https://docs.mongodb.com/manual/reference/program/mongo/#bin.mongo) shell to a replica set member.

For example, to connect to a [``mongod``](https://docs.mongodb.com/manual/reference/program/mongod/#bin.mongod) running on localhost on
the default port of ``27017``, simply issue:

```sh

mongo

```


#### Step 3: Initiate the replica set.

Use [``rs.initiate()``](https://docs.mongodb.com/manual/reference/method/rs.initiate/#rs.initiate) on *one and only one* member of the replica set:

```javascript

rs.initiate( {
   _id : "rs0",
   members: [ { _id : 0, host : "mongodb0.example.net:27017" } ]
})

```

MongoDB initiates a set that consists of the current member and that
uses the default replica set configuration.


#### Step 4: Verify the initial replica set configuration.

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


#### Step 5: Add the remaining secondary members to the replica set.

Use [``rs.add()``](https://docs.mongodb.com/manual/reference/method/rs.add/#rs.add) in a [``mongo``](https://docs.mongodb.com/manual/reference/program/mongo/#bin.mongo) shell connected to the
current primary. The commands should resemble the following:

```javascript

rs.add("mongodb1.example.net")
rs.add("mongodb2.example.net")
rs.add("mongodb3.example.net")

```

When complete, you should have a fully functional replica set. The new
replica set will elect a [*primary*](https://docs.mongodb.com/manual/reference/glossary/#term-primary).


#### Step 6: Add the arbiter.

In the same shell session, issue the following command to add the
arbiter (e.g. ``mongodb4.example.net``):

```javascript

rs.addArb("mongodb4.example.net")

```

For replica sets with an arbiter, replica set protocol version 1
(``pv1``) increases the likelihood of rollback of [``w:1``](https://docs.mongodb.com/manual/reference/write-concern/#writeconcern.<number>) writes compared to replica set protocol version 0
(``pv0``). See [Replica Set Protocol Versions](https://docs.mongodb.com/manual/reference/replica-set-protocol-versions).


#### Step 7: Optional. Configure the member eligibility for becoming primary.

In some cases, you may prefer that the members in one data center be
elected primary before the members in the other data centers. You can
modify the [``priority``](https://docs.mongodb.com/manual/reference/replica-configuration/#rsconf.members[n].priority) of the members such that the
members in the one data center has higher
[``priority``](https://docs.mongodb.com/manual/reference/replica-configuration/#rsconf.members[n].priority) than the members in the other data
centers.

Some members of the replica set, such as members that have networking
restraint or limited resources, should not be able to become primary
in a [*failover*](https://docs.mongodb.com/manual/reference/glossary/#term-failover). Configure members that should not become
primary to have [priority 0](https://docs.mongodb.com/manual/core/replica-set-priority-0-member/#replica-set-secondary-only-members).

For example, to lower the relative eligibility of the the member
located in one of the sites (in this example,
``mongodb2.example.net``), set the member's priority to ``0.5``.

1. View the replica set configuration to determine the [``members``](https://docs.mongodb.com/manual/reference/replica-configuration/#rsconf.members) array position for the member. Keep in mind the array position is not the same as the ``_id``:

   ```javascript

   rs.conf()

   ```

2. Copy the replica set configuration object to a variable (to ``cfg`` in the example below). Then, in the variable, set the correct priority for the member. Then pass the variable to [``rs.reconfig()``](https://docs.mongodb.com/manual/reference/method/rs.reconfig/#rs.reconfig) to update the replica set configuration.

   For example, to set priority for the third member in the array (i.e.,
   the member at position 2), issue the following sequence of commands:

   ```javascript

   cfg = rs.conf()
   cfg.members[2].priority = 0.5
   rs.reconfig(cfg)

   ```

   Note: The [``rs.reconfig()``](https://docs.mongodb.com/manual/reference/method/rs.reconfig/#rs.reconfig) shell method can force the current primary to step down, causing an election. When the primary steps down, all clients will disconnect. This is the intended behavior. While most elections complete within a minute, always make sure any replica configuration changes occur during scheduled maintenance periods.

After these commands return, you have a geographically redundant
five-member replica set.


#### Step 8: Check the status of the replica set.

Use the [``rs.status()``](https://docs.mongodb.com/manual/reference/method/rs.status/#rs.status) operation:

```javascript

rs.status()

```
