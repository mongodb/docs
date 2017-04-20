+++
title = "Change Replica Set to WiredTiger"

[tags]
mongodb = "product"
+++
# Change Replica Set to WiredTiger


New in version 3.0: The WiredTiger storage engine is available. Also, replica sets may
have members with different storage engines.

Changed in version 3.2: WiredTiger is the new default storage engine for MongoDB.

This tutorial gives an overview of changing the storage engine of a
member of a [*replica set*](#term-replica-set) to [WiredTiger](#storage-wiredtiger).


## Considerations

Replica sets can have members with different storage engines. As such,
you can update members to use the WiredTiger storage engine in a rolling
fashion. Before changing all the members to use WiredTiger, you may
prefer to run with mixed storage engines for some period. However,
performance can vary according to workload.

You must be using MongoDB version 3.0 or greater in order to use the
WiredTiger storage engine. If upgrading from an earlier version of
MongoDB, see the guides on [Upgrading to MongoDB 3.0](#) or [Upgrading to MongoDB 3.2](#) before proceeding with changing your
storage engine.

Before enabling the new WiredTiger storage engine, ensure that all
replica set/sharded cluster members are running at least MongoDB
version 2.6.8, and preferably version 3.0.0 or newer.


## Procedure

This procedure completely removes a [*secondary*](#term-secondary) replica set
member's data, starts [``mongod``](#bin.mongod) with WiredTiger, and performs an
[initial sync](#).

To update all members of the replica set to use WiredTiger, update the
[*secondary*](#term-secondary) members first. Then step down the [*primary*](#term-primary), and
update the stepped-down member.


### Step 1: Shut down the secondary member.

In the [``mongo``](#bin.mongo) shell, shut down the secondary [``mongod``](#bin.mongod)
instance you wish to upgrade.

```sh

db.shutdownServer()

```


### Step 2: Prepare a data directory for the new ``mongod`` running with WiredTiger.

Prepare a data directory for the new [``mongod``](#bin.mongod) instance that
will run with the WiredTiger storage engine. ``mongod`` must have read
and write permissions for this directory. You can either delete the
contents of the stopped secondary member's current data directory or
create a new directory entirely.

``mongod`` with WiredTiger will not start with data files created with
a different storage engine.


### Step 3: Start ``mongod`` with WiredTiger.

Start [``mongod``](#bin.mongod), specifying ``wiredTiger`` as the
[``--storageEngine``](#cmdoption-storageengine) and the prepared data directory for
WiredTiger as the [``--dbpath``](#cmdoption-dbpath). Specify additional options as
appropriate for this replica set member.

```sh

mongod --storageEngine wiredTiger --dbpath <newWiredTigerDBPath> --replSet <replSetName>

```

Since no data exists in the ``--dbpath``, the ``mongod`` will perform an
[initial sync](#). The length of the
initial sync process depends on the size of the database and network
connection between members of the replica set.

You can also specify the options in a [configuration file](#). To specify the storage engine, use
the [``storage.engine``](#storage.engine) setting.


### Step 4: Repeat the procedure for other replica set secondaries you wish to upgrade.

Perform this procedure again for the rest of the [*secondary
members*](#term-secondary) of the replica set you wish to use the WiredTiger
storage engine.
