The following query uses ``vectorSearch`` operator in the
:pipeline:`$search` stage to pre-filter the movie documents and then 
perform an |ann| search for movies. Specifically, the query:  

- Uses the :ref:`compound-ref` to pre-filter the documents by: 

  - Movies that contain the terms ``courtroom`` or ``lawyer`` in the
    ``fullplot`` field
  - Movies that were released between ``2000`` and ``2015`` in the
    ``year`` field

- Searches using the 2048 dimension vector embeddings generated from
  the ``voyage-3-large`` model for the string *intense courtroom
  drama*.
- Considers up to ``1000`` nearest neighbors.
- Limits the output to ``10`` documents only.
- Sets ``concurrent`` to ``true`` to improve query latency.