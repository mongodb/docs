.. list-table:: 
   :header-rows: 1
   :widths: 20 60 20

   * - Field Name 
     - Description 
     - Necessity
     
   * - ``mappings.fields``
     - .. include:: /includes/index/manage-indexes/facts/fts-field-mappings-fields-json.rst
     - Conditional 

   * - ``storedSource``  
     - .. include:: /includes/index/manage-indexes/facts/fts-stored-source.rst 
     - Optional

   * - ``synonyms`` 
     - .. include:: /includes/index/manage-indexes/facts/fts-field-synonyms.rst
     - Optional 


   * - ``numPartitions``
     - The number of partitions to use if field objects exceed 2.1 billion.
     
     - Optional.
