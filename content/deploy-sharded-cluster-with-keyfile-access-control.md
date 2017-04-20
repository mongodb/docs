+++
title = "Deploy Sharded Cluster with Keyfile Access Control"

[tags]
mongodb = "product"
+++

## Overview

Enforcing access control on a [*sharded cluster*](#term-sharded-cluster) requires configuring:

* Security between components of the cluster using [Internal Authentication](#). 

* Security between connecting clients and the cluster using [User Access Controls](#). 

For this tutorial, each member of the sharded cluster *must* use the same
internal authentication mechanism and settings. This means enforcing internal
authentication on each [``mongos``](#bin.mongos) and [``mongod``](#bin.mongod) in the cluster.

The following tutorial uses a [keyfile](#internal-auth-keyfile) to
enable internal authentication.

Enforcing internal authentication also enforces user access control. To
connect to the replica set, clients like the [``mongo``](#bin.mongo) shell need to
use a [user account](#). See
[Access Control](#security-shardclust-deploy-access-control).


### CloudManager and OpsManager

If you are currently using or are planning to use Cloud Manager or
Ops Manager, consider using their built-in features for
deploying a [*sharded cluster*](#term-sharded-cluster) with access control enforced.

See ``Deploy a Sharded Cluster`` in the
[Cloud Manager manual](https://docs.cloudmanager.mongodb.com/tutorial/deploy-sharded-cluster) or in the
[Ops Manager manual](https://docs.opsmanager.mongodb.com/current/tutorial/deploy-sharded-cluster).

See ``Access Control for MongoDB Deployments`` in the
[Cloud Manager manual](https://docs.cloudmanager.mongodb.com/nav/security-enable-authentication) or in the
[Ops manager manual](https://docs.opsmanager.mongodb.com/current/nav/security-enable-authentication).


## Considerations


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

This tutorial requires creating sharded cluster users, but includes
optional steps for adding shard-local users.

See the [Users](#) security documentation for more
information.


### Operating System

This tutorial uses the [``mongod``](#bin.mongod) and [``mongos``](#bin.mongos)
programs. Windows users should use the [``mongod.exe``](#bin.mongod.exe) and
[``mongos.exe``](#bin.mongos.exe) programs instead.


## Deploy Sharded Cluster with Keyfile Access Control

The following procedures involve creating a new sharded cluster that consists
of a [``mongos``](#bin.mongos), the config servers, and two shards.


### Create the Keyfile

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

```shell

openssl rand -base64 756 > <path-to-keyfile>
chmod 400 <path-to-keyfile>

```

See [Keyfiles](#internal-auth-keyfile) for additional details  and requirements
for using keyfiles.


### Distribute the Keyfile

Copy the keyfile to each server hosting the sharded cluster members. Use a
consistent location for each server.

Important: Do not use shared network locations or storage mediums such as USB drives for storing the keyfile. 

Ensure that the user running the [``mongod``](#bin.mongod) or [``mongos``](#bin.mongos) instances can access the keyfile.


### Create the Config Server Replica Set

The following steps deploys a config server replica set.

For a production deployment, deploys a config server replica set with at
least three members. For testing purposes, you can create a
single-member replica set.


#### Step 1

Start *each* [``mongod``](#bin.mongod) in the config server replica set.
Include the ``keyFile`` setting. The ``keyFile`` setting
enforces both [Internal Authentication](#) and
[Role-Based Access Control](#).

You can specify the [``mongod``](#bin.mongod) settings either via a
configuration file or the command line.

**Configuration File**

If using a configuration file, set [``security.keyFile``](#security.keyFile) to the
keyfile's path, [``sharding.clusterRole``](#sharding.clusterRole) to ``configsvr``,
and [``replication.replSetName``](#replication.replSetName) to the desired name of the
config server replica set.

```yaml

security:
  keyFile: <path-to-keyfile>
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
the ``--keyFile``, ``--configsvr``, and ``--replSet`` parameters.

```sh

mongod --keyFile <path-to-keyfile> --configsvr --replSet <setname> --dbpath <path>

```

Include additional settings as appropriate to your deployment.
For more information on startup parameters, see the
[``mongod``](#bin.mongod) reference page.


#### Step 2: Connect to a member of the replica set over the localhost interface.

Connect a [``mongo``](#bin.mongo) shell to one of the config server
[``mongod``](#bin.mongod) instances over the [localhost
interface](#localhost-exception). You must run the [``mongo``](#bin.mongo)
shell on the same physical machine as the [``mongod``](#bin.mongod) instance.

The [localhost interface](#localhost-exception) is only available
since no users have been created for the deployment. The
[localhost interface](#localhost-exception) closes after the
creation of the first user.


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

These steps include optional procedures for adding shard-local users.
Executing them now ensures that there are users available for each
shard to perform shard-level maintenance.


#### Step 1: Enforce access control on each member of the replica set.

Running a [``mongod``](#bin.mongod) with the ``keyFile`` parameter enforces both
[Internal Authentication](#) and
[Role-Based Access Control](#).

Start *each* [``mongod``](#bin.mongod) in the replica set using either
a configuration file or the command line.

**Configuration File**

If using a configuration file, set the [``security.keyFile``](#security.keyFile) option
to the keyfile's path, the [``replication.replSetName``](#replication.replSetName) to the
desired name of the replica set, and the [``sharding.clusterRole``](#sharding.clusterRole)
option to ``shardsvr``.

```yaml

security:
  keyFile: <path-to-keyfile>
sharding:
  clusterRole: shardsvr
replication:
  replSetName: <replSetName>
storage:
   dbPath: <path>

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
the ``--keyFile``, ``replSet``, and ``--shardsvr`` parameters, as in the
following example:

```sh

mongod --keyFile <path-to-keyfile> --shardsvr --replSet <replSetname>  --dbpath <path>

```

Include any other options as appropriate for your deployment.

For more information on startup parameters,
see the [``mongod``](#bin.mongod) reference page.

Include additional settings as appropriate to your deployment.


#### Step 2: Connect to a member of the replica set over the localhost interface.

Connect a [``mongo``](#bin.mongo) shell to one of the config server
[``mongod``](#bin.mongod) instances over the [localhost
interface](#localhost-exception). You must run the [``mongo``](#bin.mongo)
shell on the same physical machine as the [``mongod``](#bin.mongod) instance.

The [localhost interface](#localhost-exception) is only available
since no users have been created for the deployment. The
[localhost interface](#localhost-exception) closes after the
creation of the first user.


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


#### Step 4: Create the shard-local user administrator (optional).

Important: After you create the first user, the [localhost exception](#localhost-exception) is no longer available.The first user must have privileges to create other users, such as a user with the [``userAdminAnyDatabase``](#userAdminAnyDatabase). This ensures that you can create additional users after the [Localhost Exception](#localhost-exception) closes.If at least one user does *not* have privileges to create users, once the localhost exception closes you may be unable to create or modify users with new privileges, and therefore unable to access necessary operations. 

Add a user using the [``db.createUser()``](#db.createUser) method. The user should
have at minimum the [``userAdminAnyDatabase``](#userAdminAnyDatabase) role on the
``admin`` database.

You must be connected to the [*primary*](#term-primary) to create users.

The following example creates the user ``fred`` with the
[``userAdminAnyDatabase``](#userAdminAnyDatabase) role on the ``admin`` database.

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

See [Database User Roles](#database-user-roles) for a full list of built-in roles and
related to database administration operations.


#### Step 5: Authenticate as the shard-local user administrator (optional).

Authenticate to the ``admin`` database.

In the [``mongo``](#bin.mongo) shell, use [``db.auth()``](#db.auth) to
authenticate. For example, the following authenticate as the user
administrator ``fred``:

```javascript

db.getSiblingDB("admin").auth("fred", "changeme1" )

```

Alternatively, connect a new [``mongo``](#bin.mongo) shell to the primary
replica set member using the ``-u <username>``, ``-p <password>``, and
the ``--authenticationDatabase`` parameters.

```sh

mongo -u "fred" -p "changeme1" --authenticationDatabase "admin"

```


#### Step 6: Create the shard-local cluster administrator (optional).

The shard-local cluster administrator user has the
[``clusterAdmin``](#clusterAdmin) role, which provides privileges that allow
access to replication operations.

For a full list of roles related to replica set operations see
[Cluster Administration Roles](#cluster-admin-roles).

Create a cluster administrator user and assign the
[``clusterAdmin``](#clusterAdmin) role in the ``admin`` database:

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


### Connect a ``mongos`` to the Sharded Cluster


#### Step 1: Connect a [``mongos``](#bin.mongos) to the cluster

Start a [``mongos``](#bin.mongos) specifying
the keyfile using either a configuration file or a command line parameter.

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

mongos --config <path-to-config>

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


#### Step 2: Connect to a [``mongos``](#bin.mongos) over the localhost interface.

Connect a [``mongo``](#bin.mongo) shell to one of the config server
[``mongos``](#bin.mongos) instances over the [localhost
interface](#localhost-exception). You must run the [``mongo``](#bin.mongo)
shell on the same physical machine as the [``mongod``](#bin.mongod) instance.

The [localhost interface](#localhost-exception) is only available
since no users have been created for the deployment. The
[localhost interface](#localhost-exception) closes after the
creation of the first user.


#### Step 3: Create the user administrator.

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


#### Step 4: Authenticate as the user administrator.

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


#### Step 5: Create Administrative User for Cluster Management

The cluster administrator user has the [``clusterAdmin``](#clusterAdmin) role,
which grants access to replication and sharding operations.

Create a [``clusterAdmin``](#clusterAdmin) user in the ``admin`` database.

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


#### Step 7: Create additional users (Optional).

Create users to allow clients to connect and access the
sharded cluster. See [Database User Roles](#database-user-roles) for available built-in
roles, such as [``read``](#read) and [``readWrite``](#readWrite).
You may also want additional administrative users.
For more information on users, see [Users](#).

To create additional users, you must authenticate as a user with
[``userAdminAnyDatabase``](#userAdminAnyDatabase) or [``userAdmin``](#userAdmin) roles.


### Add Shards to the Cluster

To proceed, you must be connected to the [``mongos``](#bin.mongos) and
authenticated as the cluster administrator user for the sharded cluster.

Note: This is the cluster administrator for the sharded cluster and *not* the shard-local cluster administrator. 

To add each shard to the cluster, use the [``sh.addShard()``](#sh.addShard)
method. If the shard is a replica set, specify the name of the replica
set and specify a member of the set. In production deployments, *all*
shards should be replica sets.

The following operation adds a single shard replica set to the cluster:

```javascript

sh.addShard( "<replSetName>/s1-mongo1.example.net:27017")

```

The following operation is an example of adding a standalone [``mongod``](#bin.mongod)
shard to the cluster:

```javascript

sh.addShard( "s1-mongo1.example.net:27017")

```

Repeat these steps until the cluster includes all shards. At this
point, the sharded cluster enforces access control for the cluster as
well as for internal communications between each sharded cluster
component.


### Enable Sharding for a Database

To proceed, you must be connected to the [``mongos``](#bin.mongos) and
authenticated as the cluster administrator user for the sharded cluster.

Note: This is the cluster administrator for the sharded cluster and *not* the shard-local cluster administrator. 

Enabling sharding on a database makes it possible to shard collections
within the database. Use the [``sh.enableSharding()``](#sh.enableSharding) method to
enable sharding on the target database.

```javascript

sh.enableSharding("<database>")

```


### Shard a Collection

To proceed, you must be connected to the [``mongos``](#bin.mongos) and
authenticated as the cluster administrator user for the sharded cluster.

Note: This is the cluster administrator for the sharded cluster and *not* the shard-local cluster administrator. 

To shard a collection, use the [``sh.shardCollection()``](#sh.shardCollection) method.
You must specify the full namespace of the collection and a document containing
the shard key.

Your selection of shard key affects the efficiency of sharding, as well as
your ability to take advantage of certain sharding features such as
[zones](#zone-sharding). See the selection considerations listed
in the [Choosing a Shard Key](#sharding-shard-key-selection).

If the collection already contains data, you must create an index on the
[*shard key*](#term-shard-key) using the [``db.collection.createIndex()``](#db.collection.createIndex) method before
using [``shardCollection()``](#sh.shardCollection).

If the collection is empty, MongoDB creates the index as part of
[``sh.shardCollection()``](#sh.shardCollection).

The following is an example of the [``sh.shardCollection()``](#sh.shardCollection) method:

```javascript

sh.shardCollection("<database>.<collection>", { <key> : <direction> } )

```


## Next Steps

Create users to allow clients to connect to and interact with
the sharded cluster.

See [Database User Roles](#database-user-roles) for basic built-in roles to use in creating
read-only and read-write users.


## x.509 Internal Authentication

For details on using x.509 for internal authentication, see
[Use x.509 Certificate for Membership Authentication](#).

To upgrade from keyfile internal authentication to x.509 internal
authentication, see
[Upgrade from Keyfile Authentication to x.509 Authentication](#).

See also: [Sharded Cluster Components](#) 

  [Operational Restrictions in Sharded Clusters](#)
