.. list-table::
   :widths: 15 15 70
   :header-rows: 1

   * - Attribute
     - Type
     - Description
     
   * - ``embeddings``
     - Nested Array of Floats or Integers
       (``List[List[float]]`` or ``List[List[int]]``)
     - List of embeddings for the corresponding list of input texts.
       Each embedding is a vector represented in one of the following
       formats:

       - List of floats when you set ``output_dtype`` to ``float``
       - List of integers when you set ``output_dtype`` to ``int8``,
         ``uint8``, ``binary``, ``ubinary``

   * - ``total_tokens``
     - Integer
     - Total number of tokens in the input texts, calculated using the 
       following formula:
       
       .. include:: /includes/tables/shared/token-formula.rst
        