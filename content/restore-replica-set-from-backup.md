+++
title = "Restore a Replica Set from MongoDB Backups"

tags = [
"mongodb",
"administration",
"replication",
"intermediate" ]
+++

# Restore a Replica Set from MongoDB Backups

This procedure outlines the process for taking MongoDB data and
restoring that data into a new [*replica set*](https://docs.mongodb.com/manual/reference/glossary/#term-replica-set). Use this approach
for seeding test deployments from production backups or as part
of disaster recovery.

Important: You *cannot* restore a single data set to three new [``mongod``](https://docs.mongodb.com/manual/reference/program/mongod/#bin.mongod) instances and **then** create a replica set. If you copy the data set to each [``mongod``](https://docs.mongodb.com/manual/reference/program/mongod/#bin.mongod) instance and then create the replica set, MongoDB will force the secondaries to perform an [*initial sync*](https://docs.mongodb.com/manual/reference/glossary/#term-initial-sync). The procedures in this document describe the correct and efficient ways to deploy a restored replica set.

You can also use [``mongorestore``](https://docs.mongodb.com/manual/reference/program/mongorestore/#bin.mongorestore) to restore database files
using data created with [``mongodump``](https://docs.mongodb.com/manual/reference/program/mongodump/#bin.mongodump). See
[Back Up and Restore with MongoDB Tools](https://docs.mongodb.com/manual/tutorial/backup-and-restore-tools) for more information.


## Restore Database into a Single Node Replica Set


### Step 1: Obtain backup MongoDB Database files.

The backup files may come from a [file system snapshot](../backup-with-filesystem-snapshots/). The [MongoDB Cloud Manager](https://www.mongodb.com/cloud/cloud-manager/?jmp=docs)
produces MongoDB database files for [stored snapshots](https://docs.cloudmanager.mongodb.com/tutorial/restore-from-snapshot/) and [point in time
snapshots](https://docs.cloudmanager.mongodb.com/tutorial/restore-from-point-in-time-snapshot/).
For [Ops Manager, an on-premise solution available in
MongoDB Enterprise Advanced](https://www.mongodb.com/products/mongodb-enterprise-advanced?jmp=docs),
see also the [Ops Manager Backup overview](https://docs.opsmanager.mongodb.com/current/core/backup-overview).


### Step 2: Start a [``mongod``](https://docs.mongodb.com/manual/reference/program/mongod/#bin.mongod) using data files from the backup as the data path.

Start a [``mongod``](https://docs.mongodb.com/manual/reference/program/mongod/#bin.mongod) instance for a new single-node replica set.
Specify the path to the backup data files with ``--dbpath`` option
and the replica set name with the ``--replSet`` option.
For [config server replica set (CSRS)](https://docs.mongodb.com/manual/core/sharded-cluster-config-servers/#csrs),
include the [``--configsvr``](https://docs.mongodb.com/manual/reference/program/mongod/#cmdoption-configsvr) option.

```sh

mongod --dbpath /data/db --replSet <replName>

```

Note: *New in version 3.6:* All MongoDB collections have UUIDs (Universally unique identifiers) by default. When MongoDB restores collections, the restored collections retain their original UUIDs. When restoring a collection where no UUID was present, MongoDB generates a UUID for the restored collection. For more information on collection UUIDs, see [Collections](https://docs.mongodb.com/v3.6/core/databases-and-collections/#collections).


### Step 3: Connect a [``mongo``](https://docs.mongodb.com/manual/reference/program/mongo/#bin.mongo) shell to the ``mongod`` instance.

From the same machine where one of the [``mongod``](https://docs.mongodb.com/manual/reference/program/mongod/#bin.mongod) is running
(in this tutorial, ``mongodb0.example.net``), start the [``mongo``](https://docs.mongodb.com/manual/reference/program/mongo/#bin.mongo)
shell. To connect to the [``mongod``](https://docs.mongodb.com/manual/reference/program/mongod/#bin.mongod) listening to localhost on
the default port of ``27017``, simply issue:

```sh

mongo

```

Depending on your path, you may need to specify the path to the
[``mongo``](https://docs.mongodb.com/manual/reference/program/mongo/#bin.mongo) binary.


### Step 4: Initiate the new replica set.

Use [``rs.initiate()``](https://docs.mongodb.com/manual/reference/method/rs.initiate/#rs.initiate) on *one and only one* member of the replica set:

```javascript

rs.initiate( {
   _id : <replName>,
   members: [ { _id : 0, host : <host:port> } ]
})

```

MongoDB initiates a set that consists of the current member and that
uses the default replica set configuration.


## Add Members to the Replica Set

MongoDB provides two options for restoring secondary members of a
replica set:

* [Manually copy the database files](#restore-rs-copy-db-files) to each data directory.

* [Allow initial sync](#restore-rs-initial-sync) to distribute data automatically.

Note: If your database is large, initial sync can take a long time to complete. For large databases, it might be preferable to copy the database files onto each host.

<span id="restore-rs-copy-db-files"></span>


### Copy Database Files and Restart [``mongod``](https://docs.mongodb.com/manual/reference/program/mongod/#bin.mongod) Instance

Use the following sequence of operations to "seed" additional members
of the replica set with the restored data by copying MongoDB data
files directly.

<span id="restore-rs-initial-sync"></span>


### Step 1: Shut down the [``mongod``](https://docs.mongodb.com/manual/reference/program/mongod/#bin.mongod) instance that you restored.

Use ``--shutdown`` or
[``db.shutdownServer()``](https://docs.mongodb.com/manual/reference/method/db.shutdownServer/#db.shutdownServer) to ensure a clean shut down.


### Step 2: Copy the primary's data directory to each secondary.

Copy the [*primary's*](https://docs.mongodb.com/manual/reference/glossary/#term-primary) data directory into the
[``dbPath``](https://docs.mongodb.com/manual/reference/configuration-options/#storage.dbPath) of the other members of the replica set. The
[``dbPath``](https://docs.mongodb.com/manual/reference/configuration-options/#storage.dbPath) is ``/data/db`` by default.


### Step 3: Start the [``mongod``](https://docs.mongodb.com/manual/reference/program/mongod/#bin.mongod) instance that you restored.


### Step 4: Add the secondaries to the replica set.

In a [``mongo``](https://docs.mongodb.com/manual/reference/program/mongo/#bin.mongo) shell connected to the [*primary*](https://docs.mongodb.com/manual/reference/glossary/#term-primary), add the
[*secondaries*](https://docs.mongodb.com/manual/reference/glossary/#term-secondary) to the replica set using
[``rs.add()``](https://docs.mongodb.com/manual/reference/method/rs.add/#rs.add). See [Deploy a Replica Set](../deploy-replica-set/) for more
information about deploying a replica set.


### Update Secondaries using Initial Sync

Use the following sequence of operations to "seed" additional members
of the replica set with the restored data using the default [initial
sync](https://docs.mongodb.com/manual/core/replica-set-sync/#replica-set-initial-sync) operation.


### Step 1: Ensure that the data directories on the prospective replica set members are empty.


### Step 2: Add each prospective member to the replica set.

When you add a member to the replica set, [Initial Sync](https://docs.mongodb.com/manual/core/replica-set-sync/#replica-set-initial-sync) copies the data from the [*primary*](https://docs.mongodb.com/manual/reference/glossary/#term-primary) to
the new member.
