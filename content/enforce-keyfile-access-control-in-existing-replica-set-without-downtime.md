+++
title = "Enforce Keyfile Access Control in a Replica Set without Downtime"

tags = [
"mongodb",
"administration",
"replication",
"security",
"intermediate" ]
+++

# Enforce Keyfile Access Control in a Replica Set without Downtime


## Overview

To secure against unauthorized access, enforce [authentication](https://docs.mongodb.com/manual/core/authentication/#authentication) in [*sharded cluster*](https://docs.mongodb.com/manual/reference/glossary/#term-sharded-cluster) deployments. Authentication
in MongoDB consists of [internal authentication](https://docs.mongodb.com/manual/core/security-internal-authentication/#inter-process-auth)
among the replica set members, and [user access control](https://docs.mongodb.com/manual/core/authorization/#authorization)
for clients connecting to the replica set.

If your deployment does not enforce authentication, MongoDB 3.4 provides the
[``--transitionToAuth``](https://docs.mongodb.com/manual/reference/program/mongos/#cmdoption-transitiontoauth) option for performing a no-downtime upgrade to
enforcing authentication.

New in version 3.4: MongoDB 3.2 and earlier do not support a no-downtime upgrade to enforce
authentication. See
[Enforce Keyfile Access Control in a Replica Set](enforce-keyfile-access-control-in-existing-replica-set/) for
enforcing authentication in an existing MongoDB 3.2 replica set.

This tutorial uses the [keyfile](https://docs.mongodb.com/manual/core/security-internal-authentication/#internal-auth-keyfile) internal
authentication mechanism for internal security, and [SCRAM-SHA-1](https://docs.mongodb.com/manual/core/security-scram-sha-1/#authentication-scram-sha-1)-based [role-based access controls](https://docs.mongodb.com/manual/core/authorization/#authorization) for client connections.


### Cloud Manager and Ops Manager

If you are using Cloud Manager or Ops Manager to manage your deployment,
see: *Configure Access Control for MongoDB Deployments*
in the [Cloud Manager manual](https://docs.cloudmanager.mongodb.com/tutorial/edit-host-authentication-credentials)
or in the [Ops Manager manual](https://docs.opsmanager.mongodb.com/current/tutorial/edit-host-authentication-credentials) to enforce authentication.


### Architecture

This tutorial assumes that your replica set can elect a new
[*primary*](https://docs.mongodb.com/manual/reference/glossary/#term-primary) after stepping down the existing primary replica set member.
This requires:

* A majority of voting replica set members available after stepping down the [*primary*](https://docs.mongodb.com/manual/reference/glossary/#term-primary).

* At least one [*secondary*](https://docs.mongodb.com/manual/reference/glossary/#term-secondary) member that is not [delayed](https://docs.mongodb.com/manual/core/replica-set-delayed-member/#replica-set-delayed-members), [hidden](https://docs.mongodb.com/manual/core/replica-set-hidden-member/#replica-set-hidden-members), or [Priority 0](https://docs.mongodb.com/manual/core/replica-set-priority-0-member/#replica-set-secondary-only-members).


### Transition State

A [``mongod``](https://docs.mongodb.com/manual/reference/program/mongod/#bin.mongod) running with [``--transitionToAuth``](https://docs.mongodb.com/manual/reference/program/mongos/#cmdoption-transitiontoauth) accepts both
authenticated and non-authenticated connections. Clients connected to the
[``mongod``](https://docs.mongodb.com/manual/reference/program/mongod/#bin.mongod) during this transition state can perform read, write, and
administrative operations on any database.


### Client Access

At the end of the following procedure, the replica set rejects any
client attempting to make a non-authenticated connection. The procedure creates
[users](https://docs.mongodb.com/manual/core/security-users/#users) for client applications to use when connecting to the
replica set.

See [Configure Role-Based Access Control](https://docs.mongodb.com/manual/administration/security-checklist/#security-checklist-role-based-access-control) for user creation and
management best practices.

<span id="security-replset-nodowntime-enable-access-control"></span>


## Enforce Keyfile Access Control on Existing Replica Set


### Step 1: Create the user administrator.

The [``userAdminAnyDatabase``](https://docs.mongodb.com/manual/reference/built-in-roles/#userAdminAnyDatabase) role grants access to user creation
on any database in the deployment.

You must connect to the [*primary*](https://docs.mongodb.com/manual/reference/glossary/#term-primary) to create users.

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

At the completion of this procedure, any client that administers users in
the replica set must authenticate as this user, or a user with
similar permissions.

See [Database User Roles](https://docs.mongodb.com/manual/reference/built-in-roles/#database-user-roles) for a full list of built-in roles and
related to database administration operations.


### Step 2: Create the cluster administrator.

The [``clusterAdmin``](https://docs.mongodb.com/manual/reference/built-in-roles/#clusterAdmin) role grants access to replication
operations, such as configuring the replica set.

You must connect to the [*primary*](https://docs.mongodb.com/manual/reference/glossary/#term-primary) to create users.

The following example creates the user ``ravi`` with the
[``clusterAdmin``](https://docs.mongodb.com/manual/reference/built-in-roles/#clusterAdmin) role on the ``admin`` database.

Important: Passwords should be random, long, and complex to ensure system security and to prevent or delay malicious access.

```javascript

db.getSiblingDB("admin").createUser(
  {
    "user" : "ravi",
    "pwd" : "changeme2",
    roles: [ { "role" : "clusterAdmin", "db" : "admin" } ]
  }
)

```

At the completion of this procedure, any client that administrates or
maintains the replica set must authenticate as this user, or a user with
similar permissions.

See [Cluster Administration Roles](https://docs.mongodb.com/manual/reference/built-in-roles/#cluster-admin-roles) for a full list of built-in roles related to
replica set operations.


### Step 3: Create users for client applications.

Create users to allow client application to connect and interact with the
replica set. At the completion of this tutorial, clients must authenticate as
a configured user to connect to the replica set.

See [Database User Roles](https://docs.mongodb.com/manual/reference/built-in-roles/#database-user-roles) for basic built-in roles to use
in creating read-only and read-write users.

The following creates a user with read and write permissions
on the ``foo`` database.

Important: Passwords should be random, long, and complex to ensure system security and to prevent or delay malicious access.

Create a user with the
[``readWrite``](https://docs.mongodb.com/manual/reference/built-in-roles/#readWrite) role in the ``foo`` database.

```javascript

db.getSiblingDB("foo").createUser(
  {
    "user" : "joe",
    "pwd" : "changeme2",
    roles: [ { "role" : "readWrite", "db" : "foo" } ]
  }
)

```

Clients authenticating as this user can perform read and write operations
against the ``foo`` database. See [Authenticate a User](https://docs.mongodb.com/manual/core/security-users/#authentication-auth-as-user) for
more on creating an authenticated connection to the replica set.

See the [Add Users](https://docs.mongodb.com/manual/tutorial/create-users/#add-new-user) tutorial for more information on
adding users. Consider [security best practices](https://docs.mongodb.com/manual/administration/security-checklist/#security-checklist-role-based-access-control) when adding new users.


### Step 4: Update Client Applications

At this point in the procedure, the replica set does not enforce
authentication. However, client applications can still specify auth
credentials and connect to the replica set.

Update client applications to authenticate to the replica set using a
configured user. Authenticated connections require a username, password, and
the authentication database. See [Authenticate a User](https://docs.mongodb.com/manual/core/security-users/#authentication-auth-as-user).

For example, the following connects to a replica set named ``mongoRepl``
and authenticates as the user ``joe``.

```shell

mongo  -u joe -password changeme2 -authenticationDatabase foo --host mongoRepl/mongo1.example.net:27017, mongo2.example.net:27017, mongo3.example.net:27017

```

If your application uses a MongoDB driver, see the associated
[driver](https://docs.mongodb.com/ecosystem/drivers) documentation for instructions on
creating an authenticated connection.

At the completion of this tutorial, the replica set rejects non-authenticated
client connections. Performing this step now ensures clients can connect
to the replica set before and after the transition.


### Step 5: Create a keyfile.

The contents of the [keyfile](https://docs.mongodb.com/manual/core/security-internal-authentication/#internal-auth-keyfile) serves as
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

See [Keyfiles](https://docs.mongodb.com/manual/core/security-internal-authentication/#internal-auth-keyfile) for additional details  and requirements
for using keyfiles.


### Step 6: Copy the keyfile to each replica set member.

Copy the keyfile to each server hosting the replica set members. Use a
consistent location for each server.

Important: Do not use shared network locations or storage mediums such as USB drives for storing the keyfile.

Ensure that the user running the [``mongod``](https://docs.mongodb.com/manual/reference/program/mongod/#bin.mongod) instances can access the keyfile.


### Step 7: Restart each secondary or arbiter member of the replica set with ``transitionToAuth``.

Restart each [*secondary*](https://docs.mongodb.com/manual/reference/glossary/#term-secondary) or [*arbiter*](https://docs.mongodb.com/manual/reference/glossary/#term-arbiter) member in the replica set,
specifying the [``--transitionToAuth``](https://docs.mongodb.com/manual/reference/program/mongos/#cmdoption-transitiontoauth) option and an internal
authentication mechanism such as ``--keyfile``. You must do this one
at a time to ensure a majority of members in the replica set remain online.


#### Shut down the secondary or arbiter members.

From a [``mongo``](https://docs.mongodb.com/manual/reference/program/mongo/#bin.mongo) shell connected to the secondary or arbiter,
issue the [``db.shutdownServer()``](https://docs.mongodb.com/manual/reference/method/db.shutdownServer/#db.shutdownServer) against the ``admin`` database.

```javascript

admin = db.getSiblingDB("admin")
admin.shutdownServer()

```


#### Restart the secondary or arbiter members with ``transitionToAuth``

Restart the [``mongod``](https://docs.mongodb.com/manual/reference/program/mongod/#bin.mongod), this time specifying the
[``--transitionToAuth``](https://docs.mongodb.com/manual/reference/program/mongos/#cmdoption-transitiontoauth) option and an internal authentication
mechanism such as ``--keyfile``.

Starting the [``mongod``](https://docs.mongodb.com/manual/reference/program/mongod/#bin.mongod) with [``--transitionToAuth``](https://docs.mongodb.com/manual/reference/program/mongos/#cmdoption-transitiontoauth) places
the instance in a transition state where it can accept and create both
authenticated and non-authenticated connections.

Specify the following settings in your [configuration file](https://docs.mongodb.com/manual/administration/configuration/#configuration-file).

* [``security.keyFile``](https://docs.mongodb.com/manual/reference/configuration-options/#security.keyFile), with the path to the keyfile.

* [``replication.replSetName``](https://docs.mongodb.com/manual/reference/configuration-options/#replication.replSetName) to the original replica set name.

* [``security.transitionToAuth``](https://docs.mongodb.com/manual/reference/configuration-options/#security.transitionToAuth) to ``true``.

```yaml

security:
  keyFile: <path-to-keyfile>
  transitionToAuth: true
replication:
  replSetName: <replicaSetName>

```

Specify the [``--config``](https://docs.mongodb.com/manual/reference/program/mongos/#cmdoption-config) option with the path to the configuration
file when starting the [``mongod``](https://docs.mongodb.com/manual/reference/program/mongod/#bin.mongod).

```shell

mongod --config <path-to-config-file>

```

For more information on the configuration file, see
[configuration options](https://docs.mongodb.com/manual/reference/configuration-options).

You can also use the equivalent [``mongod``](https://docs.mongodb.com/manual/reference/program/mongod/#bin.mongod) options when starting your
mongod. See the [``mongod``](https://docs.mongodb.com/manual/reference/program/mongod/#bin.mongod) reference page for a complete list of
options.

Include additional settings as appropriate to your deployment.

At the end of this step, all secondaries and arbiters should be up and
running with [``--transitionToAuth``](https://docs.mongodb.com/manual/reference/program/mongos/#cmdoption-transitiontoauth).


### Step 8: Step down the primary member of the replica set and restart it with ``--transitionToAuth``.

Restart the [*primary*](https://docs.mongodb.com/manual/reference/glossary/#term-primary) member in the replica set, specifying the
[``--transitionToAuth``](https://docs.mongodb.com/manual/reference/program/mongos/#cmdoption-transitiontoauth) option and an internal authentication mechanism
such as ``--keyfile``.


#### Step down the primary replica set member

Connect to the primary using a [``mongo``](https://docs.mongodb.com/manual/reference/program/mongo/#bin.mongo) shell and step down the
primary using the [``rs.stepDown()``](https://docs.mongodb.com/manual/reference/method/rs.stepDown/#rs.stepDown) method.

```javascript

rs.stepDown()

```


#### Shut down the old primary

Once the primary steps down and the replica set elects a new primary,
shut down the old primary [``mongod``](https://docs.mongodb.com/manual/reference/program/mongod/#bin.mongod).

From a [``mongo``](https://docs.mongodb.com/manual/reference/program/mongo/#bin.mongo) shell connected to the old primary, issue the
[``db.shutdownServer()``](https://docs.mongodb.com/manual/reference/method/db.shutdownServer/#db.shutdownServer) on the *admin* database.

```javascript

admin = db.getSiblingDB("admin")
admin.shutdownServer()

```


#### Restart the old primary with ``transitionToAuth``

Restart the [``mongod``](https://docs.mongodb.com/manual/reference/program/mongod/#bin.mongod), this time specifying the
[``--transitionToAuth``](https://docs.mongodb.com/manual/reference/program/mongos/#cmdoption-transitiontoauth) option and an internal authentication
mechanism such as ``--keyfile``.

Starting the [``mongod``](https://docs.mongodb.com/manual/reference/program/mongod/#bin.mongod) with [``--transitionToAuth``](https://docs.mongodb.com/manual/reference/program/mongos/#cmdoption-transitiontoauth) places
the instance in a transition state where it can accept and create both
authenticated and non-authenticated connections.

Specify the following settings in your [configuration file](https://docs.mongodb.com/manual/administration/configuration/#configuration-file).

* [``security.keyFile``](https://docs.mongodb.com/manual/reference/configuration-options/#security.keyFile), with the path to the keyfile.

* [``replication.replSetName``](https://docs.mongodb.com/manual/reference/configuration-options/#replication.replSetName) to the original replica set name.

* [``security.transitionToAuth``](https://docs.mongodb.com/manual/reference/configuration-options/#security.transitionToAuth) to ``true``.

```yaml

security:
  keyFile: <path-to-keyfile>
  transitionToAuth: true
replication:
  replSetName: <replicaSetName>

```

Start the [``mongod``](https://docs.mongodb.com/manual/reference/program/mongod/#bin.mongod) using the configuration file.

```shell

mongod --config <path-to-config-file>

```

For more information on the configuration file, see
[configuration options](https://docs.mongodb.com/manual/reference/configuration-options).

You can also use the equivalent [``mongod``](https://docs.mongodb.com/manual/reference/program/mongod/#bin.mongod) options when starting your
mongod. See the [``mongod``](https://docs.mongodb.com/manual/reference/program/mongod/#bin.mongod) reference page for a complete list of
options.

Include additional settings as appropriate to your deployment.

At the end of this step, all members of the replica set should be up and
running with [``--transitionToAuth``](https://docs.mongodb.com/manual/reference/program/mongos/#cmdoption-transitiontoauth) and ``--keyfile``.


### Step 9: Restart secondaries and arbiters *without* ``--transitionToAuth``

Restart each [*secondary*](https://docs.mongodb.com/manual/reference/glossary/#term-secondary) or [*arbiter*](https://docs.mongodb.com/manual/reference/glossary/#term-arbiter) member in the replica set,
removing the [``--transitionToAuth``](https://docs.mongodb.com/manual/reference/program/mongos/#cmdoption-transitiontoauth) option on restart. You must do
this one at a time to ensure a majority of members in the replica set remain
online.

If the majority of replica set members are offline at the same time, the
replica set may go into read-only mode.


#### Shut down the secondary or arbiter members

Connect to a [``mongo``](https://docs.mongodb.com/manual/reference/program/mongo/#bin.mongo) shell to the secondary or arbiter, and
issue the [``db.shutdownServer()``](https://docs.mongodb.com/manual/reference/method/db.shutdownServer/#db.shutdownServer) on the *database*.

```javascript

admin = db.getSiblingDB("admin")
admin.shutdownServer()

```


#### Restart the secondary or arbiter members without ``transitionToAuth``

Restart the [``mongod``](https://docs.mongodb.com/manual/reference/program/mongod/#bin.mongod), this time *without* the
[``--transitionToAuth``](https://docs.mongodb.com/manual/reference/program/mongos/#cmdoption-transitiontoauth) option and *with* internal authentication
mechanism such as ``--keyfile``.

Starting the [``mongod``](https://docs.mongodb.com/manual/reference/program/mongod/#bin.mongod) with [``--transitionToAuth``](https://docs.mongodb.com/manual/reference/program/mongos/#cmdoption-transitiontoauth) places
the instance in a transition state where it can accept and create both
authenticated and non-authenticated connections.

Specify the following settings in your [configuration file](https://docs.mongodb.com/manual/administration/configuration/#configuration-file).

* [``security.keyFile``](https://docs.mongodb.com/manual/reference/configuration-options/#security.keyFile), with the path to the keyfile.

* [``replication.replSetName``](https://docs.mongodb.com/manual/reference/configuration-options/#replication.replSetName) to the original replica set name.

```yaml

security:
  keyFile: <path-to-keyfile>
replication:
  replSetName: <replicaSetName>

```

Start the [``mongod``](https://docs.mongodb.com/manual/reference/program/mongod/#bin.mongod) using the configuration file:

```shell

mongod --config <path-to-config-file>

```

For more information on the configuration file, see
[configuration options](https://docs.mongodb.com/manual/reference/configuration-options).

You can also use the equivalent [``mongod``](https://docs.mongodb.com/manual/reference/program/mongod/#bin.mongod) options when starting your
mongod. See the [``mongod``](https://docs.mongodb.com/manual/reference/program/mongod/#bin.mongod) reference page for a complete list of
options.

Include additional settings as appropriate to your deployment.

At the end of this step, all secondaries and arbiters should be up and
running with internal authentication configured, but *without*
[``--transitionToAuth``](https://docs.mongodb.com/manual/reference/program/mongos/#cmdoption-transitiontoauth). Clients can only connect to these
[``mongod``](https://docs.mongodb.com/manual/reference/program/mongod/#bin.mongod) instances by using the configured client authentication
mechanism.


### Step 10: Step down and restart the primary replica set member *without* ``--transitionToAuth``.

Step down the [*primary*](https://docs.mongodb.com/manual/reference/glossary/#term-primary) member in the replica set, then restart it
without the [``--transitionToAuth``](https://docs.mongodb.com/manual/reference/program/mongos/#cmdoption-transitiontoauth) option.

Important: At the end of this step, clients not connecting with auth cannot connect to the replica set. Update clients to connect with authentication *before* completing this step to avoid loss of connectivity.


#### Step down the primary replica set member

Connect to the primary using a [``mongo``](https://docs.mongodb.com/manual/reference/program/mongo/#bin.mongo) shell and step down the
primary using the [``rs.stepDown()``](https://docs.mongodb.com/manual/reference/method/rs.stepDown/#rs.stepDown) method.

```javascript

rs.stepDown()

```


#### Shut down the old primary

Once the primary steps down and the replica set elects a new primary,
shut down the old primary [``mongod``](https://docs.mongodb.com/manual/reference/program/mongod/#bin.mongod).

From a [``mongo``](https://docs.mongodb.com/manual/reference/program/mongo/#bin.mongo) shell connected to the old primary, issue the
[``db.shutdownServer()``](https://docs.mongodb.com/manual/reference/method/db.shutdownServer/#db.shutdownServer) on the *admin* database.

```javascript

admin = db.getSiblingDB("admin")
admin.shutdownServer()

```


#### Restart the old primary without ``transitionToAuth``

Restart the [``mongod``](https://docs.mongodb.com/manual/reference/program/mongod/#bin.mongod), this time *without* the
[``--transitionToAuth``](https://docs.mongodb.com/manual/reference/program/mongos/#cmdoption-transitiontoauth) option and *with* internal authentication
mechanism such as ``--keyfile``.

Starting the [``mongod``](https://docs.mongodb.com/manual/reference/program/mongod/#bin.mongod) with [``--transitionToAuth``](https://docs.mongodb.com/manual/reference/program/mongos/#cmdoption-transitiontoauth) places
the instance in a transition state where it can accept and create both
authenticated and non-authenticated connections.

Specify the following settings in your [configuration file](https://docs.mongodb.com/manual/administration/configuration/#configuration-file).

* [``security.keyFile``](https://docs.mongodb.com/manual/reference/configuration-options/#security.keyFile), with the path to the keyfile.

* [``replication.replSetName``](https://docs.mongodb.com/manual/reference/configuration-options/#replication.replSetName) to the original replica set name.

```yaml

security:
  keyFile: <path-to-keyfile>
replication:
  replSetName: <replicaSetName>

```

Start the [``mongod``](https://docs.mongodb.com/manual/reference/program/mongod/#bin.mongod) using the configuration file:

```shell

mongod --config <path-to-config-file>

```

For more information on the configuration file, see
[configuration options](https://docs.mongodb.com/manual/reference/configuration-options).

You can also use the equivalent [``mongod``](https://docs.mongodb.com/manual/reference/program/mongod/#bin.mongod) options when starting your
mongod. See the [``mongod``](https://docs.mongodb.com/manual/reference/program/mongod/#bin.mongod) reference page for a complete list of
options.

Include additional settings as appropriate to your deployment.

At the end of this step, all members of the replica set should be up and
running with authentication enforced. Clients can only connect to these
[``mongod``](https://docs.mongodb.com/manual/reference/program/mongod/#bin.mongod) instances by using the configured client authentication
mechanism.


## x.509 Internal Authentication

For details on using x.509 for internal authentication, see
[Use x.509 Certificate for Membership Authentication](https://docs.mongodb.com/manual/tutorial/configure-x509-member-authentication).

To upgrade from keyfile internal authentication to x.509 internal
authentication, see
[Upgrade from Keyfile Authentication to x.509 Authentication](https://docs.mongodb.com/manual/tutorial/upgrade-keyfile-to-x509).
