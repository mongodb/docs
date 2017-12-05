+++
title = "Enforce Keyfile Access Control in a Replica Set"

tags = [
"mongodb",
"administration",
"replication",
"security",
"intermediate" ]
+++

# Enforce Keyfile Access Control in a Replica Set


## Overview

Enforcing access control on an existing [*replica set*](https://docs.mongodb.com/manual/reference/glossary/#term-replica-set) requires
configuring:

* Security between members of the replica set using [Internal Authentication](https://docs.mongodb.com/manual/core/security-internal-authentication), and

* Security between connecting clients and the replica set using [User Access Controls](https://docs.mongodb.com/manual/core/authorization).

For this tutorial, each member of the replica set uses the same internal
authentication mechanism and settings.

Enforcing internal authentication also enforces user access control. To
connect to the replica set, clients like the [``mongo``](https://docs.mongodb.com/manual/reference/program/mongo/#bin.mongo) shell need to
use a [user account](https://docs.mongodb.com/manual/core/authorization). See
[Users](#security-replset-auth-access-control).


### Cloud Manager and Ops Manager

If Cloud Manager or Ops Manager is managing your deployment, see the
[Cloud Manager manual](https://docs.cloudmanager.mongodb.com/tutorial/edit-host-authentication-credentials) or the [Ops
Manager manual](https://docs.opsmanager.mongodb.com/current/tutorial/edit-host-authentication-credentials) for
enforcing access control.


## Considerations


### IP Binding

Changed in version 3.6.

Starting in MongoDB 3.6, MongoDB binaries, [``mongod``](https://docs.mongodb.com/manual/reference/program/mongod/#bin.mongod) and
[``mongos``](https://docs.mongodb.com/manual/reference/program/mongos/#bin.mongos), bind to localhost by default.
Previously, starting in MongoDB 2.6, only the binaries from the
official MongoDB RPM (Red Hat, CentOS, Fedora Linux, and derivatives)
and DEB (Debian, Ubuntu, and derivatives) packages bind to localhost by
default. For more details, see [Localhost Binding Compatibility Changes](https://docs.mongodb.com/manual/release-notes/3.6-compatibility/#bind-ip-compatibility).


### Operating System

This tutorial uses the [``mongod``](https://docs.mongodb.com/manual/reference/program/mongod/#bin.mongod) programs. Windows users should
use the [``mongod.exe``](https://docs.mongodb.com/manual/reference/program/mongod.exe/#bin.mongod.exe) program instead.


### Keyfile Security

Keyfiles are bare-minimum forms of security and are best suited for testing or
development environments. For production environments we recommend using
[x.509 certificates](https://docs.mongodb.com/manual/core/security-x.509).

<span id="security-replset-auth-access-control"></span>


### Users

This tutorial covers creating the minimum number of administrative
users on the ``admin`` database *only*. For the user authentication,
the tutorial uses the default [SCRAM-SHA-1](https://docs.mongodb.com/manual/core/security-scram-sha-1)
authentication mechanism. Challenge-response security mechanisms are
are best suited for testing or development environments. For production
environments, we recommend using [x.509
certificates](https://docs.mongodb.com/manual/core/security-x.509) or [LDAP Proxy Authentication](https://docs.mongodb.com/manual/core/security-ldap)
(available for MongoDB Enterprise only) or [Kerberos Authentication](https://docs.mongodb.com/manual/core/kerberos)
(available for MongoDB Enterprise only).

For details on creating users for specific authentication mechanism,
refer to the specific authentication mechanism pages.

See [Configure Role-Based Access Control](https://docs.mongodb.com/manual/administration/security-checklist/#security-checklist-role-based-access-control) for best
practices for user creation and management.


### Downtime

The following procedure for enforcing access control requires downtime.
For a procedure that does not require downtime, see
[Enforce Keyfile Access Control in a Replica Set without Downtime](../enforce-keyfile-access-control-in-existing-replica-set-without-downtime/)
instead.

<span id="security-enable-access-control-replica-set"></span>


## Enforce Keyfile Access Control on Existing Replica Set


### Step 1: Create a keyfile.

With [keyfile](https://docs.mongodb.com/manual/core/security-internal-authentication/#internal-auth-keyfile) authentication, each
[``mongod``](https://docs.mongodb.com/manual/reference/program/mongod/#bin.mongod) instances in the replica set uses the contents of the keyfile as the
shared password for authenticating other members in the deployment. Only
[``mongod``](https://docs.mongodb.com/manual/reference/program/mongod/#bin.mongod) instances with the correct keyfile can join the replica set.

The content of the keyfile must be between 6 and 1024 characters
long and must be the same for all members of the replica set.

Note: On UNIX systems, the keyfile must not have group or world permissions. On Windows systems, keyfile permissions are not checked.

You can generate a keyfile using any method you choose. For example,
the following operation uses ``openssl`` to generate a complex
pseudo-random 1024 character string to use for a keyfile. It then
uses ``chmod`` to change file permissions to provide read
permissions for the file owner only:

```sh

openssl rand -base64 756 > <path-to-keyfile>
chmod 400 <path-to-keyfile>

```

See [Keyfiles](https://docs.mongodb.com/manual/core/security-internal-authentication/#internal-auth-keyfile) for additional details  and requirements
for using keyfiles.


### Step 2: Copy the keyfile to each replica set member.

Copy the keyfile to each server hosting the replica set members.
Ensure that the user running the [``mongod``](https://docs.mongodb.com/manual/reference/program/mongod/#bin.mongod) instances is the owner of the
file and can access the keyfile.

Avoid storing the keyfile on storage mediums that can be easily
disconnected from the hardware hosting the [``mongod``](https://docs.mongodb.com/manual/reference/program/mongod/#bin.mongod) instances, such as a
USB drive or a network attached storage device.


### Step 3: Shut down all members of the replica set.

Shut down each [``mongod``](https://docs.mongodb.com/manual/reference/program/mongod/#bin.mongod) in the replica set, starting with the
[*secondaries*](https://docs.mongodb.com/manual/reference/glossary/#term-secondary). Continue until *all* members of the
replica set are offline, including any [*arbiters*](https://docs.mongodb.com/manual/reference/glossary/#term-arbiter).
The [*primary*](https://docs.mongodb.com/manual/reference/glossary/#term-primary) must be the *last* member shut down to avoid
potential rollbacks.

To shut down a [``mongod``](https://docs.mongodb.com/manual/reference/program/mongod/#bin.mongod), connect each [``mongod``](https://docs.mongodb.com/manual/reference/program/mongod/#bin.mongod) using a
[``mongo``](https://docs.mongodb.com/manual/reference/program/mongo/#bin.mongo) shell and issue the [``db.shutdownServer()``](https://docs.mongodb.com/manual/reference/method/db.shutdownServer/#db.shutdownServer) on the
``admin`` database:

```sh

use admin
db.shutdownServer()

```

At the end of this step, *all* members of the replica set should be offline.


### Step 4: Restart each member of the replica set with access control enforced.

Restart *each* [``mongod``](https://docs.mongodb.com/manual/reference/program/mongod/#bin.mongod) in the replica set with either the
[``security.keyFile``](https://docs.mongodb.com/manual/reference/configuration-options/#security.keyFile) configuration file setting or the
``--keyFile`` command-line option. Running [``mongod``](https://docs.mongodb.com/manual/reference/program/mongod/#bin.mongod) with
the ``--keyFile`` command-line option or the
[``security.keyFile``](https://docs.mongodb.com/manual/reference/configuration-options/#security.keyFile) configuration file setting enforces both
[Internal Authentication](https://docs.mongodb.com/manual/core/security-internal-authentication) and
[Role-Based Access Control](https://docs.mongodb.com/manual/core/authorization).


#### Configuration File

If using a configuration file, set

* [``security.keyFile``](https://docs.mongodb.com/manual/reference/configuration-options/#security.keyFile) to the keyfile's path, and

* [``replication.replSetName``](https://docs.mongodb.com/manual/reference/configuration-options/#replication.replSetName) to the replica set name.

Include additional  options as required
for your configuration. For instance, if you wish remote clients to
connect to your deployment or your deployment members are run on
different hosts, specify the [``net.bindIp``](https://docs.mongodb.com/manual/reference/configuration-options/#net.bindIp) setting. For more
information, see [Localhost Binding Compatibility Changes](https://docs.mongodb.com/manual/release-notes/3.6-compatibility/#bind-ip-compatibility).

```yaml

security:
  keyFile: <path-to-keyfile>
replication:
  replSetName: <replicaSetName>
net:
   bindIp: localhost,<ip address>

```

Start the [``mongod``](https://docs.mongodb.com/manual/reference/program/mongod/#bin.mongod) using the configuration file:

```shell

mongod --config <path-to-config-file>

```

For more information on the configuration file, see
[configuration options](https://docs.mongodb.com/manual/reference/configuration-options).


#### Command Line

If using the command line options, start the [``mongod``](https://docs.mongodb.com/manual/reference/program/mongod/#bin.mongod) with the following options:

* ``--keyFile`` set to  the keyfile's path, and

* ``--replSet`` set to the replica set name.

Include additional options as required for your configuration. For
instance, if you wish remote clients to connect to your deployment
or your deployment members are run on different hosts, specify the
``--bind_ip``. For more information, see
[Localhost Binding Compatibility Changes](https://docs.mongodb.com/manual/release-notes/3.6-compatibility/#bind-ip-compatibility).

```sh

mongod --keyFile <path-to-keyfile> --replSet <replicaSetName> --bind_ip localhost,<ip address of the mongod host>

```

For more information on command-line options, see the
[``mongod``](https://docs.mongodb.com/manual/reference/program/mongod/#bin.mongod) reference page.


### Step 5: Connect to the primary using the localhost interface.

Connect a [``mongo``](https://docs.mongodb.com/manual/reference/program/mongo/#bin.mongo) shell to one of the
[``mongod``](https://docs.mongodb.com/manual/reference/program/mongod/#bin.mongod) instances over the [localhost
interface](https://docs.mongodb.com/manual/core/security-users/#localhost-exception). You must run the [``mongo``](https://docs.mongodb.com/manual/reference/program/mongo/#bin.mongo)
shell on the same physical machine as the [``mongod``](https://docs.mongodb.com/manual/reference/program/mongod/#bin.mongod) instance.

Use [``rs.status()``](https://docs.mongodb.com/manual/reference/method/rs.status/#rs.status) to identify the [*primary*](https://docs.mongodb.com/manual/reference/glossary/#term-primary) replica set
member. If you are connected to the primary, continue to the next
step. If not, connect a [``mongo``](https://docs.mongodb.com/manual/reference/program/mongo/#bin.mongo) shell to the primary
over the [localhost
interface](https://docs.mongodb.com/manual/core/security-users/#localhost-exception).

Important: You must connect to the [*primary*](https://docs.mongodb.com/manual/reference/glossary/#term-primary) before proceeding.


### Step 6: Create the user administrator.

Important: After you create the first user, the [localhost exception](https://docs.mongodb.com/manual/core/security-users/#localhost-exception) is no longer available. The first user must have privileges to create other users, such as a user with the [``userAdminAnyDatabase``](https://docs.mongodb.com/manual/reference/built-in-roles/#userAdminAnyDatabase). This ensures that you can create additional users after the [Localhost Exception](https://docs.mongodb.com/manual/core/security-users/#localhost-exception) closes. If at least one user does *not* have privileges to create users, once the localhost exception closes you may be unable to create or modify users with new privileges, and therefore unable to access necessary operations.

Add a user using the [``db.createUser()``](https://docs.mongodb.com/manual/reference/method/db.createUser/#db.createUser) method. The user should
have at minimum the [``userAdminAnyDatabase``](https://docs.mongodb.com/manual/reference/built-in-roles/#userAdminAnyDatabase) role on the
``admin`` database.

You must be connected to the [*primary*](https://docs.mongodb.com/manual/reference/glossary/#term-primary) to create users.

The following example creates the user ``fred`` with the
[``userAdminAnyDatabase``](https://docs.mongodb.com/manual/reference/built-in-roles/#userAdminAnyDatabase) role on the ``admin`` database.

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

See [Database User Roles](https://docs.mongodb.com/manual/reference/built-in-roles/#database-user-roles) for a full list of built-in roles and
related to database administration operations.


### Step 7: Authenticate as the User Administrator.

Authenticate to the ``admin`` database.

In the [``mongo``](https://docs.mongodb.com/manual/reference/program/mongo/#bin.mongo) shell, use [``db.auth()``](https://docs.mongodb.com/manual/reference/method/db.auth/#db.auth) to
authenticate. For example, the following authenticate as the user
administrator ``fred``:

```javascript

db.getSiblingDB("admin").auth("fred", "changeme1" )

```

Alternatively, connect a new [``mongo``](https://docs.mongodb.com/manual/reference/program/mongo/#bin.mongo) shell to the primary
replica set member using the ``-u <username>``, ``-p <password>``, and
the ``--authenticationDatabase`` parameters.

```sh

mongo -u "fred" -p "changeme1" --authenticationDatabase "admin"

```


### Step 8: Create the cluster administrator (Optional).

The cluster administrator user has the [``clusterAdmin``](https://docs.mongodb.com/manual/reference/built-in-roles/#clusterAdmin) role,
which grants access to replication operations.

Create a cluster administrator user and assign the
[``clusterAdmin``](https://docs.mongodb.com/manual/reference/built-in-roles/#clusterAdmin) role in the ``admin`` database:

```sh

db.getSiblingDB("admin").createUser(
  {
    "user" : "ravi",
    "pwd" : "changeme2",
    roles: [ { "role" : "clusterAdmin", "db" : "admin" } ]
  }
)

```

See [Cluster Administration Roles](https://docs.mongodb.com/manual/reference/built-in-roles/#cluster-admin-roles) for a full list of built-in roles related to
replica set operations.


### Step 9: Create additional users (Optional).

Create users to allow clients to connect and interact with the replica set.
See [Database User Roles](https://docs.mongodb.com/manual/reference/built-in-roles/#database-user-roles) for basic built-in roles to use in creating
read-only and read-write users.

You may also want additional administrative users.
For more information on users, see [Users](https://docs.mongodb.com/manual/core/security-users).


## x.509 Internal Authentication

For details on using x.509 for internal authentication, see
[Use x.509 Certificate for Membership Authentication](https://docs.mongodb.com/manual/tutorial/configure-x509-member-authentication).

To upgrade from keyfile internal authentication to x.509 internal
authentication, see
[Upgrade from Keyfile Authentication to x.509 Authentication](https://docs.mongodb.com/manual/tutorial/upgrade-keyfile-to-x509).
