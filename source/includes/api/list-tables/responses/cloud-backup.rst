.. list-table::
   :header-rows: 1
   :stub-columns: 1
   :widths: 20 14 66

   * - Name
     - Type
     - Description

   * - cloudProvider
     - string
     - Cloud provider that stores this snapshot. |service| returns this
       parameter when **"type": "replicaSet"**.

   * - createdAt
     - string
     - |iso8601-time| when |service| took the snapshot.

   * - description
     - string
     - Description of the snapshot. |service| returns this
       parameter when **"status": "onDemand"**.

   * - expiresAt
     - string
     - |iso8601-time| when |service| deletes the snapshot.

   * - id
     - string
     - Unique identifier of the snapshot.

   * - links
     - array
     - .. include:: /includes/api/links-explanation.rst

   * - masterKeyUUID
     - string
     - Unique identifier of the |aws| |kms| Customer Master Key used to
       encrypt the snapshot. |service| returns this value for clusters
       using :ref:`Encryption at Rest via Customer KMS <security-aws-kms>`.

   * - members
     - array of objects
     - List of snapshots and the cloud provider where the snapshots are
       stored. |service| returns this parameter when **"type": "shardedCluster"**.

   * - | members[n]
       | .cloudProvider
     - string
     - Cloud provider that stores this snapshot.

   * - members[n].id
     - string
     - Unique identifier for the shard contained in this snapshot.

   * - mongodVersion
     - string
     - Version of the MongoDB server.

   * - snapshotType
     - string
     - Type of snapshot. |service| can return **onDemand** or
       **scheduled**.

   * - status
     - string
     - Current status of the snapshot. |service| can return one of the
       following values:

       - **queued**
       - **inProgress**
       - **completed**
       - **failed**

   * - storageSizeBytes
     - integer
     - Size of the snapshot in bytes.

   * - type
     - string
     - Type of cluster. |service| can return **replicaSet** or
       **shardedCluster**.
