This section demonstrates how to query the data in the
``sample_mflix.embedded_movies`` collection using the ``$scoreFusion`` 
stage to re-sort the documents in the results based on their combined 
scores. The ``$scoreFusion`` stage uses mathematical expressions 
to combine the scores of a document and influence the position of the 
document in the results. The query searches for movie plots that contain 
the phrase *charming animal* in the ``plot_embedding_voyage_4_large`` and 
``fullplot`` fields by using the :pipeline:`$vectorSearch` and 
:pipeline:`$search` pipeline stages inside the ``$scoreFusion`` stage. 