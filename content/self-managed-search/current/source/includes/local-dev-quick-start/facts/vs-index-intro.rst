The following index definition creates a {+avs+} index named 
``movie-vector-index`` on the ``plot_embedding_voyage_4_large`` field of the 
``embedded_movies`` collection. The index definition specifies the following:

- The ``type`` as ``vectorSearch`` to create a {+avs+} index.
- The ``path`` as ``plot_embedding_voyage_4_large`` to index the vector 
  embeddings in the field.
- The ``numDimensions`` as ``2048`` to specify the number of dimensions in the 
  vector embeddings.
- The ``similarity`` as ``dotProduct`` to specify the similarity function to use 
  to measure the similarity between the query vector and the indexed vectors.