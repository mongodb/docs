- ``partitionBy: "$state"`` :ref:`partitions
  <setWindowFields-partitionBy>` the documents in the collection by
  ``state``. There are partitions for ``CA`` and ``WA``.

- ``sortBy: { orderDate: 1 }`` :ref:`sorts
  <setWindowFields-sortBy>` the documents in each partition by
  ``orderDate`` in ascending order (``1``), so the earliest
  ``orderDate`` is first.