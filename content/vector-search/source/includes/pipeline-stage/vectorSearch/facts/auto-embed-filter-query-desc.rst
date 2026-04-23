The following query uses the :pipeline:`$vectorSearch` stage to search
the ``fullplot`` field for movies. The query automatically generates
vector embeddings for the string *epic fantasy journey with reluctant 
heroes* using the ``voyage-4`` embedding model, which is the same model 
that was used to index the ``fullplot`` field, to perform a semantic 
search. The query specifies the following criteria to pre-filter the 
documents for the semantic search:

- Include only movies released between the years ``1980`` to ``2020``,
  both inclusive.
- Include only movies in the genres ``Action``, ``Adventure``, and
  ``Family``.

It considers up to ``100`` nearest neighbors, and returns ``10``
documents in the results. The query also specifies a
:pipeline:`$project` stage to do the following:

- Exclude the ``_id`` field and include only the ``fullplot``,
  ``genres``, and ``title`` fields in the results.
- Add a field named ``score`` that shows the
  :ref:`vector search score <vectorSearch-agg-pipeline-score>` for
  each document in the results.
