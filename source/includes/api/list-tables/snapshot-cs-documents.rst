.. list-table::
   :widths: 20 20 60
   :header-rows: 1

   * - Name
     - Type
     - Description

   * - ``clusterId``
     - :ref:`objectId <document-bson-type-object-id>`
     - ID of the cluster the :term:`snapshot` represents.

   * - ``complete``
     - boolean
     - Indicator that the :term:`snapshot` has been created. This is
       ``false`` if the snapshot creation job is still in progress.

   * - ``created``
     - document
     - The components of a :ref:`timestamp <document-bson-type-timestamp>`.

   * - ``created.date``
     - timestamp
     - The exact point in time when the snapshot was taken in
       `ISO 8601 <https://en.wikipedia.org/wiki/ISO_8601?oldid=793821205>`_
       date and time format at :abbr:`UTC (Coordinated Universal Time)`.

   * - ``created.increment``
     - integer
     - The operation order in which this :term:`snapshot` took place at
       this exact point in time. To learn how timestamps work in
       MongoDB, see :ref:`document-bson-type-timestamp`.

   * - ``doNotDelete``
     - boolean
     - Indicator that the :term:`snapshot` cannot be deleted.

       If ``doNotDelete`` is set to ``true``, any value in ``expires``
       is ignored.

   * - ``expires``
     - timestamp
     - The date in
       `ISO 8601 <https://en.wikipedia.org/wiki/ISO_8601?oldid=793821205>`_
       date and time format at :abbr:`UTC (Coordinated Universal Time)` after which this :term:`snapshot` can be deleted.

       If ``doNotDelete`` is set to ``true``, any value in ``expires``
       is removed.

       If the ``expires`` value is earlier than the current date and
       time, it can no longer be edited.

   * - ``groupId``
     - objectId
     - ID of the :term:`group` that owns the :term:`snapshot`.

   * - ``id``
     - objectId
     - ID of the :term:`snapshot`.

   * - ``lastOplogAppliedTimestamp``
     - document
     - The components of a :ref:`timestamp <document-bson-type-timestamp>`.

   * - ``lastOplogAppliedTimestamp.date``
     - timestamp
     - The exact point in time when the last :term:`oplog` was applied
       in `ISO 8601
       <https://en.wikipedia.org/wiki/ISO_8601?oldid=793821205>`_ date
       and time format at :abbr:`UTC (Coordinated Universal Time)`.

   * - ``lastOplogAppliedTimestamp.increment``
     - integer
     - The operation order in which last :term:`oplog` was applied at
       this exact point in time. To learn how timestamps work in
       MongoDB, see :ref:`document-bson-type-timestamp`.

   * - ``links``
     - document array
     - See `links Array`_.

   * - ``namespaceFilterList``
     - document array
     - The :term:`namespaces <namespace>` that are included or excluded
       from this :term:`snapshot`.

   * - ``namespaceFilterListfilterList``
     - string array
     - A comma-separated list of any combination of databases or
       :term:`namespaces <namespace>` that are exclusively included or
       explicitly excluded from the snapshot.

   * - ``namespaceFilterListfilterType``
     - string
     -
       - If you want to exclude the namespaces in
         ``namespaceFilterListfilterList``, set this value to
         ``blacklist``.
       - If you want to include only the namespaces in
         ``namespaceFilterListfilterList``, set this value to
         ``whitelist``.

   * - ``parts``
     - document array
     - The individual parts that comprise the complete :term:`snapshot`.
       This array contains a single document.

   * - ``parts.dataSizeBytes``
     - number
     - The total size of the data in the :term:`snapshot` in bytes.

   * - ``parts.encryptionEnabled``
     - boolean
     - Indicator of the state of encryption of the :term:`snapshot`
       data.

   * - ``parts.fileSizeBytes``
     - number
     - The total size of the data files in bytes.

   * - ``parts.hostId``
     - string
     - ID of a config server.

   * - ``parts.masterKeyUUID``
     - objectId
     - The :abbr:`KMIP (Key Management Interoperability Protocol)`
       master key ID used to encrypt the snapshot data.

       .. note::
          This parameter appears only if this snapshot has
          ``parts.encryptionEnabled : true``.

   * - ``parts.mongodVersion``
     - string
     - The version of ``mongod`` that was running when the
       :term:`snapshot` was created.

   * - ``parts.storageSizeBytes``
     - number
     - The total size of space allocated for document storage.

   * - ``parts.typeName``
     - string
     - The type of server that the part represents:

       - ``CONFIG_SERVER``
