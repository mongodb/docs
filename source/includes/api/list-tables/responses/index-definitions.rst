.. list-table::
   :header-rows: 1
   :stub-columns: 1
   :widths: 15 10 75

   * - Name
     - Type
     - Description

   * - ``analyzer``
     - Optional
     - :ref:`Analyzer <analyzers-ref>` to use when creating the
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
     - :ref:`Analyzer <analyzers-ref>` to use when searching the
       index.

   * - ``status``
     - string
     - Status of the index. Value can be one of the following statuses: 

       - ``IN_PROGRESS`` - |service| is building or re-building the 
         index after an edit.
       - ``STEADY`` - Index is ready to use.
       - ``FAILED`` - |service| could not build the index.
       - ``MIGRATING`` - |service| cluster tier is being upgraded and 
         indexes are migrating. 
