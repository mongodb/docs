.. procedure:: 
   :style: normal

   .. step:: Connect to your cluster via |compass|.
      
      Open {+Compass+} and connect to your cluster. For
      detailed instructions, see :ref:`atlas-connect-via-compass`. 
   
   .. step:: Specify the database and collection.
      
      On the :guilabel:`Database` screen, click the |database|, then click the |collection|.

   .. step:: Click the :guilabel:`Indexes` tab, then :guilabel:`Search Indexes`.

      The page displays the following: 

      .. list-table:: 
         :widths: 20 80 
         :header-rows: 1

         * - Column Name 
           - Description 

         * - :guilabel:`Name and Fields`
           - Name of the index and and the name of the indexed fields.

         * - :guilabel:`Type`
           - Type of index. Value can be ``Search`` or ``Vector Search``.

         * - :guilabel:`Status`
           - Status of the index. To learn more, see
             :ref:`search-index-status`. 

         * - :guilabel:`Actions`
           - Actions you can perform on the index when you hover over
             the index. You can take the following actions: 

             - Aggregate - to switch to the :guilabel:`Aggregations` tab
               to run queries using the index.
             - :icon-fa4:`pencil` - to edit the index in raw |json| format.
             - :icon-fa4:`trash-o` - to delete the index.
