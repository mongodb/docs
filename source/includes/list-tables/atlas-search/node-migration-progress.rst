.. list-table::
   :header-rows: 1
   :widths: 25 75

   * - Column
     - Description

   * - :guilabel:`Database`
     - Name of the database that contains the collection.

   * - :guilabel:`Collection`
     - Name of the indexed collection.

   * - :guilabel:`Index Name`
     - Name of the index.

   * - :guilabel:`Index Fields`
     - Indexed fields. Value is ``dynamic`` if you enabled :ref:`dynamic 
       mappings <static-dynamic-mappings>`. For :ref:`static mappings
       <static-dynamic-mappings>`, the column shows all of the indexed
       fields.  

   * - :guilabel:`Type`
     - Type of index. Value can be one of the following types of index: 

       - ``search`` - for running :pipeline:`$search` and
         :pipeline:`$searchMeta` queries.
       - ``vectorSearch`` - for running :pipeline:`$vectorSearch`
         queries. 

   * - :guilabel:`Status`
     - Status of the migration. To learn more, see
       :ref:`search-node-migration-status`. 

   * - :guilabel:`Size`
     - Size of the index.

   * - :guilabel:`Documents`
     - Number and percentage of indexed documents out of the total
       number of documents in the collection during and after the
       migration on the search nodes on the {+cluster+}. 
