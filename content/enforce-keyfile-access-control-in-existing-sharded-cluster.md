+++
title = "Enforce Keyfile Access Control in Sharded Cluster"

[tags]
+++
# Enforce Keyfile Access Control in Sharded Cluster


# On this page

* [Overview](#overview) 

  * [CloudManager and OpsManager](#cloudmanager-and-opsmanager) 

* [Considerations](#considerations) 

  * [Operating System](#operating-system) 

  * [Keyfile Security](#keyfile-security) 

  * [Access Control](#access-control) 

  * [Users](#users) 

  * [Downtime](#downtime) 

* [Procedures](#procedures) 

  * [Enforce Keyfile Internal Authentication on Existing Sharded Cluster Deployment](#enforce-keyfile-internal-authentication-on-existing-sharded-cluster-deployment) 

* [x.509 Internal Authentication](#x-509-internal-authentication) 


## Overview

Enforcing access control on a [*sharded cluster*](#term-sharded-cluster) requires configuring:

* Security between components of the cluster using [Internal Authentication](#). 

* Security between connecting clients and the cluster using [Role-Based Access Control](#). 

For this tutorial, each member of the sharded cluster *must* use the same
internal authentication mechanism and settings. This means enforcing internal
authentication on each [``mongos``](#bin.mongos) and [``mongod``](#bin.mongod) in the cluster.

The following tutorial uses a [keyfile](#internal-auth-keyfile) to
enable internal authentication.

Enforcing internal authentication also enforces user access control. To
connect to the replica set, clients like the [``mongo``](#bin.mongo) shell need to
use a [user account](#). See
[Access Control](#security-shardclust-enforce-access-control).


### CloudManager and OpsManager

If Cloud Manager or Ops Manager is managing your deployment, internal
authentication is automatically enforced.

To configure Access Control on a
managed deployment, see: ``Configure Access Control for MongoDB Deployments``
in the [Cloud Manager manual](https://docs.cloudmanager.mongodb.com/tutorial/edit-host-authentication-credentials)
or in the [Ops Manager manual](https://docs.opsmanager.mongodb.com/current/tutorial/edit-host-authentication-credentials).


## Considerations


### Operating System

This tutorial primarily refers to the [``mongod``](#bin.mongod) process.
Windows users should use the [``mongod.exe``](#bin.mongod.exe) program instead.


### Keyfile Security

Keyfiles are bare-minimum forms of security and are best suited for testing or
development environments. For production environments we recommend using
[x.509 certificates](#).


### Access Control

This tutorial covers creating the minimum number of administrative
users on the ``admin`` database *only*. For the user authentication,
the tutorial uses the default [SCRAM-SHA-1](#)
authentication mechanism. Challenge-response security mechanisms are
are best suited for testing or development environments. For production
environments, we recommend using [x.509
certificates](#) or [LDAP Proxy Authentication](#)
(available for MongoDB Enterprise only) or [Kerberos Authentication](#)
(available for MongoDB Enterprise only).

For details on creating users for specific authentication mechanism,
refer to the specific authentication mechanism pages.

See [Configure Role-Based Access Control](#security-checklist-role-based-access-control) for best
practices for user creation and management.


### Users

In general, to create users for a sharded clusters, connect to the
[``mongos``](#bin.mongos) and add the sharded cluster users.

However, some maintenance operations require direct connections to
specific shards in a sharded cluster. To perform these operations, you
must connect directly to the shard and authenticate as a shard-local
administrative user.

Shard-local users exist only in the specific shard and should only be
used for shard-specific maintenance and configuration. You cannot
connect to the [``mongos``](#bin.mongos) with shard-local users.

See the [Users](#) security documentation for more
information.


### Downtime

Upgrading a sharded cluster to enforce access control requires downtime.


## Procedures


### Enforce Keyfile Internal Authentication on Existing Sharded Cluster Deployment


#### Step 1: Create a keyfile.

The contents of the [keyfile](#internal-auth-keyfile) serves as
the shared password for the members of the sharded cluster. The
content of the keyfile must be the same for all members of the
sharded cluster.

You can generate a keyfile using any method you choose. The contents
of the keyfile must be between 6 and 1024 characters long.

Note: On UNIX systems, the keyfile must not have group or world permissions. On Windows systems, keyfile permissions are not checked. 

The following operation uses ``openssl`` to generate a complex
pseudo-random 1024 character string to use for a keyfile. It then
uses ``chmod`` to change file permissions to provide read permissions
for the file owner only:

```sh

openssl rand -base64 756 > <path-to-keyfile>
chmod 400 <path-to-keyfile>

```

See [Keyfiles](#internal-auth-keyfile) for additional details  and requirements
for using keyfiles.


#### Step 2: Copy the keyfile to each component in the sharded cluster.

Every server hosting a [``mongod``](#bin.mongod) or [``mongos``](#bin.mongos) component
of the sharded cluster must contain a copy of the keyfile.

Copy the keyfile to each server hosting the sharded cluster members. Use a
consistent location for each server.

Important: Do not use shared network locations or storage mediums such as USB drives for storing the keyfile. 

Ensure that the user running the [``mongod``](#bin.mongod) or [``mongos``](#bin.mongos) instances can access the keyfile.


#### Step 3: Disable the Balancer.

Connect a [``mongo``](#bin.mongo) shell to a [``mongos``](#bin.mongos).

```sh

sh.stopBalancer()

```

The balancer may not stop immediately if a migration is in progress.
The [``sh.stopBalancer()``](#sh.stopBalancer) method blocks the shell until the
balancer stops.

Use [``sh.getBalancerState()``](#sh.getBalancerState) to verify that the balancer has
stopped.

```sh

sh.getBalancerState()

```

Important: Do not proceed until the balancer has stopped running. 

See [Manage Sharded Cluster Balancer](#) for tutorials on
configuring sharded cluster balancer behavior.


#### Step 4: Shut down all [``mongos``](#bin.mongos) instances for the sharded cluster.

Connect a [``mongo``](#bin.mongo) shell to each [``mongos``](#bin.mongos) and shut
them down.

Use the [``db.shutdownServer()``](#db.shutdownServer) method on the ``admin`` database
to safely shut down the [``mongod``](#bin.mongod):

```sh

db.getSiblingDB("admin").shutdownServer()

```

Repeat until all [``mongos``](#bin.mongos) instances in the cluster
are offline.

Once this step is complete, all [``mongos``](#bin.mongos) instances in the cluster
should be offline.


#### Step 5: Shut down config server [``mongod``](#bin.mongod) instances.

Connect a [``mongo``](#bin.mongo) shell to each [``mongod``](#bin.mongod) in the
config server deployment and shut them down.

For replica set config server deployments, shut down the [*primary*](#term-primary)
member last.

Use the [``db.shutdownServer()``](#db.shutdownServer) method on the ``admin`` database
to safely shut down the [``mongod``](#bin.mongod):

```sh

db.getSiblingDB("admin").shutdownServer()

```

Repeat until all config servers are offline.


#### Step 6: Shut down shard replica set [``mongod``](#bin.mongod) instances.

For each shard replica set, connect a [``mongo``](#bin.mongo) shell to each
[``mongod``](#bin.mongod) member in the replica set and shut them down. Shut down
the [*primary*](#term-primary) member last.

Use the [``db.shutdownServer()``](#db.shutdownServer) method on the ``admin`` database
to safely shut down the [``mongod``](#bin.mongod):

```sh

db.getSiblingDB("admin").shutdownServer()

```

Repeat this step for each shard replica set until all [``mongod``](#bin.mongod)
instances in all shard replica sets are offline.

Once this step is complete, the entire sharded cluster should be offline.


#### Step 7: Enforce Access Control on the Config Servers.

Start *each* [``mongod``](#bin.mongod) in the config server replica set.
Include the ``keyFile`` setting. The ``keyFile`` setting enforces
both [Internal Authentication](#) and
[Role-Based Access Control](#).

You can specify the [``mongod``](#bin.mongod) settings either via a
configuration file or the command line.

**Configuration File**

If using a configuration file, for a config server replica set,
set [``security.keyFile``](#security.keyFile) to the keyfile's path,
[``sharding.clusterRole``](#sharding.clusterRole) to ``configsvr``, and
[``replication.replSetName``](#replication.replSetName) to the name of the config
server replica set.

```yaml

security:
  keyFile: <path-to-keyfile>
sharding:
  clusterRole: configsvr
replication:
  replSetName: <setname>
storage:
   dbpath: <path>

```

Include additional settings as appropriate to your deployment.
For more information on the configuration file, see
[configuration options](#).

Start the [``mongod``](#bin.mongod) specifying the ``--config`` option and the
path to the configuration file.

```shell

mongod --config <path-to-config>

```

**Command Line**

If using the command line parameters, for a config server replica
set, start the [``mongod``](#bin.mongod) with the ``-keyFile``,
``--configsvr``, and ``--replSet`` parameters.

```sh

mongod --keyFile <path-to-keyfile> --configsvr --replSet <setname> --dbpath <path>

```

For more information on startup parameters,
see the [``mongod``](#bin.mongod) reference page.

Make sure to use the original replica set name when restarting each
member. You cannot change the name of a replica set.


#### Step 8: Enforce Access Control for each Shard in the Sharded Cluster.

Running a [``mongod``](#bin.mongod) with the ``keyFile`` parameter enforces both
[Internal Authentication](#) and
[Role-Based Access Control](#).

Start *each* [``mongod``](#bin.mongod) in the replica set using either
a configuration file or the command line.

**Configuration File**

If using a configuration file, set the [``security.keyFile``](#security.keyFile) option
to the keyfile's path and the [``replication.replSetName``](#replication.replSetName) option
to the *original* name of the replica set.

```yaml

security:
  keyFile: <path-to-keyfile>
replication:
  replSetName: <setname>
storage:
   dbPath: <path>

```

Include any other options as appropriate for your deployment. See
[Configuration File Options](#) for settings available.

Start the [``mongod``](#bin.mongod) specifying the ``--config`` option and the
path to the configuration file.

```shell

mongod --config <path-to-config-file>

```

**Command Line**

If using the command line parameters, start the [``mongod``](#bin.mongod) and
specify the ``--keyFile`` and ``--replSet`` parameters.

```sh

mongod --keyfile <path-to-keyfile> --replSet <setname> --dbpath <path>

```

For more information on startup parameters,
see the [``mongod``](#bin.mongod) reference page.

Make sure to use the original replica set name when restarting each
member. You cannot change the name of a replica set.

Repeat this step until all shards in the cluster are online.


#### Step 9: Create a Shard-Local User Administrator (Optional).

Important: The [Localhost Exception](#localhost-exception) allows clients connected over the localhost interface to create users on a [``mongod``](#bin.mongod) enforcing access control. After creating the first user, the [Localhost Exception](#localhost-exception) closes.The first user must have privileges to create other users, such as a user with the [``userAdminAnyDatabase``](#userAdminAnyDatabase). This ensures that you can create additional users after the [Localhost Exception](#localhost-exception) closes.If at least one user does *not* have privileges to create users, once the localhost exception closes you may be unable to create or modify users with new privileges, and therefore unable to access certain functions or operations. 

For each shard replica set in the cluster, connect a [``mongo``](#bin.mongo)
shell to the [*primary*](#term-primary) member over the [localhost
interface](#localhost-exception). You must run the [``mongo``](#bin.mongo) on
the same machine as the target [``mongod``](#bin.mongod) to use the localhost
interface.

Create a user with the ``userAdminAnyDatabase``
role on the ``admin`` database. This user can create
additional users for the shard replica set as necessary.
Creating this user also closes the [Localhost Exception](#localhost-exception).

The following example creates the shard-local user ``fred`` on the
``admin`` database.

Important: Passwords should be random, long, and complex to ensure system security and to prevent or delay malicious access. 

```javascript

admin = db.getSiblingDB("admin")
admin.createUser(
  {
    user: "fred",
    pwd: "changeme1",
    roles: [ { role: "userAdminAnyDatabase", db: "admin" } ]
  }
)

```


#### Step 10: Enforce Access Control for the [``mongos``](#bin.mongos) servers.

Running a [``mongod``](#bin.mongod) with the ``keyFile`` parameter enforces both
[Internal Authentication](#) and
[Role-Based Access Control](#).

Start *each* [``mongos``](#bin.mongos) in the replica set using either
a configuration file or the command line.

**Configuration File**

If using a configuration file, set the [``security.keyFile``](#security.keyFile)
to the keyfile`s path and the [``sharding.configDB``](#sharding.configDB) to
the replica set name and at least one member of the replica
set in ``<replSetName>/<host:port>`` format.

```yaml

security:
  keyFile: <path-to-keyfile>
sharding:
  configDB: <configReplSetName>/cfg1.example.net:27017,cfg2.example.net:27017,...

```

Start the [``mongos``](#bin.mongos) specifying the ``--config`` option and the
path to the configuration file.

```shell

mongos --config <path-to-config-file>

```

For more information on the configuration file, see
[configuration options](#).

**Command Line**

If using command line parameters start the [``mongos``](#bin.mongos) and specify
the ``--keyFile`` and ``--configdb`` parameters.

```sh

mongos --keyFile <path-to-keyfile> --configdb <configReplSetName>/cfg1.example.net:27017,cfg2.example.net:27017,...

```

Include any other options as appropriate for your deployment.

At this point, the entire sharded cluster is back online and can
communicate internally using the keyfile specified. However, external
programs like the [``mongo``](#bin.mongo) shell need to use a correctly
provisioned user in order to read or write to the cluster.


#### Step 11: Connect to the [``mongos``](#bin.mongos) instance over the localhost interface.

Connect a [``mongo``](#bin.mongo) shell to one of the config server
[``mongos``](#bin.mongos) instances over the [localhost
interface](#localhost-exception). You must run the [``mongo``](#bin.mongo)
shell on the same physical machine as the [``mongod``](#bin.mongod) instance.

The [localhost interface](#localhost-exception) is only available
since no users have been created for the deployment. The
[localhost interface](#localhost-exception) closes after the
creation of the first user.


#### Step 12: Create the user administrator.

Important: After you create the first user, the [localhost exception](#localhost-exception) is no longer available.The first user must have privileges to create other users, such as a user with the [``userAdminAnyDatabase``](#userAdminAnyDatabase). This ensures that you can create additional users after the [Localhost Exception](#localhost-exception) closes.If at least one user does *not* have privileges to create users, once the localhost exception closes you cannot create or modify users, and therefore may be unable to perform necessary operations. 

Add a user using the [``db.createUser()``](#db.createUser) method. The user should
have at minimum the [``userAdminAnyDatabase``](#userAdminAnyDatabase) role on the
``admin`` database.

Important: Passwords should be random, long, and complex to ensure system security and to prevent or delay malicious access. 

The following example creates the user ``fred`` on the
``admin`` database:

```javascript

admin = db.getSiblingDB("admin")
admin.createUser(
  {
    user: "fred",
    pwd: "changeme1",
    roles: [ { role: "userAdminAnyDatabase", db: "admin" } ]
  }
)

```

See [Database User Roles](#database-user-roles) for a full list of built-in roles and
related to database administration operations.


#### Step 13: Authenticate as the user administrator.

Use [``db.auth()``](#db.auth) to authenticate as the user administrator
to create additional users:

```javascript

db.getSiblingDB("admin").auth("fred", "changeme1" )

```

Alternatively, connect a new [``mongo``](#bin.mongo) shell to the target
replica set member using the ``-u <username>``, ``-p <password>``, and
the ``--authenticationDatabase admin`` parameters. You must use
the [Localhost Exception](#localhost-exception) to connect to the [``mongos``](#bin.mongos).

```sh

mongo -u "fred" -p "changeme1" --authenticationDatabase "admin"

```


#### Step 14: Create Administrative User for Cluster Management

The cluster administrator user has the [``clusterAdmin``](#clusterAdmin) role
for the sharded cluster and *not* the shard-local cluster
administrator.

The following example creates the user ``ravi`` on the ``admin``
database.

Important: Passwords should be random, long, and complex to ensure system security and to prevent or delay malicious access. 

```sh

db.getSiblingDB("admin").createUser(
  {
    "user" : "ravi",
    "pwd" : "changeme2",
    roles: [ { "role" : "clusterAdmin", "db" : "admin" } ]
  }
)

```

See [Cluster Administration Roles](#cluster-admin-roles) for a full list of built-in roles related to
replica set and sharded cluster operations.


#### Step 15: Authenticate as cluster admin.

To perform sharding operations, authenticate as a
[``clusterAdmin``](#clusterAdmin) user with either the
[``db.auth()``](#db.auth) method or a new [``mongo``](#bin.mongo) shell with the
``username``, ``password``, and ``authenticationDatabase`` parameters.

Note: This is the cluster administrator for the sharded cluster and *not* the shard-local cluster administrator. 


#### Step 16: Start the balancer.

Start the balancer.

```javascript

sh.startBalancer()

```

Use the [``sh.getBalancerState()``](#sh.getBalancerState) to verify the balancer has started.

See [Manage Sharded Cluster Balancer](#) for tutorials on
the sharded cluster balancer.


#### Step 17: Create additional users (Optional).

Create users to allow clients to connect and access the
sharded cluster. See [Database User Roles](#database-user-roles) for available built-in
roles, such as [``read``](#read) and [``readWrite``](#readWrite).
You may also want additional administrative users.
For more information on users, see [Users](#).

To create additional users, you must authenticate as a user with
[``userAdminAnyDatabase``](#userAdminAnyDatabase) or [``userAdmin``](#userAdmin) roles.


## x.509 Internal Authentication

For details on using x.509 for internal authentication, see
[Use x.509 Certificate for Membership Authentication](#).

To upgrade from keyfile internal authentication to x.509 internal
authentication, see
[Upgrade from Keyfile Authentication to x.509 Authentication](#).

See also: [Sharded Cluster Components](#) 

  [Operational Restrictions in Sharded Clusters](#)
