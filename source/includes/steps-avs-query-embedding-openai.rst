.. procedure::
   :style: normal

   .. step:: Create the {+avs+} index.

      To enable vector search queries on your data,
      you must create an {+avs+} index on your
      collection.

      Run the following code to create an index on the
      ``sample_db.embeddings`` collection that specifies the 
      ``embedding`` field as the :ref:`vector
      <avs-types-vector-search>` type, ``1536`` vector 
      dimensions, and the similarity measure as ``euclidean``.

      .. code-block:: python
         :copyable: true 

         from pymongo.operations import SearchIndexModel

         # Create your index model, then create the search index
         search_index_model = SearchIndexModel(
           definition = {
             "fields": [
               {
                 "type": "vector",
                 "path": "embedding",
                 "numDimensions": 1536,
                 "similarity": "euclidean"
               }
             ]
           },
           name="vector_index",
           type="vectorSearch",
         )
         collection.create_search_index(model=search_index_model)
                  
      To learn more, see :ref:`avs-create-index`.

   .. step:: Create embeddings for vector search queries and run a query. 

      .. include:: /includes/avs-run-query-description.rst

      .. io-code-block:: 
         :copyable: true 
         
         .. input:: 
            :language: python

            # Generate embedding for the search query
            query_embedding = get_embedding("ocean tragedy")

            # Sample vector search pipeline
            pipeline = [
               {
                  "$vectorSearch": {
                        "index": "vector_index",
                        "queryVector": query_embedding,
                        "path": "embedding",
                        "exact": true,
                        "limit": 5
                  }
               }, 
               {
                  "$project": {
                     "_id": 0, 
                     "text": 1,
                     "score": {
                        "$meta": "vectorSearchScore"
                     }
                  }
               }
            ]

            # Execute the search
            results = collection.aggregate(pipeline)

            # Print results
            for i in results:
               print(i)

         .. output:: 
            :language: json

            {'text': 'Titanic: The story of the 1912 sinking of the largest luxury liner ever built','score': 0.4551968574523926}
            {'text': 'Avatar: A marine is dispatched to the moon Pandora on a unique mission','score': 0.4050074517726898}
            {'text': 'The Lion King: Lion cub and future king Simba searches for his identity','score': 0.3594386577606201}

