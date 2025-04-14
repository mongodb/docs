MongoDB 5.0 removes the following server parameters:

.. list-table::
    :header-rows: 1
    :widths: 25 75

    * - Removed Parameters
      - Description

    * - ``cachePressureThreshold``

      - MongoDB 5.0 removes the ``cachePressureThreshold`` server
        parameter. Due to changes in how WiredTiger calculates snapshot
        window size this parameter is no longer relevant.

    * - ``shouldMultiDocTxnCreateCollectionAndIndexes``

      - MongoDB 5.0 removes the
        ``shouldMultiDocTxnCreateCollectionAndIndexes`` server
        parameter. In 5.0+, collection and index creation inside of
        transactions is always enabled. You can no longer use the server
        parameter to disable this behavior.
