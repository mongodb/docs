This index definition:

- Indexes the ``plot_embedding_voyage_3_large`` field as the ``vector``
  :ref:`type <avs-types-vector>`. This field contains :term:`vector
  embeddings` that represent the summary of a movie's plot.
     
  - Specifies ``2048`` :term:`vector dimensions <vector>`.
  - Measures :ref:`similarity <avs-similarity-functions>` using ``dotProduct`` similarity.
  - Enables :ref:`automatic <avs-automatic-quantization>`
    ``quantization`` of the vectors. 
