
.. list-table::
    :header-rows: 1
    :widths: 30 70

    * - Field Name
      - Description

    * - ``reads``
      - Latency statistics for read requests.

    * - ``writes``
      - Latency statistics for write requests.

    * - ``commands``
      - Latency statistics for database commands.

Each of these fields contains an embedded document bearing the
following fields:

.. list-table::
    :header-rows: 1
    :widths: 30 70

    * - Field Name
      - Description

    * - ``latency``
      - A 64-bit integer giving the total combined
        latency in microseconds.

    * - ``ops``
      - A 64-bit integer giving the total number of
        operations performed on the collection since startup.

    * - ``histogram``
      - An array of embedded documents, each representing a latency range.
        Each document covers twice the previous document's range. For
        upper values between 2048 microseconds and roughly 1 second,
        the histogram includes half-steps.

        This field only exists given the
        ``latencyStats: { histograms: true }`` option. Empty ranges with
        a zero ``count`` are omitted from the output.

        Each document bears the following fields:

        .. list-table::

           * - Field Name
             - Description

           * - ``micros``
             - A 64-bit integer giving the inclusive
               upper time bound of the current latency range in
               microseconds.

               The document's range spans between the previous document's
               ``micros`` value, exclusive, and this document's
               ``micros`` value, inclusive.

           * - ``count``
             - A 64-bit integer giving the number of
               operations with latency less than or equal to ``micros``.

        For example, if ``collStats`` returns the following histogram:

        .. code-block:: javascript

           histogram: [
             { micros: NumberLong(1), count: NumberLong(10) },
             { micros: NumberLong(2), count: NumberLong(1) },
             { micros: NumberLong(4096), count: NumberLong(1) },
             { micros: NumberLong(16384), count: NumberLong(1000) },
             { micros: NumberLong(49152), count: NumberLong(100) }
           ]

        This indicates that there were:

        - 10 operations taking 1 microsecond or less,
        - 1 operation in the range (1, 2] microseconds,
        - 1 operation in the range (3072, 4096] microseconds,
        - 1000 operations in the range (12288, 16384], and
        - 100 operations in the range (32768, 49152].
