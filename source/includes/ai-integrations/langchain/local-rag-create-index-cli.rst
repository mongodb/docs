.. procedure:: 
   :style: normal 

   .. step:: Define the {+avs+} index.
    
      Create a file named ``vector-index.json`` and paste the following index
      definition in the file.

      This index definition specifies indexing the ``embeddings`` field
      in an index of the :ref:`vectorSearch <avs-types-vector-search>` type
      for the ``sample_airbnb.listingsAndReviews`` collection.
      This field contains the embeddings created using the
      ``bge-large-en-v1.5`` embedding model. The index
      definition specifies ``1024`` vector dimensions and
      measures similarity using ``cosine``.

      .. code-block:: json
         :copyable: true 

         {
           "database": "sample_airbnb",
           "collectionName": "listingsAndReviews",
           "type": "vectorSearch",
           "name": "vector_index",
             "fields": [
               {
                 "type": "vector",
                 "path": "embeddings",
                 "numDimensions": 1024,
                 "similarity": "cosine"
               }
            ]
         }

   .. step:: Create the {+avs+} index.

      a. Save the file, and then run the following command
         in your terminal, replacing ``<path-to-file>`` with the path to the 
         ``vector-index.json`` file that you created.

         .. code-block:: sh
            :copyable: true 

            atlas deployments search indexes create --file <path-to-file>

      #. Once prompted by the {+atlas-cli+}, 
         select the {+deployment+} for which to create the index.
      