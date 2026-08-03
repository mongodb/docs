The example queries in this tutorial use the following fields in the 
``embedded_movies`` collection in the ``sample_mflix`` database:

- ``fullplot``, which contains the summary of a movie's plot as a text 
  string.
- ``title``, which contains the title of the movie as a text string.
- ``text-embedding-ada-002``, which contains embeddings created by using 
  OpenAI's ``text-embedding-ada-002`` embedding model.

This tutorial walks you through the following steps:

1. Set up a {+avs+} index on the ``sample_mflix.embedded_movies``
   collection. 
#. Run :pipeline:`$vectorSearch` query with ``$rankFusion`` to
   perform the following searches:

   - Search the ``full`` field for movie plots that contain movies with 
     plots similar to ``light-hearted comedy with ghosts`` and 
     ``slapstick humor with paranormal events``.  
   - Search the ``fullplot`` and ``title`` fields for movies with plots 
     similar to ``battle between good and evil`` using embeddings from 
     |voyage|. 
   - Search the ``plot_embedding`` and ``fullplot`` fields for movies 
     with plots similar to ``journey across lands`` using embeddings from 
     OpenAI and |voyage| respectively.  