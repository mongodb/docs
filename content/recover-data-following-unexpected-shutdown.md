+++
title = "Recover a Standalone after an Unexpected Shutdown"

[tags]
mongodb = "product"
+++

When a standalone [``mongod``](#bin.mongod) instance has journaling disabled
[1], an unclean shutdown may leave the data in an
inconsistent state. Following an unclean shutdown, if a non-empty
``mongod.lock`` file exists, [``mongod``](#bin.mongod) instance logs the
following message upon restart:

```none

Detected unclean shutdown - mongod.lock is not empty.

```

If your [``dbPath``](#storage.dbPath) contains a non-empty ``mongod.lock``
file, you must repair the database. This tutorial outlines the
procedure to repair your database for a standalone [``mongod``](#bin.mongod).

Warning: Do not use this tutorial to recover a member of a [*replica set*](#term-replica-set). Instead, you should either restore from a [backup](#) or resync from another member of the set, as described in [Resync a Member of a Replica Set](#). 

[1] By default, MongoDB runs with [journaling](#) enabled to prevent data inconsistency in the event of an unclean shutdown. To shut down cleanly, see [Stop mongod Processes](#terminate-mongod-processes). 


## Procedure

Important: Run the repair operation as the same user that normally runs the [``mongod``](#bin.mongod) process to avoid changing the permissions of the MongoDB data files. 


### Step 1: Create a backup of the data files.

Create a backup copy of the data files in the ``--dbpath``.


### Step 2: Start [``mongod``](#bin.mongod) with ``--repair``.

To repair the data files, start the [``mongod``](#bin.mongod) instance with
the [``--repair``](#cmdoption-repair) option. By default, during the repair
operation, MongoDB uses a ``_tmp`` directory in the
[``--dbpath``](#cmdoption-dbpath).

If the [``mongod``](#bin.mongod) instance uses [MMAPv1 Storage Engine](#), you can
include the [``--repairpath``](#cmdoption-repairpath) option to specify an alternate
temporary directory. For details, see [``--repairpath``](#cmdoption-repairpath).

Issue a command similar to the following:

```sh

mongod --dbpath /data/db --repair

```

Upon completion, the ``dbpath`` should contain the repaired data files and an empty ``mongod.lock`` file. [2]

[2] Generally, you should not manually remove the ``mongod.lock`` file. Instead, use the above procedure to recover the database. In dire situations, you can remove the file, start the database using the possibly corrupt files, and attempt to recover data from the database. However, it is impossible to predict the state of the database in these situations. 
