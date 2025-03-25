This index definition:

- Indexes the ``plot_embedding`` field as the ``vector`` :ref:`type <avs-types-vector>`. 
  This field contains :term:`vector embeddings` that represent the summary of a 
  movie's plot.
     
  - Specifies ``1536`` :term:`vector dimensions <vector>`.
  - Measures :ref:`similarity <fields-similarity>` using ``dotProduct`` similarity.
  - Enables :ref:`automatic <avs-automatic-quantization>`
    ``quantization`` of the vectors. 
