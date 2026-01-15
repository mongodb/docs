.. list-table::
   :widths: 15 15 5 65
   :header-rows: 1

   * - Parameter
     - Type
     - Required
     - Description
     
   * - ``query``
     - String
     - Yes
     - Query string. The query can contain a maximum of 8,000 tokens 
       for ``rerank-2.5`` and ``rerank-2.5-lite``. For 
       ``rerank-2.5`` and ``rerank-2.5-lite``, you can append or 
       prepend optional instructions to the query to better guide the 
       relevance.

   * - ``documents``
     - Array of Strings (``List[str]``)
     - Yes
     - Documents to rerank as a list of strings. The number of 
       documents cannot exceed 1,000. The sum of the number of tokens 
       in the query and the number of tokens in any single document 
       cannot exceed: 
       
       - 32,000 for ``rerank-2.5`` and ``rerank-2.5-lite``

       The total number of tokens is defined using the following 
       formula:
       
       .. include:: /includes/tables/shared/token-formula.rst
       
       The total number of tokens cannot exceed the following limits:
       
       - 600K for ``rerank-2.5`` and ``rerank-2.5-lite``
       
   * - ``model``
     - String
     - Yes
     - Name of the model. Valid values: ``rerank-2.5``,
       ``rerank-2.5-lite``, ``rerank-2``, ``rerank-2-lite``.

   * - ``top_k``
     - Integer
     - No
     - Number of most relevant documents to return. Defaults to 
       ``None``. When you omit this parameter, {+voyageai+} returns the 
       reranking results of all documents.

   * - ``truncation``
     - Boolean
     - No
     - .. include:: /includes/tables/shared/reranker-truncation-description.rst