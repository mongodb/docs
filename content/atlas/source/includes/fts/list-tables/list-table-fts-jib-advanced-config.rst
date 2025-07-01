.. list-table:: 
   :header-rows: 1
   :widths: 20 60 20

   * - Field Name 
     - Description 
     - Necessity
     
   * - ``mappings.fields``
     - .. include:: /includes/fts/extracts/fts-field-mappings-fields-json.rst
     - Conditional 

   * - ``storedSource``  
     - .. include:: /includes/fts/extracts/fts-stored-source.rst 
     - Optional

   * - ``synonyms`` 
     - .. include:: /includes/fts/extracts/fts-field-synonyms.rst
     - Optional 


   * - ``numPartitions``
     - The number of partitions to use if field objects exceed 2.1 billion.
     
     - Optional.
