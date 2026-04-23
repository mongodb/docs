The following query filters the documents for movies released between
January 01, ``1955`` and January 01, ``1975`` before performing the
semantic search against the sample vector data. It uses the
:query:`$and` operator to perform a logical ``AND`` operation of the
specified dates. It then searches the
``plot_embedding_voyage_3_large`` field in the filtered documents for
``150`` nearest neighbors using the vector embeddings for the string
*kids adventure*, and returns ``10`` documents in the results. The
query also specifies a :pipeline:`$project` stage to do the following:

- Exclude the ``_id`` field and include only ``plot``, ``title``, 
  and ``year`` fields in the results.
- Add a field named ``score`` that shows the vector search score
  of the documents in the results.
