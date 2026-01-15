.. list-table::
   :widths: 15 15 5 65
   :header-rows: 1

   * - Parameter
     - Type
     - Required
     - Description
     
   * - ``inputs``
     - List of dictionaries or List of Lists (``List[dict]`` or ``List[List[Union[str, PIL.Image.Image]]]``)
     - Yes
     - A list of text, image, and video sequences for which to count text tokens,
       image pixels, video frames, and total tokens. The list elements follow the same
       format as the ``inputs`` parameter of
       ``voyageai.Client.multimodal_embed()``, except that image URLs are
       not supported. To learn more, see :ref:`voyage-multimodal-embeddings`.

   * - ``model``
     - String
     - Yes
     - Name of the model (which affects how inputs are counted).
       Supported models are ``voyage-multimodal-3.5`` (recommended) and ``voyage-multimodal-3``.
       For other models that support only text, use the
       ``voyageai.Client.count_tokens()`` function to calculate token counts.
