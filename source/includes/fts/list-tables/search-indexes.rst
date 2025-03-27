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

   * - :guilabel:`Status`
     - Status of the index. To learn more, see :ref:`search-index-status`.

   * - :guilabel:`Queryable`
     - Icon that identifies whether collection is queryable using the
       index. Value can be one of the following icons: 

       - :icon-fa5:`check` - for indexes that you can use to query the
         collection. 
       - :guilabel:`X` - for indexes that you can't use to query the
         collection.

   * - :guilabel:`Type`
     - Type of index. Value can be one of the following types of index: 

       - ``search`` - for running :pipeline:`$search` and
         :pipeline:`$searchMeta` queries.
       - ``vectorSearch`` - for running :pipeline:`$vectorSearch`
         queries. 

   * - :guilabel:`Index Fields`
     - Indexed fields. Value is ``dynamic`` if you enabled :ref:`dynamic 
       mappings <static-dynamic-mappings>`. For :ref:`static mappings
       <static-dynamic-mappings>`, the column shows all of the indexed
       fields.  

   * - :guilabel:`Documents`
     - Approximate number and percentage of indexed documents out of the
       total number of documents in the collection during and after the
       index build on the primary or search node on the {+cluster+}. 

   * - :guilabel:`Size`
     - Size of the index.

   * - :guilabel:`Actions`
     - Actions you can take on the index: 

       - Click :guilabel:`Query` to go to the :guilabel:`Search Tester`
         for querying the collection. 
       - Click :icon-fa5:`ellipsis-h` and select one of the following
         actions to take on the index: 

         - :ref:`Edit <ref-edit-index>` the index using the
           :guilabel:`Visual Editor` or :guilabel:`JSON Editor`. 
         - :ref:`View Query Analytics<fts-query-analytics>` for the index.
         - :ref:`Delete <ref-delete-index>` the index.