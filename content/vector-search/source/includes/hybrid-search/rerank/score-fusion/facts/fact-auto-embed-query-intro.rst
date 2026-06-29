This section demonstrates how to use the ``$rerank`` stage after the
``$scoreFusion`` stage to reorder the documents in the results based on 
the relevance to the query. The query uses the ``$scoreFusion`` stage to 
combine the results of a :pipeline:`$vectorSearch` query and a 
:pipeline:`$search` query on the ``fullplot`` field. The ``$rerank`` stage 
then reorders the results based on the relevance to the query.