.. list-table:: 
   :header-rows: 1
   :widths: 25 53 22

   * - Field Name 
     - Description 
     - Necessity
     
   * - :guilabel:`Index Analyzer` 
     - .. include:: /includes/extracts/fts-field-analyzer.rst

       Corresponds to the  ``analyzer`` setting.
     - Optional
       
   * - :guilabel:`Search Analyzer` 
     - .. include:: /includes/extracts/fts-field-search-analyzer.rst

       Corresponds to the  ``searchAnalyzer`` setting.
     - Optional
        
   * - :guilabel:`Dynamic Mapping` 
     - .. include:: /includes/extracts/fts-field-ui-mappings-dynamic.rst

       Corresponds to the  ``mappings.dynamic`` setting.
     - Required
     
   * - :guilabel:`Store Full Document`
     - .. include:: /includes/extracts/fts-stored-source-vib.rst 

     - Required

   * - :guilabel:`Field Mappings`
     - .. include:: /includes/extracts/fts-field-mappings-fields-vib.rst

       Corresponds to the  ``mappings.fields`` setting.
     - Conditional   
