.. list-table::
   :widths: 15 15 70
   :header-rows: 1

   * - Attribute
     - Type
     - Description
   * - ``results``
     - Array of Objects (``List[ContextualizedEmbeddingsResult]``)
     - List of ``ContextualizedEmbeddingsResult`` objects, each 
       representing the result from a query or document and contains 
       the following attributes:

       - ``embeddings`` (``List[List[float]]`` or ``List[List[int]]``): A 
         list of embeddings corresponding to a list of input texts, 
         which can be either a query, document, or chunks from the 
         same document. For document chunks, the embeddings match the 
         chunk order, which reflects their position within the 
         document. Each embedding is a vector represented as a list of 
         floats when you set ``output_dtype`` to ``float`` and as a 
         list of integers for all other values of ``output_dtype`` 
         (``int8``, ``uint8``, ``binary``, ``ubinary``).
       - ``chunk_texts`` (``List[str]``): The text of the document 
         chunks, included only when you provide a chunking function 
         (``chunk_fn``). When you don't specify a chunking function, 
         {+voyageai+} assumes that you provided the chunks, and 
         ``chunk_texts`` is not returned.
       - ``index`` (Integer): The index of the query or document in 
         the input list.

   * - ``total_tokens``
     - Integer
     - Total number of tokens in the input texts, calculated using the 
       following formula:
       
       .. include:: /includes/tables/shared/token-formula.rst