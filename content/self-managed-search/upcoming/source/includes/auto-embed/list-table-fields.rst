.. list-table::
   :header-rows: 1
   :widths: 25 75

   * - Field
     - Purpose

   * - ``type: "autoEmbed"``
     - Marks the field for automatic embedding.

   * - ``modality: "text"``
     - The data modality. ``text`` is the only supported
       modality.

   * - ``path``
     - The field in your collection to embed.

   * - ``model``
     - The |voyage| model name. The model must be one that your
       |api| key has access to.

   * - ``numDimensions``
     - The number of dimensions for the embedding vector. The
       model determines the supported dimensions.

   * - ``similarity``
     - The similarity function to use for vector search. The
       supported functions are ``cosine``, ``dotProduct``, and
       ``euclidean``.

   * - ``indexingMethod``
     - The indexing method to use. The supported methods are
       ``flat`` and ``hnsw``.

   * - ``hnswOptions``
     - (Optional) The :abbr:`HNSW (Hierarchical Navigable Small Worlds)` 
       index options. Required if ``indexingMethod`` is ``hnsw``.

   * - ``quantization``
     - (Optional) The quantization type to use. The supported
       types are ``float``, ``scalar``, ``binary``, and
       ``binaryNoRescore``.