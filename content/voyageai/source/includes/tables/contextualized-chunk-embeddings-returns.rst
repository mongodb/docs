A ``ContextualizedEmbeddingsObject``, containing the following 
attributes:

.. list-table::
   :widths: 15 15 70
   :header-rows: 1

   * - Attribute
     - Type
     - Description

   * - ``results``
     - ``List[ContextualizedEmbeddingsResult]``
     - One result per query or document. Each 
       ``ContextualizedEmbeddingsResult`` contains the following 
       attributes:

       - ``embeddings`` (``List[List[float]]`` or 
         ``List[List[int]]``): Embeddings corresponding to a query, a 
         document, or chunks from the same document. For document 
         chunks, embeddings are ordered to match chunk order.
       - ``chunk_texts`` (``List[str]``): Chunk text returned by the 
         Python SDK for chunked document results. If you provide a 
         client-side ``chunk_fn``, these correspond to the chunks 
         produced by that function. When auto-chunking is enabled, 
         they correspond to the backend-generated chunks.
       - ``index`` (``int``): The index of the query or document in 
         the input list.

   * - ``total_tokens``
     - Integer
     - The total number of tokens in the input texts.

Example: see the :ref:`quickstart <voyage-quickstart>`.