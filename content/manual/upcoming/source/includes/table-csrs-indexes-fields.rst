.. list-table::
   :header-rows: 1
   :stub-columns: 1
   :widths: 10 10 20

   * - Field
     - Data Type
     - Description

   * - ``name``
     - String
     - Name of the global index.

   * - ``keyPattern``
     - Document
     - Index key specification.

   * - ``options``
     - Document
     - Provides information on specified :ref:`index options 
       <createIndex-options>`, including whether the index is a global index.

   * - ``lastmod``
     - Timestamp
     - :ref:`Timestamp <document-bson-type-timestamp>` that provides 
       information on when the index was last modified and the index version.

   * - ``collectionUUID``
     - UUID
     - :abbr:`UUID (Universally unique identifier)` of the sharded 
       collection.

   * - ``indexCollectionUUID``
     - UUID
     - :abbr:`UUID (Universally unique identifier)` of the 
       secondary collection that tracks the global index. 
