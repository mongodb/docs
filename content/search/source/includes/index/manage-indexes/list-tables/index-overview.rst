.. list-table::
   :header-rows: 1
   :widths: 25 75

   * - Row
     - Description
   
   * - Index Analyzer
     - Chosen text analyzer that specifies how text is processed and tokenized when building the search index. 
   * - Search Analyzer
     - Chosen text analyzer that specifies how text in your search queries is processed and tokenized.	
   * - Dynamic Mapping
     - Boolean indicating whether or not you enabled :ref:`dynamic or static mappings <static-dynamic-mappings>`
       for your field mappings 
   * - Field Mappings
     - Any specified :ref:`field mappings <fts-field-mappings>`, including field name, data type, 
       and whether dynamic mapping is enabled for the individual field
   * - Stored Source Fields
     - Any defined :ref:`stored source fields <fts-stored-source-definition>`
   * - Synonym Mappings
     - Any defined :ref:`synonym mappings <synonyms-ref>` for word equivalents

