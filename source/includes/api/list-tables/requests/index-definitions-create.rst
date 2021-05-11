.. list-table::
   :header-rows: 1
   :stub-columns: 1
   :widths: 15 10 15 60

   * - Name
     - Type
     - Necessity
     - Description

   * - ``analyzer``
     - string
     - Optional
     - :ref:`Analyzer <analyzers-ref>` to use when creating the
       index. Defaults to :ref:`lucene.standard <ref-standard-analyzer>`.

   * - ``analyzers``
     - array of |bson| objects
     - Optional
     - :ref:`Custom analyzers <custom-analyzers>` to use in this index. 

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
     - Conditional
     - Required if ``mappings.fields`` is omitted.
     
       Indicates whether the index uses dynamic or static mappings. For 
       dynamic mapping, set the value to ``true``. For static mapping, 
       specify the fields to index using ``mappings.fields``. 

   * - | ``mappings``
       | ``.fields``
     - object
     - Conditional
     - Required if ``mappings.dynamic`` is ``false`` or is omitted.
     
       Object containing one or more field specifications.

   * - ``name``
     - string
     - Required
     - Name of the index.

   * - ``searchAnalyzer``
     - string
     - Optional
     - :ref:`Analyzer <analyzers-ref>` to use when searching the
       index. Defaults to :ref:`lucene.standard 
       <ref-standard-analyzer>`.

