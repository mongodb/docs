:doc:`Backup </tutorial/nav/backup-deployments/>` support for MongoDB
4.2 with ``"featureCompatibilityVersion" : 4.2`` is currently extremely
limited. Support will be extended in future releases of |mms|.

If you are running MongoDB 4.2 with
``"featureCompatibilityVersion" : 4.2``, you:

.. only:: onprem

   - Cannot back up sharded clusters. Do not upgrade sharded clusters to
     ``"featureCompatibilityVersion" : 4.2`` if you need to back up your
     sharded cluster.

   - Cannot restore to a specific a
     :doc:`point in time </tutorial/nav/restore-overview>` or use
     a :doc:`queryable restores </tutorial/query-backup>`. Do not upgrade
     to ``"featureCompatibilityVersion" : 4.2`` if you require point in time
     or queryable restores.

   - Cannot use namespace filter lists to define the
     :term:`namespaces <namespace>` included in a backup.

   - Cannot specify a sync source database.

   - Cannot save your backup to a file system store.

   - Must deploy a MongoDB Agent with every |mongod| node in
     the cluster.

.. only:: cloud

   - Cannot back up sharded clusters. Do not upgrade sharded clusters to
     ``"featureCompatibilityVersion" : 4.2`` if you need to back up your
     sharded cluster.

   - Cannot restore to a specific a
     :doc:`point in time </tutorial/nav/restore-overview>` or use
     :doc:`queryable restores </tutorial/query-backup>`. Do not upgrade
     to ``"featureCompatibilityVersion" : 4.2`` if you require point in time
     or queryable restores.

   - Must deploy a MongoDB Agent with every |mongod| node in
     the cluster.

Backup and restore performance will decrease for MongoDB 4.2 replica
sets with many small collections (e.g., tens of
thousands of collections with less than 1 GB of data per
collection).
