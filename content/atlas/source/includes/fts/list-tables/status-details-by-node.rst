.. list-table:: 
   :stub-columns: 1 
   :widths: 25 75

   * - :guilabel:`Shard` 
     - Shard name. 

   * - :guilabel:`Node` 
     - Node information.
       
   * - :guilabel:`Status` 
     - Status of the index on the node in the shard. 

   * - :guilabel:`Queryable` 
     - Icon that indicates whether the index can serve queries. 

   * - :guilabel:`Message`
     - Reason for the index status. For indexes in ``Stale`` or
       ``Failed`` state, displays the reason why the index is stale or
       why the index build failed. 

   * - :guilabel:`Node Type` 
     - Type of node. Value can be one of the following types: 
       
       - Primary
       - Secondary 
       - Search Node

   * - :guilabel:`Region` 
     - Node region. 

   * - :guilabel:`Size` 
     - Size of the index on the node.

   * - :guilabel:`Documents` 
     - Number and percentage of indexed documents.  
         
   * - :guilabel:`Actions` 
     - Actions you can take on the index in the node. You can click the
       :icon-fa5:`ellipsis-h` and select one of the following options: 
       
       - :ref:`View metrics <review-atlas-search-metrics>`.
       - Copy the host name of the node. 