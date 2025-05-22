- ``partitionBy: "$state"`` :ref:`partitions
  <setWindowFields-partitionBy>` the documents in the collection by
  ``state``. There are partitions for ``CA`` and ``WA``.

- ``sortBy: { quantity: -1 }`` :ref:`sorts
  <setWindowFields-sortBy>` the documents in each partition by
  ``quantity`` in descending order (``-1``), so the highest ``quantity``
  is first.