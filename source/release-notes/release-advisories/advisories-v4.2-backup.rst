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
      * - Can Restore Data to Specific Point in Time
        - :icon:`check-circle`
        - :icon:`check-circle`
        - :icon:`check-circle`
        - :icon:`check-circle`
        - :icon:`check-circle`
      * - Can Perform Incremental Backups [*]_
        - :icon:`check-circle`
        - :icon:`check-circle`
        - :icon:`check-circle`
        - :icon:`check-circle`
        - :icon:`check-circle`
      * - Supports Snapshots that use Encryption [*]_
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
      * - Supports Saving to File System Storage
        -
        -
        -
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
      * - Requires a MongoDB Agent on every |mongod| cluster node
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
      * - Can Perform Incremental Backups [*]_
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
      * - Supports Databases running MongoDB Community [*]_
        -
        -
        -
        - :icon:`check-circle`
        - :icon:`check-circle`
      * - Requires a MongoDB Agent on every |mongod| cluster node
        - :icon:`check-circle`
        - :icon:`check-circle`
        - :icon:`check-circle`
        -
        -

.. [*] |mms| requires a full backup for your first backup, after a
       snapshot has been deleted, and if the blockstore block size
       has been changed. Incremental backups reduce network
       transfer and storage costs. This feature works with MongoDB
       4.2.6 or later.

.. cond:: onprem

   .. [*] Querying an encrypted snapshot requires
          :product:`MongoDB Enterprise <enterprise>` 4.2.9 or 4.4.0.

.. cond:: cloud

   .. [*] |mms| grants a :doc:`special license to use MongoDB
          Enterprise </reference/legal/cloud-manager-backup-license>`
          to :doc:`MongoDB Community users </reference/legal/cloud-manager-backup-changes>`
          for backup only.

Requirements and Limitations
````````````````````````````

To run backups and restores if you are running MongoDB 4.2 or later
with |fcv-link| 4.2 or later, you:

.. cond:: onprem

   - Must run :product:`MongoDB Enterprise <enterprise>`.

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

.. cond:: onprem

   Backup and restore performance decreases for MongoDB 4.2 or later
   replica sets with many small collections: those with tens of
   thousands of collections with less than 1 GB of data per collection.

.. note::

   If |mms| doesn't manage your cluster,
   :ref:`grant <edit-security-credentials>` the
   :authrole:`backup` permission to the MongoDB user that runs
   backups.
