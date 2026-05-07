.. list-table:: 
   :stub-columns: 1 
   :widths: 20 80

   * - Database
     - Database that contains the indexed collection.

   * - Collection
     - Collection that contains the indexed documents.

   * - Index Name 
     - Label that identifies the index. 

   * - Status
     - Current state of the index on the primary node of the
       cluster. For valid values, see
       :ref:`avs-node-status-ref`. 

   * - Queryable
     - Icon that indicates whether the index is ready to use in queries. 
       Value can be one of the following icons: 

       - :icon-fa5:`check` - for indexes that you can use to query the
         collection. 
       - :guilabel:`X` - for indexes that you can't use to query the
         collection.

   * - Type
     - Label that indicates a {+fts+} or {+avs+} index. Values
       include:  

       - ``search`` for {+fts+} indexes.
       - ``vectorSearch`` for {+avs+} indexes.

   * - Index Fields
     - List that contains the fields that this index indexes.

   * - Documents 
     - Number of indexed documents out of the total number of
       documents in the collection.

   * - Size
     - Size of the index on the primary node.

   * - Required Memory
     - Approximate amount of memory required to run 
       vector search queries.

   * - Actions 
     - Actions that you can take on the index. You can:

       - :ref:`avs-edit-index`
       - :ref:`avs-delete-index`

       You can't run queries in the :guilabel:`Search Tester` UI
       against indexes of the ``vectorSearch`` type. If you click the
       :guilabel:`Query` button, {+avs+} displays a sample
       :pipeline:`$vectorSearch` that you can copy, modify, and run
       in {+atlas-ui+} and using other
       :ref:`supported clients <vectorSearch-agg-pipeline-clients>`. 