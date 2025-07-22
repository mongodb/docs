.. list-table:: 
   :header-rows: 1

   * - Embedding Model 
     - Vector Dimension 
     - Space Requirement

   * - OpenAI ``text-embedding-ada-002``
     - 1536
     - 6kb

   * - Google ``text-embedding-gecko``
     - 768
     - 3kb

   * - Cohere ``embed-english-v3.0`` :icon-fa5:`star`
     - 1024
     - | 1.07kb (for ``int8``)
       | 0.167kb (for ``int1``)

:icon-fa5:`star` :manual:`BinData </reference/method/BinData/>`
quantized vectors. To learn more, see
:ref:`Ingest Quantized Vectors <avs-bindata-vector-subtype>`.
