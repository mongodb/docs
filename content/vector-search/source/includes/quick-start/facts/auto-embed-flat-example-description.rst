This index definition indexes the following fields from the 
:ref:`sample_mflix.movies <mflix-movies>` sample dataset:

- A string field (``genres``) and a numeric field (``year``) for
  pre-filtering the data. 
- The ``fullplot`` field as the ``autoEmbed`` type to enable
  Automated Embedding for that field using the ``voyage-4`` embedding
  model.

The index definition also specifies the: 

- ``similarity`` parameter as ``dotProduct`` to measure the similarity 
  between the query vector and the indexed vectors using the dot product 
  similarity function.
- ``indexingMethod`` parameter as ``flat`` to use the :ref:`flat 
  <mdb-vs-indexing-method-auto>` index structure.