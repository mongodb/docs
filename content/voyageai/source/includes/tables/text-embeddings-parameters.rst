.. list-table::
   :widths: 15 15 5 65
   :header-rows: 1

   * - Parameter
     - Type
     - Required
     - Description
     
   * - ``texts``
     - String or Array of Strings (``Union[str, List[str]]``)
     - Yes
     - Single text string, or a list of texts as a list of strings,
       such as ``["I like cats", "I also like dogs"]``. The following
       constraints apply:

       - The maximum length of the list is 1,000.
       - The total number of tokens in the list is at most:

         - 1M for ``voyage-4-lite``, ``voyage-3.5-lite``
         - 320K for ``voyage-4``, ``voyage-3.5``
         - 120K for ``voyage-4-large``, ``voyage-3-large``, ``voyage-code-3``,
           ``voyage-finance-2``, and ``voyage-law-2``

   * - ``model``
     - String
     - Yes
     - Name of the model. Recommended options: ``voyage-4-large``,
       ``voyage-4``, ``voyage-4-lite``, ``voyage-code-3``,
       ``voyage-code-2``, ``voyage-finance-2``, ``voyage-law-2``.

   * - ``input_type``
     - String
     - No
     - .. include:: /includes/tables/shared/input-type-description.rst

   * - ``truncation``
     - Boolean
     - No
     - .. include:: /includes/tables/shared/truncation-description.rst

   * - ``output_dimension``
     - Integer
     - No
     - The number of dimensions for resulting output embeddings.
       Defaults to ``None``.

       Most models only support a single default dimension, used when
       ``output_dimension`` is set to ``None`` (see model embedding
       dimensions in the tables above).

       ``voyage-4-large``, ``voyage-4``, ``voyage-4-lite``,
       ``voyage-3-large``, ``voyage-3.5``, ``voyage-3.5-lite``, and
       ``voyage-code-3`` support the following ``output_dimension``
       values: 2048, 1024 (default), 512, and 256.

   * - ``output_dtype``
     - String
     - No
     - .. include:: /includes/tables/shared/output-dtype-description.rst

       ``float`` is supported for all models. ``int8``, ``uint8``,
       ``binary``, and ``ubinary`` are supported by ``voyage-4-large``,
       ``voyage-4``, ``voyage-4-lite``, ``voyage-3-large``,
       ``voyage-3.5``, ``voyage-3.5-lite``, and ``voyage-code-3``.