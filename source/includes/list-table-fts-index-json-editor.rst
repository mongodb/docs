.. list-table:: 
   :header-rows: 1
   :widths: 20 60 20

   * - Field Name 
     - Description 
     - Necessity
     
   * - ``analyzer`` 
     - .. include:: /includes/extracts/fts-field-analyzer.rst
     - Optional
       
   * - ``searchAnalyzer`` 
     - .. include:: /includes/extracts/fts-field-search-analyzer.rst
     - Optional
        
   * - ``mappings.dynamic`` 
     - .. include:: /includes/extracts/fts-field-json-mappings-dynamic.rst
     - Required
     
   * - ``mappings.fields``
     - .. include:: /includes/extracts/fts-field-mappings-fields-json.rst

     - Conditional 

   * - ``storedSource``  
     - .. note:: 

          .. include:: /includes/fact-fts-stored-source-mdb-version.rst
       
       Specify fields in the documents to store for query-time 
       look-ups using the :ref:`returnedStoredSource 
       <fts-return-stored-source-option>` option. Value can be one of 
       the following:

       - ``true``, to store all fields  
       - ``false``, to not store any fields 
       - :ref:`Object <fts-stored-source-document>` that specifies the 
         fields to ``include`` or ``exclude`` from storage

       If omitted, defaults to ``false``. To learn more about the 
       syntax and fields, see :ref:`fts-stored-source-definition`.

       .. note:: 

          You can store fields of all :ref:`bson-data-chart` on |fts|.
          
     - Optional

   * - ``synonyms`` 
     - Specify synonym mappings to use in your index. To learn more, 
       see :ref:`synonyms-ref`.  
     - Optional 
