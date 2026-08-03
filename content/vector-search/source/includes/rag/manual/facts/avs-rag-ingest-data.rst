1. Prepare your data.

   Load, process, and :website:`chunk 
   </developer/products/atlas/choosing-chunking-strategy-rag/>`,
   your data to prepare it for your |rag| application. 
   Chunking involves splitting your data into smaller parts
   for optimal retrieval.

#. Convert the data to vector embeddings.

   Convert your data into vector embeddings by using 
   an :term:`embedding model`. You can automatically generate embeddings 
   by using :ref:`Automated Embedding <avs-auto-embeddings>` or manually 
   generate embeddings by using an :ref:`embedding model 
   <create-vector-embeddings>`. 

#. Store the data and embeddings in MongoDB.

   For Automated Embedding, {+avs+} stores the embeddings in a 
   :ref:`dedicated internal database <auto-embed-materialized-views>`. 
   For manually created embedding, you store the embedding as 
   a field alongside other data in your collection on your cluster. 
