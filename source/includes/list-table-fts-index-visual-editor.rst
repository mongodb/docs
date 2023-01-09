.. list-table:: 
   :header-rows: 1
   :widths: 25 53 22

   * - Field Name 
     - Description 
     - Necessity
     
   * - :guilabel:`Index Analyzer` 
     - .. include:: /includes/extracts/fts-field-analyzer.rst

       Corresponds to the  ``analyzer`` JSON :ref:`setting
       <ref-index-definitions>`. 
     - Optional
       
   * - :guilabel:`Query Analyzer` 
     - .. include:: /includes/extracts/fts-field-search-analyzer.rst

       Corresponds to the  ``searchAnalyzer`` JSON :ref:`setting
       <ref-index-definitions>`. 
     - Optional
        
   * - :guilabel:`Dynamic Mapping` 
     - .. include:: /includes/extracts/fts-field-ui-mappings-dynamic.rst

       Corresponds to the  ``mappings.dynamic`` JSON :ref:`setting
       <ref-index-definitions>`. 
     - Required
