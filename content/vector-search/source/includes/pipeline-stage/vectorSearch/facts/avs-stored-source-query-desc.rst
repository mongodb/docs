The following query uses the ``returnStoredSource`` option to
``true`` to return only the :ref:`stored source fields
<avs-stored-source-definition>` directly from {+avs+}, avoiding a full
document lookup on the backend database. The query filters the
documents for movies released between ``1970`` and ``2020``, both
inclusive, before performing the semantic search against the sample
vector data. It uses the :query:`$and` operator to perform a logical
``AND`` operation of the specified dates. It then searches the
``plot_embedding_voyage_3_large`` field in the filtered documents for
``1000`` nearest neighbors using the vector embeddings for the string
*martial arts*, and returns ``10`` documents in the results. The
query also specifies a :pipeline:`$project` stage to do the following:

- Exclude the ``_id`` field and return only the fields stored on ``mongot``.
- Add a field named ``score`` that shows the vector search score
  of the documents in the results.
