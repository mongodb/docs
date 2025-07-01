This query uses the ``$vectorSearch`` stage to:

- Compare vector embeddings of the search term against vector embeddings of 
  movie plots in the ``plot_embedding`` field of the ``sample_mflix.embedded_movies`` 
  collection.

- Consider up to the 150 most similar movie plots and return the top 10 results.

It uses the ``$project`` stage to:

- Only include the movie ``plot`` and ``title`` fields in the results.

- Add a ``score`` field to show the relevance of each result to the search term.