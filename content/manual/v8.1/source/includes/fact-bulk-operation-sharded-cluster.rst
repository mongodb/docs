Executing an :method:`ordered
<db.collection.initializeOrderedBulkOp()>` list of operations on a
sharded collection will generally be slower than executing an
:method:`unordered <db.collection.initializeUnorderedBulkOp()>` list
since with an ordered list, each operation must wait for the previous
operation to finish.
