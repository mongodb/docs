+++
title = "Perform Maintenance on Replica Set Members"

[tags]
mongodb = "product"
+++

# Perform Maintenance on Replica Set Members


## Overview

[*Replica sets*](https://docs.mongodb.com/manual/reference/glossary/#term-replica-set) allow a MongoDB deployment to
remain available during the majority of a maintenance window.

This document outlines the basic procedure for performing maintenance on
each of the members of a replica set. Furthermore, this particular
sequence strives to minimize the amount of time that the
[*primary*](https://docs.mongodb.com/manual/reference/glossary/#term-primary) is unavailable and controlling the impact on the
entire deployment.

Use these steps as the basis for common replica set operations,
particularly for procedures such as [upgrading to the latest
version of MongoDB](https://docs.mongodb.com/manual/tutorial/upgrade-revision) and [changing
the size of the oplog](https://docs.mongodb.com/manual/tutorial/change-oplog-size).


## Procedure

For each member of a replica set, starting with a secondary member,
perform the following sequence of events, ending with the primary:

* Restart the [``mongod``](https://docs.mongodb.com/manual/reference/program/mongod/#bin.mongod) instance as a standalone.

* Perform the task on the standalone instance.

* Restart the [``mongod``](https://docs.mongodb.com/manual/reference/program/mongod/#bin.mongod) instance as a member of the replica set.


### Step 1: Stop a secondary.

In the [``mongo``](https://docs.mongodb.com/manual/reference/program/mongo/#bin.mongo) shell, shut down the [``mongod``](https://docs.mongodb.com/manual/reference/program/mongod/#bin.mongod) instance:

```javascript

db.shutdownServer()

```


### Step 2: Restart the secondary as a standalone on a different port.

At the operating system shell prompt, restart [``mongod``](https://docs.mongodb.com/manual/reference/program/mongod/#bin.mongod)
as a standalone instance running on a different port and *without*
the ``--replSet`` parameter:

```sh

mongod --port 37017 --dbpath /srv/mongodb

```

Always start [``mongod``](https://docs.mongodb.com/manual/reference/program/mongod/#bin.mongod) with the same user, even when
restarting a replica set member as a standalone instance.


### Step 3: Perform maintenance operations on the secondary.

While the member is a standalone, use the [``mongo``](https://docs.mongodb.com/manual/reference/program/mongo/#bin.mongo) shell to
perform maintenance:

```sh

mongo --port 37017

```


### Step 4: Restart ``mongod`` as a member of the replica set.

After performing all maintenance tasks, use the following procedure
to restart the [``mongod``](https://docs.mongodb.com/manual/reference/program/mongod/#bin.mongod) as a member of the replica set
on its usual port.

From the [``mongo``](https://docs.mongodb.com/manual/reference/program/mongo/#bin.mongo) shell, shut down the standalone
server after completing the maintenance:

```javascript

db.shutdownServer()

```

Restart the [``mongod``](https://docs.mongodb.com/manual/reference/program/mongod/#bin.mongod) instance as a member of
the replica set using its normal command-line arguments or
configuration file.

The secondary takes time to [catch up to the primary](https://docs.mongodb.com/manual/core/replica-set-sync). From the [``mongo``](https://docs.mongodb.com/manual/reference/program/mongo/#bin.mongo) shell, use the
following command to verify that the member has caught up from the
[``RECOVERING``](https://docs.mongodb.com/manual/reference/replica-states/#replstate.RECOVERING) state to the [``SECONDARY``](https://docs.mongodb.com/manual/reference/replica-states/#replstate.SECONDARY) state.

```javascript

rs.status()

```


### Step 5: Perform maintenance on the primary last.

To perform maintenance on the primary after completing maintenance
tasks on all secondaries, use [``rs.stepDown()``](https://docs.mongodb.com/manual/reference/method/rs.stepDown/#rs.stepDown) in the
[``mongo``](https://docs.mongodb.com/manual/reference/program/mongo/#bin.mongo) shell to step down the primary and allow one of
the secondaries to be elected the new primary. Specify a 300 second
waiting period to prevent the member from being elected primary again
for five minutes:

```javascript

rs.stepDown(300)

```

After the primary steps down, the replica set will elect a new
primary. See [Replica Set Elections](https://docs.mongodb.com/manual/core/replica-set-elections) for more
information about replica set elections.
