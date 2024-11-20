In array comparisons:

- An ascending sort compares the smallest
  elements of the array according to the BSON type sort order.

- A descending sort compares the largest elements of the array according 
  to the reverse BSON type sort order.

- :ref:`query-selectors-comparison`, such as :query:`$lt` and :query:`$gt`,
  perform comparisons on arrays lexicographically.

- When comparing a field whose value is a one element array (for example,
  ``[ 1 ]``) with non-array fields (for example, ``2``), the comparison is
  for ``1`` and ``2``.

- A comparison of an empty array (for example, ``[ ]``) considers the empty
  array as less than a ``null`` value or a missing field value.

- A comparison of a nested array (for example, ``[[1, 2], [3, 4]]``) compares 
  any array after the outmost array lexicographically. 
