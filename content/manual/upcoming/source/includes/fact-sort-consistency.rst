MongoDB does not store documents in a collection in a particular order.
When sorting on a field which contains duplicate values, documents
containing those values may be returned in any order.

The ``$sort`` operation is not a "stable sort," which means that documents
with equivalent sort keys are not guaranteed to remain in the same relative
order in the output as they were in the input.

If a field does not exist in two documents, then the value on which they are 
sorted is the same. The two documents may be returned in any order.

If consistent sort order is desired, include at least one field in your
sort that contains unique values. The easiest way to guarantee this is
to include the ``_id`` field in your sort query.
