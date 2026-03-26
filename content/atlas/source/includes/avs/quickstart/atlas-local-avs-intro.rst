This quick start describes how to create a local |service| deployment  
with sample data loaded into the deployment, create a {+avs+} index for 
the sample data, and then perform semantic search to return documents 
that are similar to your query. 

*Time required: 15 minutes*

Objectives
~~~~~~~~~~

In this quick start, you complete the following steps:

1. Deploy |service| locally via {+atlas-cli+} with sample data loaded.

   To create a local |service| deployment using Docker commands, see 
   :ref:`atlas-cli-deploy-docker`.

2. Create an index definition for the 
   ``sample_mflix.embedded_movies`` collection that indexes the 
   ``plot_embedding_voyage_3_large`` field as the ``vector`` type. The 
   ``plot_embedding_voyage_3_large`` field contains embeddings created
   using |voyage|'s ``voyage-3-large`` embedding model. The index 
   definition specifies ``2048`` vector dimensions and measures 
   similarity using ``dotProduct``.

#. Run a {+avs+} query that searches the sample 
   ``sample_mflix.embedded_movies`` collection. The query uses the 
   :pipeline:`$vectorSearch` stage to search the
   ``plot_embedding_voyage_3_large`` field, which contains embeddings
   created using |voyage|'s ``voyage-3-large`` embedding model. The
   query searches the ``plot_embedding_voyage_3_large`` field using
   vector embeddings for the string *time travel*. It considers up to
   ``150`` nearest neighbors, and returns ``10`` documents in the
   results.

To learn more, see :ref:`avs-qs-learning-summary`.

Before You Begin 
~~~~~~~~~~~~~~~~

Before you begin, you must download the following: 

- Docker 
- {+atlas-cli+} v5.3.1 or later
- {+mongosh+}
