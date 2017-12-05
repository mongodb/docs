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


#### Step 4: View the replica set configuration.

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


#### Step 5: Optional. Configure the member eligibility for becoming primary.

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

For example, to lower the relative eligibility of the member
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


#### Step 6: Ensure that the replica set has a primary.

Use [``rs.status()``](https://docs.mongodb.com/manual/reference/method/rs.status/#rs.status) to identify the primary in the replica set.


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
| Member 3 | ``mongodb3.example.net`` |
| Member 4 | ``mongodb4.example.net`` |

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
      { _id: 2, host: "mongodb2.example.net:27017" },
      { _id: 3, host: "mongodb3.example.net:27017" },
      { _id: 4, host: "mongodb4.example.net:27017", arbiterOnly: true }
   ]
})

```

The last member is added as an [arbiter](https://docs.mongodb.com/manual/core/replica-set-arbiter).

For the following MongoDB versions, ``pv1`` increases the likelihood
of [``w:1``](https://docs.mongodb.com/manual/reference/write-concern/#writeconcern.<number>) rollbacks compared to ``pv0``
for replica sets with arbiters:

* MongoDB 3.4.1

* MongoDB 3.4.0

* MongoDB 3.2.11 or earlier

See [Replica Set Protocol Versions](https://docs.mongodb.com/manual/reference/replica-set-protocol-versions).


#### Step 4: View the replica set configuration.

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


#### Step 5: Optional. Configure the member eligibility for becoming primary.

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


#### Step 6: Ensure that the replica set has a primary.

Use [``rs.status()``](https://docs.mongodb.com/manual/reference/method/rs.status/#rs.status) to identify the primary in the replica set.
