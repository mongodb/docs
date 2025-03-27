.. list-table:: 
   :header-rows: 1
   :widths: 25 53 22

   * - Field Name 
     - Description 
     - Necessity
     
   * - :guilabel:`Index Analyzer` 
     - .. include:: /includes/fts/extracts/fts-field-analyzer.rst

       Corresponds to the  ``analyzer`` |json| setting.
     - Optional
       
   * - :guilabel:`Query Analyzer` 
     - .. include:: /includes/fts/extracts/fts-field-search-analyzer.rst

       Corresponds to the  ``searchAnalyzer`` |json| setting.
     - Optional
        
   * - :guilabel:`Dynamic Mapping` 
     - .. include:: /includes/fts/extracts/fts-field-ui-mappings-dynamic.rst

       Corresponds to the  ``mappings.dynamic`` |json| setting.
     - Required
