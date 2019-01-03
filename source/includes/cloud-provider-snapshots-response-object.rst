.. list-table::
   :widths: 10 10 80
   :header-rows: 1
   :stub-columns: 1

   * - Name
     - Type
     - Description

   * - ``createdAt``
     - string
     - :abbr:`UTC (Coordinated Universal Time)` 
       `ISO 8601 <https://en.wikipedia.org/wiki/ISO_8601>`_ formatted
       point in time when |service| took the snapshot.

   * - ``description``
     - string
     - Description of the snapshot. Only present for on-demand snapshots.

   * - ``expiresAt``
     - string
     - :abbr:`UTC (Coordinated Universal Time)` 
       `ISO 8601 <https://en.wikipedia.org/wiki/ISO_8601>`_ formatted
       point in time when |service| will delete the snapshot.

   * - ``id``
     - string
     - Unique identifier of the snapshot.

   * - ``links``
     - array
     - One or more links to sub-resources and/or related resources.
       The relations between URLs are explained in the `Web Linking
       Specification <http://tools.ietf.org/html/rfc5988>`_.

   * - ``masterKeyUUID``
     - string
     - Unique ID of the :abbr:`AWS (Amazon Web Services)` 
       :abbr:`KMS (Key Management Service)` Customer Master Key used to 
       encrypt the snapshot. Only visible for clusters using
       :ref:`Encryption at Rest via Customer KMS <security-aws-kms>`.

   * - ``mongodVersion``
     - string
     - Version of the MongoDB server.
       
   * - ``snapshotType``
     - string
     - Specified the type of snapshot. Valid values are ``onDemand`` and
       ``scheduled``.
       
   * - ``status``
     - string
     - Current status of the snapshot. One of the following values:

       - ``queued``
       - ``inProgress``
       - ``completed``
       - ``failed`` 

   * - ``storageSizeBytes``
     - int
     - Specifies the size of the snapshot in bytes.
       
   * - ``type``
     - string
     - Specifies the type of cluster: ``replicaSet`` or ``shardedCluster``.
