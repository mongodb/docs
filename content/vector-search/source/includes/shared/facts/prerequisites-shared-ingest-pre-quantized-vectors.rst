To quantize your |bson| ``binData`` vectors, you must have the
following:

- A cluster running MongoDB version 6.0.11, 7.0.2, or
  later. 
        
  Ensure that your :abbr:`IP address (Internet Protocol address)` is
  included in your |service| project's :ref:`access list <access-list>`. 

- Access to an embedding model that supports byte vector output. 

  The outputs from the following embedding models
  can be used to generate |bson| ``binData`` vectors with
  a supported MongoDB driver:

  .. list-table:: 
     :widths: 50 50
     :header-rows: 1

     * - Embedding Model Provider 
       - Embedding Model
     * - `Voyage AI <https://www.voyageai.com/>`__ 
       - ``voyage-3-large``
     * - `Cohere <https://cohere.com/>`__ 
       - ``embed-english-v3.0``
     * - `Nomic <https://www.nomic.ai/>`__ 
       - ``nomic-embed-text-v1.5``
     * - `Jina <https://jina.ai/>`__ 
       - ``jina-embeddings-v2-base-en``
     * - `Mixedbread <https://www.mixedbread.ai/>`__ 
       - ``mxbai-embed-large-v1``

  Scalar quantization preserves recall for these
  models because these models are all trained to be quantization aware.
  Therefore, :term:`recall` degradation for scalar quantized embeddings
  produced by these models is minimal even at lower dimensions like 384. 