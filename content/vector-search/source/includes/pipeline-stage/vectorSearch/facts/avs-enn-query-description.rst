The following query uses the :pipeline:`$vectorSearch` stage to search
the ``plot_embedding_voyage_3_large`` field using vector embeddings
for the string *world war*. It requests exact matches and limits the
results to ``10`` documents only. The query also specifies a
:pipeline:`$project` stage to do the following:

- Exclude the ``_id`` field and include only the ``plot``, ``title``,
  and ``year`` fields in the results.
- Add a field named ``score`` that shows the vector search score
  of the documents in the results.
