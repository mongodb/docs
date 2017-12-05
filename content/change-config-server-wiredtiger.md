+++
title = "Change Config Servers to WiredTiger"

tags = [
"mongodb",
"administration",
"sharding",
"advanced" ]
+++

# Change Config Servers to WiredTiger

New in version 3.0: The WiredTiger storage engine is available.

Changed in version 3.2: WiredTiger is the new default storage engine for MongoDB.

This tutorial gives an overview of changing the storage engine of the
[*config servers*](https://docs.mongodb.com/manual/reference/glossary/#term-config-server) in a [*sharded cluster*](https://docs.mongodb.com/manual/reference/glossary/#term-sharded-cluster) to
[WiredTiger](https://docs.mongodb.com/manual/core/wiredtiger/#storage-wiredtiger).


## Considerations

You may safely continue to use [MMAPv1](https://docs.mongodb.com/manual/core/mmapv1/#storage-mmapv1) for the
[*config servers*](https://docs.mongodb.com/manual/reference/glossary/#term-config-server) even if one or more [*shards*](https://docs.mongodb.com/manual/reference/glossary/#term-shard) in the [*sharded cluster*](https://docs.mongodb.com/manual/reference/glossary/#term-sharded-cluster) are using the WiredTiger storage
engine. If you do choose to update the config servers to use WiredTiger, you
must update **all three**.

You must be using MongoDB version 3.0 or greater in order to use the
WiredTiger storage engine. If upgrading from an earlier version of
MongoDB, see the guides on [Upgrading to MongoDB 3.0](../3.0-upgrade/) or [Upgrading to MongoDB 3.2](../3.2-upgrade/) before proceeding with changing your
storage engine.

Note: Starting in MongoDB 3.6, MongoDB binaries, [``mongod``](https://docs.mongodb.com/manual/reference/program/mongod/#bin.mongod) and [``mongos``](https://docs.mongodb.com/manual/reference/program/mongos/#bin.mongos), bind to localhost by default. Previously, starting in MongoDB 2.6, only the binaries from the official MongoDB RPM (Red Hat, CentOS, Fedora Linux, and derivatives) and DEB (Debian, Ubuntu, and derivatives) packages bind to localhost by default. For more details, see [Localhost Binding Compatibility Changes](https://docs.mongodb.com/manual/release-notes/3.6-compatibility/#bind-ip-compatibility). The tutorial runs [``mongodump``](https://docs.mongodb.com/manual/reference/program/mongodump/#bin.mongodump) and [``mongorestore``](https://docs.mongodb.com/manual/reference/program/mongorestore/#bin.mongorestore) from the same host as the [``mongod``](https://docs.mongodb.com/manual/reference/program/mongod/#bin.mongod) they are connecting to. If run remotely, [``mongodump``](https://docs.mongodb.com/manual/reference/program/mongodump/#bin.mongodump) and [``mongorestore``](https://docs.mongodb.com/manual/reference/program/mongorestore/#bin.mongorestore) must specify the ip address or the associated hostname in order to connect to the [``mongod``](https://docs.mongodb.com/manual/reference/program/mongod/#bin.mongod).


## Procedure

This tutorial assumes that you have three config servers for this
sharded cluster. The three servers are named **first**, **second**, and
**third**, based on their position in the [``mongos``](https://docs.mongodb.com/manual/reference/program/mongos/#bin.mongos)
[``configDB``](https://docs.mongodb.com/manual/reference/configuration-options/#sharding.configDB) setting.

Important: During this process, at most only two config servers will be running at any given time to ensure that the sharded cluster's metadata is **read-only**.


### Step 1: Disable the balancer.

```sh

sh.disableBalancer()

```

Turn off the [balancer](https://docs.mongodb.com/manual/core/sharding-balancer-administration/#sharding-balancing-internals) in the
sharded cluster, as described in
[Disable the Balancer](https://docs.mongodb.com/manual/tutorial/manage-sharded-cluster-balancer/#sharding-balancing-disable-temporarily).


### Step 2: Shut down the **third** config server to ensure read-only metadata.

Connect a [``mongo``](https://docs.mongodb.com/manual/reference/program/mongo/#bin.mongo) shell to the **third** config server and
use [``db.shutdownServer()``](https://docs.mongodb.com/manual/reference/method/db.shutdownServer/#db.shutdownServer) to shut down the **third** config
server.

The **third** config server is the last one listed in the
[``mongos``](https://docs.mongodb.com/manual/reference/program/mongos/#bin.mongos) [``configDB``](https://docs.mongodb.com/manual/reference/configuration-options/#sharding.configDB) setting.

```sh

db.shutdownServer()

```


### Step 3: Export the data of the **second** config server with ``mongodump``.

While the **third** config server is down to ensure the config servers
are read-only, prepare to upgrade the **second** config server to use
WiredTiger. The **second** config server is the second server listed in the
[``mongos``](https://docs.mongodb.com/manual/reference/program/mongos/#bin.mongos) setting [``configDB``](https://docs.mongodb.com/manual/reference/configuration-options/#sharding.configDB).

Export the data of the **second** config server with [``mongodump``](https://docs.mongodb.com/manual/reference/program/mongodump/#bin.mongodump).

```sh

mongodump --out <exportDataDestination>

```

Specify additional options as appropriate, such as username and
password if running with authorization enabled. See
[``mongodump``](https://docs.mongodb.com/manual/reference/program/mongodump/#bin.mongodump) for available options.


### Step 4: For the **second** config server, create a new data directory for use with WiredTiger.

Create a data directory in preparation for having the **second** config
server run with WiredTiger. ``mongod`` will not start
if the [``--dbpath``](https://docs.mongodb.com/manual/reference/program/mongod/#cmdoption-dbpath) directory contains data files created with
a different storage engine.

``mongod`` must have read and write permissions for the new directory.


### Step 5: Stop the **second** config server.

Connect a [``mongo``](https://docs.mongodb.com/manual/reference/program/mongo/#bin.mongo) shell to the **second** config server and use
[``db.shutdownServer()``](https://docs.mongodb.com/manual/reference/method/db.shutdownServer/#db.shutdownServer) to shut down the **second** config server.

```sh

db.shutdownServer()

```


### Step 6: Start the **second** config server ``mongod`` with the WiredTiger storage engine option.

Start [``mongod``](https://docs.mongodb.com/manual/reference/program/mongod/#bin.mongod) as a config server, specifying ``wiredTiger``
as the [``--storageEngine``](https://docs.mongodb.com/manual/reference/program/mongod/#cmdoption-storageengine) and the newly created data directory
for WiredTiger as the [``--dbpath``](https://docs.mongodb.com/manual/reference/program/mongod/#cmdoption-dbpath).  Specify additional options,
such as [``--bind_ip``](https://docs.mongodb.com/manual/reference/program/mongos/#cmdoption-bind-ip) as appropriate.

Warning: Before you bind to other ip addresses, consider [enabling access control](https://docs.mongodb.com/manual/administration/security-checklist/#checklist-auth) and other security measures listed in [Security Checklist](https://docs.mongodb.com/manual/administration/security-checklist) to prevent unauthorized access.

```sh

mongod --storageEngine wiredTiger --dbpath <newWiredTigerDBPath> --configsvr --bind_ip localhost,<ipaddresses>

```

You can also specify the options in a [configuration file](https://docs.mongodb.com/manual/reference/configuration-options). To specify the storage engine, use
the [``storage.engine``](https://docs.mongodb.com/manual/reference/configuration-options/#storage.engine) setting.


### Step 7: Upload the exported data using ``mongorestore`` to the **second** config server.

Use [``mongorestore``](https://docs.mongodb.com/manual/reference/program/mongorestore/#bin.mongorestore) to upload the exported data. Specify
additional options as appropriate. See [``mongorestore``](https://docs.mongodb.com/manual/reference/program/mongorestore/#bin.mongorestore) for
available options.

```sh

mongorestore <exportDataDestination>

```

When the [``mongorestore``](https://docs.mongodb.com/manual/reference/program/mongorestore/#bin.mongorestore) finishes, the **second** config server
upgrade to use WiredTiger is complete.


### Step 8: Shut down the **second** config server to ensure read-only metadata.

When the **second** config server upgrade is complete, shut down the
**second** config server in preparation to upgrade the other config
servers. This is necessary to maintain at most only two active config
servers and keep the sharded cluster's metadata read-only.

Connect a [``mongo``](https://docs.mongodb.com/manual/reference/program/mongo/#bin.mongo) shell to the **second** config server and use
[``db.shutdownServer()``](https://docs.mongodb.com/manual/reference/method/db.shutdownServer/#db.shutdownServer) to shut down the **second** config server.

```sh

db.shutdownServer()

```


### Step 9: Restart the **third** config server to prepare for its upgrade.

Restart the **third** config server with its original storage engin and dbpath startup
options. **Do not** change its options to use the WiredTiger storage engine
at this point.

```sh

mongod --configsvr --dbpath <existingDBPath> --bind_ip localhost,<ipaddresses>

```

Include any other options in use for the third config server.


### Step 10: Export the data of the **third** config server with ``mongodump``.

```sh

mongodump --out <exportDataDestination>

```

Specify additional options as appropriate, such as username and
password if running with authorization enabled. See
[``mongodump``](https://docs.mongodb.com/manual/reference/program/mongodump/#bin.mongodump) for available options.


### Step 11: For the **third** config server, create a new data directory for use with WiredTiger.

Create a data directory in preparation for having the **third** config
server run with WiredTiger. ``mongod`` will not start
if the [``--dbpath``](https://docs.mongodb.com/manual/reference/program/mongod/#cmdoption-dbpath) directory contains data files created with
a different storage engine.

``mongod`` must have read and write permissions for the new directory.


### Step 12: Stop the **third** config server.

Connect a [``mongo``](https://docs.mongodb.com/manual/reference/program/mongo/#bin.mongo) shell to the **third** config server and use
[``db.shutdownServer()``](https://docs.mongodb.com/manual/reference/method/db.shutdownServer/#db.shutdownServer) to shut down the **third** config server.

```sh

db.shutdownServer()

```


### Step 13: Start the **third** config server with the WiredTiger storage engine option.

Start [``mongod``](https://docs.mongodb.com/manual/reference/program/mongod/#bin.mongod) as a config server, specifying ``wiredTiger``
as the [``--storageEngine``](https://docs.mongodb.com/manual/reference/program/mongod/#cmdoption-storageengine) and the newly created data directory
for WiredTiger as the [``--dbpath``](https://docs.mongodb.com/manual/reference/program/mongod/#cmdoption-dbpath).  Specify additional options,
such as [``--bind_ip``](https://docs.mongodb.com/manual/reference/program/mongos/#cmdoption-bind-ip) as appropriate.

```sh

mongod --storageEngine wiredTiger --dbpath <newWiredTigerDBPath> --configsvr --bind_ip localhost,<ipaddresses>

```

You can also specify the options in a [configuration file](https://docs.mongodb.com/manual/reference/configuration-options). To specify the storage engine, use
the [``storage.engine``](https://docs.mongodb.com/manual/reference/configuration-options/#storage.engine) setting.


### Step 14: Upload the exported data using ``mongorestore`` to the **third** config server.

Use [``mongorestore``](https://docs.mongodb.com/manual/reference/program/mongorestore/#bin.mongorestore) to upload the exported data. Specify
additional options as appropriate. See [``mongorestore``](https://docs.mongodb.com/manual/reference/program/mongorestore/#bin.mongorestore) for
available options.

```sh

mongorestore <exportDataDestination>

```

When the [``mongorestore``](https://docs.mongodb.com/manual/reference/program/mongorestore/#bin.mongorestore) finishes, the **third** config server
upgrade to use WiredTiger is complete.


### Step 15: Export data of the **first** config server with ``mongodump``.

To prepare for the upgrade of the **first** config server to use
WiredTiger, export the data of the **first** config server with
[``mongodump``](https://docs.mongodb.com/manual/reference/program/mongodump/#bin.mongodump).

```sh

mongodump --out <exportDataDestination>

```

Specify additional options as appropriate, such as username and
password if running with authorization enabled. See
[``mongodump``](https://docs.mongodb.com/manual/reference/program/mongodump/#bin.mongodump) for available options.


### Step 16: For the **first** config server, create a new data directory for use with WiredTiger.

Create a data directory in preparation for having the **first** config
server run with WiredTiger. ``mongod`` will not start if the
[``--dbpath``](https://docs.mongodb.com/manual/reference/program/mongod/#cmdoption-dbpath) directory contains data files created with a
different storage engine.

``mongod`` must have read and write permissions for the new directory.


### Step 17: Stop the **first** config server.

Connect a [``mongo``](https://docs.mongodb.com/manual/reference/program/mongo/#bin.mongo) shell to the **first** config server and use
[``db.shutdownServer()``](https://docs.mongodb.com/manual/reference/method/db.shutdownServer/#db.shutdownServer) to shut down the **first** config server.

```sh

db.shutdownServer()

```


### Step 18: Start the **first** config server with the WiredTiger storage engine option.

Start [``mongod``](https://docs.mongodb.com/manual/reference/program/mongod/#bin.mongod) as a config server, specifying ``wiredTiger``
as the [``--storageEngine``](https://docs.mongodb.com/manual/reference/program/mongod/#cmdoption-storageengine) and the newly created data directory
for WiredTiger as the [``--dbpath``](https://docs.mongodb.com/manual/reference/program/mongod/#cmdoption-dbpath). Specify additional options,
such as [``--bind_ip``](https://docs.mongodb.com/manual/reference/program/mongos/#cmdoption-bind-ip) as appropriate.

```sh

mongod --storageEngine wiredTiger --dbpath <newWiredTigerDBPath> --configsvr --bind_ip localhost,<ipaddresses>

```

You can also specify the options in a [configuration file](https://docs.mongodb.com/manual/reference/configuration-options). To specify the storage engine, use
the [``storage.engine``](https://docs.mongodb.com/manual/reference/configuration-options/#storage.engine) setting.


### Step 19: Upload the exported data using ``mongorestore`` to the **first** config server.

Use [``mongorestore``](https://docs.mongodb.com/manual/reference/program/mongorestore/#bin.mongorestore) to upload the exported data. Specify
additional options as appropriate. See [``mongorestore``](https://docs.mongodb.com/manual/reference/program/mongorestore/#bin.mongorestore) for
available options.

```sh

mongorestore <exportDataDestination>

```

When the [``mongorestore``](https://docs.mongodb.com/manual/reference/program/mongorestore/#bin.mongorestore) finishes, the **first** config server
upgrade to use WiredTiger is complete.


### Step 20: Restart the **second** config server to enable writes to the sharded cluster's metadata.

Restart the **second** config server, specifying WiredTiger as the
[``--storageEngine``](https://docs.mongodb.com/manual/reference/program/mongod/#cmdoption-storageengine) and the newly created WiredTiger data
directory as the [``--dbpath``](https://docs.mongodb.com/manual/reference/program/mongod/#cmdoption-dbpath). Specify additional options,
such as [``--bind_ip``](https://docs.mongodb.com/manual/reference/program/mongos/#cmdoption-bind-ip) as appropriate.

```sh

mongod --storageEngine wiredTiger --dbpath <newWiredTigerDBPath> --configsvr --bind_ip localhost,<ipaddresses>

```

You can also specify the options in a [configuration file](https://docs.mongodb.com/manual/reference/configuration-options). To specify the storage engine, use
the [``storage.engine``](https://docs.mongodb.com/manual/reference/configuration-options/#storage.engine) setting.

Once all three config servers are up, the sharded cluster's metadata
is available for writes.


### Step 21: Re-enable the balancer.

Once all three config servers are up and running with WiredTiger,
[re-enable the balancer](https://docs.mongodb.com/manual/tutorial/manage-sharded-cluster-balancer/#sharding-balancing-enable).

```sh

sh.startBalancer()

```
