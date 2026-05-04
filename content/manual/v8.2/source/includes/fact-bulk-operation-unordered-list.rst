When executing an :method:`unordered
<db.collection.initializeUnorderedBulkOp()>` list of operations,
MongoDB groups the operations. With an unordered bulk operation, the
operations in the list may be reordered to increase performance. As
such, applications should not depend on the ordering when performing
:method:`unordered <db.collection.initializeUnorderedBulkOp()>` bulk
operations.
