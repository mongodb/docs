.. list-table::
   :widths: 15 15 5 65
   :header-rows: 1

   * - Parameter
     - Type
     - Required
     - Description

   * - ``inputs``
     - ``List[List[str]]`` or ``List[str]``
     - Yes
     - The input texts to be vectorized.

   * - ``model``
     - String
     - Yes
     - Name of the model. Recommended option: ``voyage-context-4``.

   * - ``input_type``
     - String
     - No
     - Type of the input text. Options: ``None``, ``query``, 
       ``document``.

       When ``input_type`` is ``None``, the model directly converts 
       the inputs into numerical vectors. For retrieval and search, 
       we recommend setting ``input_type`` to ``query`` or 
       ``document``. In those cases, Voyage automatically prepends a 
       prompt before vectorizing the input. Embeddings generated with 
       and without ``input_type`` are compatible.

   * - ``output_dimension``
     - Integer
     - No
     - The number of dimensions for resulting embeddings. Options: 
       2048, 1024 (default), 512, and 256.

   * - ``output_dtype``
     - String
     - No
     - The data type for returned embeddings. Options: ``float``, 
       ``int8``, ``uint8``, ``binary``, ``ubinary``. See 
       :ref:`voyage-flexible-dims-quantization` for details.

       - **float**: Each embedding is a list of 32-bit floating-point 
         numbers.
       - **int8** and **uint8**: Each embedding is a list of 8-bit 
         integers.
       - **binary** and **ubinary**: Each embedding is a list of 8-bit 
         integers representing bit-packed single-bit values. The 
         returned list length is 1/8 of ``output_dimension``. 
         ``binary`` uses offset binary.

   * - ``enable_auto_chunking``
     - Boolean
     - No
     - Whether to automatically chunk each input document on the 
       backend. Defaults to ``False``. When ``True``, ``inputs`` must 
       be a flat ``List[str]`` of full-document strings, and 
       ``input_type`` must be ``document``.

   * - ``chunk_size``
     - Integer
     - No
     - Target chunk size in tokens when ``enable_auto_chunking=True``. 
       If omitted, the server resolves it to 512. ``chunk_size`` must 
       not exceed 32K.

   * - ``chunk_overlap``
     - Integer
     - No
     - Chunk overlap in tokens when ``enable_auto_chunking=True``. 
       Defaults to ``0``. ``chunk_overlap`` must be smaller than 
       ``chunk_size``. Only a valid input when 
       ``enable_auto_chunking=True``.

   * - ``chunk_fn``
     - Function (``Callable[[str], List[str]]``)
     - No
     - A custom client-side chunking function. Defaults to ``None``. 
       If provided, it is applied locally to each input string before 
       the request is sent. For convenience, 
       ``voyageai.default_chunk_fn`` is available. Use ``chunk_fn`` 
       for client-side chunking only; it cannot be combined with 
       ``enable_auto_chunking=True``.


.. note::

  - The listed limits for both ``chunk_size`` and ``chunk_overlap`` are upper bounds. 
    The actual ``chunk_size`` and ``chunk_overlap`` can be less than the value passed, but cannot be higher.

  - Overlapping tokens are billed in the same way as input tokens.
