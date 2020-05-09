.. list-table::
   :header-rows: 1
   :stub-columns: 1
   :widths: 15 10 10 65

   * - Name
     - Type
     - Necessity
     - Description

   * - ``analyzer``
     - string
     - Optional
     - :ref:`analyzer <analyzers-ref>` to use when creating the
       index. Defaults to :ref:`lucene.standard <ref-standard-analyzer>`.

   * - ``collectionName``
     - string
     - Required
     - Name of the collection the index is on.

   * - ``database``
     - string
     - Required
     - Name of the database the collection is in.

   * - ``mappings``
     - object
     - Required
     - Object containing index specifications for the collection
       fields.

   * - | ``mappings``
       | ``.dynamic``
     - boolean
     - Required
     - Indicates whether the index uses dynamic or static mappings.

   * - | ``mappings``
       | ``.fields``
     - object
     - Optional
     - Object containing one or more field specifications. Required if
       ``mappings.dynamic`` is set to ``false``.

   * - ``name``
     - string
     - Required
     - Name of the index.

   * - ``searchAnalyzer``
     - string
     - Optional
     - :ref:`analyzer <analyzers-ref>` to use when searching the
       index. Defaults to :ref:`lucene.standard <ref-standard-analyzer>`.

