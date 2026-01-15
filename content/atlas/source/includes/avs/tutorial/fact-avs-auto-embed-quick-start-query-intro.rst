This query uses the :pipeline:`$vectorSearch` stage to:

- Generate vector embeddings for the query text using the embedding model,  
  ``voyage-4``, in the index definition. 
- Compare vector embeddings for the query text with the vector embeddings 
  for the ``fullplot`` field automatically generated using the embedding 
  model, ``voyage-4``, in the index definition.
- Consider up to ``100`` most similar movie plots and return the top 
  ``10`` results.

It uses the ``$project`` stage to:

- Only include the movie ``fullplot`` and ``title`` fields in the results.
- Add a ``score`` field to show the relevance of each result to the search 
  term.

To learn more about this pipeline stage, see :ref:`return-vector-search-results`.