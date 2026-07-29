This index definition indexes the following fields:

- A string field (``genres``) and a numeric field (``year``) for
  pre-filtering the data.
- The vector embeddings field (``plot_embedding_voyage_3_large``) 
  using the |hnsw| ``indexingMethod`` for performing vector search 
  against pre-filtered data.
