+++
title = "Recover a Standalone after an Unexpected Shutdown"

tags = [
"mongodb",
"administration",
"beginner" ]
+++

# Recover a Standalone after an Unexpected Shutdown

When a standalone [``mongod``](https://docs.mongodb.com/manual/reference/program/mongod/#bin.mongod) instance has journaling disabled
[1], an unclean shutdown may leave the data in an
inconsistent state. Following an unclean shutdown, if a non-empty
``mongod.lock`` file exists, [``mongod``](https://docs.mongodb.com/manual/reference/program/mongod/#bin.mongod) instance logs the
following message upon restart:

```

Detected unclean shutdown - mongod.lock is not empty.

```

If your [``dbPath``](https://docs.mongodb.com/manual/reference/configuration-options/#storage.dbPath) contains a non-empty ``mongod.lock``
file, you must repair the database. This tutorial outlines the
procedure to repair your database for a standalone [``mongod``](https://docs.mongodb.com/manual/reference/program/mongod/#bin.mongod).

Warning: Do not use this tutorial to recover a member of a [*replica set*](https://docs.mongodb.com/manual/reference/glossary/#term-replica-set). Instead, you should either restore from a [backup](https://docs.mongodb.com/manual/core/backups) or resync from another member of the set, as described in [Resync a Member of a Replica Set](https://docs.mongodb.com/manual/tutorial/resync-replica-set-member).

[1] By default, MongoDB runs with [journaling](https://docs.mongodb.com/manual/core/journaling) enabled to prevent data inconsistency in the event of an unclean shutdown. To shut down cleanly, see [Stop mongod Processes](https://docs.mongodb.com/manual/tutorial/manage-mongodb-processes/#terminate-mongod-processes).

<span id="tutorial-repair-procedures"></span>


## Procedure

Important: Run the repair operation as the same user that normally runs the [``mongod``](https://docs.mongodb.com/manual/reference/program/mongod/#bin.mongod) process to avoid changing the permissions of the MongoDB data files.


### Step 1: Create a backup of the data files.

Create a backup copy of the data files in the ``--dbpath``.


### Step 2: Start [``mongod``](https://docs.mongodb.com/manual/reference/program/mongod/#bin.mongod) with ``--repair``.

To repair the data files, start the [``mongod``](https://docs.mongodb.com/manual/reference/program/mongod/#bin.mongod) instance with
the [``--repair``](https://docs.mongodb.com/manual/reference/program/mongodump/#cmdoption-repair) option. By default, during the repair
operation, MongoDB uses a ``_tmp`` directory in the
[``--dbpath``](https://docs.mongodb.com/manual/reference/program/mongod/#cmdoption-dbpath).

If the [``mongod``](https://docs.mongodb.com/manual/reference/program/mongod/#bin.mongod) instance uses [MMAPv1 Storage Engine](https://docs.mongodb.com/manual/core/mmapv1), you can
include the [``--repairpath``](https://docs.mongodb.com/manual/reference/program/mongod/#cmdoption-repairpath) option to specify an alternate
temporary directory. For details, see [``--repairpath``](https://docs.mongodb.com/manual/reference/program/mongod/#cmdoption-repairpath).

Issue a command similar to the following:

```sh

mongod --dbpath /data/db --repair

```

Upon completion, the ``dbpath`` should contain the repaired data files and an empty ``mongod.lock`` file. [2]

[2] Generally, you should not manually remove the ``mongod.lock`` file. Instead, use the above procedure to recover the database. In dire situations, you can remove the file, start the database using the possibly corrupt files, and attempt to recover data from the database. However, it is impossible to predict the state of the database in these situations.
