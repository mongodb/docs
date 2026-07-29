The example queries in this tutorial use the following fields in the 
``embedded_movies`` collection in the ``sample_mflix`` database: 

- ``plot_embedding``, which contains embeddings created by using OpenAI's
  ``text-embedding-ada-002`` embedding model.
- ``plot_embedding_voyage_4_large``, which contains embeddings created
  by using |voyage|'s ``voyage-4-large`` embedding model. You use this
  field for all sample queries in this tutorial. 

For the second query listed in :ref:`avs-unionwith-use-cases`, you must
generate embeddings for another field. To try the sample query for this
use case, complete the steps in :ref:`avs-unionwith-generate-embeddings`. 

This tutorial walks you through the following steps:

1. Set up a {+avs+} index on the ``sample_mflix.embedded_movies``
   collection. 
#. Run :pipeline:`$vectorSearch` query with ``$rankFusion`` to
   perform the following searches:

   - Search the ``plot_embedding_voyage_4_large`` field for movie plots
     that contain movies with plots similar to ``light-hearted comedy
     with ghosts`` and ``slapstick humor with paranormal events``.  
   - Search the ``plot_embedding_voyage_4_large`` and
     ``title_embedding`` fields for movies with plots similar to
     ``battle between good and evil`` using embeddings from |voyage|. 
   - Search the ``plot_embedding`` and ``plot_embedding_voyage_4_large`` 
     fields for movies with plots similar to ``journey across lands``
     using embeddings from OpenAI and |voyage| respectively. 