This index definition indexes the following fields: 

- A string field (``genres``) and a numeric field (``year``)
  for pre-filtering the data. 
- The vector embeddings field (``plot_embedding_voyage_3_large``) for
  performing vector search against pre-filtered data.

It also enables automatic quantization (``scalar``) for efficient 
processing of the embeddings and stores ``genres``, ``title``, ``plot``,
and ``year`` fields on ``mongot`` for easy retrieval.