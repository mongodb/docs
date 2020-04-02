.. list-table::
   :widths: 20 10 70
   :header-rows: 1

   * - Field
     - Type
     - Description
       
   * - ``clusterId``
     - string
     - The unique ID of the cluster that the snapshot represents.
       
   * - ``complete``
     - boolean
     - Indicates whether the snapshot exists. This is ``false``
       if the snapshot creation job is in progress.
       
   * - ``created``
     - Document
     - The components of a :ref:`timestamp <document-bson-type-timestamp>`.
       
   * - ``created.date``
     - timestamp
     - The exact point in time when the snapshot was taken in
       `ISO 8601 <https://en.wikipedia.org/wiki/ISO_8601>`_
       date and time format in :abbr:`UTC (Coordinated Universal Time)`.

   * - ``created.increment``
     - integer
     - The operation order in which this snapshot took place at
       this exact point in time. To learn how timestamps work in
       MongoDB, see :ref:`timestamp <document-bson-type-timestamp>`.
       
   * - ``doNotDelete``
     - boolean
     - Specifies whether the snapshot can be deleted.
       
   * - ``expires``
     - timestamp
     - The date in `ISO 8601
       <https://en.wikipedia.org/wiki/ISO_8601>`_ date
       and time format in :abbr:`UTC (Coordinated Universal Time)` after
       which |service| deletes the snapshot.

       If ``doNotDelete`` is set to ``true``, any value in ``expires``
       is removed.

       If the ``expires`` value is earlier than the current date and
       time, the snaphot cannot be edited.

   * - ``groupId``
     - objectId
     - ID of the :term:`project` that owns the snapshot.

   * - ``id``
     - objectId
     - ID of the snapshot.
       
   * - ``lastOplogAppliedTimestamp``
     - document
     - The components of the
       :ref:`timestamp <document-bson-type-timestamp>` of the last
       oplog entry was applied.

   * - ``lastOplogAppliedTimestamp.date``
     - timestamp
     - The exact point in time when the last :term:`oplog` was applied
       in `ISO 8601
       <https://en.wikipedia.org/wiki/ISO_8601>`_ date
       and time format in :abbr:`UTC (Coordinated Universal Time)`.

   * - ``lastOplogAppliedTimestamp.increment``
     - integer
     - The operation order in which the last :term:`oplog` was applied at
       this exact point in time. To learn how timestamps work in
       MongoDB, see :ref:`timestamp <document-bson-type-timestamp>`.

   * - ``links``
     - document array
     - One or more links to sub-resources and/or related resources.
       The relations between URLs are explained in the `Web Linking
       Specification <http://tools.ietf.org/html/rfc5988>`_.
       
   * - ``namespaceFilterList``
     - object
     - The :term:`namespaces <namespace>` that are included or excluded
       from this snapshot.

   * - ``namespaceFilterList.filterList``
     - string array
     - A comma-separated list of any combination of databases or
       :term:`namespaces <namespace>` that are exclusively included or
       explicitly excluded from the snapshot.

       The default value is an empty array (``[]``).

   * - ``namespaceFilterList.filterType``
     - string
     - A value that determines how :term:`namespaces <namespace>` are
       filtered for this snapshot.

       - If this value is set to ``blacklist``, namespaces in
         ``namespaceFilterList.filterList`` are excluded from the
         snapshot.
       - If this value is set to ``whitelist``, only namespaces in
         ``namespaceFilterList.filterList`` are included in the
         snapshot.

       The default value is ``blacklist``.

   * - ``parts``
     - document array
     - The individual parts that comprise the complete snapshot.

       - For a :term:`replica set`, this array contains a single
         document.
       - For a :term:`sharded cluster`, this array contains one document
         for each shard plus one document for the :term:`config server`.

   * - ``parts.clusterId``
     - objectId
     - ID of the :term:`replica set`.

   * - ``parts.compressionSetting``
     - string
     - Method of compression for the snapshot.

   * - ``parts.dataSizeBytes``
     - number
     - The total size of the data in the snapshot in bytes.

   * - ``parts.encryptionEnabled``
     - boolean
     - Indicates whether the snapshot is encrypted.

   * - ``parts.fileSizeBytes``
     - number
     - The total size of the data files in bytes.

   * - ``parts.masterKeyUUID``
     - objectId
     - The :abbr:`KMIP (Key Management Interoperability Protocol)`
       master key ID used to encrypt the snapshot data.

       .. note::
          This appears only if ``parts.encryptionEnabled`` is ``true``.

   * - ``parts.mongodVersion``
     - string
     - The version of MongoDB that the :term:`replica set`
       :term:`primary` was running when the snapshot was
       created.

   * - ``parts.replicaSetName``
     - string
     - Name of the :term:`replica set`.

   * - ``parts.shardName``
     - string
     - Name of the :term:`shard`.

   * - ``parts.storageSizeBytes``
     - number
     - The total size of space allocated for document storage.

   * - ``parts.typeName``
     - string
     - The type of server that the part represents:

       - ``REPLICA_SET``
       - ``CONFIG_SERVER_REPLICA_SET``