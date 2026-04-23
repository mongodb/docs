The following query uses the :pipeline:`$vectorSearch` stage to search
the ``plot_embedding_voyage_3_large`` field using vector embeddings
for the string *time travel*. It considers up to ``150`` nearest
neighbors, and returns ``10`` documents in the results. The query also
specifies a :pipeline:`$project` stage to do the following:

- Exclude the ``_id`` field and include only the ``plot`` and
  ``title`` fields in the results.
- Add a field named ``score`` that shows the
  :ref:`vector search score <vectorSearch-agg-pipeline-score>` for
  each document in the results.
