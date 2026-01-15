.. list-table::
   :widths: 15 15 70
   :header-rows: 1

   * - Attribute
     - Type
     - Description

   * - ``text_tokens``
     - Integer
     - The total number of text tokens in the list of inputs.

   * - ``image_pixels``
     - Integer
     - The total number of image pixels in the list of inputs.

   * - ``video_pixels``
     - Integer
     - The total number of video pixels in the list of inputs.

   * - ``total_tokens``
     - Integer
     - The combined total of text, image, and video tokens. Every 560
       image pixels counts as a token, while every 1120 video pixels
       counts as a token.
