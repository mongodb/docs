+++
title = "Enforce Keyfile Access Control in a Replica Set"

[tags]
mongodb = "product"
+++
# Enforce Keyfile Access Control in a Replica Set


# On this page

* [Overview](#overview) 

* [Considerations](#considerations) 

* [Enforce Keyfile Access Control on Existing Replica Set](#enforce-keyfile-access-control-on-existing-replica-set) 

* [x.509 Internal Authentication](#x-509-internal-authentication) 


## Overview

Enforcing access control on a [*replica set*](#term-replica-set) requires configuring:

* Security between members of the replica set using [Internal Authentication](#), and 

* Security between connecting clients and the replica set using [User Access Controls](#). 

For this tutorial, each member of the replica set uses the same internal
authentication mechanism and settings.

Enforcing internal authentication also enforces user access control. To
connect to the replica set, clients like the [``mongo``](#bin.mongo) shell need to
use a [user account](#). See
[Access Control](#security-replset-auth-access-control).


### Cloud Manager and Ops Manager

If Cloud Manager or Ops Manager is managing your deployment,
see: ``Configure Access Control for MongoDB Deployments``
in the [Cloud Manager manual](https://docs.cloudmanager.mongodb.com/tutorial/edit-host-authentication-credentials)
or in the [Ops Manager manual](https://docs.opsmanager.mongodb.com/current/tutorial/edit-host-authentication-credentials) for enforcing access control.


## Considerations


### Operating System

This tutorial uses the [``mongod``](#bin.mongod) programs. Windows users should
use the [``mongod.exe``](#bin.mongod.exe) program instead.


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


### Downtime

The following procedure for enforcing access control requires downtime.
For a procedure that does not require downtime, see
[Enforce Keyfile Access Control in a Replica Set without Downtime](#)
instead.


## Enforce Keyfile Access Control on Existing Replica Set


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


### Step 3: Shut down all members of the replica set.

Shut down each [``mongod``](#bin.mongod) in the replica set, starting with the
[*secondaries*](#term-secondary). Continue until *all* members of the
replica set are offline, including any [*arbiters*](#term-arbiter).
The [*primary*](#term-primary) must be the *last* member shut down to avoid
potential rollbacks.

To shut down a [``mongod``](#bin.mongod), connect each [``mongod``](#bin.mongod) using a
[``mongo``](#bin.mongo) shell and issue the [``db.shutdownServer()``](#db.shutdownServer) on the
``admin`` database:

```sh

use admin
db.shutdownServer()

```

At the end of this step, *all* members of the replica set should be offline.


### Step 4: Restart each member of the replica set with access control enforced.

Running a [``mongod``](#bin.mongod) with the ``keyFile`` parameter enforces both
[Internal Authentication](#) and
[Role-Based Access Control](#).

Start *each* [``mongod``](#bin.mongod) in the replica set using either
a configuration file or the command line.

Use the original replica set name for ``replSetName`` when starting each
member. You cannot change the name of a replica set, and attempting to do
so results in errors.

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


### Step 5

Connect a [``mongo``](#bin.mongo) shell to one of the config server
[``mongod``](#bin.mongod) instances over the [localhost
interface](#localhost-exception). You must run the [``mongo``](#bin.mongo)
shell on the same physical machine as the [``mongod``](#bin.mongod) instance.

Use [``rs.status()``](#rs.status) to identify the [*primary*](#term-primary) replica set
member. If you are connected to the primary, continue to the next step. If
not, identify the primary [``mongod``](#bin.mongod) and connect to it using a
[``mongo``](#bin.mongo) shell over the [localhost
interface](#localhost-exception).

You must connect using the [localhost interface](#localhost-exception)
because no users have been created for the deployment. After creating
the first user, you must authenticate using that user to proceed regardless
of how you are connected to the [``mongod``](#bin.mongod).

Important: You must connect to the [*primary*](#term-primary) before proceeding. 


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


### Step 7: Authenticate as the User Administrator.

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


### Step 8: Create the cluster administrator (Optional).

The cluster administrator user has the [``clusterAdmin``](#clusterAdmin) role,
which grants access to replication operations.

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
replica set operations.


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
