This section demonstrates how to use the ``$rerank`` stage after the
``$rankFusion`` stage to reorder the documents in the results based on 
the relevance to the query. The query uses the ``$rankFusion`` stage to 
combine the results of a :pipeline:`$vectorSearch` and :pipeline:`$search` 
queries on the ``fullplot`` field. The ``$rerank`` stage then reorders the 
results based on the relevance to the query.