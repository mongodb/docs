a. Modify the settings.

   .. list-table:: 
      :header-rows: 1

      * - Setting
        - Necessity
        - Value

      * - :guilabel:`Path`
        - Required
        - Add the text field for which you want to enable Automated
          Embedding. 

      * - :guilabel:`Embedding Model`
        - Required
        - Modify the |voyage| embedding model to use for generating 
          embeddings. You can specify one of the following models:

          - ``voyage-4`` - (**Recommended**) Optimized for general-purpose 
            and multilingual retrieval quality. 
          - ``voyage-4-large`` - Maximum accuracy for complex semantic 
            relationships.
          - ``voyage-4-lite`` - Optimized for high-volume, cost-sensitive 
            applications. 
          - ``voyage-code-3`` - Specialized for code search and technical 
            documentation.

      * - :guilabel:`Advanced`
        - Optional
        - Configure additional settings for your index. If omitted, {+avs+} 
          uses the default values for these settings.

          - :guilabel:`Quantization` - Select the quantization type for your
            embeddings. Value can be ``scalar``, ``float``, ``binary``, or 
            ``binaryNoRescore``.  Defaults to ``scalar``. 
          - :guilabel:`Number of Dimensions` - Select the number of dimensions
            for your embeddings. Value can be ``256``, ``512``, ``1024``, or
            ``2048``. Defaults to ``1024``.
          - :guilabel:`Similarity Function` - Select the similarity function to
            use for your embeddings. Value can be ``euclidean``, ``cosine``, or
            ``dot product``. Defaults to ``dot product``.

   You can add multiple fields to your index. However: 
   
   - You can't edit an existing ``autoEmbed`` type field.
   - You can't add a field of type ``vector`` and ``autoEmbed`` in the same index.

#. Specify the fields to use to pre-filter your data. 

   To add a field to pre-filter your data, select the field from the
   :guilabel:`Path` dropdown. You can add multiple fields to
   pre-filter your data.

#. Click :guilabel:`Next` to review your index.
