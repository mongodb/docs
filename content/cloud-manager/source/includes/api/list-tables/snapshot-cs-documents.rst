.. list-table::
   :widths: 20 20 60
   :header-rows: 1

   * - Name
     - Type
     - Description

   * - clusterId
     - :ref:`objectId <document-bson-type-object-id>`
     - ID of the cluster the :manual:`snapshot </reference/glossary/#std-term-snapshot>` represents.

   * - complete
     - boolean
     - Indicator that the :manual:`snapshot </reference/glossary/#std-term-snapshot>` has been created. This is
       ``false`` if the snapshot creation job is still in progress.

   * - created
     - document
     - The components of a :ref:`timestamp <document-bson-type-timestamp>`.

   * - created.date
     - timestamp
     - The exact point in time when the snapshot was taken in
       `ISO 8601 <https://en.wikipedia.org/wiki/ISO_8601?oldid=793821205>`_
       date and time format at :abbr:`UTC (Coordinated Universal Time)`.

   * - created.increment
     - integer
     - The operation order in which this :manual:`snapshot </reference/glossary/#std-term-snapshot>` took place at
       this exact point in time. To learn how timestamps work in
       MongoDB, see :ref:`document-bson-type-timestamp`.

   * - doNotDelete
     - boolean
     - Indicator that the :manual:`snapshot </reference/glossary/#std-term-snapshot>` cannot be deleted.

       If ``doNotDelete`` is set to ``true``, any value in ``expires``
       is ignored.

   * - expires
     - timestamp
     - The date in `ISO 8601
       <https://en.wikipedia.org/wiki/ISO_8601?oldid=793821205>`_ date
       and time format at :abbr:`UTC (Coordinated Universal Time)` after
       which this :manual:`snapshot </reference/glossary/#std-term-snapshot>` can be deleted.

       If ``doNotDelete`` is set to ``true``, any value in ``expires``
       is removed.

       If the ``expires`` value is earlier than the current date and
       time, it can no longer be edited.

   * - groupId
     - objectId
     - ID of the :cloudmgr:`project </reference/glossary/#term-project>` that owns the :manual:`snapshot </reference/glossary/#std-std-term-snapshot>`.

   * - id
     - objectId
     - ID of the :manual:`snapshot </reference/glossary/#std-term-snapshot>`.

   * - lastOplogAppliedTimestamp
     - document
     - The components of the
       :ref:`timestamp <document-bson-type-timestamp>`  of the last
       oplog entry was applied.

   * - lastOplogAppliedTimestamp.date
     - timestamp
     - The exact point in time when the last :manual:`oplog </reference/glossary/#std-term-oplog>` was applied
       in `ISO 8601
       <https://en.wikipedia.org/wiki/ISO_8601?oldid=793821205>`_ date
       and time format at :abbr:`UTC (Coordinated Universal Time)`.

   * - lastOplogAppliedTimestamp.increment
     - integer
     - The operation order in which last :manual:`oplog </reference/glossary/#std-term-oplog>` was applied at
       this exact point in time. To learn how timestamps work in
       MongoDB, see :ref:`document-bson-type-timestamp`.

   * - links
     - object array
     - .. include:: /includes/api/links-explanation.rst

   * - namespaceFilterList
     - object array
     - The :manual:`namespaces  </reference/glossary/#std-term-namespace>` that are included or excluded
       from this :manual:`snapshot </reference/glossary/#std-term-snapshot>`.

   * - namespaceFilterList.filterList
     - string array
     - A comma-separated list of any combination of databases or
       :manual:`namespaces  </reference/glossary/#std-term-namespace>` that are exclusively included or
       explicitly excluded from the snapshot.

       The default value is an empty array (``[]``).

   * - namespaceFilterList.filterType
     - string
     - A value that determines how :manual:`namespaces  </reference/glossary/#std-term-namespace>` are
       filtered for this snapshot.

       - If this value is set to ``denyList``, namespaces in
         ``namespaceFilterList.filterList`` are excluded from the
         snapshot.
       - If this value is set to ``accessList``, only namespaces in
         ``namespaceFilterList.filterList`` are included in the
         snapshot.

       The default value is ``denyList``.

   * - parts
     - object array
     - The individual parts that comprise the complete :manual:`snapshot </reference/glossary/#std-term-snapshot>`.
       This array contains a single document.

   * - parts.dataSizeBytes
     - number
     - The total size of the data in the :manual:`snapshot </reference/glossary/#std-term-snapshot>` in bytes.

   * - parts.encryptionEnabled
     - boolean
     - Indicator of the state of encryption of the :manual:`snapshot </reference/glossary/#std-term-snapshot>`
       data.

   * - parts.fileSizeBytes
     - number
     - The total size of the data files in bytes.

   * - parts.hostId
     - string
     - ID of a config server.

   * - parts.masterKeyUUID
     - objectId
     - The :abbr:`KMIP (Key Management Interoperability Protocol)`
       master key ID used to encrypt the snapshot data.
       ``parts.masterKeyUUID`` appears only if this snapshot has
       ``parts.encryptionEnabled : true``.

   * - parts.mongodVersion
     - string
     - The version of ``mongod`` that was running when the
       :manual:`snapshot </reference/glossary/#std-term-snapshot>` was created.

   * - parts.storageSizeBytes
     - number
     - The total size of space allocated for document storage.

   * - parts.typeName
     - string
     - The type of server that the part represents:

       - ``CONFIG_SERVER``
