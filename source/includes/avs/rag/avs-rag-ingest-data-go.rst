1. Load the data.

   Use tools like
   `document loaders <https://pkg.go.dev/github.com/tmc/langchaingo/documentloaders>`__
   to load data from different data formats and locations.

#. Split the data into chunks.

   Process, or :website:`chunk 
   </developer/products/atlas/choosing-chunking-strategy-rag/?tck=docs#what-is-chunking-and-why-is-it-important-for-rag->`,
   your data. Chunking involves splitting your data into smaller parts
   to improve performance.

#. Convert the data to vector embeddings.

   Convert your data into :term:`vector embeddings` by using 
   an :term:`embedding model`. To learn more, 
   see :ref:`create-vector-embeddings`.

#. Store the data and embeddings in |service|.

   Store these embeddings in |service|. You store embeddings 
   in a field alongside other data in your collection.
