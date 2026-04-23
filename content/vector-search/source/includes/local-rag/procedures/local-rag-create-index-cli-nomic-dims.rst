.. procedure:: 
   :style: normal 

   .. step:: Define the {+avs+} index.

      Create a file named ``vector-index.json`` and paste the following index
      definition in the file:

      .. code-block:: json
         :caption: vector-index.json

         {
           "database": "sample_airbnb",
           "collectionName": "listingsAndReviews",
           "type": "vectorSearch",
           "name": "vector_index",
             "fields": [
               {
                 "type": "vector",
                 "path": "embeddings",
                 "numDimensions": 768,
                 "similarity": "cosine"
               }
            ]
         }

      This index definition specifies the following:

      - Index the ``embeddings`` field in a :ref:`vectorSearch
        <avs-types-vector-search>` index type for the
        ``sample_airbnb.listingsAndReviews`` collection.
        This field contains the embeddings created using the embedding model.
      - Enforce ``768`` vector dimensions and measure similarity between
        vectors using ``cosine``.

   .. step:: Create the {+avs+} index.

      Save the file in your project directory, and then run the following command
      in your terminal, replacing ``<path-to-file>`` with the path to the 
      ``vector-index.json`` file that you created.

      .. code-block:: 
         :copyable: true 

         atlas deployments search indexes create --file <path-to-file>

      For example, your path might resemble:
      ``/Users/<username>/local-rag-mongodb/vector-index.json``.
