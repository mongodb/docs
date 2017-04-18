+++
title = "Restore a Replica Set from MongoDB Backups"

[tags]
mongodb = "product"
+++
# Restore a Replica Set from MongoDB Backups


# On this page

* [Restore Database into a Single Node Replica Set](#restore-database-into-a-single-node-replica-set) 

* [Add Members to the Replica Set](#add-members-to-the-replica-set) 

This procedure outlines the process for taking MongoDB data and
restoring that data into a new [*replica set*](#term-replica-set). Use this approach
for seeding test deployments from production backups or as part
of disaster recovery.

Important: You *cannot* restore a single data set to three new [``mongod``](#bin.mongod) instances and **then** create a replica set. If you copy the data set to each [``mongod``](#bin.mongod) instance and then create the replica set, MongoDB will force the secondaries to perform an [*initial sync*](#term-initial-sync). The procedures in this document describe the correct and efficient ways to deploy a restored replica set. 

You can also use [``mongorestore``](#bin.mongorestore) to restore database files
using data created with [``mongodump``](#bin.mongodump). See
[Back Up and Restore with MongoDB Tools](#) for more information.


## Restore Database into a Single Node Replica Set


### Step 1: Obtain backup MongoDB Database files.

The backup files may come from a [file system snapshot](#). The [MongoDB Cloud Manager](https://www.mongodb.com/cloud/cloud-manager/?jmp=docs)
produces MongoDB database files for [stored snapshots](https://docs.cloudmanager.mongodb.com/tutorial/restore-from-snapshot/) and [point in time
snapshots](https://docs.cloudmanager.mongodb.com/tutorial/restore-from-point-in-time-snapshot/).
For [Ops Manager, an on-premise solution available in
MongoDB Enterprise Advanced](https://www.mongodb.com/products/mongodb-enterprise-advanced?jmp=docs),
see also the [Ops Manager Backup overview](https://docs.opsmanager.mongodb.com/current/core/backup-overview).


### Step 2: Start a [``mongod``](#bin.mongod) using data files from the backup as the data path.

Start a [``mongod``](#bin.mongod) instance for a new single-node replica set.
Specify the path to the backup data files with ``--dbpath`` option
and the replica set name with the ``--replSet`` option.
For [config server replica set (CSRS)](#csrs),
include the [``--configsvr``](#cmdoption-configsvr) option.

```sh

mongod --dbpath /data/db --replSet <replName>

```


### Step 3: Connect a [``mongo``](#bin.mongo) shell to the ``mongod`` instance.

For example, to connect to a [``mongod``](#bin.mongod) running on localhost on
the default port of ``27017``, simply issue:

```sh

mongo

```


### Step 4: Initiate the new replica set.

Use [``rs.initiate()``](#rs.initiate) on *one and only one* member of the replica set:

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


### Copy Database Files and Restart [``mongod``](#bin.mongod) Instance

Use the following sequence of operations to "seed" additional members
of the replica set with the restored data by copying MongoDB data
files directly.


### Step 1: Shut down the [``mongod``](#bin.mongod) instance that you restored.

Use ``--shutdown`` or
[``db.shutdownServer()``](#db.shutdownServer) to ensure a clean shut down.


### Step 2: Copy the primary's data directory to each secondary.

Copy the [*primary's*](#term-primary) data directory into the
[``dbPath``](#storage.dbPath) of the other members of the replica set. The
[``dbPath``](#storage.dbPath) is ``/data/db`` by default.


### Step 3: Start the [``mongod``](#bin.mongod) instance that you restored.


### Step 4: Add the secondaries to the replica set.

In a [``mongo``](#bin.mongo) shell connected to the [*primary*](#term-primary), add the
[*secondaries*](#term-secondary) to the replica set using
[``rs.add()``](#rs.add). See [Deploy a Replica Set](#) for more
information about deploying a replica set.


### Update Secondaries using Initial Sync

Use the following sequence of operations to "seed" additional members
of the replica set with the restored data using the default [initial
sync](#replica-set-initial-sync) operation.


### Step 1: Ensure that the data directories on the prospective replica set members are empty.


### Step 2: Add each prospective member to the replica set.

When you add a member to the replica set, [Initial Sync](#replica-set-initial-sync) copies the data from the [*primary*](#term-primary) to
the new member.
