To run a vector search query, generate a 
:ref:`query vector <vectorSearch-agg-pipeline-options>`  
to pass into your aggregation pipeline.

For example, this code does the following: 

- Creates a query embedding using your defined embedding function.
- Uses this embedding in the ``queryVector`` field and specifies the path to query.
- Uses :pipeline:`$vectorSearch` to perform an :ref:`ENN <vectorSearch-enn>` search.
- Returns semantically similar documents ranked by relevance with their 
  :ref:`search scores <vectorSearch-agg-pipeline-score>`.
