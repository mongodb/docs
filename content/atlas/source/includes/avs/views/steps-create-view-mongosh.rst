.. procedure::
   :style: normal

   .. step:: Connect to your MongoDB deployment using {+mongosh+}.

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

   .. step:: Create a {+avs+} index on the View.

      .. code-block:: sh

         db.moviesWithEmbeddings.createSearchIndex(
           "embeddingsIndex",
           "vectorSearch",
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
         )

   .. include:: /includes/avs/views/query-vector-search-view.rst
