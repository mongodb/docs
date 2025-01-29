To run a vector search query, generate a 
:ref:`query vector <vectorSearch-agg-pipeline-options>`  
to pass into your aggregation pipeline.

For example, this code does the following: 

- Creates a sample query embedding by calling the embedding function
  that you defined. 

- Converts the query embedding to |bson| ``float32``, ``int8``, and
  ``int1`` vector subtypes.

- Passes the embedding into the ``queryVector``  field and specifies the
  path to search in the aggregation pipeline.  

- Specifies the :pipeline:`$vectorSearch` stage in the pipeline to perform 
  an :ref:`ENN <vectorSearch-enn>` search over your embeddings.

- Runs a sample vector search query on the embeddings stored in
  the collection. 
  
- Returns semantically similar documents in order of relevance and their
  :ref:`vector search score <vectorSearch-agg-pipeline-score>`.