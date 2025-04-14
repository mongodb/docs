Inserting the same field/value pair into multiple documents in close
succession can cause conflicts that delay insert operations.

MongoDB tracks the occurrences of each field/value pair in an
encrypted collection using an internal counter. The contention factor
partitions this counter, similar to an array. This minimizes issues with
incrementing the counter when using ``insert``, ``update``, or ``findAndModify`` to add or modify an encrypted field
with the same field/value pair in close succession. ``contention = 0``
creates an array with one element
at index 0. ``contention = 4`` creates an array with 5 elements at
indexes 0-4. MongoDB increments a random array element during insert. If
unset, ``contention`` defaults to 8.

High contention improves the performance of insert and update operations on low cardinality fields, but decreases find performance.

Consider increasing ``contention`` above the default value of 8 only if:

- The field has low cardinality or low selectivity. A ``state`` field
  may have 50 values, but if 99% of the data points use ``{state: NY}``,
  that pair is likely to cause contention.

- Write and update operations frequently modify the field. Since high
  contention values sacrifice find performance in favor of write and
  update operations, the benefit of a high contention factor for a
  rarely updated field is unlikely to outweigh the drawback.

Consider decreasing ``contention`` if:

- The field is high cardinality and contains entirely unique values,
  such as a credit card number.

- The field is often queried, but never or rarely updated. In this
  case, find performance is preferable to write and update performance.
