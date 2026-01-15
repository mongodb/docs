The following queries search the sample :ref:`sample_mflix.movies
<mflix-embedded_movies>` collection using the :pipeline:`$vectorSearch`
stage. The queries search the ``fullplot`` field, which contains
embeddings automatically generated using the ``model`` specified in the
index definition. 

When you run a text query against the indexed ``fullplot`` field,
{+avs+} automatically generates embeddings for the text string in your
query using the embedding model that you specified in the query or the
the index used by the query. It uses the embeddings to search the index
for documents that are semantically similar to the specified query text. 