The rename operation fails with a
``BackgroundOperationInProgressForNamespace`` error if an index build
is in progress on the source collection. The operation also fails if
an index build is in progress on the target collection and you specify
``dropTarget: true``.

To rename the collection, wait for the index build to finish and then
retry the operation. To check for in-progress index builds, use the
:method:`db.currentOp()` method.
