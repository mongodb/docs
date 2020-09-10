.. list-table::
   :widths: 10 10 80
   :header-rows: 1
   :stub-columns: 1

   * - Name
     - Type
     - Description

   * - createdAt
     - string
     - |iso8601-time| when |service| took the snapshot.

   * - description
     - string
     - Description of the snapshot. Returned for on-demand snapshots.

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
     - Unique ID of the |aws| |kms| Customer Master Key used to encrypt
       the snapshot. Only visible for clusters using
       :ref:`Encryption at Rest via Customer KMS <security-aws-kms>`.

   * - mongodVersion
     - string
     - Version of the MongoDB server.

   * - snapshotType
     - string
     - Specified the type of snapshot. Valid values are ``onDemand``
       and ``scheduled``.

   * - status
     - string
     - Current status of the snapshot. One of the following values:

       - ``queued``
       - ``inProgress``
       - ``completed``
       - ``failed``

   * - storageSizeBytes
     - integer
     - Specifies the size of the snapshot in bytes.

   * - type
     - string
     - Specifies the type of cluster: ``replicaSet`` or
       ``shardedCluster``.
