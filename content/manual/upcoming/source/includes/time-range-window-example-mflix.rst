In the example:

- ``partitionBy: "$rated"`` :ref:`partitions
  <setWindowFields-partitionBy>` the documents in the collection by
  ``rated``. The partitions are ``G``, ``PG``, ``PG-13``, and ``R``.

- ``sortBy: { released: 1 }`` :ref:`sorts
  <setWindowFields-sortBy>` the documents in each partition by
  ``released`` in ascending order (``1``), so the earliest
  ``released`` date is first.

- ``output``:

  - Sets the ``recentReleases`` field to an array of ``released``
    values for the documents in each ``rated`` partition. The array
    elements are expanded with additions to the previous elements in
    the array.

  - Uses :group:`$push` to return an array of ``released``
    values from the documents in a :ref:`range <setWindowFields-range>`
    window.
