The following queries search the sample
:ref:`sample_mflix.embedded_movies <mflix-embedded_movies>`
collection using the :pipeline:`$vectorSearch` stage. The queries
search the ``plot_embedding_voyage_3_large`` field, which contains
embeddings created using the ``voyage-3-large`` embedding model from
|voyage|.