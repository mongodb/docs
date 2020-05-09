.. list-table::
   :header-rows: 1
   :stub-columns: 1
   :widths: 15 10 75

   * - Name
     - Type
     - Description

   * - ``analyzer``
     - Optional
     - :ref:`analyzer <analyzers-ref>` to use when creating the
       index.

   * - ``collectionName``
     - string
     - Name of the collection the index is on.

   * - ``database``
     - string
     - Name of the database the collection is in.

   * - ``indexID``
     - string
     - Unique identifier for the index.

   * - ``mappings``
     - object
     - Object containing index specifications for the collection
       fields.

   * - | ``mappings``
       | ``.dynamic``
     - boolean
     - Flag indicating whether the index uses dynamic or static
       mappings.

   * - | ``mappings``
       | ``.fields``
     - object
     - Object containing one or more field specifications.

   * - ``name``
     - string
     - Name of the index.

   * - ``searchAnalyzer``
     - string
     - :ref:`analyzer <analyzers-ref>` to use when searching the
       index.
