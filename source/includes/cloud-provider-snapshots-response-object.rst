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

   * - ``expiresAt``
     - string
     - :abbr:`UTC (Coordinated Universal Time)` 
       `ISO 8601 <https://en.wikipedia.org/wiki/ISO_8601>`_ formatted
       point in time when |service| will delete the snapshot.

   * - ``id``
     - string
     - The unique identifier of the snapshot.

   * - ``links``
     - array
     - One or more links to sub-resources and/or related resources.
       The relations between URLs are explained in the `Web Linking
       Specification <http://tools.ietf.org/html/rfc5988>`_.

   * - ``masterKeyUUID``
     - string
     - The unique ID of the :abbr:`AWS (Amazon Web Services)` 
       :abbr:`KMS (Key Management Service)` Customer Master Key used to 
       encrypt the snapshot. Only visible for clusters using
       :ref:`Encryption at Rest via Customer KMS <security-aws-kms>`.

   * - ``mongodVersion``
     - string
     - The MongoDB server version of the snapshot.

   * - ``storageSizeBytes``
     - int
     - Snapshot size in bytes.
       
   * - ``type``
     - string
     - Specifies the type of cluster: ``relicaSet`` or ``shardedCluster``.
