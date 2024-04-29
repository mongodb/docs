The following example query searches the sample 
``sample_mflix.embedded_movies`` collection. It uses the 
:pipeline:`$vectorSearch` stage to search the ``plot_embedding`` field, 
which contains embeddings created using OpenAI's 
``text-embedding-ada-002`` embeddings model. The query searches
the ``plot_embedding`` field using vector embeddings for the string 
*time travel*. It considers up to ``150`` nearest neighbors, and
returns ``10`` documents in the results. The query also specifies a
:pipeline:`$project` stage to do the following:  

- Exclude the ``_id`` field and include only the ``plot`` and ``title`` 
  fields in the results.
  
- Add a field named ``score`` that shows the
  :ref:`vector search score <vectorSearch-agg-pipeline-score>` for
  each document in the results. 
