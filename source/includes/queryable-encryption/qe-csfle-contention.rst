Concurrent write operations, such as inserting the same field/value pair into
multiple documents in close succession, can cause contention: conflicts that
delay operations.

With {+qe+}, MongoDB tracks the occurrences of each field/value pair in an
encrypted collection using an internal counter. The contention factor
partitions this counter, similar to an array. This minimizes issues with
incrementing the counter when using ``insert``, ``update``, or ``findAndModify`` to add or modify an encrypted field
with the same field/value pair in close succession. ``contention = 0``
creates an array with one element at index 0. ``contention = 4`` creates an
array with 5 elements at indexes 0-4. MongoDB increments a random array element
during insert.

When unset, ``contention`` defaults to ``8``, which provides high performance
for most workloads. Higher contention improves the performance of insert and
update operations on low cardinality fields, but decreases find performance.