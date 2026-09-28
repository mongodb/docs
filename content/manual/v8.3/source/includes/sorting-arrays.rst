Sort Order
~~~~~~~~~~

When you sort on a field that contains an array:

- An ascending sort compares the smallest elements of the array
  according to the BSON type sort order.

- A descending sort compares the largest elements of the array
  according to the reverse BSON type sort order.

- A sort on a field whose value is a one element array (for example,
  ``[ 1 ]``) and a field whose value is not an array (for example,
  ``2``) sorts on ``1`` and ``2``.

- A sort places an empty array (for example, ``[ ]``) before a
  ``null`` value or a missing field value.

- A sort of a nested array (for example, ``[[1, 2], [3, 4]]``) sorts
  any array after the outermost array lexicographically.

Comparison Operators
~~~~~~~~~~~~~~~~~~~~

When you query a field that contains an array:

- :ref:`Comparison query predicate operators <query-selectors-comparison>`,
  such as :query:`$lt` and :query:`$gt`, enforce
  :ref:`type bracketing <type-bracketing>` when the query value is an
  array.

- If the target field's value is an array, the operator performs a
  type-bracketed comparison element-wise over the array.

- Comparison operators compare arrays lexicographically.
