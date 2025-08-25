The following index definition indexes the
``plot_embedding_voyage_3_large`` field as the ``vector`` type 
and the ``genres`` and ``year`` fields as the ``filter`` type.

The ``plot_embedding_voyage_3_large`` field contains ``2048`` vector
dimension embeddings created using |voyage|'s ``voyage-3-large``
embedding model. The index measures similarity using ``dotProduct``
function. 
