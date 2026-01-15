.. list-table::
   :widths: 15 15 70
   :header-rows: 1

   * - Attribute
     - Type
     - Description
   * - ``results``
     - Array of Objects (``List[RerankingResult]``)
     - List of ``RerankingResult``, sorted by the descending order of 
       relevance scores. When you specify this argument, the length of 
       the list equals ``top_k`` and when you omit this argument, the 
       length of the list is the number of the input documents. Each 
       element in the list is a ``RerankingResult`` object, which 
       contains the following attributes:

       - ``index`` (int) - The index of the document in the input list.
       - ``document`` (str) - The document as a string.
       - ``relevance_score`` (float) - The relevance score of the 
         document with respect to the query.

   * - ``total_tokens``
     - Integer
     - Total number of tokens in the input texts, calculated using the 
       following formula:
       
       .. include:: /includes/tables/shared/token-formula.rst