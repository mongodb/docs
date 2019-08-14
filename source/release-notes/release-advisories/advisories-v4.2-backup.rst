:doc:`Backup </tutorial/nav/backup-deployments/>` support for MongoDB
4.2 with ``"featureCompatibilityVersion" : 4.2`` is currently extremely
limited. Support will be extended in future releases of |mms|.

If you are running MongoDB 4.2 with
``"featureCompatibilityVersion" : 4.2``, you:

.. cond:: onprem

   - Must run MongoDB Enterprise.

   - Cannot back up sharded clusters. Do not upgrade sharded clusters
     to ``"featureCompatibilityVersion" : 4.2`` if you need to back up
     your sharded cluster.

   - Cannot restore to a specific a
     :doc:`point in time </tutorial/nav/restore-overview>` or use a
     :doc:`queryable restores </tutorial/query-backup>`. Do not
     upgrade to ``"featureCompatibilityVersion" : 4.2`` if you require
     point in time or queryable restores.

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

   - Cannot back up sharded clusters. Do not upgrade sharded clusters
     to ``"featureCompatibilityVersion" : 4.2`` if you need to back up
     your sharded cluster.

   - Cannot restore to a specific a
     :doc:`point in time </tutorial/nav/restore-overview>` or use
     :doc:`queryable restores </tutorial/query-backup>`. Do not upgrade
     to ``"featureCompatibilityVersion" : 4.2`` if you require point
     in time or queryable restores.

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
