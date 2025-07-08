1. Prepare your data.

   Load, process, and :website:`chunk 
   </developer/products/atlas/choosing-chunking-strategy-rag/?tck=docs#what-is-chunking-and-why-is-it-important-for-rag->`,
   your data to prepare it for your |rag| application. 
   Chunking involves splitting your data into smaller parts
   for optimal retrieval.

#. Convert the data to vector embeddings.

   Convert your data into :term:`vector embeddings` by using 
   an :term:`embedding model`. To learn more, 
   see :ref:`create-vector-embeddings`.

#. Store the data and embeddings in |service|.

   Store these embeddings in |service|. You store embeddings 
   as a field alongside other data in your collection.
