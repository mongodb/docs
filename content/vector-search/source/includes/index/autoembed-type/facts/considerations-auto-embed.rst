If you want to generate embeddings for text data in your collection, 
you can use the ``autoEmbed`` type to index the field with text data. 

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
