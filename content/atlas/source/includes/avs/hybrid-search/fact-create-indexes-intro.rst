This section demonstrates how to create the following indexes on the
fields in the ``sample_mflix.embedded_movies`` collection: 

- A {+avs+} index on the ``plot_embedding_voyage_3_large`` field for
  running vector queries against that field. 
- A |fts| index on the ``title`` field for running full-text search
  against that field.