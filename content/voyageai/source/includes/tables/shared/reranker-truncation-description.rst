Flag that specifies whether to truncate the input to satisfy the 
"context length limit" on the query and the documents. Defaults to 
``True``. 

If ``True``, {+voyageai+} truncates the query and documents to fit within 
the context length limit, before processing using the reranker model. 

If ``False``, {+voyageai+} returns an error
when the query exceeds 8,000 tokens for ``rerank-2.5`` and ``rerank-2.5-lite``.


   