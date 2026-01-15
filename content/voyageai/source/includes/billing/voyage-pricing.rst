Model pricing is usage-based, with charges billed to the |service| account linked to
the API key used for access. All models include a free tier. Get started with
200 million free tokens for most models, or 50 million tokens for specialized models.

.. tabs::

   .. tab:: Text Embeddings
      :tabid: text

      Pricing is based on the number of tokens in your documents and queries.
      The free tier includes 200 million tokens for most models, and 50 million tokens for the following
      specialized models: ``voyage-finance-2``, ``voyage-law-2``, ``voyage-code-2``.

      .. list-table::
         :header-rows: 1
         :widths: 25 20 20 35

         * - Model
           - Price per 1K tokens
           - Price per 1M tokens
           - Free tokens

         * - ``voyage-4-large``
           - $0.00012
           - $0.12
           - 200 million

         * - ``voyage-4``
           - $0.00006
           - $0.06
           - 200 million

         * - ``voyage-4-lite``
           - $0.00002
           - $0.02
           - 200 million

         * - ``voyage-context-3``
           - $0.00018
           - $0.18
           - 200 million

         * - ``voyage-code-3``
           - $0.00018
           - $0.18
           - 200 million

         * - | ``voyage-finance-2``
             | ``voyage-law-2``
             | ``voyage-code-2``
           - $0.00012
           - $0.12
           - 50 million

      .. collapsible::
         :heading: Older Text Embedding Models
         :sub_heading: The following table shows the pricing for older text embedding models. Free tokens are not offered for these models.
         :expanded: false

         .. list-table::
            :header-rows: 1
            :widths: 25 20 20 35

            * - Model
              - Price per 1K tokens
              - Price per 1M tokens
              - Free tokens

            * - ``voyage-3-large``
              - $0.00018
              - $0.18
              - 0

            * - ``voyage-3.5``
              - $0.00006
              - $0.06
              - 0

            * - ``voyage-3.5-lite``
              - $0.00002
              - $0.02
              - 0

   .. tab:: Contextualized Chunk
      :tabid: contextualized-chunk

      Pricing is based on the number of tokens in your documents and queries.

      .. list-table::
         :header-rows: 1
         :widths: 25 20 20 35

         * - Model
           - Price per 1K tokens
           - Price per 1M tokens
           - Free tokens

         * - ``voyage-context-3``
           - $0.00018
           - $0.18
           - 200 million

   .. tab:: Multimodal
      :tabid: multimodal

      Pricing is based on text tokens and image pixels. The free tier
      includes 200 million text tokens and 150 billion pixels for multimodal models.
      Images are processed between 50,000 pixels (minimum) and 2 million pixels (maximum),
      with costs ranging from $0.00003 to $0.0012 per image. For pricing purposes, each video frame is considered an image.

      .. note::

         Images with fewer than 50,000 pixels are upscaled, processed, and 
         charged as a 50,000-pixel image. Images containing over 2 million pixels 
         are downsampled and charged as 2 million-pixel images.
         
      .. list-table::
         :header-rows: 1
         :widths: 25 20 20 35

         * - Model
           - Price per 1M tokens
           - Price per 1B pixels
           - Free tier

         * - ``voyage-multimodal-3.5``
           - $0.12
           - $0.60
           - 200M tokens, 150B pixels
           
      .. list-table::
         :header-rows: 1
         :widths: 25 20 20 35

         * - Image resolution
           - Number of pixels
           - Price per image
           - Price per 1K images

         * - 200px × 200px
           - 40,000
           - $0.00003
           - $0.03

         * - 1000px × 1000px
           - 1 million
           - $0.0006
           - $0.60

         * - 2000px × 2000px
           - 4 million
           - $0.0012
           - $1.20

         * - 4000px × 4000px
           - 16 million
           - $0.0012
           - $1.20

      .. example::

         The cost to vectorize a single input with 1,000 text tokens ($0.00012) and two
         4 million-pixel images (2 × $0.0012) would be $0.00252.

      .. collapsible::
         :heading: Older Multimodal Models
         :sub_heading: The following table shows the pricing for older multimodal models. Free tokens are not offered for these models.
         :expanded: false

         .. list-table::
            :header-rows: 1
            :widths: 25 20 20 35

            * - Model
              - Price per 1M tokens
              - Price per 1B pixels
              - Free tier

            * - ``voyage-multimodal-3``
              - $0.12
              - $0.60
              - 0

   .. tab:: Rerankers
      :tabid: rerankers

      Pricing is based on total processed tokens, calculated as
      ``(query tokens × number of documents) + sum of tokens in all documents``.
      The free tier includes 200 million tokens for the latest reranker models.

      .. list-table::
         :header-rows: 1
         :widths: 25 20 20 20 15

         * - Model
           - Price per 1K tokens
           - Price per 1M tokens
           - Est. price per request*
           - Free tokens

         * - ``rerank-2.5``
           - $0.00005
           - $0.05
           - $0.0025
           - 200 million

         * - ``rerank-2.5-lite``
           - $0.00002
           - $0.02
           - $0.001
           - 200 million

      \* Estimated price assumes 100 documents per request, with the sum of query tokens
      and tokens per document totaling 500.

      .. collapsible::
         :heading: Older Rerankers
         :sub_heading: The following table shows the pricing for older rerankers. Free tokens are not offered for these models.
         :expanded: false

         .. list-table::
            :header-rows: 1
            :widths: 25 20 20 20 15

            * - Model
              - Price per 1K tokens
              - Price per 1M tokens
              - Est. price per request*
              - Free tokens

            * - ``rerank-2``
              - $0.00005
              - $0.05
              - $0.0025
              - 0

            * - ``rerank-2-lite``
              - $0.00002
              - $0.02
              - $0.001
              - 0
