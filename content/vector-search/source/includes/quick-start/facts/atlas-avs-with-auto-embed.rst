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

2. Create an index definition for the ``sample_mflix.movies`` collection 
   that indexes the ``fullplot`` field as the ``autoEmbed`` type. The 
   index definition specifies ``voyage-4`` as the model to use 
   for generating embeddings for the ``fullplot`` field.

#. Run a {+avs+} query that searches the sample ``sample_mflix.movies`` 
   collection. The query uses the :pipeline:`$vectorSearch` stage to 
   search the ``fullplot`` field for the movies semantically similar 
   to the query string *journey through the country side*. It considers 
   up to ``100`` nearest neighbors and returns ``10`` documents in the
   results.

To learn more, see :ref:`avs-qs-learning-summary`.

Before You Begin 
~~~~~~~~~~~~~~~~

Before you begin, you must have the following: 

- Docker 
- {+atlas-cli+} v5.3.1 or later
- {+mongosh+}
- |voyage| |api| keys created from the {+atlas-ui+}

  To learn more about creating a |voyage| |api| key from the 
  {+atlas-ui+}, see :ref:`voyage-api-keys`.

  .. note:: 
  
     Local |service| deployment doesn't support |voyage| |api| keys 
     created directly from |voyage|.
