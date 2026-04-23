The following queries use the :pipeline:`$vectorSearch` pipeline stage
to search for movies that match the specified vector embeddings. The queries
specify a search for up to ``100`` nearest neighbors and limit the
results to ``10`` documents only. The queries also specify a 
:pipeline:`$project` stage to perform the following actions: 

- Exclude the ``_id`` field and include only the ``title``,
  ``genres``, ``plot``, and ``year`` fields in the results.
- Add a field named ``score`` that shows the vector search score for
  each document in the results.
