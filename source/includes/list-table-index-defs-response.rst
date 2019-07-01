.. list-table::
   :header-rows: 1
   :widths: 25 15 60

   * - Name
     - Type
     - Description

   * - ``collectionName``
     - string
     - The name of the collection the index is on.

   * - ``database``
     - string
     - The name of the database the collection is in.

   * - ``indexID``
     - string
     - The unique identifier for the index.

   * - ``analyzer``
     - Optional
     - The :ref:`analyzer <analyzers-ref>` to use when creating the
       index.

   * - ``searchAnalyzer``
     - string
     - The :ref:`analyzer <analyzers-ref>` to use when searching the
       index.

   * - ``mappings``
     - object
     - Object containing index specifications for the collection fields.

   * - ``mappings.dynamic``
     - boolean
     - Indicates whether the index uses dynamic or static mappings.

   * - ``mappings.fields``
     - object
     - Object containing one or more field specifications.

   * - ``name``
     - string
     - The name of the index.