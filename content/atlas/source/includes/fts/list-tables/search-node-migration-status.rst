.. list-table::
   :header-rows: 1
   :widths: 25 75

   * - Status
     - Description

   * - Building 
     - The index is currently building on the Search Node. Your queries
       can continue to use existing indexes while the new index is
       building.  

   * - On Deck
     - The index is successfully built on the Search Nodes, but the
       migration is not yet complete. Note that migration is complete
       only when |service| successfully builds all the indexes on the
       Search Nodes. 

   * - Ready 
     - The index on the Search Node is ready for use in your queries.
       This displays only when |service| successfully completes the
       migration to the Search Nodes.

   * - Failed 
     - The index build failed and the migration to separate Search Nodes
       is stalled. Your queries can continue to use the existing indexes.
       |service| will try to rebuild the index, but will timeout after 7
       days.  
       
       To migrate successfully, review error message for the index in
       the :guilabel:`Message` column of the :guilabel:`Status Details
       by Node` section in the :guilabel:`Status Details` page and
       address issues that are causing the index build to fail on the
       Search Nodes.