This section demonstrates how to create the following indexes on the
``fullplot`` field in the ``sample_mflix.embedded_movies`` collection: 

- A {+avs+} ``autoEmbed`` type index for generating embeddings and running 
  semantic search queries against that field. 
- A {+fts+} index on the ``fullplot`` field for running full-text search
  against that field.