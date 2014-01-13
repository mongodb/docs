Run Replicate Database Script
-----------------------------

You cannot restore a single data set to multiple :program:`mongod` instances
and then create a replica set. In this situation, MongoDB will force the
secondary databases to perform an initial sync. The archive produced by
|backup| includes a script that automates the process to restore a replica set
from backed up database files.

Locate then run the ``seedSecondary.sh`` file included in the ``.tar.gz``
archive produced by |backup|:

.. code-block:: sh

   ./seedSecondary.sh <port> <oplog-size>

Replace <port> with the port of the restored :program:`mongod` instance.
Specify a size in gigabytes for the new oplog in the <oplog-size> argument. See
:ref:replica-set-oplog-sizing for more information on oplog sizing. The primary
instance will need enough oplog to catch up from the timestamp of the snapshot.

Restart the result set and use rs.add() to define the primary :program:`mongod`
instance, as described in the :manual:`rs.add reference entry
</reference/method/rs.add/>` in the MongoDB documentation.

To bring data files up as a standalone :program:`mongod` instance, :manual:`see
the MongoDB Installation Guides </installation/#tutorials-installation>`.

For more information about replica set restoration, the MongoDB
:manual:`Restore Replica Set from Backup
</tutorial/restore-replica-set-from-backup>` tutorial provides an alternate
method to create a replica set from backed up data.
