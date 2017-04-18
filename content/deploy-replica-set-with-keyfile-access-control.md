+++
title = "Deploy Replica Set With Keyfile Access Control"

[tags]
+++
# Deploy Replica Set With Keyfile Access Control


# On this page

* [Overview](#overview) 

* [Considerations](#considerations) 

* [Deploy New Replica Set with Keyfile Access Control](#deploy-new-replica-set-with-keyfile-access-control) 

* [x.509 Internal Authentication](#x-509-internal-authentication) 


## Overview

Enforcing access control on a [*replica set*](#term-replica-set) requires configuring:

* Security between members of the replica set using [Internal Authentication](#), and 

* Security between connecting clients and the replica set using [Role-Based Access Control](#). 

For this tutorial, each member of the replica set uses the same internal
authentication mechanism and settings.

Enforcing internal authentication also enforces user access control. To
connect to the replica set, clients like the [``mongo``](#bin.mongo) shell need to
use a [user account](#). See
[Access Control](#security-repsetdeploy-access-control).


### Cloud Manager and Ops Manager

If you are currently using or are planning to use Cloud Manager or
Ops Manager, consider using the built-in features for
deploying a replica set with access control enforced.

See ``Deploy Replica Set`` in the
[Cloud Manager manual](https://docs.cloudmanager.mongodb.com/tutorial/deploy-replica-set) or in the
[Ops Manager manual](https://docs.opsmanager.mongodb.com/current/tutorial/deploy-replica-set).

See ``Access Control for MongoDB Deployments`` in the
[Cloud Manager manual](https://docs.cloudmanager.mongodb.com/nav/security-enable-authentication) or in the
[Ops manager manual](https://docs.opsmanager.mongodb.com/current/nav/security-enable-authentication).


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


## Deploy New Replica Set with Keyfile Access Control


### Step 1: Create a keyfile.

The contents of the [keyfile](#internal-auth-keyfile) serves as
the shared password for the members of the replica set. The
content of the keyfile must be the same for all members of the
replica set.

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


### Step 2: Copy the keyfile to each replica set member.

Copy the keyfile to each server hosting the replica set members. Use a
consistent location for each server.

Important: Do not use shared network locations or storage mediums such as USB drives for storing the keyfile. 

Ensure that the user running the [``mongod``](#bin.mongod) instances can access the keyfile.


### Step 3: Enforce access control on each member of the replica set.

Running a [``mongod``](#bin.mongod) with the ``keyFile`` parameter enforces both
[Internal Authentication](#) and
[Role-Based Access Control](#).

For *each* [``mongod``](#bin.mongod) in the replica set, start the
[``mongod``](#bin.mongod) using either a configuration file or the command line.

Important: You cannot change the name of a replica set after initiating it. Choose an appropriate replica set name at this stage to reduce complications later. 

**Configuration File**

If using a configuration file, set the [``security.keyFile``](#security.keyFile) option
to the keyfile's path, and the [``replication.replSetName``](#replication.replSetName) option
to the replica set name:

```yaml

security:
  keyFile: <path-to-keyfile>
replication:
  replSetName: <replicaSetName>

```

Start the [``mongod``](#bin.mongod) using the configuration file:

```shell

mongod --config <path-to-config-file>

```

For more information on the configuration file, see
[configuration options](#).

**Command Line**

If using the command line option, start the [``mongod``](#bin.mongod) with the
``--keyFile`` and ``--replSet`` parameters:

```sh

mongod --keyFile <path-to-keyfile> --replSet <replicaSetName>

```

For more information on startup parameters,
see the [``mongod``](#bin.mongod) reference page.

Include additional settings as appropriate to your deployment.


### Step 4: Connect to a member of the replica set over the localhost interface.

Connect a [``mongo``](#bin.mongo) shell to one of the config server
[``mongod``](#bin.mongod) instances over the [localhost
interface](#localhost-exception). You must run the [``mongo``](#bin.mongo)
shell on the same physical machine as the [``mongod``](#bin.mongod) instance.

The [localhost interface](#localhost-exception) is only available
since no users have been created for the deployment. The
[localhost interface](#localhost-exception) closes after the
creation of the first user.


### Step 5: Initiate the replica set.

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
      { _id : 0, host : "mongo1.example.net:27017" },
      { _id : 1, host : "mongo2.example.net:27017" },
      { _id : 2, host : "mongo3.example.net:27017" }
    ]
  }
)

```

[``rs.initiate()``](#rs.initiate) triggers an [*election*](#term-election) and
elects one of the members to be the [*primary*](#term-primary).

Connect to the primary before continuing. Use [``rs.status()``](#rs.status) to
locate the primary member.


### Step 6: Create the user administrator.

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


### Step 7: Authenticate as the user administrator.

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


### Step 8: Create the cluster administrator.

The [``clusterAdmin``](#clusterAdmin) role grants access to replication
operations, such as configuring the replica set.

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


### Step 9: Create additional users (Optional).

Create users to allow clients to connect and interact with the replica set.
See [Database User Roles](#database-user-roles) for basic built-in roles to use in creating
read-only and read-write users.

You may also want additional administrative users.
For more information on users, see [Users](#).


## x.509 Internal Authentication

For details on using x.509 for internal authentication, see
[Use x.509 Certificate for Membership Authentication](#).

To upgrade from keyfile internal authentication to x.509 internal
authentication, see
[Upgrade from Keyfile Authentication to x.509 Authentication](#).
