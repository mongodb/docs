To run a vector search query, generate a 
:ref:`query vector <vectorSearch-agg-pipeline-options>`  
to pass into your aggregation pipeline.

For example, the following code does the following: 

- Creates an embedding for the string ``ocean tragedy`` by
  calling the embedding function that you defined in the 
  :ref:`previous example <create-embeddings-examples>`.

- Passes the embedding into the ``queryVector`` 
  field in your aggregation pipeline.

- Runs the vector search query. It return
  semantically similar documents in order of relevance and  
  their :ref:`vector search score <vectorSearch-agg-pipeline-score>`.
