The following query searches the ``plot_embedding_voyage_3_large`` field using the
vector embeddings for the string *kids adventure*. It specifies multiple
comparison query operators per field to pre-filter the documents
against which to perform the semantic search. 

The filter uses the :query:`$and` aggregation pipeline operator to find
movie documents that match both the following criteria:  

- Filter by the ``genres`` field to find movies that aren't in the
  ``drama``, ``western``, or ``crime`` genre, but in the ``action``,
  ``adventure``, or ``family`` genre.  
- Filter by the ``year`` field to find movies that were released
  between the years ``1960`` and ``2000``, both inclusive.
