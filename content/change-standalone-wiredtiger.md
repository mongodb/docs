+++
title = "Change Standalone to WiredTiger"

tags = [
"mongodb",
"administration",
"replication",
"beginner" ]
+++

# Change Standalone to WiredTiger

New in version 3.0: The WiredTiger storage engine is available.

Changed in version 3.2: WiredTiger is the new default storage engine for MongoDB.

This tutorial gives an overview of changing the storage engine of a
[*standalone*](https://docs.mongodb.com/manual/reference/glossary/#term-standalone) MongoDB instance to [WiredTiger](https://docs.mongodb.com/manual/core/wiredtiger/#storage-wiredtiger).


## Considerations

This tutorial uses the [``mongodump``](https://docs.mongodb.com/manual/reference/program/mongodump/#bin.mongodump) and [``mongorestore``](https://docs.mongodb.com/manual/reference/program/mongorestore/#bin.mongorestore)
utilities to export and import data. Ensure that these MongoDB package
components are installed and updated on your system. In addition, make
sure you have sufficient drive space available for the
[``mongodump``](https://docs.mongodb.com/manual/reference/program/mongodump/#bin.mongodump) export file and the data files of your new
[``mongod``](https://docs.mongodb.com/manual/reference/program/mongod/#bin.mongod) instance running with WiredTiger.

Note: Starting in MongoDB 3.6, MongoDB binaries, [``mongod``](https://docs.mongodb.com/manual/reference/program/mongod/#bin.mongod) and [``mongos``](https://docs.mongodb.com/manual/reference/program/mongos/#bin.mongos), bind to localhost by default. Previously, starting in MongoDB 2.6, only the binaries from the official MongoDB RPM (Red Hat, CentOS, Fedora Linux, and derivatives) and DEB (Debian, Ubuntu, and derivatives) packages bind to localhost by default. For more details, see [Localhost Binding Compatibility Changes](https://docs.mongodb.com/manual/release-notes/3.6-compatibility/#bind-ip-compatibility). The tutorial runs [``mongodump``](https://docs.mongodb.com/manual/reference/program/mongodump/#bin.mongodump) and [``mongorestore``](https://docs.mongodb.com/manual/reference/program/mongorestore/#bin.mongorestore) from the same host as the [``mongod``](https://docs.mongodb.com/manual/reference/program/mongod/#bin.mongod) they are connecting to. If run remotely, [``mongodump``](https://docs.mongodb.com/manual/reference/program/mongodump/#bin.mongodump) and [``mongorestore``](https://docs.mongodb.com/manual/reference/program/mongorestore/#bin.mongorestore) must specify the ip address or the associated hostname in order to connect to the [``mongod``](https://docs.mongodb.com/manual/reference/program/mongod/#bin.mongod).

You must be using MongoDB version 3.0 or greater in order to use the
WiredTiger storage engine. If upgrading from an earlier version of
MongoDB, see the guides on [Upgrading to MongoDB 3.0](../3.0-upgrade/) or [Upgrading to MongoDB 3.2](../3.2-upgrade/) before proceeding with changing your
storage engine.


## Procedure


### Step 1: Start the ``mongod`` you wish to change to WiredTiger.

If [``mongod``](https://docs.mongodb.com/manual/reference/program/mongod/#bin.mongod) is already running, you can skip this step.


### Step 2: Export data using ``mongodump``.

```sh

mongodump --out <exportDataDestination>

```

Specify additional options as appropriate, such as username and
password if running with authorization enabled. See
[``mongodump``](https://docs.mongodb.com/manual/reference/program/mongodump/#bin.mongodump) for available options.


### Step 3: Create a data directory for the new ``mongod`` running with WiredTiger.

Create a data directory for the new [``mongod``](https://docs.mongodb.com/manual/reference/program/mongod/#bin.mongod) instance that
will run with the WiredTiger storage engine. ``mongod`` must have read
and write permissions for this directory.

``mongod`` with WiredTiger will not start with data files created with
a different storage engine.


### Step 4: Start ``mongod`` with WiredTiger.

Start [``mongod``](https://docs.mongodb.com/manual/reference/program/mongod/#bin.mongod), specifying ``wiredTiger`` as the
[``--storageEngine``](https://docs.mongodb.com/manual/reference/program/mongod/#cmdoption-storageengine) and the newly created data directory for
WiredTiger as the [``--dbpath``](https://docs.mongodb.com/manual/reference/program/mongod/#cmdoption-dbpath). Specify additional options,
such as [``--bind_ip``](https://docs.mongodb.com/manual/reference/program/mongos/#cmdoption-bind-ip), as appropriate.

Warning: Before you bind to other ip addresses, consider [enabling access control](https://docs.mongodb.com/manual/administration/security-checklist/#checklist-auth) and other security measures listed in [Security Checklist](https://docs.mongodb.com/manual/administration/security-checklist) to prevent unauthorized access.

```sh

mongod --storageEngine wiredTiger --dbpath <newWiredTigerDBPath> --bind_ip localhost,<ipaddresses>

```

You can also specify the options in a [configuration file](https://docs.mongodb.com/manual/reference/configuration-options). To specify the storage engine, use
the [``storage.engine``](https://docs.mongodb.com/manual/reference/configuration-options/#storage.engine) setting.


### Step 5: Upload the exported data using ``mongorestore``.

```sh

mongorestore <exportDataDestination>

```

Specify additional options as appropriate. See
[``mongorestore``](https://docs.mongodb.com/manual/reference/program/mongorestore/#bin.mongorestore) for available options.
