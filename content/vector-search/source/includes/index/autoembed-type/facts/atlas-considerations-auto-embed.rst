You can configure {+avs+} to automatically generate and manage vector
embeddings for the text data in your collection and run
:pipeline:`$vectorSearch` queries against the generated embeddings.
You can create a {+avs+} index with type ``autoEmbed`` and choose from 
available |voyage| embedding models to generate embeddings, simplifying 
indexing, updating, and querying with vectors. 

When you configure Automated Embedding, {+avs+} automatically
generates embeddings using the specified embedding model at index-time
for the specified text field in your collection, during updates, and at
query-time for your query text against the field indexed for automated
embeddings.

You can also index additional fields in your collection for
:ref:`pre-filtering <avs-types-filter-auto-embed>` your data. Filtering
your data is useful to narrow the scope of your semantic search.

Embeddings
~~~~~~~~~~

The embeddings are generated on the search process, which might be 
computationally expensive. You might have to enable auto-scaling to 
handle the increased load during first-time index build. 

Embeddings are stored on your MongoDB cluster. The storage size of the 
embeddings depends on the index settings like quantization and 
number of dimensions. You must ensure that there is sufficient disk 
space available on your cluster to store the embeddings. 

The embedding model inference platform runs on MongoDB's infrastructure 
in |gcp| in a US region. 

Billing
~~~~~~~

The pricing of embedding model used for generating embeddings is 
based on the number of tokens in your text field and queries. 
See :ref:`Billing for Automated Embedding <auto-embed-billing>` 
for more details.

Querying 
~~~~~~~~

You must use the :pipeline:`$vectorSearch` stage to query fields 
indexed as the ``autoEmbed`` type. 

.. note:: 

   You can't use the :pipeline:`$search` :ref:`vectorSearch
   <fts-vectorSearch-ref>` or the deprecated :ref:`knnBeta <knn-beta-ref>`
   operator to query fields indexed using the ``vectorSearch`` type
   index definition.
