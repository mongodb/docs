When executing an :method:`ordered
<db.collection.initializeOrderedBulkOp()>` list of operations, MongoDB
groups the operations by the :data:`operation type <batchType>` and
contiguity; i.e. *contiguous* operations of the same type are grouped
together. For example, if an ordered list has two insert operations
followed by an update operation followed by another insert operation,
MongoDB groups the operations into three separate groups: first group
contains the two insert operations, second group contains the update
operation, and the third group contains the last insert operation. This
behavior is subject to change in future versions.
