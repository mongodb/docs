.. list-table::
   :header-rows: 1
   :widths: 20 15 15 50

   * - Model
     - Context Length
     - Dimensions
     - Description

   * - ``voyage-context-4``
     - 120,000 tokens *
     - 1024 (default), 256, 512, 2048
     - Contextualized chunk embeddings optimized for general-purpose
       and multilingual retrieval quality.

.. note::
   \* The total number of tokens across all inputs must not exceed 120K if 
   ``enable_auto_chunk = true``; otherwise they must not exceed 32K.
