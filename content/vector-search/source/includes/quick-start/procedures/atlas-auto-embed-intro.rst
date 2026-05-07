This quick start describes how to load sample documents that contain
text data into your cluster, create a {+avs+} index on a text field in
the collection to automatically generate embeddings for the text data
at index time and query time, and then perform semantic search to 
return documents that are similar to your query. 

*Time required: 15 minutes*

Objectives
~~~~~~~~~~

In this quick start, you complete the following steps:

1. Create an index definition for the ``sample_mflix.movies`` 
   collection that indexes the ``fullplot`` field as the ``autoEmbed`` 
   type. The index definition specifies ``voyage-4`` as the model to use for generating embeddings 
   for the ``fullplot`` field.

#. Run a {+avs+} query that searches the sample ``sample_mflix.movies`` 
   collection. The query uses the :pipeline:`$vectorSearch` stage to 
   search the ``fullplot`` field. The query performs a semantic 
   search for the phrase ``journey through the country side`` using 
   the embedding generated at query time using the ``voyage-4`` 
   embedding model. It considers up to ``100`` nearest neighbors, and 
   returns ``10`` documents in the results.

To learn more, see :ref:`avs-qs-learning-summary`.