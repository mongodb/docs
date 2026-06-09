The following query uses ``vectorSearch`` operator in the
:pipeline:`$search` stage to pre-filter the movie documents and then 
perform an |ann| search for movies. Specifically, the query:  

- Uses the :ref:`text-ref` to pre-filter the documents by a fuzzy search
  for movies that contain phrase similar to ``charming animal`` in the
  ``fullplot`` field. 
- Searches using the 2048 dimension vector embeddings generated from
  the ``voyage-3-large`` model for the string *charming animal story*.
- Limits the output to ``10`` documents only.
- Sets ``concurrent`` to ``true`` to improve query latency.