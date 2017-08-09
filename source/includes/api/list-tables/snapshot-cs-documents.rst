.. list-table::
   :widths: 20 20 60
   :header-rows: 1

   * - Name
     - Type
     - Description

   * - ``clusterId``
     - objectId
     - ID of the cluster that the snapshot represents. 

   * - ``complete``
     - boolean
     - Indicator that the snapshot has been created. This is false if
       the snapshot creation job is still in progress.

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
     - The operation order in which this snapshot took place at this
       exact point in time. To learn how timestamps work in MongoDB,
       see :ref:`document-bson-type-timestamp`.

   * - ``doNotDelete``
     - boolean
     - Indicator that the snapshot cannot be deleted.

   * - ``expires``
     - timestamp
     - The date after which this snapshot can be deleted in 
       `ISO 8601 <https://en.wikipedia.org/wiki/ISO_8601?oldid=793821205>`_ 
       date and time format at :abbr:`UTC (Coordinated Universal Time)`.

   * - ``groupId``
     - objectId
     - ID of the group that owns the snapshot.

   * - ``id``
     - objectId
     - ID of the :term:`snapshot`.

   * - ``links``
     - document array
     - See `Response Links`_.

   * - ``parts``
     - document array
     - The individual parts that comprise the complete snapshot. This
       array contains a single document.

   * - ``parts.dataSizeBytes``
     - number
     - The total size of the data in the snapshot in bytes.

   * - ``parts.encryptionEnabled``
     - boolean
     - Indicator of the state of encryption of the snapshot data.

   * - ``parts.fileSizeBytes``
     - number
     - The total size of the data files in bytes.

   * - ``parts.hostId``
     - string
     - ID of a config server. 

   * - ``parts.masterKeyUUID``
     - objectId
     - The KMIP master key ID used to encrypt the snapshot data. 

       .. note::
          This parameter appears only if this snapshot has
          ``parts.encryptionEnabled : true``.

   * - ``parts.mongodVersion``
     - string
     - The version of ``mongod`` that was running when the snapshot was
       created.

   * - ``parts.storageSizeBytes``
     - number
     - The total size of space allocated for document storage.

   * - ``parts.typeName``
     - string
     - The type of server that the part represents:

       - ``CONFIG_SERVER``