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
     - .. include:: /includes/extracts/fts-stored-source-json.rst
