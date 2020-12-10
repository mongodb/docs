.. include:: /includes/backup/considerations-4.2-4.4.rst

Backup Features Supported at Present
````````````````````````````````````

.. cond:: onprem

   .. list-table::
      :widths: 40 10 10 10 10 10
      :header-rows: 1

      * - Feature
        - MongoDB 4.4 with FCV : 4.4
        - MongoDB 4.4 with FCV : 4.2
        - MongoDB 4.2 with FCV : 4.2
        - MongoDB 4.2 with FCV : 4.0
        - MongoDB 4.0 or earlier

      * - Backs up Data using WiredTiger Snapshots
        - :icon:`check-circle`
        - :icon:`check-circle`
        - :icon:`check-circle`
        -
        -
      * - Backs up Data using the Backup Daemon
        -
        -
        -
        - :icon:`check-circle`
        - :icon:`check-circle`
      * - Backs up Replica Sets
        - :icon:`check-circle`
        - :icon:`check-circle`
        - :icon:`check-circle`
        - :icon:`check-circle`
        - :icon:`check-circle`
      * - Backs up Sharded Clusters
        - :icon:`check-circle`
        - :icon:`check-circle`
        - :icon:`check-circle`
        - :icon:`check-circle`
        - :icon:`check-circle`
      * - Can Filter using Namespaces
        -
        -
        -
        - :icon:`check-circle`
        - :icon:`check-circle`
      * - Can Specify Sync Source Database
        -
        -
        -
        - :icon:`check-circle`
        - :icon:`check-circle`
      * - Can Restore Data to Specific Point in Time [#]_
        - :icon:`check-circle`
        - :icon:`check-circle`
        - :icon:`check-circle`
        - :icon:`check-circle`
        - :icon:`check-circle`
      * - Can Perform Incremental Backups [#]_
        - :icon:`check-circle`
        - :icon:`check-circle`
        - :icon:`check-circle`
        - :icon:`check-circle`
        - :icon:`check-circle`
      * - Supports Snapshots that use Encryption [#]_
        - :icon:`check-circle`
        - :icon:`check-circle`
        - :icon:`check-circle`
        - :icon:`check-circle`
        - :icon:`check-circle`
      * - Supports Saving to Blockstore Snapshot Storage
        - :icon:`check-circle`
        - :icon:`check-circle`
        - :icon:`check-circle`
        - :icon:`check-circle`
        - :icon:`check-circle`
      * - Supports Saving to |s3| Snapshot Storage
        - :icon:`check-circle`
        - :icon:`check-circle`
        - :icon:`check-circle`
        - :icon:`check-circle`
        - :icon:`check-circle`
      * - Supports Saving to File System Storage [#]_
        - :icon:`check-circle`
        - :icon:`check-circle`
        - :icon:`check-circle`
        - :icon:`check-circle`
        - :icon:`check-circle`
      * - Supports Databases running MongoDB Enterprise
        - :icon:`check-circle`
        - :icon:`check-circle`
        - :icon:`check-circle`
        - :icon:`check-circle`
        - :icon:`check-circle`
      * - Supports Databases running MongoDB Community
        -
        -
        -
        - :icon:`check-circle`
        - :icon:`check-circle`
      * - Requires a MongoDB Agent with
          :ref:`backup enabled <activate-backup>` on every |mongod|
          cluster node
        - :icon:`check-circle`
        - :icon:`check-circle`
        - :icon:`check-circle`
        -
        -

.. cond:: cloud

   .. list-table::
      :widths: 40 10 10 10 10 10
      :header-rows: 1

      * - Feature
        - MongoDB 4.4 with FCV : 4.4
        - MongoDB 4.4 with FCV : 4.2
        - MongoDB 4.2 with FCV : 4.2
        - MongoDB 4.2 with FCV : 4.0
        - MongoDB 4.0 or earlier

      * - Backs up Data using WiredTiger Snapshots
        - :icon:`check-circle`
        - :icon:`check-circle`
        - :icon:`check-circle`
        -
        -
      * - Backs up Replica Sets
        - :icon:`check-circle`
        - :icon:`check-circle`
        - :icon:`check-circle`
        - :icon:`check-circle`
        - :icon:`check-circle`
      * - Backs up Sharded Clusters
        - :icon:`check-circle`
        - :icon:`check-circle`
        - :icon:`check-circle`
        - :icon:`check-circle`
        - :icon:`check-circle`
      * - Can Filter using Namespaces
        -
        -
        -
        - :icon:`check-circle`
        - :icon:`check-circle`
      * - Can Specify Sync Source Database
        -
        -
        -
        - :icon:`check-circle`
        - :icon:`check-circle`
      * - Can Restore Data to Specific Point in Time
        - :icon:`check-circle`
        - :icon:`check-circle`
        - :icon:`check-circle`
        - :icon:`check-circle`
        - :icon:`check-circle`
      * - Can Perform Incremental Backups [#]_
        - :icon:`check-circle`
        - :icon:`check-circle`
        - :icon:`check-circle`
        - :icon:`check-circle`
        - :icon:`check-circle`
      * - Supports Databases running MongoDB Enterprise
        - :icon:`check-circle`
        - :icon:`check-circle`
        - :icon:`check-circle`
        - :icon:`check-circle`
        - :icon:`check-circle`
      * - Supports Databases running MongoDB Community [#]_
        -
        -
        -
        - :icon:`check-circle`
        - :icon:`check-circle`
      * - Requires a MongoDB Agent with
          :ref:`backup enabled <activate-backup>` on every |mongod|
          cluster node
        - :icon:`check-circle`
        - :icon:`check-circle`
        - :icon:`check-circle`
        -
        -

.. cond:: onprem

   .. [#] Performing a |pit| restore requires |onprem| 4.2.13 or later.

.. [#] |mms| requires a full backup for your first backup, after a
       snapshot has been deleted, and if the blockstore block size
       has been changed. Incremental backups reduce network
       transfer and storage costs. This feature works with MongoDB
       4.2.6 or later.

.. cond:: onprem

   .. [#] Querying an encrypted snapshot requires
          :product:`MongoDB Enterprise <enterprise>` 4.2.9 or 4.4.0.

   .. [#] Backups to a |fcv-link| 4.2 or later database to a File
          System Store ignore
          :setting:`File System Store Gzip Compression Level`.

.. cond:: cloud

   .. [#] |mms| grants a :doc:`special license to use MongoDB
          Enterprise </reference/legal/cloud-manager-backup-license>`
          to :doc:`MongoDB Community users </reference/legal/cloud-manager-backup-changes>`
          for backup only.

Requirements and Limitations
````````````````````````````

To run backups and restores if you are running MongoDB 4.2 or later
with |fcv-link| 4.2 or later, you:

.. cond:: onprem

   - Must run :product:`MongoDB Enterprise <enterprise>`.

   - Must account for the change in blockstore block size. If you
     didn't set your block size and used the default, that block size
     changes from 64 KB to 1 MB. This can impact storage usage.

.. cond:: cloud

   - Must run :product:`MongoDB Enterprise <enterprise>`. MongoDB, Inc.
     grants a :doc:`special license </reference/legal/cloud-manager-backup-license>`
     to use MongoDB Enterprise for |mms| backups.

- Can't use namespace filter lists to define the
  :term:`namespaces <namespace>` included in a backup. Snapshots
  using FCV 4.2 or later always include all namespaces.

- Don't need a sync source database. When taking a Snapshot, |mms|
  selects the replica set member with the least performance impact
  and greatest storage-level duplication of Snapshot data.

- Must deploy a MongoDB Agent with every |mongod| node in
  the cluster.

.. note::

   If |mms| doesn't manage your cluster:
   
   - :ref:`Grant <edit-security-credentials>` the
     :authrole:`backup` permission to the MongoDB user that runs
     backups.
   - Ensure that the operating system user that runs the {+mdbagent+}
     has read permission for all data files (including journal files) of 
     the deployment.
