The following query uses the :pipeline:`$vectorSearch` stage to search
the ``fullplot`` field. The query automatically generates vector
embeddings for the string *young heroes caught in epic struggles
between light and darkness* using the same model that was used in the
index to perform a semantic search. It considers up to ``100``
nearest neighbors, and returns ``10`` documents in the results. The
query also specifies a :pipeline:`$project` stage to do the following:

- Exclude the ``_id`` field and include only the ``fullplot`` and
  ``title`` fields in the results.
- Add a field named ``score`` that shows the
  :ref:`vector search score <vectorSearch-agg-pipeline-score>` for
  each document in the results.
