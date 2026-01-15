.. list-table::
   :widths: 15 15 70
   :header-rows: 1

   * - Attribute
     - Type
     - Description
   * - ``embeddings``
     - Nested Array of Floats
       (``List[List[float]]``)
     - List of embeddings for the corresponding list of inputs, where 
       each embedding is a vector represented as a list of floats.

   * - ``text_tokens``
     - Integer
     - Total number of text tokens in the list of inputs.

   * - ``image_pixels``
     - Integer
     - Total number of image pixels in the list of inputs.

   * - ``total_tokens``
     - Integer
     - Combined total of text, image, and video tokens. Every 560 pixels
       counts as a token.