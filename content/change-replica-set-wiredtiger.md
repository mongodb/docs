+++
title = "Change Replica Set to WiredTiger"

tags = [
"mongodb",
"administration",
"replication",
"beginner" ]
+++

# Change Replica Set to WiredTiger

New in version 3.0: The WiredTiger storage engine is available. Also, replica sets may
have members with different storage engines.

Changed in version 3.2: WiredTiger is the new default storage engine for MongoDB.

This tutorial gives an overview of changing the storage engine of a
member of a [*replica set*](https://docs.mongodb.com/manual/reference/glossary/#term-replica-set) to [WiredTiger](https://docs.mongodb.com/manual/core/wiredtiger/#storage-wiredtiger).


## Considerations

Replica sets can have members with different storage engines. As such,
you can update members to use the WiredTiger storage engine in a rolling
fashion. Before changing all the members to use WiredTiger, you may
prefer to run with mixed storage engines for some period. However,
performance can vary according to workload.

You must be using MongoDB version 3.0 or greater in order to use the
WiredTiger storage engine. If upgrading from an earlier version of
MongoDB, see the guides on [Upgrading to MongoDB 3.0](3.0-upgrade/) or [Upgrading to MongoDB 3.2](3.2-upgrade/) before proceeding with changing your
storage engine.

Before enabling the new WiredTiger storage engine, ensure that all
replica set/sharded cluster members are running at least MongoDB
version 2.6.8, and preferably version 3.0.0 or newer.


## Procedure

This procedure completely removes a [*secondary*](https://docs.mongodb.com/manual/reference/glossary/#term-secondary) replica set
member's data, starts [``mongod``](https://docs.mongodb.com/manual/reference/program/mongod/#bin.mongod) with WiredTiger, and performs an
[initial sync](https://docs.mongodb.com/manual/tutorial/resync-replica-set-member).

To update all members of the replica set to use WiredTiger, update the
[*secondary*](https://docs.mongodb.com/manual/reference/glossary/#term-secondary) members first. Then step down the [*primary*](https://docs.mongodb.com/manual/reference/glossary/#term-primary), and
update the stepped-down member.


### Step 1: Shut down the secondary member.

In the [``mongo``](https://docs.mongodb.com/manual/reference/program/mongo/#bin.mongo) shell, shut down the secondary [``mongod``](https://docs.mongodb.com/manual/reference/program/mongod/#bin.mongod)
instance you wish to upgrade.

```sh

db.shutdownServer()

```


### Step 2: Prepare a data directory for the new ``mongod`` running with WiredTiger.

Prepare a data directory for the new [``mongod``](https://docs.mongodb.com/manual/reference/program/mongod/#bin.mongod) instance that
will run with the WiredTiger storage engine. ``mongod`` must have read
and write permissions for this directory. You can either delete the
contents of the stopped secondary member's current data directory or
create a new directory entirely.

``mongod`` with WiredTiger will not start with data files created with
a different storage engine.


### Step 3: Start ``mongod`` with WiredTiger.

Start [``mongod``](https://docs.mongodb.com/manual/reference/program/mongod/#bin.mongod), specifying ``wiredTiger`` as the
[``--storageEngine``](https://docs.mongodb.com/manual/reference/program/mongod/#cmdoption-storageengine) and the prepared data directory for
WiredTiger as the [``--dbpath``](https://docs.mongodb.com/manual/reference/program/mongod/#cmdoption-dbpath). Specify additional options as
appropriate for this replica set member.

```sh

mongod --storageEngine wiredTiger --dbpath <newWiredTigerDBPath> --replSet <replSetName>

```

Since no data exists in the ``--dbpath``, the ``mongod`` will perform an
[initial sync](https://docs.mongodb.com/manual/tutorial/resync-replica-set-member). The length of the
initial sync process depends on the size of the database and network
connection between members of the replica set.

You can also specify the options in a [configuration file](https://docs.mongodb.com/manual/reference/configuration-options). To specify the storage engine, use
the [``storage.engine``](https://docs.mongodb.com/manual/reference/configuration-options/#storage.engine) setting.


### Step 4: Repeat the procedure for other replica set secondaries you wish to upgrade.

Perform this procedure again for the rest of the [*secondary
members*](https://docs.mongodb.com/manual/reference/glossary/#term-secondary) of the replica set you wish to use the WiredTiger
storage engine.
