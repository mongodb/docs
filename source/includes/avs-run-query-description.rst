To run a vector search query, generate a 
:ref:`query vector <vectorSearch-agg-pipeline-options>`  
to pass into your aggregation pipeline.

For example, this code does the following: 

- Creates a sample query embedding by
  calling the embedding function that you defined.

- Passes the embedding into the ``queryVector`` 
  field in your aggregation pipeline.

- Runs a sample vector search query. This query uses the
  the :pipeline:`$vectorSearch` stage to perform an 
  :ref:`ENN <vectorSearch-enn>` search over your embeddings. It returns
  semantically similar documents in order of relevance and  
  their :ref:`vector search score <vectorSearch-agg-pipeline-score>`.

  .. note::
    
     Your output might vary since environmental differences
     can introduce slight variations to your embeddings.

  To learn more, see :ref:`return-vector-search-results`.
