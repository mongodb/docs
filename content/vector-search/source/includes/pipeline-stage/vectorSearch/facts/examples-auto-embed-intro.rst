The following queries search the :ref:`sample dataset <atlas-sample-data>` 
using the :pipeline:`$vectorSearch` stage. The queries search the field 
indexed as the ``autoEmbed`` type, for which {+avs+} automatically 
generates embeddings using the ``model`` specified in the index 
definition. 

When you run a text query against the indexed ``autoEmbed`` type field, 
{+avs+} automatically generates embeddings for the text string in your 
query using the embedding model that you specified in the query or the
the index used by the query. It uses the embeddings to search the index
for documents that are semantically similar to the specified query text. 