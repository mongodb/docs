a. Specify text fields to index with Automated Embedding.

   For each text field that you want to index with Automated Embeddings, 
   specify the following settings in the :guilabel:`AutoEmbed Field` 
   section of the :guilabel:`Visual Editor`: 

   .. list-table:: 
      :header-rows: 1

      * - Setting
        - Necessity
        - Value

      * - :guilabel:`Path`
        - Required
        - Select the text field for which you want to enable Automated
          Embedding. 

      * - :guilabel:`Embedding Model`
        - Required
        - Select the |voyage| embedding model to use for generating 
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
        - Specify additional settings for your index. If omitted, {+avs+} 
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

   You can add multiple fields to your index. However, you can't add a field of 
   type ``vector`` and ``autoEmbed`` in the same index.

#. (Optional) Specify fields to use to pre-filter your data. 

   In the :guilabel:`Filter Field` section of the :guilabel:`Visual Editor`, 
   select the field from the :guilabel:`Path` dropdown that you want to use 
   to pre-filter data at query time. You can index multiple ``filter`` fields.
   
   Indexing a field as the ``filter`` type allows you to pre-filter the search 
   space according to the value of the indexed field when you run 
   :pipeline:`$vectorSearch` queries. To learn more about how to use the 
   :pipeline:`$vectorSearch`  ``filter`` option, see 
   :ref:`vectorSearch-agg-pipeline-filter`. 

#. Click :guilabel:`Next` to review your index.
