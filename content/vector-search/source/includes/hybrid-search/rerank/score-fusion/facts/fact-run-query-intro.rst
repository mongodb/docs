This section demonstrates how to use the :pipeline:`$rerank` stage after the
``$scoreFusion`` stage to reorder the documents in the results using |voyage| 
:ref:`reranker models <voyage-rerankers>` to provide more accurate relevancy 
scores. The query uses the ``$scoreFusion`` stage to combine the results of a 
:pipeline:`$vectorSearch` query on the ``plot_embedding_voyage_4_large`` field 
and a :pipeline:`$search` query on the ``fullplot`` field. The ``$rerank`` 
stage then reorders the results based on the relevance to the query.