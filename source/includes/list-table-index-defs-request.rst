.. list-table::
   :header-rows: 1
   :widths: 25 15 20 40

   * - Name
     - Type
     - Required/Optional
     - Description

   * - ``collectionName``
     - string
     - Required
     - The name of the collection the index is on.

   * - ``database``
     - string
     - Required
     - The name of the database the collection is in.

   * - ``analyzer``
     - string
     - Optional
     - The :ref:`analyzer <analyzers-ref>` to use when creating the
       index. Defaults to :ref:`lucene.standard
       <ref-standard-analyzer>`.

   * - ``searchAnalyzer``
     - string
     - Optional
     - The :ref:`analyzer <analyzers-ref>` to use when searching the
       index. Defaults to :ref:`lucene.standard
       <ref-standard-analyzer>`.

   * - ``mappings``
     - object
     - Required
     - Object containing index specifications for the collection fields.

   * - ``mappings.dynamic``
     - boolean
     - Required
     - Indicates whether the index uses dynamic or static mappings.

   * - ``mappings.fields``
     - object
     - Optional
     - Object containing one or more field specifications. Required if
       ``mappings.dynamic`` is set to ``false``.

   * - ``name``
     - string
     - Required
     - The name of the index.
