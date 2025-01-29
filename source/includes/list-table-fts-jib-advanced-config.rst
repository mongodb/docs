.. list-table:: 
   :header-rows: 1
   :widths: 20 60 20

   * - Field Name 
     - Description 
     - Necessity
     
   * - ``mappings.fields``
     - .. include:: /includes/extracts/fts-field-mappings-fields-json.rst
     - Conditional 

   * - ``storedSource``  
     - Specify fields in the documents to store on |fts|. Value can be
       one of the following:

       - ``true``, to store all fields  
       - ``false``, to not store any fields 
       - :ref:`Object <fts-stored-source-document>` that specifies the 
         fields to ``include`` or ``exclude`` from storage

       If omitted, defaults to ``false``. 

       .. include:: /includes/fact-fts-stored-source-mdb-version.rst

       You can store fields of all supported :ref:`bson-data-chart` on |fts|. To learn more about the 
       syntax and fields, see :ref:`fts-stored-source-definition`.
     - Optional

   * - ``synonyms`` 
     - .. include:: /includes/extracts/fts-field-synonyms-json.rst
     - Optional 


   * - ``numPartitions``
     - The number of partitions to use if field objects exceed 2.1 billion.
       
       .. include:: /includes/fact-numpartitions-preview.rst
     
     - Optional.
