.. list-table:: 
     :header-rows: 1
     :widths: 20 60 20 
     
     * - Field Name 
       - Description 
       - Necessity
     
     * - Index Analyzer 
       - Select the :ref:`analyzer <analyzers-ref>` to use for 
         indexing the collection data from the dropdown. By 
         default, |fts| uses the :ref:`standard 
         <ref-standard-analyzer>` analyzer.
       - Optional
       
     * - Query Analyzer 
       - Select the :ref:`analyzer <analyzers-ref>` to use when 
         parsing data for the |fts| queries from the dropdown. By 
         default, |fts| uses the :ref:`standard 
         <ref-standard-analyzer>` analyzer.
       - Optional
        
     * - Dynamic Mapping 
       - Select dynamic or static mapping 
         of fields. To disable dynamic mapping, set 
         :guilabel:`Dynamic Mapping` to :guilabel:`Off`. By 
         default, dynamic mapping is enabled. If you disable 
         dynamic mapping, you must specify the fields to index. 
         To learn more about dynamic and static mappings, see 
         :ref:`ref-index-definitions`.
       - Required
     
     * - Field Mappings
       - Required if dynamic mapping is disabled.
        
         To add the fields to index, click :guilabel:`Add Field`. 
         You must specify the following settings for each field: 
        
         - Field name.
         - Static or dynamic mapping. If you disable dynamic 
           mapping, all |bson| data in the field will not be 
           automatically indexed.
         - Field data type. Click :guilabel:`Add Data Type` and 
           select the data type from the dropdown. To learn more 
           about the available data types and their options, see 
           :ref:`bson-data-chart` and :ref:`bson-data-types`.

           .. include:: /includes/fact-fts-index-field-order.rst

       - Conditional
