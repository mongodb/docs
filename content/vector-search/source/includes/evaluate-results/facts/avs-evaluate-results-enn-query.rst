This query uses the following pipeline stages: 

.. list-table:: 
   :stub-columns: 1

   * - :pipeline:`$vectorSearch` 
     - - Prefilters the documents to search for movies in the
         ``Action`` genre, and not in the ``Comedy`` genre.
       - Searches the ``plot_embedding_voyage_3_large`` field for exact nearest
         neighbors by using vector embeddings for the string
         ``time travel``. 
       - Limits the output to only 10 results.

   * - :pipeline:`$project` 
     - - Excludes all fields except ``plot``, ``title``, and
         ``genres`` from the documents in the results.  
       - Adds a field named ``score`` that shows the score of the
         documents the results.
