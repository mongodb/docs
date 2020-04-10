:doc:`Backup </tutorial/nav/backup-deployments/>` support for MongoDB
4.2 with ``"featureCompatibilityVersion" : 4.2`` is currently
limited. Support will be extended in future releases of |mms|.

Backup Features Supported at Present
````````````````````````````````````

.. cond:: onprem

   .. list-table::
      :widths: 55 15 15 15
      :header-rows: 1

      * - Feature
        - MongoDB 4.2 with FCV : 4.2
        - MongoDB 4.2 with FCV : 4.0
        - MongoDB 4.0 or earlier
      * - Backs up Data using WiredTiger Snapshots
        - :icon:`check-circle`
        -
        -
      * - Backs up Data using the Backup Daemon
        -
        - :icon:`check-circle`
        - :icon:`check-circle`
      * - Backs up Replica Sets
        - :icon:`check-circle`
        - :icon:`check-circle`
        - :icon:`check-circle`
      * - Backs up Sharded Clusters
        - :icon:`check-circle`
        - :icon:`check-circle`
        - :icon:`check-circle`
      * - Can Filter using Namespaces
        -
        - :icon:`check-circle`
        - :icon:`check-circle`
      * - Can Specify Sync Source Database
        -
        - :icon:`check-circle`
        - :icon:`check-circle`
      * - Can Restore Data to Specific Point in Time
        - :icon:`check-circle`
        - :icon:`check-circle`
        - :icon:`check-circle`
      * - Can Perform Incremental Backups [*]_
        - :icon:`check-circle`
        - :icon:`check-circle`
        - :icon:`check-circle`
      * - Supports Encrypted Snapshots
        -
        - :icon:`check-circle`
        - :icon:`check-circle`
      * - Supports Saving to Blockstore Snapshot Storage
        - :icon:`check-circle`
        - :icon:`check-circle`
        - :icon:`check-circle`
      * - Supports Saving to S3 Snapshot Storage
        - :icon:`check-circle`
        - :icon:`check-circle`
        - :icon:`check-circle`
      * - Supports Saving to File System Storage
        -
        - :icon:`check-circle`
        - :icon:`check-circle`
      * - Supports Databases running MongoDB Enterprise
        - :icon:`check-circle`
        - :icon:`check-circle`
        - :icon:`check-circle`
      * - Supports Databases running MongoDB Community
        -
        - :icon:`check-circle`
        - :icon:`check-circle`
      * - Requires a MongoDB Agent on every |mongod| cluster node
        - :icon:`check-circle`
        -
        -

.. cond:: cloud

   .. list-table::
      :widths: 55 15 15 15
      :header-rows: 1

      * - Feature
        - MongoDB 4.2 with FCV : 4.2
        - MongoDB 4.2 with FCV : 4.0
        - MongoDB 4.0 or earlier
      * - Backs up Data using WiredTiger Snapshots
        - :icon:`check-circle`
        -
        -
      * - Backs up Replica Sets
        - :icon:`check-circle`
        - :icon:`check-circle`
        - :icon:`check-circle`
      * - Backs up Sharded Clusters
        - :icon:`check-circle`
        - :icon:`check-circle`
        - :icon:`check-circle`
      * - Can Filter using Namespaces
        -
        - :icon:`check-circle`
        - :icon:`check-circle`
      * - Can Specify Sync Source Database
        -
        - :icon:`check-circle`
        - :icon:`check-circle`
      * - Can Restore Data to Specific Point in Time
        -
        - :icon:`check-circle`
        - :icon:`check-circle`
      * - Can Perform Incremental Backups [*]_
        - :icon:`check-circle`
        - :icon:`check-circle`
        - :icon:`check-circle`
      * - Supports Databases running MongoDB Enterprise
        - :icon:`check-circle`
        - :icon:`check-circle`
        - :icon:`check-circle`
      * - Supports Databases running MongoDB Community
        -
        - :icon:`check-circle`
        - :icon:`check-circle`
      * - Requires a MongoDB Agent on every |mongod| cluster node
        - :icon:`check-circle`
        -
        -

.. [*] |mms| requires a full backup for your first backup, after a
       snapshot has been deleted, and if the blockstore block size has
       been changed. Incremental backups reduce network transfer and
       storage costs.


Requirements and Limitations
````````````````````````````

To run backups and restores if you are running MongoDB 4.2 with
``"featureCompatibilityVersion" : 4.2``, you:

.. cond:: onprem

   - Must run MongoDB Enterprise.

   - Cannot use namespace filter lists to define the
     :term:`namespaces <namespace>` included in a backup. Snapshots
     using FCV 4.2 always include all namespaces.

   - Cannot specify a sync source database. For FCV 4.2 replica sets,
     no Initial Sync step is required. When taking a Snapshot, |mms|
     selects the replica set member with the least performance impact
     and greatest storage-level duplication of Snapshot data.

   - Cannot save your backup to a file system store. Backup supports
     :doc:`MongoDB </tutorial/manage-blockstore-storage>` and
     :doc:`S3 Snapshot Storage </tutorial/manage-s3-blockstore-storage>`.

   - Must deploy a MongoDB Agent with every |mongod| node in
     the cluster.

.. cond:: cloud

   - Must run MongoDB Enterprise. MongoDB, Inc. grants a
     :doc:`special license </reference/legal/cloud-manager-backup-license>`
     to use MongoDB Enterprise for |mms| backups.

   - Cannot use namespace filter lists to define the
     :term:`namespaces <namespace>` included in a backup. Snapshots
     using FCV 4.2 always include all namespaces.

   - Cannot specify a sync source database. For FCV 4.2 replica sets,
     no Initial Sync step is required. When taking a Snapshot, |mms|
     selects the replica set member with the least performance impact
     and greatest storage-level duplication of Snapshot data.

   - Must deploy a MongoDB Agent with every |mongod| node in
     the cluster.

Backup and restore performance decreases for MongoDB 4.2 replica
sets with many small collections: those with tens of
thousands of collections with less than 1 GB of data per
collection.
