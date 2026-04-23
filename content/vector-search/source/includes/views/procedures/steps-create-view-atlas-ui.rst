.. procedure::
   :style: normal

   .. step:: Connect to your cluster using {+mongosh+}. 

      To learn more, see :ref:`connect-mongo-shell`.

   .. step:: Switch to the ``sample_mflix`` database.

      .. code-block:: sh

         use sample_mflix

   .. step:: Create a ``moviesWithEmbeddings`` View.

      .. code-block:: sh

         db.createView(
           "moviesWithEmbeddings",
           "embedded_movies",
           [
             {
               "$match": {
                 "$expr": {
                   "$ne": [
                     {
                       "$type": "$plot_embedding_voyage_3_large"
                     },
                     "missing"
                   ]
                 }
               }
             }
           ]
         )

   .. include:: /includes/shared/procedures/steps-db-deployments-page.rst

   .. include:: /includes/shared/procedures/steps-atlas-search.rst

   .. include:: /includes/shared/procedures/steps-configure-index.rst
      
   .. step:: Specify an index definition.
      
      a. Specify the following index definition:
      
         .. code-block:: json 
                        
            {
              "fields": [
                {
                  "type": "vector",
                  "numDimensions": 2048,
                  "path": "plot_embedding_voyage_3_large",
                  "similarity": "cosine"
                }
              ]
            }
      
      #. Click :guilabel:`Next`.
      
   .. include:: /includes/shared/procedures/steps-avs-finish-index-creation.rst

   .. include:: /includes/views/code-snippets/query-vector-search-view.rst
