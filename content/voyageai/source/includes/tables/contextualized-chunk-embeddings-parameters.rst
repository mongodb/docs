.. list-table::
   :widths: 15 15 5 65
   :header-rows: 1

   * - Parameter
     - Type
     - Required
     - Description

   * - ``inputs``
     - Nested Array of Strings (``List[List[str]]``)
     - Yes
     - List of lists, where each inner list contains a query, a 
       document, or document chunks to be vectorized.

       Each inner list in ``inputs`` represents a set of text 
       elements that embed together. Each element in the list is 
       independently encoded and also encodes context from the other 
       elements in the same list.

       ``inputs = [["text_1_1", "text_1_2", ..., "text_1_n"], ["text_2_1", "text_2_2", ..., "text_2_m"]]``

       **Document Chunks.** Typically, each inner list contains chunks 
       from a single document ordered by their position in the 
       document. In this case:

       ``inputs = [["doc_1_chunk_1", "doc_1_chunk_2", ..., "doc_1_chunk_n"], ["doc_2_chunk_1", "doc_2_chunk_2", ..., "doc_2_chunk_m"]]``

       Each chunk is encoded in context with the others from the same 
       document, resulting in more context-aware embeddings. We 
       recommend that supplied chunks not have any overlap.

       **Context-Agnostic Behavior for Queries and Documents.** If 
       there is one element per inner list, each text is embedded 
       independently like standard (context-agnostic) embeddings:

       ``inputs = [["query_1"], ["query_2"], ..., ["query_k"]]``

       ``inputs = [["doc_1"], ["doc_2"], ..., ["doc_k"]]``

       Therefore, if the inputs are queries, specify a single query 
       (or length of one query) in each inner list, similar to the 
       preceding example, and set the ``input_type`` to ``query``.

       The following constraints apply to the ``inputs`` list:

       - The list must not contain more than 1,000 inputs.
       - The total number of tokens across all inputs must not exceed 
         120K.
       - The total number of chunks across all inputs must not exceed 
         16K.

   * - ``model``
     - String
     - Yes
     - Name of the model. Recommended options: ``voyage-context-3``.

   * - ``input_type``
     - String
     - No
     - .. include:: /includes/tables/shared/input-type-description.rst


   * - ``output_dimension``
     - Integer
     - No
     - Number of dimensions for resulting output embeddings. Defaults 
       to ``None``. ``voyage-context-3`` supports the following 
       ``output_dimension`` values: 2048, 1024 (default), 512, and 
       256.

   * - ``output_dtype``
     - String
     - No
     - .. include:: /includes/tables/shared/output-dtype-description.rst

   * - ``chunk_fn``
     - Function (``Callable[[str], List[str]]``)
     - No
     - Custom chunking function that takes a single string (for 
       example, document) and returns a list of strings (for example, 
       chunk of documents). Defaults to ``None``. If specified, this 
       function applies to each string in ``inputs``. For convenience, 
       ``voyageai.default_chunk_fn`` is available, which currently 
       uses LangChain's ``RecursiveCharacterTextSplitter.split_text`` 
       method. We recommend avoiding chunk overlap, so don't use 
       functions that produce overlapping chunks.