MongoDB 5.0 removes the following server parameter:

.. list-table::
    :header-rows: 1
    :widths: 25 75

    * - Removed Parameter
      - Description
    
    * - ``shouldMultiDocTxnCreateCollectionAndIndexes``

      - MongoDB 5.0 removes the
        ``shouldMultiDocTxnCreateCollectionAndIndexes`` server
        parameter. In 5.0+, collection and index creation inside of
        transactions is always enabled. You can no longer use the server
        parameter to disable this behavior.
