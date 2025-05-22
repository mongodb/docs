In array comparisons:

- A less-than comparison, or an ascending sort, compares the smallest
  elements of the array according to the BSON type sort order.

- A greater-than comparison, or a descending sort, compares the largest
  elements of the array according to the reverse BSON type sort order.

- When comparing a field whose value is a one element array (example,
  ``[ 1 ]``) with non-array fields (example, ``2``), the comparison is
  for ``1`` and ``2``.

- A comparison of an empty array (example, ``[ ]``) considers the empty
  array as less than a ``null`` value or a missing field value.
