The ``collectionScans`` field contains an embedded document bearing the
following fields:

.. list-table::
    :header-rows: 1
    :widths: 30 70

    * - Field Name
      - Description

    * - ``total``
      - A 64-bit integer giving the total number of queries that
        performed a collection scan. The total consists of queries that
        did and did not use a :doc:`tailable cursor
        </core/tailable-cursors>`.

    * - ``nonTailable``
      - A 64-bit integer giving the number of queries that performed a
        collection scan that did not use a :doc:`tailable cursor
        </core/tailable-cursors>`.
