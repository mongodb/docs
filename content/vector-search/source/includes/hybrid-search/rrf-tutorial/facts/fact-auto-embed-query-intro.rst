This section demonstrates how to query the data in the
``sample_mflix.embedded_movies`` collection for the phrase *charming 
animal*. The query searches the ``fullplot`` field by using the 
:pipeline:`$vectorSearch` and :pipeline:`$search` pipeline stages 
inside the ``$rankFusion`` stage to re-sort the documents in the 
results. The ``$rankFusion`` stage ensures that documents appearing 
in both searches appear at the top of the combined results.