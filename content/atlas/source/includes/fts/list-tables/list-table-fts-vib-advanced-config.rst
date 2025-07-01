.. list-table:: 
   :header-rows: 1
   :widths: 20 60 20

   * - Field Name 
     - Description 
     - Necessity

   * - :guilabel:`Field Mappings`
     - .. include:: /includes/fts/extracts/fts-field-mappings-fields-vib.rst
       
       Corresponds to the  ``mappings.fields`` |json| setting.
       
     - Conditional 

   * - :guilabel:`Stored Source Fields`
     - .. include:: /includes/fts/extracts/fts-stored-source.rst 

       Corresponds to the ``storedSource`` |json| setting.

     - Optional  

   * - :guilabel:`Synonyms Mappings`
     - .. include:: /includes/fts/extracts/fts-field-synonyms.rst

       Corresponds to the ``synonyms`` |json| setting.

     - Optional.

   * - :guilabel:`Index Partitions`
     - The number of partitions to use if field objects exceed 2.1 billion.

       Corresponds to the ``numPartitions`` |json| setting.

     - Optional.
