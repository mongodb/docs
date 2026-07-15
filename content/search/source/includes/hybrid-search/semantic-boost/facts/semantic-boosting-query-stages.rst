The sample query uses the following pipeline stages to perform a
semantic search on the collection and retrieve the reciprocal rank of
the documents in the results:

.. list-table::
   :widths: 30 70

   * - :pipeline:`$vectorSearch`
     - Searches the ``plot_embedding_voyage_4_large`` field for the
       string *charming animal*, specified as vector embeddings in the
       ``queryVector`` field of the query. The query uses the
       ``voyage-4-large`` embedding model from |voyage|, which is the
       same model used for the embeddings in the
       ``plot_embedding_voyage_4_large`` field.

   * - :pipeline:`$search`
     - Searches for movies that contain the term *charming animal* in the
       *fullplot* field. For the documents in the results that match the
       ``_id`` from the vector search results, the query boosts the
       score by the adjusted vector search score for the document.
