- ``partitionBy: "$rated"`` :ref:`partitions
  <setWindowFields-partitionBy>` the documents in the collection by
  ``rated``. The partitions are ``G``, ``PG``, ``PG-13``, and ``R``.

- ``sortBy: { released: 1 }`` :ref:`sorts
  <setWindowFields-sortBy>` the documents in each partition by
  ``released`` in ascending order (``1``), so the earliest
  ``released`` date is first.
