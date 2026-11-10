In the example:

- ``partitionBy: "$state"`` :ref:`partitions
  <setWindowFields-partitionBy>` the documents in the collection by
  ``state``. There are partitions for ``CA`` and ``WA``.

- ``sortBy: { orderDate: 1 }`` :ref:`sorts
  <setWindowFields-sortBy>` the documents in each partition by
  ``orderDate`` in ascending order (``1``), so the earliest
  ``orderDate`` is first.

- ``output``:

  - Sets the ``orderDateArrayForState`` array field to ``orderDate``
    values for the documents in each ``state``. The array elements are
    expanded with additions to the previous elements in the array.

  - Uses :group:`$push` to return an array of ``orderDate``
    values from the documents in a :ref:`range <setWindowFields-range>`
    window.