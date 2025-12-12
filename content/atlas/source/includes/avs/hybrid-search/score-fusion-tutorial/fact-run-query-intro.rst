This section demonstrates how to query the data in the
``sample_mflix.embedded_movies`` collection for *star wars* in the
``plot_embedding_voyage_3_large`` and ``title`` fields by using the
:pipeline:`$vectorSearch` and :pipeline:`$search` pipeline stages inside
the ``$scoreFusion`` stage to re-sort the documents in the
results based on their combined scores. The ``$scoreFusion`` stage
uses mathematical expressions to combine the scores of a document and
influence the position of the document in the results.  